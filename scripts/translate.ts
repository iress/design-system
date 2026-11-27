/**
 * Unified translate pipeline.
 *
 * Derives all .ai/ content from source.
 * Replaces: translate-components.ts, derive-ai-docs.ts, generate-token-reference.ts,
 *           translate-skills.ts, generate-llms-txt.ts
 *
 * Usage:
 *   tsx scripts/translate.ts                  # Run all
 *   tsx scripts/translate.ts --components     # All guidelines content (components, patterns, foundations, styling-props, etc.)
 *   tsx scripts/translate.ts --tokens         # Token reference
 *   tsx scripts/translate.ts --skills         # Skills
 *   tsx scripts/translate.ts --llms-txt       # llms.txt
 *   tsx scripts/translate.ts --full-reference # IDS-FULL-REFERENCE.md
 */

import { translateComponents } from './translate/components';
import { translateTokens } from './translate/tokens';
import { translateSkills } from './translate/skills';
import { generateLlmsTxt } from './translate/llms-txt';
import { generateFullReference } from './translate/full-reference';

const args = process.argv.slice(2);

const commands: Record<string, () => Promise<void>> = {
  '--components': translateComponents,
  '--guides': translateComponents, // alias — unified pipeline
  '--tokens': translateTokens,
  '--skills': translateSkills,
  '--llms-txt': generateLlmsTxt,
  '--full-reference': generateFullReference,
};

async function main() {
  const start = performance.now();

  const selected = args.length
    ? args.filter((a) => a in commands)
    : ['--tokens', '--components', '--skills', '--llms-txt', '--full-reference'];

  if (selected.length === 0) {
    console.error('Unknown command. Available:', Object.keys(commands).join(', '));
    process.exit(1);
  }

  for (const cmd of selected) {
    console.log(`\n\u25B8 ${cmd.replace('--', '')}`);
    await commands[cmd]();
  }

  const elapsed = ((performance.now() - start) / 1000).toFixed(2);
  console.log(`\n\u2713 Done in ${elapsed}s`);
}

main().catch((err) => {
  console.error('\u2717 Failed:', err.message ?? err);
  process.exit(1);
});
