---
name: ui-translation
description: >
  Translate natural language UI descriptions into IDS (Iress Design System)
  component implementations using @iress-oss/ids-components and
  @iress-oss/ids-tokens. Use when the user describes a UI in plain language
  and wants IDS component code, or asks to build a form, page, layout, or
  component using IDS.
license: Apache-2.0
compatibility: React 18+, TypeScript, @iress-oss/ids-components@alpha
metadata:
  author: iress
  version: "1.0"
---

# Skill: UI Translation

## Purpose

Translate natural language UI descriptions into IDS (Iress Design System) component implementations using `@iress-oss/ids-components` and `@iress-oss/ids-tokens`.

## Translation Workflow

1. **Identify the UI elements** — Break the description into components: actions (buttons), inputs (fields), layout (stacks, grids), content (text, cards), overlays (modals, slideouts), navigation
2. **Map to IDS components** — Use the [component mapping](references/component-mapping.md) to find the right IDS component for each element
3. **Apply layout** — Wrap elements in `IressStack` (vertical), `IressInline` (horizontal), or `IressRow`/`IressCol` (grid). Always make grids responsive with `span={{ xs: 12, md: ... }}`
4. **Add responsive behaviour** — Even if the description only mentions desktop, stack columns on mobile and relocate secondary content to `IressSlideout` or collapsible sections
5. **Apply styling** — Use [styling props](references/styling-props.md) for spacing, colour, and typography. Use spacing tokens (0–10) for `gap` props
6. **Verify output** — Check that all imports resolve, no raw HTML is used where IDS components exist, grid layouts use responsive `span` values, and no common anti-patterns are present (disabled buttons, slot attributes, redundant textStyle)

## Setup

> **Important:** IDS v6 is currently in alpha. Install with the `@alpha` tag:
>
> ```bash
> npm install @iress-oss/ids-components@alpha
> # If using tokens directly:
> npm install @iress-oss/ids-tokens@alpha
> ```

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

## Component Mapping

When you need to find the right IDS component for a UI element, read [references/component-mapping.md](references/component-mapping.md) for the full description → IDS component mapping tables (actions, form inputs, layout, content, overlays, navigation, tables).

## Styling Props

When you need to apply spacing, colour, visibility, or typography props, read [references/styling-props.md](references/styling-props.md) for the full `IressCSSProps` reference and accepted values.

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
    <IressStack gap="4">
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
import {
  IressCard,
  IressButton,
  IressInline,
  IressText,
} from '@iress-oss/ids-components';

function ActionCard() {
  return (
    <IressCard>
      <IressCard.Header>
        <IressText element="h3">Card Title</IressText>
      </IressCard.Header>
      <IressCard.Body>
        <IressText>
          This is the card description with supporting details.
        </IressText>
      </IressCard.Body>
      <IressCard.Footer>
        <IressInline gap="2">
          <IressButton mode="primary">Confirm</IressButton>
          <IressButton mode="secondary">Cancel</IressButton>
        </IressInline>
      </IressCard.Footer>
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
} from '@iress-oss/ids-components';

function SettingsPage() {
  return (
    <IressStack gap="6">
      <IressText element="h2">Settings</IressText>
      <IressToggle label="Enable notifications" />
      <IressDivider />
      <IressCheckboxGroup label="Notification types">
        <IressCheckbox label="Email" value="email" />
        <IressCheckbox label="SMS" value="sms" />
        <IressCheckbox label="Push" value="push" />
      </IressCheckboxGroup>
      <IressDivider />
      <IressButton mode="primary">Save settings</IressButton>
    </IressStack>
  );
}
```

### "A dashboard with a sidebar and main content area"

Note: even though the description doesn't mention mobile, the sidebar is secondary content — on mobile it should move into a slideout so the main content gets focus.

```tsx
import {
  useState,
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
    <IressCard>
      <IressCard.Body>
        <IressStack gap="2">
          <IressText weight="strong">Navigation</IressText>
          <IressText>Menu items here</IressText>
        </IressStack>
      </IressCard.Body>
    </IressCard>
  );

  return isMobile ? (
    <IressStack gap="4">
      <IressButton
        mode="secondary"
        icon="menu"
        onClick={() => setNavOpen(true)}
      >
        Menu
      </IressButton>
      <IressCard>
        <IressCard.Body>
          <IressText element="h2">Main Content</IressText>
        </IressCard.Body>
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
          <IressCard.Body>
            <IressText element="h2">Main Content</IressText>
          </IressCard.Body>
        </IressCard>
      </IressCol>
    </IressRow>
  );
}
```

## Best Practices

1. **Always wrap in IressProvider** — Required at the root of your app for fonts and CSS variables
2. **Use IressField for all form inputs** — Provides consistent labels, hints, and validation display
3. **Use IressStack/IressInline for layout** — Prefer these over custom CSS flex/grid
4. **Use spacing tokens for gap** — Values 0–10 map to multiples of 4px
5. **Use semantic button modes** — One `primary` per section, `secondary` for most actions
6. **Always include labels** — All form inputs need accessible labels via `IressField`
7. **Use status for feedback** — `IressAlert` for inline messages, `IressModal status="danger"` for confirmation dialogs, `status` prop on buttons for danger/success
8. **Prefer IDS components** — Use `IressText` instead of raw `<p>`, `IressButton` instead of `<button>`
9. **Native elements inside `IressText` are OK** — When rendering CMS content, markdown output, or other unstructured data sources, it is acceptable to nest native HTML elements (e.g. `<p>`, `<strong>`, `<a>`, `<ul>`) inside `IressText`. This lets `IressText` provide consistent typography while allowing flexible inner content structure.
10. **Always make grid layouts responsive** — When using `IressRow`/`IressCol`, use responsive `span` values (e.g. `span={{ xs: 12, md: 6 }}`) so columns stack on mobile instead of overflowing
11. **Check the component docs** — Read the specific component doc for detailed props and patterns (`node_modules/@iress-oss/ids-components/.ai/components/`)

## Common Mistakes

For the full list of common anti-patterns (disabled buttons, redundant textStyle, legacy slot attributes, raw HTML, hardcoded values), read the [Common Mistakes guide](node_modules/@iress-oss/ids-components/.ai/guides/foundations-common-mistakes.md).

> **Note:** The Common Mistakes guide lives in `node_modules` and requires `@iress-oss/ids-components` to be installed.
