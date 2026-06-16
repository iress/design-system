# ValidationMessage

> Displays a validation error or helper message associated with a form field.

## Import

```tsx
import { IressValidationMessage } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validation-message--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/ValidationMessage)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=validation-message&title=[ValidationMessage]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=validation-message,enhancement&title=[ValidationMessage]+Feature:+)

A validation message is used to inform the user of the status of a form input. If there are multiple messages, they can be combined using the IressValidationSummary component.

<StoryEmbed id="components-validationmessage--status"/>

## Design

### When to use

- **Field-level feedback**: Show errors, warnings, or success messages next to an input
- **Form validation**: Indicate which fields need attention after submission
- **Validation summary**: Combine multiple messages at the top of a form

### When not to use

- **Page-level messages** — use [Alert](../components/alert.md) for broader status messages
- **Transient confirmations** — use [Toaster](../components/toaster.md) for brief success messages

### Content guidelines

- Be specific about what went wrong and how to fix it (e.g. "Enter a valid email address" not "Invalid input")
- Use sentence case
- Keep messages concise — one sentence maximum

### Related patterns

- [Field](../components/field.md) — wraps input + label + validation message together
- [Form](../patterns/form.md) — full form patterns with validation
- [Alert](../components/alert.md) — for page-level status messages

## Develop

### Quick Start

```tsx
import { IressValidationMessage } from '@iress-oss/ids-components';

<IressValidationMessage>
  This field is required
</IressValidationMessage>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validationmessage--docs#api-props)

### Usage

#### Status

Validation status is controlled by the status prop. It defaults to `error`.

<StoryEmbed id="components-validationmessage--status"/>

#### Prefix

You can add a prefix to the message. If not provided, it uses the `status` prop to determine the prefix.

It is hidden by default, but can be shown by setting the `visiblePrefix` prop to `true`.

<StoryEmbed id="components-validationmessage--prefix"/>

#### Link to target

You can use the `linkToTarget` prop to link the message to a specific target in the DOM. This is useful to take the user to a specific part of the form when they click on the message.

<StoryEmbed id="components-validationmessage--link-to-target"/>

#### ValidationSummary

Messages can be passed programmatically as a `ValidationMessageObj[]` using the `messages` prop of the `IressValidationSummary` component.

<StoryEmbed id="components-validationmessage-validationsummary--validation-summary"/>

### Testing

Query validation messages by their text content or `data-testid`:

```tsx
const error = screen.getByText('This field is required');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validationmessage--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the validation message | — | `validationmessage` |
| error | An individual error message | — | `validationmessage__error` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validationmessage--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Error (default) | Displays error styling with danger colour |
| Warning | Displays warning styling |
| Success | Displays success styling |
| Link to target | Message becomes a clickable link to the target element |

### Accessibility

- Messages are associated with their input via `aria-describedby` (when used inside `IressField`)
- **WCAG 3.3.1 Error Identification** — errors are identified and described in text
- Status is conveyed via text prefix, not colour alone