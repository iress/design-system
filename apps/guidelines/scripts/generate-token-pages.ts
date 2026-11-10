#!/usr/bin/env tsx
/**
 * Generates token documentation MDX pages for the guidelines site
 * from the auto-generated tokens-reference.md.
 *
 * Source: packages/tokens/.ai/tokens-reference.md
 * Output: apps/guidelines/content/tokens/*.mdx
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const SOURCE = join(ROOT, '../../packages/tokens/.ai/tokens-reference.md');
const OUTPUT_DIR = join(ROOT, 'content/tokens');

mkdirSync(OUTPUT_DIR, { recursive: true });

const source = readFileSync(SOURCE, 'utf-8');

// Extract sections from the token reference
function extractSection(heading: string, nextHeading?: string): string {
  const start = source.indexOf(`## ${heading}`);
  if (start === -1) return '';
  const end = nextHeading
    ? source.indexOf(`## ${nextHeading}`, start + 1)
    : source.indexOf('## Quick Reference', start + 1);
  return source.slice(start, end === -1 ? undefined : end).trim();
}

const colourContent = extractSection('Colour Tokens', 'Spacing Tokens');
const spacingContent = extractSection('Spacing Tokens', 'Radius Tokens');
const radiusContent = extractSection('Radius Tokens', 'Typography Tokens');
const typographyContent = extractSection('Typography Tokens');

// Generate MDX pages
const pages = [
  {
    file: 'colour.mdx',
    title: 'Colour Tokens',
    description: 'All available colour tokens with hex values, CSS variables, and AA-compliant pairings.',
    content: colourContent.replace('## Colour Tokens\n\n', ''),
    usage: `
## Usage

### Via component props

\`\`\`tsx
<IressStack bg="colour.neutral.20" color="colour.neutral.80">
  Content with themed background and text
</IressStack>
\`\`\`

### Via CSS variables

\`\`\`css
.custom-card {
  background: var(--colour-neutral-20);
  color: var(--colour-neutral-80);
}
\`\`\`

### Via cssVars (CSS-in-JS)

\`\`\`tsx
import { cssVars } from '@iress-oss/ids-tokens';

<div style={{ background: cssVars.colour.neutral[20] }}>Themed</div>
\`\`\`
`,
  },
  {
    file: 'spacing.mdx',
    title: 'Spacing Tokens',
    description: 'The spacing scale based on a 4px (0.25rem) base unit, used for gaps, padding, and margins.',
    content: spacingContent.replace('## Spacing Tokens\n\n', ''),
    usage: `
## Usage

### Via component props

\`\`\`tsx
<IressStack gap="spacing.4" p="spacing.6">
  <IressText>Spaced content</IressText>
</IressStack>

{/* Or use aliases */}
<IressStack gap="md" p="lg">
  <IressText>Spaced content</IressText>
</IressStack>
\`\`\`

### Responsive spacing

\`\`\`tsx
<IressStack gap={{ base: 'sm', md: 'md', lg: 'lg' }}>
  Responsive gaps
</IressStack>
\`\`\`

### Via CSS variables

\`\`\`css
.card { padding: var(--spacing-4); gap: var(--spacing-2); }
\`\`\`
`,
  },
  {
    file: 'radius.mdx',
    title: 'Radius Tokens',
    description: 'Border radius tokens for consistent rounded corners across components.',
    content: radiusContent.replace('## Radius Tokens\n\n', ''),
    usage: `
## Usage

### Via component props

\`\`\`tsx
<IressStack borderRadius="radius.3">
  Rounded container
</IressStack>
\`\`\`

### Via CSS variables

\`\`\`css
.card { border-radius: var(--radius-3); }
\`\`\`

> **Note:** Most IDS components already have correct border radius built in.
> Only use radius tokens when building custom layout elements.
`,
  },
  {
    file: 'typography.mdx',
    title: 'Typography Tokens',
    description: 'Font families, sizes, weights, and line heights for headings, body text, and code.',
    content: typographyContent.replace('## Typography Tokens\n\n', ''),
    usage: `
## Usage

### Via IressText (recommended)

\`\`\`tsx
<IressText element="h1">Page Title</IressText>
<IressText>Body paragraph</IressText>
<IressText textStyle="typography.body.sm.strong">Small bold</IressText>
\`\`\`

### Via CSS variables

\`\`\`css
.heading { font: var(--typography-heading-1); }
.body { font: var(--typography-body-md-regular); }
\`\`\`

> **Note:** Always use \`IressText\` for text rendering. It applies the correct
> typography tokens automatically based on the \`element\` prop.
`,
  },
];

for (const page of pages) {
  // Escape { } in content so MDX doesn't treat them as JSX expressions
  const escapedContent = page.content.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
  const mdx = `export const meta = {
  title: '${page.title}',
  description: '${page.description}',
};

# ${page.title}

${page.description}

${escapedContent}
${page.usage}
`;
  writeFileSync(join(OUTPUT_DIR, page.file), mdx);
}

console.log(`Generated ${pages.length} token pages in ${OUTPUT_DIR}`);
