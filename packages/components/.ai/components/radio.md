# Radio

> Renders a single radio button for use within a group of mutually exclusive options.

## Import

```tsx
import { IressRadio } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Radio)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=radio&title=[Radio]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=radio,enhancement&title=[Radio]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | — | Sets the checked state of the radio. If it is within a radio group, it will be overridden by the radio group's value and whether it matches this radio's value. |
| children | `ReactNode` | — | Label of the radio |
| heading | `ReactNode` | — | Sets the heading for the radio when using the `card` variant |
| name | `string` | — | Sets the name attribute on the radio input. If it is within a radio group, it will be overridden with the radio group's name. |
| onChange | `((e: ChangeEvent<HTMLInputElement, Element>, value?: T) => void)` | — | Handles the onChange event of the radio input. If you pass in a non-string value, you can access it using the second parameter of the function. |
| required | `boolean` | — | If `true`, the radio is a required field and will be validated as such. If it is within a radio group, it will be overridden with the radio group's required state. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the radio as read-only. Use `'locked'` when the value is read-only because of permissions. |
| value | `T` | — | The value which is submitted with the form data when this radio button is checked. To set this radio as checked by default, use the `checked` property. |
| variant | `[IressCheckboxVariants](../../dist/components/Checkbox/Checkbox.d.ts)` | — | The visual variant of the radio. - `card`: Provides a larger, card-like style with a heading slot. - `touch`: Provides a larger, button-like style, great for mobile devices. - `undefined`: The default radio style. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Radio/Radio.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

A radio is a single option presented with a radio button. It is used to select a single option from multiple options. It is typically used in an IressRadioGroup.

```tsx
<IressRadio checked>Checked radio button</IressRadio>;
```

## Design

### When to use

- **Inside a RadioGroup**: As individual options within an `IressRadioGroup`
- **Standalone toggle**: Rare — typically only when a single binary choice is needed with radio semantics

### When not to use

- **Multiple selections** — use [Checkbox](../components/checkbox.md) instead
- **On/off toggles** — use [Toggle](../components/toggle.md) for boolean switches

### Related patterns

- [RadioGroup](../components/radio-group.md) — the parent container for radio options
- [Checkbox](../components/checkbox.md) — for multi-select options

## Develop

### Quick Start

```tsx
import { IressRadio } from '@iress-oss/ids-components';

<IressRadio>Radio button</IressRadio>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio--docs#api-props)

### Usage

#### Checked

You can set the radio to `checked` by default. This is useful when you want to pre-select an option.

**Note:** If you are using an `IressRadioGroup`, you should use the `value` prop on the `IressRadioGroup` to set the checked state of its `<IressRadio />` children, as the `checked` prop will be ignored.

```tsx
<IressRadio checked>Checked radio button</IressRadio>;
```

#### Read only

The `readOnly` prop changes how the radio is rendered. It will only render if the radio is checked (alongside a hidden input that contains the `value` if it was set), otherwise it not be rendered.

It is understandable that this may not be the desired behavior for all use cases. If you need a radio that is not editable, but still visible, simply do not set the `readOnly` prop and set the `checked` prop instead.

```tsx
import { IressRadio, IressStack } from '@iress-oss/ids-components';

export function RadioReadOnly() {
  return (
    <IressStack gap="sm">
      <IressRadio readOnly checked>
        Radio button
      </IressRadio>
      <IressRadio readOnly>Radio button</IressRadio>
    </IressStack>
  );
}
```

#### Variants

The `variant` prop changes the visual style of the radio. The `card` variant adds a card-like border and the `touch` variant adds button-like border and padding.

```tsx
import { IressRadio, IressStack } from '@iress-oss/ids-components';

export function RadioVariants() {
  return (
    <IressStack gap="lg">
      <IressRadio variant="card" heading="Widget">
        A description of the widget
      </IressRadio>
      <IressRadio variant="touch">Touch variant</IressRadio>
    </IressStack>
  );
}
```

### Testing

Query radio buttons by their accessible role and label text:

```tsx
const radio = screen.getByRole('radio', { name: 'Option A' });
```

When you have multiple radios on the same page (e.g. Yes/No questions), always
query by the specific label text to disambiguate:

```tsx
// Multiple radio groups on the same page
const yesRadio = screen.getByRole('radio', { name: 'Yes' });
const noRadio = screen.getByRole('radio', { name: 'No' });

// If labels are identical across groups, scope your query to a container
const group = screen.getByRole('radiogroup', { name: 'Approve request' });
const yes = within(group).getByRole('radio', { name: 'Yes' });
```

#### Gotchas

- **readOnly mode**: When `readOnly` is set, the radio role is removed from the
  DOM entirely. Only the text label and a hidden `<input>` remain. Use
  `queryByRole('radio')` to assert absence, and `getByText` to find the label.
- **Unchecked readOnly radios render nothing**: If a radio is `readOnly` and not
  checked, it renders no output at all.

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the radio | — | `radio` |
| input | The underlying radio input element | `getByRole('radio', { name: '...' })` | `radio__input` |
| radioMark | The visual radio indicator | — | `radio__radioMark` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Unchecked radio with label |
| Checked | Radio indicator filled |
| Read only | Only renders if checked; otherwise renders nothing |
| Variants | `card` adds border; `touch` adds border + padding |

### Accessibility

- Renders as `radio` role with accessible name from children text
- **WCAG 4.1.2 Name, Role, Value** — checked state communicated programmatically

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Space` | Selects the radio if not already selected |
| `Arrow keys` | Moves between radios when inside a RadioGroup |