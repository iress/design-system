# Skill: IDS Token Usage

## Purpose

Guide AI agents on correctly using IDS design tokens in React components and CSS. This skill covers import patterns, common mistakes, and practical usage rules for each token category.

## Quick Start

### JavaScript / TypeScript

```ts
import { designTokens } from '@iress-oss/ids-tokens';

// Each token is an IressDesignToken object with $value, $type, $description, etc.
designTokens.colour.primary.fill.$value; // '#003271'
designTokens.spacing[4].$value; // 'calc(4 * {spacing.100 || .25rem})'
designTokens.radius[1].$value; // '0.25rem'
designTokens.typography.heading[1].$value; // { fontFamily, fontSize, fontWeight, lineHeight }
```

### CSS Variables

```css
/* Import the stylesheet (once, in app root) */
@import '@iress-oss/ids-tokens/build/css-vars.css';

/* Use variables */
.card {
  background: var(--iress-colour-neutral-10);
  padding: var(--iress-spacing-4);
  border-radius: var(--iress-radius-3);
}
```

## Import Patterns

### Recommended: Named Imports

```ts
// Full design tokens object — best for general use
import { designTokens } from '@iress-oss/ids-tokens';

// Destructure categories you need
const { colour, spacing, radius, typography } = designTokens;
```

### Token Helpers

```ts
// Convert token schema to a nested object of CSS variable references
import { mapTokensToCssVariables } from '@iress-oss/ids-tokens/mapTokensToCssVariables';
const cssVars = mapTokensToCssVariables(designTokens);
// cssVars.colour.primary.fill → 'var(--iress-colour-primary-fill, #003271)'

// Resolve `{colour.neutral.10}` token references to CSS vars
import { convertReferencesToVariables } from '@iress-oss/ids-tokens/convertReferencesToVariables';
convertReferencesToVariables('{colour.neutral.10}');
// → 'var(--iress-colour-neutral-10)'
```

## Usage Rules by Category

### Colour

**Always use colour tokens for colours** — never hardcode hex, rgb, or hsl values.

| Use Case          | Token                        | Example                     |
| ----------------- | ---------------------------- | --------------------------- |
| Page background   | `colour.neutral.10`          | `bg="colour.neutral.10"`    |
| Subtle background | `colour.neutral.20`          | `bg="colour.neutral.20"`    |
| Default text      | `colour.neutral.90`          | `color="colour.neutral.90"` |
| Secondary text    | `colour.neutral.80`          | `color="colour.neutral.80"` |
| Borders           | `colour.neutral.30`          | _Use component props_       |
| Primary action    | `colour.primary.fill`        | _Use Button mode="primary"_ |
| Success indicator | `colour.system.success.fill` | _Use Alert/Tag status_      |
| Danger/Error      | `colour.system.danger.fill`  | _Use Alert/Tag status_      |

```tsx
// ✅ Correct
<IressText color="colour.neutral.80">Subtitle</IressText>
<IressStack bg="colour.neutral.20" p="4">...</IressStack>

// ❌ Wrong — hardcoded colours
<div style={{ color: '#384666' }}>Subtitle</div>
<div style={{ background: '#F5F6F8' }}>...</div>
```

### Spacing

**Use spacing tokens for all spacing** — gaps, padding, margins.

Base unit: 4px (0.25rem). Token value = multiple of base unit.

| Token | Value | Use For                  |
| ----- | ----- | ------------------------ |
| `0`   | 0     | No space                 |
| `1`   | 4px   | Tight inline spacing     |
| `2`   | 8px   | Default element spacing  |
| `3`   | 12px  | Compact section spacing  |
| `4`   | 16px  | Standard section spacing |
| `5`   | 20px  | Medium section spacing   |
| `6`   | 24px  | Section separation       |
| `7`   | 28px  | Large section spacing    |
| `8`   | 32px  | Large group spacing      |
| `10`  | 40px  | Page-level spacing       |

```tsx
// ✅ Correct — tokens
<IressStack gap="4" p="6">...</IressStack>
<IressInline gap="2">...</IressInline>

// ❌ Wrong — arbitrary values
<div style={{ gap: '15px', padding: '25px' }}>...</div>
```

> **Note:** There is no `spacing[9]` token. Valid spacing values: 0, 1, 2, 3, 4, 5, 6, 7, 8, 10.

### Border Radius

**Use radius tokens for all rounded corners.**

| Token      | Value | Semantic Use                     |
| ---------- | ----- | -------------------------------- |
| `radius.0` | 0     | Square/sharp corners             |
| `radius.1` | 4px   | Buttons, form inputs, tags       |
| `radius.2` | 8px   | General purpose                  |
| `radius.3` | 12px  | Cards, panels, layout containers |
| `radius.4` | 16px  | Pills, badges                    |

```tsx
// ✅ Correct — IDS components already have correct radius
<IressButton>Submit</IressButton>  // radius.1 built in
<IressCard>...</IressCard>         // radius.3 built in

// Manual radius only when building custom layout
<IressStack borderRadius="radius.3">Custom panel</IressStack>
```

### Typography

**Use IressText for all text rendering** instead of raw headings or paragraphs.

| Element        | Font   | Size            | Weight |
| -------------- | ------ | --------------- | ------ |
| h1             | Ubuntu | 1.5rem (24px)   | 500    |
| h2             | Ubuntu | 1.25rem (20px)  | 500    |
| h3             | Ubuntu | 1.125rem (18px) | 500    |
| h4             | Ubuntu | 1rem (16px)     | 500    |
| h5             | Ubuntu | 1rem (16px)     | 400    |
| body (default) | Inter  | 0.875rem (14px) | 400    |
| small text     | Inter  | 0.75rem (12px)  | 400    |
| code           | Space  | 1rem (16px)     | 400    |

```tsx
// ✅ Correct
<IressText element="h1">Page Title</IressText>
<IressText>Body paragraph text</IressText>
<IressText size="sm" weight="strong">Small bold label</IressText>

// ❌ Wrong — raw HTML elements lose IDS typography
<h1>Page Title</h1>
<p style={{ fontFamily: 'Inter', fontSize: '14px' }}>Text</p>
```

## CSS Variables in Custom Styles

When you need custom CSS beyond what IDS component props provide:

```css
.custom-card {
  /* Colour tokens */
  background: var(--iress-colour-neutral-10);
  border: 1px solid var(--iress-colour-neutral-30);
  color: var(--iress-colour-neutral-90);

  /* Spacing tokens */
  padding: var(--iress-spacing-4);
  gap: var(--iress-spacing-2);

  /* Radius tokens */
  border-radius: var(--iress-radius-3);

  /* Typography tokens (composite shorthand) */
  font: var(--iress-typography-body-md-regular);
}
```

### CSS Variable Naming Convention

```
--iress-{category}-{path}
```

Examples:

- `--iress-colour-primary-fill`
- `--iress-spacing-4`
- `--iress-radius-1`
- `--iress-typography-heading-1` (shorthand)
- `--iress-typography-heading--1-font-size` (decomposed, double-dash before token name)

## Common Mistakes

### 1. Hardcoded Values Instead of Tokens

```tsx
// ❌ Wrong
<div style={{ background: '#F5F6F8', padding: '16px', borderRadius: '12px' }}>

// ✅ Correct
<IressStack bg="colour.neutral.20" p="4" borderRadius="radius.3">
```

### 2. Using Raw HTML Elements

```tsx
// ❌ Wrong — loses IDS typography and theming
<h2>Section Title</h2>
<p>Body text</p>

// ✅ Correct — uses IDS tokens automatically
<IressText element="h2">Section Title</IressText>
<IressText>Body text</IressText>
```

### 3. Recreating Component Styling

```tsx
// ❌ Wrong — manually styling a button
<button style={{
  background: '#003271',
  color: '#FFFFFF',
  borderRadius: '4px',
  padding: '8px 16px'
}}>Submit</button>

// ✅ Correct — IDS handles all styling via mode
<IressButton mode="primary">Submit</IressButton>
```

### 4. Using Wrong Colour Semantic

```tsx
// ❌ Wrong — using primary fill for background
<IressStack bg="colour.primary.fill">Content</IressStack>

// ✅ Correct — use surface variants for backgrounds
<IressStack bg="colour.primary.surface">Content</IressStack>
```

### 5. Non-Existent Token Values

```tsx
// ❌ Wrong — spacing 9 doesn't exist
<IressStack gap="9">...</IressStack>

// ✅ Correct — use 8 or 10
<IressStack gap="8">...</IressStack>
```

## Responsive Patterns

Layout components accept responsive objects for spacing props:

```tsx
// Responsive gap: 2 on mobile, 4 on tablet, 6 on desktop
<IressStack gap={{ base: '2', md: '4', lg: '6' }}>
  ...
</IressStack>

// Hide on small screens
<IressStack hideBelow="md">Desktop only</IressStack>
```

## Decision Table: Component Props vs CSS Variables

| Situation                        | Use                                |
| -------------------------------- | ---------------------------------- |
| Spacing on IDS layout components | Props: `gap`, `p`, `m`             |
| Colours on IDS components        | Props: `bg`, `color`               |
| Custom CSS not covered by props  | CSS variables                      |
| Inline styles (rare)             | `mapTokensToCssVariables()` helper |
| Theming / overrides              | CSS variables on custom properties |

**General Rule:** Prefer component props when available. Fall back to CSS variables only for custom styling needs.
