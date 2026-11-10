---
applyTo: '**/*.stories.tsx'
---

# Story Patterns

Every `.stories.tsx` file must use one of these 3 patterns.

## P1: Args-only (no render)

```tsx
export const Default: Story = { args: { children: 'Button' } };
```

Use for simple prop demos with interactive controls.

## P2: Mock file + `withSource`

```tsx
import { MockName } from './mocks/MockName';
import MockNameSource from './mocks/MockName.tsx?raw';

export const Example: Story = {
  render: (args) => <MockName {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MockNameSource, { stripImports: true, stripExportFunction: true }),
  },
};
```

Rules:
- Presentational mocks (no hooks): use `{ stripImports: true, stripExportFunction: true }`
- Stateful mocks (uses `useState`, `useEffect`, etc.): use `{ stripImports: true }` only — the function wrapper must remain visible
- All P2 stories MUST have `controls: { disable: true }` on the individual story
- All P2 stories MUST pass args: `render: (args) => <Mock {...args} />`
- Mock files import from `@/main`, not `@iress-oss/ids-components`
- Mock files export a named function (no default export, no args parameter)

## P3: Simple inline render

```tsx
export const Download: Story = {
  render: (args) => <IressButton {...args} download />,
};
```

Use for adding 1–2 extra props/wrappers. Must be ≤10 lines and ≤3 components. Beyond that → use P2.

## Modifiers (apply to any pattern)

| Modifier | Usage |
|----------|-------|
| `tags: ['recipe']` | Marks a story as a recipe |
| `decorators: [withBreakpointLabel()]` | Responsive stories — shows breakpoint label |
| `withBreakpointLabel('container')` | Container query stories |

## Tags

Tags control how stories appear in the docs page tabs and how the component status badge renders. Apply them correctly.

### Meta-level tags (on the default export)

These set the component's status badge at the top of its docs page:

| Tag | Meaning | When to use |
|-----|---------|-------------|
| `'updated'` | Shows "Updated" badge | Component has recently added/changed props |
| `'beta'` or `'beta: '` | Shows "Beta — New component" badge | New component, not yet stable |
| `'beta:OldComponent'` | Shows "Beta — Replaces OldComponent" badge | New component replacing an existing one |
| `'caution:newProps'` | Shows "Caution — Use newProps instead" badge | Component's design is changing |

### Story-level tags (on individual stories)

These determine which tab the story appears in:

| Tag | Tab | When to use |
|-----|-----|-------------|
| (no tag) | Examples | Default — most stories go here |
| `'recipe'` | Recipes | Complex integration examples (multi-component, external libraries) |
| `'reference'` | References | Background info, rationale, migration tables — renders without canvas |
| `'migration'` | Migration | Shows v5→v6 diffs or old→new comparisons |
| `'tab:<name>'` | Custom tab (capitalised `<name>`) | Custom grouping (e.g. `'tab:slots'`, `'tab:fields'`, `'tab:patterns'`) |
| `'!autodocs'` | Hidden | Story exists but not shown on the docs page |
| `'!tab:<name>'` | Excluded from custom tab | Exclude a story from a custom tab it would otherwise inherit |
| `'hideInSidebar'` | — | Hide from Storybook sidebar (still shown in docs) |

### Rules

1. **Recipe stories MUST have `tags: ['recipe']`** — otherwise they appear in Examples
2. **Custom tabs need `'tab:<name>'`** — use lowercase, descriptive names (e.g. `'tab:slots'`, `'tab:fields'`)
3. **Never combine conflicting tags** — a story should be in exactly one tab
4. **Reference stories render without a code panel** — use for documentation-only content (tables, migration guides)
5. **Status tags are optional** — only add `'updated'`, `'beta'`, or `'caution'` when the component's status warrants it


## Disallowed — never use these

| Pattern | Reason |
|---------|--------|
| `withCustomSource(...)` | Replaced by `withSource` |
| `withTransformedRawSource(...)` | Replaced by `withSource` |
| `<CurrentBreakpoint />` | Replaced by `withBreakpointLabel()` decorator |
| `render: () => <Mock />` (no args) | Code panel won't show; always use `render: (args) =>` |
| `controls: { disable: true }` on meta/default export | Only on individual gallery stories |
| Separate `*Recipes.stories.tsx` files | Merge into main file with `tags: ['recipe']` |
| `internalArgs` | Removed helper |
| `stripInternalPropsFromSource` | Removed helper |
| `supportedCardSlots` or external variable refs in args | Inline JSX directly |

## Imports

- Import `withSource`, `withBreakpointLabel`, `stylingProps`, `reactNodeArgType`, `disableArgTypes` from `@iress-oss/ids-storybook-config`
- Components with popovers/overlays: set `container: document.body` in args (not `container: {}`)

## One file per component

Each component has exactly one `.stories.tsx` file. Recipes, slots, and other tabs merge in using tags.

## AI Translate Pipeline Requirements

The `scripts/translate.ts` pipeline extracts code examples from stories for `.ai/` documentation. Follow these rules to ensure clean extraction:

### P1 stories (args-only, no render)

- Args must be **self-contained literals** — no `...Default.args` or `...OtherStory.args` spreads
- No computed expressions (e.g. `[...Array(5).keys()].map(...)`) — use literal arrays
- No imported constants as arg values (e.g. `MOCK_LABEL_VALUE_META`) — inline the values
- `false` boolean args that are defaults should be omitted (they add noise to the output)

### P2 stories (mock + withSource)

- ✅ These always translate well — the mock file is read directly
- Preferred for complex examples

### P3 stories (inline render)

- Use `(args) =>` with `{...args}` spread — the translator inlines arg values
- Do NOT use `.map()` over constants — use explicit repeated elements
- Do NOT use `{args.propName ? ... : ...}` ternaries — Storybook control logic that confuses translation
- Do NOT destructure args like `({ messages, ...args })` unless necessary — the translator excludes destructured params from inlining
- Props that are the point of the story should be explicit on the element (e.g. `<IressInline {...args} noWrap>`)

### Children control mappings

- `children: 'text'`, `'even'`, `'story'` etc. are Storybook control keys handled by translate plugins
- The translator replaces them with placeholder content — this is expected behaviour

### Stories referenced by `<StoryEmbed>`

- Ensure they produce standalone, complete code examples
- If a story can't be cleanly extracted, convert it to P2 (mock + withSource)
- The translate pipeline leaves unresolvable StoryEmbeds in place (visible in output)
