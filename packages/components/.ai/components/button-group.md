# 
> **Component:** `import { IressButtonGroup } from '@iress-oss/ids-components'`
> **Storybook:** [ in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-button-group--docs)```tsx
```

## Quick Start

```tsx
<IressButtonGroup label="Options" />
```

## Usage

Button Group requires some `label` text to describe what the group of buttons represent. The `label` text can be visually hidden (but still read by screenreaders) using the `hiddenLabel` prop.

The `children` prop should contain multiple `IressButton` components.

You can use the `onChange` prop to watch when a button is clicked.

**Note:**

- The `options` props, originally used to map a set of strings to `IressButton`, has been deprecated. Instead, you can use array.map to map the options to `IressButton` in your own application.
- The `mode` prop on `IressButton` is not supported when used inside an `IressButtonGroup`.

```tsx
<IressButtonGroup label="Button group" />
```

[View "ButtonChildren" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button-group--button-children)

## Examples

### Rich buttons

By passing the buttons as children you have more control over the display of the button allowing you to use icons or tooltips.

**Note:** In this case, please set the `value` prop on the `IressButton` component to ensure the correct value is used when the button is clicked.

```tsx
<IressButtonGroup label="Text alignment" />
```

[View "RichButtons" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button-group--rich-buttons)

### Multi-select

By default, only one button in the group can be selected at a time. By setting the `multiple` prop, multiple buttons can be selected.

```tsx
<IressButtonGroup multiple label="Multiple options can be selected" />
```

[View "MultiSelect" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button-group--multi-select)

### Pre-selecting buttons

Buttons within the group can be pre-selected using the `defaultSelected` prop (for uncontrolled components), or the `selected` prop if you are planning to control the state yourself.

If the button group is in its default single select mode, these props expects a string that matches the text of one of the buttons, or the `value` prop of the button if it has been set.

In multi-select mode, these props expects an array of matching strings.

```tsx
<IressButtonGroup defaultSelected="Option 2" label="Selected option for single select" />
```

[View "SelectedSingle" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button-group--selected-single)
```tsx
<IressButtonGroup label="Selected option for multi-select" />
```

[View "SelectedMultiple" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button-group--selected-multiple)

### `onChange` event

The Button Group emits an event when any of the selected buttons change. The event detail (`ButtonGroupChange`) consist of a string or an array of strings (depending on if it's in single or multi select mode) that represents the selected button(s).

```tsx
<IressButtonGroup
  label="Options"
  onChange={(selected) => {
    console.log(`Selected: ${selected ? String(selected) : 'none'}`);
  }}
>
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
</IressButtonGroup>
```

[View "OnChange" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button-group--on-change)

### Hidden label

If you would like to visually hide the label, you can use the `hiddenLabel` prop.

```tsx
<IressButtonGroup hiddenLabel />
```

[View "HiddenLabel" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button-group--hidden-label)

### Headings as labels

For semantic reasons, you may need the label to be rendered as a heading. In this case, you can pass the element directly to the `label` prop. The component will automatically add the `id` required to connect the button group to its label.

[View "HeadingLabel" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button-group--heading-label)

## Testing

Query the button group by its `group` role:

```tsx
const group = screen.getByRole('group', { name: 'Alignment' });
```

### Test IDs

When you pass a `data-testid` to `IressButtonGroup`, the following nested test
IDs are generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `label` | `my-button-group__label` | The group label element |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-button-group--docs)
