#!/usr/bin/env tsx

/**
 * Token Reference Generator: reads the design token schema and generates
 * a comprehensive markdown reference with all token values, descriptions,
 * aliases, and AA-compliant colour pairings.
 *
 * Source: packages/tokens/src/schema/ (colour, spacing, radius, typography)
 * Outputs (same content, two locations):
 *   - packages/tokens/.ai/tokens-reference.md                   (AI agent context)
 *   - .agents/skills/token-usage/references/token-reference.md  (inlined into skill)
 *
 * Usage: npx tsx scripts/generate-token-reference.ts [--dry-run]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { designTokens, type IressDesignToken } from '@iress-oss/ids-tokens';

// ─── Configuration ───────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const OUTPUT_AI = path.join(ROOT, 'packages/tokens/.ai/tokens-reference.md');
const OUTPUT_SKILL = path.join(
  ROOT,
  '.agents/skills/token-usage/references/token-reference.md',
);

const DRY_RUN = process.argv.includes('--dry-run');

// ─── Types ───────────────────────────────────────────────────

interface TokenInfo {
  name: string;
  cssVar: string;
  description: string;
  value: string;
  type: string;
  aliases?: string[];
  aaPairings?: string[];
}

interface GroupInfo {
  path: string;
  description: string;
}

// ─── Token Extraction ────────────────────────────────────────

function tokenPathToCssVar(tokenPath: string): string {
  const raw = tokenPath.replace(/\./g, '-');
  // Convert camelCase segments to kebab-case to match getCssVariable.ts behaviour
  const kebab = raw.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  return `--iress-${kebab}`;
}

/**
 * Resolve a token $value to a human-readable display string.
 * Handles plain strings, composite objects (typography, radius), and reference expressions.
 */
function resolveDisplayValue(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'object' && value !== null) {
    // Composite typography
    const v = value as Record<string, unknown>;
    if ('fontFamily' in v && 'fontSize' in v) {
      const parts: string[] = [];
      if (v.fontWeight) parts.push(String(v.fontWeight));
      if (v.fontStyle && v.fontStyle !== 'normal')
        parts.push(String(v.fontStyle));
      if (v.fontSize) parts.push(String(v.fontSize));
      if (v.lineHeight) parts[parts.length - 1] += `/${v.lineHeight}`;
      if (v.fontFamily) parts.push(String(v.fontFamily));
      return parts.join(' ');
    }
    // Composite radius (per-corner)
    if (
      'topLeft' in v ||
      'topRight' in v ||
      'bottomLeft' in v ||
      'bottomRight' in v
    ) {
      const corners = [v.topLeft, v.topRight, v.bottomRight, v.bottomLeft]
        .map((c) => String(c ?? '0'))
        .join(' ');
      return corners;
    }
    return JSON.stringify(value);
  }
  return String(value);
}

/**
 * Recursively extract all tokens from a schema group.
 */
function extractTokens(
  obj: Record<string, unknown>,
  prefix: string,
  tokens: TokenInfo[] = [],
  groups: GroupInfo[] = [],
): { tokens: TokenInfo[]; groups: GroupInfo[] } {
  // Capture group description
  if ('$description' in obj && typeof obj.$description === 'string' && prefix) {
    groups.push({ path: prefix, description: obj.$description });
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;

    const tokenPath = prefix ? `${prefix}.${key}` : key;

    if (
      typeof value === 'object' &&
      value !== null &&
      '$description' in value &&
      '$type' in value &&
      '$value' in value
    ) {
      const token = value as unknown as IressDesignToken;
      const info: TokenInfo = {
        name: tokenPath,
        cssVar: tokenPathToCssVar(tokenPath),
        description: token.$description,
        value: resolveDisplayValue(token.$value),
        type: token.$type,
      };

      const aliases = token.$extensions?.['iress.aliases'];
      if (Array.isArray(aliases) && aliases.length > 0) {
        info.aliases = aliases;
      }

      const aa = token.$extensions?.['iress.contrast.AA'];
      if (Array.isArray(aa) && aa.length > 0) {
        info.aaPairings = aa;
      }

      tokens.push(info);
    } else if (typeof value === 'object' && value !== null) {
      extractTokens(
        value as Record<string, unknown>,
        tokenPath,
        tokens,
        groups,
      );
    }
  }

  return { tokens, groups };
}

// ─── Markdown Generation (Full .ai reference) ───────────────

function formatAaPairings(pairings: string[]): string {
  return pairings
    .map((p) => {
      // Strip leading "colour." prefix for readability
      return p.replace(/^colour\./, '');
    })
    .join(', ');
}

function generateColourSection(
  tokens: TokenInfo[],
  groups: GroupInfo[],
): string {
  const lines: string[] = ['## Colour Tokens\n'];

  // Group tokens by their immediate parent group
  const groupMap = new Map<string, TokenInfo[]>();
  for (const t of tokens) {
    if (!t.name.startsWith('colour.')) continue;
    const lastDot = t.name.lastIndexOf('.');
    const group = lastDot > 0 ? t.name.substring(0, lastDot) : 'colour';
    if (!groupMap.has(group)) groupMap.set(group, []);
    groupMap.get(group)!.push(t);
  }

  // Find group descriptions
  const groupDescriptions = new Map<string, string>();
  for (const g of groups) {
    groupDescriptions.set(g.path, g.description);
  }

  // Render each group
  for (const [groupPath, groupTokens] of groupMap) {
    const heading = groupPath
      .replace('colour.', '')
      .split('.')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' — ');

    lines.push(`### ${heading}\n`);

    const desc = groupDescriptions.get(groupPath);
    if (desc) lines.push(`${desc}\n`);

    const hasAliases = groupTokens.some((t) => t.aliases?.length);
    const hasAa = groupTokens.some((t) => t.aaPairings?.length);

    // Build header
    const cols = ['Token', 'CSS Variable', 'Value', 'Description'];
    if (hasAliases) cols.push('Aliases');
    if (hasAa) cols.push('AA-Compliant Pairings');

    lines.push(`| ${cols.join(' | ')} |`);
    lines.push(`| ${cols.map(() => '---').join(' | ')} |`);

    for (const t of groupTokens) {
      const row = [
        `\`${t.name}\``,
        `\`${t.cssVar}\``,
        `\`${t.value}\``,
        t.description,
      ];
      if (hasAliases)
        row.push(t.aliases?.length ? `\`${t.aliases.join('`, `')}\`` : '—');
      if (hasAa)
        row.push(t.aaPairings?.length ? formatAaPairings(t.aaPairings) : '—');
      lines.push(`| ${row.join(' | ')} |`);
    }

    lines.push('');
  }

  return lines.join('\n');
}

function generateSpacingSection(tokens: TokenInfo[]): string {
  const spacingTokens = tokens.filter((t) => t.name.startsWith('spacing.'));
  const lines: string[] = ['## Spacing Tokens\n'];
  lines.push(
    'Base unit: `0.25rem` (4px). Values range from 0–8 and 10 (no 9).\n',
  );

  lines.push('| Token | CSS Variable | Value | Description | Aliases |');
  lines.push('| --- | --- | --- | --- | --- |');

  for (const t of spacingTokens) {
    const aliases = t.aliases?.length ? `\`${t.aliases.join('`, `')}\`` : '—';
    lines.push(
      `| \`${t.name}\` | \`${t.cssVar}\` | \`${t.value}\` | ${t.description} | ${aliases} |`,
    );
  }

  lines.push('');
  return lines.join('\n');
}

function generateRadiusSection(
  tokens: TokenInfo[],
  groups: GroupInfo[],
): string {
  const scaleTokens = tokens.filter(
    (t) => t.name.startsWith('radius.') && !t.name.startsWith('radius.system'),
  );
  const systemTokens = tokens.filter((t) =>
    t.name.startsWith('radius.system.'),
  );

  const lines: string[] = ['## Radius Tokens\n'];
  lines.push('Border radius scale based on `0.25rem` (4px) base unit.\n');

  lines.push('### Scale Tokens\n');
  lines.push('| Token | CSS Variable | Value | Description |');
  lines.push('| --- | --- | --- | --- |');
  for (const t of scaleTokens) {
    lines.push(
      `| \`${t.name}\` | \`${t.cssVar}\` | \`${t.value}\` | ${t.description} |`,
    );
  }
  lines.push('');

  if (systemTokens.length > 0) {
    lines.push('### System Tokens\n');
    lines.push(
      'Component-specific radius tokens that can be overridden for branding.\n',
    );
    lines.push('| Token | CSS Variable | Value | Description |');
    lines.push('| --- | --- | --- | --- |');
    for (const t of systemTokens) {
      lines.push(
        `| \`${t.name}\` | \`${t.cssVar}\` | \`${t.value}\` | ${t.description} |`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

function generateTypographySection(
  tokens: TokenInfo[],
  groups: GroupInfo[],
): string {
  const baseTokens = tokens.filter((t) =>
    t.name.startsWith('typography.base.'),
  );
  const headingTokens = tokens.filter((t) =>
    t.name.startsWith('typography.heading.'),
  );
  const bodySmTokens = tokens.filter((t) =>
    t.name.startsWith('typography.body.sm.'),
  );
  const bodyMdTokens = tokens.filter((t) =>
    t.name.startsWith('typography.body.md.'),
  );
  const codeTokens = tokens.filter((t) => t.name === 'typography.code');

  const lines: string[] = ['## Typography Tokens\n'];

  // Base
  if (baseTokens.length > 0) {
    lines.push('### Base\n');
    lines.push('| Token | CSS Variable | Value | Description |');
    lines.push('| --- | --- | --- | --- |');
    for (const t of baseTokens) {
      lines.push(
        `| \`${t.name}\` | \`${t.cssVar}\` | \`${t.value}\` | ${t.description} |`,
      );
    }
    lines.push('');
  }

  // Headings
  if (headingTokens.length > 0) {
    lines.push('### Headings\n');
    lines.push('| Token | CSS Variable | Value | Description |');
    lines.push('| --- | --- | --- | --- |');
    for (const t of headingTokens) {
      lines.push(
        `| \`${t.name}\` | \`${t.cssVar}\` | \`${t.value}\` | ${t.description} |`,
      );
    }
    lines.push('');
  }

  // Body — Small
  if (bodySmTokens.length > 0) {
    lines.push('### Body — Small (`body.sm`)\n');
    lines.push('| Token | CSS Variable | Value | Description |');
    lines.push('| --- | --- | --- | --- |');
    for (const t of bodySmTokens) {
      lines.push(
        `| \`${t.name}\` | \`${t.cssVar}\` | \`${t.value}\` | ${t.description} |`,
      );
    }
    lines.push('');
  }

  // Body — Medium
  if (bodyMdTokens.length > 0) {
    lines.push('### Body — Medium (`body.md`)\n');
    lines.push('| Token | CSS Variable | Value | Description |');
    lines.push('| --- | --- | --- | --- |');
    for (const t of bodyMdTokens) {
      lines.push(
        `| \`${t.name}\` | \`${t.cssVar}\` | \`${t.value}\` | ${t.description} |`,
      );
    }
    lines.push('');
  }

  // Code
  if (codeTokens.length > 0) {
    lines.push('### Code\n');
    lines.push('| Token | CSS Variable | Value | Description |');
    lines.push('| --- | --- | --- | --- |');
    for (const t of codeTokens) {
      lines.push(
        `| \`${t.name}\` | \`${t.cssVar}\` | \`${t.value}\` | ${t.description} |`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

function generateFullReference(
  allTokens: TokenInfo[],
  allGroups: GroupInfo[],
): string {
  const lines: string[] = [
    '<!-- AUTO-GENERATED by scripts/generate-token-reference.ts — DO NOT EDIT -->',
    '',
    '# Design Token Reference',
    '',
    'Complete enumeration of all IDS design tokens with values, descriptions, aliases, and accessibility pairings.',
    '',
    '> **Package:** `@iress-oss/ids-tokens`',
    "> **CSS Stylesheet:** `@import '@iress-oss/ids-tokens/build/css-vars.css'`",
    "> **JS Object:** `import { cssVars } from '@iress-oss/ids-tokens'`",
    '',
    '---',
    '',
  ];

  lines.push(generateColourSection(allTokens, allGroups));
  lines.push(generateSpacingSection(allTokens));
  lines.push(generateRadiusSection(allTokens, allGroups));
  lines.push(generateTypographySection(allTokens, allGroups));

  // Quick reference
  lines.push('---\n');
  lines.push('## Quick Reference: Token Path → CSS Variable\n');
  lines.push('```');
  lines.push('token.path.name → --iress-token-path-name');
  lines.push('```\n');
  lines.push('Examples:');
  lines.push('- `colour.primary.fill` → `--iress-colour-primary-fill`');
  lines.push('- `spacing.4` → `--iress-spacing-4`');
  lines.push('- `radius.system.button` → `--iress-radius-system-button`');
  lines.push('- `typography.heading.1` → `--iress-typography-heading-1`');
  lines.push(
    '- `typography.body.md.regular` → `--iress-typography-body-md-regular`',
  );
  lines.push('');

  lines.push('## Quick Reference: `cssVars` Usage\n');
  lines.push('```tsx');
  lines.push("import { cssVars } from '@iress-oss/ids-tokens';");
  lines.push('');
  lines.push(
    "cssVars.colour.primary.fill        // 'var(--iress-colour-primary-fill, ...)'",
  );
  lines.push(
    "cssVars.colour.neutral[80]         // 'var(--iress-colour-neutral-80, ...)'",
  );
  lines.push(
    "cssVars.spacing[4]                 // 'var(--iress-spacing-4, ...)'",
  );
  lines.push(
    "cssVars.radius[2]                  // 'var(--iress-radius-2, ...)'",
  );
  lines.push(
    "cssVars.typography.heading[1]      // 'var(--iress-typography-heading-1, ...)'",
  );
  lines.push(
    "cssVars.typography.body.md.regular // 'var(--iress-typography-body-md-regular, ...)'",
  );
  lines.push('```');
  lines.push('');

  return lines.join('\n');
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log('🔄 Generating token reference from schema...\n');

  if (DRY_RUN) {
    console.log('🏃 DRY RUN — no files will be written\n');
  }

  // Extract all tokens from the schema
  const allTokens: TokenInfo[] = [];
  const allGroups: GroupInfo[] = [];

  for (const [category, schema] of Object.entries(designTokens)) {
    extractTokens(
      schema as unknown as Record<string, unknown>,
      category,
      allTokens,
      allGroups,
    );
  }

  console.log(
    `  Found ${allTokens.length} tokens in ${Object.keys(designTokens).length} categories`,
  );

  // Generate reference content (single format for both outputs)
  const reference = generateFullReference(allTokens, allGroups);

  const outputs = [
    { path: OUTPUT_AI, label: 'AI context' },
    { path: OUTPUT_SKILL, label: 'Skill reference' },
  ];

  for (const output of outputs) {
    const rel = path.relative(process.cwd(), output.path);
    if (!DRY_RUN) {
      await fs.mkdir(path.dirname(output.path), { recursive: true });
      await fs.writeFile(output.path, reference, 'utf-8');
    }
    console.log(`  ✓ ${output.label} → ${rel}`);
  }

  // Summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log('✅ Token reference generation complete!');

  if (DRY_RUN) {
    console.log('\n(dry run — no files written)');
  }
}

main().catch((err) => {
  console.error('Token reference generation failed:', err);
  process.exit(1);
});
