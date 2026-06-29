# Breadcrumbs

> Shows the current location within a navigational hierarchy.

## Import

```tsx
import { IressBreadcrumbs } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-breadcrumbs--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Breadcrumbs)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=breadcrumbs&title=[Breadcrumbs]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=breadcrumbs,enhancement&title=[Breadcrumbs]+Feature:+)

Breadcrumbs are a secondary navigation aid that helps users understand their current location within the site hierarchy and provides a simple way to navigate back to higher-level pages.

```tsx
<IressBreadcrumbs
  items={[{ label: 'Home', href: '/' }, { label: 'Current Page' }]}
/>;
```

## Design

### When to use

- **Site hierarchy navigation**: Help users understand where they are in a multi-level site structure
- **Secondary navigation**: Provide an alternative way to navigate back to parent pages
- **Context awareness**: Show the current page's relationship to parent sections

### When not to use

- **Single-level sites**: If your site has no hierarchy, breadcrumbs aren't necessary
- **Primary navigation**: Breadcrumbs are supplementary; don't rely on them as the only navigation

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep labels concise and descriptive | Use breadcrumbs as primary navigation |
| Make the current page the last item and not clickable | Make the current page item a clickable link |
| Position breadcrumbs near the top of the page, below primary navigation | Place breadcrumbs at the bottom of the page |
| On mobile, consider showing only the parent page link | Show the full breadcrumb trail on small screens |

### Content guidelines

- Use the actual page title as the breadcrumb label for consistency
- The last item should represent the current page and not be a link

### Related patterns

- [SideNav](../patterns/side-nav.md) — for persistent hierarchical navigation
- [Menu](../components/menu.md) — for navigation link lists
- [Link](../components/link.md) — for inline navigation to other pages

## Develop

### Quick Start

```tsx
import { IressBreadcrumbs } from '@iress-oss/ids-components';

<IressBreadcrumbs
  items={[{ label: 'Home', href: '/' }, { label: 'Current Page' }]}
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-breadcrumbs--docs#api-props)

### Usage

#### Items

This is the only required prop for the `IressBreadcrumbs` component, which defines the breadcrumb items to be displayed.

- **label**: The text displayed for the breadcrumb item
- **href**: The URL to navigate to when the item is clicked (optional for the current page)

This example demonstrates all supported breadcrumb configurations side by side.

```tsx
import {
  IressBreadcrumbs,
  IressPanel,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function BreadcrumbsAllConfigurations() {
  return (
    <IressPanel>
      <IressStack gap="xl">
        <IressStack>
          <IressText element="h3">2 Breadcrumbs</IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[{ label: 'Home', href: '/' }, { label: 'Current' }]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">3 Breadcrumbs</IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Details' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">4 Breadcrumbs</IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Category', href: '/category' },
              { label: 'Subcategory', href: '/subcategory' },
              { label: 'Details' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">
            5+ Breadcrumbs (with default overflow)
          </IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Level 1', href: '/l1' },
              { label: 'Level 2', href: '/l2' },
              { label: 'Level 3', href: '/l3' },
              { label: 'Level 4', href: '/l4' },
              { label: 'Current' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">
            5+ Breadcrumbs (with overflow disabled)
          </IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Level 1', href: '/l1' },
              { label: 'Level 2', href: '/l2' },
              { label: 'Level 3', href: '/l3' },
              { label: 'Level 4', href: '/l4' },
              { label: 'Current' },
            ]}
            limit={0}
          />
        </IressStack>
      </IressStack>
    </IressPanel>
  );
}
```

#### Integration with routing libraries

##### React Router

```tsx
import { Link } from 'react-router-dom';

<IressBreadcrumbs
  items={[
    { label: 'Home', href: '/', element: Link },
    { label: 'Products', href: '/products', element: Link },
    { label: 'Details' },
  ]}
/>;
```

##### Next.js

```tsx
import Link from 'next/link';

<IressBreadcrumbs
  items={[
    { label: 'Home', href: '/', element: Link },
    { label: 'Products', href: '/products', element: Link },
    { label: 'Details' },
  ]}
/>;
```

## Specifications

### Accessibility

- **Semantic HTML**: Uses `<nav>`, `<ol>`, and `<li>` elements for proper structure
- **ARIA labels**: `aria-label` identifies the navigation as breadcrumbs
- **Current page**: `aria-current="page"` marks the current page item
- **Keyboard navigation**: All links are keyboard accessible via Tab key
- **Screen readers**: Separators are hidden from screen readers with `aria-hidden="true"`
- **Focus indicators**: Visible focus rings for keyboard navigation

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the next breadcrumb link |
| `Shift+Tab` | Moves focus to the previous breadcrumb link |
| `Enter` | Activates the focused breadcrumb link |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-breadcrumbs--docs)