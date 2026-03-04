# Theming (CSS Variable Overrides)

IDS tokens are implemented as CSS custom properties with fallback values. Themes work by setting `--iress-*` variables at the `:root` or at a scoped container level. All IDS components and `cssVars` references automatically pick up overridden values.

## How Themes Override Tokens

A theme stylesheet simply re-declares the `--iress-*` variables:

```css
/* Example: a custom theme that overrides brand colours */
:root {
  --iress-colour-primary-fill: #1a73e8;
  --iress-colour-primary-fill-hover: #1557b0;
  --iress-colour-primary-on-fill: #ffffff;
  --iress-colour-primary-surface: #e8f0fe;
  --iress-colour-primary-surface-hover: #d2e3fc;
  --iress-colour-primary-text: #1a73e8;

  --iress-typography-base-heading-font: 'Custom Font', Helvetica, sans-serif;
  --iress-radius-1: 0.5rem; /* all relative radius tokens scale automatically */
}
```

Because relative tokens like `radius.2` use `calc(2 * var(--iress-radius-1))`, overriding the base `radius.1` value cascades to all derived tokens.

## Scoped Theming

You can scope overrides to a container rather than the whole page:

```css
.dark-section {
  --iress-colour-neutral-10: #1a1a2e;
  --iress-colour-neutral-90: #e0e0e0;
}
```

```tsx
<div className="dark-section">
  <IressText>This text uses the scoped dark theme</IressText>
</div>
```

## What AI Agents Should Know About Theming

- **Never hardcode colours** — always use tokens so your code automatically responds to theme changes
- **Do not try to create theme stylesheets** unless specifically asked — theme creation is managed by the IDS team via Styler (the internal theme editor)
- **Prefer semantic colours** (e.g. `colour.primary.fill`, `colour.system.danger.text`) over neutral scale tokens where possible — semantic tokens have guaranteed contrast ratios across themes
- **Assume the standard Iress theme** unless the user specifies otherwise — default values in this document reflect that theme
