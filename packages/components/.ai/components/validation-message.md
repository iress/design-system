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

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| element | `a`, `div`  | — | The HTML element that should be rendered. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| linkToTarget | `string` | — | ID of element the message is describing. If nothing is supplied a link will not render. |
| prefix | `ReactNode` | — | Prefix to the validation message. Will be `status` prop if nothing is provided. |
| status | `danger` , `info` , `success`, `warning`  | `danger` | Whether message is danger, warning, success or info. **Note**: danger is translated to Error when used as the prefix. |
| visiblePrefix | `boolean` | `false` | If set to true, the prefix will be visually displayed (default is only available to screen readers) |

📄 [Full type definition](../../dist/components/ValidationMessage/ValidationMessage.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

A validation message is used to inform the user of the status of a form input. If there are multiple messages, they can be combined using the IressValidationSummary component.

```tsx
<IressStack>
  <IressValidationMessage status="info">
    Something you should know.
  </IressValidationMessage>
  <IressValidationMessage status="danger">
    Something is wrong.
  </IressValidationMessage>
  <IressValidationMessage status="warning">
    Something could go wrong.
  </IressValidationMessage>
  <IressValidationMessage status="success">
    Something went right.
  </IressValidationMessage>
</IressStack>;
```

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

<IressValidationMessage>This field is required</IressValidationMessage>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validationmessage--docs#api-props)

### Usage

#### Status

Validation status is controlled by the status prop. It defaults to `error`.

```tsx
<IressStack>
  <IressValidationMessage status="info">
    Something you should know.
  </IressValidationMessage>
  <IressValidationMessage status="danger">
    Something is wrong.
  </IressValidationMessage>
  <IressValidationMessage status="warning">
    Something could go wrong.
  </IressValidationMessage>
  <IressValidationMessage status="success">
    Something went right.
  </IressValidationMessage>
</IressStack>;
```

#### Prefix

You can add a prefix to the message. If not provided, it uses the `status` prop to determine the prefix.

It is hidden by default, but can be shown by setting the `visiblePrefix` prop to `true`.

```tsx
<IressStack>
  <IressValidationMessage prefix="Prefix: " visiblePrefix status="info">
    Something you should know.
  </IressValidationMessage>
  <IressValidationMessage prefix="Prefix: " visiblePrefix status="danger">
    Something is wrong.
  </IressValidationMessage>
  <IressValidationMessage prefix="Prefix: " visiblePrefix status="warning">
    Something could go wrong.
  </IressValidationMessage>
  <IressValidationMessage prefix="Prefix: " visiblePrefix status="success">
    Something went right.
  </IressValidationMessage>
</IressStack>;
```

#### Link to target

You can use the `linkToTarget` prop to link the message to a specific target in the DOM. This is useful to take the user to a specific part of the form when they click on the message.

```tsx
<IressStack gap="md">
  <IressStack>
    <IressValidationMessage
      linkToTarget="input"
      status="info"
      linkToTarget="input"
    >
      Something you should know.
    </IressValidationMessage>
    <IressValidationMessage
      linkToTarget="input"
      status="danger"
      linkToTarget="input"
    >
      Something is wrong.
    </IressValidationMessage>
    <IressValidationMessage
      linkToTarget="input"
      status="warning"
      linkToTarget="input"
    >
      Something could go wrong.
    </IressValidationMessage>
    <IressValidationMessage
      linkToTarget="input"
      status="success"
      linkToTarget="input"
    >
      Something went right.
    </IressValidationMessage>
  </IressStack>
  <IressDivider />
  <IressInput id="input" />
</IressStack>;
```

#### ValidationSummary

Messages can be passed programmatically as a `ValidationMessageObj[]` using the `messages` prop of the `IressValidationSummary` component.

```tsx
<IressValidationSummary
  messages={[
    {
      message: 'Something you should know.',
      status: 'info',
    },
    {
      message: 'Something is wrong.',
      status: 'danger',
    },
    {
      message: 'Something could go wrong.',
      status: 'warning',
    },
    {
      message: 'Something went right.',
      status: 'success',
    },
  ]}
/>;
```

### Testing

Query validation messages by their text content or `data-testid`:

```tsx
const error = screen.getByText('This field is required');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validationmessage--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the validation message | `getByText('...')` | `validationmessage` |
| error | An individual error message | `getByRole('link')` | `validationmessage__error` |

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