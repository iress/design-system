# Toaster
Toaster provide users with important, time-sensitive information.
> **Component:** `import { IressToaster } from '@iress-oss/ids-components'`
> **Storybook:** [Toaster in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-toaster--docs)```tsx
```

## Quick Start

```tsx
<IressToaster />
```

## Usage

### When to use

- **Action confirmations**: "Record saved", "Email sent", "Item deleted"
- **Background process updates**: "File uploaded successfully", "Data synced"
- **Non-critical status changes**: Information the user should see but does not need to act on

### When not to use

- **Persistent contextual messages** that relate to page content — use [IressAlert](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-alert--docs) instead
- **Critical information or decisions** the user must acknowledge — use [IressModal](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-modal--docs) instead
- **Messages containing actions** the user needs to take — toasts auto-dismiss and should not contain essential actions

For a full comparison of feedback components, see the [Feedback pattern](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-feedback--docs).

### Showing toasts

To use the toaster, wrap your `<App/>` or the component that you want to use the toasts within with `<IressToasterProvider />`. This provides the context for the `useToaster` hook, which is used to trigger toasts in your application.

> **Note:** If you are already using `IressProvider` or `IressShadow`, you do not need to add `IressToasterProvider` separately — it is already included.

You can use the `success`, `info` and `error` methods from the hook to trigger toasts in your application.

```tsx
<SimpleToasterExample />
```

[View "Provider" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-toaster--provider)

### Closing toasts via the provider

If you want to dismiss a toast programmatically, you can use the `close` method from the `useToaster` hook. This method takes a toast ID as an argument, which is returned when you create a toast using the `useToaster` hook.

```tsx
<CloseToastViaProvider />
```

[View "Close" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-toaster--close)

## Examples

### Status

The toast offers three status that set a distinctive colour and icon. They can be set using the `status` prop. Their different use cases are described here.

```tsx
<ToastStatuses />
```

[View "Statuses" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-toaster--statuses)

### Timeout

By default, toasts will time out after six seconds, after which they will animate out of view. This can be customised using the `timeout` prop when created using the `useToaster` hook.

Timeouts must be set in milliseconds; as an example, if you want a timeout of five seconds, set the timeout to 5000.

```tsx
<ToasterTimeout />
```

[View "Timeout" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-toaster--timeout)

### Position

By default, the `IressToasterProvider`'s `position` is set to `top-end`, but there may be occasions when you need toasts to appear in a different part of the screen. This can be controlled with the `position` prop on the `IressToasterProvider` component, or as the first argument to `useToaster`. There are 6 positions to choose from.

**Note:** The toast position should be consistent based on context, so users can find them easily.

```tsx
<ToasterPositionExamples />
```

[View "Position" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-toaster--position)

## Migrating from version 4 and below

### Adding the provider

For your components to work as previously, you will need to set up the `IressToasterProvider` at the root of your application. This will allow you to use the `useToaster` hook to trigger toasts from anywhere in your application using the status and props of the toast.

> **Note:** If you are using `IressProvider` or `IressShadow`, you do not need to add `IressToasterProvider` separately — it is already included.

```tsx
const App = () => <IressToasterProvider>Rest of app here</IressToasterProvider>;
```

## Testing

Query toast notifications by their text content:

```tsx
const toast = await screen.findByText('Changes saved');
expect(toast).toBeInTheDocument();
```

### Gotchas

- **Toasts appear asynchronously**: Always use `findByText` or `findByRole`
  (async) instead of `getByText`.
- **Dismissing toasts**: After clicking the dismiss button, use
  `waitForElementToBeRemoved` to wait for the exit animation:

  ```tsx
  const toast = await screen.findByText('Changes saved');
  const dismiss = screen.getByRole('button', { name: 'Dismiss' });
  await user.click(dismiss);
  await waitForElementToBeRemoved(toast);
  ```

- **Toast status icons**: Each toast has a status label accessible via
  `getByLabelText('success:')` (or `danger:`, `info:`, etc.).

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-toaster--docs)
