# Skill: UI Doctor

## Purpose

Audit and validate that an application correctly uses IDS (Iress Design System) components, follows IDS principles, and meets compliance requirements. This skill helps AI agents perform comprehensive UI reviews, identify areas where native HTML or third-party elements should be replaced with IDS components, assess adherence to IDS design principles, and produce actionable reports with recommendations.

## When to Use

- Reviewing an application's UI code for IDS compliance
- Validating that IDS components are used where possible instead of raw HTML or custom implementations
- Assessing design token usage and consistency
- Generating a UI health report with an IDS compliance score
- Providing recommendations to improve IDS adoption and consistency

## Audit Scope

Before starting the audit, determine which files to scan and which to exclude.

### Files to Scan

- All `.tsx`, `.jsx`, `.ts`, `.js` files in `src/` (or the application source directory)
- CSS/SCSS/styled-component files for hardcoded design values
- Application entry point(s) for Provider and CSS import checks

### Files to Exclude

- **Test files** (`*.test.tsx`, `*.spec.tsx`, `__tests__/`) — test mocks and utilities may legitimately use raw HTML
- **Storybook stories** (`*.stories.tsx`) — stories may intentionally demonstrate raw HTML for comparison
- **Configuration files** (`*.config.ts`, `*.config.js`) — not UI code
- **Type definition files** (`*.d.ts`) — no runtime UI code
- **Third-party code** (`node_modules/`, vendored libraries) — outside the application's control
- **Build output** (`dist/`, `build/`) — generated code

### Version-Aware Auditing

IDS is currently on **version 6**. When auditing applications:

- **Check the installed IDS version** — Look at `package.json` for `@iress-oss/ids-components` version
- **v6 applications** — Apply all rules in this skill as-is
- **v5 applications** — Some patterns differ (e.g., `IressForm` API changes between v5 and v6). Flag v5-specific patterns as "migration opportunities" rather than "non-compliant". Key v5→v6 differences include:
  - `IressForm` now uses `rules` prop for validation instead of built-in validation props
  - `react-hook-form` is now a peer dependency
  - Form state management moved from `useState` to React Hook Form's `useWatch`/`ref`
- **Pre-v5 applications** — Flag as requiring a major migration and prioritise Provider/CSS setup first
- **Always note the version** in the audit report header

## Audit Process

### 1. Validate IDS Component Usage

Scan the application code for raw HTML elements, third-party UI components, and custom implementations that have IDS equivalents. Flag instances where IDS components should be used instead.

#### Third-Party UI Library Detection

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

#### HTML Element → IDS Component Replacement Map

| Raw HTML / Custom Code                  | IDS Replacement                                     | Priority |
| --------------------------------------- | --------------------------------------------------- | -------- |
| `<button>`                              | `IressButton`                                       | High     |
| `<a>` (navigation link)                 | `IressLink`                                         | High     |
| `<input type="text">`                   | `IressField` + `IressInput`                         | High     |
| `<input type="checkbox">`               | `IressCheckbox`                                     | High     |
| `<input type="radio">`                  | `IressRadio` + `IressRadioGroup`                    | High     |
| `<select>`                              | `IressField` + `IressSelect`                        | High     |
| `<textarea>`                            | `IressField` + `IressInput`                         | High     |
| `<table>`                               | `IressTable`                                        | High     |
| `<label>`                               | `IressField` (wraps input with label)               | High     |
| `<h1>`–`<h6>`, `<p>`, `<span>` (styled) | `IressText`                                         | Medium   |
| `<img>`                                 | `IressImage`                                        | Medium   |
| `<hr>`                                  | `IressDivider`                                      | Medium   |
| `<dialog>` / custom modal               | `IressModal`                                        | High     |
| Custom drawer / slideout                | `IressSlideout`                                     | High     |
| Custom tooltip                          | `IressTooltip`                                      | Medium   |
| Custom popover                          | `IressPopover`                                      | Medium   |
| Custom tabs                             | `IressTabSet` + `IressTab`                          | High     |
| Custom spinner / loader                 | `IressSpinner`                                      | Medium   |
| Custom skeleton loader                  | `IressSkeleton`                                     | Low      |
| Custom progress bar                     | `IressProgress`                                     | Low      |
| Custom alert / toast                    | `IressAlert` / `IressToaster`                       | High     |
| Custom card / panel                     | `IressCard` / `IressPanel`                          | Medium   |
| Custom toggle / switch                  | `IressToggle`                                       | High     |
| Custom badge / tag                      | `IressTag` / `IressPill`                            | Low      |
| Custom breadcrumbs                      | `IressBreadcrumbs`                                  | Medium   |
| Custom side navigation                  | `IressSideNav`                                      | Medium   |
| Custom context menu                     | `IressMenu` + `IressMenuItem`                       | Medium   |
| Custom icon (SVG inline)                | `IressIcon`                                         | Medium   |
| `<div>` with flex column styles         | `IressStack`                                        | Medium   |
| `<div>` with flex row styles            | `IressInline`                                       | Medium   |
| `<div>` with grid styles                | `IressRow` + `IressCol`                             | Medium   |
| `<div>` with max-width container        | `IressContainer`                                    | Low      |
| `<form>`                                | `IressForm` + `IressFormField`                      | High     |
| `<input type="range">`                  | `IressSlider`                                       | Medium   |
| `<input type="number">` (currency)      | `IressField` + `IressInputCurrency`                 | Medium   |
| `<details>` / custom accordion          | `IressExpander`                                     | Medium   |
| Custom autocomplete / typeahead         | `IressAutocomplete`                                 | High     |
| Custom select with search               | `IressField` + `IressSelect`                        | High     |
| Custom read-only display                | `IressReadonly`                                     | Medium   |
| Custom segmented control / button group | `IressButtonGroup`                                  | Medium   |
| Custom validation messages              | `IressValidationMessage` / `IressValidationSummary` | High     |
| Custom styled wrapper `<div>`           | `IressStyled`                                       | Low      |

#### What to Look For

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

### 2. Validate IDS Principles and Compliance

Check that the application follows these core IDS principles:

#### a. Provider & CSS Setup

- **IressProvider must wrap the application root** — Required for fonts, CSS variables, and theming
- **The IDS component CSS must be imported** — `@iress-oss/ids-components/dist/style.css` contains all component styles
- Users only need to install `@iress-oss/ids-components` — the tokens are bundled within the component library and do not need to be installed separately
- If using design tokens directly in application code (for custom styling), users should additionally install `@iress-oss/ids-tokens` and import `@iress-oss/ids-tokens/build/css-vars.css`

```typescript
// ✅ Correct setup — minimum required
import '@iress-oss/ids-components/dist/style.css';
import { IressProvider } from '@iress-oss/ids-components';

function App() {
  return <IressProvider>{/* app content */}</IressProvider>;
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

- **Hardcoded colour values** — Flag any hex codes, rgb(), or named colours that should use IDS tokens
- **Hardcoded spacing** — Flag pixel values for padding/margin/gap that should use spacing tokens (multiples of 4px)
- **Hardcoded typography** — Flag font-family, font-size, font-weight that should use IDS typography tokens
- **Hardcoded border-radius** — Flag radius values that should use IDS radius tokens

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

IDS provides several patterns (composite components) that ensure consistent UIs across applications. Validate that the application uses these patterns where appropriate.

##### Form Pattern (`IressForm`)

Forms should use `IressForm` and `IressFormField` instead of building custom form handling. This ensures consistent validation, error display, and state management.

- **Use `IressForm` for all forms** — Built on React Hook Form, it provides consistent validation, error handling, and state management
- **Use `IressFormField` for form fields** — Wraps form controls with `name`, `label`, and `rules` props for declarative validation
- **Use `IressFormFieldset` for grouped inputs** — For checkbox groups, radio groups, and other multi-input fields
- **Use `rules` prop for validation** — Declarative validation via React Hook Form rules, not custom validation logic
- **Use `onSubmit` for state syncing** — Sync form data with external state via the submit event, not per-field `onChange`
- **Use `useWatch` for conditional fields** — Not `useState` + `onChange` handlers
- **Choose the right form pattern** — Use `pattern="long"` for forms with >8 fields (sticky heading/actions), `pattern="short"` (default) for ≤8 fields
- **Use `react-hook-form` as a peer dependency** — Required alongside `@iress-oss/ids-components` when using `IressForm`

```typescript
// ❌ Custom form handling
<form onSubmit={handleSubmit}>
  <label>Email</label>
  <IressInput value={email} onChange={(e) => setEmail(e.target.value)} />
  {emailError && <span className="error">{emailError}</span>}
  <button type="submit">Submit</button>
</form>

// ✅ IDS Form pattern
<IressForm onSubmit={handleSubmit} heading="Contact" actions={<IressButton mode="primary" type="submit">Submit</IressButton>}>
  <IressFormField
    name="email"
    label="Email"
    rules={{ required: true, pattern: { value: /^[^@]+@[^@]+$/, message: 'Invalid email' } }}
    render={(controlledProps) => <IressInput {...controlledProps} type="email" />}
  />
</IressForm>
```

##### Loading Pattern (`IressLoading`)

Applications should use `IressLoading` for all loading states to ensure consistent timing behaviour and user experience.

- **Use `IressLoading` instead of custom spinners/skeletons** — It handles timing thresholds automatically (no indicator <500ms, spinner at 500ms, message at 2s, detailed feedback at 10s)
- **Choose the right loading pattern** — `page` for page loads, `component` for component loads, `start-up` for app initialisation, `validate` for form submission, `long` for operations >10s
- **Be consistent** — Use the same loading pattern for similar operations across the application

##### Dropdown Menu Pattern (`IressDropdownMenu`)

- **Use `IressDropdownMenu` for filter/action triggers** — Not custom popover menus
- **Do not use inside forms** — Use `IressSelect`, `IressRadioGroup`, or `IressCheckboxGroup` within forms instead
- **Enable `searchable` for 10+ options** — Improves usability for long option lists

##### Contextual Menu Pattern (`IressContextualMenu`)

- **Use for row-level or card-level secondary actions** — Not custom context menus
- **Place destructive actions at the end** — Follow the established convention
- **Provide meaningful `ariaLabel`** — Describe the menu purpose in context

##### Side Navigation Pattern (`IressSideNav`)

- **Use for application shell navigation** — Not custom sidebar implementations
- **Use for multi-section apps** — When the application has several major sections with sub-navigation

##### Breadcrumbs Pattern (`IressBreadcrumbs`)

- **Use for site hierarchy navigation** — Not custom breadcrumb implementations
- **Last item should represent current page** — And not be clickable

##### Shadow DOM Pattern (`IressShadow`)

- **Use for microfrontend isolation** — When you need to isolate styles from the host application
- **Alternative to `IressProvider`** — Injects styles into the shadow DOM instead of the document head

##### Form Accessibility

- **All form inputs must have labels** — Use `IressField` (standalone inputs) or `IressFormField` (within `IressForm`) to provide labels, hints, and validation
- **Required fields must be marked** — Use `required` prop on `IressField` or `rules={{ required: true }}` on `IressFormField`
- **Validation messages must use IDS patterns** — Use `IressField` `status` and `statusMessage` props, or `IressFormField` `rules` prop for declarative validation
- **Form inputs must have `id` and `htmlFor` pairing** — For label association when using `IressField` directly

```typescript
// ❌ Missing label / accessibility
<IressInput placeholder="Email" />

// ✅ Accessible standalone form input
<IressField label="Email" htmlFor="email" required>
  <IressInput id="email" type="email" placeholder="Enter your email" />
</IressField>

// ✅ Accessible form input within IressForm
<IressFormField
  name="email"
  label="Email"
  rules={{ required: true }}
  render={(controlledProps) => <IressInput {...controlledProps} type="email" />}
/>
```

#### d. Button Hierarchy

- **One primary action per section** — Only one `mode="primary"` button per logical section
- **Consistent button mode usage** — Primary for main action, secondary for supporting actions, tertiary/muted for less prominent actions
- **Danger actions use status prop** — `status="danger"` for destructive actions, not red styling

#### e. Layout Consistency

- **Use IDS layout components** — `IressStack`, `IressInline`, `IressRow`/`IressCol` instead of custom CSS flex/grid
- **Use spacing tokens for gaps** — Values 0–10 on `gap` prop
- **Use IressCSSProps for spacing** — `m`, `mx`, `my`, `p`, `px`, `py` props instead of inline styles
- **Responsive design** — Use `IressHide`, `hideFrom`/`hideBelow` for responsive visibility

#### f. Semantic Component Usage

- **Use `IressText` for all text** — Instead of raw `<p>`, `<span>`, `<h1>`–`<h6>`
- **Use `IressAlert` for feedback** — Instead of custom notification/alert components
- **Use `IressIcon` for icons** — Instead of inline SVGs or custom icon components
- **Use `IressDivider` for separators** — Instead of `<hr>` or custom dividers

#### g. Acceptable Exceptions

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

### 3. Provide Recommendations

Based on the audit findings, provide prioritised recommendations:

#### Priority Levels

| Priority     | Description                                                                                                                                                                                                      | Action                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| **Critical** | Missing IressProvider, missing component CSS import, raw form inputs without labels, missing skip links, forms not using `IressForm`                                                                             | Must fix immediately  |
| **High**     | Raw HTML buttons/inputs/selects/tables/modals, custom form handling instead of `IressForm`, custom loading instead of `IressLoading`, accessibility failures (colour contrast, missing alt text, focus trapping) | Fix in current sprint |
| **Medium**   | Hardcoded colours/spacing, missing IressText usage, custom layout instead of IDS layout, custom menus instead of `IressContextualMenu`/`IressDropdownMenu`, missing ARIA landmarks                               | Plan for next sprint  |
| **Low**      | Missing IressImage, custom badges, minor token inconsistencies, non-critical accessibility improvements                                                                                                          | Backlog               |

#### Recommendation Format

For each finding, provide:

1. **What was found** — The specific code or pattern that needs attention
2. **Why it matters** — Impact on consistency, accessibility, or maintainability
3. **How to fix** — Specific code change with before/after examples
4. **Priority** — Critical, High, Medium, or Low

### 4. Generate Compliance Report

Produce a structured report covering all audit areas.

#### Report Template

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

- [ ] IressProvider wraps application root
- [ ] `@iress-oss/ids-components/dist/style.css` imported
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

## Audit Checklist

Use this checklist when performing a UI doctor audit:

### Setup & Configuration

- [ ] `IressProvider` wraps the application root
- [ ] `@iress-oss/ids-components/dist/style.css` is imported (required for component styles)
- [ ] `@iress-oss/ids-components` is a project dependency
- [ ] `@iress-oss/ids-tokens/build/css-vars.css` is imported only if tokens are used directly in application code
- [ ] `react-hook-form` is installed as a peer dependency if using `IressForm`
- [ ] No conflicting global CSS resets that override IDS styles

### Component Usage

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

### Design Tokens

- [ ] No hardcoded colour hex/rgb values — use IDS colour tokens
- [ ] No hardcoded pixel spacing — use IDS spacing tokens
- [ ] No hardcoded font properties — use IDS typography tokens
- [ ] No hardcoded border-radius — use IDS radius tokens

### Pattern Usage

- [ ] Forms use `IressForm` + `IressFormField` instead of custom form handling
- [ ] Form validation uses declarative `rules` prop, not custom validation logic
- [ ] Form state managed via React Hook Form (`useWatch`, `ref`), not `useState` + `onChange`
- [ ] Long forms (>8 fields) use `pattern="long"` for sticky heading/actions
- [ ] Loading states use `IressLoading` with the appropriate pattern
- [ ] Filter/action dropdowns use `IressDropdownMenu` (not inside forms)
- [ ] Row-level actions use `IressContextualMenu`
- [ ] Application shell navigation uses `IressSideNav`
- [ ] Hierarchy navigation uses `IressBreadcrumbs`
- [ ] Microfrontend style isolation uses `IressShadow`

### Accessibility

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
- [ ] `IressAlert` is used for status messages (automatically uses appropriate ARIA roles)
- [ ] `IressToaster` is used for transient notifications (uses `aria-live` region)
- [ ] No reliance on colour alone to convey information — use text, icons, or patterns alongside colour

### Layout

- [ ] Vertical stacks use `IressStack`
- [ ] Horizontal rows use `IressInline`
- [ ] Grid layouts use `IressRow` + `IressCol`
- [ ] Spacing props use IDS token values (0–10)
- [ ] Responsive visibility uses `IressHide` or `hideFrom`/`hideBelow`

### Button Hierarchy

- [ ] Maximum one `mode="primary"` button per section
- [ ] Destructive actions use `status="danger"` not custom red styling
- [ ] Icon-only buttons include accessible text

### Usability Heuristics

Evaluate the application against these usability principles (based on [Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)). Each heuristic includes concrete IDS guidance for how to satisfy it.

#### 1. Visibility of System Status

The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

- [ ] Loading states use `IressLoading` with the correct pattern (`page`, `component`, `start-up`, `validate`, `long`) so users always see feedback proportional to wait time
- [ ] Form submission provides visible feedback — use `IressLoading pattern="validate"` during submission, `IressAlert` or `IressToaster` for success/failure
- [ ] Progress indicators are used for multi-step processes — `IressProgress` for deterministic operations, `IressSpinner` for indeterminate
- [ ] Active states are visible — selected tabs (`IressTabSet`), active nav items (`IressSideNav`), current breadcrumb (`IressBreadcrumbs`) all show where the user is
- [ ] Toggled/selected states are visually clear — `IressToggle`, `IressCheckbox`, `IressRadio` provide built-in active states

#### 2. Match Between System and the Real World

The system should speak the user's language, with words, phrases, and concepts familiar to the user.

- [ ] Labels use plain, domain-appropriate language — avoid technical jargon in `IressField` labels, `IressButton` text, and `IressAlert` messages
- [ ] Icons are recognisable and paired with text — use `IressIcon` with a text label; avoid icon-only actions unless the icon is universally understood (e.g., close ✕, search 🔍)
- [ ] Status colours follow real-world conventions — `info` (blue), `success` (green), `warning` (amber), `danger` (red) via IDS status tokens
- [ ] Form fields are ordered logically — group related fields with `IressFormFieldset`, order by natural workflow

#### 3. User Control and Freedom

Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action.

- [ ] Modals have a visible close button and Escape key dismissal — `IressModal` provides both by default
- [ ] Slideouts can be dismissed — `IressSlideout` supports close button and backdrop click
- [ ] Destructive actions require confirmation — use `IressModal` as a confirmation dialog before delete/remove operations
- [ ] Forms support cancel/reset — include a secondary `IressButton` for cancel alongside the primary submit action
- [ ] Multi-step flows allow going back — breadcrumbs (`IressBreadcrumbs`) or back buttons let users reverse navigation
- [ ] Toasts are dismissible — `IressToaster` notifications can be closed by the user

#### 4. Consistency and Standards

Users should not have to wonder whether different words, situations, or actions mean the same thing.

- [ ] All components come from IDS — no mix of IDS + third-party + custom for the same purpose (e.g., some buttons IDS, some MUI)
- [ ] Design tokens are used consistently — no mix of hardcoded values and tokens for the same property (e.g., some colours from tokens, some hardcoded)
- [ ] Same action, same pattern — similar forms use the same `IressForm` pattern, similar loading states use the same `IressLoading` pattern
- [ ] Button hierarchy is consistent — `mode="primary"` always means the main action, `mode="secondary"` always means supporting action, across all views
- [ ] Terminology is consistent — the same action uses the same label everywhere (e.g., "Save" not sometimes "Save" and sometimes "Submit" for the same operation)

#### 5. Error Prevention

Even better than good error messages is a careful design that prevents a problem from occurring in the first place.

- [ ] Form validation uses declarative `rules` — `IressFormField` `rules` prop prevents invalid submissions before they happen
- [ ] Required fields are clearly marked — `required` prop on `IressField` or `rules={{ required: true }}` on `IressFormField`
- [ ] Input constraints are communicated — use `hint` prop on `IressField`/`IressFormField` to show format expectations, character limits, or examples
- [ ] Destructive actions require explicit confirmation — delete/remove behind `IressModal` confirmation, not a single click
- [ ] Dangerous buttons are visually distinct — `status="danger"` on `IressButton` prevents casual clicks
- [ ] Dropdown menus place destructive items last and visually separate — `IressContextualMenu` convention

#### 6. Recognition Rather Than Recall

Minimise the user's memory load by making elements, actions, and options visible.

- [ ] Navigation is persistent — `IressSideNav` keeps sections visible rather than hidden behind hamburger menus on desktop
- [ ] Breadcrumbs show location — `IressBreadcrumbs` reminds users where they are in the hierarchy
- [ ] Form labels are always visible — `IressField` labels appear above inputs, not as disappearing placeholder text
- [ ] Actions are visible, not hidden — use `IressButton` for primary actions, `IressContextualMenu` for secondary, avoid burying actions in deep menus
- [ ] Searchable options for long lists — `IressDropdownMenu` with `searchable` for 10+ options, `IressAutocomplete` for typeahead

#### 7. Flexibility and Efficiency of Use

Accelerators — unseen by the novice user — may speed up interaction for the expert user.

- [ ] Keyboard shortcuts for power users — ensure all interactive IDS components respond to standard keyboard patterns (Enter, Space, Escape, Arrow keys)
- [ ] Skip links for keyboard users — `IressSkipLink` lets experienced keyboard users bypass repetitive navigation
- [ ] Searchable selects — `IressSelect` and `IressDropdownMenu` with search enabled let power users type to filter instead of scrolling
- [ ] Autocomplete for repetitive input — `IressAutocomplete` reduces typing for known-value fields
- [ ] Responsive layouts — `IressHide`, `hideFrom`/`hideBelow` adapt the interface for different device contexts

#### 8. Aesthetic and Minimalist Design

Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.

- [ ] Use IDS typography scale — `IressText` with appropriate `textStyle` creates clear visual hierarchy without custom styling
- [ ] Spacing is consistent and intentional — `IressStack`, `IressInline`, and spacing tokens prevent visual clutter
- [ ] One primary action per section — `mode="primary"` on a single `IressButton` draws the eye to what matters
- [ ] Use `IressCard` / `IressPanel` to group related content — rather than showing everything in a flat layout
- [ ] Loading states use `IressLoading` progressive disclosure — no indicator <500ms, spinner at 500ms, message at 2s (avoids unnecessary visual noise for fast operations)
- [ ] Alerts are used sparingly and appropriately — `IressAlert` for persistent status, `IressToaster` for transient feedback

#### 9. Help Users Recognise, Diagnose, and Recover from Errors

Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.

- [ ] Validation messages are human-readable — `IressFormField` `rules` `message` prop provides user-friendly text, not technical codes
- [ ] Errors appear next to the relevant field — `IressFormField` and `IressField` display inline validation, not in a separate area
- [ ] Summary of errors for long forms — `IressValidationSummary` at the top of long forms helps users find all issues
- [ ] Status indicators are clear — `IressField` `status="danger"` with `statusMessage` for field-level errors, `IressAlert status="danger"` for page-level errors
- [ ] Error state is visually distinct — IDS danger tokens (red border, red text) are applied automatically by `status="danger"`
- [ ] Recovery path is clear — error messages suggest what to do (e.g., "Enter a valid email address" not just "Invalid input")

#### 10. Help and Documentation

Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.

- [ ] Hint text guides input — `IressField` and `IressFormField` `hint` prop provides contextual guidance below the label
- [ ] Tooltips explain non-obvious UI — `IressTooltip` for supplementary information on icons, abbreviations, or complex fields
- [ ] Placeholder text is supplementary, not the only label — `placeholder` is used alongside `IressField` `label`, never as a replacement
- [ ] Complex workflows have contextual help — use `IressAlert status="info"` or `IressPopover` to explain steps in multi-part processes

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

- **Component docs:** `packages/components/.ai/components/`
- **Pattern docs:** `packages/components/.ai/patterns/`
- **Token usage:** `packages/tokens/.ai/skills/token-usage.md`
- **Figma mapping:** `packages/components/.ai/skills/figma-to-ids.md`
- **UI translation:** `packages/components/.ai/skills/ui-translation.md`
- **Index (full component list):** `packages/components/.ai/index.json`
- **Guidelines site:** https://iress.github.io/design-system
- **Storybook:** https://main--691abcc79dfa560a36d0a74f.chromatic.com
