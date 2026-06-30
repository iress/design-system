# SkipLink

> Provides a keyboard-accessible link to skip to the main content area.

## Import

```tsx
import { IressSkipLink } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skip-link--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/SkipLink)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=skip-link&title=[SkipLink]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=skip-link,enhancement&title=[SkipLink]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | `boolean` | — | Sets the active state of the button, usually used to indicate the button has activated a modal, popover or slideout. |
| append | `ReactNode` | — | Content for the append slot. |
| children | `ReactNode` | `Skip to content` | Content is placed between prepend and append if provided. Used to describe the expected action of this button. Description of where the skip link jumps to. |
| compact | `boolean` | — | Makes the button more compact by reducing padding and font size. Used for buttons with icon only or when space is limited. |
| element | `ElementType` | — | Change the component that will be rendered as the button, used for third-party libraries that require a specific element type. By default, it will render a button or an anchor tag based on the `href` prop. |
| fluid | `any` | — | If `true`, the button will stretch to fill it's container. The prop is responsive, so you can set the breakpoint(s) at which the button will be fluid.  All breakpoints: `fluid={true}` Up to a specific breakpoint: `fluid="md"` |
| href | `string` | — | Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered. Contains a URL or a URL fragment that the skip link points to. If this property is set, an anchor tag will be rendered. |
| icon | [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols) | — | The icon to be displayed in the button. If provided, the icon will be displayed and the `children` will be used as screen reader text (although you can explicitly override this with `aria-label`) |
| loading | `boolean, string ` | — | When true, button is in loading state. If provided a string, will be used as the loading text for screen readers. |
| mode | `muted` , `primary` , `quaternary`, `secondary` , `tertiary`  | — | Style of the button. - Primary: Used for the main action on a page. Usually only used once per screen. - Secondary: Used for secondary actions on a page, often an action on multiple `IressPanel`s. Can used multiple times per screen. - Tertiary: Used for tertiary actions on a page, often the secondary action on multiple `IressPanel`s. Can used multiple times per screen. - Quaternary: Used for less prominent actions, often used for preference toggles (eg. Collapse all). - Muted: Used for less prominent actions, often used inline with headings. They are mainly used with icons only.  **Migrating to version 6** - `link` mode has been removed. If it is an action, use the `tertiary` mode. If it is a link inside a paragraph, use the new `IressLink` component instead. - `danger` has been removed. Please use the `status` prop instead. - `positive` and `success` have been removed. Please use the `status` prop instead. |
| onClick | `MouseEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when the menu item is clicked. |
| prepend | `ReactNode` | — | Content for the prepend slot. |
| noWrap | `boolean` | — | Prevents text wrapping if set to true. |
| status | `danger` , `success` | — | An optional status to assign to the button. - `success`: Indicates a successful or positive action. - `danger`: Indicates a dangerous or potentially negative action. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| value | `[FormControlValue](../../dist/types.d.ts)` | — | The value of the button, when used in `IressButtonGroup`. |

📄 [Full type definition](../../dist/components/SkipLink/SkipLink.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

The skip link component allows keyboard users to quickly bypass the top-level navigation links and jump to the main content on a page.

```tsx
<IressContainer py="xl">
  <IressSkipLink href="#main" id="skip-link" />
  <main id="main" tabIndex={-1}>
    <IressPanel>
      <p>
        This is where the main content <code>id=&quot;main&quot;</code> of the
        application is located. It is important that whatever your skip link is
        targeting is <strong>focusable</strong>. If its a non-interactive
        element, this can be done by adding <code>tabindex=&quot;-1&quot;</code>{' '}
        to the element.
      </p>

      <p>
        The skip link is{' '}
        <a
          href="#skip-link"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('skip-link')?.focus();
          }}
        >
          hidden until it is focused
        </a>
        .
      </p>
    </IressPanel>
  </main>
</IressContainer>;
```

## Design

### When to use

- **Every page**: Include a skip link at the top of every page with navigation
- **Keyboard accessibility**: Essential for users who navigate by keyboard or screen reader

### When not to use

- **Pages without navigation** — skip links are unnecessary when there's no content to bypass

### Related patterns

- [Provider](../components/provider.md) — sets up the app-level wrapper where skip links are typically placed

## Develop

### Quick Start

```tsx
import { IressSkipLink } from '@iress-oss/ids-components';

<IressSkipLink href="#main" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skiplink--docs#api-props)

### Usage

The skip link component is visually hidden until it is tabbed to. When focused, it appears and allows the user to jump to the target element.

### Testing

Query the skip link by its role. When `href` is provided it renders as a link,
otherwise as a button:

```tsx
const skipLink = screen.getByRole('link', { name: 'Skip to content' });
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the skip link | `getByRole('link', { name: 'Skip to content' })` | `skip-link` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skiplink--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Visually hidden, positioned off-screen |
| Focused | Becomes visible at the top of the page |
| Activated | Moves focus to the target element (`href`) |

### Accessibility

- **WCAG 2.4.1 Bypass Blocks** — provides a mechanism to skip repeated navigation
- Renders as `<a>` (with `href`) or `<button>` (without `href`)
- Visually hidden until focused via keyboard

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Reveals the skip link when it receives focus |
| `Enter` | Activates the skip link and moves focus to the target |