# Shadow

The shadow pattern allows you to wrap your content in the shadow DOM, allowing you to isolate your styles from the rest of the application. This is useful when you want to create a component that has its own styles, without affecting the rest of the application (such as microfrontends).

> **Pattern:** `import { IressShadow } from '@iress-oss/ids-components'`
> **Storybook:** [Shadow in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-shadow--docs)

## Quick Start

```tsx
import { IressShadow } from '@iress-oss/ids-components';

<IressShadow />
```

## Usage

This is a simple component that is an alternative to the `IressProvider`. To use it, simply wrap your content in the `IressShadow` component.

It has similar props to the `IressProvider`, however it will apply the styles to the correct area depending on where its needed.

> **Note:** `IressShadow` includes `IressProvider` internally, which in turn includes `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, and `IressIconProvider`. You do not need to add any of these providers separately when using `IressShadow`.

- Font faces are injected into the document head, as they cannot be injected into the shadow DOM
- The IDS styles are injected into the shadow DOM
- The icon stylesheet is injected into both the document head and the shadow DOM, as the icon stylesheet includes both font face and icon styles

**Note:** The `IressShadow` component does not create a custom element, it simply creates a shadow root on a `div` element. All children inside `IressShadow` are standard React components — **not** custom elements or Web Components. The `slot` HTML attribute is not used; content positioning uses React props (`prepend`, `append`, `footer`, etc.).

> **⚠️ Common AI mistake:** Agents see "Shadow" in `IressShadow` and incorrectly assume the application uses Web Components or custom elements with `slot` attributes. This is wrong — `IressShadow` is purely for CSS isolation in microfrontend scenarios. IDS has not offered Web Components since v4.

[View "Shadow" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns---shadow)

---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-shadow--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-shadow--docs)*
