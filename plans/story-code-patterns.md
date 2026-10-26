# Story Code Patterns Analysis

Analysis of all 107 `.stories.tsx` files in `packages/components/src/` (both `components/` and `patterns/` subdirectories).

---

## Pattern Categories

### 1. Args-Only (No Render Function)

**Description:** Story defines only `args` — Storybook auto-renders the component with those props. The simplest pattern.

**Approximate count:** ~150 stories across 90 files

**Examples:**

```tsx
// components/Button/Button.stories.tsx → Default
export const Default: ButtonStory = {
  args: {
    children: 'Button',
  },
};
```

```tsx
// components/Checkbox/Checkbox.stories.tsx → Checked
export const Checked: Story = {
  args: {
    checked: true,
    children: 'A checkbox which is checked and in controlled mode',
  },
};
```

```tsx
// components/Select/Select.stories.tsx → SingleSelect
export const SingleSelect: Story = {
  args: {
    options: MOCK_LABEL_VALUE_META,
  },
};
```

**Translation strategy:** Directly map `args` to JSX props on the component. The cleanest case — output `<IressButton>Button</IressButton>`.

---

### 2. Render with `{...args}` Spread

**Description:** Story has a `render` function that spreads `args` onto the component, often adding extra elements around it or rendering multiple variants.

**Approximate count:** ~180 stories across 67 files (378 total `{...args}` usages)

**Examples:**

```tsx
// components/Button/Button.stories.tsx → Mode
export const Mode: ButtonStory = {
  args: { children: '' },
  render: ({ children, ...args }) => (
    <IressInline gap="md">
      <IressButton mode="primary" {...args}>
        {children === '' ? 'Primary button' : children}
      </IressButton>
      <IressButton mode="secondary" {...args}>
        {children === '' ? 'Secondary button' : children}
      </IressButton>
    </IressInline>
  ),
};
```

```tsx
// components/Alert/Alert.stories.tsx → Status
export const Status: Story = {
  args: { ...Default.args, messages: { info: '...', danger: '...' } },
  render: ({ messages, ...args }) => (
    <IressStack gap="md">
      {[...STATUSES, 'neutral'].map((status) => (
        <IressAlert {...args} status={status as never} key={status}>
          {messages[status as never]}
        </IressAlert>
      ))}
    </IressStack>
  ),
};
```

```tsx
// components/Input/Input.stories.tsx → Sizing
export const Sizing: Story = {
  render: ({ placeholder, ...args }) => (
    <IressStack gap="md">
      {FORM_ELEMENT_WIDTHS.map((width) => (
        <IressInput {...args} placeholder={placeholder ?? width} width={width} key={width} />
      ))}
    </IressStack>
  ),
};
```

**Translation strategy:** Resolve `args` into concrete prop values and inline them. For multi-variant renders (showing all modes/sizes), produce one example per variant or a single example showing the composition. Remove Storybook-specific conditional logic like `children === '' ? 'Primary button' : children`.

---

### 3. Render with Destructured Params

**Description:** The render function destructures specific props from args, often to separate them from the spread or to use them in custom logic.

**Approximate count:** ~36 stories across 13 files

**Examples:**

```tsx
// components/Field/Field.stories.tsx → Default
export const Default: Story = {
  args: { label: 'First name', input: defaultInput },
  render: ({ input, ...args }) => (
    <IressField {...args}>
      <IressInput {...input} />
    </IressField>
  ),
};
```

```tsx
// components/Card/Card.stories.tsx → Padding
export const Padding: Story = {
  args: { ...Default.args },
  render: ({ ...args }) => (
    <IressStack gap="md">
      <IressCard {...args} p="none">I'm a card with no padding</IressCard>
      <IressCard {...args} p="xs">I'm a card with xs padding</IressCard>
    </IressStack>
  ),
};
```

**Translation strategy:** Merge the destructured values back into concrete props. For `{ input, ...args }` patterns, flatten into the actual component tree with resolved values.

---

### 4. External Mock Component with `withCustomSource`

**Description:** Story renders a separate component from `./mocks/` and provides its raw source as the displayed code via `withCustomSource(Source)`. The mock file IS the code example.

**Approximate count:** ~78 stories across 26 files

**Examples:**

```tsx
// components/Select/Select.stories.tsx → AsyncOptions
import { SelectAsync } from './mocks/SelectAsync';
import SelectAsyncSource from './mocks/SelectAsync.tsx?raw';

export const AsyncOptions: Story = {
  render: (args) => <SelectAsync {...args} />,
  parameters: {
    ...withCustomSource(SelectAsyncSource),
  },
};
```

```tsx
// patterns/Form/FormRecipes.stories.tsx → WithReadonlyData
import { WithReadonlyDataForm } from './mocks/WithReadonlyDataForm';
import WithReadonlyDataFormSource from './mocks/WithReadonlyDataForm.tsx?raw';

export const WithReadonlyData: Story = {
  render: (args) => <WithReadonlyDataForm {...args} />,
  parameters: {
    ...withCustomSource(WithReadonlyDataFormSource),
  },
};
```

```tsx
// components/Expander/Expander.stories.tsx → Multiple
export const Multiple: StoryObj<typeof IressExpander> = {
  render: () => <MultipleExpander />,
  parameters: {
    ...withCustomSource(MultipleExpanderSource),
  },
};
```

**Translation strategy:** Use the raw source file directly — it's already a standalone code example. The `?raw` import contains the complete, self-contained component code. Just read the mock file.

---

### 5. External Mock Component with `withTransformedRawSource`

**Description:** Like pattern 4, but uses `withTransformedRawSource(Source, PropsType, propsToRemove?)` to transform the raw source before display — typically removing Storybook-specific prop types and filtering out certain props.

**Approximate count:** ~48 stories across 14 files

**Examples:**

```tsx
// components/Table/Table.stories.tsx → CustomColumns
import { TableCustomColumns } from './mocks/TableCustomColumns';
import TableCustomColumnsSource from './mocks/TableCustomColumns.tsx?raw';

export const CustomColumns: Story = {
  render: (args) => <TableCustomColumns {...args} />,
  parameters: {
    ...withTransformedRawSource(TableCustomColumnsSource, 'Props'),
  },
};
```

```tsx
// components/Toaster/Toaster.stories.tsx → Provider
import { SimpleToasterExample } from './mocks/SimpleToasterExample';
import SimpleToasterExampleSource from './mocks/SimpleToasterExample.tsx?raw';

export const Provider: Story = {
  render: (args) => <SimpleToasterExample {...args} />,
  parameters: {
    ...withTransformedRawSource(
      SimpleToasterExampleSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};
```

```tsx
// components/Autocomplete/Autocomplete.stories.tsx → Controlled
export const Controlled: Story = {
  render: (args) => <AutocompleteUsingState {...args} />,
  parameters: {
    ...withTransformedRawSource(AutocompleteUsingStateSource, 'IressAutocompleteProps'),
  },
};
```

**Translation strategy:** Use the raw source file as the base. The transformation removes the Storybook-specific props interface (replacing it with the real component props type) and optionally strips listed props. Apply the same transformations: replace the custom `Props` type with the real component props type, remove specified prop names from the component usage.

---

### 6. External Mock Component with `withTransformedProviderSource`

**Description:** Used for components that require a Provider wrapper (Modal, Slideout). Provides both the provider wrapper code and the inner story code as separate template strings.

**Approximate count:** ~4 stories across 2 files (Modal, Slideout)

**Examples:**

```tsx
// components/Modal/Modal.stories.tsx → Default
export const Default: Story = {
  decorators: [
    (Story) => (
      <IressModalProvider>
        <Story />
      </IressModalProvider>
    ),
  ],
  render: renderWithButtonFn(),
  parameters: {
    ...withTransformedProviderSource(
      `<IressModalProvider>
        <Story />
      </IressModalProvider>`,
      `const { showModal } = useModal();
const MODAL_ID = '${MODAL_ID}';
return (
  <Story />
);`,
    ),
    ...withJsxTransformer({ showFunctions: true, useFragmentShortSyntax: true }),
  },
};
```

```tsx
// components/Slideout/Slideout.stories.tsx → Default
export const Default: Story = {
  decorators: [
    (Story) => (
      <IressSlideoutProvider>
        <Story />
      </IressSlideoutProvider>
    ),
  ],
  render: renderWithButtonFn(),
  parameters: {
    ...withTransformedProviderSource(
      `<IressSlideoutProvider>...</IressSlideoutProvider>`,
      `const { showSlideout } = useSlideout();...`,
    ),
  },
};
```

**Translation strategy:** Combine the provider wrapper and inner code into a single standalone example. Show the Provider wrapping the component usage with the hook call.

---

### 7. `withJsxTransformer` (JSX Rendering Options)

**Description:** Configures how Storybook's JSX-to-string transformer renders the source. Common options: `showFunctions: true` (show function bodies instead of `[Function]`), `functionValue` (custom function stringification), `useBooleanShorthandSyntax`, `sortProps`.

**Approximate count:** ~26 usages across 10 files

**Examples:**

```tsx
// components/Input/Input.stories.tsx → Formatter
export const Formatter: Story = {
  args: {
    formatter: (value) => (value ? value.toString().toUpperCase() : ''),
  },
  parameters: {
    ...withJsxTransformer({ showFunctions: true }),
  },
};
```

```tsx
// components/Checkbox/Checkbox.stories.tsx → WithTableData
export const WithTableData: Story = {
  parameters: {
    ...withJsxTransformer({
      functionValue: () =>
        `(value: boolean) => <IressCheckbox defaultChecked={value} hiddenLabel>Toggle row</IressCheckbox>`,
      showFunctions: true,
    }),
  },
};
```

```tsx
// components/Table/Table.stories.tsx → RowProps
export const RowProps: Story = {
  parameters: {
    ...withJsxTransformer({
      functionValue: (functionString: string) => {
        return functionString.toString().replace(/3e4/g, '30000');
      },
      showFunctions: true,
    }),
  },
};
```

**Translation strategy:** When `showFunctions: true`, include function bodies in the output. When `functionValue` is provided, use its return value as the displayed function string. These are display hints — the actual code example should include the function inline.

---

### 8. Direct `parameters.docs.source.code`

**Description:** Manually sets the source code string displayed in docs, bypassing all auto-generation.

**Approximate count:** ~8 stories across 7 files

**Examples:**

```tsx
// components/Skeleton/SkeletonRecipes.stories.tsx → Card
export const Card: Story = {
  render: (args) => <SkeletonCard {...args} />,
  parameters: {
    docs: {
      source: {
        code: SkeletonCardSource,
        language: 'tsx',
      },
    },
  },
};
```

```tsx
// components/Input/InputRecipes.stories.tsx → ReactHookForms
export const ReactHookForms: Story = {
  render: (args) => <ReactHookFormsInput {...args} />,
  parameters: {
    docs: {
      source: {
        code: ReactHookFormsInputSource,
        language: 'tsx',
      },
    },
  },
};
```

**Translation strategy:** Identical to `withCustomSource` — the raw source IS the code example. Read the imported `?raw` file directly.

---

### 9. Referencing Other Stories' Args (`...OtherStory.args`)

**Description:** Stories inherit args from other stories using spread, building on top of a base configuration.

**Approximate count:** ~147 usages across 37 files

**Examples:**

```tsx
// components/Select/Select.stories.tsx → MultiSelect
export const MultiSelect: Story = {
  args: {
    ...SingleSelect.args,
    multiSelect: true,
  },
};
```

```tsx
// components/Input/Input.stories.tsx → ReadOnly
export const ReadOnly: Story = {
  ...Default,
  args: {
    ...Default.args,
    readOnly: true,
    value: 'Value',
  },
};
```

```tsx
// components/Card/Card.stories.tsx → NoBorder
export const NoBorder: Story = {
  args: {
    ...Default.args,
    noBorder: true,
  },
};
```

**Translation strategy:** Resolve the inheritance chain — merge all referenced args into a flat set of props. For `...Default.args` where Default has `{ children: "I'm a card" }`, the resolved NoBorder args become `{ children: "I'm a card", noBorder: true }`.

---

### 10. Render-Only (No Args, No Spread)

**Description:** Story has only a `render` function with no args or with `render: () => ...` (no params). The render function IS the complete example.

**Approximate count:** ~30 stories

**Examples:**

```tsx
// components/Button/Button.stories.tsx → Element
export const Element: ButtonStory = {
  render: () => <RoutingButton />,
  parameters: {
    ...withCustomSource(RoutingButtonSource),
  },
};
```

```tsx
// patterns/SideNav/SideNav.stories.tsx → Controlled
export const Controlled: Story = {
  render: () => <SideNavControlled />,
  parameters: {
    ...withCustomSource(SideNavControlledSource),
  },
};
```

```tsx
// patterns/Form/FormRecipes.stories.tsx → SanitisingInput
export const SanitisingInput: Story = {
  render: () => (
    <IressLoadingSuspense>
      <SanitisedInputForm />
    </IressLoadingSuspense>
  ),
  parameters: {
    ...withCustomSource(SanitisedInputFormSource),
  },
};
```

**Translation strategy:** If `withCustomSource` is present, use the raw source file. If not, the render function body itself is the example (strip the arrow function wrapper).

---

### 11. DiffViewer Stories (Migration Guides)

**Description:** Stories that render a `DiffViewer` component showing old vs new code. Used for v4→v5 migration documentation.

**Approximate count:** ~7 stories across 3 files

**Examples:**

```tsx
// components/Modal/Modal.stories.tsx → V5ModalDiff
export const V5ModalDiff: Story = {
  render: () => (
    <DiffViewer
      allowModeChange
      oldValue={`// v4 code...`}
      newValue={`// v5 code...`}
    />
  ),
};
```

```tsx
// patterns/Form/Form.stories.tsx → StateManagementV4ToV5
export const StateManagementV4ToV5: Story = {
  render: () => (
    <DiffViewer
      allowModeChange
      oldValue={`import { IressForm... } from '@iress/components';...`}
      newValue={`import { IressForm... } from '@iress-oss/ids-components';...`}
    />
  ),
};
```

**Translation strategy:** Extract both `oldValue` and `newValue` strings. Output as a `diff-tsx` fenced code block using patch-style `+`/`-` line prefixes (lines from `oldValue` get `-`, lines from `newValue` get `+`). This produces a clear migration diff that AI consumers and developers can read naturally as a before/after example.

---

### 12. Decorators (Provider Wrappers)

**Description:** Stories that use `decorators` to wrap the rendered story in a Provider component (ModalProvider, SlideoutProvider, ToasterProvider, IconProvider).

**Approximate count:** ~9 stories across 9 files

**Examples:**

```tsx
// components/Modal/Modal.stories.tsx → Default
export const Default: Story = {
  decorators: [
    (Story) => (
      <IressModalProvider>
        <Story />
      </IressModalProvider>
    ),
  ],
  render: renderWithButtonFn(),
};
```

```tsx
// components/Input/Input.stories.tsx → FileType
export const FileType: Story = {
  render: (args) => { /* ... */ },
  decorators: [
    (Story) => (
      <IressToasterProvider>
        <Story />
      </IressToasterProvider>
    ),
  ],
};
```

```tsx
// patterns/SideNav/SideNav.stories.tsx (meta-level decorator)
export default {
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof IressSideNav>;
```

**Translation strategy:** Include the Provider wrapper in the output code example. For layout-only decorators (div wrappers), omit them. For functional providers (ModalProvider, ToasterProvider), include them as they're required for the component to work.

---

### 13. Shared Render Functions (Factory Pattern)

**Description:** A reusable render function defined outside stories, called by multiple stories. Common for Modal/Slideout where a trigger button pattern repeats.

**Approximate count:** ~10 stories across 2 files (Modal, Slideout)

**Examples:**

```tsx
// components/Modal/Modal.stories.tsx
const renderWithButtonFn = <TStatus extends ModalStatus>(
  buttonTitle = 'Show modal',
): ArgsStoryFn<ReactRenderer, IressModalProps<TStatus>> => {
  return (args) => {
    const { showModal } = useModal();
    return (
      <>
        <IressButton onClick={() => showModal(MODAL_ID)}>{buttonTitle}</IressButton>
        <IressModal {...args} show={false} />
      </>
    );
  };
};

export const Default: Story = {
  render: renderWithButtonFn(),
};
```

```tsx
// components/Slideout/Slideout.stories.tsx
const renderWithButtonFn = (buttonTitle = 'Toggle slideout') => {
  return (args) => {
    const { showSlideout } = useSlideout();
    return (
      <>
        <IressButton onClick={() => showSlideout(SLIDEOUT_ID)}>{buttonTitle}</IressButton>
        <IressSlideout {...args} />
      </>
    );
  };
};
```

**Translation strategy:** Inline the factory function's output. Resolve the `args` spread into concrete props. The resulting example shows the trigger button + component with the hook usage.

---

### 14. Tags

**Description:** Stories use `tags` arrays at the meta level or story level for categorization and filtering.

**Approximate count:** 82 tag usages across 80 files

**Tag values observed:**
- `'updated'` — most common (~65 files), indicates v5-updated component
- `'beta'` / `'beta: '` — beta/in-progress components (~12 files)
- `'recipe'` — recipe/pattern story (1 story-level usage)
- `'hideInSidebar'` — hidden from navigation (1 usage)
- `'caution:...'` — warning about specific props (1 usage)

**Translation strategy:** Tags are metadata only. Use `'recipe'` tag to identify stories that should be treated as standalone recipe examples. `'beta'` stories may need a note about stability.

---

### 15. Mock Data Imports

**Description:** Stories import mock data (options arrays, table rows, etc.) from `./mocks/` or `@/mocks/` directories.

**Approximate count:** ~188 imports across 40 files

**Examples:**

```tsx
// components/Select/Select.stories.tsx
import { generateLabelValueMeta, MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';

export const SingleSelect: Story = {
  args: {
    options: MOCK_LABEL_VALUE_META,
  },
};
```

```tsx
// patterns/SideNav/SideNav.stories.tsx
import { MOCK_SIDE_NAV_ITEMS, MOCK_GROUPED_ITEMS } from './mocks/sideNavItems';

export default {
  args: { items: MOCK_SIDE_NAV_ITEMS },
};
```

**Translation strategy:** Inline the mock data directly in the code example (for small datasets), or include a simplified version. For large datasets (200 items), use a representative subset (3-5 items). The derive script needs to resolve these imports and inline their values.

---

### 16. Inline Complex JSX in Args

**Description:** Stories pass JSX elements directly as arg values (for slots like `header`, `footer`, `children`, `prepend`, `append`).

**Approximate count:** ~50+ stories

**Examples:**

```tsx
// components/Select/Select.stories.tsx → HeaderFooter
export const HeaderFooter: Story = {
  args: {
    options: MOCK_LABEL_VALUE_META,
    header: (
      <>
        <IressMenuText>
          <IressText element="h3" style={{ margin: 0 }}>Header</IressText>
        </IressMenuText>
        <IressDivider style={{ marginTop: 0 }} />
      </>
    ),
    footer: (
      <>
        <IressDivider style={{ marginBottom: 0 }} />
        <IressMenuText>
          <IressInline gap="sm">
            <IressButton>Button 1</IressButton>
            <IressButton>Button 2</IressButton>
          </IressInline>
        </IressMenuText>
      </>
    ),
  },
};
```

```tsx
// components/TabSet/TabSet.stories.tsx → Panels
export const Panels: Story = {
  args: {
    children: [
      <IressTab key="address" label="Address">Address information goes here</IressTab>,
      <IressTab key="employment" label="Employment">Employment information goes here</IressTab>,
    ],
  },
};
```

**Translation strategy:** Render the JSX args as children/props in the output. These translate naturally to JSX — just place them in the component tree.

---

### 17. Stateful Render Functions (Hooks in Render)

**Description:** The render function uses React hooks (useState, useEffect) or component hooks (useModal, useSlideout, useToaster) directly.

**Approximate count:** ~15 stories

**Examples:**

```tsx
// components/Field/Field.stories.tsx → Supplementary
export const Supplementary: Story = {
  render: ({ input, ...args }) => {
    const [error, setError] = useState<string | undefined>();
    return (
      <IressStack gap="spacing.5">
        <IressToggle onChange={(checked) => setError(checked ? 'This field is required' : undefined)}>
          Show error
        </IressToggle>
        <IressField {...args} error={error}>
          <IressInput {...input} />
        </IressField>
      </IressStack>
    );
  },
};
```

```tsx
// components/Modal/Modal.stories.tsx → DisableClosing
export const DisableClosing: Story = {
  render: (args) => {
    const { showModal } = useModal();
    return (
      <IressStack gap="md">
        <IressButton onClick={() => showModal('disable-backdrop-click')} fluid>
          Disable backdrop click
        </IressButton>
        <IressModal {...args} id="disable-backdrop-click" disableBackdropClick />
      </IressStack>
    );
  },
};
```

**Translation strategy:** Wrap the render body in a named component function. The hooks require a component boundary. Output as:
```tsx
const Example = () => {
  const [error, setError] = useState<string | undefined>();
  return ( /* ... */ );
};
```

---

### 18. Custom argTypes with Storybook-Only Controls

**Description:** Stories define custom `argTypes` with Storybook-specific controls (select, object) and mappings that don't correspond to real component props.

**Approximate count:** ~10 stories

**Examples:**

```tsx
// components/Alert/Alert.stories.tsx → Status
type CustomArgs = Partial<IressAlertProps> & {
  messages: Record<Statuses | 'neutral', string>;
};

export const Status: Story = {
  args: {
    messages: { info: '...', danger: '...' },
  },
  argTypes: {
    messages: {
      control: 'object',
      description: 'Messages for each status',
      table: { category: STORYBOOK_ONLY_CATEGORY },
    },
  },
};
```

```tsx
// components/Popover/Popover.stories.tsx (meta-level)
export default {
  argTypes: {
    children: {
      control: { type: 'select' },
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
    },
  },
};
```

**Translation strategy:** Ignore Storybook-only args. Resolve mapped values to their actual content. For `messages` in Alert, inline the actual message strings. For `children` mappings, use the resolved JSX value.

---

## Summary Statistics

| Pattern | Approx. Stories | Files |
|---------|----------------|-------|
| Args-only (no render) | ~150 | 90 |
| Render with `{...args}` spread | ~180 | 67 |
| Render with destructured params | ~36 | 13 |
| `withCustomSource` (external mock) | ~78 | 26 |
| `withTransformedRawSource` (transformed mock) | ~48 | 14 |
| `withTransformedProviderSource` | ~4 | 2 |
| `withJsxTransformer` | ~26 | 10 |
| Direct `docs.source.code` | ~8 | 7 |
| References other stories' args | ~147 | 37 |
| Render-only (no args) | ~30 | — |
| DiffViewer (migration) | ~7 | 3 |
| Decorators (providers) | ~9 | 9 |
| Shared render functions | ~10 | 2 |
| Mock data imports | ~188 | 40 |
| Inline JSX in args | ~50+ | — |
| Stateful render (hooks) | ~15 | — |
| Custom Storybook-only argTypes | ~10 | — |

---

## Derive Script Handling Priority

### Tier 1 — Already solved (use raw source directly)
- **`withCustomSource`** — The mock file IS the example. Read it.
- **`withTransformedRawSource`** — The mock file with minor type/prop cleanup.
- **Direct `docs.source.code`** — Same as withCustomSource.

### Tier 2 — Straightforward transformation
- **Args-only** — Map args to JSX props. Simplest case.
- **Args referencing other stories** — Resolve inheritance chain, then treat as args-only.
- **Inline JSX in args** — Render as children/props naturally.

### Tier 3 — Moderate complexity
- **Render with `{...args}` spread** — Resolve args, inline into the JSX. Remove Storybook conditional logic.
- **Render with destructured params** — Merge destructured values, produce clean JSX.
- **`withJsxTransformer`** — Apply the display hints (show functions, custom stringification).

### Tier 4 — Requires wrapping/restructuring
- **Stateful render functions** — Wrap in a named component.
- **Decorators (providers)** — Include provider in output.
- **`withTransformedProviderSource`** — Combine provider + inner code.
- **Shared render functions** — Inline the factory output.

### Tier 5 — Special cases (may skip or handle differently)
- **DiffViewer stories** — Extract both `oldValue` and `newValue`, output as a `diff-tsx` fenced code block (patch style with `+`/`-` prefixes). This gives AI consumers a clear before/after migration example.
- **Custom Storybook-only argTypes** — Resolve mapped values, ignore controls.
- **Mock data imports** — Inline representative data subset.
- **`tags: ['recipe']`** — Flag for special treatment as standalone recipes.

---

## Key Observations

1. **The `?raw` import pattern is the gold standard.** When a story uses `withCustomSource` or `withTransformedRawSource`, the mock file in `./mocks/` is already a clean, standalone component. ~78+ stories already have perfect code examples ready to use.

2. **Args inheritance is pervasive.** 37 files reference other stories' args. The derive script must resolve these chains (sometimes 2-3 levels deep: `...Default.args` → `...SingleSelect.args`).

3. **Most render functions use `{...args}` spread.** This is the most common pattern (67 files). The script needs to resolve args and inline them, removing the spread.

4. **Provider-dependent components (Modal, Slideout, Toaster) need special handling.** They require wrapping in a Provider and using hooks. The derive script should include the Provider in the output.

5. **No `play` functions found.** The codebase doesn't use Storybook interaction testing in these story files.

6. **Mock data is heavily used.** 40 files import from `./mocks/`. For code examples, small datasets should be inlined; large ones (200 items) should be truncated to 3-5 representative items.

7. **`withTransformedRawSource` takes a props type name and optional props-to-remove array.** This tells the transformer to replace the mock's internal props type with the real component props type and strip specified props (usually Storybook-only ones like `container`).

---

## Import Path Transformation

All `?raw` mock files use the internal alias `@/main` for imports:

```tsx
import { IressButton, IressStack } from '@/main';
```

The derive script MUST transform these to the published package name:

```tsx
import { IressButton, IressStack } from '@iress-oss/ids-components';
```

This applies to:
- All `withCustomSource` raw imports
- All `withTransformedRawSource` raw imports
- Any other raw file content used as code examples

---

## Recommendations: Story Pattern Strategy

The goal is to maintain Storybook interactivity where it matters, while ensuring every story can produce a clean, standalone code example for AI docs.

### Patterns to Keep

#### 1. Args-only stories (simple prop demos)

```tsx
export const Default: Story = {
  args: { children: 'Button', mode: 'primary' },
};
```

- **Interactivity:** ✅ Full controls
- **Code quality:** ✅ Trivial to derive (`<IressButton mode="primary">Button</IressButton>`)
- **Use for:** Default stories, simple prop toggles (Disabled, Checked, Compact, etc.)

#### 2. Render without args (gallery/multi-variant)

```tsx
export const Mode: Story = {
  render: () => (
    <IressInline gap="md">
      <IressButton mode="primary">Primary</IressButton>
      <IressButton mode="secondary">Secondary</IressButton>
      <IressButton mode="tertiary">Tertiary</IressButton>
    </IressInline>
  ),
};
```

- **Interactivity:** ❌ None (not needed — these show all variants at once)
- **Code quality:** ✅ Render body IS the example
- **Use for:** Showcasing all modes/sizes/statuses in one view

#### 3. Mock file + `withCustomSource` (with args for interactivity)

```tsx
// Mock file (with args for controls)
export function SelectAsync({ ...args }) {
  return <IressSelect {...args} options={fetchOptions} />;
}

// Story
export const AsyncOptions: Story = {
  render: (args) => <SelectAsync {...args} />,
  parameters: { ...withCustomSource(SelectAsyncSource) },
};
```

- **Interactivity:** ✅ Controls work via args spread
- **Code quality:** ✅ `withCustomSource` provides the clean display code; derive script reads raw file
- **Use for:** Complex integrations where designers/developers want to play with props (async select, controlled inputs, form validation)

#### 4. Mock file without args (standalone composition)

```tsx
// Mock file (no args, fully self-contained)
export function AlertWithActions() {
  return (
    <IressAlert status="danger" actions={[{ children: 'Retry' }]}>
      Something went wrong.
    </IressAlert>
  );
}

// Story
export const Actions: Story = {
  render: () => <AlertWithActions />,
  parameters: { ...withCustomSource(AlertWithActionsSource) },
};
```

- **Interactivity:** ❌ None (for complex compositions, controls aren't useful anyway)
- **Code quality:** ✅ Perfect standalone example
- **Use for:** Patterns, recipes, multi-component compositions

### Pattern to simplify: Complex renders with `{...args}` + conditionals/maps

These ~50-80 stories have render functions with arg spreading, `.map()` calls, conditional logic, and Storybook-only control values. They give controls interactivity but produce unusable code examples.

**Current:**
```tsx
export const Status: Story = {
  args: { ...Default.args, messages: { info: '...', danger: '...' } },
  render: ({ messages, ...args }) => (
    <IressStack gap="md">
      {[...STATUSES, 'neutral'].map((status) => (
        <IressAlert {...args} status={status as never} key={status}>
          {messages[status as never]}
        </IressAlert>
      ))}
    </IressStack>
  ),
};
```

**Recommended migration:** Extract into a mock file. If controls interactivity is important, keep args spread. If not, make it fully standalone:

```tsx
// mocks/AlertStatus.tsx
import { IressAlert, IressStack } from '@/main';

export function AlertStatus() {
  return (
    <IressStack gap="md">
      <IressAlert status="info">Informational message.</IressAlert>
      <IressAlert status="success">Success message.</IressAlert>
      <IressAlert status="warning">Warning message.</IressAlert>
      <IressAlert status="danger">Error message.</IressAlert>
      <IressAlert status="neutral">Neutral message.</IressAlert>
    </IressStack>
  );
}
```

### Summary: Pattern priority matrix

| Pattern | Interactivity | Code quality | Derive difficulty | Use for |
|---------|:---:|:---:|:---:|---|
| Args-only | ✅ Full | ✅ Trivial | Easy | Simple prop demos |
| Render without args | ❌ None | ✅ Direct | Easy | Multi-variant galleries |
| Mock + `withCustomSource` (with args) | ✅ Via args | ✅ Raw file | Easy (read file) | Important integrations |
| Mock + `withCustomSource` (no args) | ❌ None | ✅ Perfect | Easy (read file) | Compositions, patterns |
| Complex render + args (MIGRATE THESE) | ✅ Full | ❌ Hard to derive | Hard | — migrate to mock files |

### Consolidated helper: `withSource`

Consolidate `withCustomSource` and `withTransformedRawSource` into a single helper:

```tsx
export function withSource(raw: string, options?: {
  replacePropsType?: string;
  removeProps?: string[];
}) { ... }
```

- Always transforms `@/main` → `@iress-oss/ids-components`
- Optionally replaces a custom props interface with the real component props type
- Optionally strips specified prop names
- Returns `parameters.docs.source` config

This reduces the number of helper patterns from 3+ down to 1.

---

## Migration Path

### Progress

- [x] **Step 1: Create unified `withSource` helper** — `packages/storybook-config/src/helpers/withSource.ts`
  - Always transforms `@/main` → `@iress-oss/ids-components`
  - `replacePropsType` option strips interface/type declarations and annotations
  - `removeProps` option strips specified props from JSX
  - `stripImports` option removes import statements (for cleaner Storybook display)
  - `format` option (default: true) runs prettier via Storybook's async transform API
  - Exports `transformSource` for reuse by the derive script (no Storybook deps)
  - Backwards-compatible: `withCustomSource` and `withTransformedRawSource` re-exported as deprecated aliases
  - 20 tests passing (`packages/storybook-config/src/helpers/withSource.test.ts`)
- [x] **Step 2: Migrate ~50 complex render+args stories to mock files**
  - All `render: () =>` patterns eliminated (71 stories converted to `render: (args) =>`)
  - Migrated complex inline stories to self-contained mock files (Field, Input, Menu, Modal, Popover, Select, Slideout, TabSet, Table, Toggle, Provider, Feedback, SideNav, Form patterns)
  - Fixed `withSource`/`docs` parameter merge conflicts across multiple components
  - Fixed `stripExportFunction: true` misuse on stateful mocks (Select, Table, Icon)
  - Added `!autodocs` tag support to custom ComponentAutoDocs template
  - Removed unused `MENU_CHILDREN_OPTIONS` mapping pattern
  - Storybook fully tested — all code panels show complete, copy-paste-able examples
- [ ] **Step 3: Create `createMeta` factory** (Phase 12.10 from guidelines plan)
- [ ] **Step 4: Build `translate.ts`** (see `plans/ai-docs-pipeline-consolidation.md`)

### ⚠️ Storybook Quirk: Always spread args into mock components

Storybook's autodocs `ComponentCanvas` requires `render: (args) => <Mock {...args} />` — NOT `render: () => <Mock />`. Without the args parameter and spread, Storybook's internal source detection breaks and the code panel won't display properly.

The mock component should accept and ignore the spread (it uses concrete props internally):

```tsx
// In the story:
render: (args) => <AlertStatus {...args} />,

// In the mock file (args are accepted but not used):
export function AlertStatus({ ...args }) {
  return (
    <IressStack gap="md">
      <IressAlert status="danger">...</IressAlert>
    </IressStack>
  );
}
```

The `withSource` helper's `stripImports` option will strip the `{...args}` from the displayed code, so consumers see clean output. The derive script also ignores the spread.

### ⚠️ Disable controls on gallery stories

Mock-based gallery stories (showing all variants) don't respond to controls since props are hardcoded in the mock. Add `parameters.controls.disable` to prevent confusion:

```tsx
export const Mode: ButtonStory = {
  render: (args) => <ButtonMode {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ButtonModeSource, { stripImports: true, stripExportFunction: true }),
  },
};
```

This should be applied during the bulk migration to all stories that use standalone mock files with no interactive args.

### ⚠️ Interactivity in mock files uses useState, not Storybook controls

When a mock benefits from interactivity (toggling props, selecting options), use `useState` inside the mock itself rather than relying on Storybook args. This keeps the mock as a complete, copy-paste-able example:

```tsx
// mocks/AlertInteractive.tsx
import { useState } from 'react';
import { IressAlert, IressStack, IressRadioGroup, IressRadio } from '@/main';

export function AlertInteractive() {
  const [status, setStatus] = useState('info');

  return (
    <IressStack gap="md">
      <IressRadioGroup name="status" onChange={setStatus} defaultValue="info">
        <IressRadio value="info">Info</IressRadio>
        <IressRadio value="danger">Danger</IressRadio>
      </IressRadioGroup>
      <IressAlert status={status}>Alert message</IressAlert>
    </IressStack>
  );
}
```

This pattern:
- Keeps the mock self-contained (no Storybook dependency)
- AI translation picks it up as a working example with state management
- Storybook controls stay disabled (`controls: { disable: true }`)
- Only use where interactivity adds genuine value — most galleries stay frozen

### ⚠️ Inline JSX in args — no external variable references

Args that contain JSX (slots like `prepend`, `footer`, `children`) must be inlined directly in the story args — NOT referenced from shared objects or external files:

```tsx
// ❌ Bad — translator can't resolve the variable
import { supportedCardSlots } from './mocks/supportedCardSlots';
export const Prepend: Story = {
  args: { prepend: supportedCardSlots.prepend },
};

// ✅ Good — self-contained, translator maps directly to props
export const Prepend: Story = {
  args: { prepend: <IressIcon name="star" /> },
};
```

If slot interactivity is needed (e.g. swapping between different slot contents), use a P2 mock with `useState` — NOT Storybook `argTypes.mapping`:

```tsx
// ❌ Bad — Storybook-only, can't be translated
argTypes: {
  icon: {
    options: ['Star', 'Heart'],
    mapping: { Star: <IconStar />, Heart: <IconHeart /> },
    control: { type: 'select' },
  },
};

// ✅ Good — self-contained mock with real React patterns
export function CardSlotPicker() {
  const [icon, setIcon] = useState<'star' | 'heart'>('star');
  return (
    <IressStack gap="md">
      <IressRadioGroup name="icon" onChange={setIcon} defaultValue="star">
        <IressRadio value="star">Star</IressRadio>
        <IressRadio value="heart">Heart</IressRadio>
      </IressRadioGroup>
      <IressCard prepend={<IressIcon name={icon} />}>Card content</IressCard>
    </IressStack>
  );
}
```

This ensures the translation pipeline can always produce complete, working code without resolving external references.

### Consolidate recipe stories into the main stories file

Instead of having separate `*Recipes.stories.tsx` files, put recipe stories in the main component stories file and tag them with `tags: ['recipe']`:

```tsx
// In Button.stories.tsx (at the bottom)
export const WithConfirmModal: ButtonStory = {
  tags: ['recipe'],
  render: (args) => <ButtonWithConfirmModal {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ButtonWithConfirmModalSource, { stripImports: true, stripExportFunction: true }),
  },
};
```

The `AutoDocsPage` already separates recipes into their own "Recipes" tab via the `recipe` tag. This keeps everything in one file, reduces file count, and makes it easier to find all stories for a component.

**During bulk migration:** Move stories from `*Recipes.stories.tsx` into the main file with `tags: ['recipe']`, then delete the recipes file.

### Add `reference` tag for interactive reference stories

Stories like Icon Reference, Breakpoint Details, and migration tables are not code examples — they're interactive reference tools. Tag them with `tags: ['reference']` and render in a dedicated "References" tab in AutoDocsPage.

```tsx
export const IconReference: Story = {
  tags: ['reference'],
  name: 'Icon Reference',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Search and browse all available Material Symbols icons.' },
      source: { code: '' }, // hide code panel
    },
  },
  render: () => <IconReferenceApp />,
};
```

**Implementation steps:**
- [ ] Add `reference` tag filtering in AutoDocsPage (same pattern as `recipe`)
- [ ] Create a "References" tab that renders these stories with their descriptions
- [ ] Hide code panel for reference stories (`source.code: ''`)
- [ ] Disable controls for reference stories
- [ ] These also appear in the guidelines site Specifications tab via StoryEmbed

### Hide non-serializable Storybook-internal args from code display

Several components set `container: document.body` or `popoverProps: { container: document.body }` in their meta-level args — this is a Storybook workaround for rendering popovers outside the iframe. Storybook serializes `document.body` as its React internal properties (e.g. `{ _reactListeningabc123: true }`), which is confusing.

**Fix implemented:** `transformSource` in `withSource` replaces serialized DOM elements with `document.body`. This handles all stories that use `withSource`.

For args-only stories (no `withSource`), use a meta-level `docs.source.transform`:
```tsx
parameters: {
  docs: {
    source: {
      transform: (code) => code.replace(/\{\s*_react[^}]*\}/gs, 'document.body'),
    },
  },
}
```

**Plan:** Add this transform to the `createMeta` factory so it applies globally to all components without per-file configuration.

- [x] Added to `transformSource` in `withSource` (handles mock-based stories)
- [ ] Add to `createMeta` factory as global fallback (handles args-only stories)

### Replace shared render factories with mock files (Modal/Slideout)

Modal and Slideout use a `renderWithButtonFn` factory that returns a render function. This is opaque to contributors and AI. Replace with individual mock files per story:

```tsx
// mocks/ModalDefault.tsx
import { IressModal, IressButton, IressModalProvider, useModal } from '@/main';

export function ModalDefault() {
  const { showModal } = useModal();
  return (
    <IressModalProvider>
      <IressButton onClick={() => showModal('my-modal')}>Show modal</IressButton>
      <IressModal id="my-modal" show={false}>Modal content</IressModal>
    </IressModalProvider>
  );
}
```

Each mock is a complete, copy-paste-able example including the Provider. Removes the need for the decorator + factory pattern.

- [ ] Migrate Modal stories (~5) to mock files
- [ ] Migrate Slideout stories (~3) to mock files
- [ ] Remove `renderWithButtonFn` from both files

### Move DiffViewer migration stories to guidelines

DiffViewer stories (v4→v5 migration guides) don't belong in Storybook — it's a library reference, not a guide. Move them to `apps/guidelines/content/`:

- [ ] Move Modal v4→v5 diff content to guidelines
- [ ] Move Slideout v4→v5 diff content to guidelines
- [ ] Move Form v4→v5 diff content to guidelines
- [ ] Remove DiffViewer stories from component story files

### Removed `CurrentBreakpoint` from stories

`CurrentBreakpoint` is a Storybook-only component from `storybook-config` that doesn't serialize properly in the code panel (renders as `<p />`). Replaced with static text `(resize to see changes)` in inline stories.

For mock files that need the live breakpoint value, use `useBreakpoint` from `@iress-oss/ids-components` inside the mock component (since mocks are proper components that can use hooks).

### Add Guidelines panel to Storybook addon panel

Add a "Guidelines" tab to the Storybook addon panel that shows:
- Component description (from meta)
- Link to the full guidelines page
- Quick reference info (status, owner, related components)

This gives developers in-Storybook access to documentation without switching to the guidelines site. Implementation as part of Phase 13.5 (component specifications in Storybook).

### Old → New Pattern Mapping

| # | Old Pattern | New Pattern | Action |
|---|---|---|---|
| 1 | Args-only (no render) | **Keep as-is** | No change needed. Derive translates args to JSX. |
| 2 | Render with `{...args}` spread (simple, single component) | **Args-only** | Remove the render function, move props to `args`. |
| 3 | Render with `{...args}` spread (multi-variant, maps, conditionals) | **Mock file + `withSource`** | Extract to a mock file with concrete values. Story uses `render: (args) => <Mock {...args} />` if controls needed, or `render: () => <Mock />` if not. |
| 4 | Render with destructured params + spread | **Mock file + `withSource`** | Same as #3 — extract to mock, merge destructured values into concrete props. |
| 5 | `withCustomSource(Source)` | **`withSource(Source)`** | Rename helper. Now auto-transforms `@/main`. |
| 6 | `withTransformedRawSource(Source, 'Props')` | **`withSource(Source, { replacePropsType: 'Props' })`** | Use unified helper with options. |
| 7 | `withTransformedRawSource(Source, 'Props', ['container'])` | **`withSource(Source, { replacePropsType: 'Props', removeProps: ['container'] })`** | Use unified helper with options. |
| 8 | Direct `parameters.docs.source.code` | **`withSource(inlineString)`** | Pass string directly to unified helper. |
| 9 | `withJsxTransformer` | **Keep as-is** | Only affects Storybook display formatting. Derive script ignores it. |
| 10 | Render without args (gallery) | **Keep as-is** | Render body IS the example. Derive extracts it directly. |
| 11 | DiffViewer with inline template strings | **DiffViewer with separate old/new files** | Move `oldValue`/`newValue` into `mocks/ComponentV4.tsx` and `mocks/ComponentV5.tsx`. Derive produces `diff-tsx` fence. |
| 12 | Stateful render (hooks in render) | **Mock file + `withSource`** | Already the recommended pattern — most of these already use mock files. |
| 13 | Decorators (provider wrappers) | **Keep decorators, mock file for display** | Decorators stay for Storybook rendering. Mock file shows the full provider + component code. |
| 14 | References other stories' args (`...Default.args`) | **Keep for Storybook controls, ignore for derive** | Args inheritance is fine for controls. Derive resolves the chain or uses the mock file. |
| 15 | Mock data imports from `./mocks/` | **Keep, inline subset in mock file** | Mock files should contain representative sample data (3-5 items, not 200). |
| 16 | `tags: ['recipe']` | **Keep as-is** | Tag doesn't affect code extraction. Recipes should always use mock files. |
| 17 | Shared render functions (factories) | **Mock file per story** | Each story gets its own mock file instead of sharing a factory. |
| 18 | `withTransformedProviderSource` | **Mock file + `withSource`** | Replace with a mock file that includes the provider wrapper. |

### Steps

1. **Immediate (derive script):** Handle `@/main` → `@iress-oss/ids-components` transformation in all raw source
2. **Immediate (derive script):** Implement Tier 1 — read `withCustomSource`/`withTransformedRawSource` raw files directly (~130 stories)
3. **Immediate (derive script):** Implement Tier 2 — translate args-only stories into JSX (~150 stories)
4. **Short-term:** Create unified `withSource` helper, migrate existing helpers
5. **Short-term:** Implement Tier 3 — extract render bodies without args (gallery stories)
6. **Medium-term:** Migrate ~50 complex render+args stories into mock files (eliminates the hardest derive cases)
7. **Ongoing:** As stories are touched, prefer mock file patterns for anything beyond simple args-only
