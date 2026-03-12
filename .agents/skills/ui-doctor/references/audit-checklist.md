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
- [ ] `IressAlert` is used for status messages (automatically uses appropriate ARIA roles)
- [ ] `IressToaster` is used for transient notifications (uses `aria-live` region)
- [ ] No reliance on colour alone to convey information — use text, icons, or patterns alongside colour

## Layout

- [ ] Vertical stacks use `IressStack`
- [ ] Horizontal rows use `IressInline`
- [ ] Grid layouts use `IressRow` + `IressCol`
- [ ] Spacing props use IDS token values (0–10)
- [ ] Responsive visibility uses `IressHide` or `hideFrom`/`hideBelow`

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

## Usability Heuristics

Evaluate the application against these usability principles (based on [Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)). Each heuristic includes concrete IDS guidance for how to satisfy it.

### 1. Visibility of System Status

The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

- [ ] Loading states use `IressLoading` with the correct pattern (`page`, `component`, `start-up`, `validate`, `long`) so users always see feedback proportional to wait time; `IressSkeleton` is also valid for custom content placeholder patterns where skeleton screens mirror the page layout
- [ ] Form submission provides visible feedback — use `IressLoading pattern="validate"` during submission, `IressAlert` or `IressToaster` for success/failure
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
- [ ] Responsive layouts — `IressHide`, `hideFrom`/`hideBelow` adapt the interface for different device contexts

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
