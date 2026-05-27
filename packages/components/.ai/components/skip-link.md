# SkipLink

The skip link component allows keyboard users to quickly bypass the top-level navigation links and jump to the main content on a page.

> **Component:** `import { IressSkipLink } from '@iress-oss/ids-components'`
> **Storybook:** [SkipLink in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-skip-link--docs)

## Quick Start

```tsx
import { IressSkipLink } from '@iress-oss/ids-components';

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

## Props

- **Type:** `IressSkipLinkProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/SkipLink/SkipLink.d.ts`

```typescript
import type { IressSkipLinkProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-skip-link--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-skip-link--docs)*
