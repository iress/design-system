# Select

Selects provide select and multi-select functionality with the benefit of live filtering.

> **Component:** `import { IressSelect } from '@iress-oss/ids-components'`
> **Storybook:** [Select in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-select--docs)

## Quick Start

```tsx
import { IressSelect } from '@iress-oss/ids-components';

<IressSelect />
```

## Usage

### When To Use

- If you have less than 5 options to choose from, consider using `IressRadioGroup` instead.
- You probably need `IressAutoComplete` if you're looking for an input box that can be typed.
- Otherwise, `IressSelect` is the way to go.

## Accessibility

This component follows the [WAI combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

There are two key differences:

- For better usability, virtual focus is used to highlight the suggestions inside the popover. This means focus remains on the input, but the suggestions are highlighted as if they are in focus, allowing the user to type and navigate the suggestions with the arrow keys.
  To denote the highlighted suggestion to screen readers, the aria-activedescendant attribute is used.
- Instead of displaying the input to filter options directly, the input is only shown once the user has activated the dropdown. This allows for an intuitive user experience by separating the display of the current value, and the filtering of options.

## Examples

### Single select

The `options` prop is required for `IressSelect`. You can provide an array of `LabelValueMeta[]` objects to the `options` prop.

[View "SingleSelect" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--single-select)

### Pre-selected value

You can pre-select an option by passing a raw string (or any `FormControlValue`) to the `defaultValue` prop — IressSelect will automatically find and display the matching option. This saves you from having to construct the full `LabelValueMeta` object when you already have the option's value (e.g. from an API response).

**Note:** Passing a primitive string/number to `value` with asynchronous `options` is not supported. The component cannot resolve the value to an option without the full options list, so it will log a warning and fall back to uncontrolled behaviour. Use a `LabelValueMeta` object with async options.

```tsx
<IressSelect defaultValue={2} />
```

[View "PreSelectedValue" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--pre-selected-value)

### Multi-select

Adding the `multiSelect` prop will allow the user to select multiple options.

```tsx
<IressSelect multiSelect />
```

[View "MultiSelect" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--multi-select)

#### Multi-select limit

Use `multiSelectLimit` to control how many tags are shown before the rest collapse into a summary. Defaults to `5`.

```tsx
<IressSelect multiSelect multiSelectLimit={2} />
```

[View "MultiSelectLimit" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--multi-select-limit)

### Asynchronous options

If you would like to render suggestions from the server, you can pass a function to the `options` prop. It accepts a string parameter and returns a promise that resolves to an array of `LabelValueMeta[]` objects.

The user experience slightly changes as well. Instead of displaying the options immediately, the user will see a search input that will filter the options as they type.

No filtering is done for asynchronous options, you must filter the options yourself using the query. However, the results are automatically highlighted based on the query when rendered in the UI.

```tsx
<SelectAsync />
```

[View "AsyncOptions" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--async-options)

### Grouped options

You can group options by setting the `children` property of a `LabelValueMeta` object to an array of `LabelValueMeta[]` objects. The parent option will be rendered as a non-selectable heading, and the children will be rendered as selectable options under that heading.

**Note:** You can only have one level of grouping, meaning the `children` of a `LabelValueMeta` object cannot have their own `children`.

```tsx
<IressSelect placeholder="Select a food" />
```

[View "GroupedOptions" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--grouped-options)

### Minimum search length for async options

When using asynchronous options, you can set a minimum number of characters required before triggering the search using the `minSearchLength` prop. This prevents unnecessary API calls and loading states for very short queries.

By default, async searches are triggered after 1 character. Setting a higher value (e.g., 3) means no search request will be made and no loading spinner will appear until the user types at least that many characters.

```tsx
<SelectAsyncMinLength />
```

[View "AsyncOptionsMinSearchLength" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--async-options-min-search-length)

### Initial options

If you are using asynchronous options, you can provide an initial set of options to display before the user has interacted with the select using the `initialOptions` prop.

```tsx
<SelectInitialOptions />
```

[View "InitialOptions" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--initial-options)

### Sizing

Rich selects can be resized to suit a specific number of characters. This sets an expectation of what data is to be presented; for example using the `16` width for a credit card number.

Widths can also be set as a percentage, allowing the select to take up a proportion of the width of its container.

```tsx
<IressStack gap="md">
{FORM_ELEMENT_WIDTHS.map((width) => (
<div key={width}>
<IressSelect placeholder={width}
width={width}
aria-label={`Select option (width: ${width})`}
/>
</div>
))}
</IressStack>
```

[View "Sizing" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--sizing)

### Custom label

You can provide a custom label for the selected options by passing a function to the `renderLabel` prop. It expects a function that returns a ReactNode.

It passes `SelectLabelRenderProps` as an argument, which contains the selected options and some other useful properties for customising a label.

As per the example here, you can use this prop to render `IressSelectLabel` as a simple text label instead of tags when using the `multiSelect` prop.

**Note:** As the label is expected to activate the dropdown, it is best to provide a button or other interactive element as the label. If the interactive element is nested, it should have the `role="combobox"` to indicate the intention that it will be activating the dropdown (as is the case of `IressSelectTags` which has multiple Buttons, but adds the combobox role to the chevron).

```tsx
<SelectCustomLabel />
```

[View "CustomLabel" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--custom-label)

### Custom options

In some cases, you may need to customise the options that are displayed. You can pass a function to the `renderOptions` prop. It expects a function that returns a ReactNode.

It passes `SelectOptionRenderProps` as an argument, which contains the options and some other useful properties for customising the options.

```tsx
<SelectCustomOptions />
```

[View "CustomOptions" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--custom-options)

### Create new option

You can use the `renderOptions` prop to add additional functionality to the options list. This is useful for allowing users to create new options.

```tsx
<SelectNewOption />
```

[View "CreateNewOption" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--create-new-option)

### Header and Footer

Use the `header` `footer` prop to add a header/footer to the select panel. They can be any component you like, but you need to manage the styling on your own. If you want to keep the padding align with option items, try to wrap inside `<IressMenuText>` (it's essentially a div container, see the example below):

[View "HeaderFooter" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--header-footer)

### Readonly

The `readOnly` prop can be set to `true` to prevent the user from changing the value of the select. This will change the select to a custom read-only style, and will display multiple values seperated with a comma.

If you need more control over the read-only state (for example, rendering a stylised version of the value), you can use the [`IressReadonly` component](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-readonly--docs).

```tsx
<IressSelect readOnly />
```

[View "Readonly" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--readonly)

### Long text content in select options

When working with options that contain long text content, you can control how the dropdown width behaves using the `matchActivatorWidth` prop.

By default (`matchActivatorWidth={true}`), the dropdown width matches the width of the select input, which constrains long text content and may cause truncation. This is ideal for consistent layouts where you want the dropdown to align with the input size.

Setting `matchActivatorWidth={false}` allows the dropdown to expand to accommodate the content width, which is useful when displaying long option labels or when content readability is more important than layout consistency.

This example demonstrates both single-select and multi-select behavior with long text content, allowing you to toggle between the two width behaviors to see the difference.

```tsx
<OptionsLongText />
```

[View "LongTextOptions" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--long-text-options)

### Native select

If you need to support older browsers or require the native select experience, you can set the `native` prop to `true`. This will render a native select element instead of the custom select.

You can also set the `native` prop to a breakpoint (eg. `native="md"`) to only render the native select on smaller screens.

```tsx
<IressSelect native="md" defaultValue={2} />
```

[View "Native" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-select--native)

## Sub-components

`IressSelect` is composed of several sub-components that can be used to customise the appearance and behaviour of the select.

These are completely optional, the default behaviour should be sufficient for most use cases. They have been exposed to allow you to customise the select based on any use case.

Below is a mapping of the available sub-components to the previous [Create new option example](#create-new-option).

<img
  src={subComponentMapping}
  alt=""
  loading="lazy"
  style={{
    maxWidth: '100%',
    height: 'auto',
  }}
/>

### IressSelectBody

A container for the options list. It accepts `header` and `footer` props, allowing you to fix content to the top or bottom of the dropdown.

[View "Body" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-body--body)

### IressSelectCreate

A button designed to create an option if the desired option is not in the list. Use the `onCreate` prop to handle the creation of the new option.

```tsx
<IressCreate heading="Add custom option" label="WX" />
```

[View "Create" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-create--create)

### IressSelectHeading

A heading designed to allow clearing of a list. To show the clear all button, you can set `clearAll` (it can be a string if you want to override the text). Use the `onClearAll` prop to handle the clearing of the list.

```tsx
<IressHeading clearAll />
```

[View "Heading" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-heading--heading)

### IressSelectLabel

A button designed to display a text representation of the selected items. It supports both single and multiple selected items.

It is used to render the activator of the `IressSelect` in single select mode when no `renderLabel` prop is provided.

```tsx
<IressRow gutter="md">
  <IressCol>
    [View "NoneSelected" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-label--none-selected)
  </IressCol>
  <IressCol>
    [View "OneSelected" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-label--one-selected)
  </IressCol>
  <IressCol>
    [View "MultipleSelected" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-label--multiple-selected)
  </IressCol>
</IressRow>
```

### IressSelectMenu

A menu component designed to transform an array of `LabelValueMeta[]` into a listbox menu. It accepts a `heading` and `noResults` prop to provide context to the user in certain scenarios. It also accepts a range of other props to customise appearance and behaviour.

It is used to render the available options of the `IressSelect` in single select mode when no `renderOptions` prop is provided.

```tsx
<IressRow gutter="md">
  <IressCol>
    ```tsx
<IressMenu heading="Search results" noResults="No results found" fluid />
```

[View "Results" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-menu--results)
  </IressCol>
  <IressCol>
    [View "NoResults" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-menu--no-results)
  </IressCol>
</IressRow>
```

### IressSelectSearch

A custom inline search navigator, designed to create a search experience within a dropdown. The activator passed in will be pinned on the top of the dropdown when used in `IressSelect`. It can be combined with other components to create a rich select experience, including:

- Keeping focus on the input while the user navigates the options with the arrow keys.
- Combine with different components such as `IressSelectBody`, `IressSelectCreate` and `IressSelectMenu` to allow multiple items to be pinned to the top of the dropdown.

It is used to filter the available options of the `IressSelect` when an asynchronous `options` function is used and no `renderOptions` prop is provided.

```tsx
<IressSearch autoHighlight={false} />
```

[View "Search" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-search--search)

### IressSelectSearchInput

A custom input designed specifically to be used inside a dropdown. It has a simple appearance, with only a single border used to divide it from the rest of the dropdown. The border will change depending on its location inside the dropdown. It should not be used outside of a dropdown.

It is used to filter the available options of the `IressSelect` when an asynchronous `options` function is used and no `renderOptions` prop is provided.

[View "SearchInput" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-search-input--search-input)

### IressSelectTags

A component designed to display multiple selected items as tags, as well as providing functionality to delete each tag without having to open the dropdown. It supports both single and multiple selected items.

It is used to render the activator of the `IressSelect` if `multiSelect` has been set and no `renderLabel` prop is provided.

```tsx
<IressRow gutter="md">
  <IressCol>
    ```tsx
<IressTags placeholder="Select an item" />
```

[View "NoneSelected" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-tags--none-selected)
  </IressCol>
  <IressCol>
    [View "Selected" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-tags--selected)
  </IressCol>
</IressRow>
```

#### Maximum tag limit

By default, the maximum number of tags that can be displayed is 5. If more than 5 tags are selected, the label will display the number of selected items. This can be changed using the `limit` prop.

```tsx
<IressTags limit={3} />
```

[View "LimitReached" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-tags--limit-reached)

## Testing

### Getting the value

The value of the rich select is not accessed the same way as other inputs because it is not an input but a button. To get the value, you need to use `getByText` instead of `getByValue`.

```jsx
render(<IressSelect options={options} value={{ label: 'Option 1' }} />);

const select = screen.getByRole('combobox');

// Will work
expect(select).toHaveTextContent('Option 1');

// Won't work
expect(select).toHaveValue('Option 1');
```

If the `multiSelect` prop is set to true, the value will be prefixed by the text `Selected: `, as per below.

```jsx
render(
  <IressSelect options={options} value={[{ label: 'Option 1' }]} multiSelect />,
);

const select = screen.getByRole('combobox');

// Will work
expect(select).toHaveTextContent('Selected: Option 1');

// Won't work
expect(select).toHaveValue('Option 1');
```

### Test IDs

When you pass a `data-testid` to `IressSelect`, the following nested test IDs
are generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `hidden-input` | `my-select__hidden-input` | The hidden form input |
| `select` | `my-select__select` | The native select element (when native mode is enabled) |
| `menu-group` | `my-select__menu-group` | A grouped options heading |
| `menu-item` | `my-select__menu-item` | An individual menu option |
| `tag` | `my-select__tag` | A selected value tag (multi-select) |

## Props

- **Type:** `IressSelectProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/Select/Select.d.ts`

```typescript
import type { IressSelectProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-select--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-select--docs)*
