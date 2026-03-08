# CSS Bundle Size Optimisation — Panda CSS

Review of `packages/components` for opportunities to reduce CSS output size.

---

## 1. staticCss Responsive Explosion (HIGH IMPACT)

The biggest contributor to bundle size. In `theme-preset/staticCss.ts`, the first `css` entry generates classes for every property value × every breakpoint (6 breakpoints: xs, sm, md, lg, xl, xxl) plus base — that's **7 variants per value**.

```ts
// staticCss.ts — current
{
  properties: allowedCssProps,
  responsive: true, // generates 7× the classes
}
```

`allowedCssProps` includes ~16 spacing tokens × 14 margin/padding properties = **224 base classes → 1,568 with responsive**. Plus `textStyle` (19 values), `borderRadius`, `textAlign`, `horizontalAlign`, `offset`, `span`, `width`, `alignSelf` — all multiplied by 7.

### Recommendations

- Audit which properties actually need responsive variants. Properties like `textAlign`, `alignSelf`, and `borderRadius` are rarely used responsively — move them to the `responsive: false` block.
- Split `allowedCssProps` into two groups: `responsiveProps` (gap, padding, margin) and `staticProps` (everything else).

---

## 2. Button Recipe `staticCss: ['*']` (HIGH IMPACT)

The button recipe ends with:

```ts
staticCss: ['*'],
```

This tells Panda to pre-generate **every possible combination** of all button variants (mode × status × fluid × compact × loading × active × iconOnly × noWrap × inButtonGroup). Even with Panda's deduplication, this produces a massive amount of CSS for compound variant combinations that may never be used.

### Recommendation

Replace `staticCss: ['*']` with an explicit list of the variant combinations actually used:

```ts
staticCss: [
  { mode: ['*'] },
  { status: ['*'] },
  { compact: ['*'] },
  // only the compound combos you need:
  { mode: ['primary', 'secondary', 'tertiary'], status: ['danger'] },
];
```

---

## 3. Repetitive Colour Mode Variants in Tag & Pill (MEDIUM IMPACT)

Both `Tag.styles.ts` and `Pill.styles.ts` define 9 nearly identical `mode` variants (`10` through `90`) that only differ by the token number suffix:

```ts
// Tag — repeated 9 times with only the number changing
'10': { root: { bg: 'colour.data.subtle.10', borderColor: 'colour.data.subtle.10', color: 'colour.data.bold.10' } },
'20': { root: { bg: 'colour.data.subtle.20', borderColor: 'colour.data.subtle.20', color: 'colour.data.bold.20' } },
// ... 7 more
```

Each variant generates its own set of atomic classes. Since the tokens already resolve to CSS custom properties, this could be collapsed using a single CSS custom property approach.

### Recommendation

Use CSS custom properties to collapse 9 variants into 1:

```ts
mode: {
  data: {
    root: {
      bg: 'var(--tag-bg)',
      borderColor: 'var(--tag-border)',
      color: 'var(--tag-color)',
    },
  },
}
```

Then set the custom properties via a `data-mode` attribute in the component. This eliminates 8 variant class sets per component.

---

## 4. Alert Status Variants — Structural Duplication (MEDIUM IMPACT)

`Alert.styles.ts` has 5 status variants (danger, info, success, warning, neutral) that each set the same 7 slots with the same property pattern — only the colour token prefix changes. This is ~200 lines of near-identical CSS output.

The same pattern exists in the button recipe's compound variants (5 modes × 4 statuses = 20 compound variants, many with identical structure).

### Recommendation

Refactor to use CSS custom properties scoped to the status:

```ts
base: {
  alert: {
    backgroundColor: 'var(--alert-surface)',
    borderColor: 'var(--alert-text)',
  },
  heading: { color: 'var(--alert-text)' },
  // ...
},
variants: {
  status: {
    danger: {
      alert: {
        '--alert-surface': '{colors.colour.system.danger.surface}',
        '--alert-text': '{colors.colour.system.danger.text}',
        // etc.
      },
    },
  },
}
```

This reduces the per-slot class generation from 5 × 7 slots to 5 × 1 slot + shared base classes.

---

## 5. Hardcoded `color-mix()` Expressions (MEDIUM IMPACT)

32 instances of `color-mix(in srgb, ...)` across button.ts (25), Alert.styles.ts (5), Toggle.styles.ts (1), and Tag.styles.ts (1). Each generates a unique atomic class.

Examples:

```ts
'color-mix(in srgb, {colors.colour.system.danger.fill}, transparent 80%) 0px 0px 0px 3px';
'color-mix(in srgb, {colors.colour.primary.fill}, transparent 80%) 0px 0px 0px 2px';
```

### Recommendation

- Define `boxShadow` layer styles or tokens for the common focus-ring patterns (e.g., `layerStyles.focusRing.primary`, `layerStyles.focusRing.danger`).
- Or create a `focusRingShadow` utility that accepts a colour token and generates the `color-mix` + `box-shadow` value, so Panda can deduplicate the output.

---

## 6. Inconsistent Transition Declarations (LOW-MEDIUM IMPACT)

44 transition declarations across 17 style files with at least 5 different patterns:

| Pattern                                | Count | Files                                  |
| -------------------------------------- | ----- | -------------------------------------- |
| `transition: 'all'`                    | ~8    | TabSet, Card, Progress, ContextualMenu |
| `transition: '[all 0.3s ease-in-out]'` | ~8    | Modal, Slideout, Expander, Toast       |
| `transition: '[all 0.3s ease-out]'`    | ~2    | Slideout, Toggle                       |
| `transition: '[all .2s]'`              | ~1    | Tag                                    |
| `transition: 'common'`                 | ~2    | MenuGroup, SelectLabel                 |
| Specific property transitions          | ~10+  | Loading, Toggle, SideNav               |

Each unique string generates a separate atomic class.

### Recommendation

- Standardise on 2-3 transition tokens/layer styles (e.g., `transition.fast`, `transition.normal`, `transition.slow`).
- Replace `transition: 'all'` (which transitions every property including layout) with specific property transitions — this is also a rendering performance win.

---

## 7. Unify Layout Alignment as Panda Utilities (LOW-MEDIUM IMPACT)

`Stack`, `Inline`, and `Row` each define their own `horizontalAlign` and `verticalAlign` variants, but they accept different values and the CSS mapping is inconsistent:

| Component | horizontalAlign | verticalAlign |
|-----------|----------------|---------------|
| Stack | center, left, right | top, middle, bottom, between, around, evenly |
| Inline | around, between, center, evenly, left, right | bottom, middle, top, stretch |
| Row | left, center, right, around, between, evenly | top, middle, bottom, stretch |

All three should accept the same values. The challenge is that `horizontalAlign` maps to `justifyContent` in row layouts (Inline/Row) but `alignItems` in column layouts (Stack), and vice versa for `verticalAlign`.

### Recommendation

Create `horizontalAlign` and `verticalAlign` as Panda utilities in `theme-preset/utilities/`. Use the existing `flexDirection` on the element to determine the correct CSS property mapping via CSS custom properties.

```ts
// theme-preset/utilities/horizontalAlign.ts
import { defineUtility } from '@pandacss/dev';

const ALIGN_MAP = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  around: 'space-around',
  between: 'space-between',
  evenly: 'space-evenly',
  stretch: 'stretch',
};

export const horizontalAlign = defineUtility({
  className: 'ha',
  values: Object.keys(ALIGN_MAP),
  transform: (value: keyof typeof ALIGN_MAP) => {
    const cssValue = ALIGN_MAP[value];
    return {
      // Row direction (Inline, Row): horizontalAlign → justifyContent
      '&:where([data-flex-dir="row"], :not([data-flex-dir]))': {
        justifyContent: cssValue,
      },
      // Column direction (Stack): horizontalAlign → alignItems
      '&:where([data-flex-dir="column"])': {
        alignItems: cssValue,
      },
    };
  },
});
```

```ts
// theme-preset/utilities/verticalAlign.ts
import { defineUtility } from '@pandacss/dev';

const ALIGN_MAP = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  stretch: 'stretch',
};

export const verticalAlign = defineUtility({
  className: 'va',
  values: Object.keys(ALIGN_MAP),
  transform: (value: keyof typeof ALIGN_MAP) => {
    const cssValue = ALIGN_MAP[value];
    return {
      // Row direction (Inline, Row): verticalAlign → alignItems
      '&:where([data-flex-dir="row"], :not([data-flex-dir]))': {
        alignItems: cssValue,
      },
      // Column direction (Stack): verticalAlign → justifyContent
      '&:where([data-flex-dir="column"])': {
        justifyContent: cssValue,
      },
    };
  },
});
```

Then register both in `theme-preset/index.ts`:

```ts
utilities: {
  extend: {
    horizontalAlign,
    verticalAlign,
    // ... existing utilities
  },
},
```

Each component adds a `data-flex-dir` attribute and removes its inline alignment variants:

```tsx
// Stack.tsx — add data-flex-dir="column"
<Tag data-flex-dir="column" {...restProps} />

// Inline.tsx / Row.tsx — add data-flex-dir="row"
<Component data-flex-dir="row" {...restProps} />
```

The style files simplify to just their base + non-alignment variants:

```ts
// Stack.styles.ts
export const stack = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    '& > :not(.ids-field)': {
      marginBlock: 'spacing.0',
    },
  },
  // no more horizontalAlign/verticalAlign variants
});
```

Update the shared types so all three components accept the full set:

```ts
// types.ts
export type HorizontalAligns = 'left' | 'center' | 'right' | 'around' | 'between' | 'evenly' | 'stretch';
export type VerticalAligns = 'top' | 'middle' | 'bottom' | 'between' | 'around' | 'evenly' | 'stretch';
```

This approach:
- Unifies the accepted values across Stack, Inline, and Row
- Generates one set of utility classes instead of three sets of variant classes
- Keeps the `horizontalAlign` entry in `staticCss` working (it already references `HORIZONTAL_ALIGNS`)
- Removes ~80 lines of duplicated variant definitions from the three style files

Note: The `data-flex-dir` attribute approach avoids needing runtime JS to swap CSS properties. An alternative is to use a simpler approach where the utilities always output both `justifyContent` and `alignItems` via CSS custom properties, and the base flex direction determines which one takes effect — but the data attribute approach is more explicit and debuggable.

---

## 8. `contain: 'layout style paint'` on Pill (LOW IMPACT)

Pill uses `contain: 'layout style paint'` while most other components use `contain: 'layout style'`. The `paint` containment creates a new stacking context and clips overflow — but Pill has `overflow: 'visible'` set explicitly, which conflicts with paint containment.

### Recommendation

Remove `paint` from Pill's containment to match other components and avoid the conflicting `overflow: visible` declaration.

---

## 9. Redundant Default Variant Values (LOW IMPACT)

Several components set `defaultVariants` that match CSS defaults or have no visual effect:

- `Inline`: `horizontalAlign: 'left'` (flex-start is already the default for `flexDirection: 'row'`)
- `Tag`: `mode: '90'` generates a class even when the default could be in `base`

### Recommendation

Move the most common variant's styles into `base` and remove it from `variants`. This eliminates one variant class set entirely.

---

## 10. Focusable Utility — Large Transform Output (LOW IMPACT)

The `focusable` utility has 12 possible values, each generating a different set of CSS rules via the `transform` function. Some of these (like `has-input`) produce 20+ CSS declarations including nested selectors.

This is already well-structured as a utility, but the `has-input` and `select-activator` transforms are particularly heavy.

### Recommendation

Review if all 12 focusable states are necessary.

---

## Summary — Priority Order

| #   | Opportunity                                         | Impact     | Effort  |
| --- | --------------------------------------------------- | ---------- | ------- |
| 1   | Reduce `staticCss` responsive scope                 | High       | Low     |
| 2   | Replace button `staticCss: ['*']`                   | High       | Low     |
| 3   | Collapse Tag/Pill mode variants with CSS vars       | Medium     | Medium  |
| 4   | Collapse Alert/Button status variants with CSS vars | Medium     | Medium  |
| 5   | Tokenise `color-mix` box-shadow patterns            | Medium     | Low     |
| 6   | Standardise transition declarations                 | Low-Medium | Low     |
| 7   | Extract shared alignment variants                   | Low-Medium | Low     |
| 8   | Fix Pill containment conflict                       | Low        | Trivial |
| 9   | Move default variants into base                     | Low        | Low     |
| 10  | Consider splitting heavy focusable transforms       | Low        | Medium  |

Items 1 and 2 alone should yield the most significant reduction in generated CSS output.
