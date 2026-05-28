# 
> **Component:** `import { IressModal } from '@iress-oss/ids-components'`
> **Storybook:** [ in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-modal--docs)```tsx
```

## Quick Start

```tsx
<IressModal heading="Modal Header" />
```

## Usage

### Use a modal when

- Providing supplemental tasks required by the underlying page
- Providing non-essential information related to the underlying page
- Content requires full attention

### Avoid using a modal when

- Conveying brief messages about background processes or status changes. Instead use [IressAlert](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-alert--docs) or [IressToaster](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-toaster--docs).
- The modal content can be incorporated into the page without complicating the page's intent

For a full comparison of feedback components, see the [Feedback pattern](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-feedback--docs).

### Using the `show` property

You can use state to control the modal by setting the `show` property to `true` or `false`. To sync your state with the modal, you can use the `onShowChange` prop, which is normally passed the set function from `useState`.

```tsx
<ModalUsingState />
```

[View "ShowWithState" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-modal--show-with-state)

### Using the `IressModalProvider`

You can use the `IressModalProvider` to open and close modals from anywhere in your application, as long as the modal has a unique `id`. In this case you would use the `useModal` hook to open and close the modal.

> **Note:** If you are already using `IressProvider` or `IressShadow`, you do not need to add `IressModalProvider` separately — it is already included.

To use, wrap your `<App/>` or the component that you want to use the `useModal` hook with `<IressModalProvider />`.

```tsx
<AppWithModalProvider />
```

[View "Provider" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-provider--provider)

## Behaviour

- No other interaction on the main page can be accessed while a modal is active. A backdrop covers the content beneath so that the content beneath cannot be interacted with.
- Clicking on the the backdrop closes the modal and returns the focus to the triggering element.
- When the modal is active the body is set to overflow: hidden to stop any scrolling of the underlying page. Scrolling should then only be possible on the modal wrapper.
- By default there are 3 ways to dismiss the modal; click X in the header; press ESC on a keyboard; click anywhere on the backdrop. It is also recommended that consumers add a Cancel or Close button using the modal's `footer` prop if required.

## Examples

### Heading

The `heading` prop can be used to set a heading for the modal. This will be rendered in the header of the modal, and will be announced by screen readers when the modal is opened.

```tsx
<IressModal heading="Modal heading" />
```

[View "Heading" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-modal--heading)

### Footer

Use the `footer` prop to place content underneath the main content. Usually used for extra controls like buttons etc.

```tsx
<IressModal heading="Modal Header">
  Normal modal content
</IressModal>
```

[View "FooterSlot" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-modal--footer-slot)

### Fixed footer

The `fixedFooter` prop can be used to set the footer to be fixed to the bottom of the modal. This is often useful when there is a lot of content in the main area that you would like to scroll underneath the footer content.

**Note:** Also works without footer content.

> [!WARNING]
> **Using with popovers and tooltips**
>
> The fixed footer variant of IressModal prevents content from overflowing the
>   modal. This can cause layout issues when using with components that use
>   popovers (for example IressCombobox), especially when these components sit at
>   the end of the modal&apos;s content. If you encounter these issues, try using
>   a modal without a fixed footer. Normal modals allow content to overflow, which
>   should fix the issue.

```tsx
<IressModal heading="Modal Header" fixedFooter />
```

[View "FixedFooter" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-modal--fixed-footer)

### Size

The `size` prop can be set to `sm`, `md` or `lg`. It defaults to `md`.

Below is a guide on when to use which size.

```tsx
<ModalSizes />
```

[View "Size" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-modal--size)

### Responsive size

The `size` prop no longer accepts responsive values directly, instead you must use the `width` styling prop to set responsive sizes.

The `width` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

If you set a responsive `width`, the modal becomes full width on screens smaller than the value you specified. For example, if you want to create a large modal on medium screens and above:

```tsx
  <IressModal size="lg" width={{ md: 'overlay.lg' }}>
```

[View "ResponsiveSize" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-modal--responsive-size)

### Status

The `status` prop can be set to `danger`, `success` or `warning` to display a contextual status icon in the modal header. Status modals are intended for communicating outcomes of actions, confirmations, or alerts that require user acknowledgement.

When `status` is set:

- The `size` prop is restricted to `sm` or `md` (defaults to `sm`).
- The `actions` prop is enabled, allowing you to provide buttons for user actions related to the status.

```tsx
<ModalStatuses />
```

[View "Status" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-modal--status)

### Disable closing

For instances where you require the user's full attention and you want to ensure they continue the current task before closing the modal, you can disable the backdrop and escape key using `disableBackdropClick` and/or hide the close button using `noCloseButton`.

**Note:** As these options remove the default handling of the closing the modal, please ensure you provide a clear way for the user to close the modal.

```tsx
const { showModal } = useModal();

    const noCloseButtonModal = (
      <IressModal
        id="no-close-button"
        heading="Modal Header"
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('no-close-button', false)}>
            Close
          </IressButton>
        }
      />
    );

    const bothModal = (
      <IressModal
        id="both"
        heading="Modal Header"
        disableBackdropClick
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('both', false)}>
            Close
          </IressButton>
        }
      />
    );

    return (
      <IressStack gap="md">
        <IressButton onClick={() => showModal('disable-backdrop-click')} fluid>
          Disable backdrop click
        </IressButton>
        <IressModal
          id="disable-backdrop-click"
          heading="Modal Header"
          disableBackdropClick
        />

        <IressButton onClick={() => showModal('no-close-button')} fluid>
          No close button (please provide one, if you decide to hide the close
          button)
        </IressButton>
        {noCloseButtonModal}

        <IressButton onClick={() => showModal('both')} fluid>
          Both (If you hide the close button, ensure you provide another way to
          close the modal)
        </IressButton>
        {bothModal}
      </IressStack>
    );
```

[View "DisableClosing" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-modal--disable-closing)

## Migrating to version 5

### Adding the provider

For your components to work as previously, you will need to set up the `IressModalProvider` at the root of your application. This will allow you to use the `useModal` hook to open and close modals from anywhere in your application using the ID of the modal.

> **Note:** If you are using `IressProvider` or `IressShadow`, you do not need to add `IressModalProvider` separately — it is already included.

```tsx
const App = () => <IressModalProvider>Rest of app here</IressModalProvider>;
```

### Testing

In version 5, modals are rendered conditionally, meaning they will not be available in the DOM until they are shown. This means that you will need to update your tests to account for this, as you cannot interact with its contents until it is shown, unlike in version 4.

See below for an example in version 4 and version 5.

```tsx
<DiffViewer
allowModeChange
oldValue={`import { render, waitFor, screen } from '@testing-library/react';
test('opening and closing a modal', async () => {
await componentLoad([
'modal-trigger',
'modal',
]);

const trigger = screen.getByTestId('modal-trigger');
const modal = screen.getByTestId('modal');

// In version 4, you can already interact with the modal here as its in the DOM at this stage.

// activate modal
idsFireEvent.click(trigger);
await waitFor(() => expect(modal).toBeVisible());

// close modal
const closeButton = screen.getByTestId('modal__close-button');
idsFireEvent.click(closeButton);
await waitFor(() => expect(modal).not.toBeVisible());
});`}
newValue={`import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
test('opening and closing a modal', async () => {
const trigger = screen.getByRole('button', { name: /open modal/i });

// activate modal
await userEvent.click(trigger);
const modal = await screen.findByRole('dialog');

// In version 5, you can only interact with the modal once it has been loaded here.

// close modal
const closeButton = screen.getByRole('button', { name: /close/i });
await userEvent.click(closeButton);
await waitForElementToBeRemoved(modal);
});`}
/>
```

[View "V5ModalDiff" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-modal--v5modal-diff)

## Testing

Query the modal dialog by its role:

```tsx
const modal = screen.getByRole('dialog', { name: 'Modal heading' });
```

**Note:** In version 5, modals are rendered conditionally — they are not in the
DOM until shown. Use `findByRole` when waiting for a modal to appear.

### Gotchas

- **Conditional rendering**: The modal and its contents are not in the DOM until
  `show` is `true`. You cannot query or interact with modal content before
  showing it. Use `findByRole` (async) instead of `getByRole`.
- **Backdrop click closes the modal**: Clicking the backdrop dismisses the modal
  by default. Use `disableBackdropClick` if your test needs to prevent this.
- **Focus management**: When the modal opens, focus moves inside it. When it
  closes, focus returns to the triggering element.

### Test IDs

When you pass a `data-testid` to `IressModal`, the following nested test IDs
are generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `heading` | `my-modal__heading` | The modal heading |
| `backdrop` | `my-modal__backdrop` | The overlay backdrop |
| `close-button__button` | `my-modal__close-button__button` | The close button |
| `content` | `my-modal__content` | The modal content area |
| `status-header` | `my-modal__status-header` | The status icon header (when status is set) |
| `status-icon` | `my-modal__status-icon` | The status icon (when status is set) |
| `footer` | `my-modal__footer` | The modal footer |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-modal--docs)
