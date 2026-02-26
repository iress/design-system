/**
 * Documentation Translator: converts Fumadocs MDX files to AI-consumable markdown.
 *
 * Reads the migrated MDX files from content/docs/ and produces clean markdown
 * for embedding in distributed packages (.ai/ directory).
 *
 * Props are referenced via .d.ts type declarations (from MDX frontmatter metadata)
 * rather than regex-parsed from TypeScript source — the .d.ts files contain fully
 * resolved types with JSDoc annotations, which are far more accurate.
 *
 * Usage: npx tsx packages/guidelines/scripts/translate-docs.ts [--dry-run]
 */

import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ─── Configuration ───────────────────────────────────────────

const GUIDELINES_URL =
  process.env.NEXT_PUBLIC_GUIDELINES_URL ||
  'https://iress.github.io/design-system';
const STORYBOOK_URL =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ||
  'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

const CONTENT_DIR = path.resolve(import.meta.dirname, '../content/docs');
const OUTPUT_DIR = path.resolve(
  import.meta.dirname,
  '../../../packages/components/.ai',
);
const TOKENS_OUTPUT_DIR = path.resolve(
  import.meta.dirname,
  '../../../packages/tokens/.ai',
);

const DRY_RUN = process.argv.includes('--dry-run');

// ─── Types ───────────────────────────────────────────────────

interface DocFile {
  filePath: string;
  category: 'component' | 'pattern';
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    component?: string; // e.g., "Button/Button.tsx" or "Menu/MenuItem/MenuItem.tsx"
    propsType?: string; // e.g., "IressButtonProps"
  };
  content: string;
}

interface TranslateResult {
  translated: number;
  errors: number;
  warnings: string[];
}

// ─── Props Type Reference ────────────────────────────────────

/**
 * Generate a Props reference section that points AI agents to the .d.ts type
 * declarations, rather than attempting to regex-parse TypeScript source.
 *
 * The .d.ts files contain fully resolved types with JSDoc annotations —
 * far more accurate than any regex extraction could be.
 */
function generatePropsReference(doc: DocFile): string | null {
  const { component, propsType } = doc.frontmatter;
  if (!component || !propsType) return null;

  // Convert source path to .d.ts path
  // e.g., "Button/Button.tsx" → "Button/Button.d.ts"
  const dtsRelPath = component.replace(/\.tsx?$/, '.d.ts');
  const dtsPackagePath = `@iress-oss/ids-components/dist/components/${dtsRelPath}`;

  let md = '';
  md += `- **Type:** \`${propsType}\`\n`;
  md += `- **Type declarations:** \`${dtsPackagePath}\`\n\n`;
  md += `\`\`\`typescript\nimport type { ${propsType} } from '@iress-oss/ids-components';\n\`\`\`\n`;

  return md;
}

// ─── Content Transformation ──────────────────────────────────

/**
 * Transform MDX content to AI-consumable markdown.
 */
function transformForAI(doc: DocFile, propsMarkdown: string | null): string {
  const { frontmatter, content, category, slug } = doc;

  const guidelinesUrl = `${GUIDELINES_URL}/docs/${category === 'pattern' ? 'patterns' : 'components'}/${slug}`;

  let result = '';

  // Header
  result += `# ${frontmatter.title}\n\n`;
  if (frontmatter.description) {
    result += `${frontmatter.description}\n\n`;
  }

  // Reference links
  result += `> **Documentation:** [${frontmatter.title} Guidelines](${guidelinesUrl})\n`;
  result += `> **Package:** \`@iress-oss/ids-components\`\n\n`;

  // Process MDX content
  let processedContent = content;

  // Remove auto-type-table tags (replaced by type reference below)
  processedContent = processedContent.replace(
    /<auto-type-table[^>]*\/>\n?/g,
    '',
  );
  // Remove multi-line auto-type-table
  processedContent = processedContent.replace(
    /<auto-type-table\n[^/]*\/>\n?/g,
    '',
  );

  // Remove empty Props heading if no props to show
  if (!propsMarkdown) {
    processedContent = processedContent.replace(/\n*## Props\s*$/, '');
  }

  // Remove any remaining MDX-only elements
  processedContent = processedContent.replace(
    /import\s+.*from\s+['"].*['"];?\n/g,
    '',
  );

  // Clean up excessive blank lines
  processedContent = processedContent.replace(/\n{3,}/g, '\n\n');

  result += processedContent.trim();

  // Add Props section from type references
  if (propsMarkdown) {
    // If content already has a ## Props heading, insert the reference right after it
    if (result.includes('## Props')) {
      result = result.replace(/## Props\s*$/, `## Props\n\n${propsMarkdown}`);
    } else {
      result += `\n\n## Props\n\n${propsMarkdown}`;
    }
  }

  // Footer with AI agent guidance
  result += '\n\n---\n\n';
  result += `*Full documentation: [${guidelinesUrl}](${guidelinesUrl})*\n`;

  return result;
}

// ─── File Discovery ──────────────────────────────────────────

async function findDocFiles(): Promise<DocFile[]> {
  const docs: DocFile[] = [];

  const categories = [
    { dir: 'components', category: 'component' as const },
    { dir: 'patterns', category: 'pattern' as const },
  ];

  for (const { dir, category } of categories) {
    const fullDir = path.join(CONTENT_DIR, dir);
    if (!existsSync(fullDir)) continue;

    const files = await fs.readdir(fullDir);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;
      if (file === 'meta.json') continue;

      const filePath = path.join(fullDir, file);
      const raw = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(raw);

      const slug = file.replace('.mdx', '');

      docs.push({
        filePath,
        category,
        slug,
        frontmatter: {
          title: data.title || slug,
          description: data.description || '',
          component: data.component || undefined,
          propsType: data.propsType || undefined,
        },
        content,
      });
    }
  }

  return docs;
}

// ─── Manifest Generation ─────────────────────────────────────

interface ManifestEntry {
  name: string;
  path: string;
  category: string;
  guidelinesUrl: string;
  propsType?: string;
  typeDeclPath?: string;
}

function generateManifest(docs: DocFile[]): object {
  const components: ManifestEntry[] = [];
  const patterns: ManifestEntry[] = [];

  for (const doc of docs) {
    const entry: ManifestEntry = {
      name: doc.frontmatter.title,
      path: `${doc.category === 'component' ? 'components' : 'patterns'}/${doc.slug}.md`,
      category: doc.category,
      guidelinesUrl: `${GUIDELINES_URL}/docs/${doc.category === 'pattern' ? 'patterns' : 'components'}/${doc.slug}`,
    };

    // Add type information for components with props
    if (doc.frontmatter.propsType && doc.frontmatter.component) {
      entry.propsType = doc.frontmatter.propsType;
      entry.typeDeclPath = `dist/components/${doc.frontmatter.component.replace(/\.tsx?$/, '.d.ts')}`;
    }

    if (doc.category === 'component') {
      components.push(entry);
    } else {
      patterns.push(entry);
    }
  }

  return {
    package: '@iress-oss/ids-components',
    version: '6.0.0',
    urls: {
      guidelines: GUIDELINES_URL,
      storybook: STORYBOOK_URL,
    },
    documentation: {
      components,
      patterns,
    },
    api: {
      source: 'TypeScript .d.ts type declarations with JSDoc annotations',
      note: 'For full Props details, read the .d.ts files listed in each component entry above.',
      guidelinesUrl: `${GUIDELINES_URL}/docs/components`,
    },
  };
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log('📝 Translating docs to AI-consumable format...\n');

  if (DRY_RUN) {
    console.log('🏃 DRY RUN — no files will be written\n');
  }

  const docs = await findDocFiles();
  console.log(`Found ${docs.length} docs to translate\n`);

  const result: TranslateResult = {
    translated: 0,
    errors: 0,
    warnings: [],
  };

  for (const doc of docs) {
    try {
      // Generate Props reference from frontmatter metadata (components only, not recipes/patterns)
      let propsMarkdown: string | null = null;
      const isRecipe = doc.slug.includes('recipe');

      if (doc.category === 'component' && !isRecipe) {
        propsMarkdown = generatePropsReference(doc);

        if (!propsMarkdown && doc.frontmatter.component) {
          result.warnings.push(
            `No propsType in frontmatter for ${doc.frontmatter.title} (${doc.slug})`,
          );
        }
      }

      // Transform content
      const output = transformForAI(doc, propsMarkdown);

      // Write output
      const outputDir =
        doc.category === 'component'
          ? path.join(OUTPUT_DIR, 'components')
          : path.join(OUTPUT_DIR, 'patterns');
      const outputPath = path.join(outputDir, `${doc.slug}.md`);

      if (!DRY_RUN) {
        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(outputPath, output, 'utf-8');
      }

      console.log(
        `  ✓ ${doc.frontmatter.title} → ${path.relative(process.cwd(), outputPath)}`,
      );
      result.translated++;
    } catch (error) {
      console.error(
        `  ✗ ${doc.frontmatter.title}: ${error instanceof Error ? error.message : error}`,
      );
      result.errors++;
    }
  }

  // Generate manifest
  if (!DRY_RUN) {
    const manifest = generateManifest(docs);
    const manifestPath = path.join(OUTPUT_DIR, 'index.json');
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.writeFile(
      manifestPath,
      JSON.stringify(manifest, null, 2),
      'utf-8',
    );
    console.log(
      `\n  ✓ Manifest → ${path.relative(process.cwd(), manifestPath)}`,
    );
  }

  // Summary
  console.log(`\n${'═'.repeat(60)}\n`);
  console.log(`✅ Translation complete!\n`);
  console.log(`  Translated: ${result.translated}`);
  console.log(`  Errors:     ${result.errors}`);
  console.log(`  Warnings:   ${result.warnings.length}`);

  if (result.warnings.length > 0) {
    console.log(`\n⚠️  Warnings:\n`);
    for (const warning of result.warnings) {
      console.log(`  - ${warning}`);
    }
  }
}

// Run
main().catch(console.error);
