#!/usr/bin/env tsx

/**
 * Derive AI Docs — generates packages/components/.ai/ from apps/guidelines/content/
 * for shipping in the npm package. Strips MDX-specific syntax, converts to plain markdown.
 *
 * Usage:
 *   npx tsx scripts/derive-ai-docs.ts             # all files
 *   npx tsx scripts/derive-ai-docs.ts --files apps/guidelines/content/components/button.mdx
 *   npx tsx scripts/derive-ai-docs.ts --dry-run   # show what would change
 */

import fs from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const CONTENT_DIR = path.join(ROOT, 'apps/guidelines/content');
const OUTPUT_DIR = path.join(ROOT, 'packages/components/.ai');
const STORYBOOK_URL = 'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

const DRY_RUN = process.argv.includes('--dry-run');

// ─── CLI ─────────────────────────────────────────────────────

function parseFiles(): string[] | null {
  const idx = process.argv.indexOf('--files');
  if (idx === -1) return null;
  const files: string[] = [];
  for (let i = idx + 1; i < process.argv.length; i++) {
    if (process.argv[i].startsWith('--')) break;
    files.push(path.resolve(process.argv[i]));
  }
  return files.length ? files : null;
}

// ─── Types ───────────────────────────────────────────────────

interface DocMeta {
  title: string;
  description: string;
  component?: string;
  storybookUrl?: string;
}

interface ManifestEntry {
  name: string;
  description: string;
  path: string;
  category: 'component' | 'pattern' | 'guide';
  storybookUrl?: string;
  propsType?: string;
  typeDeclPath?: string;
}

// ─── Transforms ──────────────────────────────────────────────

function extractMeta(content: string): DocMeta | null {
  const match = content.match(
    /export\s+const\s+meta\s*=\s*(\{[\s\S]*?\});?\s*\n/,
  );
  if (!match) return null;
  try {
    // Simple eval-free extraction of string properties
    const obj = match[1];
    const title = obj.match(/title:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
    const description =
      obj.match(/description:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
    const component = obj.match(/component:\s*['"]([^'"]+)['"]/)?.[1];
    const storybookUrl = obj.match(/storybookUrl:\s*['"]([^'"]+)['"]/)?.[1];
    return { title, description, component, storybookUrl };
  } catch {
    return null;
  }
}

function mdxToMarkdown(content: string, meta: DocMeta): string {
  let md = content;

  // Remove export const meta block
  md = md.replace(/export\s+const\s+meta\s*=\s*\{[\s\S]*?\};?\s*\n/, '');

  // Remove MDX import statements
  md = md.replace(/^import\s+.*;\s*\n/gm, '');

  // Remove bare import code block (standalone import display)
  md = md.replace(/```tsx\nimport \{ \w+ \} from '@iress-oss\/ids-components';\n```\n\n?/, '');

  // Convert <StoryEmbed id="..." /> to a Storybook link (placeholder for derive)
  md = md.replace(
    /<StoryEmbed\s+id="([^"]+)"\s*\/>/g,
    (_match, id) =>
      `> [View live example in Storybook](${STORYBOOK_URL}/?path=/story/${id})`,
  );

  // Add header block
  const header = [
    `# ${meta.title}`,
    '',
    meta.description,
    '',
    meta.component
      ? `> **Component:** \`import { ${meta.component} } from '@iress-oss/ids-components'\``
      : '',
    meta.storybookUrl
      ? `> **Storybook:** [${meta.title} in Storybook](${meta.storybookUrl})`
      : '',
    '',
  ]
    .filter(Boolean)
    .join('\n');

  // Replace the first H1 + description with our header
  md = md.replace(/^#\s+.*\n+.*\n/, '');
  md = header + md.trimStart();

  return md;
}

// ─── File Processing ─────────────────────────────────────────

async function processFile(
  filePath: string,
): Promise<{ outputPath: string; entry: ManifestEntry } | null> {
  const content = await fs.readFile(filePath, 'utf-8');
  const meta = extractMeta(content);
  if (!meta) return null;

  // Determine category from path
  const relPath = path.relative(CONTENT_DIR, filePath);
  const parts = relPath.split(path.sep);
  const section = parts[0]; // 'components', 'patterns', etc.
  const slug = path.basename(filePath, '.mdx');

  let category: 'component' | 'pattern' | 'guide';
  if (section === 'components') category = 'component';
  else if (section === 'patterns') category = 'pattern';
  else category = 'guide';

  // Only derive components and patterns for the npm package
  if (category === 'guide') return null;

  const outputRelPath = `${section}/${slug}.md`;
  const outputPath = path.join(OUTPUT_DIR, outputRelPath);
  const markdown = mdxToMarkdown(content, meta);

  // Compare-before-write
  if (!DRY_RUN) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    if (existsSync(outputPath)) {
      const existing = readFileSync(outputPath, 'utf-8');
      if (existing === markdown) return null; // unchanged
    }
    await fs.writeFile(outputPath, markdown);
  }

  const entry: ManifestEntry = {
    name: meta.title,
    description: meta.description,
    path: outputRelPath,
    category,
    storybookUrl: meta.storybookUrl,
    ...(meta.component && {
      propsType: `${meta.component}Props`,
      typeDeclPath: `dist/components/${meta.component.replace('Iress', '')}/${meta.component.replace('Iress', '')}.d.ts`,
    }),
  };

  return { outputPath, entry };
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  const targetFiles = parseFiles();
  let files: string[];

  if (targetFiles) {
    files = targetFiles;
  } else {
    // Glob all mdx in components/ and patterns/
    const { glob } = await import('glob');
    files = await glob(
      path.join(CONTENT_DIR, '{components,patterns}/**/*.mdx'),
    );
  }

  console.log(
    `📄 Deriving .ai/ docs from ${files.length} file(s)${DRY_RUN ? ' (dry run)' : ''}...`,
  );

  const entries: ManifestEntry[] = [];
  let changed = 0;

  for (const file of files) {
    const result = await processFile(file);
    if (result) {
      entries.push(result.entry);
      changed++;
      if (DRY_RUN) {
        console.log(`  Would write: ${path.relative(ROOT, result.outputPath)}`);
      }
    }
  }

  // Write manifest (only if full run, not incremental)
  if (!targetFiles && !DRY_RUN) {
    // Read existing manifest to preserve entries for files we didn't process
    const manifestPath = path.join(OUTPUT_DIR, 'index.json');
    let existingEntries: ManifestEntry[] = [];
    if (existsSync(manifestPath)) {
      const existing = JSON.parse(readFileSync(manifestPath, 'utf-8'));
      existingEntries = existing.documentation?.components ?? [];
    }

    // Merge: replace entries we processed, keep others
    const entryMap = new Map(existingEntries.map((e) => [e.path, e]));
    for (const entry of entries) {
      entryMap.set(entry.path, entry);
    }

    const manifest = {
      package: '@iress-oss/ids-components',
      urls: { storybook: STORYBOOK_URL },
      documentation: {
        components: [...entryMap.values()].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      },
    };

    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  }

  console.log(
    `✅ ${changed} file(s) ${DRY_RUN ? 'would be' : ''} updated.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
