import { createIndex, close } from 'pagefind';
import { readFileSync, readdirSync, statSync, watch } from 'fs';
import { join, relative } from 'path';

const CONTENT_DIR = join(import.meta.dirname, '../content');
const isWatch = process.argv.includes('--watch');
const OUTPUT_DIR = isWatch
  ? join(import.meta.dirname, '../public/pagefind')
  : join(import.meta.dirname, '../dist/pagefind');

function getMdxFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...getMdxFiles(full));
    } else if (entry.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

function extractMeta(source: string): { title?: string; description?: string } {
  const metaMatch = source.match(/export\s+const\s+meta\s*=\s*(\{[\s\S]*?\});/);
  if (!metaMatch) return {};
  try {
    return new Function(`return ${metaMatch[1]}`)();
  } catch {
    return {};
  }
}

function stripMdx(source: string): string {
  return source
    .replace(/export\s+const\s+meta\s*=\s*\{[\s\S]*?\};/g, '') // remove meta export
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')           // remove imports
    .replace(/```\w*\n?/g, '')                                   // remove code fences (keep content)
    .replace(/<[^>]+>/g, ' ')                                    // strip JSX/HTML tags
    .replace(/[#*_`\[\]()]/g, '')                                // strip markdown syntax
    .replace(/\n{2,}/g, '\n')                                    // collapse newlines
    .trim();
}

async function main() {
  const { index } = await createIndex({ forceLanguage: 'en' });
  if (!index) {
    console.error('Failed to create Pagefind index');
    process.exit(1);
  }

  const files = getMdxFiles(CONTENT_DIR);
  console.log(`Indexing ${files.length} MDX files...`);

  for (const file of files) {
    const source = readFileSync(file, 'utf-8');
    const meta = extractMeta(source);
    const content = stripMdx(source);
    const rel = relative(CONTENT_DIR, file).replace('.mdx', '');
    const url = `/#/${rel}`;

    await index.addCustomRecord({
      url,
      content,
      language: 'en',
      meta: {
        title: meta.title ?? rel.split('/').pop()!,
        ...(meta.description ? { description: meta.description } : {}),
      },
    });
  }

  await index.writeFiles({ outputPath: OUTPUT_DIR });
  await close();
  console.log(`Pagefind index written to ${OUTPUT_DIR}`);
}

main();

if (isWatch) {
  let timeout: ReturnType<typeof setTimeout>;
  console.log('Watching content/ for changes...');
  watch(CONTENT_DIR, { recursive: true }, (_event, filename) => {
    if (!filename?.endsWith('.mdx')) return;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log(`\nContent changed: ${filename}`);
      main();
    }, 300);
  });
}
