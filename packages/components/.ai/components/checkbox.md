# Checkbox

> Renders a checkbox input for toggling a boolean value.

## Import

```tsx
import { IressCheckbox } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Checkbox)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=checkbox&title=[Checkbox]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=checkbox,enhancement&title=[Checkbox]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | — | If true, the checkbox is selected. Please use this when rendering the checkbox in controlled mode. |
| children | `ReactNode` | — | The checkbox content |
| defaultChecked | `boolean` | — | If true, the checkbox will be initially rendered as selected. Please use this when rendering the checkbox in uncontrolled mode. |
| heading | `ReactNode` | — | Sets the heading for the checkbox when using the `card` variant |
| hiddenLabel | `boolean` | — | Visually hides the label (if set), label will still be read out by screenreaders. |
| indeterminate | `boolean` | — | If true, the checkbox will visually appear as indeterminate. |
| name | `string` | — | The name of the control, which is submitted with the form data. |
| onBlur | `((e: FocusEvent<HTMLInputElement, Element>) => void)` | — | Emitted when the checkbox loses focus. |
| onChange | `((e: ChangeEvent<HTMLInputElement, Element>, checked?: boolean, value?: T) => void) | undefined` | — | Emitted when the checkbox value changes. |
| onFocus | `((e: FocusEvent<HTMLInputElement, Element>) => void)` | — | Emitted when the checkbox gains focus. |
| required | `boolean` | — | If `true`, the checkbox is a required field and will be validated as such. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the checkbox as read-only. Use `'locked'` when the value is read-only because of permissions. |
| value | `T` | — | Value of the checkbox when used in a checkbox group. The checked state of the checkbox will be overridden based on this value if used inside a checkbox group. **Note:** - The value of the checkbox does not mean if its checked or not, use the checked property for that. - If the value of the checkbox is true/false, and checked is undefined and not inside a CheckboxGroup, it will use this as the checked value. This ensures out-of-the-box compatibility with React Hook Form. |
| variant | `[IressCheckboxVariants](../../dist/components/Checkbox/Checkbox.d.ts)` | — | The visual variant of the checkbox. - `card`: Provides a larger, card-like style with a heading slot. - `touch`: Provides a larger, button-like style, great for mobile devices. - `undefined`: The default checkbox style. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Checkbox/Checkbox.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

Checkboxes are used to let a user select one or more options for a limited number of choices. Also, works as a child of IressCheckboxGroup

```tsx
<IressCheckbox>A checkbox</IressCheckbox>;
```

## Design

### When to use

- **Multiple selections**: Let users select one or more options from a list
- **Binary toggles**: A single checkbox for opt-in/opt-out (e.g. "Accept terms")
- **Table row selection**: Select individual rows for bulk actions
- **Indeterminate state**: Show partial selection in a parent checkbox

### When not to use

- **Mutually exclusive options** — use RadioGroup instead
- **Immediate effect toggles** — use a Toggle component
- **Large option sets** — use a multi-select Select

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use a visible label for every checkbox | Hide labels without providing `hiddenLabel` for accessibility |
| Group related checkboxes in a CheckboxGroup | Use standalone checkboxes for related multi-select options |
| Use `indeterminate` only as a visual indicator of partial selection | Rely on `indeterminate` as a third state in form logic |
| Use `readOnly` for confirmed/locked selections | Use `disabled` to prevent interaction without explanation |

### Content guidelines

- **Labels**: Use sentence case, be specific about what the option does
- **Positive framing**: "Send me updates" not "Don't send me updates"
- **Consistent length**: Keep labels similar length within a group

### Related patterns

- [Checkbox Group](../components/checkbox-group.md) — for managing multiple related checkboxes
- [Switch](../components/toggle.md) — for immediate on/off toggles
- [Radio Group](../components/radio-group.md) — for single-select options

## Develop

### Quick Start

```tsx
import { IressCheckbox } from '@iress-oss/ids-components';

<IressCheckbox>A checkbox</IressCheckbox>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs#api-props)

### Usage

#### Controlled

For single checkboxes in controlled mode the `checked` prop sets the checked state.

When used as part of an `IressCheckboxGroup`, the `checked` prop will be ignored. Instead, the `value` prop on the `IressCheckboxGroup` will determine the checked state of each checkbox.

```tsx
import { IressCheckbox } from '@iress-oss/ids-components';
import { useState } from 'react';

export function CheckboxControlled() {
  const [checked, setChecked] = useState(true);

  return (
    <IressCheckbox
      checked={checked}
      onChange={(_e, newChecked) => setChecked(newChecked ?? false)}
    >
      A controlled checkbox
    </IressCheckbox>
  );
}
```

#### Default Checked

For single checkboxes in uncontrolled mode the `defaultChecked` prop sets the default checked state.

```tsx
<IressCheckbox defaultChecked>
  A checkbox which is initially checked
</IressCheckbox>;
```

#### Indeterminate

The `indeterminate` prop sets the checkbox appearance to an indeterminate dash until it is clicked. It has no impact on the checkbox behavior beyond this purely visual indicator.

```tsx
<IressCheckbox indeterminate>
  A checkbox which is initially in an indeterminate state
</IressCheckbox>;
```

#### Hidden Label

When using a checkbox without a visible label, you must supply a label and apply the `hiddenLabel` property to still be accessible by screen readers.

```tsx
import { IressCheckbox, IressTable } from '@iress-oss/ids-components';

export function CheckboxWithTable() {
  return (
    <IressTable
      caption="List of investments"
      columns={[
        {
          format: (value: boolean) => (
            <IressCheckbox defaultChecked={value} hiddenLabel>
              Toggle row
            </IressCheckbox>
          ),
          key: 'select',
          label: 'Select',
          sort: true,
        },
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date' },
        { key: 'cost', label: 'Cost' },
      ]}
      rows={[
        {
          select: false,
          name: 'Artemis Fund Managers Limited',
          date: '2019-09-23',
          cost: 23898.12,
        },
        {
          select: true,
          name: 'CASH.CASH',
          date: '2020-06-28',
          cost: 49751.43,
        },
      ]}
    />
  );
}
```

#### Read only

The `readOnly` prop changes how the checkbox is rendered. It will only render if the checkbox is checked (alongside a hidden input that contains the `value` if it was set), otherwise it will not be rendered.

```tsx
import { IressCheckbox, IressStack } from '@iress-oss/ids-components';

export function CheckboxReadOnly() {
  return (
    <IressStack>
      <IressCheckbox readOnly value="readOnly" defaultChecked>
        I agree to the terms and conditions
      </IressCheckbox>
      <IressCheckbox readOnly value="readOnly">
        I agree to the privacy policy
      </IressCheckbox>
    </IressStack>
  );
}
```

#### Variants

The checkbox component has multiple variants that can be used to change the appearance of the checkbox. The `variant` prop can be set to `default`, `card`, or `touch`.

- `card` variant is used to display the checkbox as a card, which is useful when the checkbox needs to contain more information than just a label.
- `touch` variant is used to display the checkbox with a larger touch target, which is useful for mobile devices.

```tsx
import { IressCheckbox, IressStack } from '@iress-oss/ids-components';

export function CheckboxVariants() {
  return (
    <IressStack gap="lg">
      <IressCheckbox variant="card" heading="Widget">
        A description of the widget
      </IressCheckbox>
      <IressCheckbox variant="touch">Touch variant</IressCheckbox>
    </IressStack>
  );
}
```

### Testing

Query checkboxes by their accessible role:

```tsx
const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
```

#### Gotchas

- **readOnly mode**: When `readOnly` is set, the checkbox role is removed from
  the DOM entirely. Only the text label and a hidden `<input>` remain. If the
  checkbox is unchecked and readOnly, it renders nothing at all.
- **indeterminate state**: An indeterminate checkbox starts unchecked
  (`not.toBeChecked()`). Clicking it transitions to checked.

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root wrapper element | — | `checkbox` |
| input | The checkbox input element | `getByRole('checkbox', { name: '...' })` | `checkbox__input` |
| checkboxMark | The visual checkbox indicator | — | `checkbox__checkboxMark` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Unchecked | Checkbox is empty, clicking toggles to checked |
| Checked | Checkbox shows a tick mark, clicking toggles to unchecked |
| Indeterminate | Checkbox shows a dash (visual only), clicking transitions to checked |
| Read only (checked) | Renders label text and hidden input only |
| Read only (unchecked) | Renders nothing |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="checkbox"` with `aria-checked` state
- **1.3.1 Info and Relationships** — Label is programmatically associated via `<label>`
- **2.1.1 Keyboard** — Checkbox is focusable and togglable via keyboard

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Space` | Toggles the checkbox checked state |
| `Tab` | Moves focus to the next focusable element |

### Edge cases

- **readOnly + unchecked**: Renders nothing — no DOM element present
- **indeterminate**: Purely visual; `aria-checked` reports the actual checked state
- **Within CheckboxGroup**: `checked` prop is ignored; group `value` controls state
- **hiddenLabel**: Label text exists for screen readers but is visually hidden

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs)

## Recipes

### With Table Data

```tsx
import { IressCheckbox, IressTable } from '@iress-oss/ids-components';

export function CheckboxWithTable() {
  return (
    <IressTable
      caption="List of investments"
      columns={[
        {
          format: (value: boolean) => (
            <IressCheckbox defaultChecked={value} hiddenLabel>
              Toggle row
            </IressCheckbox>
          ),
          key: 'select',
          label: 'Select',
          sort: true,
        },
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date' },
        { key: 'cost', label: 'Cost' },
      ]}
      rows={[
        {
          select: false,
          name: 'Artemis Fund Managers Limited',
          date: '2019-09-23',
          cost: 23898.12,
        },
        {
          select: true,
          name: 'CASH.CASH',
          date: '2020-06-28',
          cost: 49751.43,
        },
      ]}
    />
  );
}
```
