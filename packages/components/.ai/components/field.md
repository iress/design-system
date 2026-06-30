# Field

> Wraps a form control with its label, description, and validation message.

## Import

```tsx
import { IressField } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Field)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=field&title=[Field]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=field,enhancement&title=[Field]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| required | `boolean` | — | When set to true, the 'required asterisk (*)' is displayed next to the label text. |
| hiddenLabel | `boolean` | — | Visually hides the label text, but still available to screen readers. |
| hint | `ReactNode` | — | Text to be displayed as supporting field description. |
| horizontal | `boolean` | — | Displays the label and input field inline instead of stacked vertically. |
| labelWidth | `string` | — | Controls the width of the label container when in horizontal mode. Can be any valid CSS width value (e.g., '200px', '20%', 'auto'). Only applies when `horizontal` is true. |
| htmlFor | `string` | — | Used to connect it to the input element, it should be the input's id. If provided, the label will be rendered as a `<label>` element, otherwise it will be rendered as a `<strong>` element.  [Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for) |
| **label** | `ReactNode` | — | Text to be displayed in the label. |
| error | `ReactNode` | — | Validation error to be displayed above the field. |
| errorMessages | `[ValidationMessageObj](../../dist/interfaces.d.ts)[]` | — | Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the group in a read-only state (no asterisk symbol). Use `'locked'` when the control is read-only due to permissions. |
| removeErrorMargin | `boolean` | `false` | Removes the reserved space for error messages, allowing fields to stack with narrower gaps. When true, no margin is reserved for potential error messages. |
| supplementary | `ReactNode` | — | Supplementary content to be displayed below the field. Is only shown when the field is not in an error state. |

📄 [Full type definition](../../dist/components/Field/Field.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

The field component is used to place label, hint and error information around form controls.

```tsx
<IressField
  label={
    <>
      <IressIcon name="home" /> Find your address
    </>
  }
>
  <IressInput id="address" name="address" />
</IressField>;
```

## Design

### When to use

- **Form inputs**: Wrap any form control with a label, hint text, and error messages
- **Read-only data**: Display data in a form-like layout with labels
- **Grouped fields**: Use `IressFieldGroup` for multiple related inputs (e.g. checkbox groups)

### When not to use

- **Out-of-the-box validation** — use `IressFormField` inside `IressForm` instead
- **Standalone labels** — use `IressLabel` directly if Field is too restrictive

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Always provide a `label` prop | Leave form controls without a label |
| Use `hint` for supplementary guidance | Put lengthy instructions in the label |
| Use `errorMessages` for validation feedback | Use `disabled` fields — keep enabled and validate on interaction |
| Use `required` to show the asterisk indicator | Hide required indicators from users |

### Content guidelines

- **Labels**: Use sentence case, keep concise (e.g. "Email address", "Date of birth")
- **Hints**: Provide format or requirement info (e.g. "Must be at least 8 characters")
- **Errors**: Explain what went wrong and how to fix it

### Related patterns

- [Label](../components/label.md) — standalone label component
- [Field Group](../components/field-group.md) — for grouping multiple related fields
- [Form](../patterns/form.md) — provides validation with `IressFormField`

## Develop

### Quick Start

```tsx
import { IressField, IressInput } from '@iress-oss/ids-components';

<IressField label="First name">
  <IressInput id="first-name" />
</IressField>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs#api-props)

### Usage

#### Label

The `label` prop is required to describe the field.

```tsx
<IressField
  label={
    <>
      <IressIcon name="home" /> Find your address
    </>
  }
>
  <IressInput id="address" name="address" />
</IressField>;
```

#### Hint

Provide extra information using the `hint` prop. Accepts any React node.

```tsx
<IressField
  label="Email address"
  hint="For us to be able to contact you in the future"
>
  <IressInput id="email" name="email" required type="email" />
</IressField>;
```

#### Error message

Display errors with the `errorMessages` prop (array of `ValidationMessageObj`).

```tsx
<IressField
  label="Error message"
  errorMessages={[{ message: 'This field is required' }]}
>
  <IressInput id="name" name="name" required />
</IressField>;
```

#### Custom error

Use the `error` prop for custom error markup (e.g. icons).

```tsx
<IressField
  label="Custom error"
  error={
    <IressText element="small" color="colour.system.danger.text">
      This is a custom error message
    </IressText>
  }
>
  <IressInput id="name" name="name" required />
</IressField>;
```

#### Hidden label

Use `hiddenLabel` to accessibly hide the label (e.g. for search fields).

```tsx
<IressField
  label="This label is hidden"
  hint="This hint text is hidden"
  hiddenLabel
>
  <IressInput id="name" name="input1" required type="text" />
</IressField>;
```

Fields with hidden labels should still provide error feedback in an accessible way, either via `error` or `errorMessages`.

```tsx
<IressField
  label="This label is hidden"
  hint="This hint text is hidden"
  error={
    <IressText element="small" color="colour.system.danger.text">
      Even fields with hidden labels will show their validation message
    </IressText>
  }
  hiddenLabel
>
  <IressInput id="name" name="input1" required type="text" />
</IressField>;
```

#### Required

Fields marked `required` display an asterisk on the label.

```tsx
<IressField label="This field is required" required>
  <IressInput id="name" name="input1" required type="text" />
</IressField>;
```

#### Readonly data

Display read-only data in a form-like layout. Use `readOnly="locked"` for permission-based read-only with a lock icon.

```tsx
<IressField label="First name" hint="This field is readonly" readOnly required>
  <IressReadonly />
</IressField>;
```

#### Supplementary

The `supplementary` prop displays metadata based on the field value (e.g. calculated values). Only shown when the field is not in an error state.

```tsx
import { useState } from 'react';
import {
  IressField,
  IressInput,
  IressStack,
  IressToggle,
} from '@iress-oss/ids-components';

export function FieldSupplementary() {
  const [error, setError] = useState<string | undefined>();

  return (
    <IressStack gap="spacing.5">
      <IressToggle
        onChange={(checked) =>
          setError(checked ? 'This field is required' : undefined)
        }
        checked={error !== undefined}
      >
        Show error
      </IressToggle>
      <IressField
        label="First name"
        supplementary="I only show if there is no error"
        error={error}
      >
        <IressInput id="name" name="input1" required type="text" />
      </IressField>
    </IressStack>
  );
}
```

#### Horizontal layout

Use `horizontal` for label and input on the same line. In horizontal mode, hints display as a tooltip.

```tsx
<IressField
  horizontal
  labelWidth="250px"
  label="Email address"
  hint="Enter your email address for contact"
  supplementary="We will not share your email with third parties (Supplementary text)"
>
  <IressInput
    id="email"
    name="email"
    required
    type="email"
    placeholder="john.doe@example.com"
  />
</IressField>;
```

#### Remove error margin

Use `removeErrorMargin` to remove reserved space for error messages for tighter spacing.

```tsx
import { useState } from 'react';
import {
  IressCol,
  IressField,
  IressInline,
  IressInput,
  IressRow,
  IressStack,
  IressText,
  IressToggle,
} from '@iress-oss/ids-components';

export function FieldRemoveErrorMargin() {
  const [removeErrorMargin, setRemoveErrorMargin] = useState(false);
  const [showError, setShowError] = useState(false);

  const fieldProps = {
    removeErrorMargin,
    ...(showError
      ? {
          errorMessages: [{ message: 'This field is required' }],
        }
      : {}),
  };

  const fieldPropsWithContent = {
    removeErrorMargin,
    ...(showError
      ? {
          errorMessages: [{ message: 'This field is required' }],
        }
      : {
          supplementary: 'This is always-displayed supplementary text',
        }),
  };

  return (
    <IressStack gap="spacing.5">
      <IressInline gap="spacing.4">
        <IressToggle
          onChange={(checked) => setRemoveErrorMargin(checked)}
          checked={removeErrorMargin}
        >
          Remove error margin (tighter field spacing)
        </IressToggle>

        <IressToggle
          onChange={(checked) => setShowError(checked)}
          checked={showError}
        >
          Show error message
        </IressToggle>
      </IressInline>

      <IressRow gutter="spacing.6">
        <IressCol span="6">
          <IressStack gap="spacing.2">
            <IressText element="h3">Vertical Label Layout</IressText>
            <IressStack gap="spacing.0">
              <IressField {...fieldProps} label="First Name">
                <IressInput placeholder="Enter first name" />
              </IressField>
              <IressField {...fieldPropsWithContent} label="Last Name">
                <IressInput placeholder="Enter last name" />
              </IressField>
              <IressField {...fieldProps} label="Email Address">
                <IressInput type="email" placeholder="Enter email" />
              </IressField>
            </IressStack>
          </IressStack>
        </IressCol>

        <IressCol span="6">
          <IressStack gap="spacing.2">
            <IressText element="h3">Horizontal Label Layout</IressText>
            <IressStack gap="spacing.0">
              <IressField
                {...fieldProps}
                horizontal
                labelWidth="120px"
                label="First Name"
              >
                <IressInput placeholder="Enter first name" />
              </IressField>
              <IressField
                {...fieldPropsWithContent}
                horizontal
                labelWidth="120px"
                label="Last Name"
              >
                <IressInput placeholder="Enter last name" />
              </IressField>
              <IressField
                {...fieldProps}
                horizontal
                labelWidth="120px"
                label="Email Address"
              >
                <IressInput type="email" placeholder="Enter email" />
              </IressField>
            </IressStack>
          </IressStack>
        </IressCol>
      </IressRow>
    </IressStack>
  );
}
```

### Testing

`IressField` is a wrapper — query the child form control by its accessible role:

```tsx
render(
  <IressField label="Email" htmlFor="email">
    <input id="email" type="email" />
  </IressField>,
);

const input = screen.getByRole('textbox', { name: 'Email' });
expect(input).toBeInTheDocument();
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root wrapper element (a div with no role) | No role-based query — use `getByTestId('field')`. To query the child input, use `getByRole('textbox', { name: '...' })` or `getByLabelText('...')` | `field` |
| label | The field label element | `getByText('...')` | `field__label` |
| hint | The hint text below the label | `getByText('...')` | `field__hint` |
| error | The error message container | `getByText('...')` | `field__error` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Label and input displayed vertically with reserved error space |
| Label click | Clicking the label focuses its associated form control |
| With hint | Hint text appears below the label |
| With error | Error messages appear below the input; supplementary is hidden |
| Horizontal | Label and input on the same line; hint shown as tooltip |
| Read only | Displays value as text; removes form control appearance |
| Required | Asterisk prepended to label |

### Accessibility

**WCAG compliance:**

- **1.3.1 Info and Relationships** — Label is programmatically associated with the input via `htmlFor`
- **3.3.1 Error Identification** — Errors are described via `aria-describedby`
- **3.3.2 Labels or Instructions** — Label and hint text provide clear instructions

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the form control within the field |

### Edge cases

- **No children**: Field renders label, hint, and error without an input
- **Nested test ID propagation**: `my-field__label__text` reaches the label text span
- **Conditional hint/error**: `__hint` and `__error` test IDs only appear when those props are provided
- **Horizontal on mobile**: Consider vertical layout for smaller screens