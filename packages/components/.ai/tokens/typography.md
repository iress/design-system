# Typography Tokens

Font families, sizes, weights, and line heights for headings, body text, and code.

## Design

Typography tokens include font family, size, weight, and line height specifications for headings, body text, and code. They are designed to create a clear typographic hierarchy and ensure consistency across products.

### Base

| Token | CSS Variable | Value | Description |
| --- | --- | --- | --- |
| `typography.base.size` | `--iress-typography-base-size` | `.875rem` | This is the base font size, and is used to calculate the font sizes of each token. |
| `typography.base.headingFont` | `--iress-typography-base-heading-font` | `Ubuntu, Helvetica, sans-serif` | This is the base font family for headings, used for heading tokens. |
| `typography.base.bodyFont` | `--iress-typography-base-body-font` | `Inter, Helvetica, sans-serif` | This is the base font family for body, used for body tokens. |

### Headings

| Token | CSS Variable | Value | Description |
| --- | --- | --- | --- |
| `typography.heading.1` | `--iress-typography-heading-1` | `500 calc({typography.base.size || .875rem} * (24 / 14))/1.33 {typography.base.headingFont || Ubuntu, Helvetica, sans-serif}` | Use for the main page title to establish a clear hierarchy. There is only one H1 per screen, emphasising the primary purpose or context of the page. |
| `typography.heading.2` | `--iress-typography-heading-2` | `500 calc({typography.base.size || .875rem} * (20 / 14))/1.4 {typography.base.headingFont || Ubuntu, Helvetica, sans-serif}` | Use for **primary section headings** within a page to organise content and guide the user through key areas. Also suitable for large components—such as modals—where space allows and where it pairs well with: body.md. |
| `typography.heading.3` | `--iress-typography-heading-3` | `500 calc({typography.base.size || .875rem} * (18 / 14))/1.5 {typography.base.headingFont || Ubuntu, Helvetica, sans-serif}` | Use for: sub-sections under H2s to further structure content and maintain a clear visual hierarchy. Ideal for breaking down complex sections into manageable parts. |
| `typography.heading.4` | `--iress-typography-heading-4` | `500 calc({typography.base.size || .875rem} * (16 / 14))/1.42 {typography.base.headingFont || Ubuntu, Helvetica, sans-serif}` | Use for: supporting headings within content blocks or small components where space is limited—such as table headers, cards, or side panels. Provides structure without overwhelming the layout. |
| `typography.heading.5` | `--iress-typography-heading-5` | `400 calc({typography.base.size || .875rem} * (16 / 14))/1.42 {typography.base.headingFont || Ubuntu, Helvetica, sans-serif}` | Use for: minor labels or titles in compact UI elements, such as cards, sidebars, or inline labels. Best used to emphasise supplementary information without drawing too much attention. Works well with body.sm and is ideal for subtle content like fine print. Use sparingly to preserve typographic hierarchy. |

### Body

— Small (`body.sm`)

| Token | CSS Variable | Value | Description |
| --- | --- | --- | --- |
| `typography.body.sm.regular` | `--iress-typography-body-sm-regular` | `400 calc({typography.base.size || .875rem} * (12 / 14))/1.5 {typography.base.bodyFont || Inter, Helvetica, sans-serif}` | The default small text, most commonly used to display text in small components and compact tables and lists. |
| `typography.body.sm.medium` | `--iress-typography-body-sm-medium` | `500 calc({typography.base.size || .875rem} * (12 / 14))/1.5 {typography.base.bodyFont || Inter, Helvetica, sans-serif}` | Medium text is used to indicate text is interactive, such as a button or a link. |
| `typography.body.sm.strong` | `--iress-typography-body-sm-strong` | `600 calc({typography.base.size || .875rem} * (12 / 14))/1.5 {typography.base.bodyFont || Inter, Helvetica, sans-serif}` | Strong text is used to highlight important information in a paragraph of text. |
| `typography.body.sm.em` | `--iress-typography-body-sm-em` | `500 italic calc({typography.base.size || .875rem} * (12 / 14))/1.5 {typography.base.bodyFont || Inter, Helvetica, sans-serif}` | Emphasised text is used to highlight a term or definition in a paragraph of text. It is used sparingly, usually for legal purposes. |

### Code

| Token | CSS Variable | Value | Description |
| --- | --- | --- | --- |
| `typography.code` | `--iress-typography-code` | `400 calc({typography.base.size || .875rem} * (16 / 14))/1.6 Space, monospace` | Used to display code snippets in the product, such as in the API documentation. |

---

## Quick Reference: Token Path → CSS Variable

```
token.path.name → --iress-token-path-name
```

Examples:
- `colour.primary.fill` → `--iress-colour-primary-fill`
- `spacing.4` → `--iress-spacing-4`
- `radius.system.button` → `--iress-radius-system-button`
- `typography.heading.1` → `--iress-typography-heading-1`
- `typography.body.md.regular` → `--iress-typography-body-md-regular`

## Quick Reference: `cssVars` Usage

```tsx
import { cssVars } from '@iress-oss/ids-tokens';

cssVars.colour.primary.fill; // 'var(--iress-colour-primary-fill, ...)'
cssVars.colour.neutral[80]; // 'var(--iress-colour-neutral-80, ...)'
cssVars.spacing[4]; // 'var(--iress-spacing-4, ...)'
cssVars.radius[2]; // 'var(--iress-radius-2, ...)'
cssVars.typography.heading[1]; // 'var(--iress-typography-heading-1, ...)'
cssVars.typography.body.md.regular; // 'var(--iress-typography-body-md-regular, ...)'
```

## Develop

You can use these tokens in your applications in three ways: via component props, CSS variables, or CSS-in-JS using the `cssVars` export from the `@iress-oss/ids-tokens` package.

> **Note:** Always use `IressText` for text rendering. It applies the correct
> typography tokens automatically based on the `element` prop.

### Via IressText (recommended)

```tsx
import { IressText } from '@iress-oss/ids-components';

<IressText element="h1">Page Title</IressText>
<IressText>Body paragraph</IressText>
<IressText textStyle="typography.body.sm.strong">Small bold</IressText>
```

### Via CSS variables

```css
.heading { font: var(--typography-heading-1); }
.body { font: var(--typography-body-md-regular); }
```