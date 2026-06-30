# Spacing Tokens

The spacing scale based on a 4px (0.25rem) base unit, used for gaps, padding, and margins.

## Design

Base unit: `0.25rem` (4px). Values range from 0–8 and 10 (no 9).

Base unit: `0.25rem` (4px). Values range from 0–8 and 10 (no 9).

| Token | CSS Variable | Value | Description | Aliases |
| --- | --- | --- | --- | --- |
| `spacing.0` | `--iress-spacing-0` | `0rem` | No spacing | `none` |
| `spacing.1` | `--iress-spacing-1` | `.25rem` | The base unit for spacing | `xs` |
| `spacing.2` | `--iress-spacing-2` | `calc(2 * {spacing.100 || .25rem})` | 2x spacing | `sm` |
| `spacing.3` | `--iress-spacing-3` | `calc(3 * {spacing.100 || .25rem})` | 3x spacing | — |
| `spacing.4` | `--iress-spacing-4` | `calc(4 * {spacing.100 || .25rem})` | 4x spacing | `md` |
| `spacing.5` | `--iress-spacing-5` | `calc(5 * {spacing.100 || .25rem})` | 5x spacing | — |
| `spacing.6` | `--iress-spacing-6` | `calc(6 * {spacing.100 || .25rem})` | 6x spacing | `lg` |
| `spacing.7` | `--iress-spacing-7` | `calc(7 * {spacing.100 || .25rem})` | 7x spacing | — |
| `spacing.8` | `--iress-spacing-8` | `calc(8 * {spacing.100 || .25rem})` | 8x spacing | — |
| `spacing.10` | `--iress-spacing-10` | `calc(10 * {spacing.100 || .25rem})` | 10x spacing | `xl` |

## Develop

You can use these tokens in your applications in three ways: via component props, CSS variables, or CSS-in-JS using the `cssVars` export from the `@iress-oss/ids-tokens` package.

### Via component props

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

<IressStack gap="spacing.4" p="spacing.6">
  <IressText>Spaced content</IressText>
</IressStack>;

{
  /* Or use aliases */
}
<IressStack gap="md" p="lg">
  <IressText>Spaced content</IressText>
</IressStack>;
```

### Responsive spacing

```tsx
import { IressStack } from '@iress-oss/ids-components';

<IressStack gap={{ base: 'sm', md: 'md', lg: 'lg' }}>
  Responsive gaps
</IressStack>;
```

### Via CSS variables

```css
.card { padding: var(--spacing-4); gap: var(--spacing-2); }
```