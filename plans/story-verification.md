# Story Verification Plan

## Allowed Patterns (Post-Migration)

Every story MUST use one of these 3 patterns:

### P1: Args-only (no render)
```tsx
export const Default: Story = { args: { children: 'Button' } };
```
Use for: Simple prop demos, single-component stories with interactive controls.

### P2: Mock file + `withSource`
```tsx
export const Status: Story = {
  render: (args) => <AlertStatus {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AlertStatusSource, { stripImports: true, stripExportFunction: true }),
  },
};
```
Use for: Multi-variant galleries, complex compositions, recipes, stateful examples, provider-wrapped components (Modal, Slideout, Toaster).

### P3: Simple inline render
```tsx
export const Download: Story = {
  render: (args) => <IressButton {...args} download />,
};
```
Use for: Adding one or two extra props/wrappers that don't warrant a mock file. Must remain short and readable.

---

## Modifiers (apply to any pattern)

These are NOT separate patterns — they modify the patterns above:

| Modifier | Usage |
|----------|-------|
| `tags: ['recipe']` | Marks a story as a recipe (shown in Recipes tab) |
| `decorators: [withBreakpointLabel()]` | Shows current breakpoint above the story |
| `withJsxTransformer(...)` | Configures JSX display (show functions, etc.) |

---

## Disallowed Patterns (must NOT appear)

| Pattern | Reason |
|---------|--------|
| `withCustomSource(...)` | Replaced by `withSource` |
| `withTransformedRawSource(...)` | Replaced by `withSource` |
| `<CurrentBreakpoint />` | Replaced by `withBreakpointLabel()` decorator |
| `(resize to see changes)` | Broken placeholder from migration |
| `render: () => <Mock />` (without args) | Storybook quirk — code panel won't show |
| `import ... from '@/main'` in displayed code | Must transform to `@iress-oss/ids-components` |
| `container: {}` in code panel output | Must show `container: document.body` |
| Separate `*Recipes.stories.tsx` files | Should be merged with `tags: ['recipe']` |
| `controls: { disable: true }` on meta level | Only on individual gallery stories |
| Missing `controls: { disable: true }` on gallery mocks | All mock-only stories need this |
| Shared render factory functions (`renderWithButtonFn`) | Replace with mock files (planned) |
| `DiffViewer` stories | Move to `apps/guidelines/content/` (planned) |

---

## Verification Methodology

For each story file, check:

### Code-level checks (read the file)
1. [ ] No `withCustomSource` or `withTransformedRawSource` imports/usages
2. [ ] No `<CurrentBreakpoint` usage
3. [ ] No `(resize to see changes)` text
4. [ ] All mock-based stories use `render: (args) => <Mock {...args} />`
5. [ ] All mock-based stories have `controls: { disable: true }`
6. [ ] All mock-based stories use `withSource(Source, { stripImports: true, stripExportFunction: true })`
7. [ ] Recipe stories have `tags: ['recipe']` and are in main file (no separate Recipes file)
8. [ ] Responsive stories use `decorators: [withBreakpointLabel()]` (factory call, not bare reference)
9. [ ] `withBreakpointLabel` import is from `@iress-oss/ids-storybook-config`
10. [ ] No unused imports (esp. `IressStack`, `IressPanel` left from breakpoint panel removal)
11. [ ] Mock files import from `@/main` (not `@iress-oss/ids-components`)
12. [ ] Mock files export a named function with no arguments (concrete props inside)
13. [ ] Interactive mocks use `useState` internally — NOT Storybook args for interactivity
14. [ ] `controls: { disable: true }` is on individual stories, NOT on the meta/default export
15. [ ] Args with JSX values are inlined — no external variable references (e.g. `supportedCardSlots.prepend`)
16. [ ] No `argTypes.mapping` used for slot interactivity — use mock with `useState` instead

### Known tech debt (flag as warning, planned migration)
- [ ] `renderWithButtonFn` factory in Modal/Slideout → planned: replace with mock files
- [ ] `DiffViewer` stories in Modal/Slideout/Form → planned: move to guidelines

### Visual checks (Storybook browser)
1. [ ] Playground tab: Component renders, controls table present
2. [ ] Playground code panel: No `container: {}`, no `<p />`, no `_react`
3. [ ] Examples tab: All stories render (not blank)
4. [ ] Examples code panel: Shows clean JSX (no imports, no function wrapper, no `@/main`)
5. [ ] Recipes tab (if applicable): Exists, stories render
6. [ ] Breakpoint stories: Show breakpoint label above story
7. [ ] Mock stories: Controls table is NOT shown (disabled)

---

## Pages to Verify

### Rules for P3 (Simple inline render)
- Max ~10 lines in the render function
- Max 3 components in the JSX
- Beyond that → must be a mock file (P2)

### Rules for P2 (Mock file + withSource)
- Story file has BOTH `import { Mock } from './mocks/Mock'` AND `import MockSource from './mocks/Mock.tsx?raw'`
- `withSource` always uses `{ stripImports: true, stripExportFunction: true }`
- Mock file imports from `@/main`
- Mock file exports a named function (no default export, no args parameter)

---

### Batch 1: Components A-B

| # | File | Type | Key checks |
|---|------|------|-----------|
| 1 | Alert/Alert | P2 | Status, Footer, MultiLine, Variant, Dismissable mocks |
| 2 | Autocomplete/Autocomplete | P1+P2 | popoverProps: document.body, Controlled/Async mocks, SearchTable recipe |
| 3 | Button/Button | P1+P2+P3 | Mode/Status/Loading/Slots/Active mocks, Fluid: withBreakpointLabel |
| 4 | Button/CloseButton/CloseButton | P1 | Simple args-only |
| 5 | ButtonGroup/ButtonGroup | P1/P3 | Verify pattern |

### Batch 2: Components C

| # | File | Type | Key checks |
|---|------|------|-----------|
| 6 | Card/Card | P1/P3 | No external variable refs (supportedCardSlots removed?) |
| 7 | Card/CardSlots | P1/P2 | Inline JSX in args, no `supportedCardSlots` external ref |
| 8 | Checkbox/Checkbox | P2 | Variants, ReadOnly, WithTable mocks |
| 9 | CheckboxGroup/CheckboxGroup | P1+P2 | Playground has children, Layout mock, Table recipe |
| 10 | Col/Col | P3 | ResponsiveSpan/Offset: withBreakpointLabel() |
| 11 | Container/Container | P3 | withBreakpointLabel('container') |

### Batch 3: Components D-H

| # | File | Type | Key checks |
|---|------|------|-----------|
| 13 | Divider/Divider | P2 | Gutter mock |
| 14 | Expander/Expander | P2 | Mode mock |
| 15 | ExpanderChevron/ExpanderChevron | P1 | Verify pattern |
| 16 | Field/Field | P1/P3 | Complex — may have tech debt (stateful renders) |
| 17 | Field/FieldGroup/FieldGroup | P1/P3 | container: document.body |
| 18 | Hide/Hide | P3 | HiddenOn/BreakpointTable: withBreakpointLabel() |

### Batch 4: Components I-L

| # | File | Type | Key checks |
|---|------|------|-----------|
| 19 | Icon/Icon | P2 | Filled, Flip, Rotate, Spin mocks |
| 20 | Icon/IconProvider | P1 | Verify pattern |
| 21 | Image/Image | P1 | Verify pattern |
| 22 | Inline/Inline | P3 | ResponsiveGap: withBreakpointLabel() |
| 23 | Input/Input | P1+P2 | Types/Modes/Sizing/Slots mocks, ReactHookForms/Percentage recipes |
| 24 | InputCurrency/InputCurrency | P1+P2 | Mock stories, recipes |
| 25 | Label/Label | P1 | Verify pattern |
| 26 | Link/Link | P1/P3 | Verify pattern |

### Batch 5: Components M-P

| # | File | Type | Key checks |
|---|------|------|-----------|
| 27 | Menu/Menu | P2 | Layout, Variants mocks |
| 28 | Menu/MenuDivider/MenuDivider | P1 | Verify pattern |
| 29 | Menu/MenuGroup/MenuGroup | P1 | Verify pattern |
| 30 | Menu/MenuItem/MenuItem | P1 | Verify pattern |
| 31 | Menu/MenuText/MenuHeading | P1 | Verify pattern |
| 32 | Menu/MenuText/MenuText | P1 | Verify pattern |
| 33 | Modal/Modal | P1+P2 | ResponsiveSize: withBreakpointLabel, tech debt: renderWithButtonFn |
| 34 | Modal/ModalProvider | P1 | Verify pattern |
| 35 | Panel/Panel | P1 | Verify pattern |
| 36 | Pill/Pill | P2 | Mode, Status mocks |
| 37 | Placeholder/Placeholder | P1 | Verify pattern |
| 38 | Popover/InputPopover/InputPopover | P1/P3 | container: document.body |
| 39 | Popover/Popover | P1/P2 | container: document.body, FocusableChildren recipe |
| 40 | Popover/PopoverProvider | P1/P3 | Verify pattern |
| 41 | Progress/Progress | P2 | Examples mock |
| 42 | Provider/Provider | P1 | Verify pattern |

### Batch 6: Components R-S

| # | File | Type | Key checks |
|---|------|------|-----------|
| 43 | Radio/Radio | P2 | Variants, ReadOnly mocks |
| 44 | RadioGroup/RadioGroup | P1+P2 | Playground has children, Layout mock |
| 45 | RadioMark/RadioMark | P1 | Verify pattern |
| 46 | Readonly/Readonly | P1/P3 | Verify pattern |
| 47 | Row/Row | P3 | ResponsiveGutter: withBreakpointLabel() |
| 48 | Select/Select | P1+P2 | container: document.body, Async/Sizing/CustomLabel mocks |
| 49 | Select/components/NativeSelect | P1 | Verify pattern |
| 50 | Select/SelectBody/SelectBody | P1 | Verify pattern |
| 51 | Select/SelectCreate/SelectCreate | P1 | Verify pattern |
| 52 | Select/SelectHeading/SelectHeading | P1 | Verify pattern |
| 53 | Select/SelectLabel/SelectLabel | P1 | Verify pattern |
| 54 | Select/SelectMenu/SelectMenu | P1 | Verify pattern |
| 55 | Select/SelectSearch/SelectSearch | P1 | Verify pattern |
| 56 | Select/SelectSearchInput/SelectSearchInput | P1 | Verify pattern |
| 57 | Select/SelectTags/SelectTags | P1 | Verify pattern |
| 58 | Skeleton/Skeleton | P2 | Mode/Size mocks, recipes merged, no separate Recipes file |
| 59 | SkipLink/SkipLink | P1 | Verify pattern |
| 60 | Slideout/Slideout | P1+P2 | Modes: no broken panel, tech debt: renderWithButtonFn |
| 61 | Slideout/SlideoutProvider | P1 | Verify pattern |
| 62 | Slider/Slider | P1 | HiddenLabels: withBreakpointLabel() |
| 63 | Spinner/Spinner | P1 | Verify pattern |
| 64 | Stack/Stack | P3 | ResponsiveGap: withBreakpointLabel() |
| 65 | Styled/Styled | P1 | Verify pattern |

### Batch 7: Components T-V

| # | File | Type | Key checks |
|---|------|------|-----------|
| 66 | Table/Table | P1+P2 | Mock stories |
| 67 | Table/TableBody/TableBody | P1+P2 | Mock stories |
| 68 | Table/TableFormattedValue/TableFormattedValue | P1 | Verify pattern |
| 69 | TabSet/Tab/Tab | P1 | Verify pattern |
| 70 | TabSet/TabSet | P1+P2 | Layout mock |
| 71 | Tag/Tag | P2 | Mode, Status, Bordered, Deletion mocks |
| 72 | Tag/TagInput/TagInput | P1 | Verify pattern |
| 73 | Text/Text | P2 | Element, Variant, Mode, Align mocks |
| 74 | Toaster/Toaster | P1+P2 | container: document.body |
| 75 | Toggle/Toggle | P2 | Layout mock |
| 76 | Tooltip/Tooltip | P1 | Verify pattern |
| 77 | Tooltip/TooltipProvider | P1 | Verify pattern |
| 78 | ValidationMessage/ValidationMessage | P1 | Verify pattern |
| 79 | ValidationMessage/ValidationSummary/ValidationSummary | P1 | Verify pattern |

### Batch 8: Patterns

| # | File | Type | Key checks |
|---|------|------|-----------|
| 80 | patterns/Breadcrumbs/Breadcrumbs | P2 | withSource correct |
| 81 | patterns/ContextualMenu/ContextualMenu | P2 | withSource correct |
| 82 | patterns/DropdownMenu/DropdownMenu | P2 | withSource correct |
| 83 | patterns/Feedback/Feedback | P1/P3 | Verify pattern |
| 84 | patterns/Form/Form | P2 | Recipes merged, withSource correct, tech debt: DiffViewer |
| 85 | patterns/Form/FormField/FormField | P1/P3 | Verify pattern |
| 86 | patterns/Form/FormRules | P1/P3 | Verify pattern |
| 87 | patterns/Form/HookForm/HookForm | P2 | withSource correct |
| 88 | patterns/Form/components/LongForm | P1/P3 | Verify pattern |
| 89 | patterns/Form/components/ShortForm | P1/P3 | Verify pattern |
| 90 | patterns/Loading/Loading | P2 | withSource correct |
| 91 | patterns/Loading/LoadingSuspense | P2 | withSource correct |
| 92 | patterns/Loading/components/ComponentLoading | P2 | withSource correct |
| 93 | patterns/Loading/components/DefaultLoading | P1/P3 | Verify pattern |
| 94 | patterns/Loading/components/LongLoading | P2 | withSource correct |
| 95 | patterns/Loading/components/PageLoading | P2 | withSource correct |
| 96 | patterns/Loading/components/StartUpLoading | P1/P3 | Verify pattern |
| 97 | patterns/Loading/components/ValidateLoading | P1/P3 | Verify pattern |
| 98 | patterns/Shadow/Shadow | P1/P3 | Verify pattern |
| 99 | patterns/SideNav/SideNav | P2 | withSource correct |

### Excluded from verification

| File | Reason |
|------|--------|
| components/010-Introduction | Not a component — landing page |
| Introduction | Not a component — landing page |
| patterns/010-Introduction | Not a component — landing page |

### Note on single file per component

Each component has exactly **one** `.stories.tsx` file. This keeps maintenance simple and makes the translator's job straightforward — one file to read, one set of stories to extract.

- Sub-components with their own API (e.g. ModalProvider, PopoverProvider, TabSet/Tab) get their own single stories file
- Content that was previously in separate files (e.g. CardSlots, FormRules) merges into the main file using custom tabs via tags
- Recipes merge into the main file with `tags: ['recipe']`

**Planned merges:**
- [x] `Card/CardSlots.stories.tsx` → merged into `Card/Card.stories.tsx` with `tags: ['slots']`
- [ ] `patterns/Form/components/ShortForm.stories.tsx` + `LongForm.stories.tsx` → merge into `patterns/Form/Form.stories.tsx`
- [ ] `patterns/Loading/components/*.stories.tsx` (6 files) → merge into `patterns/Loading/Loading.stories.tsx`

**Stays as separate file (reference stories):**
- `patterns/Form/FormRules.stories.tsx` — interactive validation playground, tag as `['reference']`

**Planned moves:**
- [x] `Menu/MenuText/MenuHeading.stories.tsx` → moved to `Menu/MenuHeading/MenuHeading.stories.tsx`
- [ ] Extract `IressMenuHeading` component from `MenuText/MenuText.tsx` into `MenuHeading/MenuHeading.tsx` (depends on IressMenuText, needs careful refactor)

---

## Global checks (run once)

- [ ] No `withCustomSource` or `withTransformedRawSource` usage anywhere in `packages/components/src/`
- [ ] No remaining `*Recipes.stories.tsx` files (all merged)
- [ ] No `<CurrentBreakpoint` usage in any stories file
- [ ] No `(resize to see changes)` text in any stories file
- [ ] No `supportedCardSlots` or other external variable references in args
- [ ] No `internalArgs` usage (removed helper)
- [ ] No `stripInternalPropsFromSource` usage (removed helper)
- [ ] `sourceReplacements` default in `getPreview` handles `container: {}`
- [ ] `withSource` `transformSource` handles `container: {}`
- [ ] `withBreakpointLabel` exported from storybook-config (factory function)
- [ ] `applySourceReplacements` shared between preview and withSource
- [ ] storybook-config builds successfully
- [ ] TypeScript compiles with 0 new errors
- [ ] Every `?raw` import has a matching component import (and vice versa)
