# Link

> Renders a navigational anchor styled consistently with the design system.

## Import

```tsx
import { IressLink } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-link--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Link)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=link&title=[Link]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=link,enhancement&title=[Link]+Feature:+)

A link is used to navigate to another page or location.

```tsx
<IressInline gap="md">
  <IressLink prepend={<IressIcon name="home" />}>Prepend icon</IressLink>

  <IressLink append={<IressIcon name="home" />}>Append icon</IressLink>
</IressInline>;
```

## Design

### When to use

- **Inline navigation**: Include a link alongside static text to navigate elsewhere
- **Contextual references**: Link to related pages, documentation, or resources
- **Loading actions**: Trigger asynchronous actions that navigate on completion

### When not to use

- **Call to action at the start/end of content** — use [Button](../components/button.md) instead
- **Primary form actions** (submit, save) — use [Button](../components/button.md) instead
- **Navigation menus** — use dedicated navigation patterns like [SideNav](../patterns/side-nav.md)

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use descriptive link text that makes sense out of context | Use "click here" or "read more" as link text |
| Use `href` for navigation to render as `<a>` | Omit `href` when the link navigates (renders as `<button>`) |
| Use `prepend`/`append` for icons | Use `slot` attributes on children (legacy v4 pattern) |
| Keep link text concise | Wrap entire paragraphs in a link |

### Content guidelines

- **Link text**: Should describe the destination or action clearly (e.g. "View account settings", not "Click here")
- **External links**: Append an external link icon via `append` to indicate navigation away from the app
- **Loading text**: Provide `loadingText` for screen readers to announce during async actions

### Related patterns

- [Button](../components/button.md) — for primary actions and calls to action
- [Breadcrumbs](../patterns/breadcrumbs.md) — for navigation hierarchy
- [SideNav](../patterns/side-nav.md) — for application navigation menus

## Develop

### Quick Start

```tsx
import { IressLink } from '@iress-oss/ids-components';

<IressLink href="//iress.com">IressLink</IressLink>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-link--docs#api-props)

### Usage

`IressLink` is an alternative to the `IressButton` component, and is used when you want to add interactive text inside a block of static text.

If you provide a `href`, it will render as an `<a />` element. Otherwise it will render as a `<button />` element. This helps ensure it presents the correct role to assistive technologies for the best accessibility.

#### Loading

Loading links give the user an indication something is happening (eg. a form submission or extra content being loaded) after they have been triggered.

The loading state can be activated by setting the `loading` prop to `true` and providing some `loadingText` for screenreaders to announce when in loading state (which defaults to Loading...).

When the loading state is activated, any click events on the link are disabled.

```tsx
<IressLink loading>Link text</IressLink>;
```

#### Prepend & Append

Use the `prepend` and `append` props to correctly position icons or badges inside links.

- **`prepend`** — Places the element before the link text
- **`append`** — Places the element after the link text

> **⚠️ Do not use `slot` attributes on children** (e.g. `<IressIcon slot="start" />`). The `slot` attribute is a legacy v4 pattern that is no longer supported. Always use the `prepend` and `append` props.

```tsx
<IressInline gap="md">
  <IressLink prepend={<IressIcon name="home" />}>Prepend icon</IressLink>

  <IressLink append={<IressIcon name="home" />}>Append icon</IressLink>
</IressInline>;
```

#### Element

You can use the `element` prop to render a custom component as the link. This is useful for rendering a component from a third-party library, such as `react-router-dom`.

```tsx
import { IressLink } from '@iress-oss/ids-components';
import { type HTMLAttributes, forwardRef } from 'react';

/**
 * This could be the `Link` component from `react-router-dom` or any other routing library.
 */
const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement> & { to: string }
>(({ children, className, to, ...restProps }, ref) => (
  <div className={className}>
    <a href={to} ref={ref} {...restProps}>
      {children}
    </a>
  </div>
));

export const RoutingLink = () => (
  <IressLink element={Link} to="https://iress.com">
    Iress
  </IressLink>
);
```

### Testing

Query links by their accessible role:

```tsx
const link = screen.getByRole('link', { name: 'Learn more' });
```

When no `href` is provided, the link renders as a button:

```tsx
const button = screen.getByRole('button', { name: 'Show details' });
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the link | `getByRole('link', { name: '...' })` when an href is provided, otherwise `getByRole('button', { name: '...' })` | `link` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-link--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders as `<a>` when `href` is provided, otherwise `<button>` |
| Loading | Disables click events and announces `loadingText` to screen readers |
| With `element` prop | Renders as a custom component (e.g. React Router `Link`) |

### Accessibility

**WCAG compliance:**

- **2.4.4 Link Purpose** — Link text should describe its destination or action
- **4.1.2 Name, Role, Value** — Renders correct role (`link` or `button`) based on `href`
- **1.3.1 Info and Relationships** — Prepend/append content is included in the accessible name

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Enter` | Activates the link |
| `Tab` | Moves focus to the next focusable element |

### Edge cases

- **No `href` and no `onClick`**: Link renders as a `<button>` with no action — ensure one is always provided
- **Loading state**: Click events are disabled; users cannot trigger the link again until loading completes

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-link--docs)