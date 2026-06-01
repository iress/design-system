# Testing Documentation in Storybook

> Generated: 2026-06-01

## Overview

Add a "Testing" tab to every component's Storybook docs page, documenting available test IDs and roles for consumers. Currently only **Alert** has this tab. 22 other components already have `testIds` metadata defined but not wired up to Storybook.

---

## Current State

### Alert (the reference implementation)

Alert uses `TestComponentMeta[]` from `@iress-oss/ids-storybook-config`:

```tsx
// meta/index.tsx
export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the alert',
    role: (<><code>getByRole('status')</code> if info/neutral, otherwise <code>getByRole('alert')</code></>),
    testId: 'alert',
  },
  { part: 'heading', description: 'The alert heading container', testId: 'alert__heading' },
  { part: 'footer', description: 'The alert footer/actions container', testId: 'alert__footer' },
];
```

The stories file passes it via:
```tsx
parameters: {
  idsConfig: {
    testMeta: componentMeta.testMeta,
  },
},
```

### Other components (22 with existing `testIds`)

These use a simpler `TestId[]` type (`{ suffix, description }`) exported as a named export but **not** connected to Storybook:

- Autocomplete, ButtonGroup, Card, Checkbox, Expander, Field, Label, Menu, Modal, Popover, Radio, Readonly, Select, Slideout, Slider, Table, TabSet, Tag, Toggle, Tooltip, ValidationMessage

### Components without any test metadata

All remaining components (Button, Col, Container, Divider, Hide, Icon, Image, Inline, Input, InputCurrency, Link, Panel, Pill, Placeholder, Progress, Row, Skeleton, SkipLink, Spinner, Stack, Text, etc.) need test metadata authored from scratch by reading their source.

---

## Interface

The `TestComponentMeta` interface (from `packages/storybook-config/src/components/TestTable.tsx`):

```tsx
interface TestComponentMeta {
  part: string;        // Logical name of the element (e.g. "main", "heading", "footer")
  description: string; // What this element represents
  role?: ReactNode;    // How to query by role (e.g. getByRole('button'))
  testId: string;      // The data-testid value (e.g. 'alert__heading')
}
```

The `TestTable` renders a table with columns: Part, Description, By Role, By Test ID.

---

## Plan

### Phase 1: Convert existing `testIds` to `testMeta` (22 components)

For each component that already has `testIds: TestId[]`:

1. **Convert** the `testIds` array to `testMeta: TestComponentMeta[]` format:
   - `suffix` → `testId` (prefix with component name + `__`, e.g. `'heading'` suffix → `'modal__heading'` testId)
   - `description` → `description` (keep as-is)
   - Add `part` (derive from suffix, e.g. `'hidden-input'` → `'hidden input'`)
   - Add `role` where applicable (check the component source for ARIA roles)
2. **Add** `testMeta` to the component's default export in `meta/index.tsx`
3. **Wire up** in the stories file: add `idsConfig: { testMeta: componentMeta.testMeta }` to the meta `parameters`
4. **Remove** the unused `testIds` named export and `TestId` import (unless used elsewhere)

#### Components in this phase:

| # | Component | Has roles to document? |
|---|-----------|----------------------|
| 1 | Autocomplete | Yes — combobox, listbox, option |
| 2 | ButtonGroup | No — layout only |
| 3 | Card | No — structural |
| 4 | Checkbox | Yes — checkbox role |
| 5 | Expander | Yes — button (trigger), region (content) |
| 6 | Field | Yes — group role |
| 7 | Label | Yes — label element |
| 8 | Menu | Yes — menu, menuitem roles |
| 9 | Modal | Yes — dialog role |
| 10 | Popover | No — generic |
| 11 | Radio | Yes — radio role |
| 12 | Readonly | No |
| 13 | Select | Yes — combobox, listbox, option |
| 14 | Slideout | Yes — dialog role |
| 15 | Slider | Yes — slider role |
| 16 | Table | Yes — table, row, cell roles |
| 17 | TabSet | Yes — tablist, tab, tabpanel |
| 18 | Tag | No |
| 19 | Toggle | Yes — switch role |
| 20 | Tooltip | Yes — tooltip role |
| 21 | ValidationMessage | Yes — alert role |
| 22 | (Alert already done) | — |

### Phase 2: Author `testMeta` for remaining components

For components that have NO existing test metadata, read the component source to identify:
- The root element's `data-testid` propagation
- Any `propagateTestid()` calls for sub-elements
- ARIA roles assigned to elements

Then create `testMeta` in their `meta/index.tsx` and wire up in stories.

#### Components in this phase:

| # | Component | Notes |
|---|-----------|-------|
| 1 | Button | Simple — root only |
| 2 | CloseButton | Simple — root only |
| 3 | Col | Layout — root only |
| 4 | Container | Layout — root only |
| 5 | Divider | Simple — root only, separator role |
| 6 | Hide | Layout — root only |
| 7 | Icon | img role |
| 8 | Image | img role |
| 9 | Inline | Layout — root only |
| 10 | Input | textbox role, may have sub-parts |
| 11 | InputCurrency | textbox role, may have sub-parts |
| 12 | Link | link role |
| 13 | Panel | structural |
| 14 | Pill | status role? |
| 15 | Placeholder | structural |
| 16 | Progress | progressbar role |
| 17 | Row | Layout — root only |
| 18 | Skeleton | structural |
| 19 | SkipLink | link role |
| 20 | Spinner | status role |
| 21 | Stack | Layout — root only |
| 22 | Text | structural |
| 23 | Toaster | alert/status role |
| 24 | CheckboxGroup | group role |
| 25 | RadioGroup | radiogroup role |

### Phase 3: Add `testMeta` for patterns (optional/lower priority)

Patterns (Form, Loading, Breadcrumbs, etc.) are compositions — they may not need individual test documentation since they compose components that already have it. Evaluate on a case-by-case basis.

---

## Implementation Steps (per component)

### Step 1: Read the component source

Identify all `propagateTestid()` calls and ARIA roles:
```bash
grep -n "propagateTestid\|role=" packages/components/src/components/<Name>/<Name>.tsx
```

### Step 2: Update `meta/index.tsx`

```tsx
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element',
    role: <code>getByRole('...')</code>,  // if applicable
    testId: '<component-name>',
  },
  // ... sub-parts from propagateTestid calls
];

export default {
  heading: '...',
  description: '...',
  tags: [...],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
```

### Step 3: Wire up in stories

Add to the meta/default export in `<Component>.stories.tsx`:
```tsx
parameters: {
  docs: {
    description: { component: componentMeta.description },
  },
  idsConfig: {
    testMeta: componentMeta.testMeta,
  },
},
```

### Step 4: Remove old `testIds` export (Phase 1 only)

Remove the `testIds` named export and `TestId` import if no longer used.

### Step 5: Verify in Storybook

Navigate to the component's docs page and confirm the "Testing" tab appears with the correct table.

---

## Verification

For each component:
1. [ ] `testMeta` is defined in `meta/index.tsx`
2. [ ] `testMeta` is included in the default export
3. [ ] Stories file passes `testMeta` via `idsConfig` parameter
4. [ ] "Testing" tab appears in Storybook docs page
5. [ ] Table shows correct parts, descriptions, roles, and test IDs
6. [ ] Old `testIds` export removed (if applicable)
7. [ ] TypeScript compiles with no errors

---

## Phase 4: Translate `testMeta` to Guidelines Content

> **Implemented in:** `plans/ai-docs-pipeline-consolidation.md` → unified `translate.ts --components`
>
> This phase is NOT done as part of this plan. It is picked up later when the pipeline
> consolidation plan is executed (Plan 4 in the overall order). By that point, all
> components will have `testMeta` (Phases 1-3 of this plan are complete).

The `testMeta` data should be the **single source of truth** that feeds both:
1. The Storybook "Testing" tab (via `idsConfig.testMeta` in story parameters)
2. The guidelines `## Testing` section's test ID table (in `apps/guidelines/content/components/*.mdx`)

Currently, 42 guidelines pages already have a `## Testing` section with hand-written test ID tables (generated by the old `translate-components.ts` from `<TestIdTable>` tags in `.docs.mdx`). These need to be kept in sync with `testMeta`.

### Where it fits in the pipeline consolidation

In `scripts/translate.ts --components` (see `plans/ai-docs-pipeline-consolidation.md`), add a `resolveTestingSection()` step that:

1. Imports `testMeta` from each component's `meta/index.tsx`
2. Generates the `## Testing` section markdown:
   - Role-based query examples (from `testMeta[].role`)
   - Test ID table (from `testMeta[].part`, `testMeta[].description`, `testMeta[].testId`)
3. Replaces/updates the structured table in `apps/guidelines/content/components/*.mdx`

Hand-authored prose (gotchas, tips) coexists via marker comments:

```mdx
## Testing

Query the modal dialog by its role:
...prose and gotchas (hand-authored, preserved)...

{/* AUTO-GENERATED: testMeta table — do not edit manually */}
| Part | Description | By Role | By Test ID |
| ... |
{/* END AUTO-GENERATED */}
```

### Why not `derive-ai-docs.ts`?

`derive-ai-docs.ts` is being **deleted** as part of the pipeline consolidation — its logic
is absorbed into `translate.ts`. Adding this step there would be throwaway work.

### Serialization note

The `role` field in `testMeta` is `ReactNode` (for Storybook JSX rendering). When translating
to markdown for guidelines/`.ai/`, serialize it to plain text:
- `<code>getByRole('dialog')</code>` → `` `getByRole('dialog')` ``
- `<>...</>` fragments → concatenate text content

---

## Notes

- The `TestComponentMeta` type supports `role` as `ReactNode`, allowing JSX like `<code>getByRole('dialog')</code>` — use this for all components with meaningful ARIA roles
- For layout components (Col, Row, Stack, Inline, Container, Hide) that only pass through `data-testid` to the root, a single "main" entry is sufficient
- The `testId` field should show the full test ID pattern (e.g. `'modal__heading'`), not just the suffix — this is what consumers will use in `getByTestId()`
- Components that don't use `propagateTestid` at all (just pass through `data-testid`) should still get a "main" entry documenting the root element
- The `role` field in `testMeta` is `ReactNode` (for Storybook rendering) — when translating to markdown for guidelines/`.ai/`, serialize it to plain text (strip JSX tags, keep code backticks)
