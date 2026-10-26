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

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | The contents of your application, and/or the components which will be calling slideouts, modals and toasts. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | Container to render modals, slideouts and toasts into. If not provided, will render into the body of the document.  **Note:** This does not affect popovers. Use `popoverContainer` to set a shared container for all nested popovers. |
| noIconProvider | `boolean` | `false` | Disable the built-in IconProvider. When true, no IconProvider is rendered, allowing you to provide your own icon loading mechanism (e.g. hiding the app until the Material Symbols font is fully loaded). |
| noSubsetting | `boolean` | `false` | Disable automatic font subsetting via Google Fonts CDN When false, only icons actually used in the component tree are loaded When true, the full Material Symbols font is loaded Ignored when `noIconProvider` is true. |
| noDefaultFont | `boolean` | — | If you don't want to load the default Iress font from the CDN, set this to true. |
| popoverContainer | `container` , [FloatingUIContainer](../../dist/types.d.ts) | — | Container to render popovers into. By default, popovers render where their parent is rendered (no portal).  Set to `"container"` to reuse the same container as the `container` prop (useful when you want modals, slideouts, toasts **and** popovers in the same DOM node).  Individual popovers can still override this by setting their own `container` prop. |
| zIndexOffset | `number` | — | A value added to every IDS z-index layer via `calc()`. Use this when your application has a navigation element with a high z-index and IDS overlays (modal, slideout, toast) appear behind it. @example // Navbar sits at z-index 995 — shift IDS layers above it: <IressProvider zIndexOffset={1000}>...</IressProvider> // Modal → 1400, Toast → 1500, Tooltip → 1600 |
| toasterOffset | `string` | — | Offsets the toaster from the viewport edge (block axis). Useful when a fixed navbar would overlap the toaster. Accepts any valid CSS length value (e.g. `'60px'`, `'4rem'`). @example <IressProvider toasterOffset="60px">...</IressProvider> |
| position | `bottom-center` , `bottom-end` , `bottom-start` , `top-center`, `top-end` , `top-start`  | `top-end` | The position on the screen where the toast will appear. |

📄 [Full type definition](../../dist/components/Provider/Provider.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

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