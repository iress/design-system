# Provider

Provider is a component that sets up the Iress Design System for your application. It ensures that the design system is correctly configured and ready to use.

> **Component:** `import { IressProvider } from '@iress-oss/ids-components'`
> **Storybook:** [Provider in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-provider--docs)

## Quick Start

```tsx
import { IressProvider } from '@iress-oss/ids-components';

<IressProvider />
```

## Usage

The design system provider automates some set-up tasks for you, including:

- Adding the icon fonts and CSS variables to the document head
- Consistent container handling for providers, if you need the modals, slideouts and toasts rendered in a specific area (common with micro frontends)
- Optional separate container for popovers via the `popoverContainer` prop

In most cases, you should wrap the entire application with the `IressProvider` component. This will ensure that the design system is set up correctly and consistently across the application.

> **Note:** `IressProvider` already includes `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, `IressPopoverProvider`, and `IressIconProvider`. You do not need to add these providers separately when using `IressProvider`. Similarly, `IressShadow` includes `IressProvider` internally, so you do not need any additional providers when using `IressShadow`.

```tsx
import { IressProvider } from '@iress-oss/ids-components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <IressProvider>
    <App />
  </IressProvider>,
);
```

## Props

- **Type:** `IressProviderProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/Provider/Provider.d.ts`

```typescript
import type { IressProviderProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-provider--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-provider--docs)*
