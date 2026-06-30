# DropdownMenu

> Presents a list of actions or options revealed by a trigger button.

## Import

```tsx
import { IressDropdownMenu } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-dropdown-menu--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/DropdownMenu)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=dropdown-menu&title=[Filter]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=dropdown-menu,enhancement&title=[Filter]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activatorStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | `{}` | Customisation options for the dropdown menu activator button.  Accepts any styling properties available on `IressCSSProps`, as well as `className`, `style`, and `data-testid`. @example ```tsx <IressDropdownMenu   activatorStyle={{ 'data-testid': 'my-activator', p: 'spacing.2' }} /> ``` |
| defaultSelected | `FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)> , FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)>[]` | — | The current value of the dropdown menu. Use this in uncontrolled mode when you want to set an initial value that can be changed internally by the component. For a controlled dropdown menu, use the `selected` prop instead. |
| footer | `ReactNode` | — | Footer showed in option panel when expanded. |
| header | `ReactNode` | — | Header showed in option panel when expanded. |
| inputProps | `Pick<[IressInputProps](../../dist/components/Input/Input.d.ts), "placeholder" | "append" | "prepend" | "clearable">` | `{ clearable: true, prepend: <IressIcon name="search" />, }` | Customise the searchable `IressInput` props for your needs. |
| **label** | `ReactNode` | — | The label is a description of the dropdown menu's purpose. |
| multiSelect | `boolean` | — | Multi-select mode. When `true`, multiple options can be selected. |
| onChange | `((selected: [ControlledValue](../../dist/hooks/useControlledState.d.ts)<[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>, TMultiple>) => void)` | — | Emitted when the value changes. |
| onReset | `(() => void)` | — | Emitted when the value is reset. |
| searchable | `boolean` | — | When `true` a search field is shown to search for specific filter option(s). |
| searchNoResultsText | `ReactNode` | — | Text to be displayed when no results are found from search. Ignored when `searchable` is `false` |
| selected | `FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)> , FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)>[]` | — | The current value of the dropdown menu. Use this in controlled mode when you want to manage the selected value from a parent component. For an uncontrolled dropdown menu, use the `defaultSelected` prop instead. |
| selectedOptionsText | `string` | `({{numOptions}})` | Text displayed next to label when two or more options are selected. It supports `{{numOptions}}` as a placeholder for the number of options selected. |
| visibleResetButton | `boolean, string ` | — | When `true`, a reset button will be shown above the options. If provided a string, it will be used as the reset button label. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| fluid | `boolean` | — | Popovers can be fluid, meaning they will take up the full width of their container. |
| type | `dialog` , `grid` , `listbox`, `menu` , `tree`  | — | Describes the type of content contained in the popover. |
| align | `[FloatingUIAligns](../../dist/types.d.ts)` | `bottom-start` | Sets the alignment of the popover relative to the activator element. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the popover into. By default, the popover will render where its parent is rendered.  **Note:** If the `container` doesn’t exist when the popover is mounted, ensure you pass an element directly (not a ref) and specify null as the default value before it is set. This lets it wait for the root to be available. For example, if you reference the parent element of a popover. |
| contentStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | — | This allows you to customise the content styling specifically, which is the floating element. It accepts an object with any of the styling properties available on `IressCSSProps`, as well as `className` and `style`. |
| displayMode | `inline` , `overlay` | `overlay` | Sets the display mode of popover. |
| offset | `OffsetOptions` | `5` | The offset of the popover from its default position. This can be a number or an object with `mainAxis` and `crossAxis` properties, which specify the offset in pixels along the main axis (the axis along which the popover is aligned) and the cross axis (the perpendicular axis). |
| matchActivatorWidth | `boolean` | — | Sets the popover to match the width of the activator. Note: This only works when `displayMode="overlay"`. |
| virtualFocus | `boolean` | `false` | Whether the focus is virtual (using `aria-activedescendant`). Use this if you need focus to remain on the reference element (such as an input), but allow arrow keys to navigate items. Note: This is only applicable when type is set to: `listbox` or `menu`, and only works out of the box with `IressMenu` and its subcomponents. |
| focusStartIndex | `number` | — | Which index to start the focus on when the popover is opened. Only works with `type` listbox and menu. Note: The index must exist in the list of items, otherwise it will not work. |
| onActivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is activated. |
| onDeactivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is deactivated. |
| onNavigate | `((activeIndex: number , null) => void)` | — | Is called when registered popover items are navigated using arrow keys. Only works with `type` listbox and menu. |
| nested | `boolean` | — | Whether this popover uses nested navigation (ArrowRight to open, ArrowLeft to close). When not set, this is auto-detected based on whether the popover is inside another popover. |
| disabled | `boolean` | `false` | Disables the hook from running any effects or search operations. When disabled, the hook returns empty results and default state. |
| debounceThreshold | `number` | `500` | Time in milliseconds to wait for before performing result search. Only applies to searchable options (function). |
| initialOptions | `[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[]` | — | Initial options data set, shown when the input is empty. |
| minSearchLength | `number` | `1` | Minimum number of characters required before triggering async search. Only applies to searchable options (function). Below this threshold, no search will be triggered and no loading state will be shown. |
| **options** | `[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[] , ((query: string) => Promise<[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[]>)` | — | Options data set, shown when the input is not empty. |
| limitMobile | `number` | `6` | Maximum number of results displayed on mobile screen sizes (< 768). |
| limitDesktop | `number` | `12` | Maximum number of results displayed on larger screen sizes (>= 768). |

📄 [Full type definition](../../dist/patterns/DropdownMenu/DropdownMenu.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

A component designed to filter a section based on a list of options and quickly navigate to relevant content.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
/>;
```

## Design

### When to use

- Filtering a table based on a list of options
- Navigating to a different section based on a list of options
- Updating a chart based on a list of options

### When not to use

This component is **not** designed to be used within forms and should be used to provide instant updates to rendered data. Instead, in forms, you should use components like `IressSelect`, `IressRadioGroup` or `IressCheckboxGroup`.

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Enable search for lists with 10+ options | Use for fewer than 5 options — use `IressRadioGroup` instead |
| Show a reset button for clearable filters | Use within forms — use `IressSelect` instead |
| Keep option labels short and scannable | Rely solely on colour to differentiate options |

### Content guidelines

- Keep option labels short and descriptive (1–3 words where possible)
- Use meaningful placeholder text that describes the expected selection (e.g. "Select a region")
- Use sentence case for labels and options

### Related patterns

- [Select](../components/select.md) — for form-based single selection
- [ContextualMenu](../patterns/contextual-menu.md) — for action menus on specific items
- [Popover](../components/popover.md) — for custom overlay content

## Develop

### Quick Start

```tsx
import { IressDropdownMenu } from '@iress-oss/ids-components';

<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-dropdown-menu--docs#api-props)

### Usage

The `IressDropdownMenu` component is a fully controlled component. It is designed to be used in situations where the selection of an option(s) should trigger an immediate update to the rendered data.

Here is an example using multiple `IressDropdownMenu`s to filter an `IressTable`.

```tsx
import {
  IressInline,
  IressStack,
  IressTable,
  type LabelValueMeta,
  IressButton,
  IressDivider,
  IressDropdownMenu,
} from '@iress-oss/ids-components';
import { useMemo, useState } from 'react';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

const USERS = [
  {
    user: 'farmboy',
    name: 'Luke Skywalker',
    location: 'Temple Island',
    gender: 'male',
    status: 'Inactive',
  },
  {
    user: 'nevertellmetheodds',
    name: 'Han Solo',
    location: 'unknown',
    gender: 'male',
    status: 'Inactive',
  },
  {
    user: 'goldenrod',
    name: 'C-3PO',
    location: 'Space',
    gender: 'n/a',
    status: 'Active',
  },
  {
    user: 'whistles',
    name: 'R2-D2',
    location: 'Space',
    gender: 'n/a',
    status: 'Active',
  },
  {
    user: 'princess',
    name: 'Leia Organa',
    location: 'unknown',
    gender: 'female',
    status: 'Inactive',
  },
];

const getUniqueValues = (key: string): LabelValueMeta[] => {
  const unique: string[] = [];

  USERS.forEach((user) => {
    const propVal = user[key as never];
    if (!unique.includes(propVal)) unique.push(propVal);
  });

  return unique.map((item: string) => ({
    label: item,
    value: item,
  }));
};

async function searchStarWarsCharacters(query: string) {
  const data = await fetch(
    `https://swapi.py4e.com/api/people/?search=${query}`,
  ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

  return data.results.map((character: StarWarsCharacter) => ({
    label: character.name,
    value: character.name,
    meta: character.gender,
  }));
}

export const TableWithFilters = () => {
  const [name, setName] = useState<LabelValueMeta | undefined>();
  const [status, setStatus] = useState<LabelValueMeta | undefined>();
  const [location, setLocation] = useState<LabelValueMeta | undefined>();
  const [gender, setGender] = useState<LabelValueMeta | undefined>();

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'location', label: 'Location' },
    { key: 'gender', label: 'Gender' },
  ];

  const rows = useMemo(() => {
    const match = (filterItem?: LabelValueMeta, detail?: string): boolean => {
      if (!filterItem?.value) return true;

      return (filterItem?.value ?? filterItem?.label) == detail;
    };

    return USERS.filter(
      (user) =>
        match(name, user.name) &&
        match(status, user.status) &&
        match(location, user.location) &&
        match(gender, user.gender),
    );
  }, [name, status, location, gender]);

  const handleReset = () => {
    setName(undefined);
    setStatus(undefined);
    setLocation(undefined);
    setGender(undefined);
  };

  return (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressDropdownMenu
          label="Name"
          options={searchStarWarsCharacters}
          selected={name}
          onChange={setName}
          onReset={() => setName(undefined)}
          visibleResetButton
        />
        <IressDropdownMenu
          label="Status"
          options={getUniqueValues('status')}
          selected={status}
          onChange={setStatus}
          onReset={() => setStatus(undefined)}
        />
        <IressDropdownMenu
          label="Location"
          options={getUniqueValues('location')}
          selected={location}
          onChange={setLocation}
          onReset={() => setLocation(undefined)}
        />
        <IressDropdownMenu
          label="Gender"
          options={getUniqueValues('gender')}
          selected={gender}
          onChange={setGender}
          onReset={() => setGender(undefined)}
        />
        <IressButton onClick={handleReset} mode="quaternary">
          Reset filters
        </IressButton>
      </IressInline>
      <IressDivider />
      <IressTable
        caption="System users"
        columns={columns}
        rows={rows}
        empty={'No results found'}
      />
    </IressStack>
  );
};
```

#### Controlled

The `value` prop can be used to completely control the state of the component. Use the `onChange` and `onReset` props to sync your state with the component.

**Note:** The `value` prop is not checked against the options provided, allowing it to work with asynchronous options.

```tsx
import {
  IressDropdownMenu,
  type IressDropdownMenuProps,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const ALL_OPTIONS = [
  {
    label: 'This financial year',
    value: 'this_financial_year',
  },
  {
    label: 'Last financial year',
    value: 'last_financial_year',
  },
];

export const ControlledDropdownMenu = () => {
  const [selected, setSelected] =
    useState<IressDropdownMenuProps<false>['selected']>();

  return (
    <IressDropdownMenu
      container={document.body}
      label="Portfolio performance"
      options={ALL_OPTIONS}
      onChange={(newValue) => setSelected(newValue)}
      onReset={() => setSelected(ALL_OPTIONS[0])}
      selected={selected}
    />
  );
};
```

#### Multiple selection

Using the `multiSelect` prop, the `IressDropdownMenu` will allow the user to make multiple selections.

```tsx
import {
  IressDropdownMenu,
  type IressDropdownMenuProps,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const ALL_OPTIONS = [
  {
    label: 'Awesome',
  },
  {
    label: 'Great',
  },
];

export const ControlledDropdownMenuMultiselect = () => {
  const [selected, setSelected] = useState<
    IressDropdownMenuProps<true>['selected']
  >([ALL_OPTIONS[0]]);

  return (
    <IressDropdownMenu
      label="Descriptors"
      options={ALL_OPTIONS}
      multiSelect
      onChange={(newValue) => setSelected(newValue)}
      onReset={() => setSelected([ALL_OPTIONS[0]])}
      selected={selected}
      container={document.body}
    />
  );
};
```

#### Providing options

##### `options`

The `options` prop is required for the select dropdown. You can provide an array of `LabelValueMeta[]` objects to the `options` prop. Filtering is done based on the `label` property. Unique selected value(s) will be determined by the `value` property, falling back to `label` if `value` is not provided.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
/>;
```

##### Asynchronous `options`

If you would like to render suggestions from the server, you can pass a function to the `options` prop. It accepts a string parameter and returns a promise that resolves to an array of `LabelValueMeta[]` objects. No filtering is done for asynchronous options, you must filter the options yourself using the query.

**Note:** Asynchronous `options` will automatically set the `searchable` prop to true.

```tsx
import { IressDropdownMenu } from '@iress-oss/ids-components';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

export const ControlledDropdownMenuAsync = () => (
  <IressDropdownMenu
    label="Character"
    options={async (query: string) => {
      if (!query) return [];

      const data = await fetch(
        `https://swapi.py4e.com/api/people/?search=${query}`,
      ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

      return data.results.map((character: StarWarsCharacter) => ({
        label: character.name,
        value: character.name,
        meta: character.gender,
      }));
    }}
    container={document.body}
  />
);
```

##### `initialOptions`

If you want to provide initial options to the user, you can use the `initialOptions` prop. This is useful when you want to provide a list of options to the user before they start typing (eg. recommended search terms).

**Note:** `initialOptions` only works if `searchable` is true.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  initialOptions={[
    { label: 'Favourite option 1', value: 'fav-1' },
    { label: 'Favourite option 2', value: 'fav-2' },
    { label: 'Favourite option 3', value: 'fav-3' },
  ]}
  searchable
/>;
```

#### Complex options

The options prop also accepts further properties for each option. This is useful for displaying other data that compliments the main label.

- append: accepts a ReactNode to append to the end of the option, usually a badge.
- meta: accepts a ReactNode to display additional information about the option.
- prepend: accepts a ReactNode to add to the start of the option, usually an icon.

All `IressDropdownMenu`s accept meta as an attribute in the option array.

```tsx
<IressDropdownMenu
  label="Contact"
  options={[
    {
      value: 'opt1',
      label: 'John Smith',
      meta: [
        <IressText key="opt1-type" color="colour.neutral.70" element="small">
          Individual
        </IressText>,
        <IressText key="opt1-email" color="colour.neutral.70" element="small">
          test@iress.com
        </IressText>,
      ],
    },
    {
      value: 'opt2',
      label: 'Tom Wilson',
      meta: [
        <IressText key="opt2-type" color="colour.neutral.70" element="small">
          Individual
        </IressText>,
      ],
    },
    {
      value: 'opt3',
      label: 'Alice Kay',
      meta: [
        <IressText key="opt3-type" color="colour.neutral.70" element="small">
          Individual
        </IressText>,
      ],
      append: <IressPill mode="70">Active</IressPill>,
    },
    {
      value: 'opt4',
      label: 'John Smith',
      meta: [
        <IressText key="opt4-type" color="colour.neutral.70" element="small">
          Business
        </IressText>,
        <IressText key="opt4-phone" color="colour.neutral.70" element="small">
          0432325675
        </IressText>,
      ],
    },
    {
      value: 'opt5',
      label: 'Eelin Team',
      meta: [
        <IressText key="opt5-contact" color="colour.neutral.70" element="small">
          test2@iress.com, 0432325675
        </IressText>,
      ],
    },
    {
      value: 'opt6',
      label: 'Eelin Team',
      meta: [
        <IressText key="opt6-contact" color="colour.neutral.70" element="small">
          test3@iress.com, 0439873244
        </IressText>,
      ],
    },
  ]}
  container={document.body}
/>;
```

#### Input props

You can customise some settings of the query input by setting the `inputProps`.

It does have some defaults to help with user experience. `prepend` automatically has a search icon, and `clearable` is set to true by default.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  inputProps={{
    placeholder: 'Search some stuff...',
  }}
  searchable
/>;
```

#### Searchable

When an `IressDropdownMenu` has 10 or more options, it is recommended that you enable the search functionality. This can be done by adding the `searchable` prop.

**Note:** When using asynchronous options, the `searchable` prop is automatically set to true.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  searchable
/>;
```

#### Reset filters

Adding the `visibleResetButton` prop adds a way for the user a way to easily reset their choices. This works for single and multiple selection filters.

Below are examples of both single selects and multi selects with `visibleResetButton` enabled.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  visibleResetButton
/>;
```

#### No results

If you would like to show a message when there are no results, you can use the `searchNoResultsText` prop. It accepts any React node.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  inputProps={{
    placeholder: 'Type "no" to see the no results text',
  }}
  searchable
  searchNoResultsText={
    <IressAlert variant="full-width" mb="none">
      No results found
    </IressAlert>
  }
/>;
```

#### Popover props

Under the hood, filter uses `IressPopover` to display the filter options. You can customise this with `popoverProps`. It accepts `align`, `className`, `container` and `displayMode`.

There are two additional props that filter accepts to customise the popover: `header` and `footer`. You can place additional content above or below the results using these props.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  footer={
    <>
      <IressMenuDivider />
      <IressSelectCreate label="Add an option" />
    </>
  }
/>;
```

#### Selected options text

In `multiSelect` mode, the selections options are displayed using the `selectedOptionsText` prop. You can customise this text to suit your needs. It will replace `{{numOptions}}` with the number of selected options.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  multiSelect
  selectedOptionsText=" - {{numOptions}}"
/>;
```

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Closed | Activator button displays the current selection or label |
| Open | Popover appears with options list; focus moves to first item or search input |
| Selection (single) | Option is selected, popover closes, activator updates |
| Selection (multi) | Option is toggled, popover remains open, activator updates count |
| Search | Options are filtered as user types; "no results" shown if empty |
| Reset | All selections are cleared, activator returns to default label |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens the menu or selects the focused option |
| `Escape` | Closes the menu and returns focus to the activator |
| `ArrowDown` | Moves focus to the next option |
| `ArrowUp` | Moves focus to the previous option |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-dropdown-menu--docs)