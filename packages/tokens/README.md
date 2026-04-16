# IDS Tokens

IDS Tokens are a single source of truth to name and store Iress design decisions.

## Getting started

> **Note:** IDS v6 is currently in beta. Install with the `@beta` tag:

```bash
yarn add @iress-oss/ids-tokens@beta
# If also using IDS React components:
yarn add @iress-oss/ids-components@beta
```

## Using the design tokens in your application

### Token metadata

The design tokens follow the official W3C [design tokens specification](https://www.w3.org/TR/design-tokens/). The tokens are available in an object format, which can be used in JavaScript or TypeScript applications.

```tsx
import { designTokens } from '@iress-oss/ids-tokens';

function TokenInfo() {
  const { colour } = designTokens;
  return (
    <>
      <h2>Primary token ({colour.primary.fill.$type})</h2>
      <p>{colour.primary.fill.$description}</p>
      <p>Default value: {colour.primary.fill.$value}</p>
    </>
  );
}
```

### CSS Variables

The design tokens are available as CSS variables. Import the stylesheet once and use `var()` references anywhere in your CSS.

```css
/* Import the stylesheet once in your app root */
@import '@iress-oss/ids-tokens/build/css-vars.css';

.card {
  background: var(--iress-colour-neutral-10);
  padding: var(--iress-spacing-4);
  color: var(--iress-colour-neutral-90);
}
```

For CSS-in-JS or inline styles, use the type-safe `cssVars` object:

```tsx
import { cssVars } from '@iress-oss/ids-tokens';

<div style={{ color: cssVars.colour.primary.text }}>Hello world</div>;
```

You can also get the underlying CSS variable for a composite token by using the `_` prefix.

```tsx
import { cssVars } from '@iress-oss/ids-tokens';

<div
  style={{
    boxShadow: cssVars.elevation.floating.shadow,
    color: cssVars.elevation.floating._shadow.color,
  }}
>
  Hello world
</div>;
```

## Concepts

### Design tokens

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.
