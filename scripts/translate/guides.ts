/**
 * Copies non-component content directories from guidelines to .ai/,
 * stripping MDX syntax to produce clean markdown.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { stripMdx } from './helpers/strip-mdx';

const ROOT = join(import.meta.dirname, '../..');
const GUIDELINES_DIR = join(ROOT, 'apps/guidelines/content');
const OUTPUT_DIR = join(ROOT, 'packages/components/.ai');

const GUIDE_DIRS: Record<string, string> = {
  foundations: 'foundations',
  'get-started': 'get-started',
  migration: 'migration',
  'styling-props': 'styling-props',
};

function copyGuideDir(sourceDir: string, outputSubdir: string): number {
  const srcPath = join(GUIDELINES_DIR, sourceDir);
  const outPath = join(OUTPUT_DIR, outputSubdir);

  if (!existsSync(srcPath)) return 0;
  mkdirSync(outPath, { recursive: true });

  const files = readdirSync(srcPath).filter((f) => f.endsWith('.mdx'));
  let count = 0;

  for (const file of files) {
    const source = readFileSync(join(srcPath, file), 'utf-8');
    const markdown = stripMdx(source, true);
    const outFile = file.replace('.mdx', '.md');
    writeFileSync(join(outPath, outFile), markdown);
    count++;
  }

  return count;
}

export async function translateGuides() {
  let total = 0;
  for (const [srcDir, outDir] of Object.entries(GUIDE_DIRS)) {
    const count = copyGuideDir(srcDir, outDir);
    total += count;
    if (count > 0) console.log(`  ${outDir}/ — ${count} files`);
  }
  console.log(`  \u2713 ${total} guide docs written`);
}
