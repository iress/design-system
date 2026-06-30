# RadioGroup

> Groups related radio buttons so users can select one option from a set.

## Import

```tsx
import { IressRadioGroup } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio-group--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/RadioGroup)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=radio-group&title=[RadioGroup]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=radio-group,enhancement&title=[RadioGroup]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content of the radio group, usually multiple `IressRadio` components. |
| layout | `'block' , 'inline' , 'inlineEqualWidth', 'inlineFlex' , 'stack' ` | `'stack'` | Sets which of the block / inline layout options apply. |
| name | `string` | — | Name to be applied to all radios in the group. |
| onChange | `(e: ChangeEvent<HTMLInputElement>, value?: T) => void` | — | Called when a user selects one of its children radio buttons. If you pass in a non-string value, you can access it using the second parameter of the function. |
| required | `boolean` | — | When true, marks the field as required |
| defaultValue | `T` | — | Initial value of radio group when in uncontrolled mode. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders a readOnly radio group. |
| value | `T` | — | Value of radio group when in controlled mode. |
| variant | `CheckboxVariants` | — | The visual variant of the radios in the group. This is passed down to child radios, but can be overridden at the individual radio level. - `card`: Provides a larger, card-like style with a heading slot. - `touch`: Provides a larger, button-like style, great for mobile devices. - `undefined`: The default radio style. |

📄 [Full type definition](../../dist/components/RadioGroup/RadioGroup.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

A radio group is a group of radio buttons that allows the user to select one option from multiple options, where all options are visible.

```tsx
<IressRadioGroup>
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

## Design

### When to use

- **Single selection from visible options**: When users must choose one option and all options should be visible
- **Short lists**: Typically 2–7 options
- **Immediate visibility**: When comparing options side-by-side helps decision-making

### When not to use

- **Many options** — use [Select](../components/select.md) for more than 7 options
- **Multiple selections** — use [CheckboxGroup](../components/checkbox-group.md) instead
- **Toggle actions** — use [ButtonGroup](../components/button-group.md) for immediate-action toggles

### Content guidelines

- Provide a clear group label describing the choice
- Use parallel phrasing for option labels
- List options in a logical order (alphabetical, most common first, etc.)

### Related patterns

- [CheckboxGroup](../components/checkbox-group.md) — for multi-select
- [Select](../components/select.md) — for longer lists of options
- [ButtonGroup](../components/button-group.md) — for immediate-action toggles

## Develop

### Quick Start

```tsx
import { IressRadioGroup, IressRadio } from '@iress-oss/ids-components';

<IressRadioGroup name="survey">
  <IressRadio value="a">Option A</IressRadio>
  <IressRadio value="b">Option B</IressRadio>
</IressRadioGroup>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radiogroup--docs#api-props)

### Usage

Individual radio buttons can be passed directly into `IressRadioGroup`.

**Note:** The `mapRadioGroupOptions` helper function, originally used to map options to `IressRadio` components, is now deprecated. Instead, you can use `array.map` to map the options to `IressRadio` components.

```tsx
<IressRadioGroup>
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

#### Selection

The default checked state of the radio children should always be set using the `value` prop. Sometimes you may wish to use the `IressRadioGroup` as an "uncontrolled" component - for example, because you are using a third party form library that requires it. In this case, simply use `defaultValue` instead of `value`.

**Note:** The `value` prop on the `IressRadioGroup` component will always override the `checked` state of the `IressRadio` children.

```tsx
<IressRadioGroup defaultValue="newspaper">
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

#### Layout

The layout prop controls how the radio group is displayed and can have three basic layouts:

- **stack (Default):** Radio buttons are laid out vertically. Labels are only as wide as their text.
- **block:** Same as Stack, but labels take up the full width of the container.
- **inline:** Radio buttons are laid out horizontally. Labels are only as wide as their text.
- **inlineFlex:** Radio buttons are laid out horizontally. The container is only as wide as its contents.
- **inlineEqualWidth:** Radio buttons are laid out horizontally. Labels take up an equal amount of space in the container.

> **Note:**
>
> If using any of the inline* props within a `Field` component, the `Field` also
>   needs the inline prop to be set for the inline layouts to take effect.

```tsx
import {
  IressRadio,
  IressRadioGroup,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function RadioGroupLayout() {
  return (
    <IressStack gap="md">
      <IressText>
        <h3>block (default)</h3>
        <IressRadioGroup layout="block" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inline</h3>
        <IressRadioGroup layout="inline" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inlineEqualWidth</h3>
        <IressRadioGroup layout="inlineEqualWidth" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inlineFlex</h3>
        <IressRadioGroup layout="inlineFlex" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>stack</h3>
        <IressRadioGroup layout="stack" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
    </IressStack>
  );
}
```

#### Hidden radio buttons

You can use the `hiddenRadio` prop to create custom radio buttons. When enabled, the actual radio button will be visually hidden, allowing you to create more interesting controls. The checked state will be shown by the label's border, which is thicker when the radio button is checked.

When `hiddenRadio` is enabled, the label will have no padding. Padding can be added by using a Panel or utility classes.

```tsx
<IressField
  label="I'd like to discuss the following in my financial review:"
  hint="Select one option"
>
  <IressRadioGroup
    defaultValue="home"
    required
    layout="inline"
    variant="card"
  />
</IressField>;
```

#### Laying out custom radio buttons

The radio group's `layout` prop gives you some default options to help control the layout of your controls. But sometimes you need more granular control, which you can achieve with a bit of custom CSS.

The example below uses CSS grid to give us evenly spaced / sized radio buttons, which will wrap on to new lines as the screen size reduces. The grid wrapper element is a div that wraps around the `<IressRadio />` elements, as shown by the dashed border. Use the grab handle in the bottom right-hand corner of the grid wrapper to see how the controls change size to respond to the container's width.

```tsx
<IressField
  label="I'd like to discuss the following in my financial review:"
  hint="Select one option"
>
  <IressRadioGroup
    name="financial-review"
    required
    layout="block"
    variant="card"
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gridAutoRows: '1fr',
        gridGap: '0.75rem',
        width: '100%',
        padding: '0.5rem',
        border: '1px dashed hsl(43deg 100% 45%)',
        resize: 'horizontal',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  </IressRadioGroup>
</IressField>;
```

#### Read only

The `readOnly` prop changes how the radio group is rendered. It will only render if the children radio that is checked (alongside a hidden input that contains the `value` if it was set), otherwise it will not be rendered.

It is understandable that this may not be the desired behavior for all use cases. If you need a radio group that is not editable, but still visible, simply do not set the `readOnly` prop and set the `value` prop instead.

```tsx
<IressRadioGroup defaultValue="newspaper" readOnly>
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

#### Touch

The `touch` prop adds the button-like border and padding to radio.

```tsx
<IressRadioGroup defaultValue="newspaper" variant="touch">
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

### Testing

Query radio buttons within the group by their role:

```tsx
const radios = screen.getAllByRole('radio');
await user.click(screen.getByRole('radio', { name: 'Option A' }));
```

Query the group itself by its `radiogroup` role:

```tsx
const group = screen.getByRole('radiogroup', { name: 'Choose an option' });
```

#### Disambiguating multiple radio groups

When you have multiple Yes/No radio groups on the same page, use `within` to
scope queries to a specific group:

```tsx
import { within } from '@testing-library/react';

const approvalGroup = screen.getByRole('radiogroup', { name: 'Approve' });
const yes = within(approvalGroup).getByRole('radio', { name: 'Yes' });
await user.click(yes);
```

#### Gotchas

- **readOnly mode**: When `readOnly` is set, all radio roles are removed from
  the DOM. Only the selected option's label text and a hidden `<input>` remain.
  If nothing is selected, the group renders empty.
- **Focus behaviour**: Focusing the `radiogroup` element moves focus to the
  first radio child. The group needs `tabIndex` to be focusable programmatically.

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radiogroup--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the radio group | `getByRole('radiogroup')` | `radio-group` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radiogroup--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Single-select, stack layout |
| Read only | Only renders the selected option as text + hidden input |
| Touch | Adds button-like border and padding |

### Accessibility

- Renders as `radiogroup` role with accessible name from label
- **WCAG 4.1.2 Name, Role, Value** — each radio has proper role, name, and checked state
- Arrow keys move selection between options within the group

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus into/out of the radio group |
| `Arrow Up/Down` | Moves selection between radio options (stack layout) |
| `Arrow Left/Right` | Moves selection between radio options (inline layout) |
| `Space` | Selects the focused radio (if not already selected) |