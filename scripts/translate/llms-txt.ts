/**
 * Generates llms.txt files from the enriched .ai/index.json manifest.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '../..');
const COMPONENTS_AI = join(ROOT, 'packages/components/.ai');
const TOKENS_AI = join(ROOT, 'packages/tokens/.ai');

interface IndexEntry {
  slug: string;
  type: string;
  name?: string;
  description?: string;
  import?: string;
  path: string;
}

export async function generateLlmsTxt() {
  let generated = 0;
  let errors = 0;

  // Components llms.txt
  try {
    const indexPath = join(COMPONENTS_AI, 'index.json');
    if (!existsSync(indexPath)) throw new Error('index.json not found');

    const entries: IndexEntry[] = JSON.parse(readFileSync(indexPath, 'utf-8'));
    const lines: string[] = [
      '# @iress-oss/ids-components',
      '',
      '> React component library for the Iress Design System',
      '',
      '## Components',
      '',
    ];

    // Group by type
    const grouped: Record<string, IndexEntry[]> = {};
    for (const entry of entries) {
      if (!grouped[entry.type]) grouped[entry.type] = [];
      grouped[entry.type].push(entry);
    }

    for (const [type, items] of Object.entries(grouped)) {
      lines.push(`### ${type.charAt(0).toUpperCase() + type.slice(1)}`);
      lines.push('');
      for (const item of items) {
        const desc = item.description ? ` — ${item.description}` : '';
        lines.push(`- [${item.name ?? item.slug}](.ai/${item.path})${desc}`);
      }
      lines.push('');
    }

    // Skills
    const skillsDir = join(COMPONENTS_AI, 'skills');
    if (existsSync(skillsDir)) {
      lines.push('## Skills');
      lines.push('');
      for (const file of readdirSync(skillsDir).filter((f) => f.endsWith('.md'))) {
        const name = file.replace('.md', '');
        lines.push(`- [${name}](.ai/skills/${file})`);
      }
      lines.push('');
    }

    writeFileSync(join(ROOT, 'packages/components/llms.txt'), lines.join('\n'));
    console.log(`  \u2713 packages/components/llms.txt`);
    generated++;
  } catch (e: any) {
    console.log(`  \u2717 components/llms.txt: ${e.message}`);
    errors++;
  }

  // Tokens llms.txt
  try {
    const lines: string[] = [
      '# @iress-oss/ids-tokens',
      '',
      '> Design tokens for the Iress Design System',
      '',
      '## Reference',
      '',
      '- [Token Reference](.ai/tokens-reference.md) — Complete enumeration of all design tokens',
      '',
    ];

    // Token content docs
    const tokensContentDir = join(TOKENS_AI, 'tokens');
    if (existsSync(tokensContentDir)) {
      lines.push('## Token Guides');
      lines.push('');
      for (const file of readdirSync(tokensContentDir).filter((f) => f.endsWith('.md') && f !== 'tokens-reference.md')) {
        const name = file.replace('.md', '');
        const label = name.charAt(0).toUpperCase() + name.slice(1);
        lines.push(`- [${label}](.ai/tokens/${file})`);
      }
      lines.push('');
    }

    const skillsDir = join(TOKENS_AI, 'skills');
    if (existsSync(skillsDir)) {
      lines.push('## Skills');
      lines.push('');
      for (const file of readdirSync(skillsDir).filter((f) => f.endsWith('.md'))) {
        const name = file.replace('.md', '');
        lines.push(`- [${name}](.ai/skills/${file})`);
      }
      lines.push('');
    }

    writeFileSync(join(ROOT, 'packages/tokens/llms.txt'), lines.join('\n'));
    console.log(`  \u2713 packages/tokens/llms.txt`);
    generated++;
  } catch (e: any) {
    console.log(`  \u2717 tokens/llms.txt: ${e.message}`);
    errors++;
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`✅ llms.txt generation complete!`);
  console.log(`  Generated: ${generated}`);
  console.log(`  Errors:    ${errors}`);
  if (errors > 0) console.log(`  ⚠ llms.txt had errors (non-fatal)`);
}
