# IressMenu `side` Variant — Implementation Plan

## Figma References

| Node         | Name                          | Description                                                                                                                             |
| ------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `2429:14893` | Menu (page)                   | Full page showing Collapsed (SideRail only) and Expanded (SideRail + SideMenu panel) states                                             |
| `2429:14887` | Master/Menu                   | Internal master components: `.Menu/Header`, `.Menu/Drawer`, `.Menu/SideMenu`, `.Menu/SideRail`, `.Menu/SideRail/MenuItems`              |
| `3806:64056` | Menu (docs)                   | Full specification: interaction states table, layout, anatomy, state matrix (Default, Hover, Active, Focus), Expanded subsection states |
| `3829:79110` | Prototype: Key Insights Panel | Real-world collapsed SideRail prototype with icon buttons and expand toggle                                                             |

---

## Core Design Principle: `variant="side"` Just Works

`IressMenu variant="side"` is a standalone visual variant — like `"radio"` or `"subdraw"`. It makes `IressMenuGroup` and `IressMenuItem` render differently via the same `MenuContext` inheritance pattern. **No wrapper component needed.**

```
IressMenu variant="side"
  └─ MenuContext.variant = "side"
       └─ IressMenuGroup reads variant → renders as numbered header with
          accent bar, step number circle, expandable child drawer
       └─ IressMenuItem reads variant → renders as compact drawer sub-item
```

You can use `IressMenu variant="side"` anywhere — with or without a `SideRail`. It's just a menu that looks different.

---

## Variant Inheritance (existing pattern)

```
IressMenu variant="radio"
  └─ MenuContext.variant = "radio"
       └─ IressMenuItem reads menu?.variant === 'radio' → prepends RadioMark

IressMenu variant="subdraw"
  └─ MenuContext.variant = "subdraw"
       └─ IressMenuGroup reads variant → renders Popover fly-over

IressMenu variant="side"          ← NEW — same mechanism
  └─ MenuContext.variant = "side"
       └─ IressMenuGroup → renders as numbered expandable header
       └─ IressMenuItem → renders as compact drawer sub-item
```

---

## Design Summary (from Figma screenshots)

### Figma Sub-Components → IDS Mapping

| Figma Component            | IDS Equivalent                                            |
| -------------------------- | --------------------------------------------------------- |
| `.Menu/SideRail`           | `IressMenuSideRail` (NEW)                                 |
| `.Menu/SideRail/MenuItems` | `IressMenuSideRailItem` (NEW)                             |
| `.Menu/SideMenu`           | `IressMenu variant="side"` (no wrapper needed)            |
| `.Menu/Header`             | `IressMenuGroup` when `variant="side"` in context         |
| `.Menu/Drawer`             | `IressMenuItem` children when `variant="side"` in context |

### Interaction States (from spec node `3806:64056`)

| State    | When                                    | Visual Cue                                             |
| -------- | --------------------------------------- | ------------------------------------------------------ |
| Default  | Idle                                    | Neutral background, plain text                         |
| Hover    | Mouse over menu item                    | Background highlights to indicate clickability         |
| Active   | User selects menu item                  | Accent bar on left, background tint, drawer may expand |
| Focus    | Keyboard navigation reaches the element | Focus ring around interactive element                  |
| Expanded | Group is active and has children        | Children revealed with animated height transition      |

### Anatomy Highlights

- **Two-Level Hierarchy**: Parent level (IressMenuGroup as header) → Child level (IressMenuItem as drawer sub-items)
- **Numbering**: Step number circles (01, 02, …) always shown, auto-generated from group position
- **Accent Bar**: 4px navy bar on the left of active headers

---

## Architecture: What Changes vs What's New

### Existing Components Modified

| Component            | Change                                          | How it works                                                                                                                       |
| -------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`IressMenu`**      | Add `'side'` to `variant` union                 | `variant="side"` flows through `MenuContext.variant` to all children.                                                              |
| **`IressMenuGroup`** | Add `variant === 'side'` rendering branch       | Renders as numbered expandable header with accent bar + step circle. `label` becomes header text, children become animated drawer. |
| **`IressMenuItem`**  | Add `variant === 'side'` styling branch         | Renders with compact drawer-item styles (subtle bg, smaller padding, neutral text).                                                |
| **`Menu.styles.ts`** | Add `side` variant styles to the `sva()` recipe | New slot styles for header rendering, drawer items, accent bar, step number circle.                                                |

### New Components (only the SideRail)

| New Component           | Figma Equivalent           | Purpose                                                                             |
| ----------------------- | -------------------------- | ----------------------------------------------------------------------------------- |
| `IressMenuSideRail`     | `.Menu/SideRail`           | Vertical icon-only navigation bar. A genuinely new pattern — not a variant of Menu. |
| `IressMenuSideRailItem` | `.Menu/SideRail/MenuItems` | Individual icon button inside the rail. Supports `variant="link"` for routing.      |

**That's it. Two new components.** Everything else is variant-driven on existing components.

---

## Detailed Changes to Existing Components

### 1. `IressMenu` — Add `'side'` variant

**File:** `Menu.tsx`

```typescript
// Variant type — BEFORE:
variant?: TMultiple extends true ? never : 'subdraw' | 'radio';

// Variant type — AFTER:
variant?: TMultiple extends true ? never : 'subdraw' | 'radio' | 'side';
```

That's it. The variant value already flows through `MenuContext.variant`. No new props needed on `IressMenu` — numbering is an inherent part of the `'side'` variant, not configurable.

### 2. `IressMenuGroup` — Add `'side'` rendering branch

**File:** `MenuGroup/MenuGroup.tsx`

Currently two rendering branches:

- `variant === 'subdraw'` → Popover fly-over
- Default (no variant) → Inline heading + children

We add a third:

```tsx
const menu = useContext(MenuContext);

if (menu?.variant === 'side') {
  return (
    <SideHeader
      label={label}
      index={/* auto-generated from sibling position */}
      active={active}
      defaultActive={defaultActive}
      onActiveChange={onActiveChange}
      data-testid={dataTestId}
    >
      {children}
      {divider && <IressMenuDivider />}
    </SideHeader>
  );
}
```

**New props on `IressMenuGroupProps`** (only meaningful when `variant="side"`):

```typescript
export type IressMenuGroupProps<...> = MenuGroupRestProps<...> & {
  // ... existing props ...

  /** Whether this header is active/expanded, revealing child drawer items. */
  active?: boolean;

  /** Uncontrolled default for the active/expanded state. */
  defaultActive?: boolean;

  /** Callback fired when the active/expanded state changes. */
  onActiveChange?: (active: boolean) => void;
};
```

**What `SideHeader` renders** (internal helper, not exported):

```
┌─────────────────────────────────────────┐
│  ┌──────┐                               │  ← top border (1px neutral.40)
│  │  01  │  Basic Details                 │  ← clickable header row
│  └──────┘                               │     step circle + label text
├─────────────────────────────────────────┤
│  (when active — animated height reveal)  │
│  │▌ Cashflow                            │  ← child IressMenuItem (drawer style)
│  │▌ Assets                              │     transition: height 150ms ease-in-out
│  │▌ Liabilities                         │
└─────────────────────────────────────────┘
     ↑ 4px navy accent bar on left when active
```

**Numbering**: Always shown when `variant="side"`. The step number is auto-generated from the group's position among its siblings (01, 02, 03, …). No prop needed — it's an inherent part of the side variant.

### 3. `IressMenuItem` — Add `'side'` drawer styling

**File:** `MenuItem/MenuItem.tsx`

Currently checks `menu?.variant` for:

- `'radio'` → prepend RadioMark
- `'subdraw'` → append chevron

Add a third check:

```tsx
const classes = useMemo(
  () =>
    menuStyles({
      // ... existing ...
      sideDrawer: menu?.variant === 'side', // ← NEW: triggers drawer-item styles
    }),
  [
    /* ... deps ... */
  ],
);
```

This gives drawer items: compact padding, neutral bg, subtle hover — matching Figma `.Menu/Drawer`.

### 4. `Menu.styles.ts` — Add `side` variant styles

**File:** `Menu.styles.ts`

```typescript
variants: {
  // ... existing variants ...

  // NEW: Drawer item styles when inside variant="side" menu
  sideDrawer: {
    true: {
      item: {
        bg: 'colour.neutral.20',
        py: 'spacing.2',
        px: 'spacing.4',
        color: 'colour.neutral.70',
        textStyle: 'typography.body.md',
        _hover: { bg: 'colour.neutral.30' },
        _before: { content: 'none' },  // no accent bar on drawer items
      },
    },
  },

  // NEW: Root styling when variant is side
  sideRoot: {
    true: {
      root: {
        overflow: 'hidden',
        width: '[100%]',
      },
    },
  },
},
```

**Side header styles** for `IressMenuGroup` (either new slots in `Menu.styles.ts` or in a dedicated `MenuGroup.styles.ts`):

- Step number circle: `28px`, round, `2px solid neutral.70` (inactive) / `primary.text` (active)
- Active header: bg `neutral.20`, left `4px solid primary.fill` accent bar
- Drawer container: `overflow: hidden`, animated `height` + `opacity` transitions

---

## New Components (SideRail only)

### 5. `IressMenuSideRail` (NEW)

**Figma**: `.Menu/SideRail`

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
  children: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  'aria-label'?: string;
}
```

**Visual Design:**

- Fixed width: `50px`
- Background: `colour.primary.fill` (navy `#003271`)
- Vertical flex column, `gap: 8px`, `padding: 16px 4px`
- Expand/collapse toggle button pinned to bottom (double-arrow icon)
- `role="navigation"` or `role="toolbar"`, `aria-label`

### 6. `IressMenuSideRailItem` (NEW)

**Figma**: `.Menu/SideRail/MenuItems`

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
  icon: ReactNode;
  'aria-label': string;
  active?: boolean;
  onClick?: () => void;
  tooltip?: string;
  variant?: 'button' | 'link';
  href?: string;
  element?: React.ElementType;
}
```

**States:**

| State   | Background              | Icon colour             | Border         |
| ------- | ----------------------- | ----------------------- | -------------- |
| Default | `colour.primary.fill`   | `colour.primary.onFill` | none           |
| Hover   | lighter navy / opacity  | white                   | none           |
| Active  | `colour.primary.onFill` | `colour.primary.fill`   | none           |
| Focus   | same as current         | same                    | 2px white ring |

---

## Composition Examples

### Standalone `IressMenu variant="side"` (no SideRail)

```tsx
import {
  IressMenu,
  IressMenuGroup,
  IressMenuItem,
} from '@iress-oss/ids-components';

function SideMenu() {
  const [activeGroup, setActiveGroup] = useState('basic-details');

  return (
    <IressMenu variant="side">
      <IressMenuGroup
        label="Basic Details"
        active={activeGroup === 'basic-details'}
        onActiveChange={(active) => active && setActiveGroup('basic-details')}
      >
        <IressMenuItem>Cashflow</IressMenuItem>
        <IressMenuItem>Assets</IressMenuItem>
        <IressMenuItem>Liabilities</IressMenuItem>
      </IressMenuGroup>

      <IressMenuGroup
        label="Dependants"
        active={activeGroup === 'dependants'}
        onActiveChange={(active) => active && setActiveGroup('dependants')}
      />

      <IressMenuGroup
        label="Individual"
        active={activeGroup === 'individual'}
        onActiveChange={(active) => active && setActiveGroup('individual')}
      />
    </IressMenu>
  );
}
```

That's it. `variant="side"` makes everything look right — numbered headers, accent bars, drawer sub-items. No wrapper, no extra imports.

### Full layout with SideRail

```tsx
import {
  IressMenu,
  IressMenuGroup,
  IressMenuItem,
  IressMenuHeading,
  IressMenuSideRail,
  IressMenuSideRailItem,
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
      </IressMenuSideRail>

      {/* Expanded panel — just an IressMenu variant="side" */}
      {expanded && (
        <div>
          <IressInputField placeholder="Search…" icon="search" />
          <IressMenuHeading>Hubs</IressMenuHeading>
          <IressMenu variant="side">
            <IressMenuGroup
              label="Basic Details"
              active={activeGroup === 'basic-details'}
              onActiveChange={(active) =>
                active && setActiveGroup('basic-details')
              }
            >
              <IressMenuItem>Cashflow</IressMenuItem>
              <IressMenuItem>Assets</IressMenuItem>
              <IressMenuItem>Liabilities</IressMenuItem>
            </IressMenuGroup>

            <IressMenuGroup
              label="Dependants"
              active={activeGroup === 'dependants'}
              onActiveChange={(active) =>
                active && setActiveGroup('dependants')
              }
            />
          </IressMenu>
        </div>
      )}
    </div>
  );
}
```

**Key point**: The search bar, heading, and panel layout are just regular HTML/components composed around `IressMenu variant="side"`. No special wrapper needed — consumers control their own layout.

---

## Variant Inheritance Flow Diagram

```
┌─────────────────────────────────────────────────┐
│  IressMenu variant="side"                        │
│  └─ MenuContext = { variant: "side" }             │
│                                                  │
│  ┌───────────────────────────────────┐           │
│  │ IressMenuGroup label="Details"    │           │
│  │ active={true}                     │           │
│  │                                   │           │
│  │ reads menu?.variant === 'side'    │           │
│  │ → always renders as numbered header│           │
│  │ → shows accent bar + step circle  │           │
│  │ → reveals children when active:   │           │
│  │   ┌─────────────────────────────┐ │           │
│  │   │ IressMenuItem "Cashflow"    │ │           │
│  │   │ reads menu?.variant         │ │           │
│  │   │ → renders as drawer item    │ │           │
│  │   │ (neutral bg, compact)       │ │           │
│  │   └─────────────────────────────┘ │           │
│  └───────────────────────────────────┘           │
└─────────────────────────────────────────────────┘
```

---

## Implementation Checklist

### Phase 1 — Variant Plumbing (modify existing components)

- [ ] **1.1** Add `'side'` to `IressMenu`'s `variant` type union in `Menu.tsx`
- [ ] **1.2** Add `active?: boolean`, `defaultActive?: boolean`, `onActiveChange` props to `IressMenuGroupProps`
- [ ] **1.3** Add `menu?.variant === 'side'` rendering branch in `IressMenuGroup` (always numbered)
- [ ] **1.4** Add `sideDrawer` variant styles to `Menu.styles.ts` `sva()` recipe
- [ ] **1.5** Add `menu?.variant === 'side'` style application in `IressMenuItem`
- [ ] **1.6** Add side header styles (step circle, accent bar, drawer container) — either in `Menu.styles.ts` or a new `MenuGroup.styles.ts`

### Phase 2 — New Pattern Components (SideRail only)

- [ ] **2.1** Create `MenuSideRailItem/` — styles, component, tests, stories
- [ ] **2.2** Create `MenuSideRail/` — styles, component, tests, stories, docs

### Phase 3 — Integration Stories

- [ ] **3.1** Export new components from `Menu/index.ts` and `@/main`
- [ ] **3.2** Create story: standalone `IressMenu variant="side"` (no rail)
- [ ] **3.3** Create story: full SideRail + side menu layout (Figma `2429:14893`)
- [ ] **3.4** Create story: collapsed-only SideRail (Figma `3829:79110`)

### Phase 4 — States & Interactions

- [ ] **4.1** Keyboard navigation (arrow keys in rail, tab into menu)
- [ ] **4.2** Expand/collapse animation on SideRail toggle — CSS `transition` on panel width + opacity (`200ms ease-in-out`)
- [ ] **4.3** Drawer expand/collapse animation — CSS `transition` on height (`150ms ease-in-out`) for group active→inactive
- [ ] **4.4** Focus management when toggling collapsed/expanded

### Phase 5 — Accessibility

- [ ] **5.1** ARIA roles: rail as `navigation`/`toolbar`, items as `button` with `aria-expanded`
- [ ] **5.2** `aria-current="page"` or `aria-selected` for active items
- [ ] **5.3** Screen reader announcements on expand/collapse
- [ ] **5.4** Axe accessibility tests for all new/modified components

### Phase 6 — Documentation & Polish

- [ ] **6.1** Write docs (MDX) with anatomy diagrams
- [ ] **6.2** Add component meta + Storybook thumbnail
- [ ] **6.3** Visual regression snapshots
- [ ] **6.4** Run `yarn lint:components` and `yarn test:components`

---

## Token Mapping (Figma → Panda CSS)

| Figma variable                               | Panda CSS token             |
| -------------------------------------------- | --------------------------- |
| `--primary/navy-blue/fill` (#003271)         | `colour.primary.fill`       |
| `--primary/navy-blue/text` (#003271)         | `colour.primary.text`       |
| `--primary/navy-blue/on-fill` (white)        | `colour.primary.onFill`     |
| `--neutral/10` (white)                       | `colour.neutral.10`         |
| `--neutral/20` (#F5F6F8)                     | `colour.neutral.20`         |
| `--neutral/30` (#E2E6EA)                     | `colour.neutral.30`         |
| `--neutral/40` (#CFD5DA)                     | `colour.neutral.40`         |
| `--neutral/60` (#828F9D)                     | `colour.neutral.60`         |
| `--neutral/70` (#5D6C7E)                     | `colour.neutral.70`         |
| `--neutral/90`                               | `colour.neutral.90`         |
| `--global-interactions/focus-ring` (#005BFF) | `colour.global.focusRing`   |
| Inter Medium 14px/21px                       | `typography.body.md.medium` |
| Inter Regular 14px/21px                      | `typography.body.md`        |
| Ubuntu Medium 18px/24px                      | `typography.heading.h3`     |
| Ubuntu Medium 16px/20px                      | `typography.heading.h4`     |

---

## Styling Approach

### Modified: `Menu.styles.ts`

```typescript
variants: {
  // ... existing variants ...

  sideDrawer: {
    true: {
      item: {
        bg: 'colour.neutral.20',
        py: 'spacing.2',
        px: 'spacing.4',
        color: 'colour.neutral.70',
        _hover: { bg: 'colour.neutral.30' },
        _before: { content: 'none' },
      },
    },
  },

  sideRoot: {
    true: {
      root: {
        overflow: 'hidden',
        width: '[100%]',
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

### Side header styles (for `IressMenuGroup` in side mode)

Either new slots in `Menu.styles.ts` or a `MenuGroup.styles.ts`:

```
slots: ['headerRoot', 'headerContent', 'stepNumber', 'headerLabel', 'accentBar', 'drawerContainer']
variants: { active: boolean }
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

## Risk Assessment

- **Low risk to existing components**: Adding a new variant string to unions and new conditional branches. Existing `'radio'`, `'subdraw'`, and default branches are untouched.
- **Backward compatible**: New variant value, new optional props — no breaking changes.
- **Design token reliance**: Primary navy-blue tokens already exist.
- **Pattern consistency**: Same variant inheritance mechanism proven by `radio` and `subdraw`.
- **Animation**: CSS transitions on `width`, `opacity`, `height` — GPU-compositable and performant.

---

## Resolved Decisions

| #   | Question                   | Decision                                                                                                                                     |
| --- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Wrapper component          | **None** — `IressMenu variant="side"` is self-sufficient. Consumers compose search/headings above it in their own layout.                    |
| 2   | Animation                  | **Yes** — Panel expand/collapse: `transition` on width + opacity (`200ms`). Drawer reveal: height transition (`150ms`). Toggle icon rotates. |
| 3   | Routing integration        | **Variant on `IressMenuSideRailItem`** — `variant?: 'button' \| 'link'` + `href?`, `element?`. Same polymorphic pattern as `IressMenuItem`.  |
| 4   | Numbering                  | **Always on** — numbering is an inherent part of `variant="side"`. No prop. `IressMenuGroup` auto-numbers from sibling position (01, 02, …). |
| 5   | Controlled vs uncontrolled | **Both** — `expanded`/`defaultExpanded` on SideRail. `active`/`defaultActive`/`onActiveChange` on MenuGroup.                                 |
| 6   | Standalone use             | **Yes** — `IressMenu variant="side"` works without any SideRail. Just a different-looking menu.                                              |
