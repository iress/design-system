# Provider

> Application-level wrapper that provides shared context for Modal, Slideout, Toaster, Tooltip, and Popover components.

## Import

```tsx
import { IressProvider } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-provider--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Provider)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=provider&title=[Provider]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=provider,enhancement&title=[Provider]+Feature:+)

Provider is a component that sets up the Iress Design System for your application. It ensures that the design system is correctly configured and ready to use. It is required for Modal, Slideout, Toaster, and Tooltip to function correctly.

## Design

### When to use

- **App-level wrapper**: Wrap your entire application to set up the design system
- **Micro frontends**: Provide a container for portalled components (modals, slideouts, toasts)

### When not to use

- **Inside IressShadow** — `IressShadow` already includes `IressProvider` internally

## Develop

### Quick Start

```tsx
import { IressProvider } from '@iress-oss/ids-components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <IressProvider>
    <App />
  </IressProvider>,
);
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-provider--docs#api-props)

### Usage

The design system provider automates some set-up tasks for you, including:

- Adding the icon fonts and CSS variables to the document head
- Consistent container handling for providers, if you need the modals, slideouts and toasts rendered in a specific area (common with micro frontends)
- Optional separate container for popovers via the `popoverContainer` prop

In most cases, you should wrap the entire application with the `IressProvider` component. This will ensure that the design system is set up correctly and consistently across the application.

> **Note:** `IressProvider` already includes `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, `IressPopoverProvider`, and `IressIconProvider`. You do not need to add these providers separately when using `IressProvider`. Similarly, `IressShadow` includes `IressProvider` internally, so you do not need any additional providers when using `IressShadow`.

```tsx
import {
  IressButton,
  IressInline,
  IressModal,
  IressPanel,
  IressProvider,
  IressSlideout,
  IressText,
  useModal,
  useSlideout,
  useToaster,
} from '@iress-oss/ids-components';

const Page = () => {
  const { showModal } = useModal();
  const { showSlideout } = useSlideout();
  const toaster = useToaster();

  return (
    <IressPanel
      bg="alt"
      style={{
        height: '300px',
      }}
    >
      <IressInline gap="md">
        <IressButton onClick={() => showModal('test-modal')}>
          Show modal
        </IressButton>
        <IressModal id="test-modal">
          <IressText>Some modal content</IressText>
        </IressModal>
        <IressButton onClick={() => showSlideout('test-slideout')}>
          Show slideout
        </IressButton>
        <IressSlideout id="test-slideout">
          <IressText>Some slideout content</IressText>
        </IressSlideout>
        <IressButton
          onClick={() => toaster.success({ content: 'A toast message' })}
        >
          Show toast
        </IressButton>
      </IressInline>
    </IressPanel>
  );
};

export const AppWithProvider = () => (
  <IressProvider>
    <Page />
  </IressProvider>
);
```

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-provider--docs)

## Specifications

### Behaviour

Wraps the application and sets up icon fonts, CSS variables, and container providers for Modal, Slideout, Toaster, Popover, and Icon components.