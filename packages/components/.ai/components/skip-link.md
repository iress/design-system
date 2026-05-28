# 
> **Component:** `import { IressSkipLink } from '@iress-oss/ids-components'`
> **Storybook:** [ in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-skip-link--docs)```tsx
```

## Quick Start

```tsx
<IressSkipLink href="#main" />
```

## Behaviour

- The skip link component is visually hidden until it is tabbed to.

## Testing

Query the skip link by its role. When `href` is provided it renders as a link,
otherwise as a button:

```tsx
const skipLink = screen.getByRole('link', { name: 'Skip to content' });
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-skip-link--docs)
