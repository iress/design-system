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
