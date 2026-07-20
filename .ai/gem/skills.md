# IDS Skills

> 4 docs

---

# Skill: Figma to IDS Translation

## Purpose

Translate Figma design properties and structures into IDS (Iress Design System) component implementations. This skill helps AI agents interpret Figma design metadata (from tools like Figma MCP or exported design specs) and produce accurate IDS code.

## Figma MCP Setup

AI agents need a Figma MCP server to read Figma files directly. Without one, you can still use this skill by pasting exported design specs or Figma component descriptions manually.

### Setup

1. **Get a Figma personal access token** — In Figma, go to *Settings → Account → Personal access tokens* and create a token with **File content (Read-only)** scope.

2. **Add the MCP server to your agent config.** The exact location depends on your tool:

   | Tool | Config file |
   | --- | --- |
   | **Kiro CLI** | `~/.kiro/settings/mcp.json` (global) or `.kiro/settings/mcp.json` (workspace) |
   | **Cursor** | `.cursor/mcp.json` |
   | **Claude Code** | `.claude/mcp.json` or `~/.claude/mcp.json` |
   | **VS Code (GitHub Copilot)** | `.vscode/mcp.json` |

   Example configuration (using the community [`figma-developer-mcp`](https://github.com/nicholasgriffintn/figma-developer-mcp) server):

   ```json
   {
     "mcpServers": {
       "Figma": {
         "command": "npx",
         "args": ["-y", "figma-developer-mcp", "--stdio"],
         "env": {
           "FIGMA_API_KEY": "<your-figma-token>"
         }
       }
     }
   }
   ```

   For Kiro CLI, you can also add it via the command line:

   ```bash
   kiro-cli mcp add --name Figma --command npx --args "-y figma-developer-mcp --stdio" --env "FIGMA_API_KEY=<your-figma-token>"
   ```

3. **Verify** — Ask your agent to fetch data from a Figma file URL. It should return frame and component information.

## Process

1. **Analyse Figma structure** — Identify frames, auto-layout, and component instances
2. **Map components** — Match Figma component names/variants to IDS components
3. **Extract tokens** — Convert Figma design values to IDS design token references
4. **Generate code** — Produce clean, minimal React/TypeScript with proper IDS imports. Use the fewest components possible — check whether parent components already handle layout before adding `IressInline`/`IressStack` wrappers. Never wrap a single child in a layout component.
5. **Verify output** — Check that all imports resolve, no raw HTML is used where IDS components exist, grid layouts use responsive `span` values, and no common anti-patterns are present (disabled buttons, slot attributes, redundant textStyle)

```bash
npm install @iress-oss/ids-components
npm install @iress-oss/ids-tokens  # if using tokens directly (e.g. cssVars or CSS vars import)
```

## Documentation & Verification

Before using any component, verify it exists and check its props:

1. **Discovery** — Read `node_modules/@iress-oss/ids-components/llms.txt` for the full list of available components and their doc paths
2. **Usage docs** — Read `node_modules/@iress-oss/ids-components/.ai/components/<name>.md` for props, examples, and design guidance
3. **Type verification** — Read `node_modules/@iress-oss/ids-components/dist/components/<Name>/<Name>.d.ts` to confirm a prop exists before using it
4. **Token docs** — Read `node_modules/@iress-oss/ids-tokens/llms.txt` for available tokens

**Never assume props exist.** Always verify against the installed `.d.ts` types. If a prop isn't in the type definition, it doesn't exist.

## Figma → IDS Mapping

When mapping Figma components to IDS, read references/component-mapping.md for the full Figma component → IDS component mapping table.

# Figma Component → IDS Component Mapping

## Auto-Layout → Layout Components

| Figma Property           | IDS Component                       | Notes                               |
| ------------------------ | ----------------------------------- | ----------------------------------- |
| Auto-layout (vertical)   | `IressStack`                        | Default direction is vertical       |
| Auto-layout (horizontal) | `IressInline`                       | Horizontal flow with wrapping       |
| Auto-layout gap          | `gap` prop                          | Map px to spacing token (see below) |
| Auto-layout padding      | `p`, `px`, `py` props               | Map px to spacing token             |
| Auto-layout alignment    | `horizontalAlign` / `verticalAlign` | Maps to start, center, end          |
| Grid layout              | `IressRow` + `IressCol`             | Use responsive `span` prop (see below) |

## Component Instances

| Figma Component    | IDS Component                                | Key Props                  |
| ------------------ | -------------------------------------------- | -------------------------- |
| Button / Primary   | `IressButton mode="primary"`                 |                            |
| Button / Secondary | `IressButton mode="secondary"`               |                            |
| Button / Tertiary  | `IressButton mode="tertiary"`                |                            |
| Button / Muted     | `IressButton mode="muted"`                   |                            |
| Button / Danger    | `IressButton mode="primary" status="danger"` |                            |
| Button / Icon Only | `IressButton icon="..." mode="muted"`        | Set icon name              |
| Input / Text       | `IressField` + `IressInput`                  | label, placeholder         |
| Input / Currency   | `IressField` + `IressInputCurrency`          | label                      |
| Select / Dropdown  | `IressField` + `IressSelect`                 | label, options             |
| Checkbox           | `IressCheckbox`                              | `children` for label       |
| Checkbox Group     | `IressCheckboxGroup` + `IressCheckbox`s      | Wrap in `IressField` for label |
| Radio Group        | `IressRadioGroup` + `IressRadio`s            | Wrap in `IressField` for label |
| Toggle             | `IressToggle`                                | `children` for label       |
| Card               | `IressCard`                                  | `heading`, `footer` props; `children` for body |
| Panel              | `IressPanel`                                 |                            |
| Alert / Success    | `IressAlert status="success"`                |                            |
| Alert / Danger     | `IressAlert status="danger"`                 |                            |
| Alert / Warning    | `IressAlert status="warning"`                |                            |
| Alert / Info       | `IressAlert status="info"`                   |                            |
| Modal              | `IressModal`                                 |                            |
| Modal / Danger     | `IressModal status="danger"`                 | actions, size sm/md only   |
| Modal / Success    | `IressModal status="success"`                | actions, size sm/md only   |
| Modal / Warning    | `IressModal status="warning"`                | actions, size sm/md only   |
| Slideout / Drawer  | `IressSlideout`                              |                            |
| Tabs               | `IressTabSet` + `IressTab`                   |                            |
| Table              | `IressTable`                                 | Data-driven: `rows`, `columns`, `caption` props |
| Tag                | `IressTag`                                   | `bordered` for visible border; `element="button"` for clickable, `element="a"` for link; `onClick` alone also auto-renders as button |
| Pill               | `IressPill`                                  |                            |
| Tooltip            | `IressTooltip`                               |                            |
| Icon               | `IressIcon name="..."`                       | Material Symbols name      |
| Divider            | `IressDivider`                               |                            |
| Spinner            | `IressSpinner`                               |                            |
| Skeleton           | `IressSkeleton`                              |                            |
| Progress           | `IressProgress`                              |                            |
| Breadcrumbs        | `IressBreadcrumbs`                           | items array                |
| Menu               | `IressMenu` + `IressMenuItem`                |                            |
| Side Navigation    | `IressSideNav`                               |                            |

When converting Figma design values (colours, spacing, radius, typography) to IDS tokens, read references/token-mapping.md.

# Figma Design Values → IDS Token Mapping

## Colours

Map Figma fill/stroke colours to IDS colour tokens:

| Figma Colour              | IDS Token                    | CSS Variable                         |
| ------------------------- | ---------------------------- | ------------------------------------ |
| Primary/Fill `#003271`    | `colour.primary.fill`        | `--iress-colour-primary-fill`        |
| Primary/Surface `#EBF3FF` | `colour.primary.surface`     | `--iress-colour-primary-surface`     |
| Neutral/10 `#FFFFFF`      | `colour.neutral.10`          | `--iress-colour-neutral-10`          |
| Neutral/20 `#F5F6F8`      | `colour.neutral.20`          | `--iress-colour-neutral-20`          |
| Neutral/30 `#E2E6EA`      | `colour.neutral.30`          | `--iress-colour-neutral-30`          |
| Neutral/80 `#384666`      | `colour.neutral.80`          | `--iress-colour-neutral-80`          |
| Neutral/90 `#141F4D`      | `colour.neutral.90`          | `--iress-colour-neutral-90`          |
| Success/Fill `#37C49C`    | `colour.system.success.fill` | `--iress-colour-system-success-fill` |
| Danger/Fill `#C21010`     | `colour.system.danger.fill`  | `--iress-colour-system-danger-fill`  |
| Warning/Fill `#F0AD03`    | `colour.system.warning.fill` | `--iress-colour-system-warning-fill` |
| Info/Fill `#669AFF`       | `colour.system.info.fill`    | `--iress-colour-system-info-fill`    |
| Accent/Fill `#C26EF4`     | `colour.accent.fill`         | `--iress-colour-accent-fill`         |

## Spacing (px → Token)

IDS base spacing unit = 4px (0.25rem). Map Figma pixel values:

| Figma px | IDS Token | Alias |
| -------- | --------- | ----- |
| 0px      | `0`       | none  |
| 4px      | `1`       | xs    |
| 8px      | `2`       | sm    |
| 12px     | `3`       | —     |
| 16px     | `4`       | md    |
| 20px     | `5`       | —     |
| 24px     | `6`       | lg    |
| 28px     | `7`       | —     |
| 32px     | `8`       | —     |
| 40px     | `10`      | xl    |

> For values not on the 4px grid, round to the nearest token value.

## Border Radius

| Figma px | IDS Token  | System Usage        |
| -------- | ---------- | ------------------- |
| 0px      | `radius.0` | Square corners      |
| 4px      | `radius.1` | Button, form, tag   |
| 8px      | `radius.2` | —                   |
| 12px     | `radius.3` | Layout, card, panel |
| 16px     | `radius.4` | Pill, badge         |

## Typography

Prefer semantic HTML elements via the `element` prop — they convey meaning to screen readers. Only fall back to `textStyle` when no semantic element matches the visual treatment.

| Figma Text Style                   | IDS Token                    | Component                                                                                         |
| ---------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------- |
| Heading / H1 (Ubuntu 24px/500)     | `typography.heading.1`       | `<IressText element="h1">`                                                                        |
| Heading / H2 (Ubuntu 20px/500)     | `typography.heading.2`       | `<IressText element="h2">`                                                                        |
| Heading / H3 (Ubuntu 18px/500)     | `typography.heading.3`       | `<IressText element="h3">`                                                                        |
| Heading / H4 (Ubuntu 16px/500)     | `typography.heading.4`       | `<IressText element="h4">`                                                                        |
| Heading / H5 (Ubuntu 16px/400)     | `typography.heading.5`       | `<IressText element="h5">`                                                                        |
| Body / MD Regular (Inter 14px/400) | `typography.body.md.regular` | `<IressText>` (default) or `<IressText element="p">` for paragraph semantics                      |
| Body / MD Medium (Inter 14px/500)  | `typography.body.md.medium`  | `<IressText textStyle="typography.body.md.medium">` — use `textStyle` because there is no semantic medium element |
| Body / MD Strong (Inter 14px/600)  | `typography.body.md.strong`  | `<IressText element="strong">` — conveys emphasis to screen readers                               |
| Body / SM Regular (Inter 12px/400) | `typography.body.sm`         | `<IressText element="small">` — conveys fine print / secondary text                               |
| Body / SM Strong (Inter 12px/600)  | `typography.body.sm.strong`  | `<IressText element="small"><strong>...</strong></IressText>`                                     |
| Code (Space 16px/400)              | `typography.code`            | `<IressText element="code">`                                                                      |

> **When to use `textStyle`:** Only when you need to visually override the default styling of a semantic element — e.g. making an `h2` look like an `h4` for visual hierarchy while keeping the correct heading level for accessibility: `<IressText element="h2" textStyle="typography.heading.4">`.

> **Tip:** When translating Figma frames that contain mixed or unstructured text (e.g. CMS content, markdown, rich text blocks), wrap the content in `IressText` and nest native HTML elements (`<p>`, `<strong>`, `<a>`, `<ul>`, etc.) inside it. This is an allowed pattern that lets `IressText` apply consistent typography while preserving the original content structure.

## Translation Examples

### Figma: Login Form Frame

**Figma structure:**

- Frame: Auto-layout vertical, gap 16px, padding 24px
  - Text: "Log In" (Heading H2)
  - Input: "Email" (Text Input)
  - Input: "Password" (Password Input)
  - Button: "Sign in" (Primary)
  - Text: "Forgot password?" (Link)

**IDS implementation:**

```tsx
import {
  IressStack,
  IressText,
  IressField,
  IressInput,
  IressButton,
  IressLink,
  IressCard,
} from '@iress-oss/ids-components';

function LoginForm() {
  return (
    <IressCard p="lg">
      <IressStack gap="md">
        <IressText element="h2">Log In</IressText>
        <IressField label="Email" htmlFor="email" required>
          <IressInput id="email" type="email" />
        </IressField>
        <IressField label="Password" htmlFor="password" required>
          <IressInput id="password" type="password" />
        </IressField>
        <IressButton mode="primary" type="submit">
          Sign in
        </IressButton>
        <IressLink href="/forgot-password">Forgot password?</IressLink>
      </IressStack>
    </IressCard>
  );
}
```

### Figma: Alert Banner

**Figma structure:**

- Frame: Fill `#EBF9F5`, border-radius 12px, padding 16px
  - Auto-layout horizontal, gap 8px
  - Icon: "check_circle"
  - Text: "Your changes have been saved" (Body MD)

**IDS implementation:**

```tsx
import { IressAlert } from '@iress-oss/ids-components';

// IressAlert already handles the layout, icon, and styling
<IressAlert status="success">Your changes have been saved</IressAlert>;
```

> **Key insight:** IDS components encapsulate their styling. Don't recreate layout/colours from Figma — use the component's props (like `status`) and let IDS handle the visual treatment.

### Figma: Status Modal (Danger Confirmation)

**Figma structure:**

- Modal frame with danger icon in header
  - Heading: "Delete record?"
  - Body text: "This action cannot be undone."
  - Footer: Two buttons (Cancel, Delete)

**IDS implementation:**

```tsx
import { IressModal } from '@iress-oss/ids-components';

// Status modals use the `status` prop — the icon, colours, and button status are handled automatically.
// Use `actions` instead of `footer` for opinionated action buttons.
<IressModal
  status="danger"
  heading="Delete record?"
  actions={[{ children: 'Cancel', mode: 'tertiary' }, { children: 'Delete' }]}
  show={isOpen}
  onShowChange={setIsOpen}
>
  This action cannot be undone.
</IressModal>;
```

> **Key insight:** When `status` is set on `IressModal`, the `footer` prop is not available — use `actions` instead. Each action button automatically inherits the modal's status. Size is restricted to `sm` (default) or `md`.

### Figma: Data Table

**Figma structure:**

- Frame: Table with header row and data rows
  - Header: ["Name", "Email", "Status", "Actions"]
  - Rows: data with tag in Status column, button in Actions

**IDS implementation:**

```tsx
import { IressTable, IressTag, IressButton } from '@iress-oss/ids-components';
import type { TableColumn } from '@iress-oss/ids-components';

interface User {
  name: string;
  email: string;
  status: string;
  id: string;
}

const columns: TableColumn<User>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'status',
    label: 'Status',
    format: (value) => <IressTag>{value}</IressTag>,
  },
  {
    key: 'actions',
    label: 'Actions',
    format: (_, row) => (
      <IressButton mode="tertiary" icon="edit">
        Edit
      </IressButton>
    ),
  },
];

function UsersTable({ users }: { users: User[] }) {
  return <IressTable caption="Users" rows={users} columns={columns} />;
}
```

> **Key insight:** `IressTable` is data-driven — pass `rows` and `columns` props instead of composing sub-components. Use the `format` function on columns to render custom cell content like tags or buttons.

## Responsive Layout

**Always produce responsive output**, even when Figma only provides a single desktop frame. IDS uses a 12-column grid with 6 breakpoints — every translation should consider how the layout adapts to smaller screens.

### Responsive Design Principles

When no mobile Figma frames are provided, apply these principles:

1. **Identify the primary task** — Determine what the user is trying to accomplish on the page (e.g. filling a form, reviewing data, making a decision). The mobile layout should prioritise this task.
2. **Stack multi-column layouts** — Any side-by-side columns should stack to full-width (`span={{ xs: 12, md: ... }}`) on mobile.
3. **Relocate secondary content** — Move supplementary UI (filters, sidebars, secondary actions, metadata panels) into an `IressSlideout` or collapsible section on mobile so the primary task remains front and centre.
4. **Simplify dense layouts** — Tables with many columns, multi-panel dashboards, and wide forms should adapt: hide non-essential columns with `hideBelow`, collapse sections, or switch to a card-based layout on mobile using `useBreakpoint`.
5. **Preserve all functionality** — Never remove features on mobile. Use `IressSlideout`, `IressModal`, expandable sections, or `IressTabSet` to keep functionality accessible without cluttering the mobile view.

### Breakpoints

| Breakpoint | Screen width    |
| ---------- | --------------- |
| `xs`       | 0 – 575px       |
| `sm`       | 576px – 767px   |
| `md`       | 768px – 1023px  |
| `lg`       | 1024px – 1279px |
| `xl`       | 1280px – 1599px |
| `xxl`      | 1600px+         |

### Responsive Props

Many props accept a `ResponsiveProp` — either a single value or an object keyed by breakpoint:

```tsx
// Single value (all breakpoints)
<IressCol span={6} />

// Responsive — full-width on mobile, half on medium+
<IressCol span={{ xs: 12, md: 6 }} />
```

Props that support responsive values: `span`, `offset`, `gap`, `gutter`, `rowGap`, `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`, `width`, `srOnly`, `hideFrom`, `hideBelow`.

### Figma Multi-Viewport → Responsive Columns

When Figma provides separate mobile and desktop frames for the same layout:

**Figma mobile (xs):** Single column stack
**Figma desktop (md+):** Two-column sidebar layout

```tsx
<IressRow gutter={{ xs: 'sm', md: 'lg' }}>
  <IressCol span={{ xs: 12, md: 4 }}>
    <Sidebar />
  </IressCol>
  <IressCol span={{ xs: 12, md: 8 }}>
    <MainContent />
  </IressCol>
</IressRow>
```

### Figma Desktop-Only → Inferred Responsive Layout

When Figma only provides a desktop frame with a sidebar + main content area, infer the mobile layout:

```tsx
import { useState } from 'react';
import {
  useBreakpoint,
  IressSlideout,
  IressButton,
  IressStack,
  IressRow,
  IressCol,
} from '@iress-oss/ids-components';

function Page() {
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      {isMobile ? (
        // Mobile: primary content first, secondary content in slideout
        <IressStack gap="md">
          <IressButton
            mode="secondary"
            icon="filter_list"
            onClick={() => setFiltersOpen(true)}
          >
            Filters
          </IressButton>
          <MainContent />
          <IressSlideout
            heading="Filters"
            show={filtersOpen}
            onShowChange={setFiltersOpen}
          >
            <FilterPanel />
          </IressSlideout>
        </IressStack>
      ) : (
        // Desktop: side-by-side layout as designed in Figma
        <IressRow gutter="lg">
          <IressCol span={3}>
            <FilterPanel />
          </IressCol>
          <IressCol span={9}>
            <MainContent />
          </IressCol>
        </IressRow>
      )}
    </>
  );
}
```

### Responsive Visibility

Use `hideFrom`/`hideBelow` CSS props directly on any component:

```tsx
<IressButton hideBelow="md">Desktop action</IressButton>
<IressText hideFrom="lg">Mobile only text</IressText>
```

For conditional rendering based on breakpoint (e.g. rendering entirely different components), use the `useBreakpoint` hook:

```tsx
import { useBreakpoint } from '@iress-oss/ids-components';

function Navigation() {
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';

  return isMobile ? <MobileNav /> : <DesktopNav />;
}
```

## Best Practices

1. **Minimise component nesting** — Use the fewest components possible. Every wrapper must earn its place. Before adding `IressInline` or `IressStack`, check whether the parent already handles layout (e.g. `IressCard` has `heading` and `footer` props; `IressModal` has `actions`; `IressButtonGroup` handles horizontal button layout). Don't wrap a single child in a layout component.
2. **Use IDS components, not raw elements** — IDS components encapsulate correct spacing, colours, border radius, and accessibility
3. **Don't recreate component internals** — If Figma shows a button with specific padding/radius, use `IressButton` with the right `mode` — the styling is built in
4. **Map Figma gap/padding to spacing tokens** — Divide pixel value by 4 to get the token number, then use the full token: 16px → `"spacing.4"`, 24px → `"spacing.6"`. Alias tokens (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`) are also valid. Never use bare numbers like `gap="4"`.
5. **Prefer semantic props over manual styling** — Use `status="danger"` instead of `bg="colour.system.danger.fill"`
6. **Use IressField for all form inputs** — It provides the label, hint, and validation layout
7. **Respect responsive patterns** — Use `hideFrom`/`hideBelow` props or the `useBreakpoint` hook for responsive visibility; use responsive `span` on `IressCol` for adaptive grid layouts
8. **Always make grid layouts responsive** — When translating Figma multi-column layouts, use responsive `span` values (e.g. `span={{ xs: 12, md: 6 }}`) so columns stack on mobile
9. **Check the component docs** — Read the specific component doc for detailed props and patterns (`node_modules/@iress-oss/ids-components/.ai/components/`)

## Common Mistakes

### Unnecessary layout wrappers

Don't add `IressInline` or `IressStack` when it adds no value. Every Figma auto-layout frame does NOT need its own layout wrapper — check the IDS component first.

```tsx
// ❌ Unnecessary nesting — IressStack wrapping a single child
<IressStack gap="md">
  <IressInline gap="sm">
    <IressButton mode="primary">Save</IressButton>
    <IressButton mode="secondary">Cancel</IressButton>
  </IressInline>
</IressStack>

// ✅ Single group of buttons only needs IressInline
<IressInline gap="sm">
  <IressButton mode="primary">Save</IressButton>
  <IressButton mode="secondary">Cancel</IressButton>
</IressInline>
```

**Rule of thumb:** When Figma shows an auto-layout frame, check if the corresponding IDS component already provides that layout before adding a wrapper. Components like `IressModal` (with `actions`) and `IressButtonGroup` already handle their internal layout. For `IressCard`, use the `heading` and `footer` props to structure content — but note the `footer` slot does not auto-layout its children, so use `IressInline` inside `footer` when you need horizontal button layout.

### Other common anti-patterns

For the full list of common anti-patterns (disabled buttons, redundant textStyle, legacy slot attributes, raw HTML, hardcoded values), read the Common Mistakes guide at `node_modules/@iress-oss/ids-components/.ai/guides/foundations-common-mistakes.md` (requires `@iress-oss/ids-components` to be installed).

**Figma-specific addition:** When Figma shows named content areas ("prepend", "append", "footer"), map them to the corresponding **React prop**, not to a `slot` attribute. When Figma shows a greyed-out or disabled button state, do not use `disabled` — see the guide for alternatives.


---

# Skill: UI Doctor

Audit and review application UI for IDS compliance, accessibility, usability, and cognitive load. This skill helps AI agents perform comprehensive UI reviews covering component usage, accessibility (WCAG), usability heuristics (Nielsen's 10), cognitive load, and progressive disclosure — then produce actionable reports with prioritised recommendations.

## When to Use

Activate this skill when the user says things like:

- "Review this page / component / file for accessibility"
- "Check the usability of this UI"
- "Audit this for IDS compliance"
- "This feels like too much cognitive load"
- "Are we following IDS guidelines?"
- "Check for a11y issues"
- "Review this UI"
- "Is this form accessible?"
- "Can you do a UX review?"

Or more generally:

- Reviewing application UI code for IDS compliance
- Validating accessibility (WCAG 2.1 AA)
- Assessing usability and cognitive load
- Evaluating design token usage and consistency
- Generating a UI health report with a compliance score
- Providing recommendations to improve UX, accessibility, and IDS adoption

## Audit Modes

**Default: Quick UX Review.** Use this unless the user specifically asks for accessibility or full compliance. Escalate to a more thorough mode if the quick review reveals significant issues.

### Quick UX Review (default)

Use when the user asks for a general UI review, usability check, or "does this look right?"

1. **Cognitive load & information architecture** — Is the UI overwhelming? Are there too many items, options, or actions visible at once?
2. **Usability heuristics** — Evaluate against Nielsen's 10 (see audit checklist § Usability Heuristics)

# IDS UI Doctor Audit Checklist

Use this checklist when performing a UI doctor audit.

## Setup & Configuration

- [ ] `IressProvider` wraps the application root (either directly, or via `IressShadow` which is a superset that includes Provider + CSS injection)
- [ ] `@iress-oss/ids-components/dist/style.css` is imported (required for component styles — not needed if using `IressShadow`, which injects styles automatically)
- [ ] `@iress-oss/ids-components` is a project dependency
- [ ] `@iress-oss/ids-tokens/build/css-vars.css` is imported only if tokens are used directly in application code
- [ ] `react-hook-form` is installed as a peer dependency if using `IressForm`
- [ ] No conflicting global CSS resets that override IDS styles
- [ ] If CSP is enforced: `fonts.googleapis.com` and `fonts.gstatic.com` are in `style-src` / `font-src`; `cdn.iress.com` is included if using legacy Font Awesome icons or `IressTheme`
- [ ] If using `IressShadow` and CSP blocks inline styles: `<meta name="csp-nonce" content="...">` is present in `<head>` (optional)

## Component Usage

- [ ] No raw `<button>` elements — use `IressButton`
- [ ] No raw `<input>` elements — use `IressField` + `IressInput`
- [ ] No raw `<select>` elements — use `IressField` + `IressSelect`
- [ ] No raw `<form>` elements — use `IressForm` + `IressFormField`
- [ ] No raw `<table>` elements — use `IressTable`
- [ ] No raw `<input type="range">` — use `IressSlider`
- [ ] No custom modal/dialog — use `IressModal`
- [ ] No custom drawer — use `IressSlideout`
- [ ] No custom tabs — use `IressTabSet`
- [ ] No custom tooltip — use `IressTooltip`
- [ ] No custom alert/toast — use `IressAlert` / `IressToaster`
- [ ] No custom accordion/details — use `IressExpander`
- [ ] No custom autocomplete/typeahead — use `IressAutocomplete`
- [ ] No custom select-with-search — use `IressSelect`
- [ ] No custom read-only display — use `IressReadonly`
- [ ] No custom button group / segmented control — use `IressButtonGroup`
- [ ] No custom validation messages — use `IressValidationMessage` / `IressValidationSummary`
- [ ] No third-party UI library components (MUI, Ant, Chakra, etc.) where IDS equivalents exist

## Design Tokens

- [ ] No hardcoded colour hex/rgb values — use IDS colour tokens
- [ ] No hardcoded pixel spacing — use IDS spacing tokens
- [ ] No hardcoded font properties — use IDS typography tokens
- [ ] No hardcoded border-radius — use IDS radius tokens

## Pattern Usage

- [ ] Forms use `IressForm` + `IressFormField` instead of custom form handling
- [ ] Form validation uses declarative `rules` prop, not custom validation logic
- [ ] Form state managed via React Hook Form (`useWatch`, `ref`), not `useState` + `onChange`
- [ ] Long forms (>8 fields) use `pattern="long"` for sticky heading/actions
- [ ] Loading states use `IressLoading` (preferred) or `IressSkeleton` for custom content placeholder patterns (cache-first data reads from SWR/React Query may not need a loading state if the cache is pre-populated by a prior page)
- [ ] Filter/action dropdowns use `IressDropdownMenu` (not inside forms)
- [ ] Row-level actions use `IressContextualMenu`
- [ ] Application shell navigation uses `IressSideNav`
- [ ] Hierarchy navigation uses `IressBreadcrumbs`
- [ ] Microfrontend style isolation uses `IressShadow`
- [ ] Root-level error boundaries render `IressModal status="danger"` with retry/reload actions (not custom error pages or raw HTML) — check parent components/layouts before flagging; a parent error boundary covering child routes is a valid app-wide pattern
- [ ] Scoped error boundaries (around features/sections) render `IressAlert status="danger"` as inline fallback
- [ ] Error boundaries do NOT use `IressToaster` — toasts are transient and cannot serve as persistent fallback UI

## Accessibility

- [ ] All form inputs have associated labels via `IressField` or `IressFormField`
- [ ] Required fields are marked with `required` prop or `rules={{ required: true }}`
- [ ] Validation messages use IDS patterns (`IressField` status or `IressFormField` rules)
- [ ] Interactive elements have accessible names
- [ ] Skip links present for keyboard navigation (`IressSkipLink`)
- [ ] Colour contrast meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text) — use IDS colour tokens which are pre-validated
- [ ] Focus indicators are visible on all interactive elements — IDS components provide these by default
- [ ] Keyboard navigation works for all interactive elements (Tab, Enter, Space, Escape, Arrow keys)
- [ ] Images have meaningful `alt` text (use `IressImage` which requires `alt` prop)
- [ ] Modal and slideout components trap focus correctly — `IressModal` and `IressSlideout` handle this automatically
- [ ] ARIA landmarks are used appropriately (`<nav>`, `<main>`, `<aside>`, etc.)
- [ ] `IressSideNav` uses proper `<nav>` landmark with `aria-label`
- [ ] `IressBreadcrumbs` uses `<nav>` with `aria-label` and `aria-current="page"` on the last item
- [ ] `IressContextualMenu` has a meaningful `ariaLabel` describing the menu purpose
- [ ] Tables use `IressTable` with proper header cells (`IressTable.HeaderCell`) for screen readers
- [ ] Dynamic content updates (loading states, alerts, toasts) are announced to screen readers
- [ ] `IressAlert` is used for persistent status messages (automatically uses appropriate ARIA roles)
- [ ] `IressToaster` is used for transient notifications that demand attention (uses `aria-live="assertive"` region) — avoid overuse; not every update warrants a toast
- [ ] Subtle, user-initiated UI updates (save indicators, count badges, status dot changes, inline confirmations) use micro animations/interactions with a colocated `aria-live="polite"` region near the component — these are less intrusive than toasts and keep context local
- [ ] `aria-live="polite"` regions are only added for user-initiated updates; system-driven background changes that the user did not trigger should not announce unless they require attention (use `IressToaster` or `IressAlert` for those)
- [ ] No reliance on colour alone to convey information — use text, icons, or patterns alongside colour

## Layout

- [ ] Vertical stacks use `IressStack`
- [ ] Horizontal rows use `IressInline`
- [ ] Grid layouts use `IressRow` + `IressCol`
- [ ] Spacing props use IDS token values (0–10)
- [ ] Responsive visibility uses `hideFrom`/`hideBelow` props or `useBreakpoint` hook
- [ ] Multi-column grid layouts use responsive `span` values (e.g. `span={{ xs: 12, md: 6 }}`) so columns stack on mobile
- [ ] Mobile layout prioritises the primary task — secondary content (filters, sidebars, metadata) is relocated to `IressSlideout`, `IressModal`, or collapsible sections rather than simply stacked
- [ ] All functionality remains accessible on mobile — nothing is removed, only reorganised into appropriate containers

## Cognitive Load & Information Architecture

- [ ] Menus/dropdowns with >10 items enable `searchable` to reduce scanning
- [ ] Forms with >8 fields use `IressForm pattern="long"` for sticky heading/actions
- [ ] Top-level navigation has ≤7 items; additional items are grouped or nested
- [ ] Secondary content is hidden behind `IressExpander` or `IressTabSet` until needed (progressive disclosure)
- [ ] Complex workflows are broken into multi-step flows rather than one overwhelming screen
- [ ] Related content is grouped in `IressCard` or `IressPanel` rather than presented flat
- [ ] Spacing between groups uses adequate `IressStack gap` tokens to prevent visual overload
- [ ] Bulk/batch operations (select-all + delete, mass update) require explicit confirmation via `IressModal`, showing the count of affected items
- [ ] After modal close, focus returns to the trigger element
- [ ] After item deletion, focus moves to the next or previous item in the list
- [ ] After form submission, focus moves to the success message, error summary, or next logical element
- [ ] Loading state transitions do not cause layout shifts that disorient users
- [ ] Visual hierarchy is established with `IressText textStyle` — primary content is prominent, secondary is de-emphasised
- [ ] No more than one primary action (`mode="primary"`) per section to reduce decision paralysis

## Button Hierarchy

- [ ] Maximum one `mode="primary"` button per section
- [ ] Destructive actions use `status="danger"` not custom red styling
- [ ] Icon-only buttons include accessible text
- [ ] No `disabled` attribute on `IressButton` — keep buttons enabled and validate on click instead (disabled buttons are invisible to screen readers and provide no path to resolution)

## IressText Usage

- [ ] No redundant `textStyle` when `element` already provides the correct typography (e.g. `element="h1" textStyle="typography.heading.1"` is redundant — use `element="h1"` alone)
- [ ] `textStyle` is only used to intentionally override visual hierarchy (e.g. `element="h2" textStyle="typography.heading.4"`) or at the discretion of a designer

## Usability Heuristics

Evaluate the application against these usability principles (based on [Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)). Each heuristic includes concrete IDS guidance for how to satisfy it.

### 1. Visibility of System Status

The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

- [ ] Loading states use `IressLoading` with the correct pattern (`page`, `component`, `start-up`, `validate`, `long`) so users always see feedback proportional to wait time; `IressSkeleton` is also valid for custom content placeholder patterns where skeleton screens mirror the page layout
- [ ] Form submission provides visible feedback — use `IressLoading pattern="validate"` during submission, `IressAlert` or `IressToaster` for success/failure
- [ ] Subtle state confirmations (auto-save, background sync, inline status changes) use micro animations or transitions rather than toasts — pair with `aria-live="polite"` colocated near the component when the update was user-initiated
- [ ] Progress indicators are used for multi-step processes — `IressProgress` for deterministic operations, `IressSpinner` for indeterminate
- [ ] Active states are visible — selected tabs (`IressTabSet`), active nav items (`IressSideNav`), current breadcrumb (`IressBreadcrumbs`) all show where the user is
- [ ] Toggled/selected states are visually clear — `IressToggle`, `IressCheckbox`, `IressRadio` provide built-in active states

### 2. Match Between System and the Real World

The system should speak the user's language, with words, phrases, and concepts familiar to the user.

- [ ] Labels use plain, domain-appropriate language — avoid technical jargon in `IressField` labels, `IressButton` text, and `IressAlert` messages
- [ ] Icons are recognisable and paired with text — use `IressIcon` with a text label; avoid icon-only actions unless the icon is universally understood (e.g., close ✕, search 🔍)
- [ ] Status colours follow real-world conventions — `info` (blue), `success` (green), `warning` (amber), `danger` (red) via IDS status tokens
- [ ] Form fields are ordered logically — group related fields with `IressFormFieldset`, order by natural workflow

### 3. User Control and Freedom

Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action.

- [ ] Modals have a visible close button and Escape key dismissal — `IressModal` provides both by default
- [ ] Slideouts can be dismissed — `IressSlideout` supports close button and backdrop click
- [ ] Destructive actions require confirmation — use `IressModal` as a confirmation dialog before delete/remove operations
- [ ] Forms support cancel/reset — include a secondary `IressButton` for cancel alongside the primary submit action
- [ ] Multi-step flows allow going back — breadcrumbs (`IressBreadcrumbs`) or back buttons let users reverse navigation
- [ ] Toasts are dismissible — `IressToaster` notifications can be closed by the user

### 4. Consistency and Standards

Users should not have to wonder whether different words, situations, or actions mean the same thing.

- [ ] All components come from IDS — no mix of IDS + third-party + custom for the same purpose (e.g., some buttons IDS, some MUI)
- [ ] Design tokens are used consistently — no mix of hardcoded values and tokens for the same property (e.g., some colours from tokens, some hardcoded)
- [ ] Same action, same pattern — similar forms use the same `IressForm` pattern, similar loading states use the same `IressLoading` pattern
- [ ] Button hierarchy is consistent — `mode="primary"` always means the main action, `mode="secondary"` always means supporting action, across all views
- [ ] Terminology is consistent — the same action uses the same label everywhere (e.g., "Save" not sometimes "Save" and sometimes "Submit" for the same operation)

### 5. Error Prevention

Even better than good error messages is a careful design that prevents a problem from occurring in the first place.

- [ ] Form validation uses declarative `rules` — `IressFormField` `rules` prop prevents invalid submissions before they happen
- [ ] Required fields are clearly marked — `required` prop on `IressField` or `rules={{ required: true }}` on `IressFormField`
- [ ] Input constraints are communicated — use `hint` prop on `IressField`/`IressFormField` to show format expectations, character limits, or examples
- [ ] Destructive actions require explicit confirmation — delete/remove behind `IressModal` confirmation, not a single click
- [ ] Dangerous buttons are visually distinct — `status="danger"` on `IressButton` prevents casual clicks
- [ ] Dropdown menus place destructive items last and visually separate — `IressContextualMenu` convention

### 6. Recognition Rather Than Recall

Minimise the user's memory load by making elements, actions, and options visible.

- [ ] Navigation is persistent — `IressSideNav` keeps sections visible rather than hidden behind hamburger menus on desktop
- [ ] Breadcrumbs show location — `IressBreadcrumbs` reminds users where they are in the hierarchy
- [ ] Form labels are always visible — `IressField` labels appear above inputs, not as disappearing placeholder text
- [ ] Actions are visible, not hidden — use `IressButton` for primary actions, `IressContextualMenu` for secondary, avoid burying actions in deep menus
- [ ] Searchable options for long lists — `IressDropdownMenu` with `searchable` for 10+ options, `IressAutocomplete` for typeahead

### 7. Flexibility and Efficiency of Use

Accelerators — unseen by the novice user — may speed up interaction for the expert user.

- [ ] Keyboard shortcuts for power users — ensure all interactive IDS components respond to standard keyboard patterns (Enter, Space, Escape, Arrow keys)
- [ ] Skip links for keyboard users — `IressSkipLink` lets experienced keyboard users bypass repetitive navigation
- [ ] Searchable selects — `IressSelect` and `IressDropdownMenu` with search enabled let power users type to filter instead of scrolling
- [ ] Autocomplete for repetitive input — `IressAutocomplete` reduces typing for known-value fields
- [ ] Responsive layouts — `hideFrom`/`hideBelow` props or `useBreakpoint` hook adapt the interface for different device contexts
- [ ] Mobile experience focuses on the primary task — secondary content is accessible via `IressSlideout` or collapsible sections, not competing for screen space

### 8. Aesthetic and Minimalist Design

Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.

- [ ] Use IDS typography scale — `IressText` with appropriate `textStyle` creates clear visual hierarchy without custom styling
- [ ] Spacing is consistent and intentional — `IressStack`, `IressInline`, and spacing tokens prevent visual clutter
- [ ] One primary action per section — `mode="primary"` on a single `IressButton` draws the eye to what matters
- [ ] Use `IressCard` / `IressPanel` to group related content — rather than showing everything in a flat layout
- [ ] Loading states use `IressLoading` progressive disclosure — no indicator <500ms, spinner at 500ms, message at 2s (avoids unnecessary visual noise for fast operations)
- [ ] Alerts are used sparingly and appropriately — `IressAlert` for persistent status, `IressToaster` for transient feedback

### 9. Help Users Recognise, Diagnose, and Recover from Errors

Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.

- [ ] Validation messages are human-readable — `IressFormField` `rules` `message` prop provides user-friendly text, not technical codes
- [ ] Errors appear next to the relevant field — `IressFormField` and `IressField` display inline validation, not in a separate area
- [ ] Summary of errors for long forms — `IressValidationSummary` at the top of long forms helps users find all issues
- [ ] Status indicators are clear — `IressField` `status="danger"` with `statusMessage` for field-level errors, `IressAlert status="danger"` for page-level errors
- [ ] Error state is visually distinct — IDS danger tokens (red border, red text) are applied automatically by `status="danger"`
- [ ] Recovery path is clear — error messages suggest what to do (e.g., "Enter a valid email address" not just "Invalid input")

### 10. Help and Documentation

Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.

- [ ] Hint text guides input — `IressField` and `IressFormField` `hint` prop provides contextual guidance below the label
- [ ] Tooltips explain non-obvious UI — `IressTooltip` for supplementary information on icons, abbreviations, or complex fields
- [ ] Placeholder text is supplementary, not the only label — `placeholder` is used alongside `IressField` `label`, never as a replacement
- [ ] Complex workflows have contextual help — use `IressAlert status="info"` or `IressPopover` to explain steps in multi-part processes
3. **Button hierarchy & layout consistency** — One primary per section, consistent spacing
4. **Quick component scan** — Are obvious raw HTML elements used where IDS components exist?

### Accessibility Review

Use when the user asks about a11y, WCAG, keyboard navigation, or screen reader support.

1. **Form accessibility** — Labels, required indicators, validation messages, id/htmlFor pairing
2. **Keyboard & focus** — Skip links, focus trapping in modals/slideouts, visible focus indicators
3. **Screen reader** — ARIA landmarks, dynamic content announcements, accessible names on interactive elements
4. **Colour & contrast** — WCAG AA contrast ratios, no reliance on colour alone
5. **Cognitive load** — Progressive disclosure, information density (see audit checklist § Cognitive Load)

# IDS UI Doctor Audit Checklist

Use this checklist when performing a UI doctor audit.

## Setup & Configuration

- [ ] `IressProvider` wraps the application root (either directly, or via `IressShadow` which is a superset that includes Provider + CSS injection)
- [ ] `@iress-oss/ids-components/dist/style.css` is imported (required for component styles — not needed if using `IressShadow`, which injects styles automatically)
- [ ] `@iress-oss/ids-components` is a project dependency
- [ ] `@iress-oss/ids-tokens/build/css-vars.css` is imported only if tokens are used directly in application code
- [ ] `react-hook-form` is installed as a peer dependency if using `IressForm`
- [ ] No conflicting global CSS resets that override IDS styles
- [ ] If CSP is enforced: `fonts.googleapis.com` and `fonts.gstatic.com` are in `style-src` / `font-src`; `cdn.iress.com` is included if using legacy Font Awesome icons or `IressTheme`
- [ ] If using `IressShadow` and CSP blocks inline styles: `<meta name="csp-nonce" content="...">` is present in `<head>` (optional)

## Component Usage

- [ ] No raw `<button>` elements — use `IressButton`
- [ ] No raw `<input>` elements — use `IressField` + `IressInput`
- [ ] No raw `<select>` elements — use `IressField` + `IressSelect`
- [ ] No raw `<form>` elements — use `IressForm` + `IressFormField`
- [ ] No raw `<table>` elements — use `IressTable`
- [ ] No raw `<input type="range">` — use `IressSlider`
- [ ] No custom modal/dialog — use `IressModal`
- [ ] No custom drawer — use `IressSlideout`
- [ ] No custom tabs — use `IressTabSet`
- [ ] No custom tooltip — use `IressTooltip`
- [ ] No custom alert/toast — use `IressAlert` / `IressToaster`
- [ ] No custom accordion/details — use `IressExpander`
- [ ] No custom autocomplete/typeahead — use `IressAutocomplete`
- [ ] No custom select-with-search — use `IressSelect`
- [ ] No custom read-only display — use `IressReadonly`
- [ ] No custom button group / segmented control — use `IressButtonGroup`
- [ ] No custom validation messages — use `IressValidationMessage` / `IressValidationSummary`
- [ ] No third-party UI library components (MUI, Ant, Chakra, etc.) where IDS equivalents exist

## Design Tokens

- [ ] No hardcoded colour hex/rgb values — use IDS colour tokens
- [ ] No hardcoded pixel spacing — use IDS spacing tokens
- [ ] No hardcoded font properties — use IDS typography tokens
- [ ] No hardcoded border-radius — use IDS radius tokens

## Pattern Usage

- [ ] Forms use `IressForm` + `IressFormField` instead of custom form handling
- [ ] Form validation uses declarative `rules` prop, not custom validation logic
- [ ] Form state managed via React Hook Form (`useWatch`, `ref`), not `useState` + `onChange`
- [ ] Long forms (>8 fields) use `pattern="long"` for sticky heading/actions
- [ ] Loading states use `IressLoading` (preferred) or `IressSkeleton` for custom content placeholder patterns (cache-first data reads from SWR/React Query may not need a loading state if the cache is pre-populated by a prior page)
- [ ] Filter/action dropdowns use `IressDropdownMenu` (not inside forms)
- [ ] Row-level actions use `IressContextualMenu`
- [ ] Application shell navigation uses `IressSideNav`
- [ ] Hierarchy navigation uses `IressBreadcrumbs`
- [ ] Microfrontend style isolation uses `IressShadow`
- [ ] Root-level error boundaries render `IressModal status="danger"` with retry/reload actions (not custom error pages or raw HTML) — check parent components/layouts before flagging; a parent error boundary covering child routes is a valid app-wide pattern
- [ ] Scoped error boundaries (around features/sections) render `IressAlert status="danger"` as inline fallback
- [ ] Error boundaries do NOT use `IressToaster` — toasts are transient and cannot serve as persistent fallback UI

## Accessibility

- [ ] All form inputs have associated labels via `IressField` or `IressFormField`
- [ ] Required fields are marked with `required` prop or `rules={{ required: true }}`
- [ ] Validation messages use IDS patterns (`IressField` status or `IressFormField` rules)
- [ ] Interactive elements have accessible names
- [ ] Skip links present for keyboard navigation (`IressSkipLink`)
- [ ] Colour contrast meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text) — use IDS colour tokens which are pre-validated
- [ ] Focus indicators are visible on all interactive elements — IDS components provide these by default
- [ ] Keyboard navigation works for all interactive elements (Tab, Enter, Space, Escape, Arrow keys)
- [ ] Images have meaningful `alt` text (use `IressImage` which requires `alt` prop)
- [ ] Modal and slideout components trap focus correctly — `IressModal` and `IressSlideout` handle this automatically
- [ ] ARIA landmarks are used appropriately (`<nav>`, `<main>`, `<aside>`, etc.)
- [ ] `IressSideNav` uses proper `<nav>` landmark with `aria-label`
- [ ] `IressBreadcrumbs` uses `<nav>` with `aria-label` and `aria-current="page"` on the last item
- [ ] `IressContextualMenu` has a meaningful `ariaLabel` describing the menu purpose
- [ ] Tables use `IressTable` with proper header cells (`IressTable.HeaderCell`) for screen readers
- [ ] Dynamic content updates (loading states, alerts, toasts) are announced to screen readers
- [ ] `IressAlert` is used for persistent status messages (automatically uses appropriate ARIA roles)
- [ ] `IressToaster` is used for transient notifications that demand attention (uses `aria-live="assertive"` region) — avoid overuse; not every update warrants a toast
- [ ] Subtle, user-initiated UI updates (save indicators, count badges, status dot changes, inline confirmations) use micro animations/interactions with a colocated `aria-live="polite"` region near the component — these are less intrusive than toasts and keep context local
- [ ] `aria-live="polite"` regions are only added for user-initiated updates; system-driven background changes that the user did not trigger should not announce unless they require attention (use `IressToaster` or `IressAlert` for those)
- [ ] No reliance on colour alone to convey information — use text, icons, or patterns alongside colour

## Layout

- [ ] Vertical stacks use `IressStack`
- [ ] Horizontal rows use `IressInline`
- [ ] Grid layouts use `IressRow` + `IressCol`
- [ ] Spacing props use IDS token values (0–10)
- [ ] Responsive visibility uses `hideFrom`/`hideBelow` props or `useBreakpoint` hook
- [ ] Multi-column grid layouts use responsive `span` values (e.g. `span={{ xs: 12, md: 6 }}`) so columns stack on mobile
- [ ] Mobile layout prioritises the primary task — secondary content (filters, sidebars, metadata) is relocated to `IressSlideout`, `IressModal`, or collapsible sections rather than simply stacked
- [ ] All functionality remains accessible on mobile — nothing is removed, only reorganised into appropriate containers

## Cognitive Load & Information Architecture

- [ ] Menus/dropdowns with >10 items enable `searchable` to reduce scanning
- [ ] Forms with >8 fields use `IressForm pattern="long"` for sticky heading/actions
- [ ] Top-level navigation has ≤7 items; additional items are grouped or nested
- [ ] Secondary content is hidden behind `IressExpander` or `IressTabSet` until needed (progressive disclosure)
- [ ] Complex workflows are broken into multi-step flows rather than one overwhelming screen
- [ ] Related content is grouped in `IressCard` or `IressPanel` rather than presented flat
- [ ] Spacing between groups uses adequate `IressStack gap` tokens to prevent visual overload
- [ ] Bulk/batch operations (select-all + delete, mass update) require explicit confirmation via `IressModal`, showing the count of affected items
- [ ] After modal close, focus returns to the trigger element
- [ ] After item deletion, focus moves to the next or previous item in the list
- [ ] After form submission, focus moves to the success message, error summary, or next logical element
- [ ] Loading state transitions do not cause layout shifts that disorient users
- [ ] Visual hierarchy is established with `IressText textStyle` — primary content is prominent, secondary is de-emphasised
- [ ] No more than one primary action (`mode="primary"`) per section to reduce decision paralysis

## Button Hierarchy

- [ ] Maximum one `mode="primary"` button per section
- [ ] Destructive actions use `status="danger"` not custom red styling
- [ ] Icon-only buttons include accessible text
- [ ] No `disabled` attribute on `IressButton` — keep buttons enabled and validate on click instead (disabled buttons are invisible to screen readers and provide no path to resolution)

## IressText Usage

- [ ] No redundant `textStyle` when `element` already provides the correct typography (e.g. `element="h1" textStyle="typography.heading.1"` is redundant — use `element="h1"` alone)
- [ ] `textStyle` is only used to intentionally override visual hierarchy (e.g. `element="h2" textStyle="typography.heading.4"`) or at the discretion of a designer

## Usability Heuristics

Evaluate the application against these usability principles (based on [Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)). Each heuristic includes concrete IDS guidance for how to satisfy it.

### 1. Visibility of System Status

The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

- [ ] Loading states use `IressLoading` with the correct pattern (`page`, `component`, `start-up`, `validate`, `long`) so users always see feedback proportional to wait time; `IressSkeleton` is also valid for custom content placeholder patterns where skeleton screens mirror the page layout
- [ ] Form submission provides visible feedback — use `IressLoading pattern="validate"` during submission, `IressAlert` or `IressToaster` for success/failure
- [ ] Subtle state confirmations (auto-save, background sync, inline status changes) use micro animations or transitions rather than toasts — pair with `aria-live="polite"` colocated near the component when the update was user-initiated
- [ ] Progress indicators are used for multi-step processes — `IressProgress` for deterministic operations, `IressSpinner` for indeterminate
- [ ] Active states are visible — selected tabs (`IressTabSet`), active nav items (`IressSideNav`), current breadcrumb (`IressBreadcrumbs`) all show where the user is
- [ ] Toggled/selected states are visually clear — `IressToggle`, `IressCheckbox`, `IressRadio` provide built-in active states

### 2. Match Between System and the Real World

The system should speak the user's language, with words, phrases, and concepts familiar to the user.

- [ ] Labels use plain, domain-appropriate language — avoid technical jargon in `IressField` labels, `IressButton` text, and `IressAlert` messages
- [ ] Icons are recognisable and paired with text — use `IressIcon` with a text label; avoid icon-only actions unless the icon is universally understood (e.g., close ✕, search 🔍)
- [ ] Status colours follow real-world conventions — `info` (blue), `success` (green), `warning` (amber), `danger` (red) via IDS status tokens
- [ ] Form fields are ordered logically — group related fields with `IressFormFieldset`, order by natural workflow

### 3. User Control and Freedom

Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action.

- [ ] Modals have a visible close button and Escape key dismissal — `IressModal` provides both by default
- [ ] Slideouts can be dismissed — `IressSlideout` supports close button and backdrop click
- [ ] Destructive actions require confirmation — use `IressModal` as a confirmation dialog before delete/remove operations
- [ ] Forms support cancel/reset — include a secondary `IressButton` for cancel alongside the primary submit action
- [ ] Multi-step flows allow going back — breadcrumbs (`IressBreadcrumbs`) or back buttons let users reverse navigation
- [ ] Toasts are dismissible — `IressToaster` notifications can be closed by the user

### 4. Consistency and Standards

Users should not have to wonder whether different words, situations, or actions mean the same thing.

- [ ] All components come from IDS — no mix of IDS + third-party + custom for the same purpose (e.g., some buttons IDS, some MUI)
- [ ] Design tokens are used consistently — no mix of hardcoded values and tokens for the same property (e.g., some colours from tokens, some hardcoded)
- [ ] Same action, same pattern — similar forms use the same `IressForm` pattern, similar loading states use the same `IressLoading` pattern
- [ ] Button hierarchy is consistent — `mode="primary"` always means the main action, `mode="secondary"` always means supporting action, across all views
- [ ] Terminology is consistent — the same action uses the same label everywhere (e.g., "Save" not sometimes "Save" and sometimes "Submit" for the same operation)

### 5. Error Prevention

Even better than good error messages is a careful design that prevents a problem from occurring in the first place.

- [ ] Form validation uses declarative `rules` — `IressFormField` `rules` prop prevents invalid submissions before they happen
- [ ] Required fields are clearly marked — `required` prop on `IressField` or `rules={{ required: true }}` on `IressFormField`
- [ ] Input constraints are communicated — use `hint` prop on `IressField`/`IressFormField` to show format expectations, character limits, or examples
- [ ] Destructive actions require explicit confirmation — delete/remove behind `IressModal` confirmation, not a single click
- [ ] Dangerous buttons are visually distinct — `status="danger"` on `IressButton` prevents casual clicks
- [ ] Dropdown menus place destructive items last and visually separate — `IressContextualMenu` convention

### 6. Recognition Rather Than Recall

Minimise the user's memory load by making elements, actions, and options visible.

- [ ] Navigation is persistent — `IressSideNav` keeps sections visible rather than hidden behind hamburger menus on desktop
- [ ] Breadcrumbs show location — `IressBreadcrumbs` reminds users where they are in the hierarchy
- [ ] Form labels are always visible — `IressField` labels appear above inputs, not as disappearing placeholder text
- [ ] Actions are visible, not hidden — use `IressButton` for primary actions, `IressContextualMenu` for secondary, avoid burying actions in deep menus
- [ ] Searchable options for long lists — `IressDropdownMenu` with `searchable` for 10+ options, `IressAutocomplete` for typeahead

### 7. Flexibility and Efficiency of Use

Accelerators — unseen by the novice user — may speed up interaction for the expert user.

- [ ] Keyboard shortcuts for power users — ensure all interactive IDS components respond to standard keyboard patterns (Enter, Space, Escape, Arrow keys)
- [ ] Skip links for keyboard users — `IressSkipLink` lets experienced keyboard users bypass repetitive navigation
- [ ] Searchable selects — `IressSelect` and `IressDropdownMenu` with search enabled let power users type to filter instead of scrolling
- [ ] Autocomplete for repetitive input — `IressAutocomplete` reduces typing for known-value fields
- [ ] Responsive layouts — `hideFrom`/`hideBelow` props or `useBreakpoint` hook adapt the interface for different device contexts
- [ ] Mobile experience focuses on the primary task — secondary content is accessible via `IressSlideout` or collapsible sections, not competing for screen space

### 8. Aesthetic and Minimalist Design

Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.

- [ ] Use IDS typography scale — `IressText` with appropriate `textStyle` creates clear visual hierarchy without custom styling
- [ ] Spacing is consistent and intentional — `IressStack`, `IressInline`, and spacing tokens prevent visual clutter
- [ ] One primary action per section — `mode="primary"` on a single `IressButton` draws the eye to what matters
- [ ] Use `IressCard` / `IressPanel` to group related content — rather than showing everything in a flat layout
- [ ] Loading states use `IressLoading` progressive disclosure — no indicator <500ms, spinner at 500ms, message at 2s (avoids unnecessary visual noise for fast operations)
- [ ] Alerts are used sparingly and appropriately — `IressAlert` for persistent status, `IressToaster` for transient feedback

### 9. Help Users Recognise, Diagnose, and Recover from Errors

Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.

- [ ] Validation messages are human-readable — `IressFormField` `rules` `message` prop provides user-friendly text, not technical codes
- [ ] Errors appear next to the relevant field — `IressFormField` and `IressField` display inline validation, not in a separate area
- [ ] Summary of errors for long forms — `IressValidationSummary` at the top of long forms helps users find all issues
- [ ] Status indicators are clear — `IressField` `status="danger"` with `statusMessage` for field-level errors, `IressAlert status="danger"` for page-level errors
- [ ] Error state is visually distinct — IDS danger tokens (red border, red text) are applied automatically by `status="danger"`
- [ ] Recovery path is clear — error messages suggest what to do (e.g., "Enter a valid email address" not just "Invalid input")

### 10. Help and Documentation

Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.

- [ ] Hint text guides input — `IressField` and `IressFormField` `hint` prop provides contextual guidance below the label
- [ ] Tooltips explain non-obvious UI — `IressTooltip` for supplementary information on icons, abbreviations, or complex fields
- [ ] Placeholder text is supplementary, not the only label — `placeholder` is used alongside `IressField` `label`, never as a replacement
- [ ] Complex workflows have contextual help — use `IressAlert status="info"` or `IressPopover` to explain steps in multi-part processes

### Full Compliance Audit

Use when the user asks for a complete IDS audit or compliance report.

1. Run **all** checklist sections from the audit checklist

# IDS UI Doctor Audit Checklist

Use this checklist when performing a UI doctor audit.

## Setup & Configuration

- [ ] `IressProvider` wraps the application root (either directly, or via `IressShadow` which is a superset that includes Provider + CSS injection)
- [ ] `@iress-oss/ids-components/dist/style.css` is imported (required for component styles — not needed if using `IressShadow`, which injects styles automatically)
- [ ] `@iress-oss/ids-components` is a project dependency
- [ ] `@iress-oss/ids-tokens/build/css-vars.css` is imported only if tokens are used directly in application code
- [ ] `react-hook-form` is installed as a peer dependency if using `IressForm`
- [ ] No conflicting global CSS resets that override IDS styles
- [ ] If CSP is enforced: `fonts.googleapis.com` and `fonts.gstatic.com` are in `style-src` / `font-src`; `cdn.iress.com` is included if using legacy Font Awesome icons or `IressTheme`
- [ ] If using `IressShadow` and CSP blocks inline styles: `<meta name="csp-nonce" content="...">` is present in `<head>` (optional)

## Component Usage

- [ ] No raw `<button>` elements — use `IressButton`
- [ ] No raw `<input>` elements — use `IressField` + `IressInput`
- [ ] No raw `<select>` elements — use `IressField` + `IressSelect`
- [ ] No raw `<form>` elements — use `IressForm` + `IressFormField`
- [ ] No raw `<table>` elements — use `IressTable`
- [ ] No raw `<input type="range">` — use `IressSlider`
- [ ] No custom modal/dialog — use `IressModal`
- [ ] No custom drawer — use `IressSlideout`
- [ ] No custom tabs — use `IressTabSet`
- [ ] No custom tooltip — use `IressTooltip`
- [ ] No custom alert/toast — use `IressAlert` / `IressToaster`
- [ ] No custom accordion/details — use `IressExpander`
- [ ] No custom autocomplete/typeahead — use `IressAutocomplete`
- [ ] No custom select-with-search — use `IressSelect`
- [ ] No custom read-only display — use `IressReadonly`
- [ ] No custom button group / segmented control — use `IressButtonGroup`
- [ ] No custom validation messages — use `IressValidationMessage` / `IressValidationSummary`
- [ ] No third-party UI library components (MUI, Ant, Chakra, etc.) where IDS equivalents exist

## Design Tokens

- [ ] No hardcoded colour hex/rgb values — use IDS colour tokens
- [ ] No hardcoded pixel spacing — use IDS spacing tokens
- [ ] No hardcoded font properties — use IDS typography tokens
- [ ] No hardcoded border-radius — use IDS radius tokens

## Pattern Usage

- [ ] Forms use `IressForm` + `IressFormField` instead of custom form handling
- [ ] Form validation uses declarative `rules` prop, not custom validation logic
- [ ] Form state managed via React Hook Form (`useWatch`, `ref`), not `useState` + `onChange`
- [ ] Long forms (>8 fields) use `pattern="long"` for sticky heading/actions
- [ ] Loading states use `IressLoading` (preferred) or `IressSkeleton` for custom content placeholder patterns (cache-first data reads from SWR/React Query may not need a loading state if the cache is pre-populated by a prior page)
- [ ] Filter/action dropdowns use `IressDropdownMenu` (not inside forms)
- [ ] Row-level actions use `IressContextualMenu`
- [ ] Application shell navigation uses `IressSideNav`
- [ ] Hierarchy navigation uses `IressBreadcrumbs`
- [ ] Microfrontend style isolation uses `IressShadow`
- [ ] Root-level error boundaries render `IressModal status="danger"` with retry/reload actions (not custom error pages or raw HTML) — check parent components/layouts before flagging; a parent error boundary covering child routes is a valid app-wide pattern
- [ ] Scoped error boundaries (around features/sections) render `IressAlert status="danger"` as inline fallback
- [ ] Error boundaries do NOT use `IressToaster` — toasts are transient and cannot serve as persistent fallback UI

## Accessibility

- [ ] All form inputs have associated labels via `IressField` or `IressFormField`
- [ ] Required fields are marked with `required` prop or `rules={{ required: true }}`
- [ ] Validation messages use IDS patterns (`IressField` status or `IressFormField` rules)
- [ ] Interactive elements have accessible names
- [ ] Skip links present for keyboard navigation (`IressSkipLink`)
- [ ] Colour contrast meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text) — use IDS colour tokens which are pre-validated
- [ ] Focus indicators are visible on all interactive elements — IDS components provide these by default
- [ ] Keyboard navigation works for all interactive elements (Tab, Enter, Space, Escape, Arrow keys)
- [ ] Images have meaningful `alt` text (use `IressImage` which requires `alt` prop)
- [ ] Modal and slideout components trap focus correctly — `IressModal` and `IressSlideout` handle this automatically
- [ ] ARIA landmarks are used appropriately (`<nav>`, `<main>`, `<aside>`, etc.)
- [ ] `IressSideNav` uses proper `<nav>` landmark with `aria-label`
- [ ] `IressBreadcrumbs` uses `<nav>` with `aria-label` and `aria-current="page"` on the last item
- [ ] `IressContextualMenu` has a meaningful `ariaLabel` describing the menu purpose
- [ ] Tables use `IressTable` with proper header cells (`IressTable.HeaderCell`) for screen readers
- [ ] Dynamic content updates (loading states, alerts, toasts) are announced to screen readers
- [ ] `IressAlert` is used for persistent status messages (automatically uses appropriate ARIA roles)
- [ ] `IressToaster` is used for transient notifications that demand attention (uses `aria-live="assertive"` region) — avoid overuse; not every update warrants a toast
- [ ] Subtle, user-initiated UI updates (save indicators, count badges, status dot changes, inline confirmations) use micro animations/interactions with a colocated `aria-live="polite"` region near the component — these are less intrusive than toasts and keep context local
- [ ] `aria-live="polite"` regions are only added for user-initiated updates; system-driven background changes that the user did not trigger should not announce unless they require attention (use `IressToaster` or `IressAlert` for those)
- [ ] No reliance on colour alone to convey information — use text, icons, or patterns alongside colour

## Layout

- [ ] Vertical stacks use `IressStack`
- [ ] Horizontal rows use `IressInline`
- [ ] Grid layouts use `IressRow` + `IressCol`
- [ ] Spacing props use IDS token values (0–10)
- [ ] Responsive visibility uses `hideFrom`/`hideBelow` props or `useBreakpoint` hook
- [ ] Multi-column grid layouts use responsive `span` values (e.g. `span={{ xs: 12, md: 6 }}`) so columns stack on mobile
- [ ] Mobile layout prioritises the primary task — secondary content (filters, sidebars, metadata) is relocated to `IressSlideout`, `IressModal`, or collapsible sections rather than simply stacked
- [ ] All functionality remains accessible on mobile — nothing is removed, only reorganised into appropriate containers

## Cognitive Load & Information Architecture

- [ ] Menus/dropdowns with >10 items enable `searchable` to reduce scanning
- [ ] Forms with >8 fields use `IressForm pattern="long"` for sticky heading/actions
- [ ] Top-level navigation has ≤7 items; additional items are grouped or nested
- [ ] Secondary content is hidden behind `IressExpander` or `IressTabSet` until needed (progressive disclosure)
- [ ] Complex workflows are broken into multi-step flows rather than one overwhelming screen
- [ ] Related content is grouped in `IressCard` or `IressPanel` rather than presented flat
- [ ] Spacing between groups uses adequate `IressStack gap` tokens to prevent visual overload
- [ ] Bulk/batch operations (select-all + delete, mass update) require explicit confirmation via `IressModal`, showing the count of affected items
- [ ] After modal close, focus returns to the trigger element
- [ ] After item deletion, focus moves to the next or previous item in the list
- [ ] After form submission, focus moves to the success message, error summary, or next logical element
- [ ] Loading state transitions do not cause layout shifts that disorient users
- [ ] Visual hierarchy is established with `IressText textStyle` — primary content is prominent, secondary is de-emphasised
- [ ] No more than one primary action (`mode="primary"`) per section to reduce decision paralysis

## Button Hierarchy

- [ ] Maximum one `mode="primary"` button per section
- [ ] Destructive actions use `status="danger"` not custom red styling
- [ ] Icon-only buttons include accessible text
- [ ] No `disabled` attribute on `IressButton` — keep buttons enabled and validate on click instead (disabled buttons are invisible to screen readers and provide no path to resolution)

## IressText Usage

- [ ] No redundant `textStyle` when `element` already provides the correct typography (e.g. `element="h1" textStyle="typography.heading.1"` is redundant — use `element="h1"` alone)
- [ ] `textStyle` is only used to intentionally override visual hierarchy (e.g. `element="h2" textStyle="typography.heading.4"`) or at the discretion of a designer

## Usability Heuristics

Evaluate the application against these usability principles (based on [Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)). Each heuristic includes concrete IDS guidance for how to satisfy it.

### 1. Visibility of System Status

The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

- [ ] Loading states use `IressLoading` with the correct pattern (`page`, `component`, `start-up`, `validate`, `long`) so users always see feedback proportional to wait time; `IressSkeleton` is also valid for custom content placeholder patterns where skeleton screens mirror the page layout
- [ ] Form submission provides visible feedback — use `IressLoading pattern="validate"` during submission, `IressAlert` or `IressToaster` for success/failure
- [ ] Subtle state confirmations (auto-save, background sync, inline status changes) use micro animations or transitions rather than toasts — pair with `aria-live="polite"` colocated near the component when the update was user-initiated
- [ ] Progress indicators are used for multi-step processes — `IressProgress` for deterministic operations, `IressSpinner` for indeterminate
- [ ] Active states are visible — selected tabs (`IressTabSet`), active nav items (`IressSideNav`), current breadcrumb (`IressBreadcrumbs`) all show where the user is
- [ ] Toggled/selected states are visually clear — `IressToggle`, `IressCheckbox`, `IressRadio` provide built-in active states

### 2. Match Between System and the Real World

The system should speak the user's language, with words, phrases, and concepts familiar to the user.

- [ ] Labels use plain, domain-appropriate language — avoid technical jargon in `IressField` labels, `IressButton` text, and `IressAlert` messages
- [ ] Icons are recognisable and paired with text — use `IressIcon` with a text label; avoid icon-only actions unless the icon is universally understood (e.g., close ✕, search 🔍)
- [ ] Status colours follow real-world conventions — `info` (blue), `success` (green), `warning` (amber), `danger` (red) via IDS status tokens
- [ ] Form fields are ordered logically — group related fields with `IressFormFieldset`, order by natural workflow

### 3. User Control and Freedom

Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action.

- [ ] Modals have a visible close button and Escape key dismissal — `IressModal` provides both by default
- [ ] Slideouts can be dismissed — `IressSlideout` supports close button and backdrop click
- [ ] Destructive actions require confirmation — use `IressModal` as a confirmation dialog before delete/remove operations
- [ ] Forms support cancel/reset — include a secondary `IressButton` for cancel alongside the primary submit action
- [ ] Multi-step flows allow going back — breadcrumbs (`IressBreadcrumbs`) or back buttons let users reverse navigation
- [ ] Toasts are dismissible — `IressToaster` notifications can be closed by the user

### 4. Consistency and Standards

Users should not have to wonder whether different words, situations, or actions mean the same thing.

- [ ] All components come from IDS — no mix of IDS + third-party + custom for the same purpose (e.g., some buttons IDS, some MUI)
- [ ] Design tokens are used consistently — no mix of hardcoded values and tokens for the same property (e.g., some colours from tokens, some hardcoded)
- [ ] Same action, same pattern — similar forms use the same `IressForm` pattern, similar loading states use the same `IressLoading` pattern
- [ ] Button hierarchy is consistent — `mode="primary"` always means the main action, `mode="secondary"` always means supporting action, across all views
- [ ] Terminology is consistent — the same action uses the same label everywhere (e.g., "Save" not sometimes "Save" and sometimes "Submit" for the same operation)

### 5. Error Prevention

Even better than good error messages is a careful design that prevents a problem from occurring in the first place.

- [ ] Form validation uses declarative `rules` — `IressFormField` `rules` prop prevents invalid submissions before they happen
- [ ] Required fields are clearly marked — `required` prop on `IressField` or `rules={{ required: true }}` on `IressFormField`
- [ ] Input constraints are communicated — use `hint` prop on `IressField`/`IressFormField` to show format expectations, character limits, or examples
- [ ] Destructive actions require explicit confirmation — delete/remove behind `IressModal` confirmation, not a single click
- [ ] Dangerous buttons are visually distinct — `status="danger"` on `IressButton` prevents casual clicks
- [ ] Dropdown menus place destructive items last and visually separate — `IressContextualMenu` convention

### 6. Recognition Rather Than Recall

Minimise the user's memory load by making elements, actions, and options visible.

- [ ] Navigation is persistent — `IressSideNav` keeps sections visible rather than hidden behind hamburger menus on desktop
- [ ] Breadcrumbs show location — `IressBreadcrumbs` reminds users where they are in the hierarchy
- [ ] Form labels are always visible — `IressField` labels appear above inputs, not as disappearing placeholder text
- [ ] Actions are visible, not hidden — use `IressButton` for primary actions, `IressContextualMenu` for secondary, avoid burying actions in deep menus
- [ ] Searchable options for long lists — `IressDropdownMenu` with `searchable` for 10+ options, `IressAutocomplete` for typeahead

### 7. Flexibility and Efficiency of Use

Accelerators — unseen by the novice user — may speed up interaction for the expert user.

- [ ] Keyboard shortcuts for power users — ensure all interactive IDS components respond to standard keyboard patterns (Enter, Space, Escape, Arrow keys)
- [ ] Skip links for keyboard users — `IressSkipLink` lets experienced keyboard users bypass repetitive navigation
- [ ] Searchable selects — `IressSelect` and `IressDropdownMenu` with search enabled let power users type to filter instead of scrolling
- [ ] Autocomplete for repetitive input — `IressAutocomplete` reduces typing for known-value fields
- [ ] Responsive layouts — `hideFrom`/`hideBelow` props or `useBreakpoint` hook adapt the interface for different device contexts
- [ ] Mobile experience focuses on the primary task — secondary content is accessible via `IressSlideout` or collapsible sections, not competing for screen space

### 8. Aesthetic and Minimalist Design

Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.

- [ ] Use IDS typography scale — `IressText` with appropriate `textStyle` creates clear visual hierarchy without custom styling
- [ ] Spacing is consistent and intentional — `IressStack`, `IressInline`, and spacing tokens prevent visual clutter
- [ ] One primary action per section — `mode="primary"` on a single `IressButton` draws the eye to what matters
- [ ] Use `IressCard` / `IressPanel` to group related content — rather than showing everything in a flat layout
- [ ] Loading states use `IressLoading` progressive disclosure — no indicator <500ms, spinner at 500ms, message at 2s (avoids unnecessary visual noise for fast operations)
- [ ] Alerts are used sparingly and appropriately — `IressAlert` for persistent status, `IressToaster` for transient feedback

### 9. Help Users Recognise, Diagnose, and Recover from Errors

Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.

- [ ] Validation messages are human-readable — `IressFormField` `rules` `message` prop provides user-friendly text, not technical codes
- [ ] Errors appear next to the relevant field — `IressFormField` and `IressField` display inline validation, not in a separate area
- [ ] Summary of errors for long forms — `IressValidationSummary` at the top of long forms helps users find all issues
- [ ] Status indicators are clear — `IressField` `status="danger"` with `statusMessage` for field-level errors, `IressAlert status="danger"` for page-level errors
- [ ] Error state is visually distinct — IDS danger tokens (red border, red text) are applied automatically by `status="danger"`
- [ ] Recovery path is clear — error messages suggest what to do (e.g., "Enter a valid email address" not just "Invalid input")

### 10. Help and Documentation

Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.

- [ ] Hint text guides input — `IressField` and `IressFormField` `hint` prop provides contextual guidance below the label
- [ ] Tooltips explain non-obvious UI — `IressTooltip` for supplementary information on icons, abbreviations, or complex fields
- [ ] Placeholder text is supplementary, not the only label — `placeholder` is used alongside `IressField` `label`, never as a replacement
- [ ] Complex workflows have contextual help — use `IressAlert status="info"` or `IressPopover` to explain steps in multi-part processes
2. Validate component usage against replacement tables

# IDS Component Replacement Tables

Use these tables when scanning for raw HTML, third-party components, or custom implementations that should be replaced with IDS equivalents.

## Third-Party UI Library Detection

Check for imports from third-party UI libraries that overlap with IDS. Common libraries to flag:

| Third-Party Library                 | Common Imports to Flag                                    | IDS Replacement                |
| ----------------------------------- | --------------------------------------------------------- | ------------------------------ |
| Material UI (`@mui/*`)              | `Button`, `TextField`, `Select`, `Modal`, `Table`, `Tabs` | Equivalent `Iress*` components |
| Ant Design (`antd`)                 | `Button`, `Input`, `Select`, `Modal`, `Table`, `Tabs`     | Equivalent `Iress*` components |
| Chakra UI (`@chakra-ui/*`)          | `Button`, `Input`, `Select`, `Modal`, `Table`             | Equivalent `Iress*` components |
| React Bootstrap (`react-bootstrap`) | `Button`, `Form`, `Modal`, `Table`, `Nav`                 | Equivalent `Iress*` components |
| Radix UI (`@radix-ui/*`)            | `Dialog`, `Popover`, `Tooltip`, `Tabs`, `Select`          | Equivalent `Iress*` components |
| Headless UI (`@headlessui/react`)   | `Dialog`, `Popover`, `Menu`, `Tab`, `Switch`              | Equivalent `Iress*` components |

**How to detect:** Search for import statements matching these package names. Any UI component imported from a third-party library that has an IDS equivalent should be flagged as a **High** priority replacement.

```typescript
// ❌ Third-party UI component — should use IDS
import { Button } from '@mui/material';
import { Modal } from 'antd';
import { Dialog } from '@radix-ui/react-dialog';

// ✅ IDS components
import { IressButton, IressModal } from '@iress-oss/ids-components';
```

## HTML Element → IDS Component Replacement Map

| Raw HTML / Custom Code                  | IDS Replacement                                       | Priority |
| --------------------------------------- | ----------------------------------------------------- | -------- |
| `<button>`                              | `IressButton`                                         | High     |
| `<a>` (navigation link)                 | `IressLink`                                           | High     |
| `<input type="text">`                   | `IressField` + `IressInput`                           | High     |
| `<input type="checkbox">`               | `IressCheckbox`                                       | High     |
| `<input type="radio">`                  | `IressRadio` + `IressRadioGroup`                      | High     |
| `<select>`                              | `IressField` + `IressSelect`                          | High     |
| `<textarea>`                            | `IressField` + `IressInput`                           | High     |
| `<table>`                               | `IressTable`                                          | High     |
| `<label>`                               | `IressField` (wraps input with label)                 | High     |
| `<h1>`–`<h6>`, `<p>`, `<span>` (styled) | `IressText`                                           | Medium   |
| `<img>`                                 | `IressImage`                                          | Medium   |
| `<hr>`                                  | `IressDivider`                                        | Medium   |
| `<dialog>` / custom modal               | `IressModal`                                          | High     |
| Custom confirmation / danger dialog     | `IressModal status="danger"` (or `success`/`warning`) | High     |
| Custom drawer / slideout                | `IressSlideout`                                       | High     |
| Custom tooltip                          | `IressTooltip`                                        | Medium   |
| Custom popover                          | `IressPopover`                                        | Medium   |
| Custom tabs                             | `IressTabSet` + `IressTab`                            | High     |
| Custom spinner / loader                 | `IressSpinner`                                        | Medium   |
| Custom skeleton loader                  | `IressSkeleton`                                       | Low      |
| Custom progress bar                     | `IressProgress`                                       | Low      |
| Custom alert / toast                    | `IressAlert` / `IressToaster`                         | High     |
| Custom card / panel                     | `IressCard` / `IressPanel`                            | Medium   |
| Custom toggle / switch                  | `IressToggle`                                         | High     |
| Custom badge / tag                      | `IressTag` / `IressPill`                              | Low      |
| Custom breadcrumbs                      | `IressBreadcrumbs`                                    | Medium   |
| Custom side navigation                  | `IressSideNav`                                        | Medium   |
| Custom context menu                     | `IressMenu` + `IressMenuItem`                         | Medium   |
| Custom icon (SVG inline)                | `IressIcon`                                           | Medium   |
| `<div>` with flex column styles         | `IressStack`                                          | Medium   |
| `<div>` with flex row styles            | `IressInline`                                         | Medium   |
| `<div>` with grid styles                | `IressRow` + `IressCol`                               | Medium   |
| `<div>` with max-width container        | `IressContainer`                                      | Low      |
| `<form>`                                | `IressForm` + `IressFormField`                        | High     |
| `<input type="range">`                  | `IressSlider`                                         | Medium   |
| `<input type="number">` (currency)      | `IressField` + `IressInputCurrency`                   | Medium   |
| `<details>` / custom accordion          | `IressExpander`                                       | Medium   |
| Custom autocomplete / typeahead         | `IressAutocomplete`                                   | High     |
| Custom select with search               | `IressField` + `IressSelect`                          | High     |
| Custom read-only display                | `IressReadonly`                                       | Medium   |
| Custom segmented control / button group | `IressButtonGroup`                                    | Medium   |
| Custom validation messages              | `IressValidationMessage` / `IressValidationSummary`   | High     |
| Custom styled wrapper `<div>`           | `IressStyled`                                         | Low      |

## What to Look For

```typescript
// ❌ Raw HTML — should use IDS components
<button onClick={handleClick}>Submit</button>
<input type="text" placeholder="Name" />
<select>
  <option>Option 1</option>
</select>
<div className="modal-overlay">...</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>...</div>

// ✅ IDS components
<IressButton mode="primary" onClick={handleClick}>Submit</IressButton>
<IressField label="Name" htmlFor="name">
  <IressInput id="name" placeholder="Name" />
</IressField>
<IressField label="Options" htmlFor="options">
  <IressSelect id="options">
    <option>Option 1</option>
  </IressSelect>
</IressField>
<IressModal open={isOpen} onClose={handleClose}>...</IressModal>
<IressStack gap="4">...</IressStack>
```

## Acceptable Exceptions

Not every raw HTML element is a violation. The following are **acceptable exceptions** that should NOT be flagged:

| Pattern                                                      | Why It's Acceptable                                                                                                                     |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `<a>` inside markdown/MDX renderers                          | Content-driven, not application UI                                                                                                      |
| `<button>` inside third-party widgets the app cannot control | External dependency constraint                                                                                                          |
| `<table>` in email templates                                 | Email clients don't support custom components                                                                                           |
| `<img>` in SVG sprites or `<picture>` elements               | IressImage doesn't cover these use cases                                                                                                |
| `<div>` for ref targets, portals, or measurement containers  | Technical necessity, not layout                                                                                                         |
| Raw elements in test files / stories for demonstration       | Not shipped to users                                                                                                                    |
| `<form>` wrapping a single action (e.g., search bar)         | `IressForm` is best for multi-field forms; standalone search inputs may use `IressAutocomplete` or `IressField` + `IressInput` directly |
| `<input type="hidden">`                                      | Not user-facing UI                                                                                                                      |
| Custom components wrapping IDS components internally         | App-level abstraction is valid as long as IDS components are used underneath                                                            |

**When reporting:** If a potential violation falls into an exception category, note it as "Reviewed — Acceptable Exception" rather than a finding. This prevents false positives and keeps reports actionable.
3. Check design token usage and Provider/CSS setup
4. Evaluate patterns (forms, loading, navigation)
5. Assess usability and cognitive load
6. Generate a full report using the report template

# IDS UI Doctor Report Template

Use this template when generating compliance reports.

```markdown
# IDS UI Doctor Report

**Application:** [App Name]
**Date:** [Audit Date]
**Overall Score:** [X/100]

## Executive Summary

[2-3 sentence summary of overall IDS compliance status]

## Score Breakdown

| Category                | Score | Max     | Status   |
| ----------------------- | ----- | ------- | -------- |
| IDS Component Usage     | X     | 25      | 🔴/🟡/🟢 |
| IDS Pattern Compliance  | X     | 20      | 🔴/🟡/🟢 |
| Accessibility           | X     | 20      | 🔴/🟡/🟢 |
| Design Token Compliance | X     | 15      | 🔴/🟡/🟢 |
| Layout & Spacing        | X     | 10      | 🔴/🟡/🟢 |
| Provider & Setup        | X     | 10      | 🔴/🟡/🟢 |
| **Total**               | **X** | **100** |          |

### Scoring Guide

- 🟢 **90–100%** — Excellent IDS compliance
- 🟡 **60–89%** — Moderate compliance, improvements needed
- 🔴 **Below 60%** — Significant gaps, prioritise remediation

## Detailed Findings

### IDS Component Usage (X/25)

#### Components Correctly Used

- [List of IDS components found and correctly used]

#### Missing IDS Component Opportunities

| Location    | Current Code | Recommended IDS Component | Priority |
| ----------- | ------------ | ------------------------- | -------- |
| [file:line] | `<button>`   | `IressButton`             | High     |
| ...         | ...          | ...                       | ...      |

### IDS Pattern Compliance (X/20)

#### Pattern Usage

| Location    | Current Pattern               | Recommended IDS Pattern        | Priority |
| ----------- | ----------------------------- | ------------------------------ | -------- |
| [file:line] | Custom `<form>` with useState | `IressForm` + `IressFormField` | High     |
| [file:line] | Custom loading spinner        | `IressLoading pattern="page"`  | High     |
| [file:line] | Custom context menu           | `IressContextualMenu`          | Medium   |
| ...         | ...                           | ...                            | ...      |

### Accessibility (X/20)

#### Issues Found

| Location    | Issue                        | Severity | WCAG Criterion               |
| ----------- | ---------------------------- | -------- | ---------------------------- |
| [file:line] | Input missing label          | Critical | 1.3.1 Info and Relationships |
| [file:line] | No skip link                 | High     | 2.4.1 Bypass Blocks          |
| [file:line] | Colour-only status indicator | High     | 1.4.1 Use of Color           |
| [file:line] | Missing alt text on image    | Medium   | 1.1.1 Non-text Content       |
| ...         | ...                          | ...      | ...                          |

### Design Token Compliance (X/15)

#### Hardcoded Values Found

| Location    | Current Value | Recommended Token     | Category |
| ----------- | ------------- | --------------------- | -------- |
| [file:line] | `#003271`     | `colour.primary.fill` | Colour   |
| [file:line] | `16px`        | `spacing.4`           | Spacing  |
| ...         | ...           | ...                   | ...      |

### Layout & Spacing (X/10)

#### Custom Layout Patterns

| Location    | Current Pattern                         | IDS Alternative |
| ----------- | --------------------------------------- | --------------- |
| [file:line] | `display: flex; flex-direction: column` | `IressStack`    |
| ...         | ...                                     | ...             |

### Provider & Setup (X/10)

- [ ] IressProvider wraps application root (or IressShadow, which is a superset)
- [ ] `@iress-oss/ids-components/dist/style.css` imported (not needed if using IressShadow)
- [ ] `@iress-oss/ids-tokens/build/css-vars.css` imported (only if using tokens directly)
- [ ] `react-hook-form` installed (if using IressForm)
- [ ] No conflicting CSS resets

## Recommendations Summary

### Critical (Fix Immediately)

1. [Finding and remediation]

### High Priority (Current Sprint)

1. [Finding and remediation]

### Medium Priority (Next Sprint)

1. [Finding and remediation]

### Low Priority (Backlog)

1. [Finding and remediation]

## IDS Components Available But Not Used

[List any IDS components that could benefit the application but are not currently imported]
```

## Scoped Audits

If the user asks about a **specific file, component, or page**, focus the audit on that scope only. Apply the same checklist items but only to the files in question. Do not scan the entire application unless asked.

Example: "Check the accessibility of `UserProfileForm.tsx`" → run the Accessibility Review mode on that single file.

## Audit Scope

Before starting, determine which files to scan.

### Files to Scan

- All `.tsx`, `.jsx`, `.ts`, `.js` files in `src/` (or the application source directory)
- CSS/SCSS/styled-component files for hardcoded design values
- Application entry point(s) for Provider and CSS import checks

**Important:** Always trace the component tree from the actual mount point (e.g. `main.tsx`, `index.tsx`) before evaluating Provider & Setup. The entry point may not be a route file — it could be a custom element wrapper, a shadow DOM host, or a separate bootstrap file that renders the router. Do not penalise missing Provider/CSS if a parent entry point already handles it.

### Files to Exclude

- **Test files** (`*.test.tsx`, `*.spec.tsx`, `__tests__/`) — test mocks may legitimately use raw HTML
- **Storybook stories** (`*.stories.tsx`) — may intentionally show raw HTML for comparison
- **Config files** (`*.config.ts`, `*.config.js`) — not UI code
- **Type definitions** (`*.d.ts`) — no runtime UI code
- **Third-party code** (`node_modules/`, vendored libraries) — outside application control
- **Build output** (`dist/`, `build/`) — generated code

### Version-Aware Auditing

IDS is currently on **version 6**. When auditing:

- **Check the installed version** — `package.json` for `@iress-oss/ids-components`
- **v6** — Apply all rules as-is
- **v5** — Flag v5-specific patterns as "migration opportunities" (key differences: `IressForm` uses `rules` prop, `react-hook-form` is a peer dependency, form state via `useWatch`/`ref`)
- **Pre-v5** — Flag as requiring major migration; prioritise Provider/CSS setup first
- **Always note the version** in the audit report header

## Audit Process

### 1. Evaluate UX, Accessibility & Cognitive Load

Start with what users experience — assess the UI's usability, accessibility, and information density before checking component compliance.

#### a. Usability Heuristics (Nielsen's 10)

Evaluate the application against all 10 heuristics. Each has IDS-specific guidance in the audit checklist § Usability Heuristics. Key areas:

# IDS UI Doctor Audit Checklist

Use this checklist when performing a UI doctor audit.

## Setup & Configuration

- [ ] `IressProvider` wraps the application root (either directly, or via `IressShadow` which is a superset that includes Provider + CSS injection)
- [ ] `@iress-oss/ids-components/dist/style.css` is imported (required for component styles — not needed if using `IressShadow`, which injects styles automatically)
- [ ] `@iress-oss/ids-components` is a project dependency
- [ ] `@iress-oss/ids-tokens/build/css-vars.css` is imported only if tokens are used directly in application code
- [ ] `react-hook-form` is installed as a peer dependency if using `IressForm`
- [ ] No conflicting global CSS resets that override IDS styles
- [ ] If CSP is enforced: `fonts.googleapis.com` and `fonts.gstatic.com` are in `style-src` / `font-src`; `cdn.iress.com` is included if using legacy Font Awesome icons or `IressTheme`
- [ ] If using `IressShadow` and CSP blocks inline styles: `<meta name="csp-nonce" content="...">` is present in `<head>` (optional)

## Component Usage

- [ ] No raw `<button>` elements — use `IressButton`
- [ ] No raw `<input>` elements — use `IressField` + `IressInput`
- [ ] No raw `<select>` elements — use `IressField` + `IressSelect`
- [ ] No raw `<form>` elements — use `IressForm` + `IressFormField`
- [ ] No raw `<table>` elements — use `IressTable`
- [ ] No raw `<input type="range">` — use `IressSlider`
- [ ] No custom modal/dialog — use `IressModal`
- [ ] No custom drawer — use `IressSlideout`
- [ ] No custom tabs — use `IressTabSet`
- [ ] No custom tooltip — use `IressTooltip`
- [ ] No custom alert/toast — use `IressAlert` / `IressToaster`
- [ ] No custom accordion/details — use `IressExpander`
- [ ] No custom autocomplete/typeahead — use `IressAutocomplete`
- [ ] No custom select-with-search — use `IressSelect`
- [ ] No custom read-only display — use `IressReadonly`
- [ ] No custom button group / segmented control — use `IressButtonGroup`
- [ ] No custom validation messages — use `IressValidationMessage` / `IressValidationSummary`
- [ ] No third-party UI library components (MUI, Ant, Chakra, etc.) where IDS equivalents exist

## Design Tokens

- [ ] No hardcoded colour hex/rgb values — use IDS colour tokens
- [ ] No hardcoded pixel spacing — use IDS spacing tokens
- [ ] No hardcoded font properties — use IDS typography tokens
- [ ] No hardcoded border-radius — use IDS radius tokens

## Pattern Usage

- [ ] Forms use `IressForm` + `IressFormField` instead of custom form handling
- [ ] Form validation uses declarative `rules` prop, not custom validation logic
- [ ] Form state managed via React Hook Form (`useWatch`, `ref`), not `useState` + `onChange`
- [ ] Long forms (>8 fields) use `pattern="long"` for sticky heading/actions
- [ ] Loading states use `IressLoading` (preferred) or `IressSkeleton` for custom content placeholder patterns (cache-first data reads from SWR/React Query may not need a loading state if the cache is pre-populated by a prior page)
- [ ] Filter/action dropdowns use `IressDropdownMenu` (not inside forms)
- [ ] Row-level actions use `IressContextualMenu`
- [ ] Application shell navigation uses `IressSideNav`
- [ ] Hierarchy navigation uses `IressBreadcrumbs`
- [ ] Microfrontend style isolation uses `IressShadow`
- [ ] Root-level error boundaries render `IressModal status="danger"` with retry/reload actions (not custom error pages or raw HTML) — check parent components/layouts before flagging; a parent error boundary covering child routes is a valid app-wide pattern
- [ ] Scoped error boundaries (around features/sections) render `IressAlert status="danger"` as inline fallback
- [ ] Error boundaries do NOT use `IressToaster` — toasts are transient and cannot serve as persistent fallback UI

## Accessibility

- [ ] All form inputs have associated labels via `IressField` or `IressFormField`
- [ ] Required fields are marked with `required` prop or `rules={{ required: true }}`
- [ ] Validation messages use IDS patterns (`IressField` status or `IressFormField` rules)
- [ ] Interactive elements have accessible names
- [ ] Skip links present for keyboard navigation (`IressSkipLink`)
- [ ] Colour contrast meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text) — use IDS colour tokens which are pre-validated
- [ ] Focus indicators are visible on all interactive elements — IDS components provide these by default
- [ ] Keyboard navigation works for all interactive elements (Tab, Enter, Space, Escape, Arrow keys)
- [ ] Images have meaningful `alt` text (use `IressImage` which requires `alt` prop)
- [ ] Modal and slideout components trap focus correctly — `IressModal` and `IressSlideout` handle this automatically
- [ ] ARIA landmarks are used appropriately (`<nav>`, `<main>`, `<aside>`, etc.)
- [ ] `IressSideNav` uses proper `<nav>` landmark with `aria-label`
- [ ] `IressBreadcrumbs` uses `<nav>` with `aria-label` and `aria-current="page"` on the last item
- [ ] `IressContextualMenu` has a meaningful `ariaLabel` describing the menu purpose
- [ ] Tables use `IressTable` with proper header cells (`IressTable.HeaderCell`) for screen readers
- [ ] Dynamic content updates (loading states, alerts, toasts) are announced to screen readers
- [ ] `IressAlert` is used for persistent status messages (automatically uses appropriate ARIA roles)
- [ ] `IressToaster` is used for transient notifications that demand attention (uses `aria-live="assertive"` region) — avoid overuse; not every update warrants a toast
- [ ] Subtle, user-initiated UI updates (save indicators, count badges, status dot changes, inline confirmations) use micro animations/interactions with a colocated `aria-live="polite"` region near the component — these are less intrusive than toasts and keep context local
- [ ] `aria-live="polite"` regions are only added for user-initiated updates; system-driven background changes that the user did not trigger should not announce unless they require attention (use `IressToaster` or `IressAlert` for those)
- [ ] No reliance on colour alone to convey information — use text, icons, or patterns alongside colour

## Layout

- [ ] Vertical stacks use `IressStack`
- [ ] Horizontal rows use `IressInline`
- [ ] Grid layouts use `IressRow` + `IressCol`
- [ ] Spacing props use IDS token values (0–10)
- [ ] Responsive visibility uses `hideFrom`/`hideBelow` props or `useBreakpoint` hook
- [ ] Multi-column grid layouts use responsive `span` values (e.g. `span={{ xs: 12, md: 6 }}`) so columns stack on mobile
- [ ] Mobile layout prioritises the primary task — secondary content (filters, sidebars, metadata) is relocated to `IressSlideout`, `IressModal`, or collapsible sections rather than simply stacked
- [ ] All functionality remains accessible on mobile — nothing is removed, only reorganised into appropriate containers

## Cognitive Load & Information Architecture

- [ ] Menus/dropdowns with >10 items enable `searchable` to reduce scanning
- [ ] Forms with >8 fields use `IressForm pattern="long"` for sticky heading/actions
- [ ] Top-level navigation has ≤7 items; additional items are grouped or nested
- [ ] Secondary content is hidden behind `IressExpander` or `IressTabSet` until needed (progressive disclosure)
- [ ] Complex workflows are broken into multi-step flows rather than one overwhelming screen
- [ ] Related content is grouped in `IressCard` or `IressPanel` rather than presented flat
- [ ] Spacing between groups uses adequate `IressStack gap` tokens to prevent visual overload
- [ ] Bulk/batch operations (select-all + delete, mass update) require explicit confirmation via `IressModal`, showing the count of affected items
- [ ] After modal close, focus returns to the trigger element
- [ ] After item deletion, focus moves to the next or previous item in the list
- [ ] After form submission, focus moves to the success message, error summary, or next logical element
- [ ] Loading state transitions do not cause layout shifts that disorient users
- [ ] Visual hierarchy is established with `IressText textStyle` — primary content is prominent, secondary is de-emphasised
- [ ] No more than one primary action (`mode="primary"`) per section to reduce decision paralysis

## Button Hierarchy

- [ ] Maximum one `mode="primary"` button per section
- [ ] Destructive actions use `status="danger"` not custom red styling
- [ ] Icon-only buttons include accessible text
- [ ] No `disabled` attribute on `IressButton` — keep buttons enabled and validate on click instead (disabled buttons are invisible to screen readers and provide no path to resolution)

## IressText Usage

- [ ] No redundant `textStyle` when `element` already provides the correct typography (e.g. `element="h1" textStyle="typography.heading.1"` is redundant — use `element="h1"` alone)
- [ ] `textStyle` is only used to intentionally override visual hierarchy (e.g. `element="h2" textStyle="typography.heading.4"`) or at the discretion of a designer

## Usability Heuristics

Evaluate the application against these usability principles (based on [Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)). Each heuristic includes concrete IDS guidance for how to satisfy it.

### 1. Visibility of System Status

The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

- [ ] Loading states use `IressLoading` with the correct pattern (`page`, `component`, `start-up`, `validate`, `long`) so users always see feedback proportional to wait time; `IressSkeleton` is also valid for custom content placeholder patterns where skeleton screens mirror the page layout
- [ ] Form submission provides visible feedback — use `IressLoading pattern="validate"` during submission, `IressAlert` or `IressToaster` for success/failure
- [ ] Subtle state confirmations (auto-save, background sync, inline status changes) use micro animations or transitions rather than toasts — pair with `aria-live="polite"` colocated near the component when the update was user-initiated
- [ ] Progress indicators are used for multi-step processes — `IressProgress` for deterministic operations, `IressSpinner` for indeterminate
- [ ] Active states are visible — selected tabs (`IressTabSet`), active nav items (`IressSideNav`), current breadcrumb (`IressBreadcrumbs`) all show where the user is
- [ ] Toggled/selected states are visually clear — `IressToggle`, `IressCheckbox`, `IressRadio` provide built-in active states

### 2. Match Between System and the Real World

The system should speak the user's language, with words, phrases, and concepts familiar to the user.

- [ ] Labels use plain, domain-appropriate language — avoid technical jargon in `IressField` labels, `IressButton` text, and `IressAlert` messages
- [ ] Icons are recognisable and paired with text — use `IressIcon` with a text label; avoid icon-only actions unless the icon is universally understood (e.g., close ✕, search 🔍)
- [ ] Status colours follow real-world conventions — `info` (blue), `success` (green), `warning` (amber), `danger` (red) via IDS status tokens
- [ ] Form fields are ordered logically — group related fields with `IressFormFieldset`, order by natural workflow

### 3. User Control and Freedom

Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action.

- [ ] Modals have a visible close button and Escape key dismissal — `IressModal` provides both by default
- [ ] Slideouts can be dismissed — `IressSlideout` supports close button and backdrop click
- [ ] Destructive actions require confirmation — use `IressModal` as a confirmation dialog before delete/remove operations
- [ ] Forms support cancel/reset — include a secondary `IressButton` for cancel alongside the primary submit action
- [ ] Multi-step flows allow going back — breadcrumbs (`IressBreadcrumbs`) or back buttons let users reverse navigation
- [ ] Toasts are dismissible — `IressToaster` notifications can be closed by the user

### 4. Consistency and Standards

Users should not have to wonder whether different words, situations, or actions mean the same thing.

- [ ] All components come from IDS — no mix of IDS + third-party + custom for the same purpose (e.g., some buttons IDS, some MUI)
- [ ] Design tokens are used consistently — no mix of hardcoded values and tokens for the same property (e.g., some colours from tokens, some hardcoded)
- [ ] Same action, same pattern — similar forms use the same `IressForm` pattern, similar loading states use the same `IressLoading` pattern
- [ ] Button hierarchy is consistent — `mode="primary"` always means the main action, `mode="secondary"` always means supporting action, across all views
- [ ] Terminology is consistent — the same action uses the same label everywhere (e.g., "Save" not sometimes "Save" and sometimes "Submit" for the same operation)

### 5. Error Prevention

Even better than good error messages is a careful design that prevents a problem from occurring in the first place.

- [ ] Form validation uses declarative `rules` — `IressFormField` `rules` prop prevents invalid submissions before they happen
- [ ] Required fields are clearly marked — `required` prop on `IressField` or `rules={{ required: true }}` on `IressFormField`
- [ ] Input constraints are communicated — use `hint` prop on `IressField`/`IressFormField` to show format expectations, character limits, or examples
- [ ] Destructive actions require explicit confirmation — delete/remove behind `IressModal` confirmation, not a single click
- [ ] Dangerous buttons are visually distinct — `status="danger"` on `IressButton` prevents casual clicks
- [ ] Dropdown menus place destructive items last and visually separate — `IressContextualMenu` convention

### 6. Recognition Rather Than Recall

Minimise the user's memory load by making elements, actions, and options visible.

- [ ] Navigation is persistent — `IressSideNav` keeps sections visible rather than hidden behind hamburger menus on desktop
- [ ] Breadcrumbs show location — `IressBreadcrumbs` reminds users where they are in the hierarchy
- [ ] Form labels are always visible — `IressField` labels appear above inputs, not as disappearing placeholder text
- [ ] Actions are visible, not hidden — use `IressButton` for primary actions, `IressContextualMenu` for secondary, avoid burying actions in deep menus
- [ ] Searchable options for long lists — `IressDropdownMenu` with `searchable` for 10+ options, `IressAutocomplete` for typeahead

### 7. Flexibility and Efficiency of Use

Accelerators — unseen by the novice user — may speed up interaction for the expert user.

- [ ] Keyboard shortcuts for power users — ensure all interactive IDS components respond to standard keyboard patterns (Enter, Space, Escape, Arrow keys)
- [ ] Skip links for keyboard users — `IressSkipLink` lets experienced keyboard users bypass repetitive navigation
- [ ] Searchable selects — `IressSelect` and `IressDropdownMenu` with search enabled let power users type to filter instead of scrolling
- [ ] Autocomplete for repetitive input — `IressAutocomplete` reduces typing for known-value fields
- [ ] Responsive layouts — `hideFrom`/`hideBelow` props or `useBreakpoint` hook adapt the interface for different device contexts
- [ ] Mobile experience focuses on the primary task — secondary content is accessible via `IressSlideout` or collapsible sections, not competing for screen space

### 8. Aesthetic and Minimalist Design

Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.

- [ ] Use IDS typography scale — `IressText` with appropriate `textStyle` creates clear visual hierarchy without custom styling
- [ ] Spacing is consistent and intentional — `IressStack`, `IressInline`, and spacing tokens prevent visual clutter
- [ ] One primary action per section — `mode="primary"` on a single `IressButton` draws the eye to what matters
- [ ] Use `IressCard` / `IressPanel` to group related content — rather than showing everything in a flat layout
- [ ] Loading states use `IressLoading` progressive disclosure — no indicator <500ms, spinner at 500ms, message at 2s (avoids unnecessary visual noise for fast operations)
- [ ] Alerts are used sparingly and appropriately — `IressAlert` for persistent status, `IressToaster` for transient feedback

### 9. Help Users Recognise, Diagnose, and Recover from Errors

Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.

- [ ] Validation messages are human-readable — `IressFormField` `rules` `message` prop provides user-friendly text, not technical codes
- [ ] Errors appear next to the relevant field — `IressFormField` and `IressField` display inline validation, not in a separate area
- [ ] Summary of errors for long forms — `IressValidationSummary` at the top of long forms helps users find all issues
- [ ] Status indicators are clear — `IressField` `status="danger"` with `statusMessage` for field-level errors, `IressAlert status="danger"` for page-level errors
- [ ] Error state is visually distinct — IDS danger tokens (red border, red text) are applied automatically by `status="danger"`
- [ ] Recovery path is clear — error messages suggest what to do (e.g., "Enter a valid email address" not just "Invalid input")

### 10. Help and Documentation

Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.

- [ ] Hint text guides input — `IressField` and `IressFormField` `hint` prop provides contextual guidance below the label
- [ ] Tooltips explain non-obvious UI — `IressTooltip` for supplementary information on icons, abbreviations, or complex fields
- [ ] Placeholder text is supplementary, not the only label — `placeholder` is used alongside `IressField` `label`, never as a replacement
- [ ] Complex workflows have contextual help — use `IressAlert status="info"` or `IressPopover` to explain steps in multi-part processes

1. **Visibility of system status** — Loading states use `IressLoading` (preferred) or `IressSkeleton` (for custom content placeholder patterns); active states visible on tabs, nav, breadcrumbs
2. **Match between system and real world** — Labels use plain language; icons paired with text; status colours follow conventions
3. **User control and freedom** — Modals/slideouts dismissible; destructive actions require confirmation; forms have cancel
4. **Consistency and standards** — All components from IDS; tokens used consistently; same action = same pattern
5. **Error prevention** — Declarative `rules` validation; required fields marked; constraints communicated via `hint`
6. **Recognition rather than recall** — Persistent navigation; visible breadcrumbs; labels always visible (not just placeholders)
7. **Flexibility and efficiency** — Keyboard shortcuts; skip links; searchable selects; autocomplete
8. **Aesthetic and minimalist design** — Clear visual hierarchy; consistent spacing; one primary action per section
9. **Help users recognise/recover from errors** — Human-readable validation; inline errors; `IressValidationSummary` for long forms
10. **Help and documentation** — Hint text; tooltips for non-obvious UI; placeholder supplementary to labels

#### b. Cognitive Load & Information Architecture

Evaluate whether the UI presents too much information or too many choices at once.

- **Item count thresholds** — Menus/dropdowns with >10 items should use `searchable`; long forms (>8 fields) should use `IressForm pattern="long"`; navigation with >7 top-level items should use grouping
- **Progressive disclosure** — Use `IressExpander` or `IressTabSet` to hide secondary content until needed; multi-step flows break complex tasks into stages
- **Information density** — Is the screen overwhelming? Use `IressCard`/`IressPanel` to group related content; use `IressStack` with adequate spacing
- **Batch action safety** — Bulk operations (select-all + delete) need explicit confirmation via `IressModal`; show count of affected items
- **Focus management after state changes** — After modal close, focus returns to trigger; after item deletion, focus moves to next/previous item; after form submission, focus moves to result or error
- **Visual hierarchy** — Primary content is prominent; secondary content is de-emphasised; use `IressText textStyle` to establish hierarchy

#### c. Accessibility (WCAG 2.1 AA)

Check form accessibility, keyboard & focus, screen reader support, and colour/contrast. See audit checklist § Accessibility for the full list. Key checks:

# IDS UI Doctor Audit Checklist

Use this checklist when performing a UI doctor audit.

## Setup & Configuration

- [ ] `IressProvider` wraps the application root (either directly, or via `IressShadow` which is a superset that includes Provider + CSS injection)
- [ ] `@iress-oss/ids-components/dist/style.css` is imported (required for component styles — not needed if using `IressShadow`, which injects styles automatically)
- [ ] `@iress-oss/ids-components` is a project dependency
- [ ] `@iress-oss/ids-tokens/build/css-vars.css` is imported only if tokens are used directly in application code
- [ ] `react-hook-form` is installed as a peer dependency if using `IressForm`
- [ ] No conflicting global CSS resets that override IDS styles
- [ ] If CSP is enforced: `fonts.googleapis.com` and `fonts.gstatic.com` are in `style-src` / `font-src`; `cdn.iress.com` is included if using legacy Font Awesome icons or `IressTheme`
- [ ] If using `IressShadow` and CSP blocks inline styles: `<meta name="csp-nonce" content="...">` is present in `<head>` (optional)

## Component Usage

- [ ] No raw `<button>` elements — use `IressButton`
- [ ] No raw `<input>` elements — use `IressField` + `IressInput`
- [ ] No raw `<select>` elements — use `IressField` + `IressSelect`
- [ ] No raw `<form>` elements — use `IressForm` + `IressFormField`
- [ ] No raw `<table>` elements — use `IressTable`
- [ ] No raw `<input type="range">` — use `IressSlider`
- [ ] No custom modal/dialog — use `IressModal`
- [ ] No custom drawer — use `IressSlideout`
- [ ] No custom tabs — use `IressTabSet`
- [ ] No custom tooltip — use `IressTooltip`
- [ ] No custom alert/toast — use `IressAlert` / `IressToaster`
- [ ] No custom accordion/details — use `IressExpander`
- [ ] No custom autocomplete/typeahead — use `IressAutocomplete`
- [ ] No custom select-with-search — use `IressSelect`
- [ ] No custom read-only display — use `IressReadonly`
- [ ] No custom button group / segmented control — use `IressButtonGroup`
- [ ] No custom validation messages — use `IressValidationMessage` / `IressValidationSummary`
- [ ] No third-party UI library components (MUI, Ant, Chakra, etc.) where IDS equivalents exist

## Design Tokens

- [ ] No hardcoded colour hex/rgb values — use IDS colour tokens
- [ ] No hardcoded pixel spacing — use IDS spacing tokens
- [ ] No hardcoded font properties — use IDS typography tokens
- [ ] No hardcoded border-radius — use IDS radius tokens

## Pattern Usage

- [ ] Forms use `IressForm` + `IressFormField` instead of custom form handling
- [ ] Form validation uses declarative `rules` prop, not custom validation logic
- [ ] Form state managed via React Hook Form (`useWatch`, `ref`), not `useState` + `onChange`
- [ ] Long forms (>8 fields) use `pattern="long"` for sticky heading/actions
- [ ] Loading states use `IressLoading` (preferred) or `IressSkeleton` for custom content placeholder patterns (cache-first data reads from SWR/React Query may not need a loading state if the cache is pre-populated by a prior page)
- [ ] Filter/action dropdowns use `IressDropdownMenu` (not inside forms)
- [ ] Row-level actions use `IressContextualMenu`
- [ ] Application shell navigation uses `IressSideNav`
- [ ] Hierarchy navigation uses `IressBreadcrumbs`
- [ ] Microfrontend style isolation uses `IressShadow`
- [ ] Root-level error boundaries render `IressModal status="danger"` with retry/reload actions (not custom error pages or raw HTML) — check parent components/layouts before flagging; a parent error boundary covering child routes is a valid app-wide pattern
- [ ] Scoped error boundaries (around features/sections) render `IressAlert status="danger"` as inline fallback
- [ ] Error boundaries do NOT use `IressToaster` — toasts are transient and cannot serve as persistent fallback UI

## Accessibility

- [ ] All form inputs have associated labels via `IressField` or `IressFormField`
- [ ] Required fields are marked with `required` prop or `rules={{ required: true }}`
- [ ] Validation messages use IDS patterns (`IressField` status or `IressFormField` rules)
- [ ] Interactive elements have accessible names
- [ ] Skip links present for keyboard navigation (`IressSkipLink`)
- [ ] Colour contrast meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text) — use IDS colour tokens which are pre-validated
- [ ] Focus indicators are visible on all interactive elements — IDS components provide these by default
- [ ] Keyboard navigation works for all interactive elements (Tab, Enter, Space, Escape, Arrow keys)
- [ ] Images have meaningful `alt` text (use `IressImage` which requires `alt` prop)
- [ ] Modal and slideout components trap focus correctly — `IressModal` and `IressSlideout` handle this automatically
- [ ] ARIA landmarks are used appropriately (`<nav>`, `<main>`, `<aside>`, etc.)
- [ ] `IressSideNav` uses proper `<nav>` landmark with `aria-label`
- [ ] `IressBreadcrumbs` uses `<nav>` with `aria-label` and `aria-current="page"` on the last item
- [ ] `IressContextualMenu` has a meaningful `ariaLabel` describing the menu purpose
- [ ] Tables use `IressTable` with proper header cells (`IressTable.HeaderCell`) for screen readers
- [ ] Dynamic content updates (loading states, alerts, toasts) are announced to screen readers
- [ ] `IressAlert` is used for persistent status messages (automatically uses appropriate ARIA roles)
- [ ] `IressToaster` is used for transient notifications that demand attention (uses `aria-live="assertive"` region) — avoid overuse; not every update warrants a toast
- [ ] Subtle, user-initiated UI updates (save indicators, count badges, status dot changes, inline confirmations) use micro animations/interactions with a colocated `aria-live="polite"` region near the component — these are less intrusive than toasts and keep context local
- [ ] `aria-live="polite"` regions are only added for user-initiated updates; system-driven background changes that the user did not trigger should not announce unless they require attention (use `IressToaster` or `IressAlert` for those)
- [ ] No reliance on colour alone to convey information — use text, icons, or patterns alongside colour

## Layout

- [ ] Vertical stacks use `IressStack`
- [ ] Horizontal rows use `IressInline`
- [ ] Grid layouts use `IressRow` + `IressCol`
- [ ] Spacing props use IDS token values (0–10)
- [ ] Responsive visibility uses `hideFrom`/`hideBelow` props or `useBreakpoint` hook
- [ ] Multi-column grid layouts use responsive `span` values (e.g. `span={{ xs: 12, md: 6 }}`) so columns stack on mobile
- [ ] Mobile layout prioritises the primary task — secondary content (filters, sidebars, metadata) is relocated to `IressSlideout`, `IressModal`, or collapsible sections rather than simply stacked
- [ ] All functionality remains accessible on mobile — nothing is removed, only reorganised into appropriate containers

## Cognitive Load & Information Architecture

- [ ] Menus/dropdowns with >10 items enable `searchable` to reduce scanning
- [ ] Forms with >8 fields use `IressForm pattern="long"` for sticky heading/actions
- [ ] Top-level navigation has ≤7 items; additional items are grouped or nested
- [ ] Secondary content is hidden behind `IressExpander` or `IressTabSet` until needed (progressive disclosure)
- [ ] Complex workflows are broken into multi-step flows rather than one overwhelming screen
- [ ] Related content is grouped in `IressCard` or `IressPanel` rather than presented flat
- [ ] Spacing between groups uses adequate `IressStack gap` tokens to prevent visual overload
- [ ] Bulk/batch operations (select-all + delete, mass update) require explicit confirmation via `IressModal`, showing the count of affected items
- [ ] After modal close, focus returns to the trigger element
- [ ] After item deletion, focus moves to the next or previous item in the list
- [ ] After form submission, focus moves to the success message, error summary, or next logical element
- [ ] Loading state transitions do not cause layout shifts that disorient users
- [ ] Visual hierarchy is established with `IressText textStyle` — primary content is prominent, secondary is de-emphasised
- [ ] No more than one primary action (`mode="primary"`) per section to reduce decision paralysis

## Button Hierarchy

- [ ] Maximum one `mode="primary"` button per section
- [ ] Destructive actions use `status="danger"` not custom red styling
- [ ] Icon-only buttons include accessible text
- [ ] No `disabled` attribute on `IressButton` — keep buttons enabled and validate on click instead (disabled buttons are invisible to screen readers and provide no path to resolution)

## IressText Usage

- [ ] No redundant `textStyle` when `element` already provides the correct typography (e.g. `element="h1" textStyle="typography.heading.1"` is redundant — use `element="h1"` alone)
- [ ] `textStyle` is only used to intentionally override visual hierarchy (e.g. `element="h2" textStyle="typography.heading.4"`) or at the discretion of a designer

## Usability Heuristics

Evaluate the application against these usability principles (based on [Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)). Each heuristic includes concrete IDS guidance for how to satisfy it.

### 1. Visibility of System Status

The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

- [ ] Loading states use `IressLoading` with the correct pattern (`page`, `component`, `start-up`, `validate`, `long`) so users always see feedback proportional to wait time; `IressSkeleton` is also valid for custom content placeholder patterns where skeleton screens mirror the page layout
- [ ] Form submission provides visible feedback — use `IressLoading pattern="validate"` during submission, `IressAlert` or `IressToaster` for success/failure
- [ ] Subtle state confirmations (auto-save, background sync, inline status changes) use micro animations or transitions rather than toasts — pair with `aria-live="polite"` colocated near the component when the update was user-initiated
- [ ] Progress indicators are used for multi-step processes — `IressProgress` for deterministic operations, `IressSpinner` for indeterminate
- [ ] Active states are visible — selected tabs (`IressTabSet`), active nav items (`IressSideNav`), current breadcrumb (`IressBreadcrumbs`) all show where the user is
- [ ] Toggled/selected states are visually clear — `IressToggle`, `IressCheckbox`, `IressRadio` provide built-in active states

### 2. Match Between System and the Real World

The system should speak the user's language, with words, phrases, and concepts familiar to the user.

- [ ] Labels use plain, domain-appropriate language — avoid technical jargon in `IressField` labels, `IressButton` text, and `IressAlert` messages
- [ ] Icons are recognisable and paired with text — use `IressIcon` with a text label; avoid icon-only actions unless the icon is universally understood (e.g., close ✕, search 🔍)
- [ ] Status colours follow real-world conventions — `info` (blue), `success` (green), `warning` (amber), `danger` (red) via IDS status tokens
- [ ] Form fields are ordered logically — group related fields with `IressFormFieldset`, order by natural workflow

### 3. User Control and Freedom

Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action.

- [ ] Modals have a visible close button and Escape key dismissal — `IressModal` provides both by default
- [ ] Slideouts can be dismissed — `IressSlideout` supports close button and backdrop click
- [ ] Destructive actions require confirmation — use `IressModal` as a confirmation dialog before delete/remove operations
- [ ] Forms support cancel/reset — include a secondary `IressButton` for cancel alongside the primary submit action
- [ ] Multi-step flows allow going back — breadcrumbs (`IressBreadcrumbs`) or back buttons let users reverse navigation
- [ ] Toasts are dismissible — `IressToaster` notifications can be closed by the user

### 4. Consistency and Standards

Users should not have to wonder whether different words, situations, or actions mean the same thing.

- [ ] All components come from IDS — no mix of IDS + third-party + custom for the same purpose (e.g., some buttons IDS, some MUI)
- [ ] Design tokens are used consistently — no mix of hardcoded values and tokens for the same property (e.g., some colours from tokens, some hardcoded)
- [ ] Same action, same pattern — similar forms use the same `IressForm` pattern, similar loading states use the same `IressLoading` pattern
- [ ] Button hierarchy is consistent — `mode="primary"` always means the main action, `mode="secondary"` always means supporting action, across all views
- [ ] Terminology is consistent — the same action uses the same label everywhere (e.g., "Save" not sometimes "Save" and sometimes "Submit" for the same operation)

### 5. Error Prevention

Even better than good error messages is a careful design that prevents a problem from occurring in the first place.

- [ ] Form validation uses declarative `rules` — `IressFormField` `rules` prop prevents invalid submissions before they happen
- [ ] Required fields are clearly marked — `required` prop on `IressField` or `rules={{ required: true }}` on `IressFormField`
- [ ] Input constraints are communicated — use `hint` prop on `IressField`/`IressFormField` to show format expectations, character limits, or examples
- [ ] Destructive actions require explicit confirmation — delete/remove behind `IressModal` confirmation, not a single click
- [ ] Dangerous buttons are visually distinct — `status="danger"` on `IressButton` prevents casual clicks
- [ ] Dropdown menus place destructive items last and visually separate — `IressContextualMenu` convention

### 6. Recognition Rather Than Recall

Minimise the user's memory load by making elements, actions, and options visible.

- [ ] Navigation is persistent — `IressSideNav` keeps sections visible rather than hidden behind hamburger menus on desktop
- [ ] Breadcrumbs show location — `IressBreadcrumbs` reminds users where they are in the hierarchy
- [ ] Form labels are always visible — `IressField` labels appear above inputs, not as disappearing placeholder text
- [ ] Actions are visible, not hidden — use `IressButton` for primary actions, `IressContextualMenu` for secondary, avoid burying actions in deep menus
- [ ] Searchable options for long lists — `IressDropdownMenu` with `searchable` for 10+ options, `IressAutocomplete` for typeahead

### 7. Flexibility and Efficiency of Use

Accelerators — unseen by the novice user — may speed up interaction for the expert user.

- [ ] Keyboard shortcuts for power users — ensure all interactive IDS components respond to standard keyboard patterns (Enter, Space, Escape, Arrow keys)
- [ ] Skip links for keyboard users — `IressSkipLink` lets experienced keyboard users bypass repetitive navigation
- [ ] Searchable selects — `IressSelect` and `IressDropdownMenu` with search enabled let power users type to filter instead of scrolling
- [ ] Autocomplete for repetitive input — `IressAutocomplete` reduces typing for known-value fields
- [ ] Responsive layouts — `hideFrom`/`hideBelow` props or `useBreakpoint` hook adapt the interface for different device contexts
- [ ] Mobile experience focuses on the primary task — secondary content is accessible via `IressSlideout` or collapsible sections, not competing for screen space

### 8. Aesthetic and Minimalist Design

Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.

- [ ] Use IDS typography scale — `IressText` with appropriate `textStyle` creates clear visual hierarchy without custom styling
- [ ] Spacing is consistent and intentional — `IressStack`, `IressInline`, and spacing tokens prevent visual clutter
- [ ] One primary action per section — `mode="primary"` on a single `IressButton` draws the eye to what matters
- [ ] Use `IressCard` / `IressPanel` to group related content — rather than showing everything in a flat layout
- [ ] Loading states use `IressLoading` progressive disclosure — no indicator <500ms, spinner at 500ms, message at 2s (avoids unnecessary visual noise for fast operations)
- [ ] Alerts are used sparingly and appropriately — `IressAlert` for persistent status, `IressToaster` for transient feedback

### 9. Help Users Recognise, Diagnose, and Recover from Errors

Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.

- [ ] Validation messages are human-readable — `IressFormField` `rules` `message` prop provides user-friendly text, not technical codes
- [ ] Errors appear next to the relevant field — `IressFormField` and `IressField` display inline validation, not in a separate area
- [ ] Summary of errors for long forms — `IressValidationSummary` at the top of long forms helps users find all issues
- [ ] Status indicators are clear — `IressField` `status="danger"` with `statusMessage` for field-level errors, `IressAlert status="danger"` for page-level errors
- [ ] Error state is visually distinct — IDS danger tokens (red border, red text) are applied automatically by `status="danger"`
- [ ] Recovery path is clear — error messages suggest what to do (e.g., "Enter a valid email address" not just "Invalid input")

### 10. Help and Documentation

Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.

- [ ] Hint text guides input — `IressField` and `IressFormField` `hint` prop provides contextual guidance below the label
- [ ] Tooltips explain non-obvious UI — `IressTooltip` for supplementary information on icons, abbreviations, or complex fields
- [ ] Placeholder text is supplementary, not the only label — `placeholder` is used alongside `IressField` `label`, never as a replacement
- [ ] Complex workflows have contextual help — use `IressAlert status="info"` or `IressPopover` to explain steps in multi-part processes

- All form inputs have labels (via `IressField` or `IressFormField`)
- Skip links present (`IressSkipLink`)
- Focus trapping in modals/slideouts (automatic with IDS)
- ARIA landmarks (`<nav>`, `<main>`, `<aside>`)
- Dynamic content announced to screen readers — choose the right tier:
  - `IressAlert` — persistent, inline status messages (no `aria-live`; already in the reading flow)
  - `IressToaster` — transient notifications demanding attention (`aria-live="assertive"`); avoid overuse
  - Micro animations/interactions with colocated `aria-live="polite"` — for subtle, user-initiated updates (save indicators, count badges, status changes) that don't warrant a toast; place the live region near the component, not globally
- Colour contrast meets WCAG AA; no reliance on colour alone

#### d. Button Hierarchy

- One `mode="primary"` button per logical section
- Destructive actions use `status="danger"`, not custom red styling
- Icon-only buttons include accessible text

#### e. Layout Consistency

- Vertical stacks → `IressStack`; horizontal rows → `IressInline`; grids → `IressRow`/`IressCol`
- Spacing uses token values (0–10) on `gap` prop
- `IressCSSProps` (`m`, `mx`, `p`, `px`) instead of inline styles
- Responsive: `hideFrom`/`hideBelow` props or `useBreakpoint` hook; grid layouts use responsive `span` (e.g. `span={{ xs: 12, md: 6 }}`); mobile view focuses on primary task with secondary content in `IressSlideout` or collapsible sections

### 2. Validate IDS Component Usage

Scan for raw HTML, third-party components, and custom implementations that have IDS equivalents. Use the replacement tables for the full mapping.

# IDS Component Replacement Tables

Use these tables when scanning for raw HTML, third-party components, or custom implementations that should be replaced with IDS equivalents.

## Third-Party UI Library Detection

Check for imports from third-party UI libraries that overlap with IDS. Common libraries to flag:

| Third-Party Library                 | Common Imports to Flag                                    | IDS Replacement                |
| ----------------------------------- | --------------------------------------------------------- | ------------------------------ |
| Material UI (`@mui/*`)              | `Button`, `TextField`, `Select`, `Modal`, `Table`, `Tabs` | Equivalent `Iress*` components |
| Ant Design (`antd`)                 | `Button`, `Input`, `Select`, `Modal`, `Table`, `Tabs`     | Equivalent `Iress*` components |
| Chakra UI (`@chakra-ui/*`)          | `Button`, `Input`, `Select`, `Modal`, `Table`             | Equivalent `Iress*` components |
| React Bootstrap (`react-bootstrap`) | `Button`, `Form`, `Modal`, `Table`, `Nav`                 | Equivalent `Iress*` components |
| Radix UI (`@radix-ui/*`)            | `Dialog`, `Popover`, `Tooltip`, `Tabs`, `Select`          | Equivalent `Iress*` components |
| Headless UI (`@headlessui/react`)   | `Dialog`, `Popover`, `Menu`, `Tab`, `Switch`              | Equivalent `Iress*` components |

**How to detect:** Search for import statements matching these package names. Any UI component imported from a third-party library that has an IDS equivalent should be flagged as a **High** priority replacement.

```typescript
// ❌ Third-party UI component — should use IDS
import { Button } from '@mui/material';
import { Modal } from 'antd';
import { Dialog } from '@radix-ui/react-dialog';

// ✅ IDS components
import { IressButton, IressModal } from '@iress-oss/ids-components';
```

## HTML Element → IDS Component Replacement Map

| Raw HTML / Custom Code                  | IDS Replacement                                       | Priority |
| --------------------------------------- | ----------------------------------------------------- | -------- |
| `<button>`                              | `IressButton`                                         | High     |
| `<a>` (navigation link)                 | `IressLink`                                           | High     |
| `<input type="text">`                   | `IressField` + `IressInput`                           | High     |
| `<input type="checkbox">`               | `IressCheckbox`                                       | High     |
| `<input type="radio">`                  | `IressRadio` + `IressRadioGroup`                      | High     |
| `<select>`                              | `IressField` + `IressSelect`                          | High     |
| `<textarea>`                            | `IressField` + `IressInput`                           | High     |
| `<table>`                               | `IressTable`                                          | High     |
| `<label>`                               | `IressField` (wraps input with label)                 | High     |
| `<h1>`–`<h6>`, `<p>`, `<span>` (styled) | `IressText`                                           | Medium   |
| `<img>`                                 | `IressImage`                                          | Medium   |
| `<hr>`                                  | `IressDivider`                                        | Medium   |
| `<dialog>` / custom modal               | `IressModal`                                          | High     |
| Custom confirmation / danger dialog     | `IressModal status="danger"` (or `success`/`warning`) | High     |
| Custom drawer / slideout                | `IressSlideout`                                       | High     |
| Custom tooltip                          | `IressTooltip`                                        | Medium   |
| Custom popover                          | `IressPopover`                                        | Medium   |
| Custom tabs                             | `IressTabSet` + `IressTab`                            | High     |
| Custom spinner / loader                 | `IressSpinner`                                        | Medium   |
| Custom skeleton loader                  | `IressSkeleton`                                       | Low      |
| Custom progress bar                     | `IressProgress`                                       | Low      |
| Custom alert / toast                    | `IressAlert` / `IressToaster`                         | High     |
| Custom card / panel                     | `IressCard` / `IressPanel`                            | Medium   |
| Custom toggle / switch                  | `IressToggle`                                         | High     |
| Custom badge / tag                      | `IressTag` / `IressPill`                              | Low      |
| Custom breadcrumbs                      | `IressBreadcrumbs`                                    | Medium   |
| Custom side navigation                  | `IressSideNav`                                        | Medium   |
| Custom context menu                     | `IressMenu` + `IressMenuItem`                         | Medium   |
| Custom icon (SVG inline)                | `IressIcon`                                           | Medium   |
| `<div>` with flex column styles         | `IressStack`                                          | Medium   |
| `<div>` with flex row styles            | `IressInline`                                         | Medium   |
| `<div>` with grid styles                | `IressRow` + `IressCol`                               | Medium   |
| `<div>` with max-width container        | `IressContainer`                                      | Low      |
| `<form>`                                | `IressForm` + `IressFormField`                        | High     |
| `<input type="range">`                  | `IressSlider`                                         | Medium   |
| `<input type="number">` (currency)      | `IressField` + `IressInputCurrency`                   | Medium   |
| `<details>` / custom accordion          | `IressExpander`                                       | Medium   |
| Custom autocomplete / typeahead         | `IressAutocomplete`                                   | High     |
| Custom select with search               | `IressField` + `IressSelect`                          | High     |
| Custom read-only display                | `IressReadonly`                                       | Medium   |
| Custom segmented control / button group | `IressButtonGroup`                                    | Medium   |
| Custom validation messages              | `IressValidationMessage` / `IressValidationSummary`   | High     |
| Custom styled wrapper `<div>`           | `IressStyled`                                         | Low      |

## What to Look For

```typescript
// ❌ Raw HTML — should use IDS components
<button onClick={handleClick}>Submit</button>
<input type="text" placeholder="Name" />
<select>
  <option>Option 1</option>
</select>
<div className="modal-overlay">...</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>...</div>

// ✅ IDS components
<IressButton mode="primary" onClick={handleClick}>Submit</IressButton>
<IressField label="Name" htmlFor="name">
  <IressInput id="name" placeholder="Name" />
</IressField>
<IressField label="Options" htmlFor="options">
  <IressSelect id="options">
    <option>Option 1</option>
  </IressSelect>
</IressField>
<IressModal open={isOpen} onClose={handleClose}>...</IressModal>
<IressStack gap="4">...</IressStack>
```

## Acceptable Exceptions

Not every raw HTML element is a violation. The following are **acceptable exceptions** that should NOT be flagged:

| Pattern                                                      | Why It's Acceptable                                                                                                                     |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `<a>` inside markdown/MDX renderers                          | Content-driven, not application UI                                                                                                      |
| `<button>` inside third-party widgets the app cannot control | External dependency constraint                                                                                                          |
| `<table>` in email templates                                 | Email clients don't support custom components                                                                                           |
| `<img>` in SVG sprites or `<picture>` elements               | IressImage doesn't cover these use cases                                                                                                |
| `<div>` for ref targets, portals, or measurement containers  | Technical necessity, not layout                                                                                                         |
| Raw elements in test files / stories for demonstration       | Not shipped to users                                                                                                                    |
| `<form>` wrapping a single action (e.g., search bar)         | `IressForm` is best for multi-field forms; standalone search inputs may use `IressAutocomplete` or `IressField` + `IressInput` directly |
| `<input type="hidden">`                                      | Not user-facing UI                                                                                                                      |
| Custom components wrapping IDS components internally         | App-level abstraction is valid as long as IDS components are used underneath                                                            |

**When reporting:** If a potential violation falls into an exception category, note it as "Reviewed — Acceptable Exception" rather than a finding. This prevents false positives and keeps reports actionable.

**Quick checks:**

- No raw `<button>`, `<input>`, `<select>`, `<form>`, `<table>` — use IDS equivalents
- No third-party UI library imports (MUI, Ant, Chakra, Bootstrap, Radix, Headless UI) where IDS equivalents exist
- No custom modals, drawers, tabs, tooltips, alerts — use IDS patterns
- No custom loading spinners — use `IressLoading` (preferred) or `IressSkeleton` for custom content placeholder patterns
- Layout divs with flex/grid styles → `IressStack`, `IressInline`, `IressRow`/`IressCol`

**Acceptable exceptions** (do NOT flag): raw elements in test files, third-party widgets the app cannot control, `<input type="hidden">`, custom components wrapping IDS internally. See replacement tables § Acceptable Exceptions.

# IDS Component Replacement Tables

Use these tables when scanning for raw HTML, third-party components, or custom implementations that should be replaced with IDS equivalents.

## Third-Party UI Library Detection

Check for imports from third-party UI libraries that overlap with IDS. Common libraries to flag:

| Third-Party Library                 | Common Imports to Flag                                    | IDS Replacement                |
| ----------------------------------- | --------------------------------------------------------- | ------------------------------ |
| Material UI (`@mui/*`)              | `Button`, `TextField`, `Select`, `Modal`, `Table`, `Tabs` | Equivalent `Iress*` components |
| Ant Design (`antd`)                 | `Button`, `Input`, `Select`, `Modal`, `Table`, `Tabs`     | Equivalent `Iress*` components |
| Chakra UI (`@chakra-ui/*`)          | `Button`, `Input`, `Select`, `Modal`, `Table`             | Equivalent `Iress*` components |
| React Bootstrap (`react-bootstrap`) | `Button`, `Form`, `Modal`, `Table`, `Nav`                 | Equivalent `Iress*` components |
| Radix UI (`@radix-ui/*`)            | `Dialog`, `Popover`, `Tooltip`, `Tabs`, `Select`          | Equivalent `Iress*` components |
| Headless UI (`@headlessui/react`)   | `Dialog`, `Popover`, `Menu`, `Tab`, `Switch`              | Equivalent `Iress*` components |

**How to detect:** Search for import statements matching these package names. Any UI component imported from a third-party library that has an IDS equivalent should be flagged as a **High** priority replacement.

```typescript
// ❌ Third-party UI component — should use IDS
import { Button } from '@mui/material';
import { Modal } from 'antd';
import { Dialog } from '@radix-ui/react-dialog';

// ✅ IDS components
import { IressButton, IressModal } from '@iress-oss/ids-components';
```

## HTML Element → IDS Component Replacement Map

| Raw HTML / Custom Code                  | IDS Replacement                                       | Priority |
| --------------------------------------- | ----------------------------------------------------- | -------- |
| `<button>`                              | `IressButton`                                         | High     |
| `<a>` (navigation link)                 | `IressLink`                                           | High     |
| `<input type="text">`                   | `IressField` + `IressInput`                           | High     |
| `<input type="checkbox">`               | `IressCheckbox`                                       | High     |
| `<input type="radio">`                  | `IressRadio` + `IressRadioGroup`                      | High     |
| `<select>`                              | `IressField` + `IressSelect`                          | High     |
| `<textarea>`                            | `IressField` + `IressInput`                           | High     |
| `<table>`                               | `IressTable`                                          | High     |
| `<label>`                               | `IressField` (wraps input with label)                 | High     |
| `<h1>`–`<h6>`, `<p>`, `<span>` (styled) | `IressText`                                           | Medium   |
| `<img>`                                 | `IressImage`                                          | Medium   |
| `<hr>`                                  | `IressDivider`                                        | Medium   |
| `<dialog>` / custom modal               | `IressModal`                                          | High     |
| Custom confirmation / danger dialog     | `IressModal status="danger"` (or `success`/`warning`) | High     |
| Custom drawer / slideout                | `IressSlideout`                                       | High     |
| Custom tooltip                          | `IressTooltip`                                        | Medium   |
| Custom popover                          | `IressPopover`                                        | Medium   |
| Custom tabs                             | `IressTabSet` + `IressTab`                            | High     |
| Custom spinner / loader                 | `IressSpinner`                                        | Medium   |
| Custom skeleton loader                  | `IressSkeleton`                                       | Low      |
| Custom progress bar                     | `IressProgress`                                       | Low      |
| Custom alert / toast                    | `IressAlert` / `IressToaster`                         | High     |
| Custom card / panel                     | `IressCard` / `IressPanel`                            | Medium   |
| Custom toggle / switch                  | `IressToggle`                                         | High     |
| Custom badge / tag                      | `IressTag` / `IressPill`                              | Low      |
| Custom breadcrumbs                      | `IressBreadcrumbs`                                    | Medium   |
| Custom side navigation                  | `IressSideNav`                                        | Medium   |
| Custom context menu                     | `IressMenu` + `IressMenuItem`                         | Medium   |
| Custom icon (SVG inline)                | `IressIcon`                                           | Medium   |
| `<div>` with flex column styles         | `IressStack`                                          | Medium   |
| `<div>` with flex row styles            | `IressInline`                                         | Medium   |
| `<div>` with grid styles                | `IressRow` + `IressCol`                               | Medium   |
| `<div>` with max-width container        | `IressContainer`                                      | Low      |
| `<form>`                                | `IressForm` + `IressFormField`                        | High     |
| `<input type="range">`                  | `IressSlider`                                         | Medium   |
| `<input type="number">` (currency)      | `IressField` + `IressInputCurrency`                   | Medium   |
| `<details>` / custom accordion          | `IressExpander`                                       | Medium   |
| Custom autocomplete / typeahead         | `IressAutocomplete`                                   | High     |
| Custom select with search               | `IressField` + `IressSelect`                          | High     |
| Custom read-only display                | `IressReadonly`                                       | Medium   |
| Custom segmented control / button group | `IressButtonGroup`                                    | Medium   |
| Custom validation messages              | `IressValidationMessage` / `IressValidationSummary`   | High     |
| Custom styled wrapper `<div>`           | `IressStyled`                                         | Low      |

## What to Look For

```typescript
// ❌ Raw HTML — should use IDS components
<button onClick={handleClick}>Submit</button>
<input type="text" placeholder="Name" />
<select>
  <option>Option 1</option>
</select>
<div className="modal-overlay">...</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>...</div>

// ✅ IDS components
<IressButton mode="primary" onClick={handleClick}>Submit</IressButton>
<IressField label="Name" htmlFor="name">
  <IressInput id="name" placeholder="Name" />
</IressField>
<IressField label="Options" htmlFor="options">
  <IressSelect id="options">
    <option>Option 1</option>
  </IressSelect>
</IressField>
<IressModal open={isOpen} onClose={handleClose}>...</IressModal>
<IressStack gap="4">...</IressStack>
```

## Acceptable Exceptions

Not every raw HTML element is a violation. The following are **acceptable exceptions** that should NOT be flagged:

| Pattern                                                      | Why It's Acceptable                                                                                                                     |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `<a>` inside markdown/MDX renderers                          | Content-driven, not application UI                                                                                                      |
| `<button>` inside third-party widgets the app cannot control | External dependency constraint                                                                                                          |
| `<table>` in email templates                                 | Email clients don't support custom components                                                                                           |
| `<img>` in SVG sprites or `<picture>` elements               | IressImage doesn't cover these use cases                                                                                                |
| `<div>` for ref targets, portals, or measurement containers  | Technical necessity, not layout                                                                                                         |
| Raw elements in test files / stories for demonstration       | Not shipped to users                                                                                                                    |
| `<form>` wrapping a single action (e.g., search bar)         | `IressForm` is best for multi-field forms; standalone search inputs may use `IressAutocomplete` or `IressField` + `IressInput` directly |
| `<input type="hidden">`                                      | Not user-facing UI                                                                                                                      |
| Custom components wrapping IDS components internally         | App-level abstraction is valid as long as IDS components are used underneath                                                            |

**When reporting:** If a potential violation falls into an exception category, note it as "Reviewed — Acceptable Exception" rather than a finding. This prevents false positives and keeps reports actionable.

### 3. Validate IDS Principles & Setup

#### a. Provider & CSS Setup

- **IressProvider must wrap the application root** — Required for fonts, CSS variables, and theming. `IressProvider` already includes `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, `IressPopoverProvider`, and `IressIconProvider` — these should not be added separately. Similarly, `IressShadow` includes `IressProvider` internally, so no additional providers are needed when using `IressShadow`.
- **The IDS component CSS must be imported** — `@iress-oss/ids-components/dist/style.css` contains all component styles
- Users only need to install `@iress-oss/ids-components` — the tokens are bundled within the component library and do not need to be installed separately.
- **CSP must allowlist IDS external origins** — If the app enforces a Content Security Policy, `fonts.googleapis.com` and `fonts.gstatic.com` must be in `style-src`/`font-src`. Add `cdn.iress.com` if using legacy Font Awesome icons or `IressTheme`. If using `IressShadow` and inline styles are blocked, add `<meta name="csp-nonce" content="...">` in `<head>`. See the CSP Guide at `node_modules/@iress-oss/ids-components/.ai/guides/get-started-content-security-policy.md` for details (requires `@iress-oss/ids-components` to be installed).
- If using design tokens directly in application code (for custom styling), users should additionally install `@iress-oss/ids-tokens` and import `@iress-oss/ids-tokens/build/css-vars.css`

```typescript
// ✅ Minimum required setup (option A — standard)
import '@iress-oss/ids-components/dist/style.css';
import { IressProvider } from '@iress-oss/ids-components';

function App() {
  return <IressProvider>{/* app content */}</IressProvider>;
}
```

```typescript
// ✅ Minimum required setup (option B — IressShadow)
// IressShadow is a superset of IressProvider — it wraps children in a shadow DOM,
// injects style.css automatically, and provides the IressProvider context.
// No separate IressProvider or CSS import is needed when using IressShadow.
import { IressShadow } from '@iress-oss/ids-components';

function App() {
  return <IressShadow>{/* app content */}</IressShadow>;
}
```

```typescript
// ✅ With direct token usage in application code (optional)
import '@iress-oss/ids-components/dist/style.css';
import '@iress-oss/ids-tokens/build/css-vars.css';
import { IressProvider } from '@iress-oss/ids-components';
import { cssVars } from '@iress-oss/ids-tokens';

function App() {
  return (
    <IressProvider>
      <div style={{ padding: cssVars.spacing[4] }}>{/* app content */}</div>
    </IressProvider>
  );
}
```

```typescript
// ❌ Incorrect — missing component CSS
import { IressProvider } from '@iress-oss/ids-components';
// Components will render without styles!

// ❌ Incorrect — installing tokens separately just for provider setup
yarn add @iress-oss/ids-tokens  // Not needed unless using tokens directly
```

#### b. Design Token Usage

- No hardcoded colour hex/rgb — use IDS colour tokens
- No hardcoded pixel spacing — use IDS spacing tokens
- No hardcoded font properties — use IDS typography tokens
- No hardcoded border-radius — use IDS radius tokens

```typescript
// ❌ Hardcoded values
<div style={{ color: '#003271', padding: '16px', borderRadius: '4px' }}>

// ✅ IDS tokens
import { cssVars } from '@iress-oss/ids-tokens';
<div style={{
  color: cssVars.colour.primary.fill,
  padding: cssVars.spacing[4],
  borderRadius: cssVars.radius[1]
}}>
```

#### c. Form & Pattern Compliance

IDS provides patterns that ensure consistent UIs. Validate usage where appropriate.

**Form Pattern (`IressForm`):**

- Use `IressForm` + `IressFormField` for all forms
- `rules` prop for validation; `useWatch` for conditional fields
- `pattern="long"` for forms with >8 fields
- `react-hook-form` as peer dependency

**Loading Pattern (`IressLoading` / `IressSkeleton`):**

- `page`, `component`, `start-up`, `validate`, `long` patterns
- Handles timing thresholds automatically (no indicator <500ms, spinner at 500ms, message at 2s)
- Prefer `IressLoading` for standard loading states — it handles timing, messaging, and accessibility automatically
- `IressSkeleton` is valid for custom content placeholder patterns where you need skeleton screens that mirror the page layout; use `IressLoading` if possible
- When a page reads from a pre-populated cache (e.g. SWR, React Query, or TanStack Query cache populated by a previous page), a separate loading state may be unnecessary — check whether the data source is a cache read vs a fresh fetch before flagging

**Navigation Patterns:**

- `IressDropdownMenu` for filter/action triggers (not inside forms)
- `IressContextualMenu` for row-level actions with `ariaLabel`
- `IressSideNav` for application shell navigation
- `IressBreadcrumbs` for hierarchy navigation

**Error Boundary Pattern:**

React error boundaries catch component crashes and should render IDS components as fallback UI — not custom error pages or raw HTML.

| Error Scope                                 | IDS Component                                          | Why                                                                 |
| ------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| Full-page crash (root error boundary)       | `IressModal status="danger"` with retry/reload actions | Blocks interaction, demands attention, provides structured recovery |
| Section/feature crash (scoped boundary)     | `IressAlert status="danger"` as inline fallback        | Persistent, in-context — rest of the page still works               |
| Transient API/network failure (not a crash) | `IressToaster`                                         | Retryable, doesn't block the UI                                     |

- **Do NOT use `IressToaster` for error boundaries** — toasts are transient and dismissible; if the user dismisses it, the broken component tree has no recovery UI
- **`IressModal status="danger"`** is the primary recommendation for root-level error boundaries — use `actions` prop to offer "Retry" or "Reload" buttons
- **`IressAlert status="danger"`** is preferred for scoped boundaries that wrap individual features — shows inline where the broken component was

**Before flagging missing error handling:** Check whether a parent component or layout route already provides an error boundary that covers the file being audited. Error boundaries are an app-wide pattern — a page component does not need its own error/empty state handling if a parent boundary already catches and renders IDS-based fallback UI (e.g. `IressModal status="danger"` with navigation-aware recovery). Only flag if no ancestor provides error handling.

**Shadow DOM Pattern (`IressShadow`):**

- `IressShadow` is a **superset of `IressProvider`** — it creates a shadow root, injects `style.css` into it, and provides the `IressProvider` context automatically. When an app uses `IressShadow` at its entry point, no separate `IressProvider` or CSS import is required.
- Commonly used for microfrontend CSS isolation, but also valid as the sole Provider + CSS setup for any application
- Creates a shadow root on a `<div>` — children are standard React components
- The `slot` attribute is irrelevant; always use React props (`prepend`, `append`, `footer`, etc.)

### 4. Provide Recommendations

Prioritise findings using these levels:

| Priority     | Description                                                                                             | Action                |
| ------------ | ------------------------------------------------------------------------------------------------------- | --------------------- |
| **Critical** | Missing Provider/CSS, raw inputs without labels, missing skip links, forms not using `IressForm`        | Must fix immediately  |
| **High**     | Raw HTML elements with IDS equivalents, custom form handling, a11y failures, high cognitive load issues | Fix in current sprint |
| **Medium**   | Hardcoded tokens, missing IressText, custom layout, missing ARIA landmarks, information density issues  | Plan for next sprint  |
| **Low**      | Missing IressImage, custom badges, minor token inconsistencies, non-critical UX improvements            | Backlog               |

For each finding, provide: (1) what was found, (2) why it matters, (3) how to fix (with before/after code), (4) priority level.

### 5. Generate Compliance Report

Use the report template to produce a structured report.

# IDS UI Doctor Report Template

Use this template when generating compliance reports.

```markdown
# IDS UI Doctor Report

**Application:** [App Name]
**Date:** [Audit Date]
**Overall Score:** [X/100]

## Executive Summary

[2-3 sentence summary of overall IDS compliance status]

## Score Breakdown

| Category                | Score | Max     | Status   |
| ----------------------- | ----- | ------- | -------- |
| IDS Component Usage     | X     | 25      | 🔴/🟡/🟢 |
| IDS Pattern Compliance  | X     | 20      | 🔴/🟡/🟢 |
| Accessibility           | X     | 20      | 🔴/🟡/🟢 |
| Design Token Compliance | X     | 15      | 🔴/🟡/🟢 |
| Layout & Spacing        | X     | 10      | 🔴/🟡/🟢 |
| Provider & Setup        | X     | 10      | 🔴/🟡/🟢 |
| **Total**               | **X** | **100** |          |

### Scoring Guide

- 🟢 **90–100%** — Excellent IDS compliance
- 🟡 **60–89%** — Moderate compliance, improvements needed
- 🔴 **Below 60%** — Significant gaps, prioritise remediation

## Detailed Findings

### IDS Component Usage (X/25)

#### Components Correctly Used

- [List of IDS components found and correctly used]

#### Missing IDS Component Opportunities

| Location    | Current Code | Recommended IDS Component | Priority |
| ----------- | ------------ | ------------------------- | -------- |
| [file:line] | `<button>`   | `IressButton`             | High     |
| ...         | ...          | ...                       | ...      |

### IDS Pattern Compliance (X/20)

#### Pattern Usage

| Location    | Current Pattern               | Recommended IDS Pattern        | Priority |
| ----------- | ----------------------------- | ------------------------------ | -------- |
| [file:line] | Custom `<form>` with useState | `IressForm` + `IressFormField` | High     |
| [file:line] | Custom loading spinner        | `IressLoading pattern="page"`  | High     |
| [file:line] | Custom context menu           | `IressContextualMenu`          | Medium   |
| ...         | ...                           | ...                            | ...      |

### Accessibility (X/20)

#### Issues Found

| Location    | Issue                        | Severity | WCAG Criterion               |
| ----------- | ---------------------------- | -------- | ---------------------------- |
| [file:line] | Input missing label          | Critical | 1.3.1 Info and Relationships |
| [file:line] | No skip link                 | High     | 2.4.1 Bypass Blocks          |
| [file:line] | Colour-only status indicator | High     | 1.4.1 Use of Color           |
| [file:line] | Missing alt text on image    | Medium   | 1.1.1 Non-text Content       |
| ...         | ...                          | ...      | ...                          |

### Design Token Compliance (X/15)

#### Hardcoded Values Found

| Location    | Current Value | Recommended Token     | Category |
| ----------- | ------------- | --------------------- | -------- |
| [file:line] | `#003271`     | `colour.primary.fill` | Colour   |
| [file:line] | `16px`        | `spacing.4`           | Spacing  |
| ...         | ...           | ...                   | ...      |

### Layout & Spacing (X/10)

#### Custom Layout Patterns

| Location    | Current Pattern                         | IDS Alternative |
| ----------- | --------------------------------------- | --------------- |
| [file:line] | `display: flex; flex-direction: column` | `IressStack`    |
| ...         | ...                                     | ...             |

### Provider & Setup (X/10)

- [ ] IressProvider wraps application root (or IressShadow, which is a superset)
- [ ] `@iress-oss/ids-components/dist/style.css` imported (not needed if using IressShadow)
- [ ] `@iress-oss/ids-tokens/build/css-vars.css` imported (only if using tokens directly)
- [ ] `react-hook-form` installed (if using IressForm)
- [ ] No conflicting CSS resets

## Recommendations Summary

### Critical (Fix Immediately)

1. [Finding and remediation]

### High Priority (Current Sprint)

1. [Finding and remediation]

### Medium Priority (Next Sprint)

1. [Finding and remediation]

### Low Priority (Backlog)

1. [Finding and remediation]

## IDS Components Available But Not Used

[List any IDS components that could benefit the application but are not currently imported]
```

## Example Audit Output

### Quick Scan Summary

```
IDS UI Doctor — Quick Scan
================================
Files scanned:     42
Components found:  18 IDS / 7 raw HTML
Patterns used:     3/7 available
Token compliance:  73%
Accessibility:     82%

Top Issues:
  ⚠ 3× raw <button> found (should be IressButton)
  ⚠ 2× hardcoded colours found (#333, #f5f5f5)
  ⚠ 1× <input> without IressField wrapper
  ⚠ 2× custom <form> found (should use IressForm)
  ⚠ 1× custom loading spinner (should use IressLoading)
  ⚠ 1× missing skip link for keyboard navigation
  ✓ IressProvider correctly configured
  ✓ Component CSS imported
  ✓ IressBreadcrumbs used for navigation hierarchy
  ✓ Colour contrast passes WCAG AA
```

## Reference

> **Note:** Component docs, pattern docs, and the manifest are within the installed package itself.

**Discovery:**
- **Start here:** `node_modules/@iress-oss/ids-components/llms.txt` — lists all available docs
- **Component docs:** `node_modules/@iress-oss/ids-components/.ai/components/<name>.md`
- **Pattern docs:** `node_modules/@iress-oss/ids-components/.ai/patterns/`
- **Index (full component list):** `node_modules/@iress-oss/ids-components/.ai/index.json`
- **Token docs:** `node_modules/@iress-oss/ids-tokens/llms.txt`

**Verification:**
- **Type definitions:** `node_modules/@iress-oss/ids-components/dist/components/<Name>/<Name>.d.ts`
- **Never assume props exist** — always verify against the `.d.ts` before flagging missing usage

**Related skills:**
- **Token usage:** `.agents/skills/token-usage/SKILL.md`
- **Figma mapping:** `.agents/skills/figma-to-ids/SKILL.md`
- **UI translation:** `.agents/skills/ui-translation/SKILL.md`
- **Common mistakes guide:** `node_modules/@iress-oss/ids-components/.ai/foundations/common-mistakes.md`

## Common Mistakes to Flag in Audits

For the full list of common anti-patterns with code examples, read the Common Mistakes guide at `node_modules/@iress-oss/ids-components/.ai/guides/foundations-common-mistakes.md` (requires `@iress-oss/ids-components` to be installed). When auditing, flag these with the following priorities and audit rules:

### `disabled` attribute on IressButton — **High** priority

**Audit rule:** Search for `disabled` on any `<IressButton`. Every match is a finding.

### Redundant `textStyle` on IressText — **Medium** priority

**Audit rule:** Search for `IressText` with both `element` and `textStyle` where the textStyle matches the element's default styling (e.g. `element="h1" textStyle="typography.heading.1"`).

### Legacy `slot` attributes (v4 pattern) — **High** priority

**Audit rule:** Search for `slot="` inside any `<Iress*>` component. Every match is a finding.


---

# Skill: UI Translation

## Purpose

Translate natural language UI descriptions into IDS (Iress Design System) component implementations using `@iress-oss/ids-components` and `@iress-oss/ids-tokens`.

## Translation Workflow

1. **Identify the UI elements** — Break the description into components: actions (buttons), inputs (fields), layout (stacks, grids), content (text, cards), overlays (modals, slideouts), navigation
2. **Map to IDS components** — Use the component mapping to find the right IDS component for each element

# IDS Component Mapping

## Actions

| Description                      | IDS Component                          | Example                                                            |
| -------------------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| Submit / primary action button   | `IressButton mode="primary"`           | `<IressButton mode="primary">Submit</IressButton>`                 |
| Cancel / secondary action button | `IressButton mode="secondary"`         | `<IressButton mode="secondary">Cancel</IressButton>`               |
| Less prominent action            | `IressButton mode="tertiary"`          | `<IressButton mode="tertiary">Details</IressButton>`               |
| Icon-only action                 | `IressButton icon="edit" mode="muted"` | `<IressButton mode="muted" icon="edit">Edit</IressButton>`         |
| Danger / delete action           | `IressButton status="danger"`          | `<IressButton mode="primary" status="danger">Delete</IressButton>` |
| Link in text                     | `IressLink`                            | `<IressLink href="/about">About</IressLink>`                       |
| Dropdown/context menu trigger    | `IressDropdownMenu`                    | See patterns docs                                                  |

## Form Inputs

| Description              | IDS Component                       | Example                                                                                                                        |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Labelled text input      | `IressField` + `IressInput`         | See Form example below                                                                                                         |
| Select dropdown (static or async) | `IressField` + `IressSelect` | `<IressField label="Country"><IressSelect>...</IressSelect></IressField>` — supports static options and async loading via an `options` function |
| Freetext input with suggestions  | `IressField` + `IressAutocomplete` | `<IressField label="Search"><IressAutocomplete /></IressField>` — allows any text input; suggestions are optional |
| Currency input           | `IressField` + `IressInputCurrency` | `<IressField label="Amount"><IressInputCurrency /></IressField>`                                                               |
| Checkbox                 | `IressCheckbox`                     | `<IressCheckbox value="agree">I agree</IressCheckbox>`                                                                         |
| Checkbox group           | `IressCheckboxGroup`                | `<IressField label="Options"><IressCheckboxGroup name="opts"><IressCheckbox value="a">A</IressCheckbox><IressCheckbox value="b">B</IressCheckbox></IressCheckboxGroup></IressField>` |
| Radio buttons            | `IressRadioGroup` + `IressRadio`    | `<IressField label="Choice"><IressRadioGroup><IressRadio value="yes">Yes</IressRadio><IressRadio value="no">No</IressRadio></IressRadioGroup></IressField>` |
| Toggle switch            | `IressToggle`                       | `<IressToggle>Enable</IressToggle>`                                                                                            |
| Slider / range           | `IressSlider`                       | `<IressSlider min={0} max={100} />`                                                                                            |
| Read-only display        | `IressReadonly`                     | `<IressReadonly label="Status" value="Active" />` — supports `actions` prop for inline action buttons (e.g. edit toggle). Use `variant="locked"` when the value is read-only due to permissions |

### Select vs Autocomplete Decision Guide

- **Need to restrict to valid options?** → `IressSelect` — supports static options and async loading via an `options` function. Use this for most selection use cases. Always read the component doc to understand filtering behaviour for your use case.
- **Need freetext with optional suggestions?** → `IressAutocomplete` — allows any text input; suggestions are offered but not enforced.

## Layout

| Description                                  | IDS Component           | Example                                                                                   |
| -------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| Vertical stack (items stacked top-to-bottom) | `IressStack`            | `<IressStack gap="md">...</IressStack>`                                                    |
| Horizontal row (items side-by-side)          | `IressInline`           | `<IressInline gap="sm">...</IressInline>`                                                  |
| Grid columns                                 | `IressRow` + `IressCol` | `<IressRow><IressCol span={{ xs: 12, md: 6 }}>...</IressCol><IressCol span={{ xs: 12, md: 6 }}>...</IressCol></IressRow>` |
| Container with max-width                     | `IressContainer`        | `<IressContainer>...</IressContainer>`                                                    |
| Divider / separator                          | `IressDivider`          | `<IressDivider />`                                                                        |
| Responsive visibility                        | `hideFrom`/`hideBelow` props or `useBreakpoint` hook | `<IressText hideBelow="md">Desktop only</IressText>`                                       |

## Content & Display

| Description          | IDS Component               | Example                                                                                                     |
| -------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Text / paragraph     | `IressText`                 | `<IressText>Body text</IressText>`                                                                          |
| Heading              | `IressText element="h2"`    | `<IressText element="h2">Heading</IressText>`                                                               |
| Card / panel         | `IressCard` or `IressPanel` | `<IressCard heading={<h3>Title</h3>}>Content</IressCard>`                                   |
| Alert / notification | `IressAlert`                | `<IressAlert status="success">Saved!</IressAlert>`                                                          |
| Loading spinner      | `IressSpinner`              | `<IressSpinner />`                                                                                          |
| Skeleton loader      | `IressSkeleton`             | `<IressSkeleton height="20px" width="200px" />`                                                             |
| Progress bar         | `IressProgress`             | `<IressProgress value={75} max={100} />`                                                                    |
| Image                | `IressImage`                | `<IressImage src="..." alt="..." />`                                                                        |
| Icon                 | `IressIcon`                 | `<IressIcon name="settings" />`                                                                             |
| Tag / badge          | `IressTag`                  | `<IressTag>New</IressTag>`; use `bordered` for visible-border style; use `element="button"` for clickable tag, `element="a"` for link tag; `onClick` alone also auto-renders as `<button>` |
| Pill                 | `IressPill`                 | `<IressPill>Category</IressPill>`                                                                           |
| Tooltip              | `IressTooltip`              | `<IressTooltip content="Help text"><IressButton>Hover me</IressButton></IressTooltip>`                      |

## Overlays & Navigation

| Description                           | IDS Component                 | Example                                                                   |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| Modal / dialog                        | `IressModal`                  | See Modal docs                                                            |
| Status modal (danger/success/warning) | `IressModal status="danger"`  | Use `actions` prop for buttons; size restricted to `sm`/`md`              |
| Slideout / drawer                     | `IressSlideout`               | See Slideout docs                                                         |
| Popover                               | `IressPopover`                | See Popover docs                                                          |
| Menu                                  | `IressMenu` + `IressMenuItem` | See Menu docs                                                             |
| Tab navigation                        | `IressTabSet` + `IressTab`    | `<IressTabSet><IressTab label="Tab 1">Content 1</IressTab></IressTabSet>` |
| Skip link (a11y)                      | `IressSkipLink`               | `<IressSkipLink href="#main">Skip to content</IressSkipLink>`             |
| Side navigation                       | `IressSideNav`                | See SideNav pattern docs                                                  |
| Breadcrumbs                           | `IressBreadcrumbs`            | See Breadcrumbs pattern docs                                              |

## Tables

| Description | IDS Component | Example                                                                                                 |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| Data table  | `IressTable`  | `<IressTable caption="Users" rows={users} columns={columns} />` — data-driven via `rows` and `columns` props |
3. **Verify component capabilities** — Before recommending a component, read its `.ai/components/<name>.md` doc (in `node_modules/@iress-oss/ids-components/.ai/components/`) to verify it supports the required features (async, filtering, validation, etc.)
4. **Apply layout** — Wrap elements in `IressStack` (vertical), `IressInline` (horizontal), or `IressRow`/`IressCol` (grid) only when needed. Check whether the parent component already provides layout (e.g. card footer, modal actions, button group) before adding wrappers. Never wrap a single child in a layout component. Always make grids responsive with `span={{ xs: 12, md: ... }}`
5. **Add responsive behaviour** — Even if the description only mentions desktop, stack columns on mobile and relocate secondary content to `IressSlideout` or collapsible sections
6. **Apply styling** — Use styling props for spacing, colour, and typography. Spacing tokens must include the category prefix: `gap="spacing.4"`, `p="spacing.6"`. Alias tokens (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`) are also valid. Never use bare numbers like `gap="4"`.

# Styling Props (IressCSSProps)

Most IDS components accept styling props for layout adjustments:

| Prop           | Purpose                         | Values                                                                                                                                                                                 |
| -------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alignSelf`    | Override flex alignment         | `"start"`, `"end"`, `"center"`, `"stretch"`                                                                                                                                            |
| `bg`           | Background colour               | Colour tokens: `"colour.primary.fill"`, `"colour.neutral.20"`, `"alt"`, etc.                                                                                                           |
| `borderRadius` | Border radius                   | Radius tokens: `"radius.0"` – `"radius.4"`, `"none"`                                                                                                                                   |
| `color`        | Text colour                     | Colour tokens: `"colour.neutral.80"`, `"colour.primary.text"`, etc.                                                                                                                    |
| `flex`         | Flex grow                       | `"1"` only                                                                                                                                                                             |
| `focusable`    | Apply focus ring                | `"true"`, `"within"`, `"within:inset"`, `"inset"`, `"has-button"`, `"has-input"`, `"has-switch"`, `"label-after"`, `"expander-activator"`, `"select-activator"`, `"slider"`, `"group"` |
| `hideFrom`     | Hide from breakpoint up         | `true`, or breakpoints: `"sm"`, `"md"`, `"lg"`, `"xl"`                                                                                                                                 |
| `hideBelow`    | Hide below breakpoint           | Breakpoints: `"sm"`, `"md"`, `"lg"`, `"xl"`                                                                                                                                            |
| `maxWidth`     | Max width                       | Size tokens: `"container.sm"`, `"container.md"`, etc.                                                                                                                                  |
| `m`            | Margin (all sides)              | Spacing tokens: `"xs"` – `"xl"`, `"spacing.1"` – `"spacing.10"`, `"auto"`, negatives (responsive)                                                                                      |
| `mx`           | Margin horizontal               | Same as `m` (responsive)                                                                                                                                                               |
| `my`           | Margin vertical                 | Same as `m` (responsive)                                                                                                                                                               |
| `mt`           | Margin top                      | Same as `m` (responsive)                                                                                                                                                               |
| `mr`           | Margin right                    | Same as `m` (responsive)                                                                                                                                                               |
| `mb`           | Margin bottom                   | Same as `m` (responsive)                                                                                                                                                               |
| `ml`           | Margin left                     | Same as `m` (responsive)                                                                                                                                                               |
| `noGutter`     | Remove last-child bottom margin | `true` / `false`                                                                                                                                                                       |
| `p`            | Padding (all sides)             | Spacing tokens: `"xs"` – `"xl"`, `"spacing.1"` – `"spacing.10"` (responsive)                                                                                                           |
| `px`           | Padding horizontal              | Same as `p` (responsive)                                                                                                                                                               |
| `py`           | Padding vertical                | Same as `p` (responsive)                                                                                                                                                               |
| `pt`           | Padding top                     | Same as `p` (responsive)                                                                                                                                                               |
| `pr`           | Padding right                   | Same as `p` (responsive)                                                                                                                                                               |
| `pb`           | Padding bottom                  | Same as `p` (responsive)                                                                                                                                                               |
| `pl`           | Padding left                    | Same as `p` (responsive)                                                                                                                                                               |
| `scrollable`   | Enable overflow scrolling       | `true`, `"x"`, `"y"`                                                                                                                                                                   |
| `srOnly`       | Screen-reader only              | `true` / `false` (responsive)                                                                                                                                                          |
| `stretch`      | Fill parent height              | `true` / `false`                                                                                                                                                                       |
| `textAlign`    | Text alignment                  | `"left"`, `"right"`, `"center"`, `"justify"`, `"inherit"`                                                                                                                              |
| `textStyle`    | Typography style override       | `"typography.body.sm"`, `"typography.body.md"`, `"typography.heading.1"` – `"typography.heading.5"`, `"typography.code"`. **Only use when intentionally overriding the component's default typography. Avoid specifying `textStyle` when the default styling already matches the desired appearance.** |
| `width`        | Element width                   | Size tokens: `"input.2"` – `"input.16"`, `"3/12"` – `"12/12"` (grid), `"auto"` (responsive)                                                                                            |
7. **Verify output** — Check that all imports resolve, no raw HTML is used where IDS components exist, grid layouts use responsive `span` values, and no common anti-patterns are present (disabled buttons, slot attributes, redundant textStyle)

## Setup

```bash
npm install @iress-oss/ids-components
# If using tokens directly:
npm install @iress-oss/ids-tokens
```

```tsx
import '@iress-oss/ids-components/dist/style.css'; // Required — component styles
import '@iress-oss/ids-tokens/build/css-vars.css'; // Required if using tokens directly
import {
  IressProvider,
  IressButton,
  IressInput,
  IressField,
  IressStack,
  IressInline,
  IressText,
  IressCard,
  // ... import what you need
} from '@iress-oss/ids-components';

// Wrap your app in IressProvider (handles fonts + CSS variables)
function App() {
  return <IressProvider>{/* your UI */}</IressProvider>;
}
```

## Documentation & Verification

Before using any component, verify it exists and check its props:

1. **Discovery** — Read `node_modules/@iress-oss/ids-components/llms.txt` for the full list of available components and their doc paths
2. **Usage docs** — Read `node_modules/@iress-oss/ids-components/.ai/components/<name>.md` for props, examples, and design guidance
3. **Type verification** — Read `node_modules/@iress-oss/ids-components/dist/components/<Name>/<Name>.d.ts` to confirm a prop exists before using it
4. **Token docs** — Read `node_modules/@iress-oss/ids-tokens/llms.txt` for available tokens

**Never assume props exist.** Always verify against the installed `.d.ts` types. If a prop isn't in the type definition, it doesn't exist.

## Component Mapping

When you need to find the right IDS component for a UI element, read references/component-mapping.md for the full description → IDS component mapping tables (actions, form inputs, layout, content, overlays, navigation, tables).

# IDS Component Mapping

## Actions

| Description                      | IDS Component                          | Example                                                            |
| -------------------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| Submit / primary action button   | `IressButton mode="primary"`           | `<IressButton mode="primary">Submit</IressButton>`                 |
| Cancel / secondary action button | `IressButton mode="secondary"`         | `<IressButton mode="secondary">Cancel</IressButton>`               |
| Less prominent action            | `IressButton mode="tertiary"`          | `<IressButton mode="tertiary">Details</IressButton>`               |
| Icon-only action                 | `IressButton icon="edit" mode="muted"` | `<IressButton mode="muted" icon="edit">Edit</IressButton>`         |
| Danger / delete action           | `IressButton status="danger"`          | `<IressButton mode="primary" status="danger">Delete</IressButton>` |
| Link in text                     | `IressLink`                            | `<IressLink href="/about">About</IressLink>`                       |
| Dropdown/context menu trigger    | `IressDropdownMenu`                    | See patterns docs                                                  |

## Form Inputs

| Description              | IDS Component                       | Example                                                                                                                        |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Labelled text input      | `IressField` + `IressInput`         | See Form example below                                                                                                         |
| Select dropdown (static or async) | `IressField` + `IressSelect` | `<IressField label="Country"><IressSelect>...</IressSelect></IressField>` — supports static options and async loading via an `options` function |
| Freetext input with suggestions  | `IressField` + `IressAutocomplete` | `<IressField label="Search"><IressAutocomplete /></IressField>` — allows any text input; suggestions are optional |
| Currency input           | `IressField` + `IressInputCurrency` | `<IressField label="Amount"><IressInputCurrency /></IressField>`                                                               |
| Checkbox                 | `IressCheckbox`                     | `<IressCheckbox value="agree">I agree</IressCheckbox>`                                                                         |
| Checkbox group           | `IressCheckboxGroup`                | `<IressField label="Options"><IressCheckboxGroup name="opts"><IressCheckbox value="a">A</IressCheckbox><IressCheckbox value="b">B</IressCheckbox></IressCheckboxGroup></IressField>` |
| Radio buttons            | `IressRadioGroup` + `IressRadio`    | `<IressField label="Choice"><IressRadioGroup><IressRadio value="yes">Yes</IressRadio><IressRadio value="no">No</IressRadio></IressRadioGroup></IressField>` |
| Toggle switch            | `IressToggle`                       | `<IressToggle>Enable</IressToggle>`                                                                                            |
| Slider / range           | `IressSlider`                       | `<IressSlider min={0} max={100} />`                                                                                            |
| Read-only display        | `IressReadonly`                     | `<IressReadonly label="Status" value="Active" />` — supports `actions` prop for inline action buttons (e.g. edit toggle). Use `variant="locked"` when the value is read-only due to permissions |

### Select vs Autocomplete Decision Guide

- **Need to restrict to valid options?** → `IressSelect` — supports static options and async loading via an `options` function. Use this for most selection use cases. Always read the component doc to understand filtering behaviour for your use case.
- **Need freetext with optional suggestions?** → `IressAutocomplete` — allows any text input; suggestions are offered but not enforced.

## Layout

| Description                                  | IDS Component           | Example                                                                                   |
| -------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| Vertical stack (items stacked top-to-bottom) | `IressStack`            | `<IressStack gap="md">...</IressStack>`                                                    |
| Horizontal row (items side-by-side)          | `IressInline`           | `<IressInline gap="sm">...</IressInline>`                                                  |
| Grid columns                                 | `IressRow` + `IressCol` | `<IressRow><IressCol span={{ xs: 12, md: 6 }}>...</IressCol><IressCol span={{ xs: 12, md: 6 }}>...</IressCol></IressRow>` |
| Container with max-width                     | `IressContainer`        | `<IressContainer>...</IressContainer>`                                                    |
| Divider / separator                          | `IressDivider`          | `<IressDivider />`                                                                        |
| Responsive visibility                        | `hideFrom`/`hideBelow` props or `useBreakpoint` hook | `<IressText hideBelow="md">Desktop only</IressText>`                                       |

## Content & Display

| Description          | IDS Component               | Example                                                                                                     |
| -------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Text / paragraph     | `IressText`                 | `<IressText>Body text</IressText>`                                                                          |
| Heading              | `IressText element="h2"`    | `<IressText element="h2">Heading</IressText>`                                                               |
| Card / panel         | `IressCard` or `IressPanel` | `<IressCard heading={<h3>Title</h3>}>Content</IressCard>`                                   |
| Alert / notification | `IressAlert`                | `<IressAlert status="success">Saved!</IressAlert>`                                                          |
| Loading spinner      | `IressSpinner`              | `<IressSpinner />`                                                                                          |
| Skeleton loader      | `IressSkeleton`             | `<IressSkeleton height="20px" width="200px" />`                                                             |
| Progress bar         | `IressProgress`             | `<IressProgress value={75} max={100} />`                                                                    |
| Image                | `IressImage`                | `<IressImage src="..." alt="..." />`                                                                        |
| Icon                 | `IressIcon`                 | `<IressIcon name="settings" />`                                                                             |
| Tag / badge          | `IressTag`                  | `<IressTag>New</IressTag>`; use `bordered` for visible-border style; use `element="button"` for clickable tag, `element="a"` for link tag; `onClick` alone also auto-renders as `<button>` |
| Pill                 | `IressPill`                 | `<IressPill>Category</IressPill>`                                                                           |
| Tooltip              | `IressTooltip`              | `<IressTooltip content="Help text"><IressButton>Hover me</IressButton></IressTooltip>`                      |

## Overlays & Navigation

| Description                           | IDS Component                 | Example                                                                   |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| Modal / dialog                        | `IressModal`                  | See Modal docs                                                            |
| Status modal (danger/success/warning) | `IressModal status="danger"`  | Use `actions` prop for buttons; size restricted to `sm`/`md`              |
| Slideout / drawer                     | `IressSlideout`               | See Slideout docs                                                         |
| Popover                               | `IressPopover`                | See Popover docs                                                          |
| Menu                                  | `IressMenu` + `IressMenuItem` | See Menu docs                                                             |
| Tab navigation                        | `IressTabSet` + `IressTab`    | `<IressTabSet><IressTab label="Tab 1">Content 1</IressTab></IressTabSet>` |
| Skip link (a11y)                      | `IressSkipLink`               | `<IressSkipLink href="#main">Skip to content</IressSkipLink>`             |
| Side navigation                       | `IressSideNav`                | See SideNav pattern docs                                                  |
| Breadcrumbs                           | `IressBreadcrumbs`            | See Breadcrumbs pattern docs                                              |

## Tables

| Description | IDS Component | Example                                                                                                 |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| Data table  | `IressTable`  | `<IressTable caption="Users" rows={users} columns={columns} />` — data-driven via `rows` and `columns` props |

## Styling Props

When you need to apply spacing, colour, visibility, or typography props, read references/styling-props.md for the full `IressCSSProps` reference and accepted values.

# Styling Props (IressCSSProps)

Most IDS components accept styling props for layout adjustments:

| Prop           | Purpose                         | Values                                                                                                                                                                                 |
| -------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alignSelf`    | Override flex alignment         | `"start"`, `"end"`, `"center"`, `"stretch"`                                                                                                                                            |
| `bg`           | Background colour               | Colour tokens: `"colour.primary.fill"`, `"colour.neutral.20"`, `"alt"`, etc.                                                                                                           |
| `borderRadius` | Border radius                   | Radius tokens: `"radius.0"` – `"radius.4"`, `"none"`                                                                                                                                   |
| `color`        | Text colour                     | Colour tokens: `"colour.neutral.80"`, `"colour.primary.text"`, etc.                                                                                                                    |
| `flex`         | Flex grow                       | `"1"` only                                                                                                                                                                             |
| `focusable`    | Apply focus ring                | `"true"`, `"within"`, `"within:inset"`, `"inset"`, `"has-button"`, `"has-input"`, `"has-switch"`, `"label-after"`, `"expander-activator"`, `"select-activator"`, `"slider"`, `"group"` |
| `hideFrom`     | Hide from breakpoint up         | `true`, or breakpoints: `"sm"`, `"md"`, `"lg"`, `"xl"`                                                                                                                                 |
| `hideBelow`    | Hide below breakpoint           | Breakpoints: `"sm"`, `"md"`, `"lg"`, `"xl"`                                                                                                                                            |
| `maxWidth`     | Max width                       | Size tokens: `"container.sm"`, `"container.md"`, etc.                                                                                                                                  |
| `m`            | Margin (all sides)              | Spacing tokens: `"xs"` – `"xl"`, `"spacing.1"` – `"spacing.10"`, `"auto"`, negatives (responsive)                                                                                      |
| `mx`           | Margin horizontal               | Same as `m` (responsive)                                                                                                                                                               |
| `my`           | Margin vertical                 | Same as `m` (responsive)                                                                                                                                                               |
| `mt`           | Margin top                      | Same as `m` (responsive)                                                                                                                                                               |
| `mr`           | Margin right                    | Same as `m` (responsive)                                                                                                                                                               |
| `mb`           | Margin bottom                   | Same as `m` (responsive)                                                                                                                                                               |
| `ml`           | Margin left                     | Same as `m` (responsive)                                                                                                                                                               |
| `noGutter`     | Remove last-child bottom margin | `true` / `false`                                                                                                                                                                       |
| `p`            | Padding (all sides)             | Spacing tokens: `"xs"` – `"xl"`, `"spacing.1"` – `"spacing.10"` (responsive)                                                                                                           |
| `px`           | Padding horizontal              | Same as `p` (responsive)                                                                                                                                                               |
| `py`           | Padding vertical                | Same as `p` (responsive)                                                                                                                                                               |
| `pt`           | Padding top                     | Same as `p` (responsive)                                                                                                                                                               |
| `pr`           | Padding right                   | Same as `p` (responsive)                                                                                                                                                               |
| `pb`           | Padding bottom                  | Same as `p` (responsive)                                                                                                                                                               |
| `pl`           | Padding left                    | Same as `p` (responsive)                                                                                                                                                               |
| `scrollable`   | Enable overflow scrolling       | `true`, `"x"`, `"y"`                                                                                                                                                                   |
| `srOnly`       | Screen-reader only              | `true` / `false` (responsive)                                                                                                                                                          |
| `stretch`      | Fill parent height              | `true` / `false`                                                                                                                                                                       |
| `textAlign`    | Text alignment                  | `"left"`, `"right"`, `"center"`, `"justify"`, `"inherit"`                                                                                                                              |
| `textStyle`    | Typography style override       | `"typography.body.sm"`, `"typography.body.md"`, `"typography.heading.1"` – `"typography.heading.5"`, `"typography.code"`. **Only use when intentionally overriding the component's default typography. Avoid specifying `textStyle` when the default styling already matches the desired appearance.** |
| `width`        | Element width                   | Size tokens: `"input.2"` – `"input.16"`, `"3/12"` – `"12/12"` (grid), `"auto"` (responsive)                                                                                            |

## Responsive Layout

**Always produce responsive output.** Even when the UI description only mentions a desktop layout, every translation should adapt to smaller screens. IDS uses a 12-column grid with 6 breakpoints (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`).

### Responsive Design Principles

Apply these when translating any UI description:

1. **Identify the primary task** — What is the user trying to accomplish? The mobile layout should focus on this task and push everything else to secondary access points.
2. **Stack multi-column layouts** — Side-by-side columns should stack to full-width on mobile (`span={{ xs: 12, md: ... }}`).
3. **Relocate secondary content** — Move supplementary UI (filters, sidebars, metadata panels, secondary actions) into an `IressSlideout`, `IressModal`, or collapsible section on mobile.
4. **Simplify dense layouts** — For tables with many columns or multi-panel dashboards, hide non-essential columns with `hideBelow`, collapse sections, or switch to a card-based layout using `useBreakpoint`.
5. **Preserve all functionality** — Never remove features on mobile. Use `IressSlideout`, `IressModal`, expandable sections, or `IressTabSet` to keep functionality accessible without cluttering the view.

### Responsive Props

Many props accept a single value or an object keyed by breakpoint:

```tsx
// Full-width on mobile, half on medium+
<IressCol span={{ xs: 12, md: 6 }} />

// Tighter gap on mobile, larger on desktop
<IressRow gutter={{ xs: 'sm', md: 'lg' }} />
```

Props that support responsive values: `span`, `offset`, `gap`, `gutter`, `rowGap`, `p`, `px`, `py`, `m`, `mx`, `my`, `width`, and all directional margin/padding props.

### Responsive Visibility

Use `hideFrom`/`hideBelow` CSS props directly on any component:

```tsx
<IressButton hideBelow="md">Desktop action</IressButton>
<IressText hideFrom="lg">Mobile only text</IressText>
```

For conditional rendering based on breakpoint (e.g. rendering entirely different components), use the `useBreakpoint` hook:

```tsx
import { useBreakpoint } from '@iress-oss/ids-components';

function Navigation() {
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';

  return isMobile ? <MobileNav /> : <DesktopNav />;
}
```

## Translation Examples

### "A login form with email and password fields and a submit button"

```tsx
import {
  IressButton,
  IressField,
  IressInput,
  IressStack,
} from '@iress-oss/ids-components';

function LoginForm() {
  return (
    <IressStack gap="md">
      <IressField label="Email" htmlFor="email" required>
        <IressInput id="email" type="email" placeholder="Enter your email" />
      </IressField>
      <IressField label="Password" htmlFor="password" required>
        <IressInput
          id="password"
          type="password"
          placeholder="Enter your password"
        />
      </IressField>
      <IressButton mode="primary" type="submit">
        Log in
      </IressButton>
    </IressStack>
  );
}
```

### "A card with a title, description, and two action buttons"

```tsx
import { IressCard, IressButton, IressInline } from '@iress-oss/ids-components';

function ActionCard() {
  return (
    <IressCard
      heading={<h3>Card Title</h3>}
      footer={
        <IressInline gap="sm">
          <IressButton mode="primary">Confirm</IressButton>
          <IressButton mode="secondary">Cancel</IressButton>
        </IressInline>
      }
    >
      This is the card description with supporting details.
    </IressCard>
  );
}
```

### "A settings page with a toggle, some checkboxes, and a save button"

```tsx
import {
  IressStack,
  IressToggle,
  IressCheckboxGroup,
  IressCheckbox,
  IressButton,
  IressText,
  IressDivider,
  IressField,
} from '@iress-oss/ids-components';

function SettingsPage() {
  return (
    <IressStack gap="lg">
      <IressText element="h2">Settings</IressText>
      <IressToggle>Enable notifications</IressToggle>
      <IressDivider />
      <IressField label="Notification types">
        <IressCheckboxGroup name="notification-types">
          <IressCheckbox value="email">Email</IressCheckbox>
          <IressCheckbox value="sms">SMS</IressCheckbox>
          <IressCheckbox value="push">Push</IressCheckbox>
        </IressCheckboxGroup>
      </IressField>
      <IressDivider />
      <IressButton mode="primary">Save settings</IressButton>
    </IressStack>
  );
}
```

### "A dashboard with a sidebar and main content area"

Note: even though the description doesn't mention mobile, the sidebar is secondary content — on mobile it should move into a slideout so the main content gets focus.

```tsx
import { useState } from 'react';
import {
  IressRow,
  IressCol,
  IressStack,
  IressText,
  IressCard,
  IressButton,
  IressSlideout,
  useBreakpoint,
} from '@iress-oss/ids-components';

function Dashboard() {
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const [navOpen, setNavOpen] = useState(false);

  const nav = (
    <IressCard heading={<h3>Navigation</h3>}>
      Menu items here
    </IressCard>
  );

  return isMobile ? (
    <IressStack gap="md">
      <IressButton
        mode="secondary"
        icon="menu"
        onClick={() => setNavOpen(true)}
      >
        Menu
      </IressButton>
      <IressCard>
        <IressText element="h2">Main Content</IressText>
      </IressCard>
      <IressSlideout
        heading="Navigation"
        show={navOpen}
        onShowChange={setNavOpen}
      >
        {nav}
      </IressSlideout>
    </IressStack>
  ) : (
    <IressRow gutter="lg">
      <IressCol span={3}>{nav}</IressCol>
      <IressCol span={9}>
        <IressCard>
          <IressText element="h2">Main Content</IressText>
        </IressCard>
      </IressCol>
    </IressRow>
  );
}
```

## Best Practices

1. **Minimise component nesting** — Use the fewest components possible to achieve the layout. Every wrapper component should earn its place. Before adding `IressInline` or `IressStack`, check whether the parent component already handles the layout (e.g. `IressCard` has `heading` and `footer` props; `IressModal` has `actions`; `IressButtonGroup` handles horizontal button layout). See the "Unnecessary layout wrappers" section in Common Mistakes below.
2. **Always wrap in IressProvider** — Required at the root of your app for fonts and CSS variables. `IressProvider` already includes `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, `IressPopoverProvider`, and `IressIconProvider` — do not add these separately. If using `IressShadow`, no additional providers are needed as it includes `IressProvider` internally.
3. **Use IressField for all form inputs** — Provides consistent labels, hints, and validation display
4. **Use IressStack/IressInline only when needed** — Prefer these over custom CSS flex/grid, but don't add them when the parent already provides spacing or layout
5. **Use correct spacing token format** — Always prefix with the token category: `gap="spacing.4"`, `p="spacing.6"`. Alias tokens (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`) are also valid. Never use bare numbers like `gap="4"`.
6. **Use semantic button modes** — One `primary` per section, `secondary` for most actions
7. **Always include labels** — All form inputs need accessible labels via `IressField`
8. **Use status for feedback** — `IressAlert` for inline messages, `IressModal status="danger"` for confirmation dialogs, `status` prop on buttons for danger/success
9. **Prefer IDS components** — Use `IressText` instead of raw `<p>`, `IressButton` instead of `<button>`
10. **Native elements inside `IressText` are OK** — When rendering CMS content, markdown output, or other unstructured data sources, it is acceptable to nest native HTML elements (e.g. `<p>`, `<strong>`, `<a>`, `<ul>`) inside `IressText`. This lets `IressText` provide consistent typography while allowing flexible inner content structure.
11. **Always make grid layouts responsive** — When using `IressRow`/`IressCol`, use responsive `span` values (e.g. `span={{ xs: 12, md: 6 }}`) so columns stack on mobile instead of overflowing
12. **Check the component docs** — Read the specific component doc for detailed props and patterns (`node_modules/@iress-oss/ids-components/.ai/components/`)

## Common Mistakes

### Unnecessary layout wrappers

The most common mistake is wrapping children in `IressInline` or `IressStack` when it adds no value. Every wrapper must serve a purpose — if removing it produces the same result, remove it.

```tsx
// ❌ Unnecessary nesting — IressStack wrapping a single child
<IressStack gap="md">
  <IressInline gap="sm">
    <IressButton mode="primary">Save</IressButton>
    <IressButton mode="secondary">Cancel</IressButton>
  </IressInline>
</IressStack>

// ✅ Single group of buttons only needs IressInline
<IressInline gap="sm">
  <IressButton mode="primary">Save</IressButton>
  <IressButton mode="secondary">Cancel</IressButton>
</IressInline>
```

```tsx
// ❌ Wrapping content that's already a single block
<IressStack gap="md">
  <IressText element="h2">Title</IressText>
</IressStack>

// ✅ No wrapper needed for a single element
<IressText element="h2">Title</IressText>
```

**When to use layout wrappers:**
- `IressStack` — when you have 2+ block-level siblings that need vertical spacing between them
- `IressInline` — when you have 2+ elements that need to sit side-by-side (e.g. buttons in a card `footer`, action bars)

**When NOT to use them:**
- The parent component already handles layout (modal `actions` prop, button group)
- There's only one child — a wrapper around a single child adds nothing
- You're nesting `IressInline` inside `IressInline` or `IressStack` inside `IressStack` without changing gap/alignment — flatten instead

### Other common anti-patterns

For the full list of common anti-patterns (disabled buttons, redundant textStyle, legacy slot attributes, raw HTML, hardcoded values), read the Common Mistakes guide at `node_modules/@iress-oss/ids-components/.ai/guides/foundations-common-mistakes.md` (requires `@iress-oss/ids-components` to be installed).


---

# Skill: IDS Version Migration

## When to Use

- Migrating from IDS v5 (or v4) to IDS v6
- Migrating from OUI (`@iress/oui`) to IDS v6
- Updating imports from `@iress/components-react` to `@iress-oss/ids-components`
- Converting Formik forms to React Hook Form via `IressForm`/`IressFormField`
- Updating test files that use IDS v4 test utilities
- Reviewing migration PRs for correctness

## Decision Table: Which Migration Path?

| Current stack | Migration path                       | Complexity                        | Reference                                                 |
| ------------- | ------------------------------------ | --------------------------------- | --------------------------------------------------------- |
| OUI only      | OUI→v6 guide                         | High (form architecture change)   | prop-renames.md             |

# Prop Rename Cheat Sheet

## CRITICAL — verified against source code

These prop names have been verified against the actual IDS v6 source. Using the old prop names will silently fail.

## OUI → IDS v6 Prop Changes

| OUI Component | OUI prop             | IDS v6 prop          | Notes                                                 |
| ------------- | -------------------- | -------------------- | ----------------------------------------------------- |
| `Alert`       | `context`            | `status`             | Values: `danger`, `info`, `success`, `warning`        |
| `Alert`       | `contextLabel`       | removed              | v6 auto-generates; remove this prop                   |
| `Alert`       | `closeLabel`         | `closeLabel`         | Unchanged                                             |
| `Alert`       | `onHide`             | `onClose`            | Callback for dismissing                               |
| `Button`      | `label`              | `children`           | `<Button label="X">` → `<IressButton>X</IressButton>` |
| `Button`      | `mode`               | `mode`               | Unchanged; values slightly different                  |
| `Button`      | `labelHidden`        | `icon` prop          | Use `icon` prop for icon-only buttons                 |
| `Button`      | `iconName`           | `icon`               | Use Material Symbol name                              |
| `Button`      | `showLoading`        | `loading`            | —                                                     |
| `Modal`       | `onHide`             | `onShowChange`       | `(show: boolean) => void`                             |
| `Modal`       | `show`               | `show`               | Unchanged                                             |
| `Modal`       | `size`               | `size`               | Values: `sm`, `md`, `lg` (OUI had `xs`, `xl` too)     |
| `Modal`       | `fixedFooter`        | `fixedFooter`        | Unchanged                                             |
| `Slideout`    | `show`               | `show`               | Unchanged                                             |
| `Slideout`    | `position`           | `position`           | Unchanged                                             |
| `Slideout`    | `size`               | `size`               | Values: `sm`, `md` (OUI had `lg`, `dynamic` too)      |
| `Fieldset`    | `legend`             | `label`              | On `IressFieldGroup`                                  |
| `Fieldset`    | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `RadioGroup`  | `legend`             | removed              | Use `IressFormField` `label` prop instead             |
| `RadioGroup`  | `legendHidden`       | removed              | Use `IressFormField` `hiddenLabel` prop               |
| `RadioGroup`  | `options`            | `children`           | Use `<IressRadio>` children instead of options array  |
| `RadioGroup`  | `checked`            | `value`              | —                                                     |
| `RadioGroup`  | `readOnly`           | `readOnly`           | Now accepts `boolean \| 'locked'`                     |
| `Toggle`      | `legend`             | `children`           | —                                                     |
| `Toggle`      | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `Toggle`      | `toggled`            | `checked`            | —                                                     |
| `Toggle`      | `labelTrue`          | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Toggle`      | `labelFalse`         | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Label`       | `label`              | `children`           | `<Label label="X">` → `<IressLabel>X</IressLabel>`    |
| `Label`       | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Label`       | `optional`           | `required`           | Logic inverted                                        |
| `Label`       | `required`           | `required`           | Now takes boolean, not string                         |
| `Input`       | `inputRef`           | `ref`                | Use standard React ref                                |
| `Input`       | `type`               | `type`               | Unchanged                                             |
| `Checkbox`    | `label`              | `children`           | —                                                     |
| `Checkbox`    | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Checkbox`    | `isInline`           | removed              | Use parent layout component                           |
| `Slider`      | `label`              | removed              | Use `aria-label` or wrap in `IressFormField`          |
| `Slider`      | `hideCurrentLabel`   | `hiddenValueTooltip` | —                                                     |
| `Slider`      | `hideBoundaryLabels` | `tickLabels`         | Set to `false` to hide                                |
| `Tabs`        | `activeTabIndex`     | `selected`           | Use tab `value` prop to identify tabs                 |
| `Tabs`        | `onSelect`           | `onChange`           | —                                                     |
| `Tabs`        | `lazy`               | removed              | v6 tabs are always lazy                               |
| `ProgressBar` | `now`                | `value`              | —                                                     |
| `ProgressBar` | `color`              | removed              | Use CSS custom properties for color                   |
| `ProgressBar` | `striped`            | removed              | Not available in v6                                   |
| `ProgressBar` | `animated`           | removed              | Not available in v6                                   |

## IDS v4 React → IDS v6 React Prop Changes (Verified against v4 source)

The v4 React wrappers (`@iress/components-react`) automatically convert Stencil's kebab-case props to camelCase and map custom events to React callback props (e.g., `iressModalEntered` → `onEntered`). This section documents the v4 React API compared to v6.

### Button

| v4 React prop     | v6 React prop      | Notes                                                                                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | `mode`             | v4 values: `primary`, `secondary`, `tertiary`, `link`, `danger`, `positive`, `negative` → v6: `primary`, `secondary`, `tertiary`, `quaternary`, `muted` |
| `mode="link"`     | removed            | Use `mode="tertiary"` or `IressLink` component                                                                                                          |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                                                                                                                         |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                                                                                                                         |
| `mode="negative"` | removed            | Use `status="danger"` instead                                                                                                                           |
| `loading`         | `loading`          | Unchanged                                                                                                                                               |
| `loadingText`     | `loading` (string) | v6 accepts boolean or string for loading                                                                                                                |
| `fluid`           | `fluid`            | Unchanged                                                                                                                                               |
| `noWrap`          | `noWrap`           | Unchanged                                                                                                                                               |
| `href`            | `href`             | Unchanged                                                                                                                                               |
| `onClick`         | `onClick`          | Unchanged                                                                                                                                               |
| slot `icon-only`  | `icon` prop        | v6 uses `icon` prop for icon-only buttons                                                                                                               |
| slot `prepend`    | `prepend` prop     | v6 uses prop instead of slot                                                                                                                            |
| slot `append`     | `append` prop      | v6 uses prop instead of slot                                                                                                                            |

### Alert

| v4 React prop    | v6 React prop     | Notes                                                                                             |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `status`         | `status`          | v4: `error`, `warning`, `success`, `info` → v6: `danger`, `warning`, `success`, `info`, `neutral` |
| `status="error"` | `status="danger"` | Value renamed                                                                                     |
| `headingText`    | `heading`         | Prop renamed                                                                                      |
| `headingLevel`   | removed           | v6 auto-handles heading level                                                                     |
| slot `footer`    | `actions` prop    | v6 uses `actions` array for buttons                                                               |

### Modal

| v4 React prop          | v6 React prop          | Notes                                              |
| ---------------------- | ---------------------- | -------------------------------------------------- |
| `show`                 | `show`                 | Unchanged                                          |
| `size`                 | `size`                 | v4 allowed responsive array → v6 single value only |
| `closeText`            | `closeText`            | Unchanged                                          |
| `fixedFooter`          | `fixedFooter`          | Unchanged                                          |
| `disableBackdropClick` | `disableBackdropClick` | Unchanged                                          |
| `noCloseButton`        | `noCloseButton`        | Unchanged                                          |
| `padding`              | `p` (styling prop)     | Use styling prop instead                           |
| `onEntered`            | `onEntered`            | Unchanged                                          |
| `onExited`             | `onExited`             | Unchanged                                          |
| slot `footer`          | `footer` prop          | v6 uses prop instead of slot                       |

### Slideout

| v4 React prop | v6 React prop | Notes                                  |
| ------------- | ------------- | -------------------------------------- |
| `show`        | `show`        | Unchanged                              |
| `eleToPush`   | `eleToPush`   | Unchanged                              |
| `mode`        | `mode`        | Unchanged (`overlay`, `push`)          |
| `closeText`   | `closeText`   | Unchanged                              |
| `padding`     | removed       | Use `p` styling prop on content        |
| `position`    | `position`    | Unchanged                              |
| `size`        | `size`        | Unchanged                              |
| `backdrop`    | removed       | v6 always has backdrop in overlay mode |
| `onEntered`   | `onEntered`   | Unchanged                              |
| `onExited`    | `onExited`    | Unchanged                              |
| slot `footer` | `footer` prop | v6 uses prop instead of slot           |

### Panel

| v4 React prop    | v6 React prop         | Notes                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| `background`     | `bg`                  | v4: `default`, `alt`, `transparent` → v6: `alt`, token values |
| `padding`        | `p` (styling prop)    | Use styling prop instead                                      |
| `textAlign`      | `textAlign`           | Unchanged                                                     |
| `stretch`        | `stretch`             | Unchanged (now styling prop)                                  |
| `noBorderRadius` | `borderRadius="none"` | Use `borderRadius` prop instead                               |

### Text

| v4 React prop | v6 React prop | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `variant`     | `textStyle`   | Prop renamed                 |
| `mode`        | `color`       | Prop renamed                 |
| `align`       | `textAlign`   | Prop renamed                 |
| `element`     | `element`     | Unchanged                    |
| `noGutter`    | removed       | Use `mb="none"` styling prop |

### Stack / Inline

| v4 React prop     | v6 React prop | Notes                                                        |
| ----------------- | ------------- | ------------------------------------------------------------ |
| `gutter`          | `gap`         | v4: `none`, `xs`, `sm`, `md`, `lg`, `xl` → v6 spacing tokens |
| `horizontalAlign` | `justify`     | Prop renamed (Inline only)                                   |
| `verticalAlign`   | `align`       | Prop renamed (Inline only)                                   |
| `noWrap`          | `noWrap`      | Unchanged                                                    |

### Icon

| v4 React prop      | v6 React prop      | Notes                                        |
| ------------------ | ------------------ | -------------------------------------------- |
| `name`             | `name`             | v4: FontAwesome names → v6: Material Symbols |
| `set`              | removed            | v6 uses Material Symbols only                |
| `mode`             | `color`            | Prop renamed                                 |
| `size`             | removed            | Inherits font size from parent               |
| `fixedWidth`       | removed            | Not needed with Material Symbols             |
| `spin`             | removed            | Use CSS animation instead                    |
| `rotate`           | removed            | Use CSS transform instead                    |
| `flip`             | removed            | Use CSS transform instead                    |
| `screenreaderText` | `screenreaderText` | Unchanged                                    |

### Label

| v4 React prop  | v6 React prop         | Notes                             |
| -------------- | --------------------- | --------------------------------- |
| `labelText`    | `children`            | v4 uses prop → v6 uses children   |
| `for`          | `htmlFor`             | Prop renamed                      |
| `hiddenLabel`  | `hiddenLabel`         | Unchanged                         |
| `optional`     | `required` (inverted) | Logic inverted                    |
| `optionalText` | removed               | v6 doesn't show "(optional)" text |
| `focusOn`      | removed               | Not needed in v6                  |

### Field

| v4 React prop        | v6 React prop     | Notes                                        |
| -------------------- | ----------------- | -------------------------------------------- |
| `label`              | `label`           | Unchanged                                    |
| `hiddenLabel`        | `hiddenLabel`     | Unchanged                                    |
| `hint`               | `hint`            | Unchanged                                    |
| `error`              | `errorMessages`   | Now takes array of `ValidationMessageObj`    |
| `disabledValidation` | removed           | Validation handled by `IressFormField` rules |
| `inline`             | `horizontal`      | Prop renamed                                 |
| `optionalText`       | removed           | —                                            |
| `valueMissing`       | `rules.required`  | Use `rules` prop on `IressFormField`         |
| `tooLong`            | `rules.maxLength` | Use `rules` prop on `IressFormField`         |
| `tooShort`           | `rules.minLength` | Use `rules` prop on `IressFormField`         |
| `patternMismatch`    | `rules.pattern`   | Use `rules` prop on `IressFormField`         |
| `rangeOverflow`      | `rules.max`       | Use `rules` prop on `IressFormField`         |
| `rangeUnderflow`     | `rules.min`       | Use `rules` prop on `IressFormField`         |

### Toggle

| v4 React prop | v6 React prop | Notes                                    |
| ------------- | ------------- | ---------------------------------------- |
| `checked`     | `checked`     | Unchanged                                |
| `label`       | `children`    | v4 uses prop → v6 uses children          |
| `hiddenLabel` | `hiddenLabel` | Unchanged                                |
| `layout`      | `layout`      | Unchanged                                |
| `onChange`    | `onChange`    | Unchanged (signature slightly different) |

### Badge → Pill

| v4 React prop     | v6 React prop | Notes                         |
| ----------------- | ------------- | ----------------------------- |
| Component renamed | `IressPill`   | `IressBadge` → `IressPill`    |
| `mode`            | `status`      | Prop renamed                  |
| `pill`            | removed       | v6 Pill is always pill-shaped |
| slot `host`       | removed       | Use composition instead       |

### SkipLink

| v4 React prop | v6 React prop  | Notes                                               |
| ------------- | -------------- | --------------------------------------------------- |
| `targetId`    | `href`         | Now takes full href with `#` (e.g., `href="#main"`) |
| `text`        | `children`     | v4 uses prop → v6 uses children                     |
| `customRoute` | `element` prop | Use `element` to customize rendered element         |

### Expander

| v4 React prop    | v6 React prop    | Notes                                                 |
| ---------------- | ---------------- | ----------------------------------------------------- |
| `open`           | `open`           | Unchanged                                             |
| `mode`           | `mode`           | v4: `section`, `heading`, `link` → v6: `section` only |
| `mode="heading"` | `mode="section"` | Value renamed                                         |
| slot `activator` | `activator` prop | v4 uses slot → v6 uses prop                           |
| `onChange`       | `onChange`       | Unchanged                                             |

### Tabs (TabContainer → TabSet)

| v4 React prop     | v6 React prop | Notes                                     |
| ----------------- | ------------- | ----------------------------------------- |
| Component renamed | `IressTabSet` | `IressTabContainer` → `IressTabSet`       |
| `onChange`        | `onChange`    | Unchanged                                 |
| `IressTabButton`  | `IressTab`    | Component renamed                         |
| `IressTabPanel`   | removed       | Content now passed as `IressTab` children |

## Key Architecture Changes (v4 React → v6 React)

### Package Changes

| v4 Package                    | v6 Package                                 | Notes                   |
| ----------------------------- | ------------------------------------------ | ----------------------- |
| `@iress/components-react`     | `@iress-oss/ids-components`                | Main component package  |
| `@iress/ids-react-test-utils` | `@testing-library/react`                   | Use standard RTL        |
| `@iress/components` (CSS)     | `@iress-oss/ids-components/dist/style.css` | CSS import path changed |
| `@iress/ids-themes`           | `@iress-oss/ids-tokens`                    | Design tokens package   |

### Slot → Prop Migration

v4 used `slot` attributes on children to position content inside components. This is a legacy v4 pattern that is **no longer supported** — v6 uses React props directly (`prepend`, `append`, `footer`, `icon`, `activator`, etc.).

> **⚠️ Do not copy `slot` attributes from existing code.** If you see `slot="..."` in a codebase, it is legacy v4 code that needs to be migrated. AI agents frequently propagate this pattern by matching existing code — always use the prop-based API instead.

> **⚠️ `IressShadow` does NOT mean the app uses Web Components.** AI agents commonly see `IressShadow` (which uses Shadow DOM for CSS isolation) and incorrectly conclude the application uses custom elements with `slot` attributes. This is wrong — `IressShadow` wraps an entire React app in a single shadow root on a `<div>` element for style encapsulation. All components inside `IressShadow` are standard React components. IDS has not offered Web Components since v4.

```tsx
// ❌ v4: Using slot attributes (no longer supported)
<IressButton>
  <IressIcon slot="prepend" name="search" />
  Search
</IressButton>

// ✅ v6: Using props
<IressButton prepend={<IressIcon name="search" />}>
  Search
</IressButton>
```

```tsx
// ❌ v4: Modal footer slot (no longer supported)
<IressModal show={show}>
  Content
  <div slot="footer">
    <IressButton>Close</IressButton>
  </div>
</IressModal>

// ✅ v6: Modal footer prop
<IressModal
  show={show}
  footer={<IressButton>Close</IressButton>}
>
  Content
</IressModal>
```

### Event Callback Changes

v4 React wrappers mapped Stencil custom events to React callback props. Most remain the same in v6, but some have changed:

| v4 Callback     | v6 Callback     | Notes                            |
| --------------- | --------------- | -------------------------------- |
| `onClick`       | `onClick`       | Unchanged                        |
| `onChange`      | `onChange`      | Unchanged (signature may differ) |
| `onBlur`        | `onBlur`        | Unchanged                        |
| `onFocus`       | `onFocus`       | Unchanged                        |
| `onEntered`     | `onEntered`     | Unchanged                        |
| `onExited`      | `onExited`      | Unchanged                        |
| `onActivated`   | `onActivated`   | Unchanged                        |
| `onDeactivated` | `onDeactivated` | Unchanged                        |
| `onClear`       | `onClear`       | Unchanged                        |

### Test Utility Migration

v4 provided `@iress/ids-react-test-utils` with `idsFireEvent` for testing custom events. v6 uses standard React Testing Library.

```tsx
// ❌ v4: Using idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });
idsFireEvent.entered(modal);
idsFireEvent.blur(field, { target: { value: 'test' } });

// ✅ v6: Using standard RTL
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

await userEvent.type(input, 'test');
fireEvent.transitionEnd(modal); // or wait for onEntered callback
await userEvent.tab(); // for blur
```

### Helper Function Migration

v4 provided helper functions in `@iress/components-react`. These are no longer needed in v6.

| v4 Helper                   | v6 Replacement                               |
| --------------------------- | -------------------------------------------- |
| `mapCheckboxGroupOptions()` | Use `<IressCheckbox>` children directly      |
| `mapRadioGroupOptions()`    | Use `<IressRadio>` children directly         |
| `mapSelectOptions()`        | Use `options` prop on `IressSelect`          |
| `mapTabs()`                 | Use `<IressTab>` children directly           |
| `mapMenuItems()`            | Use `<IressMenuItem>` children directly      |
| `showModal(id)`             | Use `show` prop or `useModal` hook           |
| `showSlideout(id)`          | Use `show` prop or `useSlideout` hook        |
| `rowData(arr, ref)`         | Pass `rowData` prop directly to `IressTable` |
| IDS v4 only   | v4→v6 guide                          | Medium (form architecture change) | prop-renames.md             |

# Prop Rename Cheat Sheet

## CRITICAL — verified against source code

These prop names have been verified against the actual IDS v6 source. Using the old prop names will silently fail.

## OUI → IDS v6 Prop Changes

| OUI Component | OUI prop             | IDS v6 prop          | Notes                                                 |
| ------------- | -------------------- | -------------------- | ----------------------------------------------------- |
| `Alert`       | `context`            | `status`             | Values: `danger`, `info`, `success`, `warning`        |
| `Alert`       | `contextLabel`       | removed              | v6 auto-generates; remove this prop                   |
| `Alert`       | `closeLabel`         | `closeLabel`         | Unchanged                                             |
| `Alert`       | `onHide`             | `onClose`            | Callback for dismissing                               |
| `Button`      | `label`              | `children`           | `<Button label="X">` → `<IressButton>X</IressButton>` |
| `Button`      | `mode`               | `mode`               | Unchanged; values slightly different                  |
| `Button`      | `labelHidden`        | `icon` prop          | Use `icon` prop for icon-only buttons                 |
| `Button`      | `iconName`           | `icon`               | Use Material Symbol name                              |
| `Button`      | `showLoading`        | `loading`            | —                                                     |
| `Modal`       | `onHide`             | `onShowChange`       | `(show: boolean) => void`                             |
| `Modal`       | `show`               | `show`               | Unchanged                                             |
| `Modal`       | `size`               | `size`               | Values: `sm`, `md`, `lg` (OUI had `xs`, `xl` too)     |
| `Modal`       | `fixedFooter`        | `fixedFooter`        | Unchanged                                             |
| `Slideout`    | `show`               | `show`               | Unchanged                                             |
| `Slideout`    | `position`           | `position`           | Unchanged                                             |
| `Slideout`    | `size`               | `size`               | Values: `sm`, `md` (OUI had `lg`, `dynamic` too)      |
| `Fieldset`    | `legend`             | `label`              | On `IressFieldGroup`                                  |
| `Fieldset`    | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `RadioGroup`  | `legend`             | removed              | Use `IressFormField` `label` prop instead             |
| `RadioGroup`  | `legendHidden`       | removed              | Use `IressFormField` `hiddenLabel` prop               |
| `RadioGroup`  | `options`            | `children`           | Use `<IressRadio>` children instead of options array  |
| `RadioGroup`  | `checked`            | `value`              | —                                                     |
| `RadioGroup`  | `readOnly`           | `readOnly`           | Now accepts `boolean \| 'locked'`                     |
| `Toggle`      | `legend`             | `children`           | —                                                     |
| `Toggle`      | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `Toggle`      | `toggled`            | `checked`            | —                                                     |
| `Toggle`      | `labelTrue`          | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Toggle`      | `labelFalse`         | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Label`       | `label`              | `children`           | `<Label label="X">` → `<IressLabel>X</IressLabel>`    |
| `Label`       | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Label`       | `optional`           | `required`           | Logic inverted                                        |
| `Label`       | `required`           | `required`           | Now takes boolean, not string                         |
| `Input`       | `inputRef`           | `ref`                | Use standard React ref                                |
| `Input`       | `type`               | `type`               | Unchanged                                             |
| `Checkbox`    | `label`              | `children`           | —                                                     |
| `Checkbox`    | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Checkbox`    | `isInline`           | removed              | Use parent layout component                           |
| `Slider`      | `label`              | removed              | Use `aria-label` or wrap in `IressFormField`          |
| `Slider`      | `hideCurrentLabel`   | `hiddenValueTooltip` | —                                                     |
| `Slider`      | `hideBoundaryLabels` | `tickLabels`         | Set to `false` to hide                                |
| `Tabs`        | `activeTabIndex`     | `selected`           | Use tab `value` prop to identify tabs                 |
| `Tabs`        | `onSelect`           | `onChange`           | —                                                     |
| `Tabs`        | `lazy`               | removed              | v6 tabs are always lazy                               |
| `ProgressBar` | `now`                | `value`              | —                                                     |
| `ProgressBar` | `color`              | removed              | Use CSS custom properties for color                   |
| `ProgressBar` | `striped`            | removed              | Not available in v6                                   |
| `ProgressBar` | `animated`           | removed              | Not available in v6                                   |

## IDS v4 React → IDS v6 React Prop Changes (Verified against v4 source)

The v4 React wrappers (`@iress/components-react`) automatically convert Stencil's kebab-case props to camelCase and map custom events to React callback props (e.g., `iressModalEntered` → `onEntered`). This section documents the v4 React API compared to v6.

### Button

| v4 React prop     | v6 React prop      | Notes                                                                                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | `mode`             | v4 values: `primary`, `secondary`, `tertiary`, `link`, `danger`, `positive`, `negative` → v6: `primary`, `secondary`, `tertiary`, `quaternary`, `muted` |
| `mode="link"`     | removed            | Use `mode="tertiary"` or `IressLink` component                                                                                                          |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                                                                                                                         |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                                                                                                                         |
| `mode="negative"` | removed            | Use `status="danger"` instead                                                                                                                           |
| `loading`         | `loading`          | Unchanged                                                                                                                                               |
| `loadingText`     | `loading` (string) | v6 accepts boolean or string for loading                                                                                                                |
| `fluid`           | `fluid`            | Unchanged                                                                                                                                               |
| `noWrap`          | `noWrap`           | Unchanged                                                                                                                                               |
| `href`            | `href`             | Unchanged                                                                                                                                               |
| `onClick`         | `onClick`          | Unchanged                                                                                                                                               |
| slot `icon-only`  | `icon` prop        | v6 uses `icon` prop for icon-only buttons                                                                                                               |
| slot `prepend`    | `prepend` prop     | v6 uses prop instead of slot                                                                                                                            |
| slot `append`     | `append` prop      | v6 uses prop instead of slot                                                                                                                            |

### Alert

| v4 React prop    | v6 React prop     | Notes                                                                                             |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `status`         | `status`          | v4: `error`, `warning`, `success`, `info` → v6: `danger`, `warning`, `success`, `info`, `neutral` |
| `status="error"` | `status="danger"` | Value renamed                                                                                     |
| `headingText`    | `heading`         | Prop renamed                                                                                      |
| `headingLevel`   | removed           | v6 auto-handles heading level                                                                     |
| slot `footer`    | `actions` prop    | v6 uses `actions` array for buttons                                                               |

### Modal

| v4 React prop          | v6 React prop          | Notes                                              |
| ---------------------- | ---------------------- | -------------------------------------------------- |
| `show`                 | `show`                 | Unchanged                                          |
| `size`                 | `size`                 | v4 allowed responsive array → v6 single value only |
| `closeText`            | `closeText`            | Unchanged                                          |
| `fixedFooter`          | `fixedFooter`          | Unchanged                                          |
| `disableBackdropClick` | `disableBackdropClick` | Unchanged                                          |
| `noCloseButton`        | `noCloseButton`        | Unchanged                                          |
| `padding`              | `p` (styling prop)     | Use styling prop instead                           |
| `onEntered`            | `onEntered`            | Unchanged                                          |
| `onExited`             | `onExited`             | Unchanged                                          |
| slot `footer`          | `footer` prop          | v6 uses prop instead of slot                       |

### Slideout

| v4 React prop | v6 React prop | Notes                                  |
| ------------- | ------------- | -------------------------------------- |
| `show`        | `show`        | Unchanged                              |
| `eleToPush`   | `eleToPush`   | Unchanged                              |
| `mode`        | `mode`        | Unchanged (`overlay`, `push`)          |
| `closeText`   | `closeText`   | Unchanged                              |
| `padding`     | removed       | Use `p` styling prop on content        |
| `position`    | `position`    | Unchanged                              |
| `size`        | `size`        | Unchanged                              |
| `backdrop`    | removed       | v6 always has backdrop in overlay mode |
| `onEntered`   | `onEntered`   | Unchanged                              |
| `onExited`    | `onExited`    | Unchanged                              |
| slot `footer` | `footer` prop | v6 uses prop instead of slot           |

### Panel

| v4 React prop    | v6 React prop         | Notes                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| `background`     | `bg`                  | v4: `default`, `alt`, `transparent` → v6: `alt`, token values |
| `padding`        | `p` (styling prop)    | Use styling prop instead                                      |
| `textAlign`      | `textAlign`           | Unchanged                                                     |
| `stretch`        | `stretch`             | Unchanged (now styling prop)                                  |
| `noBorderRadius` | `borderRadius="none"` | Use `borderRadius` prop instead                               |

### Text

| v4 React prop | v6 React prop | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `variant`     | `textStyle`   | Prop renamed                 |
| `mode`        | `color`       | Prop renamed                 |
| `align`       | `textAlign`   | Prop renamed                 |
| `element`     | `element`     | Unchanged                    |
| `noGutter`    | removed       | Use `mb="none"` styling prop |

### Stack / Inline

| v4 React prop     | v6 React prop | Notes                                                        |
| ----------------- | ------------- | ------------------------------------------------------------ |
| `gutter`          | `gap`         | v4: `none`, `xs`, `sm`, `md`, `lg`, `xl` → v6 spacing tokens |
| `horizontalAlign` | `justify`     | Prop renamed (Inline only)                                   |
| `verticalAlign`   | `align`       | Prop renamed (Inline only)                                   |
| `noWrap`          | `noWrap`      | Unchanged                                                    |

### Icon

| v4 React prop      | v6 React prop      | Notes                                        |
| ------------------ | ------------------ | -------------------------------------------- |
| `name`             | `name`             | v4: FontAwesome names → v6: Material Symbols |
| `set`              | removed            | v6 uses Material Symbols only                |
| `mode`             | `color`            | Prop renamed                                 |
| `size`             | removed            | Inherits font size from parent               |
| `fixedWidth`       | removed            | Not needed with Material Symbols             |
| `spin`             | removed            | Use CSS animation instead                    |
| `rotate`           | removed            | Use CSS transform instead                    |
| `flip`             | removed            | Use CSS transform instead                    |
| `screenreaderText` | `screenreaderText` | Unchanged                                    |

### Label

| v4 React prop  | v6 React prop         | Notes                             |
| -------------- | --------------------- | --------------------------------- |
| `labelText`    | `children`            | v4 uses prop → v6 uses children   |
| `for`          | `htmlFor`             | Prop renamed                      |
| `hiddenLabel`  | `hiddenLabel`         | Unchanged                         |
| `optional`     | `required` (inverted) | Logic inverted                    |
| `optionalText` | removed               | v6 doesn't show "(optional)" text |
| `focusOn`      | removed               | Not needed in v6                  |

### Field

| v4 React prop        | v6 React prop     | Notes                                        |
| -------------------- | ----------------- | -------------------------------------------- |
| `label`              | `label`           | Unchanged                                    |
| `hiddenLabel`        | `hiddenLabel`     | Unchanged                                    |
| `hint`               | `hint`            | Unchanged                                    |
| `error`              | `errorMessages`   | Now takes array of `ValidationMessageObj`    |
| `disabledValidation` | removed           | Validation handled by `IressFormField` rules |
| `inline`             | `horizontal`      | Prop renamed                                 |
| `optionalText`       | removed           | —                                            |
| `valueMissing`       | `rules.required`  | Use `rules` prop on `IressFormField`         |
| `tooLong`            | `rules.maxLength` | Use `rules` prop on `IressFormField`         |
| `tooShort`           | `rules.minLength` | Use `rules` prop on `IressFormField`         |
| `patternMismatch`    | `rules.pattern`   | Use `rules` prop on `IressFormField`         |
| `rangeOverflow`      | `rules.max`       | Use `rules` prop on `IressFormField`         |
| `rangeUnderflow`     | `rules.min`       | Use `rules` prop on `IressFormField`         |

### Toggle

| v4 React prop | v6 React prop | Notes                                    |
| ------------- | ------------- | ---------------------------------------- |
| `checked`     | `checked`     | Unchanged                                |
| `label`       | `children`    | v4 uses prop → v6 uses children          |
| `hiddenLabel` | `hiddenLabel` | Unchanged                                |
| `layout`      | `layout`      | Unchanged                                |
| `onChange`    | `onChange`    | Unchanged (signature slightly different) |

### Badge → Pill

| v4 React prop     | v6 React prop | Notes                         |
| ----------------- | ------------- | ----------------------------- |
| Component renamed | `IressPill`   | `IressBadge` → `IressPill`    |
| `mode`            | `status`      | Prop renamed                  |
| `pill`            | removed       | v6 Pill is always pill-shaped |
| slot `host`       | removed       | Use composition instead       |

### SkipLink

| v4 React prop | v6 React prop  | Notes                                               |
| ------------- | -------------- | --------------------------------------------------- |
| `targetId`    | `href`         | Now takes full href with `#` (e.g., `href="#main"`) |
| `text`        | `children`     | v4 uses prop → v6 uses children                     |
| `customRoute` | `element` prop | Use `element` to customize rendered element         |

### Expander

| v4 React prop    | v6 React prop    | Notes                                                 |
| ---------------- | ---------------- | ----------------------------------------------------- |
| `open`           | `open`           | Unchanged                                             |
| `mode`           | `mode`           | v4: `section`, `heading`, `link` → v6: `section` only |
| `mode="heading"` | `mode="section"` | Value renamed                                         |
| slot `activator` | `activator` prop | v4 uses slot → v6 uses prop                           |
| `onChange`       | `onChange`       | Unchanged                                             |

### Tabs (TabContainer → TabSet)

| v4 React prop     | v6 React prop | Notes                                     |
| ----------------- | ------------- | ----------------------------------------- |
| Component renamed | `IressTabSet` | `IressTabContainer` → `IressTabSet`       |
| `onChange`        | `onChange`    | Unchanged                                 |
| `IressTabButton`  | `IressTab`    | Component renamed                         |
| `IressTabPanel`   | removed       | Content now passed as `IressTab` children |

## Key Architecture Changes (v4 React → v6 React)

### Package Changes

| v4 Package                    | v6 Package                                 | Notes                   |
| ----------------------------- | ------------------------------------------ | ----------------------- |
| `@iress/components-react`     | `@iress-oss/ids-components`                | Main component package  |
| `@iress/ids-react-test-utils` | `@testing-library/react`                   | Use standard RTL        |
| `@iress/components` (CSS)     | `@iress-oss/ids-components/dist/style.css` | CSS import path changed |
| `@iress/ids-themes`           | `@iress-oss/ids-tokens`                    | Design tokens package   |

### Slot → Prop Migration

v4 used `slot` attributes on children to position content inside components. This is a legacy v4 pattern that is **no longer supported** — v6 uses React props directly (`prepend`, `append`, `footer`, `icon`, `activator`, etc.).

> **⚠️ Do not copy `slot` attributes from existing code.** If you see `slot="..."` in a codebase, it is legacy v4 code that needs to be migrated. AI agents frequently propagate this pattern by matching existing code — always use the prop-based API instead.

> **⚠️ `IressShadow` does NOT mean the app uses Web Components.** AI agents commonly see `IressShadow` (which uses Shadow DOM for CSS isolation) and incorrectly conclude the application uses custom elements with `slot` attributes. This is wrong — `IressShadow` wraps an entire React app in a single shadow root on a `<div>` element for style encapsulation. All components inside `IressShadow` are standard React components. IDS has not offered Web Components since v4.

```tsx
// ❌ v4: Using slot attributes (no longer supported)
<IressButton>
  <IressIcon slot="prepend" name="search" />
  Search
</IressButton>

// ✅ v6: Using props
<IressButton prepend={<IressIcon name="search" />}>
  Search
</IressButton>
```

```tsx
// ❌ v4: Modal footer slot (no longer supported)
<IressModal show={show}>
  Content
  <div slot="footer">
    <IressButton>Close</IressButton>
  </div>
</IressModal>

// ✅ v6: Modal footer prop
<IressModal
  show={show}
  footer={<IressButton>Close</IressButton>}
>
  Content
</IressModal>
```

### Event Callback Changes

v4 React wrappers mapped Stencil custom events to React callback props. Most remain the same in v6, but some have changed:

| v4 Callback     | v6 Callback     | Notes                            |
| --------------- | --------------- | -------------------------------- |
| `onClick`       | `onClick`       | Unchanged                        |
| `onChange`      | `onChange`      | Unchanged (signature may differ) |
| `onBlur`        | `onBlur`        | Unchanged                        |
| `onFocus`       | `onFocus`       | Unchanged                        |
| `onEntered`     | `onEntered`     | Unchanged                        |
| `onExited`      | `onExited`      | Unchanged                        |
| `onActivated`   | `onActivated`   | Unchanged                        |
| `onDeactivated` | `onDeactivated` | Unchanged                        |
| `onClear`       | `onClear`       | Unchanged                        |

### Test Utility Migration

v4 provided `@iress/ids-react-test-utils` with `idsFireEvent` for testing custom events. v6 uses standard React Testing Library.

```tsx
// ❌ v4: Using idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });
idsFireEvent.entered(modal);
idsFireEvent.blur(field, { target: { value: 'test' } });

// ✅ v6: Using standard RTL
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

await userEvent.type(input, 'test');
fireEvent.transitionEnd(modal); // or wait for onEntered callback
await userEvent.tab(); // for blur
```

### Helper Function Migration

v4 provided helper functions in `@iress/components-react`. These are no longer needed in v6.

| v4 Helper                   | v6 Replacement                               |
| --------------------------- | -------------------------------------------- |
| `mapCheckboxGroupOptions()` | Use `<IressCheckbox>` children directly      |
| `mapRadioGroupOptions()`    | Use `<IressRadio>` children directly         |
| `mapSelectOptions()`        | Use `options` prop on `IressSelect`          |
| `mapTabs()`                 | Use `<IressTab>` children directly           |
| `mapMenuItems()`            | Use `<IressMenuItem>` children directly      |
| `showModal(id)`             | Use `show` prop or `useModal` hook           |
| `showSlideout(id)`          | Use `show` prop or `useSlideout` hook        |
| `rowData(arr, ref)`         | Pass `rowData` prop directly to `IressTable` |
| IDS v5 only   | v5→v6 guide                          | Low–Medium                        | v5-to-v6-migration.md |

# IDS v5 → v6 Migration Reference

This document covers changes specific to migrating from IDS v5 (`@iress-oss/ids-components@5.x`) to v6.

## Package Changes

| v5 Package                  | v6 Package                      |
| --------------------------- | ------------------------------- |
| `@iress-oss/ids-components` | `@iress-oss/ids-components`     |
| CSS: `dist/style.css`       | CSS: `styled-system/styles.css` |

## Component Renames

| v5 Component         | v6 Component                         | Notes                                                                 |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `IressBadge`         | `IressPill`                          | Renamed                                                               |
| `IressFilter`        | `IressDropdownMenu`                  | Now a pattern component                                               |
| `IressRichSelect`    | `IressSelect`                        | Consolidated; v5 `IressSelect` replaced by `native` prop on v6 Select |
| `IressCombobox`      | `IressSelect` or `IressAutocomplete` | Was deprecated in v5                                                  |
| `IressMultiCombobox` | `IressSelect` with `multiSelect`     | Was deprecated in v5                                                  |
| `IressNavbar`        | Removed                              | Build custom navigation per-application                               |

## New Components in v6

| Component                    | Purpose                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `IressBreadcrumbs`           | Navigation hierarchy                                                                               |
| `IressContextualMenu`        | Context / "more actions" menu                                                                      |
| `IressDropdownMenu`          | Filter/navigation dropdown                                                                         |
| `IressLink`                  | Anchor links in text                                                                               |
| `IressPill`                  | Status indicators, counters                                                                        |
| `IressImage`                 | Responsive images                                                                                  |
| `IressMenuGroup`             | Menu item grouping                                                                                 |
| `IressShadow`                | CSS isolation wrapper for micro-frontends (NOT a custom element — all children are standard React) |
| `IressSideNav`               | Side navigation                                                                                    |
| `IressFormField`             | Form-integrated field with validation                                                              |
| `IressFormValidationSummary` | Form validation summary                                                                            |

## Prop Changes by Component

### Button

| v5 prop           | v6 prop            | Notes                                               |
| ----------------- | ------------------ | --------------------------------------------------- |
| `mode="link"`     | `mode="tertiary"`  | Or use `IressLink` for links in text                |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                     |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                     |
| `mode="negative"` | `status="danger"`  | Use `status` prop                                   |
| `attrs`           | removed            | Use native HTML attributes directly                 |
| —                 | `icon`             | New: Material Symbol name for icon-only buttons     |
| —                 | `compact`          | New: reduces padding for compact buttons            |
| —                 | `status`           | New: `success` or `danger`                          |
| —                 | `active`           | New: indicates button has activated a modal/popover |

### Alert

| v5 prop        | v6 prop         | Notes                                               |
| -------------- | --------------- | --------------------------------------------------- |
| `status`       | `status`        | Added `neutral` option in v6                        |
| `headingText`  | `heading`       | `headingText` was deprecated in v5                  |
| `headingLevel` | removed         | Was deprecated in v5; v6 auto-handles               |
| `footer`       | `footer`        | Unchanged                                           |
| —              | `actions`       | New: array of button props with opinionated styling |
| —              | `closed`        | New: controlled dismissal                           |
| —              | `defaultClosed` | New: uncontrolled dismissal                         |
| —              | `onClose`       | New: callback when dismissed                        |
| —              | `icon`          | New: custom icon or `false` to hide                 |
| —              | `multiLine`     | New: layout for longer content                      |
| —              | `variant`       | New: `sidebar` or `full-width`                      |

### Toggle

| v5 prop       | v6 prop          | Notes                       |
| ------------- | ---------------- | --------------------------- |
| `checked`     | `checked`        | Unchanged (controlled mode) |
| —             | `defaultChecked` | New: for uncontrolled mode  |
| `children`    | `children`       | Unchanged                   |
| `hiddenLabel` | `hiddenLabel`    | Unchanged                   |
| `layout`      | `layout`         | Unchanged                   |
| `onChange`    | `onChange`       | Unchanged                   |
| —             | `disabled`       | New: disables the toggle    |

### Field (IressField)

| v5 prop         | v6 prop             | Notes                                  |
| --------------- | ------------------- | -------------------------------------- |
| `label`         | `label`             | Unchanged                              |
| `hiddenLabel`   | `hiddenLabel`       | Unchanged                              |
| `hint`          | `hint`              | Unchanged                              |
| `error`         | `error`             | Unchanged                              |
| `errorMessages` | `errorMessages`     | Unchanged                              |
| `optional`      | removed             | Use `required={false}` instead         |
| `required`      | `required`          | Unchanged                              |
| `readOnly`      | `readOnly`          | Now accepts `boolean \| 'locked'`. Use `'locked'` when the field is read-only due to permissions |
| `htmlFor`       | `htmlFor`           | Unchanged                              |
| —               | `horizontal`        | New: inline label/input layout         |
| —               | `labelWidth`        | New: label width in horizontal mode    |
| —               | `removeErrorMargin` | New: removes reserved error space      |
| —               | `supplementary`     | New: content below field when no error |

### Modal

| v5 prop        | v6 prop            | Notes                    |
| -------------- | ------------------ | ------------------------ |
| `show`         | `show`             | Unchanged                |
| `defaultShow`  | `defaultShow`      | Unchanged                |
| `size`         | `size`             | Unchanged                |
| `heading`      | `heading`          | Unchanged                |
| `footer`       | `footer`           | Unchanged                |
| `padding`      | `p` (styling prop) | Use styling prop instead |
| `onShowChange` | `onShowChange`     | Unchanged                |
| `onEntered`    | `onEntered`        | Unchanged                |
| `onExited`     | `onExited`         | Unchanged                |

### Badge → Pill

| v5 prop   | v6 prop     | Notes                                                   |
| --------- | ----------- | ------------------------------------------------------- |
| Component | `IressPill` | `IressBadge` renamed to `IressPill`                     |
| `mode`    | `mode`      | Values changed: now uses data palette (10-90) or status |
| `pill`    | removed     | v6 Pill is always pill-shaped                           |
| `host`    | removed     | Use composition instead                                 |

### Select (was RichSelect)

| v5 prop       | v6 prop            | Notes                                                                                  |
| ------------- | ------------------ | -------------------------------------------------------------------------------------- |
| Component     | `IressSelect`      | `IressRichSelect` renamed to `IressSelect`                                             |
| `options`     | `options`          | Unchanged                                                                              |
| `value`       | `value`            | Now also accepts a plain string or `FormControlValue` (resolves to matching option)    |
| `multiSelect` | `multiSelect`      | Unchanged                                                                              |
| —             | `defaultValue`     | Accepts `LabelValueMeta` or plain string for uncontrolled pre-selection                |
| —             | `multiSelectLimit` | New: limits visible selected tags before collapsing to "+N more" (default `5`)         |
| —             | `native`           | New: renders native `<select>` element                                                 |

### Filter → DropdownMenu

| v5 prop       | v6 prop             | Notes                 |
| ------------- | ------------------- | --------------------- |
| Component     | `IressDropdownMenu` | `IressFilter` renamed |
| `options`     | `options`           | Unchanged             |
| `value`       | `selected`          | Prop renamed          |
| `multiSelect` | `multiSelect`       | Unchanged             |
| `searchable`  | `searchable`        | Unchanged             |

### Popover

| v5 prop        | v6 prop        | Notes                                                                                                |
| -------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `contentStyle` | `contentStyle` | Unchanged                                                                                            |
| —              | —              | ⚠️ **Breaking:** Popover content now has default `padding: spacing.4`. Override with `contentStyle={{ padding: 'spacing.0' }}` if you were providing your own inner padding |

### Readonly

| v5 prop | v6 prop   | Notes                                                                                                |
| ------- | --------- | ---------------------------------------------------------------------------------------------------- |
| —       | `actions` | New: array of button props rendered alongside the readonly value (e.g. edit/save toggles)            |
| —       | `variant` | New: set to `'locked'` for disabled-like styling when the value is read-only due to permissions      |
| —       | —         | ⚠️ **Breaking:** DOM structure changed — inner content is now wrapped in an additional `wrapper` div inside `root`. CSS selectors targeting direct children of the root may need updating |

## Styling Changes

### CSS Import

```tsx
// v5
import '@iress-oss/ids-components/dist/style.css';

// v6
import '@iress-oss/ids-components/styled-system/styles.css';
```

### Styling Props

v6 uses Panda CSS and exposes styling props on all components:

```tsx
// v6 styling props
<IressPanel p="lg" m="xl" bg="alt" />

// Responsive
<IressPanel p={{ base: 'sm', xl: 'lg' }} />
```

### Design Tokens

```tsx
// v6 - type-safe cssVars
import { cssVars } from '@iress-oss/ids-tokens';

<div style={{ color: cssVars.colour.primary.text }} />;
```

## Form Migration

v5 used standalone form components. v6 introduces `IressForm` + `IressFormField` with React Hook Form integration.

```tsx
// v5
<IressField label="Email" error={errors.email}>
  <IressInput name="email" value={value} onChange={handleChange} />
</IressField>

// v6
<IressForm defaultValues={{ email: '' }} onSubmit={handleSubmit}>
  <IressFormField
    name="email"
    label="Email"
    render={(field) => <IressInput {...field} />}
    rules={{ required: 'Required' }}
  />
</IressForm>
```

Note: `IressField` still exists in v6 for standalone layout without form binding.

## Icon Changes

v5 used FontAwesome icons. v6 uses Material Symbols.

```tsx
// v5
<IressIcon name="check" set="fas" />

// v6
<IressIcon name="check_circle" />
```

| v5 prop      | v6 prop | Notes                                |
| ------------ | ------- | ------------------------------------ |
| `name`       | `name`  | FontAwesome → Material Symbols names |
| `set`        | removed | v6 uses Material Symbols only        |
| `mode`       | `color` | Prop renamed                         |
| `size`       | removed | Inherits font size from parent       |
| `fixedWidth` | removed | Not needed with Material Symbols     |
| `spin`       | removed | Use CSS animation                    |
| OUI + IDS v4  | Both OUI→v6 and v4→v6 guides         | High (form architecture change)   | prop-renames.md             |

# Prop Rename Cheat Sheet

## CRITICAL — verified against source code

These prop names have been verified against the actual IDS v6 source. Using the old prop names will silently fail.

## OUI → IDS v6 Prop Changes

| OUI Component | OUI prop             | IDS v6 prop          | Notes                                                 |
| ------------- | -------------------- | -------------------- | ----------------------------------------------------- |
| `Alert`       | `context`            | `status`             | Values: `danger`, `info`, `success`, `warning`        |
| `Alert`       | `contextLabel`       | removed              | v6 auto-generates; remove this prop                   |
| `Alert`       | `closeLabel`         | `closeLabel`         | Unchanged                                             |
| `Alert`       | `onHide`             | `onClose`            | Callback for dismissing                               |
| `Button`      | `label`              | `children`           | `<Button label="X">` → `<IressButton>X</IressButton>` |
| `Button`      | `mode`               | `mode`               | Unchanged; values slightly different                  |
| `Button`      | `labelHidden`        | `icon` prop          | Use `icon` prop for icon-only buttons                 |
| `Button`      | `iconName`           | `icon`               | Use Material Symbol name                              |
| `Button`      | `showLoading`        | `loading`            | —                                                     |
| `Modal`       | `onHide`             | `onShowChange`       | `(show: boolean) => void`                             |
| `Modal`       | `show`               | `show`               | Unchanged                                             |
| `Modal`       | `size`               | `size`               | Values: `sm`, `md`, `lg` (OUI had `xs`, `xl` too)     |
| `Modal`       | `fixedFooter`        | `fixedFooter`        | Unchanged                                             |
| `Slideout`    | `show`               | `show`               | Unchanged                                             |
| `Slideout`    | `position`           | `position`           | Unchanged                                             |
| `Slideout`    | `size`               | `size`               | Values: `sm`, `md` (OUI had `lg`, `dynamic` too)      |
| `Fieldset`    | `legend`             | `label`              | On `IressFieldGroup`                                  |
| `Fieldset`    | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `RadioGroup`  | `legend`             | removed              | Use `IressFormField` `label` prop instead             |
| `RadioGroup`  | `legendHidden`       | removed              | Use `IressFormField` `hiddenLabel` prop               |
| `RadioGroup`  | `options`            | `children`           | Use `<IressRadio>` children instead of options array  |
| `RadioGroup`  | `checked`            | `value`              | —                                                     |
| `RadioGroup`  | `readOnly`           | `readOnly`           | Now accepts `boolean \| 'locked'`                     |
| `Toggle`      | `legend`             | `children`           | —                                                     |
| `Toggle`      | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `Toggle`      | `toggled`            | `checked`            | —                                                     |
| `Toggle`      | `labelTrue`          | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Toggle`      | `labelFalse`         | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Label`       | `label`              | `children`           | `<Label label="X">` → `<IressLabel>X</IressLabel>`    |
| `Label`       | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Label`       | `optional`           | `required`           | Logic inverted                                        |
| `Label`       | `required`           | `required`           | Now takes boolean, not string                         |
| `Input`       | `inputRef`           | `ref`                | Use standard React ref                                |
| `Input`       | `type`               | `type`               | Unchanged                                             |
| `Checkbox`    | `label`              | `children`           | —                                                     |
| `Checkbox`    | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Checkbox`    | `isInline`           | removed              | Use parent layout component                           |
| `Slider`      | `label`              | removed              | Use `aria-label` or wrap in `IressFormField`          |
| `Slider`      | `hideCurrentLabel`   | `hiddenValueTooltip` | —                                                     |
| `Slider`      | `hideBoundaryLabels` | `tickLabels`         | Set to `false` to hide                                |
| `Tabs`        | `activeTabIndex`     | `selected`           | Use tab `value` prop to identify tabs                 |
| `Tabs`        | `onSelect`           | `onChange`           | —                                                     |
| `Tabs`        | `lazy`               | removed              | v6 tabs are always lazy                               |
| `ProgressBar` | `now`                | `value`              | —                                                     |
| `ProgressBar` | `color`              | removed              | Use CSS custom properties for color                   |
| `ProgressBar` | `striped`            | removed              | Not available in v6                                   |
| `ProgressBar` | `animated`           | removed              | Not available in v6                                   |

## IDS v4 React → IDS v6 React Prop Changes (Verified against v4 source)

The v4 React wrappers (`@iress/components-react`) automatically convert Stencil's kebab-case props to camelCase and map custom events to React callback props (e.g., `iressModalEntered` → `onEntered`). This section documents the v4 React API compared to v6.

### Button

| v4 React prop     | v6 React prop      | Notes                                                                                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | `mode`             | v4 values: `primary`, `secondary`, `tertiary`, `link`, `danger`, `positive`, `negative` → v6: `primary`, `secondary`, `tertiary`, `quaternary`, `muted` |
| `mode="link"`     | removed            | Use `mode="tertiary"` or `IressLink` component                                                                                                          |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                                                                                                                         |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                                                                                                                         |
| `mode="negative"` | removed            | Use `status="danger"` instead                                                                                                                           |
| `loading`         | `loading`          | Unchanged                                                                                                                                               |
| `loadingText`     | `loading` (string) | v6 accepts boolean or string for loading                                                                                                                |
| `fluid`           | `fluid`            | Unchanged                                                                                                                                               |
| `noWrap`          | `noWrap`           | Unchanged                                                                                                                                               |
| `href`            | `href`             | Unchanged                                                                                                                                               |
| `onClick`         | `onClick`          | Unchanged                                                                                                                                               |
| slot `icon-only`  | `icon` prop        | v6 uses `icon` prop for icon-only buttons                                                                                                               |
| slot `prepend`    | `prepend` prop     | v6 uses prop instead of slot                                                                                                                            |
| slot `append`     | `append` prop      | v6 uses prop instead of slot                                                                                                                            |

### Alert

| v4 React prop    | v6 React prop     | Notes                                                                                             |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `status`         | `status`          | v4: `error`, `warning`, `success`, `info` → v6: `danger`, `warning`, `success`, `info`, `neutral` |
| `status="error"` | `status="danger"` | Value renamed                                                                                     |
| `headingText`    | `heading`         | Prop renamed                                                                                      |
| `headingLevel`   | removed           | v6 auto-handles heading level                                                                     |
| slot `footer`    | `actions` prop    | v6 uses `actions` array for buttons                                                               |

### Modal

| v4 React prop          | v6 React prop          | Notes                                              |
| ---------------------- | ---------------------- | -------------------------------------------------- |
| `show`                 | `show`                 | Unchanged                                          |
| `size`                 | `size`                 | v4 allowed responsive array → v6 single value only |
| `closeText`            | `closeText`            | Unchanged                                          |
| `fixedFooter`          | `fixedFooter`          | Unchanged                                          |
| `disableBackdropClick` | `disableBackdropClick` | Unchanged                                          |
| `noCloseButton`        | `noCloseButton`        | Unchanged                                          |
| `padding`              | `p` (styling prop)     | Use styling prop instead                           |
| `onEntered`            | `onEntered`            | Unchanged                                          |
| `onExited`             | `onExited`             | Unchanged                                          |
| slot `footer`          | `footer` prop          | v6 uses prop instead of slot                       |

### Slideout

| v4 React prop | v6 React prop | Notes                                  |
| ------------- | ------------- | -------------------------------------- |
| `show`        | `show`        | Unchanged                              |
| `eleToPush`   | `eleToPush`   | Unchanged                              |
| `mode`        | `mode`        | Unchanged (`overlay`, `push`)          |
| `closeText`   | `closeText`   | Unchanged                              |
| `padding`     | removed       | Use `p` styling prop on content        |
| `position`    | `position`    | Unchanged                              |
| `size`        | `size`        | Unchanged                              |
| `backdrop`    | removed       | v6 always has backdrop in overlay mode |
| `onEntered`   | `onEntered`   | Unchanged                              |
| `onExited`    | `onExited`    | Unchanged                              |
| slot `footer` | `footer` prop | v6 uses prop instead of slot           |

### Panel

| v4 React prop    | v6 React prop         | Notes                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| `background`     | `bg`                  | v4: `default`, `alt`, `transparent` → v6: `alt`, token values |
| `padding`        | `p` (styling prop)    | Use styling prop instead                                      |
| `textAlign`      | `textAlign`           | Unchanged                                                     |
| `stretch`        | `stretch`             | Unchanged (now styling prop)                                  |
| `noBorderRadius` | `borderRadius="none"` | Use `borderRadius` prop instead                               |

### Text

| v4 React prop | v6 React prop | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `variant`     | `textStyle`   | Prop renamed                 |
| `mode`        | `color`       | Prop renamed                 |
| `align`       | `textAlign`   | Prop renamed                 |
| `element`     | `element`     | Unchanged                    |
| `noGutter`    | removed       | Use `mb="none"` styling prop |

### Stack / Inline

| v4 React prop     | v6 React prop | Notes                                                        |
| ----------------- | ------------- | ------------------------------------------------------------ |
| `gutter`          | `gap`         | v4: `none`, `xs`, `sm`, `md`, `lg`, `xl` → v6 spacing tokens |
| `horizontalAlign` | `justify`     | Prop renamed (Inline only)                                   |
| `verticalAlign`   | `align`       | Prop renamed (Inline only)                                   |
| `noWrap`          | `noWrap`      | Unchanged                                                    |

### Icon

| v4 React prop      | v6 React prop      | Notes                                        |
| ------------------ | ------------------ | -------------------------------------------- |
| `name`             | `name`             | v4: FontAwesome names → v6: Material Symbols |
| `set`              | removed            | v6 uses Material Symbols only                |
| `mode`             | `color`            | Prop renamed                                 |
| `size`             | removed            | Inherits font size from parent               |
| `fixedWidth`       | removed            | Not needed with Material Symbols             |
| `spin`             | removed            | Use CSS animation instead                    |
| `rotate`           | removed            | Use CSS transform instead                    |
| `flip`             | removed            | Use CSS transform instead                    |
| `screenreaderText` | `screenreaderText` | Unchanged                                    |

### Label

| v4 React prop  | v6 React prop         | Notes                             |
| -------------- | --------------------- | --------------------------------- |
| `labelText`    | `children`            | v4 uses prop → v6 uses children   |
| `for`          | `htmlFor`             | Prop renamed                      |
| `hiddenLabel`  | `hiddenLabel`         | Unchanged                         |
| `optional`     | `required` (inverted) | Logic inverted                    |
| `optionalText` | removed               | v6 doesn't show "(optional)" text |
| `focusOn`      | removed               | Not needed in v6                  |

### Field

| v4 React prop        | v6 React prop     | Notes                                        |
| -------------------- | ----------------- | -------------------------------------------- |
| `label`              | `label`           | Unchanged                                    |
| `hiddenLabel`        | `hiddenLabel`     | Unchanged                                    |
| `hint`               | `hint`            | Unchanged                                    |
| `error`              | `errorMessages`   | Now takes array of `ValidationMessageObj`    |
| `disabledValidation` | removed           | Validation handled by `IressFormField` rules |
| `inline`             | `horizontal`      | Prop renamed                                 |
| `optionalText`       | removed           | —                                            |
| `valueMissing`       | `rules.required`  | Use `rules` prop on `IressFormField`         |
| `tooLong`            | `rules.maxLength` | Use `rules` prop on `IressFormField`         |
| `tooShort`           | `rules.minLength` | Use `rules` prop on `IressFormField`         |
| `patternMismatch`    | `rules.pattern`   | Use `rules` prop on `IressFormField`         |
| `rangeOverflow`      | `rules.max`       | Use `rules` prop on `IressFormField`         |
| `rangeUnderflow`     | `rules.min`       | Use `rules` prop on `IressFormField`         |

### Toggle

| v4 React prop | v6 React prop | Notes                                    |
| ------------- | ------------- | ---------------------------------------- |
| `checked`     | `checked`     | Unchanged                                |
| `label`       | `children`    | v4 uses prop → v6 uses children          |
| `hiddenLabel` | `hiddenLabel` | Unchanged                                |
| `layout`      | `layout`      | Unchanged                                |
| `onChange`    | `onChange`    | Unchanged (signature slightly different) |

### Badge → Pill

| v4 React prop     | v6 React prop | Notes                         |
| ----------------- | ------------- | ----------------------------- |
| Component renamed | `IressPill`   | `IressBadge` → `IressPill`    |
| `mode`            | `status`      | Prop renamed                  |
| `pill`            | removed       | v6 Pill is always pill-shaped |
| slot `host`       | removed       | Use composition instead       |

### SkipLink

| v4 React prop | v6 React prop  | Notes                                               |
| ------------- | -------------- | --------------------------------------------------- |
| `targetId`    | `href`         | Now takes full href with `#` (e.g., `href="#main"`) |
| `text`        | `children`     | v4 uses prop → v6 uses children                     |
| `customRoute` | `element` prop | Use `element` to customize rendered element         |

### Expander

| v4 React prop    | v6 React prop    | Notes                                                 |
| ---------------- | ---------------- | ----------------------------------------------------- |
| `open`           | `open`           | Unchanged                                             |
| `mode`           | `mode`           | v4: `section`, `heading`, `link` → v6: `section` only |
| `mode="heading"` | `mode="section"` | Value renamed                                         |
| slot `activator` | `activator` prop | v4 uses slot → v6 uses prop                           |
| `onChange`       | `onChange`       | Unchanged                                             |

### Tabs (TabContainer → TabSet)

| v4 React prop     | v6 React prop | Notes                                     |
| ----------------- | ------------- | ----------------------------------------- |
| Component renamed | `IressTabSet` | `IressTabContainer` → `IressTabSet`       |
| `onChange`        | `onChange`    | Unchanged                                 |
| `IressTabButton`  | `IressTab`    | Component renamed                         |
| `IressTabPanel`   | removed       | Content now passed as `IressTab` children |

## Key Architecture Changes (v4 React → v6 React)

### Package Changes

| v4 Package                    | v6 Package                                 | Notes                   |
| ----------------------------- | ------------------------------------------ | ----------------------- |
| `@iress/components-react`     | `@iress-oss/ids-components`                | Main component package  |
| `@iress/ids-react-test-utils` | `@testing-library/react`                   | Use standard RTL        |
| `@iress/components` (CSS)     | `@iress-oss/ids-components/dist/style.css` | CSS import path changed |
| `@iress/ids-themes`           | `@iress-oss/ids-tokens`                    | Design tokens package   |

### Slot → Prop Migration

v4 used `slot` attributes on children to position content inside components. This is a legacy v4 pattern that is **no longer supported** — v6 uses React props directly (`prepend`, `append`, `footer`, `icon`, `activator`, etc.).

> **⚠️ Do not copy `slot` attributes from existing code.** If you see `slot="..."` in a codebase, it is legacy v4 code that needs to be migrated. AI agents frequently propagate this pattern by matching existing code — always use the prop-based API instead.

> **⚠️ `IressShadow` does NOT mean the app uses Web Components.** AI agents commonly see `IressShadow` (which uses Shadow DOM for CSS isolation) and incorrectly conclude the application uses custom elements with `slot` attributes. This is wrong — `IressShadow` wraps an entire React app in a single shadow root on a `<div>` element for style encapsulation. All components inside `IressShadow` are standard React components. IDS has not offered Web Components since v4.

```tsx
// ❌ v4: Using slot attributes (no longer supported)
<IressButton>
  <IressIcon slot="prepend" name="search" />
  Search
</IressButton>

// ✅ v6: Using props
<IressButton prepend={<IressIcon name="search" />}>
  Search
</IressButton>
```

```tsx
// ❌ v4: Modal footer slot (no longer supported)
<IressModal show={show}>
  Content
  <div slot="footer">
    <IressButton>Close</IressButton>
  </div>
</IressModal>

// ✅ v6: Modal footer prop
<IressModal
  show={show}
  footer={<IressButton>Close</IressButton>}
>
  Content
</IressModal>
```

### Event Callback Changes

v4 React wrappers mapped Stencil custom events to React callback props. Most remain the same in v6, but some have changed:

| v4 Callback     | v6 Callback     | Notes                            |
| --------------- | --------------- | -------------------------------- |
| `onClick`       | `onClick`       | Unchanged                        |
| `onChange`      | `onChange`      | Unchanged (signature may differ) |
| `onBlur`        | `onBlur`        | Unchanged                        |
| `onFocus`       | `onFocus`       | Unchanged                        |
| `onEntered`     | `onEntered`     | Unchanged                        |
| `onExited`      | `onExited`      | Unchanged                        |
| `onActivated`   | `onActivated`   | Unchanged                        |
| `onDeactivated` | `onDeactivated` | Unchanged                        |
| `onClear`       | `onClear`       | Unchanged                        |

### Test Utility Migration

v4 provided `@iress/ids-react-test-utils` with `idsFireEvent` for testing custom events. v6 uses standard React Testing Library.

```tsx
// ❌ v4: Using idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });
idsFireEvent.entered(modal);
idsFireEvent.blur(field, { target: { value: 'test' } });

// ✅ v6: Using standard RTL
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

await userEvent.type(input, 'test');
fireEvent.transitionEnd(modal); // or wait for onEntered callback
await userEvent.tab(); // for blur
```

### Helper Function Migration

v4 provided helper functions in `@iress/components-react`. These are no longer needed in v6.

| v4 Helper                   | v6 Replacement                               |
| --------------------------- | -------------------------------------------- |
| `mapCheckboxGroupOptions()` | Use `<IressCheckbox>` children directly      |
| `mapRadioGroupOptions()`    | Use `<IressRadio>` children directly         |
| `mapSelectOptions()`        | Use `options` prop on `IressSelect`          |
| `mapTabs()`                 | Use `<IressTab>` children directly           |
| `mapMenuItems()`            | Use `<IressMenuItem>` children directly      |
| `showModal(id)`             | Use `show` prop or `useModal` hook           |
| `showSlideout(id)`          | Use `show` prop or `useSlideout` hook        |
| `rowData(arr, ref)`         | Pass `rowData` prop directly to `IressTable` |
| OUI + IDS v5  | OUI→v6 guide + v5→v6 for IDS changes | High (form architecture change)   | v5-to-v6-migration.md |

# IDS v5 → v6 Migration Reference

This document covers changes specific to migrating from IDS v5 (`@iress-oss/ids-components@5.x`) to v6.

## Package Changes

| v5 Package                  | v6 Package                      |
| --------------------------- | ------------------------------- |
| `@iress-oss/ids-components` | `@iress-oss/ids-components`     |
| CSS: `dist/style.css`       | CSS: `styled-system/styles.css` |

## Component Renames

| v5 Component         | v6 Component                         | Notes                                                                 |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `IressBadge`         | `IressPill`                          | Renamed                                                               |
| `IressFilter`        | `IressDropdownMenu`                  | Now a pattern component                                               |
| `IressRichSelect`    | `IressSelect`                        | Consolidated; v5 `IressSelect` replaced by `native` prop on v6 Select |
| `IressCombobox`      | `IressSelect` or `IressAutocomplete` | Was deprecated in v5                                                  |
| `IressMultiCombobox` | `IressSelect` with `multiSelect`     | Was deprecated in v5                                                  |
| `IressNavbar`        | Removed                              | Build custom navigation per-application                               |

## New Components in v6

| Component                    | Purpose                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `IressBreadcrumbs`           | Navigation hierarchy                                                                               |
| `IressContextualMenu`        | Context / "more actions" menu                                                                      |
| `IressDropdownMenu`          | Filter/navigation dropdown                                                                         |
| `IressLink`                  | Anchor links in text                                                                               |
| `IressPill`                  | Status indicators, counters                                                                        |
| `IressImage`                 | Responsive images                                                                                  |
| `IressMenuGroup`             | Menu item grouping                                                                                 |
| `IressShadow`                | CSS isolation wrapper for micro-frontends (NOT a custom element — all children are standard React) |
| `IressSideNav`               | Side navigation                                                                                    |
| `IressFormField`             | Form-integrated field with validation                                                              |
| `IressFormValidationSummary` | Form validation summary                                                                            |

## Prop Changes by Component

### Button

| v5 prop           | v6 prop            | Notes                                               |
| ----------------- | ------------------ | --------------------------------------------------- |
| `mode="link"`     | `mode="tertiary"`  | Or use `IressLink` for links in text                |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                     |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                     |
| `mode="negative"` | `status="danger"`  | Use `status` prop                                   |
| `attrs`           | removed            | Use native HTML attributes directly                 |
| —                 | `icon`             | New: Material Symbol name for icon-only buttons     |
| —                 | `compact`          | New: reduces padding for compact buttons            |
| —                 | `status`           | New: `success` or `danger`                          |
| —                 | `active`           | New: indicates button has activated a modal/popover |

### Alert

| v5 prop        | v6 prop         | Notes                                               |
| -------------- | --------------- | --------------------------------------------------- |
| `status`       | `status`        | Added `neutral` option in v6                        |
| `headingText`  | `heading`       | `headingText` was deprecated in v5                  |
| `headingLevel` | removed         | Was deprecated in v5; v6 auto-handles               |
| `footer`       | `footer`        | Unchanged                                           |
| —              | `actions`       | New: array of button props with opinionated styling |
| —              | `closed`        | New: controlled dismissal                           |
| —              | `defaultClosed` | New: uncontrolled dismissal                         |
| —              | `onClose`       | New: callback when dismissed                        |
| —              | `icon`          | New: custom icon or `false` to hide                 |
| —              | `multiLine`     | New: layout for longer content                      |
| —              | `variant`       | New: `sidebar` or `full-width`                      |

### Toggle

| v5 prop       | v6 prop          | Notes                       |
| ------------- | ---------------- | --------------------------- |
| `checked`     | `checked`        | Unchanged (controlled mode) |
| —             | `defaultChecked` | New: for uncontrolled mode  |
| `children`    | `children`       | Unchanged                   |
| `hiddenLabel` | `hiddenLabel`    | Unchanged                   |
| `layout`      | `layout`         | Unchanged                   |
| `onChange`    | `onChange`       | Unchanged                   |
| —             | `disabled`       | New: disables the toggle    |

### Field (IressField)

| v5 prop         | v6 prop             | Notes                                  |
| --------------- | ------------------- | -------------------------------------- |
| `label`         | `label`             | Unchanged                              |
| `hiddenLabel`   | `hiddenLabel`       | Unchanged                              |
| `hint`          | `hint`              | Unchanged                              |
| `error`         | `error`             | Unchanged                              |
| `errorMessages` | `errorMessages`     | Unchanged                              |
| `optional`      | removed             | Use `required={false}` instead         |
| `required`      | `required`          | Unchanged                              |
| `readOnly`      | `readOnly`          | Now accepts `boolean \| 'locked'`. Use `'locked'` when the field is read-only due to permissions |
| `htmlFor`       | `htmlFor`           | Unchanged                              |
| —               | `horizontal`        | New: inline label/input layout         |
| —               | `labelWidth`        | New: label width in horizontal mode    |
| —               | `removeErrorMargin` | New: removes reserved error space      |
| —               | `supplementary`     | New: content below field when no error |

### Modal

| v5 prop        | v6 prop            | Notes                    |
| -------------- | ------------------ | ------------------------ |
| `show`         | `show`             | Unchanged                |
| `defaultShow`  | `defaultShow`      | Unchanged                |
| `size`         | `size`             | Unchanged                |
| `heading`      | `heading`          | Unchanged                |
| `footer`       | `footer`           | Unchanged                |
| `padding`      | `p` (styling prop) | Use styling prop instead |
| `onShowChange` | `onShowChange`     | Unchanged                |
| `onEntered`    | `onEntered`        | Unchanged                |
| `onExited`     | `onExited`         | Unchanged                |

### Badge → Pill

| v5 prop   | v6 prop     | Notes                                                   |
| --------- | ----------- | ------------------------------------------------------- |
| Component | `IressPill` | `IressBadge` renamed to `IressPill`                     |
| `mode`    | `mode`      | Values changed: now uses data palette (10-90) or status |
| `pill`    | removed     | v6 Pill is always pill-shaped                           |
| `host`    | removed     | Use composition instead                                 |

### Select (was RichSelect)

| v5 prop       | v6 prop            | Notes                                                                                  |
| ------------- | ------------------ | -------------------------------------------------------------------------------------- |
| Component     | `IressSelect`      | `IressRichSelect` renamed to `IressSelect`                                             |
| `options`     | `options`          | Unchanged                                                                              |
| `value`       | `value`            | Now also accepts a plain string or `FormControlValue` (resolves to matching option)    |
| `multiSelect` | `multiSelect`      | Unchanged                                                                              |
| —             | `defaultValue`     | Accepts `LabelValueMeta` or plain string for uncontrolled pre-selection                |
| —             | `multiSelectLimit` | New: limits visible selected tags before collapsing to "+N more" (default `5`)         |
| —             | `native`           | New: renders native `<select>` element                                                 |

### Filter → DropdownMenu

| v5 prop       | v6 prop             | Notes                 |
| ------------- | ------------------- | --------------------- |
| Component     | `IressDropdownMenu` | `IressFilter` renamed |
| `options`     | `options`           | Unchanged             |
| `value`       | `selected`          | Prop renamed          |
| `multiSelect` | `multiSelect`       | Unchanged             |
| `searchable`  | `searchable`        | Unchanged             |

### Popover

| v5 prop        | v6 prop        | Notes                                                                                                |
| -------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `contentStyle` | `contentStyle` | Unchanged                                                                                            |
| —              | —              | ⚠️ **Breaking:** Popover content now has default `padding: spacing.4`. Override with `contentStyle={{ padding: 'spacing.0' }}` if you were providing your own inner padding |

### Readonly

| v5 prop | v6 prop   | Notes                                                                                                |
| ------- | --------- | ---------------------------------------------------------------------------------------------------- |
| —       | `actions` | New: array of button props rendered alongside the readonly value (e.g. edit/save toggles)            |
| —       | `variant` | New: set to `'locked'` for disabled-like styling when the value is read-only due to permissions      |
| —       | —         | ⚠️ **Breaking:** DOM structure changed — inner content is now wrapped in an additional `wrapper` div inside `root`. CSS selectors targeting direct children of the root may need updating |

## Styling Changes

### CSS Import

```tsx
// v5
import '@iress-oss/ids-components/dist/style.css';

// v6
import '@iress-oss/ids-components/styled-system/styles.css';
```

### Styling Props

v6 uses Panda CSS and exposes styling props on all components:

```tsx
// v6 styling props
<IressPanel p="lg" m="xl" bg="alt" />

// Responsive
<IressPanel p={{ base: 'sm', xl: 'lg' }} />
```

### Design Tokens

```tsx
// v6 - type-safe cssVars
import { cssVars } from '@iress-oss/ids-tokens';

<div style={{ color: cssVars.colour.primary.text }} />;
```

## Form Migration

v5 used standalone form components. v6 introduces `IressForm` + `IressFormField` with React Hook Form integration.

```tsx
// v5
<IressField label="Email" error={errors.email}>
  <IressInput name="email" value={value} onChange={handleChange} />
</IressField>

// v6
<IressForm defaultValues={{ email: '' }} onSubmit={handleSubmit}>
  <IressFormField
    name="email"
    label="Email"
    render={(field) => <IressInput {...field} />}
    rules={{ required: 'Required' }}
  />
</IressForm>
```

Note: `IressField` still exists in v6 for standalone layout without form binding.

## Icon Changes

v5 used FontAwesome icons. v6 uses Material Symbols.

```tsx
// v5
<IressIcon name="check" set="fas" />

// v6
<IressIcon name="check_circle" />
```

| v5 prop      | v6 prop | Notes                                |
| ------------ | ------- | ------------------------------------ |
| `name`       | `name`  | FontAwesome → Material Symbols names |
| `set`        | removed | v6 uses Material Symbols only        |
| `mode`       | `color` | Prop renamed                         |
| `size`       | removed | Inherits font size from parent       |
| `fixedWidth` | removed | Not needed with Material Symbols     |
| `spin`       | removed | Use CSS animation                    |

Full interactive guides with diff viewers are available in Storybook:

- [v4→v5 guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/resources-migration-guides-from-v4-to-v5--docs)
- [v5→v6 guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/resources-migration-guides-from-v5-to-v6--docs)
- [OUI→v6 guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/resources-migration-guides-from-oui-to-v6--docs)

---

## Pre-Migration Assessment

Before starting migration, run these scripts (or perform checks manually):

1. **Identify current version**: `scripts/detect-version.sh` — detects IDS/OUI version and recommends migration path
2. **Audit component usage**: `scripts/audit-components.sh` — generates component usage report
3. **Check for deprecated props**: `scripts/find-deprecated-props.sh` — finds props that will break
4. **Check form architecture**: `scripts/find-formik.sh` — identifies Formik forms needing migration
5. **Check test patterns**: `scripts/find-test-utils.sh` — finds old test utilities
6. **Review custom CSS**: Search for `.oui-`, `.ids-`, or `iress-` class selectors that may break
7. **Setup VRT (recommended)**: `scripts/setup-playwright-vrt.sh` — generates Playwright visual regression tests
8. **Capture baseline screenshots**: Run VRT suite before migration to capture current state
9. **Create migration branch**: Ensure you can rollback if needed

---

## Quick Reference: Package Changes

### Import path

```ts
// ❌ Old (IDS v4)
import { IressButton } from '@iress/components-react';

// ❌ Old (OUI)
import { Button, Input } from '@iress/oui';

// ✅ IDS v6
import { IressButton, IressInput } from '@iress-oss/ids-components';
```

```bash
npm install @iress-oss/ids-components
npm install @iress-oss/ids-tokens  # if using tokens directly
```

### CSS entry point

```ts
// ✅ Required in your app entry point
import '@iress-oss/ids-components/dist/style.css';
```

### Token package

```ts
// ✅ Required for design tokens
import '@iress-oss/ids-tokens/build/css-vars.css';
import { cssVars } from '@iress-oss/ids-tokens';
```

---

## Key Migration Areas

### v5 → v6 Migration

For migrations specifically from IDS v5 to v6, see references/v5-to-v6-migration.md for:

# IDS v5 → v6 Migration Reference

This document covers changes specific to migrating from IDS v5 (`@iress-oss/ids-components@5.x`) to v6.

## Package Changes

| v5 Package                  | v6 Package                      |
| --------------------------- | ------------------------------- |
| `@iress-oss/ids-components` | `@iress-oss/ids-components`     |
| CSS: `dist/style.css`       | CSS: `styled-system/styles.css` |

## Component Renames

| v5 Component         | v6 Component                         | Notes                                                                 |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `IressBadge`         | `IressPill`                          | Renamed                                                               |
| `IressFilter`        | `IressDropdownMenu`                  | Now a pattern component                                               |
| `IressRichSelect`    | `IressSelect`                        | Consolidated; v5 `IressSelect` replaced by `native` prop on v6 Select |
| `IressCombobox`      | `IressSelect` or `IressAutocomplete` | Was deprecated in v5                                                  |
| `IressMultiCombobox` | `IressSelect` with `multiSelect`     | Was deprecated in v5                                                  |
| `IressNavbar`        | Removed                              | Build custom navigation per-application                               |

## New Components in v6

| Component                    | Purpose                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `IressBreadcrumbs`           | Navigation hierarchy                                                                               |
| `IressContextualMenu`        | Context / "more actions" menu                                                                      |
| `IressDropdownMenu`          | Filter/navigation dropdown                                                                         |
| `IressLink`                  | Anchor links in text                                                                               |
| `IressPill`                  | Status indicators, counters                                                                        |
| `IressImage`                 | Responsive images                                                                                  |
| `IressMenuGroup`             | Menu item grouping                                                                                 |
| `IressShadow`                | CSS isolation wrapper for micro-frontends (NOT a custom element — all children are standard React) |
| `IressSideNav`               | Side navigation                                                                                    |
| `IressFormField`             | Form-integrated field with validation                                                              |
| `IressFormValidationSummary` | Form validation summary                                                                            |

## Prop Changes by Component

### Button

| v5 prop           | v6 prop            | Notes                                               |
| ----------------- | ------------------ | --------------------------------------------------- |
| `mode="link"`     | `mode="tertiary"`  | Or use `IressLink` for links in text                |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                     |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                     |
| `mode="negative"` | `status="danger"`  | Use `status` prop                                   |
| `attrs`           | removed            | Use native HTML attributes directly                 |
| —                 | `icon`             | New: Material Symbol name for icon-only buttons     |
| —                 | `compact`          | New: reduces padding for compact buttons            |
| —                 | `status`           | New: `success` or `danger`                          |
| —                 | `active`           | New: indicates button has activated a modal/popover |

### Alert

| v5 prop        | v6 prop         | Notes                                               |
| -------------- | --------------- | --------------------------------------------------- |
| `status`       | `status`        | Added `neutral` option in v6                        |
| `headingText`  | `heading`       | `headingText` was deprecated in v5                  |
| `headingLevel` | removed         | Was deprecated in v5; v6 auto-handles               |
| `footer`       | `footer`        | Unchanged                                           |
| —              | `actions`       | New: array of button props with opinionated styling |
| —              | `closed`        | New: controlled dismissal                           |
| —              | `defaultClosed` | New: uncontrolled dismissal                         |
| —              | `onClose`       | New: callback when dismissed                        |
| —              | `icon`          | New: custom icon or `false` to hide                 |
| —              | `multiLine`     | New: layout for longer content                      |
| —              | `variant`       | New: `sidebar` or `full-width`                      |

### Toggle

| v5 prop       | v6 prop          | Notes                       |
| ------------- | ---------------- | --------------------------- |
| `checked`     | `checked`        | Unchanged (controlled mode) |
| —             | `defaultChecked` | New: for uncontrolled mode  |
| `children`    | `children`       | Unchanged                   |
| `hiddenLabel` | `hiddenLabel`    | Unchanged                   |
| `layout`      | `layout`         | Unchanged                   |
| `onChange`    | `onChange`       | Unchanged                   |
| —             | `disabled`       | New: disables the toggle    |

### Field (IressField)

| v5 prop         | v6 prop             | Notes                                  |
| --------------- | ------------------- | -------------------------------------- |
| `label`         | `label`             | Unchanged                              |
| `hiddenLabel`   | `hiddenLabel`       | Unchanged                              |
| `hint`          | `hint`              | Unchanged                              |
| `error`         | `error`             | Unchanged                              |
| `errorMessages` | `errorMessages`     | Unchanged                              |
| `optional`      | removed             | Use `required={false}` instead         |
| `required`      | `required`          | Unchanged                              |
| `readOnly`      | `readOnly`          | Now accepts `boolean \| 'locked'`. Use `'locked'` when the field is read-only due to permissions |
| `htmlFor`       | `htmlFor`           | Unchanged                              |
| —               | `horizontal`        | New: inline label/input layout         |
| —               | `labelWidth`        | New: label width in horizontal mode    |
| —               | `removeErrorMargin` | New: removes reserved error space      |
| —               | `supplementary`     | New: content below field when no error |

### Modal

| v5 prop        | v6 prop            | Notes                    |
| -------------- | ------------------ | ------------------------ |
| `show`         | `show`             | Unchanged                |
| `defaultShow`  | `defaultShow`      | Unchanged                |
| `size`         | `size`             | Unchanged                |
| `heading`      | `heading`          | Unchanged                |
| `footer`       | `footer`           | Unchanged                |
| `padding`      | `p` (styling prop) | Use styling prop instead |
| `onShowChange` | `onShowChange`     | Unchanged                |
| `onEntered`    | `onEntered`        | Unchanged                |
| `onExited`     | `onExited`         | Unchanged                |

### Badge → Pill

| v5 prop   | v6 prop     | Notes                                                   |
| --------- | ----------- | ------------------------------------------------------- |
| Component | `IressPill` | `IressBadge` renamed to `IressPill`                     |
| `mode`    | `mode`      | Values changed: now uses data palette (10-90) or status |
| `pill`    | removed     | v6 Pill is always pill-shaped                           |
| `host`    | removed     | Use composition instead                                 |

### Select (was RichSelect)

| v5 prop       | v6 prop            | Notes                                                                                  |
| ------------- | ------------------ | -------------------------------------------------------------------------------------- |
| Component     | `IressSelect`      | `IressRichSelect` renamed to `IressSelect`                                             |
| `options`     | `options`          | Unchanged                                                                              |
| `value`       | `value`            | Now also accepts a plain string or `FormControlValue` (resolves to matching option)    |
| `multiSelect` | `multiSelect`      | Unchanged                                                                              |
| —             | `defaultValue`     | Accepts `LabelValueMeta` or plain string for uncontrolled pre-selection                |
| —             | `multiSelectLimit` | New: limits visible selected tags before collapsing to "+N more" (default `5`)         |
| —             | `native`           | New: renders native `<select>` element                                                 |

### Filter → DropdownMenu

| v5 prop       | v6 prop             | Notes                 |
| ------------- | ------------------- | --------------------- |
| Component     | `IressDropdownMenu` | `IressFilter` renamed |
| `options`     | `options`           | Unchanged             |
| `value`       | `selected`          | Prop renamed          |
| `multiSelect` | `multiSelect`       | Unchanged             |
| `searchable`  | `searchable`        | Unchanged             |

### Popover

| v5 prop        | v6 prop        | Notes                                                                                                |
| -------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `contentStyle` | `contentStyle` | Unchanged                                                                                            |
| —              | —              | ⚠️ **Breaking:** Popover content now has default `padding: spacing.4`. Override with `contentStyle={{ padding: 'spacing.0' }}` if you were providing your own inner padding |

### Readonly

| v5 prop | v6 prop   | Notes                                                                                                |
| ------- | --------- | ---------------------------------------------------------------------------------------------------- |
| —       | `actions` | New: array of button props rendered alongside the readonly value (e.g. edit/save toggles)            |
| —       | `variant` | New: set to `'locked'` for disabled-like styling when the value is read-only due to permissions      |
| —       | —         | ⚠️ **Breaking:** DOM structure changed — inner content is now wrapped in an additional `wrapper` div inside `root`. CSS selectors targeting direct children of the root may need updating |

## Styling Changes

### CSS Import

```tsx
// v5
import '@iress-oss/ids-components/dist/style.css';

// v6
import '@iress-oss/ids-components/styled-system/styles.css';
```

### Styling Props

v6 uses Panda CSS and exposes styling props on all components:

```tsx
// v6 styling props
<IressPanel p="lg" m="xl" bg="alt" />

// Responsive
<IressPanel p={{ base: 'sm', xl: 'lg' }} />
```

### Design Tokens

```tsx
// v6 - type-safe cssVars
import { cssVars } from '@iress-oss/ids-tokens';

<div style={{ color: cssVars.colour.primary.text }} />;
```

## Form Migration

v5 used standalone form components. v6 introduces `IressForm` + `IressFormField` with React Hook Form integration.

```tsx
// v5
<IressField label="Email" error={errors.email}>
  <IressInput name="email" value={value} onChange={handleChange} />
</IressField>

// v6
<IressForm defaultValues={{ email: '' }} onSubmit={handleSubmit}>
  <IressFormField
    name="email"
    label="Email"
    render={(field) => <IressInput {...field} />}
    rules={{ required: 'Required' }}
  />
</IressForm>
```

Note: `IressField` still exists in v6 for standalone layout without form binding.

## Icon Changes

v5 used FontAwesome icons. v6 uses Material Symbols.

```tsx
// v5
<IressIcon name="check" set="fas" />

// v6
<IressIcon name="check_circle" />
```

| v5 prop      | v6 prop | Notes                                |
| ------------ | ------- | ------------------------------------ |
| `name`       | `name`  | FontAwesome → Material Symbols names |
| `set`        | removed | v6 uses Material Symbols only        |
| `mode`       | `color` | Prop renamed                         |
| `size`       | removed | Inherits font size from parent       |
| `fixedWidth` | removed | Not needed with Material Symbols     |
| `spin`       | removed | Use CSS animation                    |

- Package and CSS import changes
- Component renames (`IressBadge` → `IressPill`, `IressFilter` → `IressDropdownMenu`, etc.)
- Prop changes by component (Button, Alert, Toggle, Field, Modal, Select)
- Icon migration (FontAwesome → Material Symbols)
- Form migration patterns

### Component renames

Components that changed names between versions (IDS and OUI → v6), plus removed and new components. See references/component-renames.md for the full map.

# Component Rename Map

Components that changed names between versions. All other IDS components keep the same name (with the `Iress` prefix in v6).

## IDS v4/v5 → v6 Renames

| Old name          | New name (v6)       | Notes                                                                                   |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------- |
| `IressBadge`      | `IressPill`         | Renamed in v6                                                                           |
| `IressFilter`     | `IressDropdownMenu` | Renamed to pattern component                                                            |
| `IressRichSelect` | `IressSelect`       | Renamed; old `IressSelect` replaced by `native` prop                                    |
| `IressField`      | `IressFormField`    | New form-integrated wrapper; `IressField` still exists as a standalone layout component |

## OUI → v6 Renames

| OUI Component    | v6 Component                                         | Notes                                                 |
| ---------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `Badge`          | `IressPill`                                          | —                                                     |
| `Button`         | `IressButton`                                        | OUI uses `label` prop → v6 uses `children`            |
| `Modal`          | `IressModal`                                         | `onHide` → `onShowChange`; `show` prop unchanged      |
| `Alert`          | `IressAlert`                                         | `context` → `status`; `contextLabel` removed          |
| `DropdownButton` | `IressDropdownMenu` / `IressSelect` / `IressPopover` | Depends on use case                                   |
| `ProgressBar`    | `IressProgress`                                      | Props mostly unchanged                                |
| `Scrollable`     | `scrollable` styling prop                            | Available on any component                            |
| `Input`          | `IressInput`                                         | Can be standalone or wrapped in `IressFormField`      |
| `TextArea`       | `IressInput` with `rows` prop                        | Use `rows={4}` for textarea behavior                  |
| `Label`          | `IressLabel` or `IressFormField` `label` prop        | OUI uses `label` prop → v6 uses `children`            |
| `FormGroup`      | `IressField` or `IressFormField`                     | Built into Field components                           |
| `Fieldset`       | `IressFieldGroup`                                    | `legend` → `label`                                    |
| `RadioGroup`     | `IressRadioGroup`                                    | `legend` removed; use `IressFormField` for label      |
| `Checkbox`       | `IressCheckbox`                                      | Can be standalone or wrapped in `IressFormField`      |
| `CheckboxGroup`  | `IressCheckboxGroup`                                 | —                                                     |
| `Slideout`       | `IressSlideout`                                      | `show` prop unchanged                                 |
| `Toggle`         | `IressToggle`                                        | `legend` → `children`; `toggled` → `checked`          |
| `Tabs`           | `IressTabSet`                                        | `activeTabIndex` → `selected`/`defaultSelected`       |
| `Tab`            | `IressTab`                                           | —                                                     |
| `Slider`         | `IressSlider`                                        | `label` removed; use `aria-label` or `IressFormField` |
| `Tooltip`        | `IressTooltip`                                       | —                                                     |
| `Popover`        | `IressPopover`                                       | —                                                     |
| `Card`           | `IressCard`                                          | —                                                     |
| `Table`          | `IressTable`                                         | —                                                     |
| `Link`           | `IressLink`                                          | —                                                     |
| `Nav`            | Removed                                              | Build custom navigation with IDS components           |
| `NavBar`         | Removed                                              | Build custom navigation with IDS components           |
| `NavItem`        | Removed                                              | Use `IressSideNav` or custom implementation           |
| `SingleSelect`   | `IressSelect`                                        | —                                                     |
| `AutoComplete`   | `IressAutocomplete`                                  | —                                                     |
| `DatePicker`     | `IressInput` with `type="date"`                      | Native browser date picker                            |
| `TimePicker`     | `IressInput` with `type="time"`                      | Native browser time picker                            |

## Removed Components

| Component                | Replacement                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `IressNavbar`            | Removed — build with IDS components per-application                                              |
| `IressToast` (direct)    | Use `IressToasterProvider` + `useToaster`                                                        |
| `IressToaster` (direct)  | Use `IressToasterProvider` + `useToaster`                                                        |
| `IressSelectOption`      | Use `options` prop on `IressSelect`                                                              |
| `IressHide` (deprecated) | Use `srOnly`, `hideFrom`, or `hideBelow` styling props (component still exported but deprecated) |
| OUI `Nav`                | Build custom with `IressSideNav` or IDS primitives                                               |
| OUI `NavBar`             | Build custom with IDS primitives                                                                 |
| OUI `NavItem`            | Use `IressSideNav` items or custom implementation                                                |
| OUI `NavDropdown`        | Use `IressDropdownMenu` or `IressPopover`                                                        |
| OUI `DatePicker`         | `IressInput` with `type="date"`                                                                  |
| OUI `TimePicker`         | `IressInput` with `type="time"`                                                                  |
| OUI `TreeView`           | Not available in v6                                                                              |
| OUI `Onboarding`         | Not available in v6                                                                              |
| OUI `Process`            | Not available in v6                                                                              |

## New Components in v6

| Component                    | Purpose                                                                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `IressBreadcrumbs`           | Navigation hierarchy breadcrumbs                                                                                                                |
| `IressContextualMenu`        | Context / "more actions" menu                                                                                                                   |
| `IressDropdownMenu`          | Filter/navigation dropdown (replaces `IressFilter`)                                                                                             |
| `IressLink`                  | Anchor links in text paragraphs                                                                                                                 |
| `IressPill`                  | Status indicators, counters (replaces `IressBadge`)                                                                                             |
| `IressTag`                   | Interactive tags                                                                                                                                |
| `IressImage`                 | Responsive images                                                                                                                               |
| `IressMenuGroup`             | Menu item grouping                                                                                                                              |
| `IressShadow`                | CSS isolation wrapper for micro-frontends (creates shadow root on a `<div>` — NOT a custom element; all children are standard React components) |
| `IressSideNav`               | Side navigation (combines `rail` + `side` menu variants)                                                                                        |
| `IressButtonCard`            | Card rendered as a button                                                                                                                       |
| `IressLinkCard`              | Card rendered as a link                                                                                                                         |
| `IressFormValidationSummary` | Form validation summary alert                                                                                                                   |
| `IressReadonly`              | Read-only display of form values (supports `actions` prop for inline action buttons)                                                            |
| `IressSpinner`               | Loading spinner                                                                                                                                 |

Key renames: `IressBadge` → `IressPill`, `IressRichSelect` → `IressSelect`, `IressField` → `IressFormField`, `IressFilter` → `IressDropdownMenu`.

### Prop renames (CRITICAL — verified against source code)

Using old prop names will silently fail. See references/prop-renames.md for the complete table.

# Prop Rename Cheat Sheet

## CRITICAL — verified against source code

These prop names have been verified against the actual IDS v6 source. Using the old prop names will silently fail.

## OUI → IDS v6 Prop Changes

| OUI Component | OUI prop             | IDS v6 prop          | Notes                                                 |
| ------------- | -------------------- | -------------------- | ----------------------------------------------------- |
| `Alert`       | `context`            | `status`             | Values: `danger`, `info`, `success`, `warning`        |
| `Alert`       | `contextLabel`       | removed              | v6 auto-generates; remove this prop                   |
| `Alert`       | `closeLabel`         | `closeLabel`         | Unchanged                                             |
| `Alert`       | `onHide`             | `onClose`            | Callback for dismissing                               |
| `Button`      | `label`              | `children`           | `<Button label="X">` → `<IressButton>X</IressButton>` |
| `Button`      | `mode`               | `mode`               | Unchanged; values slightly different                  |
| `Button`      | `labelHidden`        | `icon` prop          | Use `icon` prop for icon-only buttons                 |
| `Button`      | `iconName`           | `icon`               | Use Material Symbol name                              |
| `Button`      | `showLoading`        | `loading`            | —                                                     |
| `Modal`       | `onHide`             | `onShowChange`       | `(show: boolean) => void`                             |
| `Modal`       | `show`               | `show`               | Unchanged                                             |
| `Modal`       | `size`               | `size`               | Values: `sm`, `md`, `lg` (OUI had `xs`, `xl` too)     |
| `Modal`       | `fixedFooter`        | `fixedFooter`        | Unchanged                                             |
| `Slideout`    | `show`               | `show`               | Unchanged                                             |
| `Slideout`    | `position`           | `position`           | Unchanged                                             |
| `Slideout`    | `size`               | `size`               | Values: `sm`, `md` (OUI had `lg`, `dynamic` too)      |
| `Fieldset`    | `legend`             | `label`              | On `IressFieldGroup`                                  |
| `Fieldset`    | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `RadioGroup`  | `legend`             | removed              | Use `IressFormField` `label` prop instead             |
| `RadioGroup`  | `legendHidden`       | removed              | Use `IressFormField` `hiddenLabel` prop               |
| `RadioGroup`  | `options`            | `children`           | Use `<IressRadio>` children instead of options array  |
| `RadioGroup`  | `checked`            | `value`              | —                                                     |
| `RadioGroup`  | `readOnly`           | `readOnly`           | Now accepts `boolean \| 'locked'`                     |
| `Toggle`      | `legend`             | `children`           | —                                                     |
| `Toggle`      | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `Toggle`      | `toggled`            | `checked`            | —                                                     |
| `Toggle`      | `labelTrue`          | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Toggle`      | `labelFalse`         | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Label`       | `label`              | `children`           | `<Label label="X">` → `<IressLabel>X</IressLabel>`    |
| `Label`       | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Label`       | `optional`           | `required`           | Logic inverted                                        |
| `Label`       | `required`           | `required`           | Now takes boolean, not string                         |
| `Input`       | `inputRef`           | `ref`                | Use standard React ref                                |
| `Input`       | `type`               | `type`               | Unchanged                                             |
| `Checkbox`    | `label`              | `children`           | —                                                     |
| `Checkbox`    | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Checkbox`    | `isInline`           | removed              | Use parent layout component                           |
| `Slider`      | `label`              | removed              | Use `aria-label` or wrap in `IressFormField`          |
| `Slider`      | `hideCurrentLabel`   | `hiddenValueTooltip` | —                                                     |
| `Slider`      | `hideBoundaryLabels` | `tickLabels`         | Set to `false` to hide                                |
| `Tabs`        | `activeTabIndex`     | `selected`           | Use tab `value` prop to identify tabs                 |
| `Tabs`        | `onSelect`           | `onChange`           | —                                                     |
| `Tabs`        | `lazy`               | removed              | v6 tabs are always lazy                               |
| `ProgressBar` | `now`                | `value`              | —                                                     |
| `ProgressBar` | `color`              | removed              | Use CSS custom properties for color                   |
| `ProgressBar` | `striped`            | removed              | Not available in v6                                   |
| `ProgressBar` | `animated`           | removed              | Not available in v6                                   |

## IDS v4 React → IDS v6 React Prop Changes (Verified against v4 source)

The v4 React wrappers (`@iress/components-react`) automatically convert Stencil's kebab-case props to camelCase and map custom events to React callback props (e.g., `iressModalEntered` → `onEntered`). This section documents the v4 React API compared to v6.

### Button

| v4 React prop     | v6 React prop      | Notes                                                                                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | `mode`             | v4 values: `primary`, `secondary`, `tertiary`, `link`, `danger`, `positive`, `negative` → v6: `primary`, `secondary`, `tertiary`, `quaternary`, `muted` |
| `mode="link"`     | removed            | Use `mode="tertiary"` or `IressLink` component                                                                                                          |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                                                                                                                         |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                                                                                                                         |
| `mode="negative"` | removed            | Use `status="danger"` instead                                                                                                                           |
| `loading`         | `loading`          | Unchanged                                                                                                                                               |
| `loadingText`     | `loading` (string) | v6 accepts boolean or string for loading                                                                                                                |
| `fluid`           | `fluid`            | Unchanged                                                                                                                                               |
| `noWrap`          | `noWrap`           | Unchanged                                                                                                                                               |
| `href`            | `href`             | Unchanged                                                                                                                                               |
| `onClick`         | `onClick`          | Unchanged                                                                                                                                               |
| slot `icon-only`  | `icon` prop        | v6 uses `icon` prop for icon-only buttons                                                                                                               |
| slot `prepend`    | `prepend` prop     | v6 uses prop instead of slot                                                                                                                            |
| slot `append`     | `append` prop      | v6 uses prop instead of slot                                                                                                                            |

### Alert

| v4 React prop    | v6 React prop     | Notes                                                                                             |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `status`         | `status`          | v4: `error`, `warning`, `success`, `info` → v6: `danger`, `warning`, `success`, `info`, `neutral` |
| `status="error"` | `status="danger"` | Value renamed                                                                                     |
| `headingText`    | `heading`         | Prop renamed                                                                                      |
| `headingLevel`   | removed           | v6 auto-handles heading level                                                                     |
| slot `footer`    | `actions` prop    | v6 uses `actions` array for buttons                                                               |

### Modal

| v4 React prop          | v6 React prop          | Notes                                              |
| ---------------------- | ---------------------- | -------------------------------------------------- |
| `show`                 | `show`                 | Unchanged                                          |
| `size`                 | `size`                 | v4 allowed responsive array → v6 single value only |
| `closeText`            | `closeText`            | Unchanged                                          |
| `fixedFooter`          | `fixedFooter`          | Unchanged                                          |
| `disableBackdropClick` | `disableBackdropClick` | Unchanged                                          |
| `noCloseButton`        | `noCloseButton`        | Unchanged                                          |
| `padding`              | `p` (styling prop)     | Use styling prop instead                           |
| `onEntered`            | `onEntered`            | Unchanged                                          |
| `onExited`             | `onExited`             | Unchanged                                          |
| slot `footer`          | `footer` prop          | v6 uses prop instead of slot                       |

### Slideout

| v4 React prop | v6 React prop | Notes                                  |
| ------------- | ------------- | -------------------------------------- |
| `show`        | `show`        | Unchanged                              |
| `eleToPush`   | `eleToPush`   | Unchanged                              |
| `mode`        | `mode`        | Unchanged (`overlay`, `push`)          |
| `closeText`   | `closeText`   | Unchanged                              |
| `padding`     | removed       | Use `p` styling prop on content        |
| `position`    | `position`    | Unchanged                              |
| `size`        | `size`        | Unchanged                              |
| `backdrop`    | removed       | v6 always has backdrop in overlay mode |
| `onEntered`   | `onEntered`   | Unchanged                              |
| `onExited`    | `onExited`    | Unchanged                              |
| slot `footer` | `footer` prop | v6 uses prop instead of slot           |

### Panel

| v4 React prop    | v6 React prop         | Notes                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| `background`     | `bg`                  | v4: `default`, `alt`, `transparent` → v6: `alt`, token values |
| `padding`        | `p` (styling prop)    | Use styling prop instead                                      |
| `textAlign`      | `textAlign`           | Unchanged                                                     |
| `stretch`        | `stretch`             | Unchanged (now styling prop)                                  |
| `noBorderRadius` | `borderRadius="none"` | Use `borderRadius` prop instead                               |

### Text

| v4 React prop | v6 React prop | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `variant`     | `textStyle`   | Prop renamed                 |
| `mode`        | `color`       | Prop renamed                 |
| `align`       | `textAlign`   | Prop renamed                 |
| `element`     | `element`     | Unchanged                    |
| `noGutter`    | removed       | Use `mb="none"` styling prop |

### Stack / Inline

| v4 React prop     | v6 React prop | Notes                                                        |
| ----------------- | ------------- | ------------------------------------------------------------ |
| `gutter`          | `gap`         | v4: `none`, `xs`, `sm`, `md`, `lg`, `xl` → v6 spacing tokens |
| `horizontalAlign` | `justify`     | Prop renamed (Inline only)                                   |
| `verticalAlign`   | `align`       | Prop renamed (Inline only)                                   |
| `noWrap`          | `noWrap`      | Unchanged                                                    |

### Icon

| v4 React prop      | v6 React prop      | Notes                                        |
| ------------------ | ------------------ | -------------------------------------------- |
| `name`             | `name`             | v4: FontAwesome names → v6: Material Symbols |
| `set`              | removed            | v6 uses Material Symbols only                |
| `mode`             | `color`            | Prop renamed                                 |
| `size`             | removed            | Inherits font size from parent               |
| `fixedWidth`       | removed            | Not needed with Material Symbols             |
| `spin`             | removed            | Use CSS animation instead                    |
| `rotate`           | removed            | Use CSS transform instead                    |
| `flip`             | removed            | Use CSS transform instead                    |
| `screenreaderText` | `screenreaderText` | Unchanged                                    |

### Label

| v4 React prop  | v6 React prop         | Notes                             |
| -------------- | --------------------- | --------------------------------- |
| `labelText`    | `children`            | v4 uses prop → v6 uses children   |
| `for`          | `htmlFor`             | Prop renamed                      |
| `hiddenLabel`  | `hiddenLabel`         | Unchanged                         |
| `optional`     | `required` (inverted) | Logic inverted                    |
| `optionalText` | removed               | v6 doesn't show "(optional)" text |
| `focusOn`      | removed               | Not needed in v6                  |

### Field

| v4 React prop        | v6 React prop     | Notes                                        |
| -------------------- | ----------------- | -------------------------------------------- |
| `label`              | `label`           | Unchanged                                    |
| `hiddenLabel`        | `hiddenLabel`     | Unchanged                                    |
| `hint`               | `hint`            | Unchanged                                    |
| `error`              | `errorMessages`   | Now takes array of `ValidationMessageObj`    |
| `disabledValidation` | removed           | Validation handled by `IressFormField` rules |
| `inline`             | `horizontal`      | Prop renamed                                 |
| `optionalText`       | removed           | —                                            |
| `valueMissing`       | `rules.required`  | Use `rules` prop on `IressFormField`         |
| `tooLong`            | `rules.maxLength` | Use `rules` prop on `IressFormField`         |
| `tooShort`           | `rules.minLength` | Use `rules` prop on `IressFormField`         |
| `patternMismatch`    | `rules.pattern`   | Use `rules` prop on `IressFormField`         |
| `rangeOverflow`      | `rules.max`       | Use `rules` prop on `IressFormField`         |
| `rangeUnderflow`     | `rules.min`       | Use `rules` prop on `IressFormField`         |

### Toggle

| v4 React prop | v6 React prop | Notes                                    |
| ------------- | ------------- | ---------------------------------------- |
| `checked`     | `checked`     | Unchanged                                |
| `label`       | `children`    | v4 uses prop → v6 uses children          |
| `hiddenLabel` | `hiddenLabel` | Unchanged                                |
| `layout`      | `layout`      | Unchanged                                |
| `onChange`    | `onChange`    | Unchanged (signature slightly different) |

### Badge → Pill

| v4 React prop     | v6 React prop | Notes                         |
| ----------------- | ------------- | ----------------------------- |
| Component renamed | `IressPill`   | `IressBadge` → `IressPill`    |
| `mode`            | `status`      | Prop renamed                  |
| `pill`            | removed       | v6 Pill is always pill-shaped |
| slot `host`       | removed       | Use composition instead       |

### SkipLink

| v4 React prop | v6 React prop  | Notes                                               |
| ------------- | -------------- | --------------------------------------------------- |
| `targetId`    | `href`         | Now takes full href with `#` (e.g., `href="#main"`) |
| `text`        | `children`     | v4 uses prop → v6 uses children                     |
| `customRoute` | `element` prop | Use `element` to customize rendered element         |

### Expander

| v4 React prop    | v6 React prop    | Notes                                                 |
| ---------------- | ---------------- | ----------------------------------------------------- |
| `open`           | `open`           | Unchanged                                             |
| `mode`           | `mode`           | v4: `section`, `heading`, `link` → v6: `section` only |
| `mode="heading"` | `mode="section"` | Value renamed                                         |
| slot `activator` | `activator` prop | v4 uses slot → v6 uses prop                           |
| `onChange`       | `onChange`       | Unchanged                                             |

### Tabs (TabContainer → TabSet)

| v4 React prop     | v6 React prop | Notes                                     |
| ----------------- | ------------- | ----------------------------------------- |
| Component renamed | `IressTabSet` | `IressTabContainer` → `IressTabSet`       |
| `onChange`        | `onChange`    | Unchanged                                 |
| `IressTabButton`  | `IressTab`    | Component renamed                         |
| `IressTabPanel`   | removed       | Content now passed as `IressTab` children |

## Key Architecture Changes (v4 React → v6 React)

### Package Changes

| v4 Package                    | v6 Package                                 | Notes                   |
| ----------------------------- | ------------------------------------------ | ----------------------- |
| `@iress/components-react`     | `@iress-oss/ids-components`                | Main component package  |
| `@iress/ids-react-test-utils` | `@testing-library/react`                   | Use standard RTL        |
| `@iress/components` (CSS)     | `@iress-oss/ids-components/dist/style.css` | CSS import path changed |
| `@iress/ids-themes`           | `@iress-oss/ids-tokens`                    | Design tokens package   |

### Slot → Prop Migration

v4 used `slot` attributes on children to position content inside components. This is a legacy v4 pattern that is **no longer supported** — v6 uses React props directly (`prepend`, `append`, `footer`, `icon`, `activator`, etc.).

> **⚠️ Do not copy `slot` attributes from existing code.** If you see `slot="..."` in a codebase, it is legacy v4 code that needs to be migrated. AI agents frequently propagate this pattern by matching existing code — always use the prop-based API instead.

> **⚠️ `IressShadow` does NOT mean the app uses Web Components.** AI agents commonly see `IressShadow` (which uses Shadow DOM for CSS isolation) and incorrectly conclude the application uses custom elements with `slot` attributes. This is wrong — `IressShadow` wraps an entire React app in a single shadow root on a `<div>` element for style encapsulation. All components inside `IressShadow` are standard React components. IDS has not offered Web Components since v4.

```tsx
// ❌ v4: Using slot attributes (no longer supported)
<IressButton>
  <IressIcon slot="prepend" name="search" />
  Search
</IressButton>

// ✅ v6: Using props
<IressButton prepend={<IressIcon name="search" />}>
  Search
</IressButton>
```

```tsx
// ❌ v4: Modal footer slot (no longer supported)
<IressModal show={show}>
  Content
  <div slot="footer">
    <IressButton>Close</IressButton>
  </div>
</IressModal>

// ✅ v6: Modal footer prop
<IressModal
  show={show}
  footer={<IressButton>Close</IressButton>}
>
  Content
</IressModal>
```

### Event Callback Changes

v4 React wrappers mapped Stencil custom events to React callback props. Most remain the same in v6, but some have changed:

| v4 Callback     | v6 Callback     | Notes                            |
| --------------- | --------------- | -------------------------------- |
| `onClick`       | `onClick`       | Unchanged                        |
| `onChange`      | `onChange`      | Unchanged (signature may differ) |
| `onBlur`        | `onBlur`        | Unchanged                        |
| `onFocus`       | `onFocus`       | Unchanged                        |
| `onEntered`     | `onEntered`     | Unchanged                        |
| `onExited`      | `onExited`      | Unchanged                        |
| `onActivated`   | `onActivated`   | Unchanged                        |
| `onDeactivated` | `onDeactivated` | Unchanged                        |
| `onClear`       | `onClear`       | Unchanged                        |

### Test Utility Migration

v4 provided `@iress/ids-react-test-utils` with `idsFireEvent` for testing custom events. v6 uses standard React Testing Library.

```tsx
// ❌ v4: Using idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });
idsFireEvent.entered(modal);
idsFireEvent.blur(field, { target: { value: 'test' } });

// ✅ v6: Using standard RTL
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

await userEvent.type(input, 'test');
fireEvent.transitionEnd(modal); // or wait for onEntered callback
await userEvent.tab(); // for blur
```

### Helper Function Migration

v4 provided helper functions in `@iress/components-react`. These are no longer needed in v6.

| v4 Helper                   | v6 Replacement                               |
| --------------------------- | -------------------------------------------- |
| `mapCheckboxGroupOptions()` | Use `<IressCheckbox>` children directly      |
| `mapRadioGroupOptions()`    | Use `<IressRadio>` children directly         |
| `mapSelectOptions()`        | Use `options` prop on `IressSelect`          |
| `mapTabs()`                 | Use `<IressTab>` children directly           |
| `mapMenuItems()`            | Use `<IressMenuItem>` children directly      |
| `showModal(id)`             | Use `show` prop or `useModal` hook           |
| `showSlideout(id)`          | Use `show` prop or `useSlideout` hook        |
| `rowData(arr, ref)`         | Pass `rowData` prop directly to `IressTable` |

Most common renames:

| Component               | Old prop (OUI) | New prop (v6)  |
| ----------------------- | -------------- | -------------- |
| `Alert`                 | `context`      | `status`       |
| `Modal`                 | `onHide`       | `onShowChange` |
| `Fieldset`/`RadioGroup` | `legend`       | `label`        |
| `Label`                 | `optional`     | `required`     |

| Component (IDS v4/v5)      | Old prop     | New prop (v6)  |
| -------------------------- | ------------ | -------------- |
| `IressButton`              | `variant`    | `mode`         |
| `IressAlert`               | `variant`    | `status`       |
| `IressModal`               | `isOpen`     | `show`         |
| `IressModal`               | `onClose`    | `onShowChange` |
| `IressModal`               | `title`      | `heading`      |
| `IressPanel`               | `background` | `bg`           |
| `IressStack`/`IressInline` | `gutter`     | `gap`          |

### Form migration (Formik → React Hook Form)

The most significant architectural change. Forms use `IressForm` + `IressFormField` with `render` prop, replacing Formik's `<Field as={...}>` pattern. Yup schemas become per-field `rules` props.

See references/form-migration.md for validation mapping, before/after examples, and common patterns.

# Form Migration (Formik → React Hook Form)

The most significant architectural change in IDS v6. Forms use `IressForm` + `IressFormField` with a `render` prop pattern, replacing Formik's `<Field as={...}>` approach. Validation moves from Yup schemas to per-field `rules` props (React Hook Form rules).

## Validation migration (Yup → rules)

| Yup                      | React Hook Form `rules`                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| `.required('msg')`       | `required: 'msg'`                                                      |
| `.min(n, 'msg')`         | `minLength: { value: n, message: 'msg' }`                              |
| `.max(n, 'msg')`         | `maxLength: { value: n, message: 'msg' }`                              |
| `.email('msg')`          | `pattern: { value: /emailRegex/, message: 'msg' }`                     |
| `.matches(regex, 'msg')` | `pattern: { value: regex, message: 'msg' }`                            |
| `.positive('msg')`       | `validate: { positive: (v) => v > 0 \|\| 'msg' }`                      |
| `.integer('msg')`        | `validate: { integer: (v) => Number.isInteger(Number(v)) \|\| 'msg' }` |

## Full before/after example

**Before (Formik + OUI):**

```tsx
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Label, FormGroup, Button } from '@iress/oui';

const schema = Yup.object({
  email: Yup.string().email('Invalid').required('Required'),
});

function MyForm() {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={schema}
      onSubmit={handle}
    >
      {({ errors, touched }) => (
        <Form>
          <FormGroup>
            <Label htmlFor="email" label="Email" />
            <Field name="email" as={Input} type="email" />
            {errors.email && touched.email && <span>{errors.email}</span>}
          </FormGroup>
          <Button type="submit" mode={Button.Mode.Primary} label="Submit" />
        </Form>
      )}
    </Formik>
  );
}
```

**After (IDS v6):**

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

function MyForm() {
  return (
    <IressForm defaultValues={{ email: '' }} onSubmit={handle}>
      <IressFormField
        name="email"
        label="Email"
        render={(field) => <IressInput {...field} type="email" />}
        rules={{
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid',
          },
        }}
      />
      <IressButton type="submit" mode="primary">
        Submit
      </IressButton>
    </IressForm>
  );
}
```

## Common form patterns

> **Note:** The `render` prop receives two arguments: `(field, state)`. The `field` object contains the control props (value, onChange, etc.), and `state` contains form state info (errors, isDirty, etc.). For simple cases, you only need the first argument.

**Simple form field:**

```tsx
<IressFormField
  name="fieldName"
  label="Field Label"
  render={(field) => <IressInput {...field} />}
  rules={{ required: 'Required' }}
/>
```

**Field group (replacing Fieldset):**

```tsx
<IressFieldGroup label="Personal details">
  <IressFormField
    name="first"
    label="First name"
    render={(field) => <IressInput {...field} />}
  />
  <IressFormField
    name="last"
    label="Last name"
    render={(field) => <IressInput {...field} />}
  />
</IressFieldGroup>
```

**Radio group:**

```tsx
<IressFormField
  name="preference"
  label="Preference"
  render={(field) => (
    <IressRadioGroup {...field}>
      <IressRadio value="a">Option A</IressRadio>
      <IressRadio value="b">Option B</IressRadio>
    </IressRadioGroup>
  )}
/>
```

**Modal with form:**

```tsx
<IressModal show={isOpen} onShowChange={setIsOpen} heading="Edit item">
  <IressForm onSubmit={handleSubmit}>
    <IressFormField
      name="name"
      label="Name"
      render={(field) => <IressInput {...field} />}
    />
    <IressButton type="submit" mode="primary">
      Save
    </IressButton>
  </IressForm>
</IressModal>
```

Quick example:

```tsx
<IressForm defaultValues={{ email: '' }} onSubmit={handle}>
  <IressFormField
    name="email"
    label="Email"
    render={(props) => <IressInput {...props} type="email" />}
    rules={{ required: 'Required' }}
  />
  <IressButton type="submit" mode="primary">
    Submit
  </IressButton>
</IressForm>
```

### Testing migration

IDS v6 uses standard React Testing Library — no special test utilities. Replace `idsFireEvent` with `fireEvent`/`userEvent`, remove `mockLazyLoadedComponents`, prefer `getByRole`/`getByLabelText` over `getByTestId`.

See references/testing-migration.md for import changes, pattern mapping, config updates, and form test examples.

# Testing Migration

IDS v6 uses standard React Testing Library — no special test utilities needed.

## Remove IDS v4 React test utilities

v4 provided `@iress/ids-react-test-utils` with custom helpers for testing Stencil web component wrappers. These are no longer needed in v6.

```ts
// ❌ Remove v4 test utils
import { 
  idsFireEvent, 
  mockLazyLoadedComponents,
  componentLoad 
} from '@iress/ids-react-test-utils';

// ✅ Use standard RTL
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

## idsFireEvent Migration

v4's `idsFireEvent` was needed to fire custom Stencil events. v6 uses standard React events.

| v4 `idsFireEvent` method             | v6 Replacement                                       |
| ------------------------------------ | ---------------------------------------------------- |
| `idsFireEvent.click(el)`             | `await userEvent.click(el)`                          |
| `idsFireEvent.change(el, { target: { value } })` | `await userEvent.type(el, value)` or `fireEvent.change(el, { target: { value } })` |
| `idsFireEvent.blur(el)`              | `await userEvent.tab()` or `fireEvent.blur(el)`      |
| `idsFireEvent.focus(el)`             | `await userEvent.click(el)` or `fireEvent.focus(el)` |
| `idsFireEvent.entered(modal)`        | Wait for `onEntered` callback or use `waitFor`       |
| `idsFireEvent.exited(modal)`         | Wait for `onExited` callback or use `waitFor`        |
| `idsFireEvent.select(el, detail)`    | Use `onChange` callback testing                      |
| `idsFireEvent.submit(form, data)`    | `await userEvent.click(submitButton)`                |
| `idsFireEvent.error(form, messages)` | Test validation via form submission                  |

### Before/After Examples

```tsx
// ❌ v4: Testing modal entered
import { idsFireEvent } from '@iress/ids-react-test-utils';

const onEntered = jest.fn();
render(<IressModal show onEntered={onEntered} />);
const modal = screen.getByRole('dialog');
idsFireEvent.entered(modal);
expect(onEntered).toHaveBeenCalled();

// ✅ v6: Testing modal entered
const onEntered = jest.fn();
render(<IressModal show onEntered={onEntered} />);
await waitFor(() => expect(onEntered).toHaveBeenCalled());
```

```tsx
// ❌ v4: Testing input change
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });

// ✅ v6: Testing input change
await userEvent.type(input, 'test');
// or
fireEvent.change(input, { target: { value: 'test' } });
```

## Remove mockLazyLoadedComponents

v4 required mocking lazy-loaded Stencil components. v6 components load synchronously.

```ts
// ❌ v4: Required for async component loading
import { mockLazyLoadedComponents } from '@iress/ids-react-test-utils';

beforeEach(() => {
  mockLazyLoadedComponents();
});

// ✅ v6: Not needed — remove entirely
```

## Test pattern changes

| v4 pattern                           | v6 pattern                                           |
| ------------------------------------ | ---------------------------------------------------- |
| `idsFireEvent.click(el)`             | `await userEvent.click(el)`                          |
| `await findByTestId('x__button')`    | `getByRole('button', { name: 'X' })`                 |
| `mockLazyLoadedComponents()`         | Remove — components load synchronously               |
| Async `findBy*` for component render | Synchronous `getBy*` in most cases                   |
| `componentLoad()`                    | Remove — not needed                                  |

## Prefer accessibility queries

```ts
// ❌ Old: brittle test IDs
screen.getByTestId('submit-button');

// ✅ New: accessible queries
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');
```

## Update Jest config (not needed for Vitest)

If using **Jest** (not Vitest), add IDS packages to the transform allowlist:

```ts
// Jest only — Vitest handles ESM natively and does not need this
transformIgnorePatterns: [
  'node_modules/(?!(@iress-oss/ids-components|@iress-oss/ids-tokens)/)',
],
```

## Form test migration

```tsx
// ❌ v4: Testing with IressForm and idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

render(
  <IressForm onSubmit={mockSubmit}>
    <IressField label="Name">
      <IressInput name="name" />
    </IressField>
    <IressButton type="submit">Submit</IressButton>
  </IressForm>
);

const input = screen.getByLabelText('Name');
idsFireEvent.change(input, { target: { value: 'Test' } });
idsFireEvent.submit(form, { name: 'Test' });

// ✅ v6: Testing with IressForm and userEvent
render(
  <IressForm defaultValues={{ name: '' }} onSubmit={mockSubmit}>
    <IressFormField
      name="name"
      label="Name"
      render={(field) => <IressInput {...field} />}
    />
    <IressButton type="submit">Submit</IressButton>
  </IressForm>,
);

await userEvent.type(screen.getByRole('textbox', { name: 'Name' }), 'Test');
await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
expect(mockSubmit).toHaveBeenCalledWith({ name: 'Test' });
```

### Styling migration

OUI CSS classes and IDS v4 Stencil classes are removed. Use styling props (`p`, `m`, `bg`, `gap`, `scrollable`) or design tokens (`var(--iress-*)`). Declare `@layer` order if custom CSS is overridden.

See references/styling-migration.md for examples and AG Grid migration.

# Styling Migration

## CSS class changes

```css
/* ❌ OUI classes — removed */
.oui-button {
}

/* ❌ IDS v4 Stencil classes — removed */
.sc-iress-button-h {
}

/* ✅ IDS v6 — use styling props or design tokens */
```

## Styling props

IDS v6 exposes styling props on every component:

```tsx
// Spacing
<IressPanel p="lg" m="xl" />

// Responsive
<IressPanel p={{ base: 'sm', xl: 'lg' }} />

// Colour
<IressPanel bg="alt" />

// Scrollable
<IressPanel scrollable="y" style={{ maxHeight: '400px' }}>
  <LongContent />
</IressPanel>
```

## Design tokens for custom styles

Prefer the type-safe `cssVars` object from `@iress-oss/ids-tokens` — it gives you autocomplete and compile-time checking:

```tsx
import { cssVars } from '@iress-oss/ids-tokens';

// ✅ Preferred — type-safe cssVars
<div
  style={{
    color: cssVars.colour.primary.text,
    padding: cssVars.spacing[4],
  }}
/>;
```

If you need to reference tokens in plain CSS (e.g. a `.css` file or CSS-in-JS template string), fall back to CSS custom properties (note: uses British spelling `colour`, numeric spacing keys):

```css
/* Fallback — plain CSS custom properties */
.custom-element {
  color: var(--iress-colour-primary-text);
  padding: var(--iress-spacing-4);
}
```

## Cascade layers

All IDS v6 CSS lives in cascade layers. Declare layer order if your own CSS is being overridden:

```css
@layer reset, base, tokens, recipes, utilities;
```

## AG Grid migration

```tsx
// ❌ Old (v5)
import { IressAgGridContainer } from '@iress/ids-themes';

<IressAgGridContainer>
  <AgGridReact {...gridProps} />
</IressAgGridContainer>;

// ✅ New (v6) — minimum AG Grid version 33
import { getAgGridThemeProps } from '@iress/ids-themes';

<AgGridReact {...getAgGridThemeProps()} {...gridProps} />;
```

---

## Post-Migration Validation

After completing migration, run `scripts/validate-migration.sh` or verify manually:

1. **Automated checks**: Run validation script to check for common issues
2. **Visual regression**: Run VRT suite and review all visual diffs (see references/visual-regression-testing.md)

# Visual Regression Testing for Migration

Visual regression testing (VRT) is highly recommended for IDS v6 migration to catch styling and layout changes that automated checks miss.

## Why VRT for Migration?

IDS v6 introduces significant styling changes:
- New CSS architecture (Panda CSS)
- Different default spacing/sizing
- Icon system change (FontAwesome → Material Symbols)
- Component visual updates (shadows, borders, colors)

VRT catches these before users do.

## Recommended: Playwright VRT

Playwright has built-in visual comparison with minimal setup.

### Automated Setup

The migration skill includes a script that auto-detects your routing framework and generates tests:

```bash
.agents/skills/version-migration/scripts/setup-playwright-vrt.sh
```

This script:
- Detects **React Router** or **Next.js** (App Router / Pages Router)
- Finds all static routes in your application
- Generates Playwright config and test suite
- Creates tests for each route + interactive components
- Includes responsive viewport tests

**Supported frameworks:**
- React Router (v5, v6)
- Next.js App Router
- Next.js Pages Router

Dynamic routes (with `:param` or `[param]`) are skipped automatically.

### Manual Setup

If you prefer manual setup or use a different router:

```bash
# Install Playwright
npm install -D @playwright/test

# Initialize (creates playwright.config.ts)
npx playwright install
```

### Basic Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
  // Generate baseline screenshots
  updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true' ? 'all' : 'none',
});
```

### Pre-Migration: Capture Baselines

Before migrating, the setup script has already generated route-based tests. Just capture baselines:

```typescript
// e2e/components.spec.ts
import { test, expect } from '@playwright/test';

test('button variants', async ({ page }) => {
  await page.goto('/components/button');
  await expect(page).toHaveScreenshot('button-variants.png');
});

test('form validation', async ({ page }) => {
  await page.goto('/forms/example');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveScreenshot('form-validation.png');
});

test('modal open', async ({ page }) => {
  await page.goto('/components/modal');
  await page.getByRole('button', { name: 'Open Modal' }).click();
  await page.waitForSelector('[role="dialog"]');
  await expect(page).toHaveScreenshot('modal-open.png');
});
```

```bash
UPDATE_SNAPSHOTS=true npx playwright test
```

This creates `e2e/components.spec.ts-snapshots/` with baseline images for all detected routes.

If you need to add custom tests, edit `e2e/components.spec.ts`:

### Post-Migration: Compare

After migrating to v6, run tests without `UPDATE_SNAPSHOTS`:

```bash
npx playwright test
```

Playwright will:
- Compare new screenshots to baselines
- Fail tests if differences exceed threshold
- Generate diff images showing changes

### Review Differences

```bash
# Open HTML report with visual diffs
npx playwright show-report
```

Review each diff:
- ✅ **Expected changes**: Update baseline (`UPDATE_SNAPSHOTS=true`)
- ❌ **Regressions**: Fix the component/styling

## Alternative: Chromatic (Storybook)

If using Storybook, Chromatic provides automated VRT:

```bash
# Install
npm install -D chromatic

# Capture baseline (before migration)
npx chromatic --project-token=<token>

# After migration, run again
npx chromatic --project-token=<token>
```

Chromatic shows visual diffs in a web UI.

## What to Test

The auto-generated test suite covers:

1. **All static routes**: Every page in your app (excluding dynamic routes)
2. **Interactive components**: Buttons, forms, modals (auto-detected)
3. **Responsive layouts**: Mobile, tablet, desktop viewports

Additional priority components to add manually:

1. **Forms**: Inputs, validation states, error messages
2. **Modals/Slideouts**: Overlays, positioning, backdrop
3. **Buttons**: All modes, loading states, icons
4. **Alerts**: All status variants
5. **Tables**: Headers, rows, sorting indicators
6. **Navigation**: Menus, tabs, breadcrumbs
7. **Layout**: Spacing, responsive breakpoints

## Tips

- **Test critical user flows**, not every component variation
- **Use consistent viewport sizes** (e.g., 1280x720)
- **Wait for animations** to complete before screenshots
- **Mask dynamic content** (timestamps, random IDs)
- **Set threshold** for acceptable pixel differences (e.g., 0.2%)

## Playwright VRT Script

Use `scripts/setup-playwright-vrt.sh` to generate a starter test suite based on your component usage.

## Integration with CI

```yaml
# .github/workflows/vrt.yml
name: Visual Regression Tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm start & npx wait-on http://localhost:3000
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## When to Update Baselines

Update baselines when:
- ✅ Visual change is intentional (design update)
- ✅ Component behavior improved (better accessibility)
- ✅ Layout fix (responsive improvement)

Don't update when:
- ❌ Unexpected spacing change
- ❌ Missing styles
- ❌ Broken layout
- ❌ Wrong colors/icons

## Post-Migration Checklist

- [ ] Run VRT suite
- [ ] Review all visual diffs
- [ ] Fix regressions
- [ ] Update baselines for intentional changes
- [ ] Document visual changes in PR
- [ ] Get design team approval for significant changes
3. **Visual check**: All components render without console errors or warnings
4. **Form functionality**: Submit forms and verify validation rules work correctly
5. **Test suite**: All tests pass with new testing patterns (no `idsFireEvent`, etc.)
6. **Accessibility**: Keyboard navigation and screen reader functionality intact
7. **Styling**: No missing styles, check responsive breakpoints
8. **Interactive states**: Hover, focus, disabled, loading states work as expected
9. **Build**: Production build completes without errors, check bundle size

The validation script checks for:

- Old imports (`@iress/oui`, `@iress/components-react`)
- Old test utils (`idsFireEvent`, `mockLazyLoadedComponents`)
- Deprecated props (`variant=`, `isOpen=`, `gutter=`, etc.)
- Required CSS import
- Remaining Formik usage

---

## Common Gotchas

See references/common-gotchas.md for a comprehensive troubleshooting guide covering:

# Common Gotchas

## Critical Breaking Changes

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| Components have no styles            | Missing CSS import                               | Add `import '@iress-oss/ids-components/dist/style.css'` to app entry |
| Form validation not working          | Using HTML5 attributes (`required`, `maxLength`) | Move validation to `rules` prop on `IressFormField`                  |
| Modal won't close                    | Using `isOpen` prop (IDS v4/v5)                  | Rename to `show`                                                     |
| Button variant not applying          | Using `variant` prop (IDS v4/v5)                 | Rename to `mode`                                                     |
| Tests fail "Cannot find module"      | Jest can't transform IDS v6                      | Update `transformIgnorePatterns`                                     |
| `idsFireEvent` not found             | Using removed IDS v4 test utils                  | Replace with standard `fireEvent` from RTL                           |

## IDS v4 React → v6 React Gotchas

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| `idsFireEvent` not found             | v4 test utils removed                            | Use standard `fireEvent`/`userEvent` from RTL                        |
| `mockLazyLoadedComponents` not found | v4 test utils removed                            | Not needed — v6 components load synchronously                        |
| Slots not rendering                  | v4 uses slots, v6 uses props                     | `<div slot="footer">` → `footer={<div>}` prop                        |
| `mapRadioGroupOptions` not found     | v4 helper removed                                | Use `<IressRadio>` children directly                                 |
| `mapCheckboxGroupOptions` not found  | v4 helper removed                                | Use `<IressCheckbox>` children directly                              |
| `mapTabs` not found                  | v4 helper removed                                | Use `<IressTab>` children directly                                   |
| `showModal(id)` not found            | v4 helper removed                                | Use `show` prop or `useModal` hook                                   |
| Button `mode="link"` not working     | Mode removed                                     | Use `mode="tertiary"` or `IressLink` component                       |
| Button `mode="danger"` not working   | Mode removed                                     | Use `status="danger"` with any mode                                  |
| Button `mode="positive"` not working | Mode removed                                     | Use `status="success"` with any mode                                 |
| Alert `status="error"` not working   | Value renamed                                    | Use `status="danger"` instead                                        |
| Icon `name` not working              | v4 uses FontAwesome, v6 uses Material Symbols    | Replace FA icon names with Material Symbol names                     |
| Icon `set` prop not working          | Prop removed                                     | v6 uses Material Symbols only                                        |
| Label `labelText` not working        | v4 uses prop, v6 uses children                   | `<IressLabel>Text</IressLabel>` instead of `labelText="Text"`        |
| Field validation props not working   | v4 inline validation removed                     | Use `rules` prop on `IressFormField`                                 |
| Panel `noBorderRadius` not working   | Prop changed                                     | Use `borderRadius="none"` instead                                    |
| Expander `mode="heading"` not working| Value renamed                                    | Use `mode="section"` instead                                         |
| SkipLink `targetId` not working      | Prop renamed                                     | Use `href="#targetId"` instead                                       |
| TabContainer not found               | Component renamed                                | Use `IressTabSet` instead                                            |
| TabButton/TabPanel not found         | Components merged                                | Use `IressTab` with children for content                             |

## OUI-Specific Gotchas

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| OUI Alert `context` not working      | Prop renamed                                     | Use `status` (e.g. `status="danger"` not `context="danger"`)         |
| OUI Alert `contextLabel` missing     | Prop removed in v6                               | Alert now auto-generates context labels; remove prop                 |
| OUI Button children not rendering    | OUI uses `label` prop, v6 uses `children`        | Move `label="Submit"` to `<IressButton>Submit</IressButton>`         |
| OUI Label not rendering text         | OUI uses `label` prop, v6 uses `children`        | Use `<IressLabel>Text</IressLabel>` or `IressFormField` `label` prop |
| OUI Modal `onHide` not firing        | Prop renamed                                     | Use `onShowChange` callback                                          |
| OUI Fieldset `legend` not showing    | Prop renamed                                     | Use `label` prop on `IressFieldGroup`                                |
| OUI RadioGroup `legend` not showing  | Prop renamed                                     | Use `label` prop on `IressFormField` wrapping `IressRadioGroup`      |
| OUI Toggle `legend` not showing      | Prop renamed                                     | Use `children` prop on `IressToggle`                                 |
| OUI Scrollable not working           | Component removed                                | Use `scrollable="y"` styling prop on any component                   |
| OUI ProgressBar not rendering        | Component renamed                                | Use `IressProgress` instead                                          |
| OUI Badge not rendering              | Component renamed                                | Use `IressPill` instead                                              |

## Component API Changes

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| Form fields render without labels    | Using standalone `<Label>`                       | Move label text into `label` prop on `IressFormField`                |
| Custom CSS overriding components     | Cascade layer ordering                           | Declare `@layer` order in stylesheet                                 |
| `IressPanel alt` prop not working    | No boolean `alt` prop exists                     | Use `bg="alt"` instead                                               |
| `IressAlert mode` not working        | Prop was renamed                                 | Use `status` (e.g. `status="danger"`)                                |
| `IressFieldGroup legend` not working | Prop was renamed                                 | Use `label` instead                                                  |
| `IressButton link` mode not working  | Mode removed                                     | Use `mode="tertiary"` or `IressLink` for paragraph links             |
| `IressButton danger` mode not working| Mode removed                                     | Use `status="danger"` with any mode                                  |
| `IressInput` not in form context     | v6 inputs work standalone but forms need wrapper | Wrap with `IressFormField` inside `IressForm`                        |
| `IressCheckbox` checked not updating | Using `defaultChecked` in controlled mode        | Use `checked` prop for controlled, `defaultChecked` for uncontrolled |
| `IressRadioGroup` options prop gone  | API changed to composition pattern               | Use `IressRadio` children instead of `options` array                 |
| `IressToggle` `toggled` prop gone    | Prop renamed                                     | Use `checked` or `defaultChecked`                                    |
| `IressToggle` `labelTrue/False` gone | API simplified                                   | Use `children` for label; toggle is now binary switch                |
| `IressSlider` `label` prop gone      | API changed                                      | Use `aria-label` or wrap in `IressFormField`                         |
| `IressTabs` `activeTabIndex` gone    | API changed                                      | Use `selected`/`defaultSelected` with tab `value` props              |
| `IressSelect` options format changed | Now uses `LabelValueMeta` objects                | Use `{ label: 'Text', value: 'val' }` format                         |
| `IressSelect` `value` not selecting | Passing a string instead of `LabelValueMeta`     | v6 now accepts plain strings for `value`/`defaultValue` — ensure the string matches an option's `value` field. A console warning is logged if the value can't be resolved against the available options |
| `IressPopover` content has extra padding | Default padding added in v6                  | Popover content now has `padding: spacing.4` by default. Override with `contentStyle={{ padding: 'spacing.0' }}` if you were providing your own inner padding |
| `IressReadonly` CSS selectors broken | DOM structure changed                            | Inner content is now wrapped in an additional `wrapper` div inside `root`. Update CSS selectors targeting direct children of the readonly root element |
| Form control `readOnly` type changed | `readOnly` now accepts `boolean \| 'locked'`    | Use `readOnly="locked"` when the field is read-only due to permissions. This applies locked styling via `IressReadonly variant="locked"` |
| `IressModal` `title` not rendering   | Prop renamed                                     | Use `heading` prop                                                   |
| `IressSlideout` `eleToPush` selector | Needs valid CSS selector or element ref          | Pass string selector, HTMLElement, or React ref                      |

## Form Architecture Changes

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| Formik `<Field as={}>` not working   | Formik replaced with React Hook Form             | Use `IressFormField` with `render` prop                              |
| Yup schema validation not working    | Yup replaced with RHF rules                      | Convert to `rules` prop (see form-migration.md)                      |
| `useFormikContext` not available     | Formik removed                                   | Use `useFormContext` from `react-hook-form`                          |
| Form `initialValues` not working     | Prop renamed                                     | Use `defaultValues` on `IressForm`                                   |
| Form `validationSchema` not working  | Yup integration removed                          | Use per-field `rules` on `IressFormField`                            |
| `setFieldValue` not available        | Formik API removed                               | Use `setValue` from `useFormContext` or form ref                     |
| Form errors not displaying           | Error handling changed                           | Errors auto-display via `IressFormField`; use `errorMessages` prop   |

- Critical breaking changes (missing CSS, validation, renamed props)
- IDS v4 React → v6 React gotchas (test utils, slots, helpers, icons)
- OUI-specific gotchas (prop renames, removed components)
- Component API changes (form fields, styling, composition patterns)
- Form architecture changes (Formik → React Hook Form)

---

## Cross-References

### Generated migration guides (read these for full details)

- **v4→v5** — `node_modules/@iress-oss/ids-components/.ai/guides/migration-guides-v5.md`
- **v5→v6** — `node_modules/@iress-oss/ids-components/.ai/guides/migration-guides-v6.md`
- **OUI→v6** — `node_modules/@iress-oss/ids-components/.ai/guides/migration-guides-oui.md`

### Component and pattern docs

- **Component docs** — `node_modules/@iress-oss/ids-components/.ai/components/`
- **Pattern docs** — `node_modules/@iress-oss/ids-components/.ai/patterns/`
- **Index** — `node_modules/@iress-oss/ids-components/.ai/index.json`

### Related skills

- **token-usage** — Design token usage patterns
- **ui-translation** — Building new IDS v6 UIs from scratch
- **ui-doctor** — Auditing IDS compliance

## Reference

- **Storybook and Guidelines:** https://main--691abcc79dfa560a36d0a74f.chromatic.com
