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