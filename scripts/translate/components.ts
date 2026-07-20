/**
 * --components subcommand
 *
 * Produces .ai/components/*.md and .ai/patterns/*.md
 * from guidelines MDX + component meta + testMeta.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync, unlinkSync } from 'fs';
import { join, basename, relative } from 'path';
import { stripMdx } from './helpers/strip-mdx';
import { resolveStoryEmbeds } from './helpers/resolve-stories';
import { formatCodeBlocks } from './helpers/format-code';
import { extractProps, renderPropsTable } from './helpers/extract-props';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const ROOT = join(import.meta.dirname, '../..');
const GUIDELINES_DIR = join(ROOT, 'apps/guidelines/content');
const COMPONENTS_SRC = join(ROOT, 'packages/components/src');
const OUTPUT_DIR = join(ROOT, 'packages/components/.ai');

/**
 * Chromatic project IDs for each Storybook instance.
 * URL format: https://<branch>--<projectId>.chromatic.com
 */
const CHROMATIC_PROJECT_IDS = [
  '691abcc79dfa560a36d0a74f', // root (guidelines)
  '69166895eb243715fcd0d241', // components
  '69169618e0408bbf7684f876', // tokens
];

const STORYBOOK_BRANCH = process.env.STORYBOOK_BRANCH || 'main';

/** Replace hardcoded branch prefixes in Chromatic URLs with the current branch. */
function replaceChromaticBranch(content: string): string {
  if (STORYBOOK_BRANCH === 'main') return content;
  const pattern = new RegExp(
    `(\\w[\\w-]*)(?=--(${CHROMATIC_PROJECT_IDS.join('|')})\\.chromatic\\.com)`,
    'g',
  );
  return content.replace(pattern, STORYBOOK_BRANCH);
}

interface DocEntry {
  slug: string;
  type: string;
  name?: string;
  description?: string;
  import?: string;
  path: string;
}

function getGuidelineFiles(type: string): string[] {
  const dir = join(GUIDELINES_DIR, type);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => join(dir, f));
}

function renderTestMetaFromArray(testMeta: Array<{ part: string; description: string; query?: unknown; testId: string }>): string {
  if (!testMeta?.length) return '';

  const rows = testMeta.map((entry) => {
    // query is ReactNode — extract text content by rendering to string
    let query = '\u2014';
    if (entry.query) {
      try {
        const html = renderToStaticMarkup(entry.query as React.ReactElement);
        // Strip HTML tags, keep backtick-wrapped code, decode entities
        query = html
          .replace(/<code>/g, '`').replace(/<\/code>/g, '`').replace(/<[^>]+>/g, '')
          .replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      } catch {
        const str = String(entry.query);
        if (str && str !== '[object Object]') query = str;
      }
    }
    return `| ${entry.part} | ${entry.description} | ${query} | \`${entry.testId}\` |`;
  });

  return [
    '| Part | Description | Recommended Query | Test ID |',
    '|------|-------------|-------------------|---------|',
    ...rows,
  ].join('\n');
}

function slugToName(slug: string): string {
  return slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function findMeta(name: string, type: string): string | null {
  const path = join(COMPONENTS_SRC, type, name, 'meta/index.tsx');
  return existsSync(path) ? path : null;
}


async function buildDoc(file: string, type: string): Promise<{ slug: string; markdown: string; description: string; importStatement: string; name?: string } | null> {
  const slug = basename(file, '.mdx');
  const name = slugToName(slug);
  const isComponent = type === 'components' || type === 'patterns';

  // Read and strip guidelines MDX (keep StoryEmbed markers for Phase C)
  const source = readFileSync(file, 'utf-8');
  let prose = stripMdx(source, true);

  // For components/patterns: remove top-level heading (we add our own from meta)
  if (isComponent) {
    prose = prose.replace(/^# .+\n+/, '');
  }

  // Find meta file (only for components/patterns)
  const metaFile = isComponent ? findMeta(name, type) : null;

  // Read meta by importing the module directly
  let description = '';
  let importStatement = '';
  let testMetaTable = '';
  let subComponents: string[] = [];
  let additionalProps: Array<{ name: string; type: string; required?: boolean; default?: string; description: string; condition?: string }> = [];
  const metaLinks: string[] = [];

  // Extract description from MDX meta for non-component types
  if (!isComponent) {
    const metaMatch = source.match(/export\s+const\s+meta\s*=\s*\{([^}]*)\}/s);
    if (metaMatch) {
      const descMatch = metaMatch[1].match(/description:\s*['"]([^'"]+)['"]/);
      if (descMatch) description = descMatch[1];
    }
  }

  if (metaFile) {
    try {
      // Import from the built package (avoids path alias resolution issues)
      const metaModuleName = `${name.charAt(0).toLowerCase()}${name.slice(1)}Meta`;
      const packageMeta = await import('@iress-oss/ids-components/meta');
      const meta = packageMeta[metaModuleName];

      if (meta) {
        description = meta.description ?? '';
        importStatement = typeof meta.import === 'string' ? meta.import : '';
        subComponents = meta.subComponents ?? [];
        additionalProps = meta.additionalProps ?? [];

        if (meta.storybook) metaLinks.push(`- [Storybook](${meta.storybook})`);
        if (meta.figma) metaLinks.push(`- [Figma](${meta.figma})`);
        if (meta.github?.source) metaLinks.push(`- [Source](${meta.github.source})`);
        if (meta.github?.reportIssue) metaLinks.push(`- [Report issue](${meta.github.reportIssue})`);
        if (meta.github?.requestFeature) metaLinks.push(`- [Request feature](${meta.github.requestFeature})`);
      }

      // testMeta is a named export, not on default
      const testMetaExport = packageMeta[`${metaModuleName}`]?.testMeta;
      if (testMetaExport) {
        testMetaTable = renderTestMetaFromArray(testMetaExport);
      }
    } catch {
      // Meta import failed — continue without meta
    }
  }

  // Assemble output per plan structure
  const sections: string[] = [];

  if (isComponent) {
    // # Name + description
    sections.push(`# ${name}\n`);
    if (description) sections.push(`> ${description}\n`);

    // ## Import
    if (importStatement) {
      sections.push('## Import\n');
      sections.push('```tsx');
      sections.push(importStatement);
      sections.push('```\n');
    }

    if (metaLinks.length > 0) {
      sections.push(metaLinks.join('\n') + '\n');
    }

    // Props table (from .d.ts)
    const props = extractProps(`Iress${name}`, type as 'components' | 'patterns');
    if (props || additionalProps.length > 0) {
      const allProps = [
        ...(props ?? []),
        ...additionalProps.map((p) => ({
          name: p.name,
          type: p.type + (p.condition ? ` _(${p.condition})_` : ''),
          required: p.required ?? false,
          description: p.description,
          defaultValue: p.default,
        })),
      ];
      sections.push('## Props\n');
      sections.push('> Required props are **bold**.\n');
      sections.push(renderPropsTable(allProps, `Iress${name}`, type) + '\n');
      sections.push('Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).\n');
    }

    // Sub-component props (declared in meta.subComponents)
    if (subComponents.length > 0) {
      for (const subName of subComponents) {
        const subProps = extractProps(subName, type as 'components' | 'patterns');
        if (subProps) {
          sections.push(`### ${subName} Props\n`);
          sections.push(renderPropsTable(subProps, subName, type) + '\n');
        }
      }
    }
  }

  // Resolve <StoryEmbed> markers to inline code blocks
  prose = resolveStoryEmbeds(prose);

  // Guidelines prose (includes Design, Develop, Specifications headings)
  if (isComponent && testMetaTable && prose.includes('### Testing')) {
    prose = prose.replace(
      /(### Testing[\s\S]*?)(\n### |\n## |\n---|\s*$)/,
      `$1\n\n#### Test selectors\n\n${testMetaTable}\n$2`,
    );
    sections.push(prose);
  } else {
    sections.push(prose);
    if (isComponent && testMetaTable) {
      sections.push('\n## Test Selectors\n');
      sections.push(testMetaTable);
    }
  }

  // Append unreferenced recipe stories (Phase E)
  if (isComponent) {
    const recipes = getUnreferencedRecipes(name, type, prose);
    if (recipes.length > 0) {
      sections.push('\n## Recipes\n');
      for (const recipe of recipes) {
        sections.push(`### ${recipe.name}\n`);
        sections.push('```tsx\n' + recipe.code + '\n```\n');
      }
    }
  }

  return { slug, markdown: sections.join('\n'), description, importStatement, name: isComponent && slug !== 'overview' ? `Iress${name}` : undefined };
}

interface RecipeEntry {
  name: string;
  code: string;
}

function getUnreferencedRecipes(componentName: string, type: string, resolvedProse: string): RecipeEntry[] {
  const COMPONENTS_SRC_DIR = join(ROOT, 'packages/components/src');
  const dirName = componentName;

  // Find the stories file
  const storiesDir = join(COMPONENTS_SRC_DIR, type, dirName);
  if (!existsSync(storiesDir)) return [];

  const storiesFile = readdirSync(storiesDir).find((f) => f.endsWith('.stories.tsx'));
  if (!storiesFile) return [];

  const storiesPath = join(storiesDir, storiesFile);
  const source = readFileSync(storiesPath, 'utf-8');

  // Find recipe-tagged story exports
  const recipeRegex = /export const (\w+)[^=]*=\s*\{([\s\S]*?)\n\};/g;
  const recipes: RecipeEntry[] = [];
  let match;

  while ((match = recipeRegex.exec(source)) !== null) {
    const storyName = match[1];
    const storyBody = match[2];

    // Only process recipe-tagged stories
    if (!storyBody.includes("tags: ['recipe']") && !storyBody.includes("tags: ['recipe'")) continue;

    // Convert export name to kebab slug to check if it was already referenced
    const slug = storyName.replace(/([A-Z])/g, (_, c, i) => (i > 0 ? '-' : '') + c.toLowerCase());
    const spacedName = storyName.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
    const proseLC = resolvedProse.toLowerCase();
    if (proseLC.includes(slug) || proseLC.includes(storyName.toLowerCase()) || proseLC.includes(spacedName)) continue;

    // Only extract P2 stories (withSource)
    const sourceVarMatch = storyBody.match(/withSource\((\w+Source)/);
    if (!sourceVarMatch) continue;

    const sourceVar = sourceVarMatch[1];
    const rawImportRegex = new RegExp(`import\\s+${sourceVar}\\s+from\\s+['"]([^'"]+)\\?raw['"]`);
    const rawImportMatch = source.match(rawImportRegex);
    if (!rawImportMatch) continue;

    const mockPath = join(storiesDir, rawImportMatch[1]);
    if (!existsSync(mockPath)) continue;

    let mockSource = readFileSync(mockPath, 'utf-8');
    // Transform @/main imports
    mockSource = mockSource.replace(/@\/main/g, '@iress-oss/ids-components');

    // Format the name for display
    const displayName = storyName.replace(/([A-Z])/g, ' $1').trim();

    recipes.push({ name: displayName, code: mockSource.trim() });
  }

  return recipes;
}

export async function translateComponents() {
  const index: DocEntry[] = [];

  // Scan all directories in apps/guidelines/content/
  const contentDir = join(ROOT, 'apps/guidelines/content');
  const contentTypes = readdirSync(contentDir).filter(
    (d) => statSync(join(contentDir, d)).isDirectory(),
  );

  // Clean stale .md files before regenerating (prevents orphaned manually-committed files)
  for (const type of contentTypes) {
    const outDir = join(OUTPUT_DIR, type);
    if (existsSync(outDir)) {
      for (const f of readdirSync(outDir).filter((f) => f.endsWith('.md'))) {
        unlinkSync(join(outDir, f));
      }
    }
  }

  for (const type of contentTypes) {
    const files = getGuidelineFiles(type);
    const outDir = join(OUTPUT_DIR, type);
    mkdirSync(outDir, { recursive: true });

    console.log(`  ${type}/ — ${files.length} files`);

    for (const file of files) {
      const doc = await buildDoc(file, type);
      if (!doc) continue;
      let formatted = await formatCodeBlocks(doc.markdown);

      // Replace hardcoded Chromatic branch with current branch
      formatted = replaceChromaticBranch(formatted);

      // Warn if unresolved <StoryEmbed> tags remain in output
      if (formatted.includes('<StoryEmbed')) {
        const count = (formatted.match(/<StoryEmbed/g) || []).length;
        console.warn(`  ⚠ ${type}/${doc.slug}.md has ${count} unresolved <StoryEmbed> tag(s)`);
      }

      writeFileSync(join(outDir, `${doc.slug}.md`), formatted);
      index.push({
        slug: doc.slug,
        type,
        name: doc.name,
        description: doc.description || undefined,
        import: doc.importStatement || undefined,
        path: `${type}/${doc.slug}.md`,
      });
    }
  }

  // Copy tokens-reference.md into components .ai for co-location
  const tokensRef = join(ROOT, 'packages/tokens/.ai/tokens-reference.md');
  const tokensOutDir = join(OUTPUT_DIR, 'tokens');
  mkdirSync(tokensOutDir, { recursive: true });
  if (existsSync(tokensRef)) {
    writeFileSync(join(tokensOutDir, 'tokens-reference.md'), readFileSync(tokensRef, 'utf-8'));
    index.push({
      slug: 'tokens-reference',
      type: 'tokens',
      name: 'Token Reference',
      description: 'Complete enumeration of all IDS design tokens with values, descriptions, and accessibility pairings.',
      path: 'tokens/tokens-reference.md',
    });
  }

  // Copy translated token content to packages/tokens/.ai/tokens/ (mirrors components/.ai/tokens/)
  // Exclude tokens-reference.md since it already lives at packages/tokens/.ai/tokens-reference.md
  const tokensPackageAiDir = join(ROOT, 'packages/tokens/.ai/tokens');
  mkdirSync(tokensPackageAiDir, { recursive: true });
  for (const file of readdirSync(tokensOutDir).filter((f) => f.endsWith('.md') && f !== 'tokens-reference.md')) {
    writeFileSync(join(tokensPackageAiDir, file), readFileSync(join(tokensOutDir, file), 'utf-8'));
  }

  // Generate packages/tokens/.ai/index.json
  const tokensAiRoot = join(ROOT, 'packages/tokens/.ai');
  const tokensDocs: { slug: string; name: string; description: string; path: string }[] = [
    {
      slug: 'tokens-reference',
      name: 'Token Reference',
      description: 'Complete enumeration of all design tokens with values, descriptions, and accessibility pairings.',
      path: 'tokens-reference.md',
    },
  ];
  for (const file of readdirSync(tokensPackageAiDir).filter((f) => f.endsWith('.md'))) {
    const slug = file.replace('.md', '');
    if (slug === 'tokens-reference') continue; // already added above
    // Get description from MDX meta
    const mdxPath = join(ROOT, `apps/guidelines/content/tokens/${slug}.mdx`);
    let desc = '';
    if (existsSync(mdxPath)) {
      const mdxContent = readFileSync(mdxPath, 'utf-8');
      const descMatch = mdxContent.match(/description:\s*['"]([^'"]+)['"]/);
      if (descMatch) desc = descMatch[1];
    }
    tokensDocs.push({ slug, name: slug.charAt(0).toUpperCase() + slug.slice(1), description: desc, path: `tokens/${file}` });
  }
  const tokensSkills: { name: string; path: string }[] = [];
  const tokensSkillsDir = join(tokensAiRoot, 'skills');
  if (existsSync(tokensSkillsDir)) {
    for (const file of readdirSync(tokensSkillsDir).filter((f) => f.endsWith('.md'))) {
      tokensSkills.push({ name: file.replace('.md', ''), path: `skills/${file}` });
    }
  }
  const tokensIndex = {
    package: '@iress-oss/ids-tokens',
    description: 'Design tokens for the Iress Design System — colours, spacing, radius, and typography as CSS custom properties and typed JavaScript objects.',
    docs: tokensDocs,
    skills: tokensSkills,
    sources: {
      css: { importPath: '@iress-oss/ids-tokens/build/css-vars.css' },
      cssVars: { importPath: '@iress-oss/ids-tokens', exportName: 'cssVars' },
      designTokens: { importPath: '@iress-oss/ids-tokens', exportName: 'designTokens' },
    },
  };
  writeFileSync(join(tokensAiRoot, 'index.json'), JSON.stringify(tokensIndex, null, 2) + '\n');

  // Add skills to index
  const skillsDir = join(OUTPUT_DIR, 'skills');
  if (existsSync(skillsDir)) {
    for (const file of readdirSync(skillsDir).filter((f) => f.endsWith('.md'))) {
      const skillSlug = file.replace('.md', '');
      index.push({ slug: skillSlug, type: 'skills', path: `skills/${file}` });
    }
  }

  // Write index.json
  writeFileSync(join(OUTPUT_DIR, 'index.json'), JSON.stringify(index, null, 2));

  console.log(`  \u2713 ${index.length} component/pattern docs written`);
}
