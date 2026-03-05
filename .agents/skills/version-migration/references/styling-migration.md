# Styling Migration

## CSS class changes

```css
/* ❌ OUI classes — removed */
.oui-button {
}

/* ❌ IDS v4 Stencil classes — removed */
.sc-iress-button-h {
}

/* ✅ IDS v6 — use styling props or design tokens */
```

## Styling props

IDS v6 exposes styling props on every component:

```tsx
// Spacing
<IressPanel p="lg" m="xl" />

// Responsive
<IressPanel p={{ base: 'sm', xl: 'lg' }} />

// Colour
<IressPanel bg="alt" />

// Scrollable
<IressPanel scrollable="y" style={{ maxHeight: '400px' }}>
  <LongContent />
</IressPanel>
```

## Design tokens for custom styles

Prefer the type-safe `cssVars` object from `@iress-oss/ids-tokens` — it gives you autocomplete and compile-time checking:

```tsx
import { cssVars } from '@iress-oss/ids-tokens';

// ✅ Preferred — type-safe cssVars
<div
  style={{
    color: cssVars.colour.primary.text,
    padding: cssVars.spacing[4],
  }}
/>;
```

If you need to reference tokens in plain CSS (e.g. a `.css` file or CSS-in-JS template string), fall back to CSS custom properties (note: uses British spelling `colour`, numeric spacing keys):

```css
/* Fallback — plain CSS custom properties */
.custom-element {
  color: var(--iress-colour-primary-text);
  padding: var(--iress-spacing-4);
}
```

## Cascade layers

All IDS v6 CSS lives in cascade layers. Declare layer order if your own CSS is being overridden:

```css
@layer reset, base, tokens, recipes, utilities;
```

## AG Grid migration

```tsx
// ❌ Old (v5)
import { IressAgGridContainer } from '@iress/ids-themes';

<IressAgGridContainer>
  <AgGridReact {...gridProps} />
</IressAgGridContainer>;

// ✅ New (v6) — minimum AG Grid version 33
import { getAgGridThemeProps } from '@iress/ids-themes';

<AgGridReact {...getAgGridThemeProps()} {...gridProps} />;
```
