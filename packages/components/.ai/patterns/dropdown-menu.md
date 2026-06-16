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

A component designed to filter a section based on a list of options and quickly navigate to relevant content.

<StoryEmbed id="patterns-dropdownmenu--default"/>

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

<IressDropdownMenu label="Select an option" />
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-dropdown-menu--docs#api-props)

### Usage

The `IressDropdownMenu` component is a fully controlled component. It is designed to be used in situations where the selection of an option(s) should trigger an immediate update to the rendered data.

Here is an example using multiple `IressDropdownMenu`s to filter an `IressTable`.

<StoryEmbed id="patterns-dropdownmenu--search-table"/>

#### Controlled

The `value` prop can be used to completely control the state of the component. Use the `onChange` and `onReset` props to sync your state with the component.

**Note:** The `value` prop is not checked against the options provided, allowing it to work with asynchronous options.

<StoryEmbed id="patterns-dropdownmenu--controlled"/>

#### Multiple selection

Using the `multiSelect` prop, the `IressDropdownMenu` will allow the user to make multiple selections.

<StoryEmbed id="patterns-dropdownmenu--multi-select"/>

#### Providing options

##### `options`

The `options` prop is required for the select dropdown. You can provide an array of `LabelValueMeta[]` objects to the `options` prop. Filtering is done based on the `label` property. Unique selected value(s) will be determined by the `value` property, falling back to `label` if `value` is not provided.

<StoryEmbed id="patterns-dropdownmenu--default"/>

##### Asynchronous `options`

If you would like to render suggestions from the server, you can pass a function to the `options` prop. It accepts a string parameter and returns a promise that resolves to an array of `LabelValueMeta[]` objects. No filtering is done for asynchronous options, you must filter the options yourself using the query.

**Note:** Asynchronous `options` will automatically set the `searchable` prop to true.

<StoryEmbed id="patterns-dropdownmenu--async-options"/>

##### `initialOptions`

If you want to provide initial options to the user, you can use the `initialOptions` prop. This is useful when you want to provide a list of options to the user before they start typing (eg. recommended search terms).

**Note:** `initialOptions` only works if `searchable` is true.

<StoryEmbed id="patterns-dropdownmenu--initial-options"/>

#### Complex options

The options prop also accepts further properties for each option. This is useful for displaying other data that compliments the main label.

- append: accepts a ReactNode to append to the end of the option, usually a badge.
- meta: accepts a ReactNode to display additional information about the option.
- prepend: accepts a ReactNode to add to the start of the option, usually an icon.

All `IressDropdownMenu`s accept meta as an attribute in the option array.

<StoryEmbed id="patterns-dropdownmenu--complex-options"/>

#### Input props

You can customise some settings of the query input by setting the `inputProps`.

It does have some defaults to help with user experience. `prepend` automatically has a search icon, and `clearable` is set to true by default.

<StoryEmbed id="patterns-dropdownmenu--input-props"/>

#### Searchable

When an `IressDropdownMenu` has 10 or more options, it is recommended that you enable the search functionality. This can be done by adding the `searchable` prop.

**Note:** When using asynchronous options, the `searchable` prop is automatically set to true.

<StoryEmbed id="patterns-dropdownmenu--searchable"/>

#### Reset filters

Adding the `visibleResetButton` prop adds a way for the user a way to easily reset their choices. This works for single and multiple selection filters.

Below are examples of both single selects and multi selects with `visibleResetButton` enabled.

<StoryEmbed id="patterns-dropdownmenu--reset-filters"/>

#### No results

If you would like to show a message when there are no results, you can use the `searchNoResultsText` prop. It accepts any React node.

<StoryEmbed id="patterns-dropdownmenu--no-results-text"/>

#### Popover props

Under the hood, filter uses `IressPopover` to display the filter options. You can customise this with `popoverProps`. It accepts `align`, `className`, `container` and `displayMode`.

There are two additional props that filter accepts to customise the popover: `header` and `footer`. You can place additional content above or below the results using these props.

<StoryEmbed id="patterns-dropdownmenu--popover-props"/>

#### Selected options text

In `multiSelect` mode, the selections options are displayed using the `selectedOptionsText` prop. You can customise this text to suit your needs. It will replace `{{numOptions}}` with the number of selected options.

<StoryEmbed id="patterns-dropdownmenu--selected-options-text"/>

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