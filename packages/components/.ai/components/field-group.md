# FieldGroup

> Groups related form fields together with a shared legend, description, and validation message.

## Import

```tsx
import { IressFieldGroup } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/FieldGroup)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=field-group&title=[FieldGroup]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=field-group,enhancement&title=[FieldGroup]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Should contain multiple `IressField`, or other elements supported in field group such as `IressButton`. |
| inline | `boolean` | — | Displays multiple children inline rather than stacked, with a small gap. |
| join | `boolean` | — | Displays multiple children inline and removes column gap. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| required | `boolean` | — | When set to true, the 'required asterisk (*)' is displayed next to the label text. |
| hiddenLabel | `boolean` | — | Visually hides the label text, but still available to screen readers. |
| hint | `ReactNode` | — | Text to be displayed as supporting field description. |
| horizontal | `boolean` | — | Displays the label and input field inline instead of stacked vertically. |
| labelWidth | `string` | — | Controls the width of the label container when in horizontal mode. Can be any valid CSS width value (e.g., '200px', '20%', 'auto'). Only applies when `horizontal` is true. |
| htmlFor | `undefined` | — | Used to connect it to the input element, it should be the input's id. If provided, the label will be rendered as a `<label>` element, otherwise it will be rendered as a `<strong>` element.  [Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for) |
| **label** | `ReactNode` | — | Text to be displayed in the label. |
| error | `ReactNode` | — | Validation error to be displayed above the field. |
| errorMessages | `[ValidationMessageObj](../../dist/interfaces.d.ts)[]` | — | Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the group in a read-only state (no asterisk symbol). Use `'locked'` when the control is read-only due to permissions. |
| removeErrorMargin | `boolean` | — | Removes the reserved space for error messages, allowing fields to stack with narrower gaps. When true, no margin is reserved for potential error messages. |
| supplementary | `ReactNode` | — | Supplementary content to be displayed below the field. Is only shown when the field is not in an error state. |

📄 [Full type definition](../../dist/components/FieldGroup/FieldGroup.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Groups multiple related fields together using a `fieldset` and `legend` for accessibility.

```tsx
<IressFieldGroup label="Full name" inline>
  <IressField label="First name" htmlFor="firstName">
    <IressInput id="firstName" />
  </IressField>
  <IressField label="Last name" htmlFor="lastName">
    <IressInput id="lastName" />
  </IressField>
</IressFieldGroup>;
```

## Design

### When to use

- **Related inputs**: Group radio buttons, checkboxes, or inputs that share a common label (e.g. "Address" with street, city, postcode)
- **Inline fields**: Combine multiple short fields on one line (e.g. first name + last name)
- **Joined inputs**: Visually connect inputs that form a single value (e.g. phone prefix + number)

### When not to use

- **Single field with label** — use [Field](../components/field.md) instead
- **Unrelated fields** — don't group fields just for layout; use [Row](../components/row.md) and [Col](../components/col.md)

### Content guidelines

- **Legend**: Describe the group's purpose (e.g. "Contact details", "Payment method")
- Use sentence case for legends
- Keep legends concise — they're read by screen readers before each field in the group

### Related patterns

- [Field](../components/field.md) — for single input + label + error
- [Form](../patterns/form.md) — for full form patterns with validation
- [Inline](../components/inline.md) — for layout without fieldset semantics

## Develop

### Quick Start

```tsx
import {
  IressFieldGroup,
  IressField,
  IressInput,
} from '@iress-oss/ids-components';

<IressFieldGroup label="Full name" inline>
  <IressField label="First name">
    <IressInput />
  </IressField>
  <IressField label="Last name">
    <IressInput />
  </IressField>
</IressFieldGroup>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs#api-props)

### Usage

#### Inline

Fields arranged horizontally within the group.

```tsx
<IressFieldGroup label="Full name" inline>
  <IressField label="First name" htmlFor="firstName">
    <IressInput id="firstName" />
  </IressField>
  <IressField label="Last name" htmlFor="lastName">
    <IressInput id="lastName" />
  </IressField>
</IressFieldGroup>;
```

#### Inline with sink

Inline fields with error messages that sink below without disrupting layout.

```tsx
<form>
  <IressFieldGroup {...{ ...args, inputs: undefined }}>
    <IressField label="Emoji" htmlFor="emoji">
      <IressSelect
        width="2"
        id="emoji"
        options={[
          { label: '🐶', value: 'dog' },
          { label: '🐱', value: 'cat' },
          { label: '🐭', value: 'mouse' },
        ]}
        container={document.body}
      />
    </IressField>

    <IressField label="Title" htmlFor="title">
      <IressSelect
        native
        width="2"
        id="title"
        options={[
          { label: 'Mr', value: 'mr' },
          { label: 'Mrs', value: 'mrs' },
          { label: 'Miss', value: 'miss' },
        ]}
      />
    </IressField>

    <IressField label="First name" htmlFor="firstName" required>
      <IressInput id="firstName" required />
    </IressField>

    <IressField label="Last name" htmlFor="lastName" required>
      <IressInput id="lastName" required />
    </IressField>

    <IressButton type="submit">Submit</IressButton>

    <IressPopover
      activator={
        <IressButton>
          <IressIcon name="cog" />
        </IressButton>
      }
    >
      Settings goes here
    </IressPopover>
  </IressFieldGroup>
</form>;
```

#### Joined

Visually connected fields that form a single value.

```tsx
<IressFieldGroup label="Full name" join>
  <IressField label="First name" htmlFor="firstName">
    <IressInput id="firstName" />
  </IressField>
  <IressField label="Last name" htmlFor="lastName">
    <IressInput id="lastName" />
  </IressField>
</IressFieldGroup>;
```

#### Joined with sink

Joined fields with error sink behaviour.

```tsx
<form>
  <IressFieldGroup label="Full name" inline join>
    <IressField label="Emoji" htmlFor="emoji">
      <IressSelect
        width="2"
        id="emoji"
        options={[
          { label: '🐶', value: 'dog' },
          { label: '🐱', value: 'cat' },
          { label: '🐭', value: 'mouse' },
        ]}
        container={document.body}
      />
    </IressField>

    <IressField label="First name" htmlFor="firstName" required>
      <IressInput id="firstName" required />
    </IressField>

    <IressField label="Last name" htmlFor="lastName" required>
      <IressInput id="lastName" required />
    </IressField>

    <IressButton type="submit">Submit</IressButton>
  </IressFieldGroup>
</form>;
```

### Testing

Query the field group by its `group` role:

```tsx
const group = screen.getByRole('group', { name: 'Full name' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs#testing)

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders a `<fieldset>` with a visible `<legend>` |
| Inline | Children arranged horizontally with gap |
| Join | Children visually connected (shared border radius) |
| Error | Individual child fields show their own errors |

### Accessibility

- Renders as `<fieldset>` with `<legend>` — screen readers announce the legend before each field
- **WCAG 1.3.1 Info and Relationships** — programmatic grouping communicates field relationships
- Use `IressFieldGroup` instead of wrapping with `role="group"` manually

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves between fields within the group |

### Edge cases

- **Nested groups**: Avoid nesting `IressFieldGroup` inside another `IressFieldGroup` — screen readers announce each legend
- **Single child**: Valid but unnecessary — use `IressField` directly