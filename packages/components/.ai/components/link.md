# Link

A link is used to navigate to another page or location.

> **Component:** `import { IressLink } from '@iress-oss/ids-components'`
> **Storybook:** [Link in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-link--docs)

## Quick Start

```tsx
import { IressLink } from '@iress-oss/ids-components';

<IressLink href="//iress.com">
  IressLink
</IressLink>
```

## Usage

`IressLink` is an alternative to the `IressButton` component, and is used when you want to add interactive text inside a block of static text.

If you provide a `href`, it will render as an `<a />` element. Otherwise it will render as a `<button />` element. This helps ensure it presents the correct role to assistive technologies for the best accessibility.

## When to use

- If you want to include a link alongside static text, use the `IressLink` component.
- If you want to have a call to action at the start or end of a block of contents, use the `IressButton` component instead.

## Examples

### Loading

Loading buttons give the user an indication something is happening (eg. a form submission or extra content being loaded) after they have been triggered.

The loading state can be activated by setting the `loading` prop to `true` and providing some `loadingText` for screenreaders to announce when in loading state (which defaults to Loading...).

When the loading state is activated, any click events on the link are disabled.

```tsx
<IressLink loading>
  Link text
</IressLink>
```

[View "Loading" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-link--loading)

### Prepend & Append

Use the `prepend` and `append` props to correctly position icons or badges inside links.

- **`prepend`** — Places the element before the link text
- **`append`** — Places the element after the link text

> **⚠️ Do not use `slot` attributes on children** (e.g. `<IressIcon slot="start" />`). The `slot` attribute is a legacy v4 pattern that is no longer supported. Always use the `prepend` and `append` props.

```tsx
<IressInline gap="md">
<IressLink prepend={<IressIcon name="home" />}>
Prepend icon
</IressLink>

<IressLink append={<IressIcon name="home" />}>
Append icon
</IressLink>
</IressInline>
```

[View "Slots" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-link--slots)

### Element

You can use the `element` prop to render a custom component as the link. This is useful for rendering a component from a third-party library, such as `react-router-dom`.

```tsx
<RoutingLink />
```

[View "Element" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-link--element)

## Testing

Query links by their accessible role:

```tsx
const link = screen.getByRole('link', { name: 'Learn more' });
```

When no `href` is provided, the link renders as a button:

```tsx
const button = screen.getByRole('button', { name: 'Show details' });
```

## Props

- **Type:** `IressLinkProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/Link/Link.d.ts`

```typescript
import type { IressLinkProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-link--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-link--docs)*
