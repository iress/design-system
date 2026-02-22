# IressMenu `sidemenu` Variant — Implementation Plan

## Figma References

| Node         | Name                          | Description                                                                                                                             |
| ------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `2429:14893` | Menu (page)                   | Full page showing Collapsed (SideRail only) and Expanded (SideRail + SideMenu panel) states                                             |
| `2429:14887` | Master/Menu                   | Internal master components: `.Menu/Header`, `.Menu/Drawer`, `.Menu/SideMenu`, `.Menu/SideRail`, `.Menu/SideRail/MenuItems`              |
| `3806:64056` | Menu (docs)                   | Full specification: interaction states table, layout, anatomy, state matrix (Default, Hover, Active, Focus), Expanded subsection states |
| `3829:79110` | Prototype: Key Insights Panel | Real-world collapsed SideRail prototype with icon buttons and expand toggle                                                             |

---

## Core Design Principle: Variant Inheritance via `MenuContext`

The existing `IressMenu` already has a proven variant inheritance pattern:

```
IressMenu variant="radio"
  └─ MenuContext.variant = "radio"
       └─ IressMenuItem reads menu?.variant === 'radio' → prepends RadioMark
       └─ IressMenuGroup reads variant from context → adjusts rendering

IressMenu variant="subdraw"
  └─ MenuContext.variant = "subdraw"
       └─ IressMenuItem reads menu?.variant === 'subdraw' → appends chevron icon
       └─ IressMenuGroup reads variant → renders Popover fly-over
```

**We follow the exact same pattern for the SideMenu:**

```
IressMenu variant="sidemenu"
  └─ MenuContext.variant = "sidemenu"
       └─ IressMenuItem reads menu?.variant === 'sidemenu' → renders as drawer sub-item
       └─ IressMenuGroup reads variant → renders as numbered/plain header with
          accent bar, step circle, active state, and child drawer container
```

No `IressMenuSideMenuHeader` component needed — `IressMenuGroup` handles it.
No drawer sub-component needed — `IressMenuItem` handles it.

---

## Design Summary (from Figma screenshots)

### Component Architecture (5 Figma sub-components)

1. **`.Menu/SideRail`** — Narrow (50 px) vertical dark-navy bar showing icon-only navigation buttons. Always visible. Contains an expand/collapse toggle at the bottom.
2. **`.Menu/SideRail/MenuItems`** — Individual icon buttons inside the SideRail. Types: `Hubs`, `My Links`, `Portfolios`, `Research`, `Admin`, `Expand`, `Collapse`. States: `Default`, `Hover`, `Pressed`, `Active`.
3. **`.Menu/SideMenu`** — Expanded panel (≈259 px) that appears beside the SideRail. Contains an integrated search bar, a header label (e.g. "Label"), and a list of vertically-stacked menu headers. Two sub-variants: `Numbered=True` (step number circles 01–11) and `Numbered=False` (no number badges, plain text labels).
4. **`.Menu/Header`** → **`IressMenuGroup variant="sidemenu"`** — Individual menu header item. States: `Default` (neutral text, optional step number circle), `Hover` (background highlight), `Active` (navy-blue tinted, left accent bar, may expand child drawers). When active, it can optionally show child subsection/drawer items beneath it.
5. **`.Menu/Drawer`** → **`IressMenuItem` inside a sidemenu-variant group** — A child item under an active Header. States: `Default`, `Hover`, `Active`. Displays a single text label (e.g. "Cashflow") with subtle background.

### Interaction States (from the documentation node `3806:64056`)

| State    | When it occurs                                                                                       | Visual Cue                                                                                                                           |
| -------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Default  | The default idle state                                                                               | Menu is collapsed by default                                                                                                         |
| Expanded | Triggered by relevant side rail button                                                               | Panel expands into its active expanded state                                                                                         |
| Hover    | User hovers with mouse over menu item                                                                | Menu item shifts its colour to indicate clickability                                                                                 |
| Active   | Triggered by user selecting menu item                                                                | Menu item can either expand to show children, or activate as parent only page. Both indicated with a highlight bar and shift to fit. |
| Focus    | User triggers through keyboard navigation onto the first interactive element and proceeds from there | Focus ring appears around relevant interactive elements                                                                              |

### Anatomy Highlights (from spec)

- **Integrated Search** — Search bar with "Placeholder Content" permanently docked at top of expanded menu
- **Hierarchical Labels** — Header label (e.g. "Label") to categorise groups of navigation items
- **Two-Level Hierarchy**:
  - **Parent Level** — Primary navigation category, often featuring an icon and clear numerical or text identification
  - **Child Level** — Nested sub-pages or sections that belong to a specific parent
- **Global States**:
  - **Expanded** — Full menu width with text labels, icons, and search functionality clearly visible
  - **Collapsed** — Slim sidebar rail containing only primary icons to maximise the primary workspace

---

## Architecture: What Changes vs What's New

### Existing Components Modified (variant additions)

| Component            | Change                                              | How it works                                                                                                                                                                                                          |
| -------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`IressMenu`**      | Add `'sidemenu'` to `variant` union type            | `variant="sidemenu"` flows through `MenuContext.variant` to all children, exactly like `'radio'` and `'subdraw'` do today                                                                                             |
| **`IressMenuGroup`** | Add `variant === 'sidemenu'` rendering branch       | When parent Menu's context variant is `'sidemenu'`, `IressMenuGroup` renders as the numbered/plain header with accent bar + child drawer. The `label` prop becomes the header text, children become drawer sub-items. |
| **`IressMenuItem`**  | Add `variant === 'sidemenu'` styling branch         | When inside a `'sidemenu'` variant menu/group, `IressMenuItem` renders with drawer-item styles (subtle background, compact padding, neutral text).                                                                    |
| **`Menu.styles.ts`** | Add `sidemenu` variant styles to the `sva()` recipe | New slot styles for sidemenu header rendering, drawer items, accent bar, step number circle, etc.                                                                                                                     |

### New Components (only the SideRail — a pattern component)

| New Component           | Figma Equivalent           | Purpose                                                                                                       |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `IressMenuSideRail`     | `.Menu/SideRail`           | Vertical icon-only navigation bar (collapsed state). This is a genuinely new pattern — not a variant of Menu. |
| `IressMenuSideRailItem` | `.Menu/SideRail/MenuItems` | Individual icon button inside the rail.                                                                       |

### New Wrapper Component (thin composition layer)

| New Component       | Figma Equivalent | Purpose                                                                                                                                                                  |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IressMenuSideMenu` | `.Menu/SideMenu` | Thin wrapper that composes `IressMenu variant="sidemenu"` with a search bar and label heading. Contains no new behaviour — just layout composition above an `IressMenu`. |

---

## Detailed Changes to Existing Components

### 1. `IressMenu` — Add `'sidemenu'` variant

**File:** `Menu.tsx`

```typescript
// BEFORE
variant?: TMultiple extends true ? never : 'subdraw' | 'radio';

// AFTER
variant?: TMultiple extends true ? never : 'subdraw' | 'radio' | 'sidemenu';
```

That's it. The variant value already flows through `MenuContext.variant` (line ~283 of Menu.tsx). No other changes needed in Menu.tsx.

### 2. `IressMenuGroup` — Add `'sidemenu'` rendering branch

**File:** `MenuGroup/MenuGroup.tsx`

Currently `IressMenuGroup` has two rendering branches:

- `variant === 'subdraw'` → Popover fly-over
- Default (no variant) → Inline heading + children

We add a third branch that activates when the **parent Menu's context variant** is `'sidemenu'`:

```tsx
// Inside IressMenuGroup component:
const menu = useContext(MenuContext);

// New branch: SideMenu variant (inherited from parent IressMenu)
if (menu?.variant === 'sidemenu') {
  return (
    <SideMenuHeader
      label={label}
      numbered={numbered} // ← auto-generates step number from child order
      active={active} // ← controlled/uncontrolled via active/defaultActive
      onActiveChange={onActiveChange}
      data-testid={dataTestId}
    >
      {/* Drawer children revealed with animated height transition when active */}
      {children}
      {divider && <IressMenuDivider />}
    </SideMenuHeader>
  );
}
```

**New props on `IressMenuGroupProps` (only used when variant is `'sidemenu'`):**

```typescript
export type IressMenuGroupProps<...> = MenuGroupRestProps<...> & {
  // ... existing props ...

  /**
   * Whether to display a step number circle badge.
   * When true, the step number is auto-generated from the group's
   * position among sibling IressMenuGroup children (01, 02, 03, ...).
   * Only used when parent Menu has variant="sidemenu".
   */
  numbered?: boolean;

  /**
   * Whether this group header is currently active/expanded, showing child drawer items.
   * Only used when parent Menu has variant="sidemenu".
   * Supports controlled (`active`) and uncontrolled (`defaultActive`) modes.
   */
  active?: boolean;

  /**
   * Uncontrolled default for the active/expanded state.
   * Only used when parent Menu has variant="sidemenu".
   */
  defaultActive?: boolean;

  /**
   * Callback fired when the active/expanded state changes.
   * Only used when parent Menu has variant="sidemenu".
   */
  onActiveChange?: (active: boolean) => void;
};
```

**What `SideMenuHeader` renders** (internal to MenuGroup.tsx, not exported):

```
┌─────────────────────────────────────────┐
│  ┌──────┐                               │  ← top border (1px neutral.40)
│  │  01  │  Basic Details                 │  ← clickable header row
│  └──────┘                               │     auto-numbered circle + label text
├─────────────────────────────────────────┤
│  (when active — animated height reveal)  │
│  │▌ Cashflow                            │  ← child IressMenuItem (drawer style)
│  │▌ Assets                              │     transition: height 150ms ease-in-out
│  │▌ Liabilities                         │
└─────────────────────────────────────────┘
     ↑ 4px navy accent bar on left when active
```

### 3. `IressMenuItem` — Add `'sidemenu'` drawer styling

**File:** `MenuItem/MenuItem.tsx`

Currently `IressMenuItem` checks `menu?.variant` in two places:

- **Prepend logic** (line ~380): `variant === 'radio'` → prepend RadioMark
- **Append logic** (line ~395): `variant === 'subdraw'` → append chevron

We add a third check for `'sidemenu'`:

```tsx
// In the classes computation (line ~355):
const classes = useMemo(
  () =>
    menuStyles({
      // ... existing props ...
      sidemenuDrawer: menu?.variant === 'sidemenu', // ← NEW: triggers drawer-item styles
    }),
  [
    /* ... deps ... */
  ],
);
```

This adds compact padding, neutral bg on hover, `colour.neutral.20` when active, no accent bar — matching the `.Menu/Drawer` Figma component.

### 4. `Menu.styles.ts` — Add `sidemenu` styles to the SVA recipe

**File:** `Menu.styles.ts`

Add new variants and compound variants:

```typescript
variants: {
  // ... existing variants ...

  // NEW: Applied to IressMenuItem when inside a sidemenu-variant menu
  sidemenuDrawer: {
    true: {
      item: {
        bg: 'colour.neutral.20',
        py: 'spacing.2',
        px: 'spacing.4',
        color: 'colour.neutral.70',
        textStyle: 'typography.body.md',

        _hover: {
          bg: 'colour.neutral.30',
        },

        // Override the default selected _before bar — drawer items don't get accent bars
        _before: {
          content: 'none',
        },
      },
    },
  },

  // NEW: Applied to the Menu root when variant is sidemenu
  sidemenuRoot: {
    true: {
      root: {
        overflow: 'hidden',
        width: '[100%]',
      },
    },
  },
},
```

**Note:** The `.Menu/Header` styling for `IressMenuGroup` in sidemenu mode may live in a small dedicated `MenuGroup.styles.ts` file (or added as sidemenu-specific slots in `Menu.styles.ts`), including:

- Step number circle (`28px`, `border-radius: 20px`, `2px solid neutral.70` / `primary.text`)
- Active header background (`neutral.20`)
- Active accent bar (`4px solid primary.fill` on left)
- Drawer container wrapper

---

## New Components (SideRail only)

### 5. `IressMenuSideRail` (NEW — pattern component)

**Figma**: `.Menu/SideRail` (node `3492:28487`)

**File structure:**

```
MenuSideRail/
├── index.ts
├── MenuSideRail.tsx
├── MenuSideRail.styles.ts
├── MenuSideRail.stories.tsx
├── MenuSideRail.test.tsx
└── MenuSideRail.docs.mdx
```

**Props:**

```typescript
export interface IressMenuSideRailProps extends IressStyledProps {
  /** Content — typically IressMenuSideRailItem children */
  children: ReactNode;
  /** Whether the adjacent panel is currently expanded (controlled) */
  expanded?: boolean;
  /** Uncontrolled default for the expanded state */
  defaultExpanded?: boolean;
  /** Callback when expand/collapse is toggled */
  onExpandedChange?: (expanded: boolean) => void;
  /** Accessible label for the navigation landmark */
  'aria-label'?: string;
}
```

**Visual Design:**

- Fixed width: `50px`
- Background: `colour.primary.fill` (navy blue `#003271`)
- Vertical flex column, `gap: 8px`, `padding: 16px 4px`
- Contains a stack of `IressMenuSideRailItem` children
- Has an expand/collapse toggle button pinned to the bottom (uses double-arrow icon)
- **Animated transition**: Expand/collapse of the adjacent `IressMenuSideMenu` panel uses a CSS `transition` on width + opacity (`200ms ease-in-out`). The rail's toggle button icon animates rotation (chevron-left ↔ chevron-right).
- ARIA: `role="navigation"` or `role="toolbar"`, `aria-label`

### 6. `IressMenuSideRailItem` (NEW)

**Figma**: `.Menu/SideRail/MenuItems`

**File structure:**

```
MenuSideRailItem/
├── index.ts
├── MenuSideRailItem.tsx
├── MenuSideRailItem.styles.ts
├── MenuSideRailItem.stories.tsx
└── MenuSideRailItem.test.tsx
```

**Props:**

```typescript
export interface IressMenuSideRailItemProps extends IressStyledProps {
  /** Icon to display (ReactNode, typically an IressIcon) */
  icon: ReactNode;
  /** Accessible label for the icon button */
  'aria-label': string;
  /** Whether this item is currently active/selected */
  active?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Optional tooltip text */
  tooltip?: string;

  /**
   * Routing support — render as an anchor tag instead of a button.
   * Follows the same pattern as IressMenuItem's `element` / polymorphic rendering.
   *
   * When `variant="link"`, the item renders as `<a>` and accepts `href`.
   * Default variant is `"button"` (renders `<button>`).
   */
  variant?: 'button' | 'link';

  /** URL when variant="link" */
  href?: string;

  /** Polymorphic element override (e.g. Next.js Link, React Router Link) */
  element?: React.ElementType;
}
```

**States:**
| State | Background | Icon colour | Border |
|---|---|---|---|
| Default | `colour.primary.fill` (#003271) | `colour.primary.onFill` (white) | none |
| Hover | lighter navy / opacity | white | none |
| Pressed | darker | white | none |
| Active | `colour.primary.onFill` (white) | `colour.primary.fill` (navy) | none |
| Focus | same as current state | same | 2px white ring |

### 7. `IressMenuSideMenu` (NEW — thin wrapper)

**Figma**: `.Menu/SideMenu` (node `3498:33506`)

This is a **thin composition layer** that wraps `IressMenu variant="sidemenu"` with a consumer-provided header and card styling. It contains no new behaviour — just layout composition above an `IressMenu`.

**File structure:**

```
MenuSideMenu/
├── index.ts
├── MenuSideMenu.tsx
├── MenuSideMenu.styles.ts
├── MenuSideMenu.stories.tsx
├── MenuSideMenu.test.tsx
└── MenuSideMenu.docs.mdx
```

**Props:**

```typescript
export interface IressMenuSideMenuProps extends IressStyledProps {
  /** Menu groups/items — passed as children to the inner IressMenu */
  children: ReactNode;

  /**
   * Whether the panel is expanded (visible) or collapsed (hidden).
   * When animated, the panel transitions width + opacity via CSS.
   * Supports controlled (`expanded`) and uncontrolled (`defaultExpanded`) modes.
   */
  expanded?: boolean;

  /** Uncontrolled default for the expanded state */
  defaultExpanded?: boolean;

  /**
   * Content rendered above the menu list inside the card container.
   * Consumers can put anything here: search bars, headings, filters, etc.
   * This replaces a baked-in search — giving full flexibility.
   *
   * @example
   * <IressMenuSideMenu
   *   header={
   *     <>
   *       <IressInputField placeholder="Search…" />
   *       <IressMenuHeading>Hubs</IressMenuHeading>
   *     </>
   *   }
   * >
   */
  header?: ReactNode;

  /** Pass-through: currently selected value for the inner IressMenu */
  selected?: FormControlValue;
  /** Pass-through: uncontrolled default selected value */
  defaultSelected?: FormControlValue;
  /** Pass-through: callback when selection changes */
  onChange?: (value?: FormControlValue) => void;
}
```

**Internal rendering:**

```tsx
<div className={styles.root({ expanded })}>
  {' '}
  {/* card: animated width + opacity */}
  {header} {/* consumer-provided header slot */}
  <IressMenu
    variant="sidemenu"
    selected={selected}
    defaultSelected={defaultSelected}
    onChange={onChange}
  >
    {children} {/* IressMenuGroup + IressMenuItem */}
  </IressMenu>
</div>
```

---

## Composition Example (Consumer API)

```tsx
import {
  IressMenuSideRail,
  IressMenuSideRailItem,
  IressMenuSideMenu,
  IressMenuGroup,
  IressMenuItem,
  IressMenuHeading,
  IressInputField,
  IressIcon,
} from '@iress-oss/ids-components';

function AppSideNav() {
  const [expanded, setExpanded] = useState(false);
  const [activeRailItem, setActiveRailItem] = useState('hubs');
  const [activeGroup, setActiveGroup] = useState('basic-details');

  return (
    <div style={{ display: 'flex' }}>
      {/* Collapsed rail — always visible */}
      <IressMenuSideRail
        expanded={expanded}
        onExpandedChange={setExpanded}
        aria-label="Main navigation"
      >
        <IressMenuSideRailItem
          icon={<IressIcon name="hub" />}
          aria-label="Hubs"
          active={activeRailItem === 'hubs'}
          onClick={() => setActiveRailItem('hubs')}
        />
        <IressMenuSideRailItem
          icon={<IressIcon name="share" />}
          aria-label="My Links"
          active={activeRailItem === 'links'}
          onClick={() => setActiveRailItem('links')}
        />
        <IressMenuSideRailItem
          icon={<IressIcon name="database" />}
          aria-label="Portfolios"
          active={activeRailItem === 'portfolios'}
          onClick={() => setActiveRailItem('portfolios')}
        />
      </IressMenuSideRail>

      {/* Expanded panel — always rendered in the DOM.
          Animated slide-in/out via CSS transition on width + opacity.
          When expanded=false → width: 0, opacity: 0, overflow: hidden. */}
      <IressMenuSideMenu
        expanded={expanded}
        header={
          <>
            <IressInputField placeholder="Search…" icon="search" />
            <IressMenuHeading>Hubs</IressMenuHeading>
          </>
        }
      >
        {/* IressMenuGroup — automatically renders as a numbered header
              because the parent IressMenu's variant="sidemenu" flows
              through context, just like radio/subdraw variants do.
              Step numbers are auto-generated from child order (01, 02, …)
              when `numbered` is set on each group. */}
        <IressMenuGroup
          label="Basic Details"
          numbered
          active={activeGroup === 'basic-details'}
          onActiveChange={(active) => active && setActiveGroup('basic-details')}
        >
          {/* IressMenuItem — automatically renders as a drawer sub-item
                because menu?.variant === 'sidemenu' in context */}
          <IressMenuItem>Cashflow</IressMenuItem>
          <IressMenuItem>Assets</IressMenuItem>
          <IressMenuItem>Liabilities</IressMenuItem>
        </IressMenuGroup>

        <IressMenuGroup
          label="Dependants"
          numbered
          active={activeGroup === 'dependants'}
          onActiveChange={(active) => active && setActiveGroup('dependants')}
        />

        <IressMenuGroup
          label="Individual"
          numbered
          active={activeGroup === 'individual'}
          onActiveChange={(active) => active && setActiveGroup('individual')}
        />

        <IressMenuGroup
          label="Entities"
          numbered
          active={activeGroup === 'entities'}
          onActiveChange={(active) => active && setActiveGroup('entities')}
        />
      </IressMenuSideMenu>
    </div>
  );
}
```

**Key difference from v1 plan**: Consumers use the **existing** `IressMenuGroup` and `IressMenuItem` — no new `IressMenuSideMenuHeader` needed. The sidemenu rendering is purely driven by variant context inheritance, identical to how `IressMenu variant="radio"` makes `IressMenuItem` render a `RadioMark`.

---

## Implementation Checklist

### Phase 1 — Variant Plumbing (modify existing components)

- [ ] **1.1** Add `'sidemenu'` to `IressMenu`'s `variant` type union in `Menu.tsx`
- [ ] **1.2** Add `numbered?: boolean`, `active?: boolean`, `defaultActive?: boolean`, and `onActiveChange` props to `IressMenuGroupProps`
- [ ] **1.3** Add `menu?.variant === 'sidemenu'` rendering branch in `IressMenuGroup`
- [ ] **1.4** Add `sidemenuDrawer` variant styles to `Menu.styles.ts` `sva()` recipe
- [ ] **1.5** Add `menu?.variant === 'sidemenu'` style application in `IressMenuItem`
- [ ] **1.6** Add sidemenu header styles (step circle, accent bar, drawer container) — either in `Menu.styles.ts` or a new `MenuGroup.styles.ts`

### Phase 2 — New Pattern Components (SideRail)

- [ ] **2.1** Create `MenuSideRailItem/` — styles, component, tests, stories
- [ ] **2.2** Create `MenuSideRail/` — styles, component, tests, stories, docs

### Phase 3 — Wrapper Component (SideMenu container)

- [ ] **3.1** Create `MenuSideMenu/` — styles, component (search + label + IressMenu variant="sidemenu"), tests, stories, docs

### Phase 4 — Integration Stories

- [ ] **4.1** Export all new components from `Menu/index.ts` and `@/main`
- [ ] **4.2** Create composed story: full SideRail + SideMenu (Figma `2429:14893`)
- [ ] **4.3** Create story: collapsed-only SideRail (Figma `3829:79110`)
- [ ] **4.4** Create story: SideMenu with `numbered` headers
- [ ] **4.5** Create story: SideMenu without numbered headers

### Phase 5 — States & Interactions

- [ ] **5.1** Keyboard navigation (arrow keys in rail, tab into expanded menu)
- [ ] **5.2** Expand/collapse **animated** transition — CSS `transition` on SideMenu panel width + opacity (`200ms ease-in-out`), toggle icon rotation on SideRail
- [ ] **5.3** Drawer expand/collapse **animated** transition — CSS `transition` on height (`150ms ease-in-out`) for IressMenuGroup active→inactive drawer reveal
- [ ] **5.4** Focus management when toggling collapsed/expanded

### Phase 6 — Accessibility

- [ ] **6.1** ARIA roles: rail as `navigation`/`toolbar`, items as `button` with `aria-expanded`
- [ ] **6.2** `aria-current="page"` or `aria-selected` for active items
- [ ] **6.3** Screen reader announcements on expand/collapse
- [ ] **6.4** Axe accessibility tests for all new/modified components

### Phase 7 — Documentation & Polish

- [ ] **7.1** Write docs (MDX) with anatomy diagrams
- [ ] **7.2** Add component meta + Storybook thumbnail
- [ ] **7.3** Visual regression snapshots
- [ ] **7.4** Run `yarn lint:components` and `yarn test:components`

---

## Token Mapping (Figma → Panda CSS)

| Figma variable                               | Panda CSS token                                        |
| -------------------------------------------- | ------------------------------------------------------ |
| `--primary/navy-blue/fill` (#003271)         | `colour.primary.fill`                                  |
| `--primary/navy-blue/text` (#003271)         | `colour.primary.text`                                  |
| `--primary/navy-blue/on-fill` (white)        | `colour.primary.onFill`                                |
| `--neutral/10` (white)                       | `colour.neutral.10`                                    |
| `--neutral/20` (#F5F6F8)                     | `colour.neutral.20`                                    |
| `--neutral/30` (#E2E6EA)                     | `colour.neutral.30`                                    |
| `--neutral/40` (#CFD5DA)                     | `colour.neutral.40`                                    |
| `--neutral/60` (#828F9D)                     | `colour.neutral.60`                                    |
| `--neutral/70` (#5D6C7E)                     | `colour.neutral.70`                                    |
| `--neutral/90`                               | `colour.neutral.90`                                    |
| `--global-interactions/focus-ring` (#005BFF) | `colour.global.focusRing` (or the `focusable` utility) |
| Inter Medium 14px/21px                       | `typography.body.md.medium`                            |
| Inter Regular 14px/21px                      | `typography.body.md`                                   |
| Ubuntu Medium 18px/24px                      | `typography.heading.h3` (or equivalent)                |
| Ubuntu Medium 16px/20px                      | `typography.heading.h4` (or equivalent)                |

---

## Styling Approach

### Modified: `Menu.styles.ts` — add `sidemenu` variants to existing SVA

```typescript
// Add to the existing sva() recipe:
variants: {
  // ... existing variants (active, fluid, layout, etc.) ...

  sidemenuDrawer: {
    true: {
      item: {
        bg: 'colour.neutral.20',
        py: 'spacing.2',
        px: 'spacing.4',
        color: 'colour.neutral.70',
        _hover: { bg: 'colour.neutral.30' },
        _before: { content: 'none' },  // no accent bar on drawer items
      },
    },
  },
},
```

### New: `MenuSideRail.styles.ts`

```
slots: ['root', 'items', 'expandButton']
variants: { expanded: boolean }
```

### New: `MenuSideRailItem.styles.ts`

```
slots: ['root', 'icon']
variants: { active: boolean }
```

### New: `MenuSideMenu.styles.ts`

```
slots: ['root', 'header', 'menu']
variants: { expanded: boolean }
```

**Animation tokens:**

```typescript
root: {
  transition: 'width 200ms ease-in-out, opacity 200ms ease-in-out',
  overflow: 'hidden',
},
variants: {
  expanded: {
    true:  { root: { width: '[259px]', opacity: 1 } },
    false: { root: { width: 0, opacity: 0 } },
  },
},
```

### New or Extended: `MenuGroup` sidemenu header styles

Either in `Menu.styles.ts` (adding slots) or a new file, for the numbered header rendering:

```
slots: ['headerRoot', 'headerContent', 'stepNumber', 'headerLabel', 'accentBar', 'drawerContainer']
variants: { active: boolean, numbered: boolean }
```

**Drawer animation:**

```typescript
drawerContainer: {
  overflow: 'hidden',
  transition: 'height 150ms ease-in-out, opacity 150ms ease-in-out',
},
variants: {
  active: {
    true:  { drawerContainer: { height: 'auto', opacity: 1 } },
    false: { drawerContainer: { height: 0, opacity: 0 } },
  },
},
```

---

## Variant Inheritance Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│  IressMenuSideMenu                                   │
│  (thin wrapper — search bar + label + card styling)  │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │  IressMenu variant="sidemenu"                   │ │
│  │  └─ MenuContext.variant = "sidemenu"             │ │
│  │                                                  │ │
│  │  ┌───────────────────────────────────┐           │ │
│  │  │ IressMenuGroup label="Details"    │           │ │
│  │  │ numbered active={true}            │           │ │
│  │  │                                   │           │ │
│  │  │ reads menu?.variant === 'sidemenu'│           │ │
│  │  │ → renders as numbered header      │           │ │
│  │  │ → shows accent bar + step circle  │           │ │
│  │  │ → reveals children when active:   │           │ │
│  │  │   ┌─────────────────────────────┐ │           │ │
│  │  │   │ IressMenuItem "Cashflow"    │ │           │ │
│  │  │   │ reads menu?.variant         │ │           │ │
│  │  │   │ → renders as drawer item    │ │           │ │
│  │  │   │ (neutral bg, compact)       │ │           │ │
│  │  │   └─────────────────────────────┘ │           │ │
│  │  └───────────────────────────────────┘           │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## Risk Assessment

- **Low risk to existing components**: Adding a new variant string to unions and new conditional branches. Existing `'radio'`, `'subdraw'`, and default branches are untouched.
- **Backward compatible**: New variant value, new optional props (`numbered`, `active`, `defaultActive`, `onActiveChange`) — no breaking changes.
- **Design token reliance**: Primary navy-blue tokens already exist (`colour.primary.fill`, `colour.primary.text`, `colour.primary.onFill`).
- **Pattern consistency**: Follows the exact same variant inheritance mechanism proven by `radio` and `subdraw`.
- **Potential concern**: The Ubuntu heading font tokens may need verification.
- **Animation**: CSS transitions are low-risk; `transition` on `width`, `opacity`, and `height` are GPU-compositable and performant.

---

## Resolved Decisions

| #   | Question                   | Decision                                                                                                                                                                                                  | Impact                                                                                                                |
| --- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Search implementation      | **`header` render prop** — `IressMenuSideMenu` accepts a `header?: ReactNode` slot. Consumers put whatever they need (search input, heading, filters, etc.). No baked-in search.                          | Simplified `IressMenuSideMenu` API; no search-specific props.                                                         |
| 2   | Animation                  | **Yes — animate everything.** Panel expand/collapse uses CSS `transition` on width + opacity (`200ms ease-in-out`). Drawer reveal/hide uses height transition (`150ms ease-in-out`). Toggle icon rotates. | Phase 5 tasks updated; animation styles added to `MenuSideMenu.styles.ts` and `MenuGroup` sidemenu header styles.     |
| 3   | Routing integration        | **Variant on `IressMenuSideRailItem`** — `variant?: 'button' \| 'link'` plus `href?`, `element?` props. Default is `'button'`. Follows the same polymorphic pattern as `IressMenuItem`.                   | Added `variant`, `href`, `element` props to `IressMenuSideRailItemProps`.                                             |
| 4   | Number auto-generation     | **Auto-generate** — When `numbered` is set on an `IressMenuGroup`, the step number is auto-generated from its position among sibling groups (01, 02, …). No `stepNumber` string prop needed.              | `IressMenuGroup` uses React `Children` ordering or a counter context to derive the number. Removed `stepNumber` prop. |
| 5   | Controlled vs uncontrolled | **Yes — support both.** `expanded` / `defaultExpanded` on `IressMenuSideRail`. `active` / `defaultActive` / `onActiveChange` on `IressMenuGroup`.                                                         | Added `defaultExpanded` to rail, `defaultActive` + `onActiveChange` to group.                                         |
| 6   | Numbered prop location     | **On each `IressMenuGroup` directly** — `numbered?: boolean`. This is explicit and lets consumers mix numbered and unnumbered groups within the same `IressMenuSideMenu`.                                 | `numbered` prop added to `IressMenuGroupProps`, not to `IressMenuSideMenu`.                                           |
