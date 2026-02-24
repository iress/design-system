# SideNav Pattern Component — Implementation Plan

## Problem Summary

Create a new `SideNav` pattern component for the Iress Design System that provides an opinionated side navigation experience. This pattern wraps the existing `IressMenu` component (with its `side` and `rail` variants) behind a simple, data-driven API where items are passed as an array rather than composed as children. The rail acts as the main navigation, and the side menu variant showcases the children under the main navigation.

---

## Figma Design Links

1. **Overview**: [SideNav Overview](https://www.figma.com/design/ilgbCkPI7jwNHoOg93y18n/Xtool-?node-id=2429-14893&t=NfpjbeJ87kTdxtCP-4)
2. **Details**: [SideNav Details](https://www.figma.com/design/ilgbCkPI7jwNHoOg93y18n/Xtool-?node-id=2429-14887&t=NfpjbeJ87kTdxtCP-4)
3. **Documentation**: [Usage Guidelines](https://www.figma.com/design/ilgbCkPI7jwNHoOg93y18n/Xtool-?node-id=3806-64056&t=NfpjbeJ87kTdxtCP-4)
4. **Prototype**: [Interactive Demo](https://www.figma.com/design/ilgbCkPI7jwNHoOg93y18n/Xtool-?node-id=3829-79110&t=NfpjbeJ87kTdxtCP-4)

---

## Design Analysis (from Figma MCP)

### Overview Screenshot (node `2429:14893`)

Shows two global states side-by-side:

- **Expanded: False** — A narrow dark-blue **rail** displaying icon-only menu items vertically, with an expand (`>>`) button at the bottom.
- **Expanded: True** — The rail plus an adjacent **side menu panel** containing a search bar, a "Label" heading, numbered drawer items (01 – 11), and a collapse (`<<`) button at the bottom of the side menu.

### Component Anatomy (from Documentation node `3806:64056`)

The Figma documentation defines the following anatomy with seven numbered parts:

| #   | Part                        | Description                                                                       | Appearance                                                                                   |
| --- | --------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | **Side Rail**               | Narrow vertical bar with icon buttons                                             | Required (always visible)                                                                    |
| 2   | **Menu Items** (rail icons) | Icon-only buttons on the rail (Hubs, My Links, Portfolios, Research, Admin, etc.) | Required                                                                                     |
| 3   | **Menu** (side panel)       | The expanded side menu panel                                                      | Required on Expanded                                                                         |
| 4   | **Header Slot**             | Content area docked at the top of the expanded menu (e.g., search bar, branding)  | Optional on Expanded                                                                         |
| 5   | **Header** (Label)          | Category label above a group of drawer items                                      | Required on Expanded                                                                         |
| 6   | **Drawer**                  | Numbered accordion header item (e.g., "01 Basic Details")                         | Required (States: Default, Hover, Active; Numbers: Optional; Subsection: Optional on Active) |
| 7   | **Drawer: Subsection**      | Child navigation items revealed when a Drawer is active                           | Optional (States: Default, Hover, Active)                                                    |

### Interaction States (from Figma Documentation)

| State    | Trigger                                                                                    | Visual Cue                                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default  | The default idle state                                                                     | Menu is collapsed by default                                                                                                                        |
| Expanded | Triggered by expand side rail button                                                       | Panel expands into its active expanded state                                                                                                        |
| Hover    | User hovers over a menu item                                                               | Menu item shifts in colour to indicate clickability                                                                                                 |
| Active   | Triggered by selecting a menu item                                                         | Menu item icon changes to bold/filled to showcase children, or activates a parent into page. Both indicated with a highlight bar and shift in fill. |
| Focus    | User triggers keyboard navigation onto the first clickable element and proceeds from there | Focus ring appears around relevant interactive elements                                                                                             |

### States Breakdown (from Figma)

1. **Collapsed** — Rail-only view with icon states: Default, Hover, Pressed, Active, Focus
2. **Expanded** — Full view showing rail + side menu with search bar, label, and numbered items
3. **Expanded Drawers** — Drawer (parent) items showing Default, Hover, Active, Focus states
4. **Expanded Subsections** — Child items revealed under an active Drawer with Default, Hover, Active, Focus states

### Rail Menu Item Types (from Details node `2429:14887`)

Each rail icon has four states (Default, Hover, Pressed, Active) across these types:

- Hubs, My Links, Portfolios, Research, Admin
- **Expand** (`>>`) — Triggers expansion of the side panel
- **Collapse** (`<<`) — Triggers collapse of the side panel

### Layout & Configuration (from Figma Text)

- **Vertical Organisation**: Navigation items stacked vertically for easy scanning
- **Side Rail**: Collapsed state remains fixed to the side, providing constant access to top-level categories
- **Search Integration**: Search field at the top of the expanded menu provides a direct way to bypass manual navigation
- **Numbered**: Menu offers an option for number headers to be toggled on or off as per requirements
- **Two-Level Hierarchy**: Parent Level (primary nav category with icon) → Child Level (nested sub-pages/sections)
- **Global States**: Expanded (full width, text labels, icons, search visible) / Collapsed (slim rail, icons only)

---

## Existing Infrastructure Mapping

The SideNav pattern will compose these existing primitives:

| Design Part        | Existing Component            | Variant / Props                                            |
| ------------------ | ----------------------------- | ---------------------------------------------------------- |
| Side Rail          | `IressMenu`                   | `variant="rail"`                                           |
| Rail icon items    | `IressMenuItem`               | `icon`, `value` (inside rail menu)                         |
| Rail groups        | `IressMenuGroup`              | `variant="rail"` (renders sr-only heading + children)      |
| Side Menu panel    | `IressMenu`                   | `variant="side"`                                           |
| Drawer headers     | `IressMenuGroup`              | `variant="side"`, `label`, `active`, `numbered` (optional) |
| Drawer subsections | `IressMenuItem`               | Children inside a `variant="side"` MenuGroup               |
| Header / Footer    | Consumer-provided `ReactNode` | Rendered at top / bottom of the expanded side panel        |
| Expand / Collapse  | `IressMenuItem`               | Dedicated icon button at bottom of rail                    |
| Dividers           | `IressMenuDivider`            | Between rail groups                                        |

---

## Proposed API

### Data Types

```typescript
import type { MaterialSymbol } from 'material-symbols';
import type { ReactNode, ElementType } from 'react';

/**
 * A child navigation item shown under an expanded drawer.
 */
export interface SideNavSubItem<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> {
  /** Unique key for the item. */
  key: string;

  /** Display label for the sub-item. */
  label: ReactNode;

  /** URL for the navigation link — renders an anchor. Primary navigation mechanism. */
  href?: THref;

  /** Custom element type for third-party routing libraries (e.g., React Router Link, Next.js Link). */
  element?: C;

  /** Optional click handler for side-effects (e.g., analytics). Navigation should use `href` instead. */
  onClick?: MouseEventHandler;

  /** Whether this sub-item is currently active/selected. */
  active?: boolean;
}

/**
 * A top-level navigation group with a rail icon and expandable drawer children.
 */
export interface SideNavItem<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> {
  /** Unique key for the group. */
  key: string;

  /** Icon shown on the rail (Material Symbol name). */
  icon: MaterialSymbol;

  /** Display label for the group header (shown in expanded side menu). */
  label: ReactNode;

  /** Accessible label for the rail icon tooltip. */
  ariaLabel?: string;

  /**
   * Child items shown inside the drawer when this group is active.
   * Ignored when `sideMenuItems` is provided on the parent `IressSideNav`.
   */
  children?: SideNavSubItem<C, THref>[];

  /** URL for navigation. Clicking navigates AND opens the side panel (SPA-friendly). */
  href?: THref;

  /** Custom element type for third-party routing libraries (e.g., React Router Link, Next.js Link). */
  element?: C;

  /** Optional click handler for side-effects (e.g., analytics). Navigation should use `href` instead. */
  onClick?: MouseEventHandler;

  /** Show a divider after this group in the rail. */
  divider?: boolean;
}

/**
 * A group of sub-items displayed in the side menu panel.
 * Used with the `sideMenuItems` override prop on `IressSideNav`.
 */
export interface SideNavSideMenuGroup<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> {
  /** Unique key for the group. */
  key: string;

  /** Display label for the drawer header. */
  label: ReactNode;

  /** Child items shown inside this drawer. */
  children: SideNavSubItem<C, THref>[];

  /** Whether this drawer is active/expanded. */
  active?: boolean;
}
```

### Component Props

```typescript
import type { IressStyledProps } from '@/types';

export interface IressSideNavProps extends IressStyledProps<'nav'> {
  /**
   * Array of navigation items defining the rail icons.
   * Each item can optionally include `children` for the side panel (simple mode).
   */
  items: SideNavItem[];

  /**
   * Key of the currently active rail item (controlled).
   * Determines which item is visually active on the rail, and — in simple mode —
   * which item's `children` are displayed in the side panel.
   *
   * Consumers typically derive this from the current route:
   * - Next.js: `usePathname().split('/')[1]`
   * - React Router: `useLocation().pathname.split('/')[1]`
   *
   * Navigation is handled by `href` + `element` on each item — no callback needed.
   */
  activeItemKey?: string;

  /**
   * Override: explicit sub-items to display in the side panel.
   * When provided, these take precedence over `items[activeItemKey].children`.
   * Useful when sub-items are dynamic, fetched per-route, or context-dependent.
   */
  sideMenuItems?: SideNavSideMenuGroup[];

  /**
   * Override: label displayed at the top of the side panel.
   * When provided alongside `sideMenuItems`, this replaces the active item's `label`.
   */
  sideMenuLabel?: ReactNode;

  /**
   * Whether the side panel is expanded (controlled).
   * When omitted, the component manages its own state.
   */
  expanded?: boolean;

  /**
   * Default expanded state (uncontrolled).
   * @default false
   */
  defaultExpanded?: boolean;

  /**
   * Callback when the expanded state changes.
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * Whether to show numbered headers in the expanded side menu.
   * @default false
   */
  numbered?: boolean;

  /**
   * Content rendered at the top of the expanded side panel (e.g., search bar, branding, user info).
   */
  header?: ReactNode;

  /**
   * Content rendered at the bottom of the expanded side panel (e.g., settings link, logout button).
   */
  footer?: ReactNode;

  /**
   * Accessible label for the navigation landmark.
   * @default 'Side navigation'
   */
  'aria-label'?: string;

  /**
   * Label text for the expand button (accessibility).
   * @default 'Expand navigation'
   */
  expandLabel?: string;

  /**
   * Label text for the collapse button (accessibility).
   * @default 'Collapse navigation'
   */
  collapseLabel?: string;
}
```

### Usage Examples

#### Simple Mode — Children in Items

For static navigation structures where each rail item owns its sub-items:

```tsx
import { IressSideNav, type SideNavItem } from '@iress-oss/ids-components';

const navItems: SideNavItem[] = [
  {
    key: 'hubs',
    icon: 'hub',
    label: 'Hubs',
    href: '/hubs',
    children: [
      { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
      { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
      { key: 'individual', label: 'Individual', href: '/hubs/individual' },
    ],
  },
  {
    key: 'links',
    icon: 'share',
    label: 'My Links',
    href: '/links',
    children: [
      {
        key: 'entities',
        label: 'Entities',
        href: '/links/entities',
        active: true,
      },
      { key: 'tax', label: 'Tax details', href: '/links/tax' },
    ],
  },
  {
    key: 'portfolios',
    icon: 'assessment',
    label: 'Portfolios',
    href: '/portfolios',
    divider: true,
    children: [
      {
        key: 'returns',
        label: 'Investment Returns',
        href: '/portfolios/returns',
      },
      { key: 'strategy', label: 'Strategy', href: '/portfolios/strategy' },
    ],
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin', // Direct navigation, no children
  },
];

// Next.js example — activeItemKey derived from the current route
export const SimpleApp = () => {
  const pathname = usePathname();
  const activeSection = pathname.split('/')[1]; // 'hubs', 'links', etc.

  return (
    <IressSideNav
      items={navItems}
      activeItemKey={activeSection}
      numbered
      header={
        <IressInput
          prepend={<IressIcon name="search" />}
          placeholder="Search navigation..."
        />
      }
      footer={<small>v2.4.1</small>}
      aria-label="Main navigation"
    />
  );
};
```

#### Advanced Mode — `sideMenuItems` Override

For dynamic sub-items that are fetched per-route or determined by context:

```tsx
import {
  IressSideNav,
  type SideNavItem,
  type SideNavSideMenuGroup,
} from '@iress-oss/ids-components';

const railItems: SideNavItem[] = [
  { key: 'hubs', icon: 'hub', label: 'Hubs', href: '/hubs' },
  { key: 'links', icon: 'share', label: 'My Links', href: '/links' },
  {
    key: 'portfolios',
    icon: 'assessment',
    label: 'Portfolios',
    href: '/portfolios',
    divider: true,
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
  },
];

// React Router example — activeItemKey derived from the current route
export const AdvancedApp = () => {
  const { pathname } = useLocation();
  const activeSection = pathname.split('/')[1]; // 'hubs', 'links', etc.
  const [sideItems, setSideItems] = useState<SideNavSideMenuGroup[]>([]);

  useEffect(() => {
    // Fetch sub-items dynamically based on the active route
    fetchSubNavigation(activeSection).then(setSideItems);
  }, [activeSection]);

  return (
    <IressSideNav
      items={railItems}
      activeItemKey={activeSection}
      sideMenuItems={sideItems}
      sideMenuLabel={`${activeSection} Navigation`}
      expanded
      numbered
      aria-label="Main navigation"
    />
  );
};
```

---

## File Structure

```
packages/components/src/patterns/SideNav/
├── index.ts                    # Re-exports
├── SideNav.tsx                 # Main component
├── SideNav.styles.ts           # SVA styles (root, rail, panel, header, footer, etc.)
├── SideNav.stories.tsx         # Storybook stories
├── SideNav.test.tsx            # Tests
├── SideNav.docs.mdx            # Documentation
├── hooks/
│   └── useSideNavState.ts      # Internal hook for expand/collapse + active group state
├── meta/
│   └── (component thumbnail)
└── mocks/
    └── sideNavItems.ts         # Reusable mock data for stories & tests
```

---

## Implementation Checklist

### Phase 1: Setup & Data Types

- [ ] Create directory structure `packages/components/src/patterns/SideNav/`
- [ ] Define `SideNavItem`, `SideNavSubItem`, `SideNavSideMenuGroup`, `IressSideNavProps` types in `SideNav.tsx`
- [ ] Add `SideNav` to `GlobalCSSClass` enum in `packages/components/src/enums.ts`
- [ ] Add export in `packages/components/src/main.ts`: `export * from './patterns/SideNav';`
- [ ] Create `index.ts` with re-exports

### Phase 2: Internal Hook — `useSideNavState`

- [ ] Implement `useSideNavState` hook managing:
  - Expanded/collapsed state (controlled + uncontrolled via `useControlledState`)
  - Active item key tracking (reads `activeItemKey` prop)
  - Side panel content resolution: use `sideMenuItems` if provided, otherwise fall back to `items[activeItemKey].children`
  - Auto-expand: when `activeItemKey` changes to an item with children, auto-expand the panel (if uncontrolled)
  - Toggle expand/collapse via dedicated button
- [ ] Write unit tests for the hook

### Phase 3: Styles — `SideNav.styles.ts`

- [ ] Define SVA recipe with slots:
  - `root` — outermost `<nav>` container (flexbox row)
  - `rail` — wrapper around the rail `IressMenu` (fixed-width dark column)
  - `panel` — expanded side menu container (slides in/out)
  - `header` — top slot area inside the expanded panel
  - `footer` — bottom slot area inside the expanded panel
  - `toggle` — expand/collapse button area at rail bottom
- [ ] Use design tokens from Panda CSS (`colour.primary.fill`, `spacing.*`, etc.)
- [ ] Add variant for `expanded: true | false` controlling panel visibility
- [ ] Match Figma specs: rail width ~50px, panel width ~321px, dark-blue rail bg, white panel bg

### Phase 4: Main Component — `SideNav.tsx`

- [ ] Compose the layout:
  1. `<nav>` root with `aria-label`
  2. Rail section: `<IressMenu variant="rail">` containing `<IressMenuGroup>` / `<IressMenuItem>` per item
  3. Expand/Collapse `<IressMenuItem>` with `keyboard_double_arrow_right` / `keyboard_double_arrow_left` icon
  4. Panel section (conditionally rendered or animated): `<IressMenu variant="side" numbered={numbered}>` containing `<IressMenuGroup variant="side">` per active group's children
  5. `header` slot rendered at the top of the panel (if provided)
  6. `footer` slot rendered at the bottom of the panel (if provided)
- [ ] Map `items` array to `IressMenuItem` (rail) and `IressMenuGroup` + `IressMenuItem` (side menu)
- [ ] Forward per-item `href`, `onClick`, and `element` props to the underlying `IressMenuItem` instances
- [ ] Support controlled (`expanded`) and uncontrolled (`defaultExpanded`) expansion
- [ ] Support controlled `activeItemKey` (consumer derives from route)
- [ ] Resolve side panel content: if `sideMenuItems` is provided, render those; otherwise render `items[activeItemKey].children`
- [ ] If `sideMenuLabel` is provided, use it as the panel heading; otherwise use `items[activeItemKey].label`
- [ ] Auto-expand panel when `activeItemKey` changes to an item with children (when expansion is uncontrolled)
- [ ] Use `propagateTestid` for nested `data-testid` propagation
- [ ] Add `GlobalCSSClass.SideNav` to root element

### Phase 5: Mock Data — `mocks/sideNavItems.ts`

- [ ] Create realistic mock data reflecting the Figma prototype (Hubs, My Links, Portfolios, Research, Admin)
- [ ] Include items with children (simple mode), items without children (direct href), dividers
- [ ] Create separate mock for `SideNavSideMenuGroup[]` to demonstrate the `sideMenuItems` override

### Phase 6: Stories — `SideNav.stories.tsx`

- [ ] `Default` — Collapsed rail with basic items (children in items)
- [ ] `Expanded` — Pre-expanded with `activeItemKey` showing children from items
- [ ] `Numbered` — Expanded with `numbered` headers
- [ ] `WithHeaderFooter` — Expanded with header (search bar) and footer content
- [ ] `Controlled` — Demonstrating controlled `activeItemKey` + `expanded` state with SPA-style navigation
- [ ] `DynamicSideMenu` — Using `sideMenuItems` override to show dynamically fetched sub-items
- [ ] `CustomRouting` — Example with `element` prop for React Router / Next.js Link integration
- [ ] Use `title: 'Patterns/SideNav'`, tag `['beta']`

### Phase 7: Tests — `SideNav.test.tsx`

- [ ] **Rendering**: Verify rail renders with correct items and icons
- [ ] **Expand/Collapse**: Test toggle expands/collapses panel
- [ ] **Active item (simple mode)**: Test `activeItemKey` displays children from the matching item
- [ ] **Active item change via route**: Test that changing `activeItemKey` prop updates the visible side panel content
- [ ] **Auto-expand**: Verify panel auto-expands when `activeItemKey` changes to an item with children (uncontrolled mode)
- [ ] **sideMenuItems override**: Verify `sideMenuItems` takes precedence over `items[activeItemKey].children`
- [ ] **sideMenuLabel override**: Verify `sideMenuLabel` replaces the active item's label in the panel heading
- [ ] **Fallback**: When `sideMenuItems` is not provided, verify `items[activeItemKey].children` renders in the panel
- [ ] **Sub-item rendering**: Verify children render inside the expanded panel when a group is active
- [ ] **Header/Footer slots**: Verify `header` and `footer` ReactNode content renders inside the expanded panel
- [ ] **Numbered**: Verify `numbered` prop is forwarded to `IressMenu`
- [ ] **Per-item href**: Verify items with `href` render as anchors with correct URLs
- [ ] **Per-item onClick**: Verify `onClick` handlers on items fire correctly
- [ ] **Per-item element**: Verify custom `element` prop is forwarded to `IressMenuItem`
- [ ] **Controlled state**: Test controlled `expanded` and `activeItemKey` props
- [ ] **Keyboard navigation**: Tab through rail items, Enter to select, arrow keys
- [ ] **Accessibility**: `axe` audit, `aria-label` on `<nav>`, `aria-expanded` on toggle, roles
- [ ] **CSS classes**: Verify `GlobalCSSClass.SideNav` and style recipe classes applied

### Phase 8: Documentation — `SideNav.docs.mdx`

- [ ] Component overview with description from Figma
- [ ] Examples for each story: Default, Expanded, Numbered, WithHeaderFooter
- [ ] Anatomy section explaining the seven parts from Figma
- [ ] Accessibility section covering keyboard navigation and screen reader behaviour
- [ ] Integration guidance for routing libraries

### Phase 9: Final Checks

- [ ] Run `yarn test:components SideNav.test.tsx` — all pass
- [ ] Run `yarn lint:components` — no errors
- [ ] Run `yarn workspace @iress-oss/ids-components exec npx eslint src/patterns/SideNav --fix`
- [ ] Verify Storybook renders correctly with `yarn storybook`
- [ ] Verify no regressions in existing Menu component tests
- [ ] Create component meta/thumbnail for Storybook

---

## Key Design Decisions

### 1. Pattern vs Component

This lives under `src/patterns/` (not `src/components/`) because it is an **opinionated composition** of existing primitives (`IressMenu`, `IressMenuItem`, `IressMenuGroup`, `IressInput`), similar to how `ContextualMenu` and `Breadcrumbs` are patterns.

### 2. Data-Driven API

Following the precedent set by `IressContextualMenu` and `IressBreadcrumbs`, items are passed as a typed array rather than requiring JSX children composition. This provides:

- Simpler consumer API
- Easier serialization/dynamic generation from server data
- Type-safe item structure

### 3. Wrapping Existing `variant="rail"` and `variant="side"`

The `IressMenu` component already supports `variant="rail"` (dark icon-only bar) and `variant="side"` (numbered accordion drawer). The `IressMenuGroup` already handles `variant="side"` with expandable drawers and `variant="rail"` with sr-only headings. The SideNav pattern composes these together with orchestration logic.

### 4. Hybrid API — Children in Items + `sideMenuItems` Override

The component supports two modes for populating the side panel:

- **Simple mode (default):** Each `SideNavItem` can include a `children` array. The component reads `items[activeItemKey].children` to populate the side panel. This is ideal for static navigation structures that can be defined declaratively in a single data structure.

- **Advanced mode (`sideMenuItems` override):** The consumer provides `sideMenuItems` directly on `IressSideNav`. When present, this takes precedence over any `children` on individual items. This is useful when sub-items are dynamic (fetched per-route, context-dependent, or filtered). An optional `sideMenuLabel` overrides the panel heading.

This hybrid approach ships the simple API first while providing an escape hatch for advanced use cases. The override is fully opt-in and backward-compatible — consumers who don't need it never see it.

### 5. Route-Derived Active Item (No Callback Needed)

The `activeItemKey` prop is controlled — the consumer provides it, typically derived from the current route:

```tsx
// Next.js
const activeSection = usePathname().split('/')[1];
// React Router
const activeSection = useLocation().pathname.split('/')[1];
```

Rail items use `href` + `element` (framework Link component) for navigation. When the user clicks a rail item:

1. The framework Link navigates (SPA client-side transition)
2. The route changes → component re-renders with a new `activeItemKey`
3. The side panel updates to show the new item's children
4. If expansion is uncontrolled, the panel auto-expands when `activeItemKey` changes to an item with children

No `onActiveItemChange` callback is needed because navigation is handled by the anchor/Link element, and active state is derived from the URL. This avoids redundant state synchronisation and keeps the component purely reactive to route changes. Consumers who need side-effects on rail item clicks can use the per-item `onClick` handler.

### 6. Controlled + Uncontrolled Expansion

The expansion state supports controlled (`expanded` + `onExpandedChange`) and uncontrolled (`defaultExpanded`) modes via `useControlledState`, consistent with other IDS components.

### 7. Generic Header & Footer Slots

Instead of a baked-in search configuration, the expanded panel exposes `header` and `footer` props that accept any `ReactNode`. Consumers can drop in a search bar, branding, user info, a settings link, a version badge — whatever their layout requires. This keeps the component flexible without coupling it to a specific search implementation. The Figma design shows a search bar in the header position, but the slot approach lets consumers swap in any content without API changes.

**Why plain `ReactNode` instead of render props:** We considered `(ctx: { activeItem?: SideNavItem }) => ReactNode` so header/footer could react to the currently active group, but decided against it. The common case is static content (search bar, version badge, logout button) that doesn't depend on active state. Consumers who need context-aware slots are already using controlled mode (`expanded`, active-group state) for routing/breadcrumbs/page title — they can render their header/footer from that same lifted state. Adding a render prop would increase API surface and type complexity (`ReactNode | ((ctx) => ReactNode)`) for a narrow benefit. If real demand appears, widening `ReactNode` to accept a render function is fully backward-compatible, so there's no risk in shipping the simpler version first.

### 8. Navigation-First API (href over onClick)

SideNav is a **navigational** component, not an action menu. The API deliberately puts `href`, `onClick`, and `element` on each item rather than providing centralized `onItemSelect`/`onSubItemSelect` callbacks at the component level. This steers consumers toward using `href` (or `element` for React Router/Next.js), which preserves browser defaults: right-click → open in new tab, middle-click, cmd/ctrl+click, link prefetching, and crawler indexing. Consumers who need imperative side-effects (e.g., analytics) can still add `onClick` per-item. This follows the same per-item pattern used by `IressBreadcrumbs`.

### 9. Expand/Collapse Toggle

The rail includes a dedicated expand/collapse button at the bottom (using `keyboard_double_arrow_right` / `keyboard_double_arrow_left` Material Symbols), matching the Figma prototype. Accessible labels are configurable via `expandLabel` / `collapseLabel` props.

---

## Risk Assessment

| Risk                                                                               | Likelihood | Impact | Mitigation                                                                                 |
| ---------------------------------------------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------ |
| Animation for panel expand/collapse may need CSS transitions not yet in the system | Medium     | Low    | Start without animation; add CSS transition in a follow-up                                 |
| Consumers expecting built-in search filtering                                      | Low        | Low    | Document that `header`/`footer` are generic slots; filtering is consumer responsibility    |
| Third-party routing integration (`element` prop)                                   | Low        | Medium | Follow existing `IressMenuItem` `element` prop pattern                                     |
| Accessibility for two-panel navigation landmarks                                   | Medium     | Medium | Use proper `aria-label`, `aria-expanded`, `role="navigation"` and test with screen readers |

---

## Dependencies

- `IressMenu` (variant `rail` and `side`) — already exists
- `IressMenuItem` — already exists
- `IressMenuGroup` (variant `rail` and `side`) — already exists
- `IressMenuDivider` — already exists
- `IressInput` — already exists (consumers can pass into `header` slot for search)
- `IressIcon` — already exists
- `useControlledState` hook — already exists
- `propagateTestid` helper — already exists
- `GlobalCSSClass` enum — needs one new entry: `SideNav`

No new external dependencies required.
