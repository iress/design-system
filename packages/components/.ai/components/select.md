# Select

> Renders a dropdown select input for choosing one option from a list.

## Import

```tsx
import { IressSelect } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-23433)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Select)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=select&title=[Select]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=select,enhancement&title=[Select]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | `[FloatingUIAligns](../../dist/types.d.ts)` | `bottom-start` | Sets the alignment of the dropdown relative to the activator element. |
| autoHighlight | `boolean` | `true` | By default, the Select will automatically highlight the first option in the list when it is opened. Set this to false to disable that behaviour. |
| disabled | `boolean` | — |  |
| defaultValue | `any` | — | Value of selected option for uncontrolled select. |
| multiSelect | `boolean` | — | Set to true if the user can select multiple options. |
| multiSelectLimit | `number` | `5` | Limits the number of selected value tags shown before the rest are collapsed into a summary tag (e.g. "+3 more"). Only applies when `multiSelect` is `true`. This is not for validation — it only controls how many tags are visibly rendered. |
| name | `string` | — | Name of the select. Used to pass data when submitted within a form. |
| native | `any` | — | If `true`, the select will render a native select element instead of the custom select. This is for use in contexts where the select's popover may not work, such as within modals or tables, or when you want to use the native select's features such as optgroups. |
| onBlur | `((event: Event , FocusEvent<HTMLElement, Element>) => void)` | — | Callback fired when the user has completely blurred away from the Select. This is to kill the blur event bubbling. (component is no longer in focus and popover is closed). |
| onChange | `any` | — | Emitted when the value changes. Required for integration with `IressForm`. When using custom `renderOptions`, pass `handleMenuChange` to your menu's `onChange` to ensure this callback fires. |
| **options** | `FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)>[] , ((query: string) => Promise<[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[]>)` | — | The available options that the user can select from. |
| placeholder | `any` | — | Placeholder, shown when there is nothing selected. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the select as read-only. |
| renderHiddenInput | `((props: SelectHiddenInputRenderProps<TMultiple>) => ReactNode)` | — | Completely customise the rendering of the hidden input. |
| renderLabel | `((props: SelectLabelRenderProps<TMultiple>) => ReactElement>)` | — | Completely customise the rendering of the select label. |
| renderOptions | `((props: SelectOptionsRenderProps<TMultiple>) => ReactNode)` | — | Completely customise the rendering of the select options. |
| required | `boolean` | — | Whether its required. Will be passed to the hidden input. |
| type | `dialog` , `grid` , `listbox`, `menu` , `tree`  | — |  |
| value | `any` | — | Value of selected option for controlled select. |
| virtualFocus | `boolean` | — |  |
| header | `ReactNode` | — | Header showed in option panel when expanded. |
| footer | `ReactNode` | — | Footer showed in option panel when expanded. |
| width | `any` | — | The width of the select. |
| matchActivatorWidth | `boolean` | `true` | Whether the popover should match the width of the activator element. When true, the dropdown will have the same width as the select input. When false, the dropdown will size based on its content. |
| minSearchLength | number _(Only when options is a function (async))_ | — | Minimum number of characters required before search results are shown. |

📄 [Full type definition](../../dist/components/Select/Select.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Renders a dropdown select input for choosing one option from a list.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
/>;
```

## Design

### When to use

- **Choosing from a predefined list**: When users need to pick one (or multiple) options from a known set
- **Form inputs**: Standard form fields where a dropdown is appropriate
- **Async search**: When options are loaded dynamically based on user input
- **Grouped options**: When options are logically grouped into categories

### When not to use

- **Free text input** — use [Input](../components/input.md) instead
- **Boolean choices** — use a [Toggle](../components/toggle.md) or [Checkbox](../components/checkbox.md)
- **Very few options (2–3)** — consider [Radio Group](../components/radio-group.md) for better visibility

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Provide a placeholder that hints at what to select | Leave placeholder empty with no context |
| Use async options for large datasets | Load thousands of options upfront |
| Group related options for easier scanning | Mix unrelated options without grouping |
| Set a sensible `limit` for multi-select | Allow unlimited selections when a max makes sense |

### Content guidelines

- **Placeholder**: Use a descriptive hint (e.g. "Select a country", "Choose an account")
- **Option labels**: Keep concise, use sentence case
- **Groups**: Use clear heading labels for grouped options
- **Empty state**: Provide helpful text when no options match a search

### Related patterns

- [Autocomplete](../components/autocomplete.md) — for free-text input with suggestions
- [Field](../components/field.md) — for wrapping Select with label and validation
- [Form](../patterns/form.md) — for form submission with validation

## Develop

### Quick Start

```tsx
import { IressSelect } from '@iress-oss/ids-components';

<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]}
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs#api-props)

### Usage

#### Single Select

Basic single-value selection from a list of options.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
/>;
```

#### Multi Select

Enable multiple selection with the `multi` prop. Use `limit` to cap the number of selections.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  multiSelect
/>;
```

##### Limit the multi-select

Add a `multiSelectLimit` prop to restrict the number of selections visible to the user. Note: this only limits the visible selection, not disabling the ability to select more options.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  multiSelect
  multiSelectLimit={2}
  defaultValue={['1', '2', '3', '4', '5']}
/>;
```

#### Async Options

Load options dynamically using the `onSearch` callback.

```tsx
import {
  IressCol,
  IressField,
  IressRow,
  IressSelect,
} from '@iress-oss/ids-components';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

const options = async (query: string) => {
  if (!query) return [];

  if (query === 'error') {
    throw new Error();
  }

  const data = await fetch(
    `https://swapi.py4e.com/api/people/?search=${query}`,
  ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

  return data.results.map((character: StarWarsCharacter) => ({
    label: character.name,
    value: character.name,
    meta: character.gender,
  }));
};

export const SelectAsync = () => (
  <IressRow gutter="md">
    <IressCol>
      <IressField label="Single select" htmlFor="single-select">
        <IressSelect
          container={document.body}
          options={options}
          id="single-select"
        />
      </IressField>
    </IressCol>
    <IressCol>
      <IressField label="Multi-select" htmlFor="multi-select">
        <IressSelect
          container={document.body}
          options={options}
          id="multi-select"
          multiSelect
        />
      </IressField>
    </IressCol>
  </IressRow>
);
```

#### Async Options with Minimum Search Length

To avoid unnecessary API calls, use the `minSearchLength` prop to require a minimum number of characters before triggering the search.

```tsx
import {
  IressCol,
  IressField,
  IressRow,
  IressSelect,
} from '@iress-oss/ids-components';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

const options = async (query: string) => {
  if (!query) return [];

  if (query === 'error') {
    throw new Error();
  }

  const data = await fetch(
    `https://swapi.py4e.com/api/people/?search=${query}`,
  ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

  return data.results.map((character: StarWarsCharacter) => ({
    label: character.name,
    value: character.name,
    meta: character.gender,
  }));
};

export const SelectAsyncMinLength = () => (
  <IressRow gutter="md">
    <IressCol>
      <IressField
        label="Default behavior (1 character)"
        htmlFor="default-select"
      >
        <IressSelect
          container={document.body}
          options={options}
          id="default-select"
          placeholder="Type any character..."
        />
      </IressField>
    </IressCol>
    <IressCol>
      <IressField
        label="Search requires 3+ characters"
        htmlFor="min-length-select"
      >
        <IressSelect
          container={document.body}
          options={options}
          id="min-length-select"
          minSearchLength={3}
          placeholder="Type at least 3 characters..."
        />
      </IressField>
    </IressCol>
  </IressRow>
);
```

#### Pre-selected Value

You can set a default selected value using the `defaultValue` prop. This is useful for forms where you want to pre-fill a selection.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  defaultValue="2"
/>;
```

#### Placeholder

You can provide a placeholder to guide users on what to select. The placeholder will be displayed when no option is selected.

```tsx
<IressSelect
  placeholder="Select an option"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
/>;
```

#### Sizing

These are the available sizes for the Select component. Use the `width` prop to adjust the size of the select input.

```tsx
import { IressSelect, IressStack } from '@iress-oss/ids-components';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export function SelectSizing() {
  return (
    <IressStack gap="md">
      <IressSelect
        options={options}
        placeholder="2"
        width="2"
        aria-label="Select option (width: 2)"
      />
      <IressSelect
        options={options}
        placeholder="4"
        width="4"
        aria-label="Select option (width: 4)"
      />
      <IressSelect
        options={options}
        placeholder="6"
        width="6"
        aria-label="Select option (width: 6)"
      />
      <IressSelect
        options={options}
        placeholder="8"
        width="8"
        aria-label="Select option (width: 8)"
      />
      <IressSelect
        options={options}
        placeholder="10"
        width="10"
        aria-label="Select option (width: 10)"
      />
      <IressSelect
        options={options}
        placeholder="12"
        width="12"
        aria-label="Select option (width: 12)"
      />
      <IressSelect
        options={options}
        placeholder="16"
        width="16"
        aria-label="Select option (width: 16)"
      />
      <IressSelect
        options={options}
        placeholder="25%"
        width="25%"
        aria-label="Select option (width: 25%)"
      />
      <IressSelect
        options={options}
        placeholder="50%"
        width="50%"
        aria-label="Select option (width: 50%)"
      />
      <IressSelect
        options={options}
        placeholder="75%"
        width="75%"
        aria-label="Select option (width: 75%)"
      />
      <IressSelect
        options={options}
        placeholder="100%"
        width="100%"
        aria-label="Select option (width: 100%)"
      />
    </IressStack>
  );
}
```

#### Custom Label

The `IressSelect` component is fully customisable, allowing you to provide a custom label for the select input whilst keeping all the other functionality. Use the `renderLabel` prop to specify your own label text.

```tsx
import {
  IressSelect,
  type IressSelectProps,
  IressSelectLabel,
} from '@iress-oss/ids-components';

const CustomLabel: IressSelectProps<true>['renderLabel'] = ({ value }) => (
  <IressSelectLabel role="combobox" selected={value} />
);

export const SelectCustomLabel = () => (
  <IressSelect
    multiSelect
    options={[
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ]}
    placeholder="Select an item"
    renderLabel={CustomLabel}
    container={document.body}
  />
);
```

#### Custom Options

If you want to render a custom selection experience, you can use the `renderOptions` prop to provide your own option rendering logic. This allows for more complex option layouts, such as multi-level options or additional stateful metadata display using rows and columns.

```tsx
import {
  type FormattedLabelValueMeta,
  IressMenuDivider,
  IressSelect,
  type IressSelectProps,
  IressSelectMenu,
  IressSelectSearch,
  IressSelectSearchInput,
  type LabelValueMeta,
} from '@iress-oss/ids-components';

const CustomOptions: IressSelectProps<true>['renderOptions'] = ({
  loading,
  query,
  results,
  setQuery,
  handleMenuChange, // Use handleMenuChange instead of setValue to trigger onChange
  value,
}) => {
  const valueArray = Array.isArray(value) ? value : [value];
  const selected = value ? (valueArray as LabelValueMeta[]) : [];
  const simpleSelected = selected.map(
    (selectedItem: FormattedLabelValueMeta) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We only need the unformatted object keys when displaying the selected value
      const { formattedLabel, ...unformatted } = selectedItem;
      return unformatted;
    },
  );
  const hasResults = !!results.length || (query && !loading);
  const hasSelected = !!selected.length;
  const hasResultsAndSelected = hasResults && hasSelected;

  return (
    <IressSelectSearch
      activator={
        <IressSelectSearchInput
          onChange={(e) => setQuery(e.currentTarget.value)}
          value={query}
          loading={loading}
          placeholder="Search and select"
        />
      }
      style={{
        maxHeight: '210px',
      }}
    >
      {hasSelected && (
        <IressSelectMenu
          heading={`Selected (${selected.length})`}
          items={simpleSelected}
          multiSelect
          // Use handleMenuChange to trigger parent onChange callback
          onChange={handleMenuChange}
          selected={value}
        />
      )}
      {hasResultsAndSelected && <IressMenuDivider my="xs" />}
      {hasResults && (
        <IressSelectMenu
          heading={query ? 'Search results' : 'All options'}
          items={results}
          multiSelect
          noResults={query ? 'No results found' : undefined}
          // Use handleMenuChange to trigger parent onChange callback
          onChange={handleMenuChange}
          selected={value}
          hideSelectedItems
        />
      )}
    </IressSelectSearch>
  );
};

export const SelectCustomOptions = () => (
  <IressSelect
    container={document.body}
    multiSelect
    options={[
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Option 4', value: 'option-4' },
      { label: 'Option 5', value: 'option-5' },
    ]}
    renderOptions={CustomOptions}
    virtualFocus={false}
  />
);
```

#### Create New Option

Allow users to create new options on the fly using the custom sub-components with `renderOptions`.

```tsx
import {
  type FormattedLabelValueMeta,
  type InputRef,
  IressMenuDivider,
  IressSelect,
  type IressSelectProps,
  IressSelectBody,
  IressSelectCreate,
  IressSelectHeading,
  IressSelectMenu,
  IressSelectSearch,
  IressSelectSearchInput,
} from '@iress-oss/ids-components';
import { toArray } from '@helpers/formatting/toArray';
import { useId, useRef } from 'react';

const FREQUENTLY_SELECTED = [
  { label: 'Frequently selected 1', value: 'freq-1' },
  { label: 'Frequently selected 2', value: 'freq-2' },
];

const OPTIONS = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
  { label: 'Option 5', value: 'option-5' },
];

const WithNewOption: IressSelectProps<true>['renderOptions'] = ({
  loading,
  debouncedQuery,
  query,
  results,
  setQuery,
  setValue,
  value,
}) => {
  const selectedArray = toArray(value);
  const simpleSelected = selectedArray.map(
    (selectedItem: FormattedLabelValueMeta) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We only need the unformatted object keys when displaying the selected value
      const { formattedLabel, ...unformatted } = selectedItem;
      return unformatted;
    },
  );
  const hasResults =
    (!!results.length && results !== OPTIONS) || (debouncedQuery && !loading);
  const hasSelected = !!selectedArray.length;
  const hasResultsAndSelected = hasResults && hasSelected;
  const showFrequentlySelected =
    !hasResults &&
    !FREQUENTLY_SELECTED.every((frequent) =>
      selectedArray.some((selected) => selected.value === frequent.value),
    );
  const canCreate =
    debouncedQuery &&
    !results.some((result) => result.label === debouncedQuery) &&
    !selectedArray.some((selected) => selected.label === debouncedQuery);
  const hasFrequentlyAndOther =
    showFrequentlySelected && (hasResults || hasSelected);
  const headingId = useId();
  const inputRef = useRef<InputRef | null>(null);

  return (
    <IressSelectSearch
      activator={
        <IressSelectSearchInput
          onChange={(e) => setQuery(e.currentTarget.value)}
          value={query}
          loading={loading}
          placeholder="Search for items"
          ref={inputRef}
        />
      }
    >
      <IressSelectBody
        header={
          canCreate && (
            <IressSelectCreate
              heading="Add custom option"
              label={debouncedQuery}
              loading={loading}
              onCreate={() => {
                setValue([...selectedArray, { label: query, value: query }]);
                setQuery('');
                close();
              }}
            />
          )
        }
      >
        {hasSelected && (
          <IressSelectMenu
            aria-labelledby={headingId}
            heading={
              <IressSelectHeading
                clearAll
                onClearAll={() => {
                  setValue([]);
                  inputRef.current?.focus();
                }}
              >
                <h2 id={headingId}>Selected ({selectedArray.length})</h2>
              </IressSelectHeading>
            }
            items={simpleSelected}
            multiSelect
            onChange={setValue}
            selected={value}
          />
        )}
        {hasResultsAndSelected && <IressMenuDivider my="xs" />}
        {hasResults && (
          <IressSelectMenu
            heading="Search results"
            items={results}
            multiSelect
            noResults={debouncedQuery ? 'No results found' : undefined}
            onChange={setValue}
            selected={value}
            hideSelectedItems
          />
        )}
        {hasFrequentlyAndOther && <IressMenuDivider my="xs" />}
        {showFrequentlySelected && (
          <IressSelectMenu
            heading="Frequently selected"
            items={FREQUENTLY_SELECTED}
            multiSelect
            onChange={setValue}
            selected={value}
            hideSelectedItems
          />
        )}
      </IressSelectBody>
    </IressSelectSearch>
  );
};

export const SelectNewOption = () => (
  <IressSelect
    container={document.body}
    multiSelect
    options={OPTIONS}
    placeholder="Select an item"
    renderOptions={WithNewOption}
    virtualFocus={false}
  />
);
```

#### Header & Footer

You can add a header and footer to the options menu using the `header` and `footer` props. This is useful for adding additional context or actions related to the options list.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  header={
    <>
      <IressMenuText>
        <IressText element="h3" style={{ margin: 0 }}>
          Header
        </IressText>
      </IressMenuText>
      <IressDivider style={{ marginTop: 0 }} />
    </>
  }
  footer={
    <>
      <IressDivider style={{ marginBottom: 0 }} />
      <IressMenuText>
        <IressInline gap="sm">
          <IressButton>Button 1</IressButton>
          <IressButton>Button 2</IressButton>
        </IressInline>
      </IressMenuText>
    </>
  }
/>;
```

#### Grouped Options

You can group related options together using the `children` key of each item in the `options` array. This allows for better organisation and easier scanning of options.

```tsx
<IressSelect
  placeholder="Select a food"
  options={[
    {
      label: 'Fruits',
      children: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Strawberry', value: 'strawberry' },
      ],
    },
    {
      label: 'Vegetables',
      children: [
        { label: 'Carrot', value: 'carrot' },
        { label: 'Broccoli', value: 'broccoli' },
        { label: 'Spinach', value: 'spinach' },
      ],
    },
    {
      label: 'Grains',
      children: [
        { label: 'Rice', value: 'rice' },
        { label: 'Wheat', value: 'wheat' },
        { label: 'Oats', value: 'oats' },
      ],
    },
  ]}
/>;
```

#### Native

Use the `native` prop to render a native `<select>` element on mobile devices.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  native="md"
  defaultValue="2"
/>;
```

### Testing

Query the select activator by its combobox role:

```tsx
const select = screen.getByRole('combobox', { name: 'Label text' });
```

When inside a `Field`, query by label:

```tsx
const select = screen.getByLabelText('Label text');
```

For the options menu:

```tsx
const menu = screen.getByRole('listbox');
const option = screen.getByRole('option', { name: 'Option 1' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the select | `getByRole('combobox')` for the activator, or `getByLabelText('...')` when inside a Field | `select` |
| hidden input | The hidden form input | — | `select__hidden-input` |
| select | The native select element (when native mode is enabled) | — | `select__select` |
| menu group | A grouped options heading | — | `select__menu-group` |
| menu | The options dropdown (visible when open) | `getByRole('listbox')` | `select__menu` |
| menu item | An individual menu option | `getByRole('option', { name: '...' })` | `select__menu-item` |
| tag | A selected value tag (multi-select) | — | `select__tag` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Closed | Displays selected value or placeholder |
| Open | Shows options list positioned below the activator |
| Searching | Filters options based on typed input |
| Multi-select | Selected values shown as tags; removable individually |
| Native mode | Renders a native `<select>` element |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="combobox"` for the activator, `role="listbox"` for the menu
- **1.3.1 Info and Relationships** — Options grouped with proper heading structure
- **2.1.1 Keyboard** — Fully keyboard navigable

**ARIA roles:**

| Element | Role | Description |
|---------|------|-------------|
| Activator | `combobox` | The select trigger input |
| Menu | `listbox` | The dropdown options list |
| Option | `option` | Individual selectable items |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens the menu or selects the focused option |
| `ArrowDown` | Moves focus to the next option |
| `ArrowUp` | Moves focus to the previous option |
| `Escape` | Closes the menu |
| `Home` | Moves focus to the first option |
| `End` | Moves focus to the last option |
| Type-ahead | Jumps to the first matching option |

### Edge cases

- **No matching options**: Displays empty state message when search yields no results
- **Async loading**: Shows loading indicator while options are being fetched
- **Long option text**: Text truncates with ellipsis in the activator
- **Popover clipping**: In fixed-footer modals, the dropdown may be clipped — use non-fixed footer modals

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs)