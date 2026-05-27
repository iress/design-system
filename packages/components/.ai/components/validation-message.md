# Validation message
A validation message is used to inform the user of the status of a form input. If there are multiple messages, they can be combined using the IressValidationSummary component.
> **Component:** `import { IressValidationMessage } from '@iress-oss/ids-components'`
> **Storybook:** [Validation message in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-validation-message--docs)```tsx
```

## Quick Start

```tsx
<IressValidationMessage>
  Validation message
</IressValidationMessage>
```

## Examples

### Status

Validation status is controlled by the status prop. It defaults to `error`.

```tsx
<IressStack>
{STATUSES.map((status) => (
<IressValidationMessage key={status} status={status}>
{messages[status]}
</IressValidationMessage>
))}
</IressStack>
```

[View "Status" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-validation-message--status)

### Prefix

You can add a prefix to the message. If not provided, it uses the `status` prop to determine the prefix.

It is hidden by default, but can be shown by setting the `visiblePrefix` prop to `true`.

```tsx
<IressStack>
{STATUSES.map((status) => (
<IressValidationMessage key={status} status={status}>
{messages[status]}
</IressValidationMessage>
))}
</IressStack>
```

[View "Prefix" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-validation-message--prefix)

### Link to target

You can use the `linkToTarget` prop to link the message to a specific target in the DOM. This is useful to take the user to a specific part of the form when they click on the message.

```tsx
<IressStack gap="md">
<IressStack>
{STATUSES.map((status) => (
<IressValidationMessage key={status}
status={status}
linkToTarget={args.linkToTarget ?? ''}
>
{messages[status]}
</IressValidationMessage>
))}
</IressStack>
<IressDivider />
<IressInput id={args.linkToTarget} />
</IressStack>
```

[View "LinkToTarget" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-validation-message--link-to-target)

## `IressValidationSummary`

Messages can be passed programmatically as a `ValidationMessageObj[]` using the `messages` prop of the `IressValidationSummary` component.

[View "ValidationSummary" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-validation-summary--validation-summary)

## Testing

Query validation messages by their text content or `data-testid`:

```tsx
const error = screen.getByText('This field is required');
```

### Test IDs

When you pass a `data-testid` to `IressValidationSummary`, the following nested
test IDs are generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `error` | `my-validation__error` | An individual error message |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-validation-message--docs)
