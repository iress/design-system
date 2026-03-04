#!/usr/bin/env tsx

/**
 * llms.txt Generator: produces llms.txt files for each package from generated
 * .ai/ directory content. This ensures llms.txt stays in sync with the
 * translated documentation automatically.
 *
 * Reads from:
 *   - packages/components/.ai/index.json   (component/pattern/guide manifest)
 *   - packages/components/.ai/skills/*.md  (skill files)
 *   - packages/tokens/.ai/index.json       (token categories)
 *   - packages/tokens/.ai/skills/*.md      (skill files)
 *   - .agents/skills/<name>/SKILL.md         (skill frontmatter for descriptions)
 *
 * Outputs:
 *   - packages/components/llms.txt
 *   - packages/tokens/llms.txt
 *
 * Usage: npx tsx scripts/generate-llms-txt.ts [--dry-run]
 */

import fs from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ─── Configuration ───────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_AI = path.join(ROOT, 'packages/components/.ai');
const TOKENS_AI = path.join(ROOT, 'packages/tokens/.ai');
const SKILLS_SRC = path.join(ROOT, '.agents/skills');

const STORYBOOK_URL =
  process.env.STORYBOOK_URL ||
  'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

const DRY_RUN = process.argv.includes('--dry-run');

// ─── Types ───────────────────────────────────────────────────

interface ManifestEntry {
  name: string;
  description: string;
  path: string;
  category: string;
  storybookUrl: string;
  guideSection?: string;
}

interface ComponentsManifest {
  package: string;
  urls: { storybook: string };
  documentation: {
    components: ManifestEntry[];
    patterns: ManifestEntry[];
    guides: ManifestEntry[];
  };
}

interface TokenCategory {
  name: string;
  description: string;
  cssVariablePrefix: string;
}

interface TokensManifest {
  package: string;
  description: string;
  skills: { name: string; description: string; path: string }[];
  tokenCategories: TokenCategory[];
}

interface SkillInfo {
  name: string;
  displayName: string;
  description: string;
  path: string;
}

// ─── Helpers ─────────────────────────────────────────────────

/** Parse YAML frontmatter from SKILL.md to extract name and description */
function parseSkillFrontmatter(
  content: string,
): { name: string; description: string } | null {
  const lines = content.split('\n');
  if (lines[0]?.trim() !== '---') return null;

  const endIdx = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
  if (endIdx < 0) return null;

  const frontmatter = lines.slice(1, endIdx).join('\n');
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);

  if (!nameMatch || !descMatch) return null;

  return {
    name: nameMatch[1].trim(),
    description: descMatch[1].trim(),
  };
}

/** Convert kebab-case skill name to display name */
function skillDisplayName(name: string): string {
  const mapping: Record<string, string> = {
    'figma-to-ids': 'Figma to IDS',
    'ui-translation': 'UI Translation',
    'ui-doctor': 'UI Doctor',
    'token-usage': 'Token Usage',
  };
  return (
    mapping[name] ??
    name
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  );
}

/** Discover skills available in a package's .ai/skills/ directory */
async function discoverSkills(
  aiSkillsDir: string,
  relativeBase: string,
): Promise<SkillInfo[]> {
  if (!existsSync(aiSkillsDir)) return [];

  const files = await fs.readdir(aiSkillsDir);
  const skills: SkillInfo[] = [];

  for (const file of files.sort()) {
    if (!file.endsWith('.md')) continue;
    const skillName = file.replace(/\.md$/, '');

    // Try to get description from source SKILL.md frontmatter
    const sourceSkillFile = path.join(SKILLS_SRC, skillName, 'SKILL.md');
    let description = '';

    if (existsSync(sourceSkillFile)) {
      const content = readFileSync(sourceSkillFile, 'utf-8');
      const meta = parseSkillFrontmatter(content);
      if (meta) {
        description = meta.description;
      }
    }

    skills.push({
      name: skillName,
      displayName: skillDisplayName(skillName),
      description,
      path: `${relativeBase}skills/${file}`,
    });
  }

  return skills;
}

// ─── Components llms.txt ─────────────────────────────────────

async function generateComponentsLlmsTxt(): Promise<string> {
  const manifestPath = path.join(COMPONENTS_AI, 'index.json');
  if (!existsSync(manifestPath)) {
    throw new Error(
      `Components manifest not found: ${manifestPath}. Run translate:components first.`,
    );
  }

  const manifest: ComponentsManifest = JSON.parse(
    await fs.readFile(manifestPath, 'utf-8'),
  );
  const { components, patterns, guides } = manifest.documentation;

  // Split guides into Foundations & Guides vs Styling Props
  const foundationGuides = guides.filter(
    (g) => g.guideSection !== 'styling-props',
  );
  const stylingPropsGuides = guides.filter(
    (g) => g.guideSection === 'styling-props',
  );

  // Discover skills
  const skills = await discoverSkills(
    path.join(COMPONENTS_AI, 'skills'),
    '.ai/',
  );

  // Build llms.txt
  const lines: string[] = [];

  // Header
  lines.push('# @iress-oss/ids-components');
  lines.push('');
  lines.push(
    '> React component library for the Iress Design System — accessible, themeable UI primitives with built-in styling props, design tokens, and responsive layout support. All components use the `Iress` prefix (e.g. `IressButton`, `IressInput`).',
  );
  lines.push('');
  lines.push('- Install: `npm install @iress-oss/ids-components`');
  lines.push(
    '- Peer dependencies: `react`, `react-dom`, optionally `react-hook-form`',
  );
  lines.push(
    "- Import CSS: `import '@iress-oss/ids-components/dist/style.css'`",
  );
  lines.push('- Wrap app in `<IressProvider>` for theming and context');
  lines.push(`- Storybook: <${STORYBOOK_URL}>`);
  lines.push(
    '- Structured AI index: `.ai/index.json` (machine-readable catalogue of all docs below)',
  );

  // Components
  lines.push('');
  lines.push('## Components');
  lines.push('');
  for (const c of components) {
    lines.push(`- [${c.name}](.ai/${c.path}): ${c.description}`);
  }

  // Patterns
  lines.push('');
  lines.push('## Patterns');
  lines.push('');
  for (const p of patterns) {
    lines.push(`- [${p.name}](.ai/${p.path}): ${p.description}`);
  }

  // Foundations & Guides
  lines.push('');
  lines.push('## Foundations & Guides');
  lines.push('');
  for (const g of foundationGuides) {
    lines.push(`- [${g.name}](.ai/${g.path}): ${g.description}`);
  }

  // Styling Props
  lines.push('');
  lines.push('## Styling Props');
  lines.push('');
  for (const g of stylingPropsGuides) {
    lines.push(`- [${g.name}](.ai/${g.path}): ${g.description}`);
  }

  // Skills
  lines.push('');
  lines.push('## Skills');
  lines.push('');
  for (const s of skills) {
    lines.push(`- [${s.displayName}](${s.path}): ${s.description}`);
  }

  // Optional
  lines.push('');
  lines.push('## Optional');
  lines.push('');
  lines.push(
    `- [Storybook (live)](<${STORYBOOK_URL}>): Interactive component playground with all examples`,
  );
  lines.push(
    '- [GitHub Repository](<https://github.com/iress/design-system>): Source code and issue tracker',
  );
  lines.push('');

  return lines.join('\n');
}

// ─── Tokens llms.txt ─────────────────────────────────────────

async function generateTokensLlmsTxt(): Promise<string> {
  const manifestPath = path.join(TOKENS_AI, 'index.json');
  if (!existsSync(manifestPath)) {
    throw new Error(
      `Tokens manifest not found: ${manifestPath}. Ensure packages/tokens/.ai/index.json exists.`,
    );
  }

  const manifest: TokensManifest = JSON.parse(
    await fs.readFile(manifestPath, 'utf-8'),
  );

  // Discover skills
  const skills = await discoverSkills(path.join(TOKENS_AI, 'skills'), '.ai/');

  // Build llms.txt
  const lines: string[] = [];

  // Header
  lines.push('# @iress-oss/ids-tokens');
  lines.push('');
  lines.push(
    `> ${manifest.description} Used by \`@iress-oss/ids-components\` and available standalone.`,
  );
  lines.push('');
  lines.push('- Install: `npm install @iress-oss/ids-tokens`');
  lines.push(
    "- CSS import: `import '@iress-oss/ids-tokens/build/css-vars.css'`",
  );
  lines.push(
    "- JS import: `import { cssVars } from '@iress-oss/ids-tokens'` (type-safe `var()` strings with fallbacks)",
  );
  lines.push(
    "- Schema: `import { designTokens } from '@iress-oss/ids-tokens'` (raw token metadata for tooling)",
  );
  lines.push('- Structured AI index: `.ai/index.json`');

  // Token Categories
  lines.push('');
  lines.push('## Token Categories');
  lines.push('');
  for (const cat of manifest.tokenCategories) {
    const name = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
    lines.push(
      `- **${name}**: ${cat.description}. CSS prefix: \`${cat.cssVariablePrefix}\``,
    );
  }

  // Skills
  lines.push('');
  lines.push('## Skills');
  lines.push('');
  for (const s of skills) {
    lines.push(`- [${s.displayName}](${s.path}): ${s.description}`);
  }

  // Optional
  lines.push('');
  lines.push('## Optional');
  lines.push('');
  lines.push(
    '- [GitHub Repository](<https://github.com/iress/design-system>): Source code and issue tracker',
  );
  lines.push('');

  return lines.join('\n');
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log('📄 Generating llms.txt files from .ai/ content...\n');

  if (DRY_RUN) {
    console.log('🏃 DRY RUN — no files will be written\n');
  }

  let generated = 0;
  let errors = 0;

  // Components llms.txt
  try {
    const content = await generateComponentsLlmsTxt();
    const outputPath = path.join(ROOT, 'packages/components/llms.txt');

    if (!DRY_RUN) {
      await fs.writeFile(outputPath, content, 'utf-8');
    }

    console.log(`  ✓ ${path.relative(process.cwd(), outputPath)}`);
    generated++;
  } catch (error) {
    console.error(
      `  ✗ components/llms.txt: ${error instanceof Error ? error.message : error}`,
    );
    errors++;
  }

  // Tokens llms.txt
  try {
    const content = await generateTokensLlmsTxt();
    const outputPath = path.join(ROOT, 'packages/tokens/llms.txt');

    if (!DRY_RUN) {
      await fs.writeFile(outputPath, content, 'utf-8');
    }

    console.log(`  ✓ ${path.relative(process.cwd(), outputPath)}`);
    generated++;
  } catch (error) {
    console.error(
      `  ✗ tokens/llms.txt: ${error instanceof Error ? error.message : error}`,
    );
    errors++;
  }

  // Summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`✅ llms.txt generation complete!`);
  console.log(`  Generated: ${generated}`);
  console.log(`  Errors:    ${errors}`);

  if (DRY_RUN) {
    console.log('\n(dry run — no files written)');
  }

  if (errors > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
