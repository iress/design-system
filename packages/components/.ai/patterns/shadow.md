# Shadow

> Applies an elevated shadow effect to visually separate content layers.

## Import

```tsx
import { IressShadow } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-shadow--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Shadow)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=shadow&title=[Shadow]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=shadow,enhancement&title=[Shadow]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Children to be rendered inside the shadow DOM |
| fontFaceUrls | `string[]` | `[...defaultFonts]` | Optional array of font URLs to be included in the parent document head. By default it will include the default fonts from `@iress-oss/ids-tokens` (e.g., ['https://fonts.googleapis.com/css?family=Roboto'] |
| stylesheetContents | `Record<string, string>` | `{}` | Optional array of stylesheet contents to be included in the shadow DOM (e.g. { styleId: '.my-class { color: red; }' }) |
| stylesheetUrls | `string[]` | `[]` | Optional array of stylesheet URLs to be included in the shadow DOM (e.g., ['https://example.com/style.css']) |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| position | `bottom-center` , `bottom-end` , `bottom-start` , `top-center`, `top-end` , `top-start`  | `top-end` | The position on the screen where the toast will appear. |
| noIconProvider | `boolean` | `false` | Disable the built-in IconProvider. When true, no IconProvider is rendered, allowing you to provide your own icon loading mechanism (e.g. hiding the app until the Material Symbols font is fully loaded). |
| noSubsetting | `boolean` | `false` | Disable automatic font subsetting via Google Fonts CDN When false, only icons actually used in the component tree are loaded When true, the full Material Symbols font is loaded Ignored when `noIconProvider` is true. |
| popoverContainer | `container` , [FloatingUIContainer](../../dist/types.d.ts) | — | Container to render popovers into. By default, popovers render where their parent is rendered (no portal).  Set to `"container"` to reuse the same container as the `container` prop (useful when you want modals, slideouts, toasts **and** popovers in the same DOM node).  Individual popovers can still override this by setting their own `container` prop. |
| zIndexOffset | `number` | — | A value added to every IDS z-index layer via `calc()`. Use this when your application has a navigation element with a high z-index and IDS overlays (modal, slideout, toast) appear behind it. @example // Navbar sits at z-index 995 — shift IDS layers above it: <IressProvider zIndexOffset={1000}>...</IressProvider> // Modal → 1400, Toast → 1500, Tooltip → 1600 |
| toasterOffset | `string` | — | Offsets the toaster from the viewport edge (block axis). Useful when a fixed navbar would overlap the toaster. Accepts any valid CSS length value (e.g. `'60px'`, `'4rem'`). @example <IressProvider toasterOffset="60px">...</IressProvider> |

📄 [Full type definition](../../dist/patterns/Shadow/Shadow.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

The shadow pattern allows you to wrap your content in the shadow DOM, allowing you to isolate your styles from the rest of the application. This is useful when you want to create a component that has its own styles, without affecting the rest of the application (such as microfrontends).

```tsx
<IressShadow>
  <IressPanel>
    Content inside shadow DOM <IressIcon name="heart_smile" />
  </IressPanel>
</IressShadow>;
```

## Design

### When to use

- **Microfrontends**: Isolate styles between independently deployed applications
- **Third-party embedding**: Prevent host page styles from leaking into your components
- **Style encapsulation**: When CSS modules or naming conventions aren't sufficient isolation

### When not to use

- **Standard applications**: If you control the full page, use `IressProvider` directly
- **Web Components**: `IressShadow` does not create custom elements — it simply creates a shadow root on a `div` element

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use for style isolation in microfrontends | Use when you control the full page styles |
| Ensure font faces are loaded in the document head | Assume shadow DOM will isolate JavaScript state |
| Match provider configuration with the host app | Apply multiple nested `IressShadow` wrappers on the same element |

### Related patterns

- [Panel](../components/panel.md) — for content grouping with visual boundaries
- [Card](../components/card.md) — for self-contained content blocks
- [Popover](../components/popover.md) — for overlay content requiring style isolation

## Develop

### Quick Start

```tsx
import { IressShadow } from '@iress-oss/ids-components';

<IressShadow>{/* Your content here */}</IressShadow>;
```

### Usage

This is a simple component that is an alternative to the `IressProvider`. To use it, simply wrap your content in the `IressShadow` component.

It has similar props to the `IressProvider`, however it will apply the styles to the correct area depending on where its needed.

> **Note:** `IressShadow` includes `IressProvider` internally, which in turn includes `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, and `IressIconProvider`. You do not need to add any of these providers separately when using `IressShadow`.

- Font faces are injected into the document head, as they cannot be injected into the shadow DOM
- The IDS styles are injected into the shadow DOM
- The icon stylesheet is injected into both the document head and the shadow DOM, as the icon stylesheet includes both font face and icon styles

**Note:** The `IressShadow` component does not create a custom element, it simply creates a shadow root on a `div` element. All children inside `IressShadow` are standard React components — **not** custom elements or Web Components. The `slot` HTML attribute is not used; content positioning uses React props (`prepend`, `append`, `footer`, etc.).

<Details>
<summary>⚠️ Common AI mistake: "Shadow" means Web Components — **WRONG**</summary>

Agents see "Shadow" in `IressShadow` and incorrectly assume the application uses Web Components or custom elements with `slot` attributes. This is wrong — `IressShadow` is purely for CSS isolation in microfrontend scenarios. IDS has not offered Web Components since v4.

</Details>

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-shadow--docs)