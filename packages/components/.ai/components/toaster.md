# Toaster

> Manages and displays temporary toast notifications to the user.

## Import

```tsx
import { IressToaster } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toaster--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Toaster)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=toaster&title=[Toaster]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=toaster,enhancement&title=[Toaster]+Feature:+)

Toaster provide users with important, time-sensitive information.

```tsx
import {
  IressButton,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

const ToastWithTrigger = () => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster.error({
          heading: 'Error',
          content:
            'Connection failure. Longer text description should wrap and look like this. Try to limit to 3 lines or less.',
        })
      }
    >
      Show toast using provider
    </IressButton>
  );
};

export function SimpleToasterExample() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
```

## Design

### When to use

- **Action confirmations**: "Record saved", "Email sent", "Item deleted"
- **Background process updates**: "File uploaded successfully", "Data synced"
- **Non-critical status changes**: Information the user should see but does not need to act on

### When not to use

- **Persistent contextual messages** that relate to page content — use [Alert](../components/alert.md) instead
- **Critical information or decisions** the user must acknowledge — use [Modal](../components/modal.md) instead
- **Messages containing actions** the user needs to take — toasts auto-dismiss and should not contain essential actions

For a full comparison of feedback components, see the [Feedback pattern](../patterns/feedback.md).

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use for transient confirmations of completed actions | Use toasts for persistent information that must remain visible |
| Keep toast messages concise (under 60 characters) | Include complex actions or forms inside toasts |
| Use consistent positioning throughout the application | Change toast position based on context |
| Use appropriate status for the severity | Stack multiple toasts for the same action |

### Content guidelines

- **Message**: Keep short and actionable — confirm what happened (e.g. "Changes saved", not "Your changes have been successfully saved to the database")
- **Status mapping**:
  - `success` — confirms a completed action
  - `info` — non-critical update
  - `error` — an operation failed (provide a retry path if possible)
- **Timing**: Default 6 seconds is appropriate for most messages; use longer timeouts for messages requiring reading

### Related patterns

- [Feedback](../patterns/feedback.md) — decision tree for choosing the right feedback component
- [Alert](../components/alert.md) — for persistent inline messages
- [Modal](../components/modal.md) — for blocking decisions

## Develop

### Quick Start

```tsx
import { IressToasterProvider, useToaster } from '@iress-oss/ids-components';

function App() {
  const { success } = useToaster();

  const handleClick = () => {
    success('Changes saved');
  };

  return <IressButton onClick={handleClick}>Save changes</IressButton>;
}

<IressToasterProvider position="top-end">
  <App />
</IressToasterProvider>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toaster--docs#api-props)

### Usage

To use the toaster, wrap your `<App/>` or the component that you want to use the toasts within with `<IressToasterProvider />`. This provides the context for the `useToaster` hook, which is used to trigger toasts in your application.

> **Note:** If you are already using `IressProvider` or `IressShadow`, you do not need to add `IressToasterProvider` separately — it is already included.

You can use the `success`, `info` and `error` methods from the hook to trigger toasts in your application.

```tsx
import {
  IressButton,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

const ToastWithTrigger = () => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster.error({
          heading: 'Error',
          content:
            'Connection failure. Longer text description should wrap and look like this. Try to limit to 3 lines or less.',
        })
      }
    >
      Show toast using provider
    </IressButton>
  );
};

export function SimpleToasterExample() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
```

#### Closing toasts via the provider

If you want to dismiss a toast programmatically, you can use the `close` method from the `useToaster` hook. This method takes a toast ID as an argument, which is returned when you create a toast using the `useToaster` hook.

```tsx
import {
  IressButton,
  IressInline,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const ToastWithTrigger = () => {
  const toaster = useToaster();
  const [lastToastId, setLastToastId] = useState<string | null>(null);

  return (
    <IressInline gap="sm">
      <IressButton
        onClick={() => {
          const toastId = toaster.error({
            heading: 'Error',
            content:
              'Connection failure. Longer text description should wrap and look like this. Try to limit to 3 lines or less.',
            onClose: () => {
              setLastToastId(null);
            },
          });

          setLastToastId(toastId);
        }}
      >
        Show toast using provider
      </IressButton>
      {lastToastId && (
        <IressButton onClick={() => toaster.close(lastToastId)}>
          Close the last toast opened
        </IressButton>
      )}
    </IressInline>
  );
};

export function CloseToastViaProvider() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
```

#### Status

The toast offers three statuses that set a distinctive colour and icon. They can be set using the `status` prop.

```tsx
import {
  IressButton,
  IressInline,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

const ToastWithTrigger = ({
  status,
}: {
  status: 'error' | 'success' | 'info';
}) => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster[status]({
          heading: `${status[0].toUpperCase() + status.slice(1)} toast`,
          content: `Hello, I am a ${status} toast`,
          actions: [
            { onClick: () => alert('Action clicked!'), children: 'Click me' },
          ],
        })
      }
    >
      {status}
    </IressButton>
  );
};

export function ToastStatuses() {
  return (
    <IressToasterProvider container={document.body}>
      <IressInline gap="sm">
        <ToastWithTrigger status="error" />
        <ToastWithTrigger status="info" />
        <ToastWithTrigger status="success" />
      </IressInline>
    </IressToasterProvider>
  );
}
```

#### Timeout

By default, toasts will time out after six seconds, after which they will animate out of view. This can be customised using the `timeout` prop when created using the `useToaster` hook.

Timeouts must be set in milliseconds; as an example, if you want a timeout of five seconds, set the timeout to 5000.

```tsx
import {
  IressButton,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

const ToastWithTrigger = () => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster.success({
          content: 'This is a really quick toast',
          timeout: 1000,
        })
      }
    >
      1000ms timeout
    </IressButton>
  );
};

export function ToasterTimeout() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
```

#### Position

By default, the `IressToasterProvider`'s `position` is set to `top-end`, but there may be occasions when you need toasts to appear in a different part of the screen. This can be controlled with the `position` prop on the `IressToasterProvider` component, or as the first argument to `useToaster`. There are 6 positions to choose from.

**Note:** The toast position should be consistent based on context, so users can find them easily.

```tsx
import {
  IressButton,
  IressInline,
  IressPanel,
  IressStack,
  IressText,
  IressToasterProvider,
  type NewToast,
  useToaster,
} from '@iress-oss/ids-components';

const DEFAULT_TOAST: NewToast = {
  content: 'Message sent successfully',
  heading: 'Success',
  status: 'success',
};

const Toaster = () => {
  const topStart = useToaster('top-start');
  const topCenter = useToaster('top-center');
  const topEnd = useToaster('top-end');
  const bottomStart = useToaster('bottom-start');
  const bottomCenter = useToaster('bottom-center');
  const bottomEnd = useToaster('bottom-end');

  return (
    <div style={{ padding: '80px 150px' }}>
      <IressStack gap="md">
        <IressInline horizontalAlign="between" gap="sm">
          <IressButton onClick={() => topStart.success(DEFAULT_TOAST)}>
            top-start
          </IressButton>
          <IressButton onClick={() => topCenter.success(DEFAULT_TOAST)}>
            top-center
          </IressButton>
          <IressButton onClick={() => topEnd.success(DEFAULT_TOAST)}>
            top-end
          </IressButton>
        </IressInline>
        <IressPanel bg="transparent" p="lg">
          <IressText textAlign="center">Toaster positions</IressText>
        </IressPanel>
        <IressInline horizontalAlign="between">
          <IressButton onClick={() => bottomStart.success(DEFAULT_TOAST)}>
            bottom-start
          </IressButton>
          <IressButton onClick={() => bottomCenter.success(DEFAULT_TOAST)}>
            bottom-center
          </IressButton>
          <IressButton onClick={() => bottomEnd.success(DEFAULT_TOAST)}>
            bottom-end
          </IressButton>
        </IressInline>
      </IressStack>
    </div>
  );
};

export function ToasterPositionExamples() {
  return (
    <IressToasterProvider
      container={document.body}
      id="bottom-end"
      position="bottom-end"
    >
      <IressToasterProvider
        container={document.body}
        id="bottom-center"
        position="bottom-center"
      >
        <IressToasterProvider
          container={document.body}
          id="bottom-start"
          position="bottom-start"
        >
          <IressToasterProvider
            container={document.body}
            id="top-start"
            position="top-start"
          >
            <IressToasterProvider
              container={document.body}
              id="top-center"
              position="top-center"
            >
              <IressToasterProvider
                container={document.body}
                id="top-end"
                position="top-end"
              >
                <Toaster />
              </IressToasterProvider>
            </IressToasterProvider>
          </IressToasterProvider>
        </IressToasterProvider>
      </IressToasterProvider>
    </IressToasterProvider>
  );
}
```

### Testing

Query toast notifications by their text content:

```tsx
const toast = await screen.findByText('Changes saved');
expect(toast).toBeInTheDocument();
```

**Gotchas:**

- **Toasts appear asynchronously**: Always use `findByText` or `findByRole` (async) instead of `getByText`.
- **Dismissing toasts**: After clicking the dismiss button, use `waitForElementToBeRemoved` to wait for the exit animation:

  ```tsx
const toast = await screen.findByText('Changes saved');
const dismiss = screen.getByRole('button', { name: 'Dismiss' });
await user.click(dismiss);
await waitForElementToBeRemoved(toast);
```

- **Toast status icons**: Each toast has a status label accessible via `getByLabelText('success:')` (or `danger:`, `info:`, etc.).


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The visible toast list container (rendered inside the aria-live region) | — | `toaster` |
| toast | An individual toast notification within the Toaster | `getByRole('alert')` | `toast` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toaster--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Visible | Toast appears in the configured position with enter animation |
| Auto-dismiss | Toast animates out after timeout (default 6 seconds) |
| Manual dismiss | User clicks dismiss button; toast animates out immediately |
| Programmatic close | `close(id)` removes the toast by ID |
| Multiple toasts | Stack vertically in the configured position |

### Accessibility

**WCAG compliance:**

- **4.1.3 Status Messages** — Toasts are announced via `role="status"` (polite live region)
- **2.2.1 Timing Adjustable** — Timeout can be customised per toast; hover pauses the timer
- **1.4.1 Use of Color** — Status is communicated via icon and text, not colour alone

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the dismiss button within the toast |
| `Enter` / `Space` | Activates the dismiss button |

### Edge cases

- **No provider**: Using `useToaster` without `IressToasterProvider` in the tree throws an error
- **Multiple providers**: Only the nearest ancestor provider handles toasts
- **Many simultaneous toasts**: Stack vertically; consider limiting visible toasts in your application logic
- **Navigation during toast**: Toasts persist during client-side navigation within the provider scope

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toaster--docs)