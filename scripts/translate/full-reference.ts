import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '../..');
const AI_DIR = join(ROOT, 'packages/components/.ai');
const OUTPUT_FILE = join(ROOT, '.ai/IDS-FULL-REFERENCE.md');

function collectMdFiles(dir: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMdFiles(full));
    } else if (entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files.sort();
}

export async function generateFullReference() {
  const files = collectMdFiles(AI_DIR);
  if (files.length === 0) {
    console.log('  \u26A0 No .ai/ files found. Run --components first.');
    return;
  }

  const sections = files.map((file) => {
    const rel = relative(AI_DIR, file);
    const content = readFileSync(file, 'utf-8');
    return `<!-- ${rel} -->\n\n${content}`;
  });

  const output = [
    '# IDS Full Reference',
    '',
    `> Auto-generated from ${files.length} docs. Do not edit manually.`,
    '',
    '---',
    '',
    sections.join('\n\n---\n\n'),
  ].join('\n');

  mkdirSync(join(ROOT, '.ai'), { recursive: true });
  writeFileSync(OUTPUT_FILE, output);
  console.log(`  \u2713 ${relative(ROOT, OUTPUT_FILE)} (${files.length} docs, ${(output.length / 1024).toFixed(0)}KB)`);
}
