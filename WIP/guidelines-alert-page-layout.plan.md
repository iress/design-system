# Guidelines Alert Page Layout

**Created:** 2 March 2026
**Status:** Planning
**Purpose:** Define the layout for component documentation pages in the guidelines site, using Alert as the reference implementation. Inspired by Ant Design's component page layout.

---

## Reference

- **Ant Design Alert page:** https://ant.design/components/alert
- **Storybook embed docs:** https://storybook.js.org/docs/sharing/embed

---

## Design Principles

1. **Use as much MDX as possible** — components only where interactivity is needed
2. **Use IDS components** (`IressLink`, `IressTabSet`, `IressText`) — not fumadocs/Tailwind
3. **Storybook embeds for examples** — avoid duplicating stories
4. **fumadocs only for the interactive playground** in the API tab
5. **Vertical stack layout** — no two-column grid for examples
6. **Derive everything possible from frontmatter** — minimal manual URLs

---

## Frontmatter Schema

```yaml
---
title: Alert
description: "An alert displays a short, important message..."
# ── Source mapping (derives GitHub, import, Storybook URLs) ──
component: 'Alert/Alert.tsx'
propsType: 'IressAlertProps'
storybookTitle: 'Components/Alert'
# ── External links ──
figma: 'https://www.figma.com/design/FILE_ID?node-id=NODE_ID'
---
```

**Auto-derived from frontmatter:**

| Field | Derived From | Example |
|-------|-------------|---------|
| Import statement | `title` | `import { IressAlert } from '@iress-oss/ids-components';` |
| GitHub link | `component` | `https://github.com/.../components/Alert/Alert.tsx` |
| Storybook docs | `storybookTitle` | `${STORYBOOK_BASE_URL}/?path=/docs/components-alert--docs` |
| Story embed URLs | `storybookTitle` + story name | `${STORYBOOK_BASE_URL}/iframe.html?id=components-alert--status&viewMode=story` |
| CodeSandbox | Generated from story source | Auto-generated |
| Props table | `component` + `propsType` | `<auto-type-table>` |

---

## Page Structure

### 1. Header (from page.tsx layout — already exists)

Title + description from frontmatter.

### 2. Shortcut Links (ComponentLinks)

```
┌─────────────────────────────────────────────────────────────┐
│ Import   import { IressAlert } from '@iress-oss/ids-co...  │
├─────────────────────────────────────────────────────────────┤
│ Links    GitHub · Storybook · CodeSandbox                   │
└─────────────────────────────────────────────────────────────┘
```

Uses `IressLink` for all links. Import row is click-to-copy.

### 3. Tabs (IressTabSet)

Use `IressTabSet` with `IressTab` for page-level navigation:

```tsx
<IressTabSet>
  <IressTab value="development">⌨ Development</IressTab>
  <IressTab value="design">🎨 Design</IressTab>
  <IressTab value="api">📖 API</IressTab>
</IressTabSet>
```

### 4. Development Tab Content

Written primarily in MDX. Vertical stack of content.

#### When To Use / When Not To Use

Plain MDX with `IressLink` for cross-references:

```mdx
## When To Use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

### When Not To Use

- For transient messages that auto-dismiss → [Toaster](/docs/components/toaster)
- For inline field-level errors → [ValidationMessage](/docs/components/validation-message)
- For blocking confirmations → [Modal](/docs/components/modal)
```

#### Examples (Storybook Embeds)

Vertical stack. Each example is a simple MDX block with a `StorybookEmbed` component:

```mdx
### Status

The alert offers four statuses that set a distinctive colour and icon via the `status` prop.

<StorybookEmbed storyId="components-alert--status" />

**Usage:**
\`\`\`tsx
<IressAlert status="info">Info alert</IressAlert>
<IressAlert status="success">Success alert</IressAlert>
<IressAlert status="warning">Warning alert</IressAlert>
<IressAlert status="danger">Danger alert</IressAlert>
\`\`\`
```

Title and description are plain MDX headings/paragraphs. `StorybookEmbed` only handles the iframe and action links.

### 5. Design Tab

Plain MDX with Figma link:

```mdx
View the design specifications and guidelines in Figma:

<IressLink href={frontmatter.figma} target="_blank">Open in Figma →</IressLink>
```

### 6. API Tab

#### Interactive Playground
Single fumadocs `<story.WithControl />` — the only place fumadocs/Tailwind is used.

#### Props Tables
Existing `<auto-type-table>` components.

---

## Components To Create

### `ComponentLinks`

**File:** `packages/guidelines/components/component-links.tsx`

**Props:**
```ts
interface ComponentLinksProps {
  title: string;
  component: string;
  storybookTitle: string;
}
```

**Implementation:**
- Uses `IressText` for labels
- Uses `IressLink` for all links
- Import row: `<code>` with click-to-copy
- All URLs derived from props + `STORYBOOK_BASE_URL` env var
- CSS uses IDS tokens

### `ComponentTabs`

**File:** `packages/guidelines/components/component-tabs.tsx`

**Props:**
```ts
interface ComponentTabsProps {
  children: ReactNode;
  figma?: string;
}
```

**Implementation:**
- Uses `IressTabSet` and `IressTab` from `@iress-oss/ids-components`
- Three tabs: Development, Design, API
- Design tab renders Figma link (or "not yet available" message)
- Development and API tabs render their children

**Sub-components:**
- `ComponentTabs.Development` — shown when Development tab active
- `ComponentTabs.Design` — renders Figma link from `figma` prop
- `ComponentTabs.API` — shown when API tab active

### `StorybookEmbed`

**File:** `packages/guidelines/components/storybook-embed.tsx`

**Props:**
```ts
interface StorybookEmbedProps {
  storyId: string;       // e.g., "components-alert--status"
  height?: number;       // default 300
  code?: string;         // simplified usage example
}
```

**Implementation:**

Uses the official Storybook embed approach (https://storybook.js.org/docs/sharing/embed):

```tsx
// Embed without toolbar (clean canvas)
<iframe
  src={`${STORYBOOK_BASE_URL}/iframe.html?id=${storyId}&viewMode=story&shortcuts=false&singleStory=true`}
  width="100%"
  height={height}
/>
```

Action bar below the iframe using `IressLink`:
- **Open in CodeSandbox** — links to generated sandbox
- **Open in Storybook** — links to full story: `${STORYBOOK_BASE_URL}/?path=/story/${storyId}`
- **Show Code** — toggles the `code` prop content (simplified usage example)

**No title/description** — those are written as plain MDX headings/paragraphs above the embed.

---

## Example Alert Page (MDX)

```mdx
---
title: Alert
description: "An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task."
component: 'Alert/Alert.tsx'
propsType: 'IressAlertProps'
storybookTitle: 'Components/Alert'
figma: 'https://www.figma.com/design/FILE_ID?node-id=NODE_ID'
---

import { story } from '@/components/stories/alert.story';

<ComponentLinks
  title={frontmatter.title}
  component={frontmatter.component}
  storybookTitle={frontmatter.storybookTitle}
/>

<ComponentTabs figma={frontmatter.figma}>
  <ComponentTabs.Development>

## When To Use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

### When Not To Use

- For transient messages that auto-dismiss → [Toaster](/docs/components/toaster)
- For inline field-level errors → [ValidationMessage](/docs/components/validation-message)
- For blocking confirmations → [Modal](/docs/components/modal)

## Examples

### Status

The alert offers four statuses that set a distinctive colour and icon via the `status` prop.

<StorybookEmbed storyId="components-alert--status" code={`<IressAlert status="info">Info alert</IressAlert>
<IressAlert status="success">Success alert</IressAlert>
<IressAlert status="warning">Warning alert</IressAlert>
<IressAlert status="danger">Danger alert</IressAlert>`} />

### Heading

Display a heading via the `heading` prop. Accepts a string (renders `<h2>`) or a React element.

<StorybookEmbed storyId="components-alert--heading" code={`<IressAlert heading="Alert heading" status="info">
  This is an alert with a heading.
</IressAlert>`} />

### Actions

The `actions` prop displays call to action buttons within the alert.

<StorybookEmbed storyId="components-alert--footer" code={`<IressAlert
  heading="Confirm"
  status="danger"
  actions={[
    { children: 'Cancel', mode: 'tertiary' },
    { children: 'Confirm', mode: 'secondary' },
  ]}
>
  Are you sure?
</IressAlert>`} />

### Icon

Customise or remove the icon with the `icon` prop. Set to `false` to hide it.

<StorybookEmbed storyId="components-alert--icon" code={`<IressAlert icon={false} heading="No icon">
  Alert without an icon.
</IressAlert>`} />

### Multi-line

Set `multiLine` to `true` for longer content. Adjusts spacing and aligns the icon to the top.

<StorybookEmbed storyId="components-alert--multi-line" code={`<IressAlert multiLine heading="Long content" status="info">
  A longer message that spans multiple lines...
</IressAlert>`} />

### Variants

`sidebar` for form context, `full-width` for site-wide banners.

<StorybookEmbed storyId="components-alert--variant" code={`<IressAlert variant="sidebar" heading="Sidebar">Content</IressAlert>
<IressAlert variant="full-width" heading="Banner">Content</IressAlert>`} />

### Dismissable

Set `onClose` to make the alert dismissable with a close button.

<StorybookEmbed storyId="components-alert--dismissable" code={`<IressAlert onClose={() => console.log('dismissed')}>
  Dismissable alert
</IressAlert>`} />

  </ComponentTabs.Development>

  <ComponentTabs.Design />

  <ComponentTabs.API>

## Interactive Playground

<story.WithControl />

## Component Props

<auto-type-table
  path="../../../../../packages/components/src/components/Alert/Alert.tsx"
  name="IressAlertProps"
/>

## Styling Props

<auto-type-table
  path="../../../../../packages/components/src/interfaces.ts"
  name="IressCSSProps"
/>

  </ComponentTabs.API>
</ComponentTabs>
```

---

## Storybook Embed Details

Per https://storybook.js.org/docs/sharing/embed:

**Without toolbar (for examples):**
```html
<iframe
  src="${STORYBOOK_BASE_URL}/iframe.html?id=${storyId}&viewMode=story&shortcuts=false&singleStory=true"
  width="100%"
  height="300"
/>
```

**With toolbar (linked from "Open in Storybook"):**
```
${STORYBOOK_BASE_URL}/?path=/story/${storyId}&full=1&shortcuts=false&singleStory=true
```

---

## IDS Components Used

| Component | Where Used |
|-----------|-----------|
| `IressTabSet` + `IressTab` | Page-level Development/Design/API tabs |
| `IressLink` | All links (GitHub, Storybook, CodeSandbox, Figma, cross-references) |
| `IressText` | Labels in ComponentLinks |

---

## CSS Approach

- IDS CSS custom properties for all colours, spacing, borders
- Minimal CSS — only for `ComponentLinks` table layout and `StorybookEmbed` iframe container
- Added to `packages/guidelines/app/global.css`
- No Tailwind

---

## Implementation Checklist

- [ ] Extend frontmatter schema with `storybookTitle` and `figma`
- [ ] Create `ComponentLinks` (uses `IressLink`, `IressText`)
- [ ] Create `ComponentTabs` (uses `IressTabSet`, `IressTab`)
- [ ] Create `StorybookEmbed` (iframe + `IressLink` action bar)
- [ ] Add minimal CSS to `global.css`
- [ ] Register components in `mdx-components.tsx`
- [ ] Rewrite `content/docs/components/alert.mdx`
- [ ] Test tabs with `IressTabSet`
- [ ] Test Storybook iframe embeds from Chromatic
- [ ] Test interactive playground in API tab
- [ ] Test Figma link in Design tab
- [ ] Apply same layout to Button as validation
