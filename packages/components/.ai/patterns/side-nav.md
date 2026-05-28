# 
> **Component:** `import { IressSideNav } from '@iress-oss/ids-components'`
> **Storybook:** [ in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-side-nav--docs)```tsx
```

## Quick Start

```tsx
<IressSideNav activeItemKey="hubs" />
```

## Usage

The `IressSideNav` component accepts an `items` array that defines the rail navigation items. Each item can optionally include `children` sub-items that are shown in the expandable side panel when that item is active.

The `activeItemKey` prop controls which rail item is currently selected — typically derived from the current route in your application.

### When to Use

- **Application shell navigation**: Provide persistent top-level navigation alongside content areas
- **Multi-section apps**: When the application has several major sections, each with its own sub-navigation
- **Progressive disclosure**: Show high-level categories on the rail and reveal detail in the expandable panel
- **Compact layouts**: Maximise content space by defaulting to a collapsed icon rail

### When Not to Use

- **Simple sites with few pages**: Use a standard horizontal nav or sidebar link list instead
- **Deeply nested hierarchies**: SideNav supports one level of children; for deeper nesting consider tree views
- **Temporary or contextual actions**: Use `IressContextualMenu` or `IressDropdownMenu` for action menus
- **Mobile-first layouts**: The rail + panel pattern is designed for desktop viewports; on mobile consider a hamburger menu or bottom navigation

## Examples

### Expanded

The side menu expands to show child items when a rail item is active. The `defaultExpanded` prop can be used to have the side menu open by default.

```tsx
<IressSideNav defaultExpanded />
```

[View "Expanded" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-side-nav--expanded)

### Numbered

Show numbered drawer headers in the expanded side menu.

```tsx
<IressSideNav activeItemKey="hubs" defaultExpanded numbered />
```

[View "Numbered" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-side-nav--numbered)

### With Header & Footer

The `header` and `footer` props accept any `ReactNode`, allowing you to place a search bar, branding, version info, or other content in the expanded panel.

```tsx
<IressSideNav activeItemKey="portfolios" defaultExpanded />
```

[View "WithHeaderFooter" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-side-nav--with-header-footer)

### Controlled State

Manage `expanded` and `activeItemKey` externally for full control over the navigation state.

```tsx
<SideNavControlled />
```

[View "Controlled" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-side-nav--controlled)

### Dynamic Side Menu

Use the `sideMenuItems` prop to override the side panel content with dynamically fetched or context-dependent sub-items.

```tsx
<IressSideNav activeItemKey="hubs" sideMenuLabel="Client Hub" defaultExpanded numbered width="300px" />
```

[View "DynamicSideMenu" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-side-nav--dynamic-side-menu)

### Custom Routing

Use the `element` prop on each item for integration with third-party routing libraries like React Router or Next.js.

```tsx
<SideNavRouting />
```

[View "CustomRouting" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_patterns-side-nav--custom-routing)

## Accessibility

- The root element is a `<nav>` landmark with a configurable `aria-label` (default: "Side navigation")
- The expand/collapse toggle button includes `aria-expanded` to communicate state
- Rail items use tooltips with the item label for screen reader accessibility
- The side panel is marked `aria-hidden` when collapsed
- Keyboard navigation is supported through the underlying `IressMenu` component
- Custom `expandLabel` and `collapseLabel` props allow localisation of toggle button labels

## Integration with Routing

SideNav is designed to work with any routing library:

```tsx
// Next.js
const items = [
  { key: 'home', icon: 'home', label: 'Home', href: '/', element: Link },
];

// React Router
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

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_patterns-side-nav--docs)
