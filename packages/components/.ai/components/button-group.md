# ButtonGroup

> Groups related buttons together with consistent spacing and alignment.

## Import

```tsx
import { IressButtonGroup } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button-group--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/ButtonGroup)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=button-group&title=[ButtonGroup]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=button-group,enhancement&title=[ButtonGroup]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content of the button group, usually multiple `IressButton`. |
| defaultSelected | `[ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>` | — | Initially selected value, use for uncontrolled components. |
| hiddenLabel | `boolean` | — | Hides the label if set; label will still be read out by screen readers. |
| **label** | `ReactNode` | — | Sets the label text for the button group. If passed an element, it will render the element with an id, to ensure its connection to the button group. |
| multiple | `boolean` | — | Allows multiple buttons to be selected. |
| onChange | `((newValue?: [ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>) => void)` | — | Called when a user activates one of its children buttons. |
| selected | `[ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>` | — | Selected value, use for controlled components. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/ButtonGroup/ButtonGroup.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

ButtonGroup allows users to switch between two or more possible states. ButtonGroups are only used for actions that occur immediately after the user "flips the switch".

```tsx
<IressButtonGroup label="Button group">
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

## Design

### When to use

- **Toggle actions**: Switch between two or more states that take effect immediately
- **View switching**: Toggle between list/grid views, or between different data representations
- **Segmented controls**: Present a compact set of mutually exclusive choices

### When not to use

- **Navigation** — use tabs or a menu instead
- **Form selections** — use [RadioGroup](../components/radio-group.md) for selecting from options in a form
- **Independent toggles** — use [Toggle](../components/toggle.md) for on/off switches

### Content guidelines

- **Label**: Always provide a `label` describing what the group represents
- Use short, parallel button labels (e.g. "Day", "Week", "Month")
- Keep labels to 1–2 words where possible

### Related patterns

- [RadioGroup](../components/radio-group.md) — for form-based single selection
- [Toggle](../components/toggle.md) — for binary on/off states

## Develop

### Quick Start

```tsx
import { IressButtonGroup, IressButton } from '@iress-oss/ids-components';

<IressButtonGroup label="Options">
  <IressButton>Option A</IressButton>
  <IressButton>Option B</IressButton>
</IressButtonGroup>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-buttongroup--docs#api-props)

### Usage

Button Group requires some `label` text to describe what the group of buttons represent. The `label` text can be visually hidden (but still read by screenreaders) using the `hiddenLabel` prop.

The `children` prop should contain multiple `IressButton` components.

You can use the `onChange` prop to watch when a button is clicked.

**Note:**

- The `options` props, originally used to map a set of strings to `IressButton`, has been deprecated. Instead, you can use array.map to map the options to `IressButton` in your own application.
- The `mode` prop on `IressButton` is not supported when used inside an `IressButtonGroup`.

```tsx
<IressButtonGroup label="Button group">
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

#### Rich buttons

By passing the buttons as children you have more control over the display of the button allowing you to use icons or tooltips.

**Note:** In this case, please set the `value` prop on the `IressButton` component to ensure the correct value is used when the button is clicked.

```tsx
<IressButtonGroup label="Text alignment">
  <IressTooltip tooltipText="Left">
    <IressButton value="left">
      <IressIcon name="align-left" screenreaderText="Left" />
    </IressButton>
  </IressTooltip>
  <IressTooltip tooltipText="Center">
    <IressButton value="center">
      <IressIcon name="align-center" screenreaderText="Center" />
    </IressButton>
  </IressTooltip>
  <IressTooltip tooltipText="Right">
    <IressButton value="right">
      <IressIcon name="align-right" screenreaderText="Right" />
    </IressButton>
  </IressTooltip>
  <IressDivider vertical mx="xs" />
  <IressTooltip tooltipText="Justify">
    <IressButton value="justify">
      <IressIcon name="align-justify" screenreaderText="Justify" />
    </IressButton>
  </IressTooltip>
</IressButtonGroup>;
```

#### Multi-select

By default, only one button in the group can be selected at a time. By setting the `multiple` prop, multiple buttons can be selected.

```tsx
<IressButtonGroup multiple label="Multiple options can be selected">
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

#### Pre-selecting buttons

Buttons within the group can be pre-selected using the `defaultSelected` prop (for uncontrolled components), or the `selected` prop if you are planning to control the state yourself.

If the button group is in its default single select mode, these props expects a string that matches the text of one of the buttons, or the `value` prop of the button if it has been set.

In multi-select mode, these props expects an array of matching strings.

```tsx
<IressButtonGroup
  defaultSelected="Option 2"
  label="Selected option for single select"
>
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```
```tsx
<IressButtonGroup
  multiple
  defaultSelected={['Option 2', 'Option 4']}
  label="Selected option for multi-select"
>
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

#### `onChange` event

The Button Group emits an event when any of the selected buttons change. The event detail (`ButtonGroupChange`) consist of a string or an array of strings (depending on if it's in single or multi select mode) that represents the selected button(s).

```tsx
import {
  IressButton,
  IressButtonGroup,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

function ButtonGroupWithToaster() {
  const { success } = useToaster();

  return (
    <IressButtonGroup
      label="Trigger toasts by selecting an option below"
      onChange={(selected) => {
        success({
          content: `Selected: ${selected ? String(selected) : 'none'}`,
        });
      }}
    >
      <IressButton>Option 1</IressButton>
      <IressButton>Option 2</IressButton>
      <IressButton>Option 3</IressButton>
      <IressButton>Option 4</IressButton>
    </IressButtonGroup>
  );
}

export function ButtonGroupOnChange() {
  return (
    <IressToasterProvider container={document.body}>
      <ButtonGroupWithToaster />
    </IressToasterProvider>
  );
}
```

#### Hidden label

If you would like to visually hide the label, you can use the `hiddenLabel` prop.

```tsx
<IressButtonGroup label="Button group" hiddenLabel>
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

#### Headings as labels

For semantic reasons, you may need the label to be rendered as a heading. In this case, you can pass the element directly to the `label` prop. The component will automatically add the `id` required to connect the button group to its label.

```tsx
<IressButtonGroup label={<IressText element="h2">Heading as label</IressText>}>
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

### Testing

Query the button group by its `group` role:

```tsx
const group = screen.getByRole('group', { name: 'Alignment' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-buttongroup--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the button group | `getByRole('group', { name: '...' })` | `buttongroup` |
| label | The group label element | `getByText('...')` | `buttongroup__label` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-buttongroup--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Single-select mode — one button active at a time |
| Multi-select | Multiple buttons can be active simultaneously |
| onChange | Emits selected value(s) when selection changes |

### Accessibility

- Renders as a `group` with an accessible label via `label` prop
- **WCAG 4.1.2 Name, Role, Value** — group role with accessible name
- `hiddenLabel` visually hides the label while keeping it available to screen readers

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus into/out of the group |
| `Enter` / `Space` | Activates the focused button |