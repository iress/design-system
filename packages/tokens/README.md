# IDS Tokens

IDS Tokens are a single source of truth to name and store Iress design decisions.

## Getting started

1. Install: `yarn add @iress-oss/ids-tokens`

## Using the design tokens in your application

### Token metadata

The design tokens follow the official W3C [design tokens specification](https://www.w3.org/TR/design-tokens/). The tokens are available in an object format, which can be used in JavaScript or TypeScript applications.

```tsx
import { colour } from '@iress/ids-tokens';

<h2>Primary token ({colour.primary.text.$type})</h2>
{colour.primary.text.$description}

Default value: {colour.primary.text.$value}
```

### CSS Variables

The design tokens are available as CSS variables. You can use them in your CSS files or inline styles.

For optimal tree-shaking and to avoid unnecessary dependencies, import `cssVars` directly:

```tsx
import { cssVars } from '@iress-oss/ids-tokens/cssVars';

<div style={{ color: cssVars.colour.primary.text }}>Hello world</div>;
```

Alternatively, you can import from the main package (though this may include additional dependencies):

```tsx
import { cssVars } from '@iress-oss/ids-tokens';

<div style={{ color: cssVars.colour.primary.text }}>Hello world</div>;
```

You can also get the underlying CSS variable for a composite token by using the `_` prefix.

```tsx
import { cssVars } from '@iress-oss/ids-tokens/cssVars';

<div
  style={{
    boxShadow: cssVars.elevation.floating.shadow,
    color: cssVars.elevation.floating._shadow.color,
  }}
>
  Hello world
</div>;
```

## Package Exports

The package provides several export paths for optimal tree-shaking:

- `@iress-oss/ids-tokens` - Main entry point (includes all exports)
- `@iress-oss/ids-tokens/cssVars` - CSS variables only (recommended for minimal bundle size)
- `@iress-oss/ids-tokens/schema` - Design token schema
- `@iress-oss/ids-tokens/enums` - Type enums
- `@iress-oss/ids-tokens/types` - TypeScript types
- `@iress-oss/ids-tokens/interfaces` - TypeScript interfaces
- `@iress-oss/ids-tokens/mapTokensToCssVariables` - Helper function for token mapping
- `@iress-oss/ids-tokens/convertReferencesToVariables` - Helper function for reference conversion

## Concepts

### Design tokens

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.
