# IDS Get started

> 7 docs

---

# AI

IDS provides agent skills that give AI coding assistants contextual knowledge about the design system — no runtime dependencies required.

## Ask Iris

🌸 **Ask Iris** is our AI assistant powered by Google Gemini, pre-loaded with
comprehensive IDS documentation. Click the "Ask Iris" button in the site header
to open a conversation — no setup required.

Ask Iris is designed for **designers, product managers, and anyone working with
IDS** — you don't need to be a developer to use it. Ask questions in plain
language, upload screenshots or mockups for feedback, and get answers grounded
in the design system. Iris can look at your designs and tell you which IDS
components map to what you've drawn, flag inconsistencies, or suggest
improvements.

Here are some ways to get the most out of it:

### Best practices

Ask Iris for guidance on correct component usage, accessibility requirements,
and design system conventions.

- "What's the best way to handle form validation with IDS components?"
- "Which component should I use for a confirmation dialog vs an alert?"
- "How do I make a data table accessible with screen readers?"
- "What are the spacing tokens I should use between form fields?"

### Brainstorming and wireframing

Describe what you're building and let Iris help you plan the component
composition and layout before you write any code.

- "I need a settings page with grouped preferences — what IDS components
  would work well together?"
- "Help me wireframe a dashboard layout with a sidebar nav, header, and
  card grid"
- "What's a good pattern for a multi-step onboarding flow using IDS?"
- "Suggest a component structure for a file upload area with progress
  indicators"

### Visual feedback on screenshots

Upload a screenshot, Figma export, or sketch and ask Iris to review it against
IDS guidelines.

- "Here's my mockup — which IDS components should the developer use to build
  this?"
- "Does this design follow IDS spacing and layout patterns?"
- "I've attached a screenshot of our current UI — what's inconsistent with
  the design system?"
- "Can you identify the IDS tokens that match the colours in this mockup?"

### Code generation and prototyping

Get working IDS code snippets tailored to your use case — paste them
straight into your project as a starting point.

- "Generate a responsive form with name, email, and phone fields using IDS"
- "Show me how to build a filterable data table with pagination"
- "Write a navigation sidebar with nested menu items and active states"

### Design token exploration

Explore the token system to find the right values for spacing, colour,
typography, and elevation.

- "What colour tokens are available for status indicators?"
- "Show me all the available border radius tokens and when to use each"
- "Which typography tokens should I use for page headings vs card titles?"

### Migration and upgrade assistance

Get help moving from older versions or other component libraries to the
latest IDS.

- "How do I migrate from OUI Button to IDS Button?"
- "What changed between IDS v5 and v6 for the Modal component?"
- "Help me replace a custom dropdown with the IDS Select component"

### Accessibility audits

Describe your current implementation and ask Iris to review it for
accessibility gaps.

- "Review this form markup — am I missing any aria attributes?"
- "What keyboard interactions should my custom tab component support?"
- "Is my colour combination meeting WCAG AA contrast requirements?"

### Pattern discovery

Find established patterns for common UI problems instead of inventing
solutions from scratch.

- "What's the IDS pattern for empty states?"
- "How should I handle loading skeletons across a page?"
- "What's the recommended approach for responsive layouts with IDS?"
- "Show me how other teams handle error boundaries with IDS components"

## Available Skills

| Skill | Description |
|-------|-------------|
| `figma-to-ids` | Translate Figma design properties into IDS component implementations |
| `ui-translation` | Translate natural language UI descriptions into IDS component code |
| `ui-doctor` | Audit and validate IDS component usage and compliance |
| `token-usage` | Guide on correctly using IDS design tokens in React components and CSS |
| `version-migration` | Migrate applications between IDS major versions (v4→v5, v5→v6, OUI→v6) |

## Installation

Install skills using the [skills CLI](https://github.com/vercel-labs/skills):

```bash
# Install all IDS skills (interactive — choose your agents)
npx skills add iress/design-system

# Install a specific skill
npx skills add iress/design-system --skill token-usage

# Install to a specific agent
npx skills add iress/design-system -a github-copilot
npx skills add iress/design-system -a claude-code
npx skills add iress/design-system -a cursor
npx skills add iress/design-system -a kiro-cli
```

## How it works

Skills are markdown files that provide context to AI tools. They include:

- **Component API knowledge** — correct prop usage, available options, TypeScript interfaces
- **Design patterns** — when to use which component, composition rules, accessibility requirements
- **Code examples** — verified examples extracted from Storybook stories
- **Migration rules** — automated transformation patterns for version upgrades

## Using with AI assistants

### GitHub Copilot

Skills are installed as custom instructions in `.github/copilot-instructions.md`.

### Kiro CLI

Skills are symlinked to `.kiro/skills/` and loaded automatically.

### Cursor / Claude Code

Skills are installed in the respective agent configuration directories.

## Figma Integration

The `figma-to-ids` skill can translate Figma designs directly into IDS code. If you have a Figma MCP server configured, AI agents can read Figma files and generate implementations. Without MCP, paste exported design specs into your prompt.

## `.ai/` Directory

Each published package includes an `.ai/` directory with AI-optimised documentation:

```
node_modules/@iress-oss/ids-components/.ai/
  components/alert.md
  components/button.md
  patterns/form.md
  skills/ui-translation.md
  index.json
```

These files are automatically generated from the guidelines content and Storybook examples. They are designed to be easily parsed by AI tools, providing up-to-date information on component APIs, usage patterns, and design tokens.

---

# Common mistakes

Patterns we see trip people up when building with IDS. Each section shows what
goes wrong, why, and the fix.

These are cross-cutting mistakes that apply across many components. For
component-specific guidance (do's and don'ts, usage patterns, accessibility
considerations), see the Design tab on each
[component page](../components/overview.md).

## Using `slot` attributes (legacy v4 pattern)

In IDS v4 and earlier, child elements used `slot` attributes to position content (e.g. `<IressIcon slot="prepend" />`). This is **no longer supported**. Use the equivalent React props instead.

### Button

```tsx
// ❌ slot attribute — ignored in v5+
<IressButton>
  <IressIcon slot="start" name="search" />
  Search
</IressButton>

// ✅ Use prepend/append props
<IressButton prepend={<IressIcon name="search" />}>
  Search
</IressButton>

// ✅ Icon-only button
<IressButton icon="edit" mode="muted">
  Edit
</IressButton>
```

### Input

```tsx
// ❌
<IressInput>
  <IressIcon slot="prepend" name="search" />
</IressInput>

// ✅
<IressInput prepend={<IressIcon name="search" />} />
```

### Modal

```tsx
// ❌
<IressModal show={show}>
  Content
  <div slot="footer">
    <IressButton>Close</IressButton>
  </div>
</IressModal>

// ✅ Use footer prop
<IressModal show={show} footer={<IressButton>Close</IressButton>}>
  Content
</IressModal>

// ✅ Or actions prop for status modals
<IressModal
  status="danger"
  heading="Delete record?"
  actions={[
    { children: 'Cancel', mode: 'tertiary' },
    { children: 'Delete' },
  ]}
  show={show}
  onShowChange={setShow}
>
  This action cannot be undone.
</IressModal>
```

### Quick reference

| Legacy v4 pattern                 | Modern prop           |
| --------------------------------- | --------------------- |
| `<Child slot="prepend" />`        | `prepend={<Child />}` |
| `<Child slot="append" />`         | `append={<Child />}`  |
| `<Child slot="start" />`          | `prepend={<Child />}` |
| `<Child slot="end" />`            | `append={<Child />}`  |
| `<Child slot="icon-only" />`      | `icon="iconName"`     |
| `<div slot="footer">...</div>`    | `footer={...}`        |
| `<div slot="activator">...</div>` | `activator={...}`     |

## Misunderstanding `IressShadow`

`IressShadow` is a **CSS isolation wrapper** — it attaches a shadow root to a `<div>` so IDS styles don't leak into or get affected by your host application's CSS. It's useful in microfrontend setups.

It does **not** mean your app uses Web Components or custom elements. Children inside `IressShadow` are standard React components — use normal React props, not `slot` attributes.

```tsx
// ❌
<IressShadow>
  <IressButton>
    <IressIcon slot="start" name="search" />
    Search
  </IressButton>
</IressShadow>

// ✅
<IressShadow>
  <IressButton prepend={<IressIcon name="search" />}>
    Search
  </IressButton>
</IressShadow>
```

`IressShadow` is an alternative to `IressProvider` — choose one as your app's root wrapper depending on whether you need style isolation.

## Using raw HTML instead of IDS components

IDS components include built-in accessibility, theming, and consistent styling. Raw HTML elements bypass all of that.

```tsx
// ❌
<button onClick={handleClick}>Submit</button>
<input type="text" placeholder="Name" />
<h2>Section Title</h2>

// ✅
<IressButton mode="primary" onClick={handleClick}>Submit</IressButton>
<IressField label="Name" htmlFor="name">
  <IressInput id="name" placeholder="Name" />
</IressField>
<IressText element="h2">Section Title</IressText>
```

## Hardcoded styling values

Don't hardcode colours, spacing, font sizes, or border radii. Use design tokens via styling props so your UI stays consistent across themes.

```tsx
// ❌
<div style={{ padding: '16px', background: '#F5F6F8', borderRadius: '12px' }}>

// ✅
<IressStack p="spacing.4" bg="colour.neutral.20" borderRadius="radius.3">
```

## Custom CSS for basic layout

Use IDS layout components instead of writing your own flexbox or grid CSS.

```tsx
// ❌
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ✅
<IressStack gap="spacing.4">
  <IressText>Item 1</IressText>
  <IressText>Item 2</IressText>
</IressStack>
```

## Missing form field wrappers

Always wrap inputs in `IressField` (or `IressFormField` inside an `IressForm`) for proper labels, validation messages, and accessibility.

```tsx
// ❌ Input without a field wrapper — no label, no a11y
<IressInput placeholder="Email" />

// ✅
<IressField label="Email" htmlFor="email" required>
  <IressInput id="email" type="email" placeholder="Enter your email" />
</IressField>
```

## Using `disabled` on IressButton

IDS discourages using the `disabled` pattern on `IressButton`. While the native `disabled` attribute is still available, disabled buttons are invisible to screen readers and provide no way for users to understand how to enable the action.

| Use case | Anti-pattern | IDS alternative |
| --- | --- | --- |
| Form is incomplete | `disabled={!isValid}` | Use `IressForm` with `rules` validation — validates on submit with inline errors |
| Action in progress | `disabled={isSubmitting}` | Use `loading={isSubmitting}` — shows spinner, announces to screen readers, prevents clicks |
| User lacks permission | `disabled={!canEdit}` | Hide the button (`{canEdit && <IressButton>…</IressButton>}`), or keep enabled and explain on click |
| Prerequisite not met | `disabled={!hasSelection}` | Keep enabled and show guidance on click (e.g. "Select an item first" via `IressAlert`) |

```tsx
// ❌ disabled is an anti-pattern
<IressButton disabled={!isValid}>Submit</IressButton>

// ✅ Form validation — let IressForm handle it
<IressForm onSubmit={handleSubmit}>
  <IressFormField name="email" label="Email" rules={{ required: 'Email is required' }}
    render={(props) => <IressInput {...props} type="email" />} />
  <IressButton mode="primary" type="submit">Submit</IressButton>
</IressForm>

// ✅ In-progress — use loading
<IressButton loading={isSubmitting} mode="primary" type="submit">Submit</IressButton>

// ✅ Permission — hide or explain
{canEdit && <IressButton onClick={handleEdit}>Edit</IressButton>}
```

## Redundant `textStyle` on IressText

When `element` is set on `IressText`, the component already applies the correct typography. Adding a matching `textStyle` is redundant. Only use `textStyle` to intentionally override the visual treatment (e.g. making an h2 look like an h4).

| Element | Default textStyle (redundant if matched) |
| ------- | ---------------------------------------- |
| `h1`    | `typography.heading.1`                   |
| `h2`    | `typography.heading.2`                   |
| `h3`    | `typography.heading.3`                   |
| `h4`    | `typography.heading.4`                   |
| `h5`    | `typography.heading.5`                   |
| `p`     | `typography.body.md`                     |

```tsx
// ❌ Redundant — h1 already renders as typography.heading.1
<IressText element="h1" textStyle="typography.heading.1">Page Title</IressText>

// ✅ Element alone is sufficient
<IressText element="h1">Page Title</IressText>

// ✅ Intentional override for visual hierarchy
<IressText element="h2" textStyle="typography.heading.4">Section Title</IressText>
```

## Further reading

When in doubt, check the [component pages](../components/overview.md) — each one
includes design guidance, code examples, and do's and don'ts specific to that
component.

---

# Content Security Policy (CSP)

IDS loads external stylesheets and fonts at runtime. If your application enforces a Content Security Policy, you need to allowlist the origins IDS loads from.

## External Origins

IDS components load resources from these domains:

| Origin                 | Resource                                                | Loaded By                                            |
| ---------------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| `fonts.googleapis.com` | Material Symbols icon font CSS, Inter & Ubuntu font CSS | `IressProvider`, `IressIconProvider`                 |
| `fonts.gstatic.com`    | Font binary files (served by Google Fonts CSS)          | Google Fonts `@font-face` rules                      |
| `cdn.iress.com`        | Font Awesome CSS (legacy v5 icon set), theme CSS        | `IressIconProvider` (fontawesome type), `IressTheme` |

## Required CSP Directives

Add the following origins to your Content Security Policy:

```
style-src 'self' https://fonts.googleapis.com https://cdn.iress.com;
font-src  'self' https://fonts.gstatic.com https://cdn.iress.com;
```

If you use `IressThemeImport` (bundled themes, no CDN) instead of `IressTheme`, you can omit `cdn.iress.com` from `style-src`.

---

## Optional: Nonce Support for `IressShadow`

`IressShadow` injects inline `<style>` tags into its Shadow DOM. If your CSP blocks inline styles, IDS supports nonce-based injection for this component. This is **optional** — most applications only need the origin allowlisting above.

IDS reads a CSP nonce from a `<meta>` tag and applies it to `<style>` elements injected by `IressShadow`:

```html
<head>
  <meta name="csp-nonce" content="<SERVER_GENERATED_NONCE>" />
</head>
```

Your server must:

1. Generate a unique nonce per request.
2. Set it in both the `<meta>` tag and the CSP header.
3. Ensure the nonce value matches exactly.

### Example with Nonce

```
Content-Security-Policy: style-src 'self' 'nonce-abc123' https://fonts.googleapis.com https://cdn.iress.com; font-src 'self' https://fonts.gstatic.com https://cdn.iress.com;
```

```html
<meta name="csp-nonce" content="abc123" />
```

---

## How It Works

- **`IressProvider`** injects `<link rel="stylesheet">` tags for default fonts (Inter, Ubuntu) from `fonts.googleapis.com`.
- **`IressIconProvider`** injects `<link>` tags for Material Symbols from `fonts.googleapis.com` (with dynamic subsetting), or `<link>` tags for Font Awesome from `cdn.iress.com`.
- **`IressShadow`** injects inline `<style>` tags into its Shadow DOM — this is the only component that requires a nonce when inline styles are blocked.

All components use `<link>` tags for external stylesheets, which are covered by origin allowlisting alone. Only `IressShadow` calls `getNonce()` to apply a nonce to its inline `<style>` elements.

---

## Troubleshooting

| Symptom                                        | Cause                                                 | Fix                                                                          |
| ---------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| Icons render as text (e.g. "search")           | `fonts.googleapis.com` or `fonts.gstatic.com` blocked | Add both to `style-src` and `font-src` respectively                          |
| Console error: "Refused to load stylesheet"    | Missing origin in `style-src`                         | Add the blocked origin to `style-src`                                        |
| Console error: "Refused to apply inline style" | Inline styles blocked and no nonce configured         | Add `<meta name="csp-nonce">` tag, or allow `'unsafe-inline'` in `style-src` |
| Fonts load in dev but not production           | CSP only enforced in production                       | Test with CSP headers in all environments                                    |
| Theme not applying                             | `cdn.iress.com` blocked in `style-src`                | Add `cdn.iress.com` to `style-src`, or use `IressThemeImport`                |

---

# Design

Set up your environment to use the latest version of the Iress Design System (IDS). You can use this library to build React applications that align to IDS, and ensure a consistent and modern look and feel across all Iress products.

## Requirements

- [Figma](https://www.figma.com/)

## Set up

1. Request access to the [Figma design system file](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6).
2. Set up the required fonts:
    - [Inter](https://fonts.google.com/specimen/Inter) for UI text
    - [Ubuntu](https://fonts.google.com/specimen/Ubuntu) for headings
    - [Space Mono](https://fonts.google.com/specimen/Space+Mono) for code snippets
3. Set up the required Figma plugins:
    -  [Material Symbols](https://www.figma.com/community/plugin/1036040127479628855/Material-Symbols) for icons

---

# Develop

Set up your environment to use the latest version of the Iress Design System (IDS). You can use this library to build React applications that align to IDS, and ensure a consistent and modern look and feel across all Iress products.

## Requirements

- [React 17 or later](https://reactjs.org/)

## Set up

1. Install using the command line:
   ```sh
   yarn add @iress-oss/ids-components
   ```
2. Import the styles:
   ```tsx
import '@iress-oss/ids-components/dist/style.css';
```
3. Import the components. The provider is optional, but recommended for most applications. It sets up the design system and provides a consistent container for components like modals, slideouts, and toasts. If you are using `IressProvider`, you do not need to add `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, or `IressIconProvider` separately — they are all included. The same applies when using `IressShadow`, which includes `IressProvider` internally.
   ```tsx
import { IressProvider, IressButton } from '@iress-oss/ids-components';
```
4. Use the components:

   ```tsx
const App = () => {
  const { success } = useToaster();

  return (
    <IressButton onClick={() => success({ children: 'Toast triggered' })}>
      Trigger toast
    </IressButton>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <IressProvider>
    <App />
  </IressProvider>,
);
```

---

# Frequently Asked Questions

---

## Which version should I use?

Use **version 6** for all new development. It includes the latest components, tokens, and accessibility improvements. See the [versions page](../get-started/versions.md) for details.

## Do I need to upgrade from v5?

v5 remains maintained for security fixes, but new features and components are only added to v6. We recommend planning your migration. See the [v5 to v6 migration guide](../migration/from-v5-to-v6.md).

## What support is available for migration?

A comprehensive [migration guide](../migration/from-v5-to-v6.md) covers all breaking changes. If you plan to migrate soon, reach out to the design system team — we partner with teams during migration.

## How do I report a bug or request a feature?

Each component page has "Report issue" and "Request feature" links that open pre-filled GitHub issues. You can also [create an issue directly](https://github.com/iress/design-system/issues/new/choose).

## Can I use IDS with AI coding tools?

Yes — IDS ships AI-optimised documentation via the `.ai/` directory in the npm package, and provides [agent skills](../get-started/ai.md) for GitHub Copilot, Kiro CLI, Cursor, and Claude Code.

## Does IDS support server-side rendering (SSR)?

IDS components are client-side React components. For SSR frameworks (Next.js, Remix), ensure you wrap the app in `IressProvider` and follow the [CSP guide](../get-started/content-security-policy.md) for font/style loading.

## How do I customise the theme?

IDS uses design tokens that can be overridden via CSS custom properties. See the [tokens documentation](../tokens/colour.md) for available customisation points.

---

# Versions

Version 6 is the latest release and recommended for all new development.

## Version history

| Version | Status | Documentation |
|---------|--------|---------------|
| v6 | **Current** | You're reading it |
| v5 | Maintained (security fixes only) | [v5 Documentation](https://design.wm.iress.com) |
| v4 | End of life (Dec 2024) | [v4 Archive](https://archive.design.aws-wmcore-production-au.iress.online/index.html) |
| OneUI | Deprecated | No longer available |

## Upgrading

- [Migrating from v5 to v6](../migration/from-v5-to-v6.md)
- [Migrating from v4 to v5](../migration/migration-from-v4-to-v5.md)
- [Migrating from OneUI to v6](../migration/from-oui-to-v6.md)