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

The field component is used to place label, hint and error information around form controls.

<StoryEmbed id="components-field--label"/>

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
import { IressField } from '@iress-oss/ids-components';

<IressField label="First name" />
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs#api-props)

### Usage

#### Label

The `label` prop is required to describe the field.

<StoryEmbed id="components-field--label"/>

#### Hint

Provide extra information using the `hint` prop. Accepts any React node.

<StoryEmbed id="components-field--hint"/>

#### Error message

Display errors with the `errorMessages` prop (array of `ValidationMessageObj`).

<StoryEmbed id="components-field--error-message"/>

#### Custom error

Use the `error` prop for custom error markup (e.g. icons).

<StoryEmbed id="components-field--custom-error"/>

#### Hidden label

Use `hiddenLabel` to accessibly hide the label (e.g. for search fields).

<StoryEmbed id="components-field--hidden-label"/>

Fields with hidden labels should still provide error feedback in an accessible way, either via `error` or `errorMessages`.

<StoryEmbed id="components-field--hidden-label-with-error"/>

#### Required

Fields marked `required` display an asterisk on the label.

<StoryEmbed id="components-field--required"/>

#### Readonly data

Display read-only data in a form-like layout. Use `readOnly="locked"` for permission-based read-only with a lock icon.

<StoryEmbed id="components-field--readonly-data"/>

#### Supplementary

The `supplementary` prop displays metadata based on the field value (e.g. calculated values). Only shown when the field is not in an error state.

<StoryEmbed id="components-field--supplementary"/>

#### Horizontal layout

Use `horizontal` for label and input on the same line. In horizontal mode, hints display as a tooltip.

<StoryEmbed id="components-field--horizontal"/>

#### Remove error margin

Use `removeErrorMargin` to remove reserved space for error messages for tighter spacing.

<StoryEmbed id="components-field--remove-error-margin"/>

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
| main | The root wrapper element (a div with no role) | — | `field` |
| label | The field label element | — | `field__label` |
| hint | The hint text below the label | — | `field__hint` |
| error | The error message container | — | `field__error` |

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