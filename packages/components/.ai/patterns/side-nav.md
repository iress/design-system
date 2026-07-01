# SideNav

> Provides a vertical navigation menu typically used in application sidebars.

## Import

```tsx
import { IressSideNav } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-side-nav--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/SideNav)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=side-nav&title=[Side Nav]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=side-nav,enhancement&title=[Side Nav]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activeItemKey | `string` | — | Key of the active rail item. Sets the initial selection and can be updated externally. Rail clicks update the internal active item automatically. Key of the active rail item. Optional when sideMenuItems is provided — used only for rail highlighting. |
| sideMenuItems | `[IressSideNavPanelItem](../../dist/patterns/SideNav/SideNav.d.ts)[]` | — | Override: content to display in the side panel instead of `items[activeItemKey].children`. Can be flat items, groups, or a mix. |
| **items** | `[IressSideNavItem](../../dist/patterns/SideNav/SideNav.d.ts)[]` | — | Array of navigation items defining the rail icons. |
| onActiveItemKeyChange | `((key: string) => void)` | — | Callback fired when the active item changes via a rail click. |
| sideMenuLabel | `ReactNode` | — | Override: label displayed at the top of the side panel. When provided alongside sideMenuItems, this replaces the active item's label. |
| expanded | `boolean` | — | Whether the side panel is expanded (controlled). |
| defaultExpanded | `boolean` | `false` | Default expanded state (uncontrolled). |
| onExpandedChange | `((expanded: boolean) => void)` | — | Callback when the expanded state changes. |
| numbered | `boolean` | `false` | Whether to show numbered headers in the expanded side menu. |
| header | `ReactNode` | — | Content rendered at the top of the expanded side panel. |
| footer | `ReactNode` | — | Content rendered at the bottom of the expanded side panel. |
| aria-label | `string` | `Side navigation` | Accessible label for the navigation landmark. |
| expandLabel | `string` | `Expand navigation` | Label text for the expand button (accessibility). |
| collapseLabel | `string` | `Collapse navigation` | Label text for the collapse button (accessibility). |
| width | `number, string ` | `'250px'` | Width of the side panel when expanded. Can be a CSS length value or number (pixels). |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/patterns/SideNav/SideNav.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A side navigation pattern that combines a rail (icon-only bar) with an expandable side menu panel. Provides a data-driven API where items are passed as an array, with the rail acting as the main navigation and the side menu showcasing children under each navigation group.

```tsx
import { IressSideNav } from '@iress-oss/ids-components';

export function SideNavDefault() {
  return (
    <IressSideNav
      activeItemKey="hubs"
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            {
              key: 'basic',
              label: 'Basic Details',
              href: '/hubs/basic-details',
            },
            {
              key: 'dependants',
              label: 'Dependants',
              href: '/hubs/dependants',
            },
            {
              key: 'employment',
              label: 'Employment',
              href: '/hubs/employment',
            },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          divider: true,
          children: [
            {
              key: 'holdings',
              label: 'Holdings',
              href: '/portfolios/holdings',
            },
            {
              key: 'transactions',
              label: 'Transactions',
              href: '/portfolios/transactions',
            },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
        },
      ]}
    />
  );
}
```

## Design

### When to use

- **Application shell navigation**: Provide persistent top-level navigation alongside content areas
- **Multi-section apps**: When the application has several major sections, each with its own sub-navigation
- **Progressive disclosure**: Show high-level categories on the rail and reveal detail in the expandable panel
- **Compact layouts**: Maximise content space by defaulting to a collapsed icon rail

### When not to use

- **Simple sites with few pages**: Use a standard horizontal nav or sidebar link list instead
- **Deeply nested hierarchies**: SideNav supports one level of children; for deeper nesting consider tree views
- **Temporary or contextual actions**: Use `IressContextualMenu` or `IressDropdownMenu` for action menus
- **Mobile-first layouts**: The rail + panel pattern is designed for desktop viewports; on mobile consider a hamburger menu or bottom navigation

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Limit to 7 top-level navigation items | Exceed 7 top-level items — it overwhelms users |
| Use icons consistently across all rail items | Mix items with and without icons in the rail |
| Highlight the active section clearly | Use SideNav for temporary or contextual actions |

### Content guidelines

- Keep labels short — 1–2 words per navigation item
- Use sentence case for all labels
- Ensure labels clearly describe the destination section

### Related patterns

- [Menu](../components/menu.md) — for simpler navigation lists
- [TabSet](../components/tab-set.md) — for switching between views within a page
- [Breadcrumbs](../patterns/breadcrumbs.md) — for showing hierarchical location

## Develop

### Quick Start

```tsx
import { IressSideNav } from '@iress-oss/ids-components';

<IressSideNav
  activeItemKey="hubs"
  items={[
    {
      key: 'hubs',
      label: 'Hubs',
      icon: 'hub',
      href: '/hubs',
      children: [
        {
          key: 'basic',
          label: 'Basic Details',
          href: '/hubs/basic-details',
        },
      ],
    },
  ]}
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-side-nav--docs#api-props)

### Usage

The `IressSideNav` component accepts an `items` array that defines the rail navigation items. Each item can optionally include `children` sub-items that are shown in the expandable side panel when that item is active.

The `activeItemKey` prop controls which rail item is currently selected — typically derived from the current route in your application.

```tsx
import { IressSideNav } from '@iress-oss/ids-components';

export function SideNavDefault() {
  return (
    <IressSideNav
      activeItemKey="hubs"
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            {
              key: 'basic',
              label: 'Basic Details',
              href: '/hubs/basic-details',
            },
            {
              key: 'dependants',
              label: 'Dependants',
              href: '/hubs/dependants',
            },
            {
              key: 'employment',
              label: 'Employment',
              href: '/hubs/employment',
            },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          divider: true,
          children: [
            {
              key: 'holdings',
              label: 'Holdings',
              href: '/portfolios/holdings',
            },
            {
              key: 'transactions',
              label: 'Transactions',
              href: '/portfolios/transactions',
            },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
        },
      ]}
    />
  );
}
```

#### Header and footer

The `header` and `footer` props accept any `ReactNode`, allowing you to place a search bar, branding, version info, or other content in the expanded panel.

```tsx
import { IressInput, IressSideNav, IressText } from '@iress-oss/ids-components';

export function SideNavWithHeaderFooter() {
  return (
    <IressSideNav
      activeItemKey="portfolios"
      defaultExpanded
      header={
        <IressInput
          type="search"
          placeholder="Search navigation..."
          variant="search"
        />
      }
      footer={<IressText element="small">v2.4.1</IressText>}
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            {
              key: 'basic',
              label: 'Basic Details',
              href: '/hubs/basic-details',
            },
            {
              key: 'dependants',
              label: 'Dependants',
              href: '/hubs/dependants',
            },
          ],
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          children: [
            {
              key: 'holdings',
              label: 'Holdings',
              href: '/portfolios/holdings',
            },
            {
              key: 'transactions',
              label: 'Transactions',
              href: '/portfolios/transactions',
            },
          ],
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
        },
      ]}
    />
  );
}
```

#### Grouped children

If your navigation has logical groupings, you can use the `children` property on child items to visually separate them in the side panel.

```tsx
import { IressSideNav } from '@iress-oss/ids-components';

export function SideNavGrouped() {
  return (
    <IressSideNav
      activeItemKey="hubs"
      defaultExpanded
      numbered
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            {
              key: 'personal',
              label: 'Personal',
              active: true,
              children: [
                {
                  key: 'basic',
                  label: 'Basic Details',
                  href: '/hubs/basic-details',
                },
                {
                  key: 'dependants',
                  label: 'Dependants',
                  href: '/hubs/dependants',
                },
              ],
            },
            {
              key: 'financial',
              label: 'Financial',
              children: [
                {
                  key: 'employment',
                  label: 'Employment',
                  href: '/hubs/employment',
                },
                { key: 'tax', label: 'Tax Details', href: '/hubs/tax' },
              ],
            },
          ],
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          children: [
            {
              key: 'holdings',
              label: 'Holdings',
              href: '/portfolios/holdings',
            },
            {
              key: 'transactions',
              label: 'Transactions',
              href: '/portfolios/transactions',
            },
          ],
        },
      ]}
    />
  );
}
```

#### Controlled state

Manage `expanded` and `activeItemKey` externally for full control over the navigation state.

```tsx
import { useState } from 'react';
import {
  IressCol,
  IressContainer,
  IressRow,
  IressSideNav,
  IressText,
  type SideNavItem,
} from '@iress-oss/ids-components';

const items: SideNavItem[] = [
  {
    key: 'hubs',
    icon: 'hub',
    label: 'Hubs',
    children: [
      { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
      { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
      { key: 'individual', label: 'Individual', href: '/hubs/individual' },
    ],
  },
  {
    key: 'portfolios',
    icon: 'bar_chart',
    label: 'Portfolios',
    divider: true,
    children: [
      {
        key: 'returns',
        label: 'Investment Returns',
        href: '/portfolios/returns',
      },
      { key: 'strategy', label: 'Strategy', href: '/portfolios/strategy' },
      { key: 'holdings', label: 'Holdings', href: '/portfolios/holdings' },
    ],
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
  },
];

export const SideNavControlled = () => {
  const [activeKey, setActiveKey] = useState('hubs');
  const [expanded, setExpanded] = useState(true);

  return (
    <IressContainer fluid stretch px="spacing.2">
      <IressRow stretch gutter="spacing.4">
        <IressSideNav
          items={items}
          activeItemKey={activeKey}
          onActiveItemKeyChange={setActiveKey}
          expanded={expanded}
          onExpandedChange={setExpanded}
        />
        <IressCol p="spacing.4">
          <IressText>
            <h2>Active section: {activeKey}</h2>
            <p>
              Expanded: <strong>{expanded ? 'Yes' : 'No'}</strong>
            </p>
          </IressText>
        </IressCol>
      </IressRow>
    </IressContainer>
  );
};
```

#### Dynamic side menu

Use the `sideMenuItems` prop to override the side panel content with dynamically fetched or context-dependent sub-items.

```tsx
import { useState } from 'react';
import { IressSideNav, type SideNavPanelItem } from '@iress-oss/ids-components';

const menusBySection: Record<string, SideNavPanelItem[]> = {
  hubs: [
    {
      key: 'client-details',
      label: 'Client Details',
      active: true,
      children: [
        { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
        { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
        { key: 'individual', label: 'Individual', href: '/hubs/individual' },
      ],
    },
    {
      key: 'financial',
      label: 'Financial Information',
      children: [
        { key: 'employment', label: 'Employment', href: '/hubs/employment' },
        { key: 'tax', label: 'Tax Details', href: '/hubs/tax' },
      ],
    },
  ],
  portfolios: [
    {
      key: 'investments',
      label: 'Investments',
      active: true,
      children: [
        { key: 'holdings', label: 'Holdings', href: '/portfolios/holdings' },
        { key: 'returns', label: 'Returns', href: '/portfolios/returns' },
      ],
    },
    {
      key: 'trading',
      label: 'Trading',
      children: [
        { key: 'orders', label: 'Orders', href: '/portfolios/orders' },
        { key: 'history', label: 'History', href: '/portfolios/history' },
      ],
    },
  ],
};

const labels: Record<string, string> = {
  hubs: 'Client Hub',
  portfolios: 'Portfolio Manager',
};

export function SideNavDynamicMenu() {
  const [activeKey, setActiveKey] = useState('hubs');

  return (
    <IressSideNav
      activeItemKey={activeKey}
      expanded
      numbered
      width="300px"
      sideMenuLabel={labels[activeKey] ?? 'Navigation'}
      sideMenuItems={menusBySection[activeKey]}
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          onClick: () => {
            setActiveKey('hubs');
          },
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          divider: true,
          onClick: () => {
            setActiveKey('portfolios');
          },
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
          onClick: () => {
            setActiveKey('admin');
          },
        },
      ]}
    />
  );
}
```

#### Custom routing

Use the `element` prop on each item for integration with third-party routing libraries like React Router or Next.js.

```tsx
import { IressSideNav, type SideNavItem } from '@iress-oss/ids-components';
import { type HTMLAttributes, forwardRef } from 'react';

/**
 * This could be the `Link` component from `react-router-dom`, Next.js, or any other routing library.
 * It receives `href` and renders as an anchor internally.
 */
const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement> & { href: string }
>(({ children, className, href, ...restProps }, ref) => (
  <a className={className} href={href} ref={ref} {...restProps}>
    {children}
  </a>
));

const items: SideNavItem[] = [
  {
    key: 'hubs',
    icon: 'hub',
    label: 'Hubs',
    href: '/hubs',
    element: Link,
    children: [
      {
        key: 'basic',
        label: 'Basic Details',
        href: '/hubs/basic-details',
        element: Link,
      },
      {
        key: 'dependants',
        label: 'Dependants',
        href: '/hubs/dependants',
        element: Link,
      },
      {
        key: 'individual',
        label: 'Individual',
        href: '/hubs/individual',
        element: Link,
      },
    ],
  },
  {
    key: 'portfolios',
    icon: 'bar_chart',
    label: 'Portfolios',
    href: '/portfolios',
    element: Link,
    divider: true,
    children: [
      {
        key: 'returns',
        label: 'Investment Returns',
        href: '/portfolios/returns',
        element: Link,
      },
      {
        key: 'strategy',
        label: 'Strategy',
        href: '/portfolios/strategy',
        element: Link,
      },
    ],
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
    element: Link,
  },
];

export const SideNavRouting = () => (
  <IressSideNav items={items} activeItemKey="hubs" defaultExpanded />
);
```

##### Integration with routing

SideNav is designed to work with any routing library:

```tsx
// Next.js
import Link from 'next/link';

const items = [
  { key: 'home', icon: 'home', label: 'Home', href: '/', element: Link },
];

// React Router
import { Link } from 'react-router-dom';

const items = [
  { key: 'home', icon: 'home', label: 'Home', href: '/', element: Link },
];
```

Derive `activeItemKey` from the current route:

```tsx
// Next.js
const activeSection = usePathname().split('/')[1];

// React Router
const activeSection = useLocation().pathname.split('/')[1];
```

## Specifications

### Accessibility

- The root element is a `<nav>` landmark with a configurable `aria-label` (default: "Side navigation")
- The expand/collapse toggle button includes `aria-expanded` to communicate state
- Rail items use tooltips with the item label for screen reader accessibility
- The side panel is marked `aria-hidden` when collapsed
- Keyboard navigation is supported through the underlying `IressMenu` component
- Custom `expandLabel` and `collapseLabel` props allow localisation of toggle button labels

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus between rail items and side panel items |
| `Enter` / `Space` | Activates the focused rail item or expands/collapses the panel |
| `ArrowDown` | Moves focus to the next item in the rail or side panel |
| `ArrowUp` | Moves focus to the previous item in the rail or side panel |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-side-nav--docs)