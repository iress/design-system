/**
 * --components subcommand
 *
 * Produces .ai/components/*.md and .ai/patterns/*.md
 * from guidelines MDX + component meta + testMeta.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
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

interface DocEntry {
  slug: string;
  type: string;
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


async function buildDoc(file: string, type: string): Promise<{ slug: string; markdown: string } | null> {
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
      sections.push('Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).\n');
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

  return { slug, markdown: sections.join('\n') };
}

export async function translateComponents() {
  const index: DocEntry[] = [];

  for (const type of ['components', 'patterns', 'foundations', 'get-started', 'migration', 'styling-props']) {
    const files = getGuidelineFiles(type);
    const outDir = join(OUTPUT_DIR, type);
    mkdirSync(outDir, { recursive: true });

    console.log(`  ${type}/ — ${files.length} files`);

    for (const file of files) {
      const doc = await buildDoc(file, type);
      if (!doc) continue;
      const formatted = await formatCodeBlocks(doc.markdown);
      writeFileSync(join(outDir, `${doc.slug}.md`), formatted);
      index.push({ slug: doc.slug, type });
    }
  }

  // Write index.json
  writeFileSync(join(OUTPUT_DIR, 'index.json'), JSON.stringify(index, null, 2));
  console.log(`  \u2713 ${index.length} component/pattern docs written`);
}
