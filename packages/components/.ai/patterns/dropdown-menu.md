# Dropdown Menu

A component designed to filter a section based on a list of options and quickly navigate to relevant content.

> **Pattern:** `import { IressDropdownMenu } from '@iress-oss/ids-components'`
> **Storybook:** [Dropdown Menu in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-dropdown-menu--docs)

## Quick Start

```tsx
import { IressDropdownMenu } from '@iress-oss/ids-components';

<IressDropdownMenu label="Select an option" />
```

## Usage

The `IressDropdownMenu` component is a fully controlled component. It is designed to be used in situations where the selection of an option(s) should trigger an immediate update to the rendered data.

Some examples of usage include:

- Filtering a table based on a list of options
- Navigating to a different section based on a list of options
- Updating a chart based on a list of options

This component is **not** designed to be used within forms and should be used to provide instant updates to rendered data. Instead, in forms, you should use components like `IressSelect`, `IressRadioGroup` or `IressCheckboxGroup`.

Here is an example using multiple `IressDropdownMenu`s to filter an `IressTable`.

```tsx
<TableWithFilters />
```

[View "SearchTable" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--search-table)

### Controlled

The `value` prop can be used to completely control the state of the component. Use the `onChange` and `onReset` props to sync your state with the component.

**Note:** The `value` prop is not checked against the options provided, allowing it to work with asynchronous options.

```tsx
<ControlledDropdownMenu />
```

[View "Controlled" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--controlled)

### Multiple selection

Using the `multiSelect` prop, the `IressDropdownMenu` will allow the user to make multiple selections.

```tsx
<ControlledDropdownMenuMultiselect />
```

[View "MultiSelect" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--multi-select)

### Providing options

#### `options`

The `options` prop is required for the combobox. You can provide an array of `LabelValueMeta[]` objects to the `options` prop. Filtering is done based on the `label` property. Unique selected value(s) will be determined by the `value` property, falling back to `label` if `value` is not provided.

```tsx
<IressDropdownMenu label="Options" />
```

[View "Options" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--options)

#### Asynchronous `options`

If you would like to render suggestions from the server, you can pass a function to the `options` prop. It accepts a string parameter and returns a promise that resolves to an array of `LabelValueMeta[]` objects. No filtering is done for asynchronous options, you must filter the options yourself using the query.

**Note:** Asynchronous `options` will automatically set the `searchable` prop to true.

```tsx
<ControlledDropdownMenuAsync />
```

[View "AsyncOptions" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--async-options)

#### `initialOptions`

If you want to provide initial options to the user, you can use the `initialOptions` prop. This is useful when you want to provide a list of options to the user before they start typing (eg. recommended search terms).

**Note:** `initialOptions` only works if `searchable` is true.

```tsx
<IressDropdownMenu label="Select an option" searchable />
```

[View "InitialOptions" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--initial-options)

### Complex Options

The options prop also accepts further properties for each option. This is useful for displaying other data that compliments the main label.

- append: accepts a ReactNode to append to the end of the option, usually a badge.
- meta: accepts a ReactNode to display additional information about the option.
- prepend: accepts a ReactNode to add to the start of the option, usually an icon.

All `IressDropdownMenu`s accept meta as an attribute in the option array.

```tsx
<IressDropdownMenu label="Contact" />
```

[View "ComplexOptions" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--complex-options)

## Behaviour

- When the activator is tapped, the filter will open
- Up and Down Arrow keys are used to navigate the options
- When focus is on the search input:
  - Pressing the down key will move focus to the first menu item
  - If `visibleResetButton` is set to true, pressing the down key will focus the reset button instead
- When focus is on the reset button:
  - Pressing the down key will move focus to the first menu item
- Pressing the Space or Enter keys when focussed on an option will select it
- Pressing the Escape key will close the filter and place focus back on to the activator button

## Examples

### Input props

You can customise some settings of the query input by setting the `inputProps`.

It does have some defaults to help with user experience. `prepend` automatically has a search icon, and `clearable` is set to true by default.

```tsx
<IressDropdownMenu searchable />
```

[View "InputProps" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--input-props)

### Searchable

When an `IressDropdownMenu` has 10 or more options, it is recommended that you enable the search functionality. This can be done by adding the `searchable` prop.

**Note:** When using asynchronous options, the `searchable` prop is automatically set to true.

```tsx
<IressDropdownMenu searchable />
```

[View "Searchable" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--searchable)

### Reset filters

Adding the `visibleResetButton` prop adds a way for the user a way to easily reset their choices. This works for single and multiple selection filters.

Below are examples of both single selects and multi selects with `visibleResetButton` enabled.

```tsx
<IressDropdownMenu visibleResetButton />
```

[View "ResetFilters" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--reset-filters)

### No results

If you would like to show a message when there are no results, you can use the `searchNoResultsText` prop. It accepts any React node.

```tsx
<IressDropdownMenu searchable />
```

[View "NoResultsText" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--no-results-text)

### Popover props

Under the hood, filter uses `IressPopover` to display the filter options. You can customise this with `popoverProps`. It accepts `align`, `className`, `container` and `displayMode`.

There are two additional props that filter accepts to customise the popover: `header` and `footer`. You can place additional content above or below the results using these props.

[View "PopoverProps" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--popover-props)

### Selected options text

In `multiSelect` mode, the selections options are displayed using the `selectedOptionsText` prop. You can customise this text to suit your needs. It will replace `{{numOptions}}` with the number of selected options.

```tsx
<IressDropdownMenu multiSelect selectedOptionsText=" - " />
```

[View "SelectedOptionsText" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-dropdown-menu--selected-options-text)

---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-dropdown-menu--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-dropdown-menu--docs)*
