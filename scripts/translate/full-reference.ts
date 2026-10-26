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

  // Build a quick-reference table of all components with links
  const indexPath = join(AI_DIR, 'index.json');
  let quickRef = '';
  if (existsSync(indexPath)) {
    const index = JSON.parse(readFileSync(indexPath, 'utf-8'));
    const components = index.filter((e: { type: string; name?: string }) => e.type === 'components' && e.name);

    // Extract figma links from component docs
    const figmaLinks: string[] = [];
    for (const comp of components) {
      const docPath = join(AI_DIR, comp.path);
      if (!existsSync(docPath)) continue;
      const content = readFileSync(docPath, 'utf-8');
      const figmaMatch = content.match(/\[Figma\]\((https:\/\/www\.figma\.com[^)]+)\)/);
      if (figmaMatch) {
        figmaLinks.push(`| ${comp.name} | [Figma](${figmaMatch[1]}) |`);
      }
    }

    if (figmaLinks.length > 0) {
      quickRef = [
        '## Figma Design Links',
        '',
        '| Component | Figma |',
        '|-----------|-------|',
        ...figmaLinks,
        '',
      ].join('\n');
    }
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
    quickRef,
    '---',
    '',
    sections.join('\n\n---\n\n'),
  ].join('\n');

  mkdirSync(join(ROOT, '.ai'), { recursive: true });
  writeFileSync(OUTPUT_FILE, output);

  // Generate split files for Gemini Gem (better retrieval than one large file)
  const gemDir = join(ROOT, '.ai/gem');
  mkdirSync(gemDir, { recursive: true });
  const categories = ['components', 'patterns', 'foundations', 'get-started', 'migration', 'styling-props', 'tokens', 'skills'];
  for (const cat of categories) {
    const catDir = join(AI_DIR, cat);
    if (!existsSync(catDir)) continue;
    const catFiles = collectMdFiles(catDir);
    if (catFiles.length === 0) continue;
    const catContent = catFiles.map((file) => {
      const content = readFileSync(file, 'utf-8');
      return content;
    }).join('\n\n---\n\n');
    const header = `# IDS ${cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}\n\n> ${catFiles.length} docs\n\n---\n\n`;
    writeFileSync(join(gemDir, `${cat}.md`), header + catContent);
  }

  // Write the quick-reference as a separate file too
  if (quickRef) {
    writeFileSync(join(gemDir, '00-quick-reference.md'), `# IDS Quick Reference\n\n${quickRef}`);
  }

  console.log(`  \u2713 ${relative(ROOT, OUTPUT_FILE)} (${files.length} docs, ${(output.length / 1024).toFixed(0)}KB)`);
  console.log(`  \u2713 .ai/gem/ (${categories.length} split files for Gemini Gem)`);
}
