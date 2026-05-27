# IDS Constants Reference

Exported constants from `@iress-oss/ids-components` for use in application logic, documentation, and tooling.

```ts
import { BREAKPOINT_DETAILS, BREAKPOINTS, GRID_SIZE, Z_INDEX, FORM_ELEMENT_WIDTHS, MATERIAL_SYMBOLS } from '@iress-oss/ids-components';
```

## BREAKPOINT_DETAILS

Object containing responsive breakpoint metadata. Use in documentation, media queries, and responsive logic.

```ts
interface BreakpointDetail {
  containerMaxWidth: string;
  margin?: string;        // spacing token (e.g. 'spacing.4')
  maxColumns?: number;
  maxScreenWidth?: string;
  mediaQuery: string;     // valid CSS media query
  minScreenWidth: string;
  screenWidthRange: string;
  viewportWidth: number;  // px value for Storybook/testing viewport
}
```

| Key   | minScreenWidth | maxScreenWidth | containerMaxWidth | viewportWidth | margin     | maxColumns |
|-------|---------------|----------------|-------------------|---------------|------------|------------|
| `xs`  | `0px`         | `575px`        | `100%`            | `360`         | `spacing.4`| 4          |
| `sm`  | `576px`       | `767px`        | `100%`            | `767`         | `spacing.4`| —          |
| `md`  | `768px`       | `1023px`       | `100%`            | `1022`        | `spacing.6`| 4          |
| `lg`  | `1024px`      | `1279px`       | `100%`            | `1278`        | `spacing.6`| 6          |
| `xl`  | `1280px`      | `1599px`       | `1440px`          | `1504`        | `spacing.8`| —          |
| `xxl` | `1600px`      | —              | `1690px`          | `1754`        | `spacing.8`| —          |

### Usage

```tsx
// In documentation or code examples — always reference constants, never hardcode values
<IressText>{BREAKPOINT_DETAILS.xs.viewportWidth}px</IressText>
<IressText>{BREAKPOINT_DETAILS.md.minScreenWidth}</IressText>

// For custom media queries
const css = `@media (${BREAKPOINT_DETAILS.md.mediaQuery}) { ... }`;
```

### Rules

- **Never hardcode breakpoint values** — always import from `BREAKPOINT_DETAILS`
- Use `viewportWidth` for Storybook viewport sizes and testing
- Use `mediaQuery` for CSS media queries
- Use `minScreenWidth`/`maxScreenWidth` for documentation display

## BREAKPOINTS

Array of breakpoint keys in order: `['xs', 'sm', 'md', 'lg', 'xl', 'xxl']`

```ts
BREAKPOINTS.forEach((bp) => console.log(BREAKPOINT_DETAILS[bp].mediaQuery));
```

## GRID_SIZE

The grid column count: `12`

```tsx
// Use when calculating column spans programmatically
const halfWidth = GRID_SIZE / 2; // 6
```

## Z_INDEX

Stacking order values for layered UI:

| Key       | Value | Use For           |
|-----------|-------|-------------------|
| `DEFAULT` | 0     | Normal flow       |
| `NAVBAR`  | 100   | Fixed navigation  |
| `POPOVER` | 200   | Popovers/menus   |
| `SLIDEOUT`| 300   | Slideout panels   |
| `MODAL`   | 400   | Modal dialogs     |
| `TOAST`   | 500   | Toast messages    |
| `TOOLTIP` | 600   | Tooltips          |

```tsx
// Only needed for custom positioned elements outside IDS components
<div style={{ zIndex: Z_INDEX.POPOVER }}>Custom overlay</div>
```

## FORM_ELEMENT_WIDTHS

Valid width values for form inputs: `'2' | '4' | '6' | '8' | '10' | '12' | '16' | '25%' | '50%' | '75%' | '100%'`

```tsx
<IressInput width="8" />  // 8 character widths
<IressInput width="50%" /> // Half container
```

## MATERIAL_SYMBOLS

Icon configuration for the Material Symbols Rounded icon set used by IDS:

| Key             | Value                      |
|-----------------|----------------------------|
| `family`        | `'Material Symbols Rounded'` |
| `className`     | `'material-symbols-rounded'` |
| `grade`         | `0`                        |
| `opticalSize`   | `36`                       |
| `weight`        | `300`                      |

## When to Use Constants vs Tokens

| Need                          | Use                            |
|-------------------------------|--------------------------------|
| Colours, spacing, radius      | Design tokens (`cssVars`, CSS vars, component props) |
| Breakpoint values in logic    | `BREAKPOINT_DETAILS`           |
| Media queries in custom CSS   | `BREAKPOINT_DETAILS[bp].mediaQuery` |
| Grid calculations             | `GRID_SIZE`                    |
| Z-index for custom layers     | `Z_INDEX`                      |
| Form input sizing             | `FORM_ELEMENT_WIDTHS`          |
| Icon configuration            | `MATERIAL_SYMBOLS`             |
