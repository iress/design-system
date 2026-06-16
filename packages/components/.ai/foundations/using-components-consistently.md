# Using components consistently

Consistency isn't about rigid rules — it's about reducing surprise. When a
primary button always means "this is the main action", users learn to scan a
screen and act with confidence. When the same component behaves differently
across products, that confidence erodes.

This page summarises the key consistency rules for the most common component
categories. Each links to the full component documentation for details.

---

## Buttons

Buttons are the primary way users take action. Use mode to signal priority:

| Mode | Role | Rule |
|------|------|------|
| **Primary** | The main call-to-action | One per view. If you have two primary buttons competing, one should be secondary. |
| **Secondary** | Supporting actions | Use alongside or below the primary action. |
| **Tertiary** | Low-emphasis alternative | Extra affordance when secondary isn't distinct enough. |
| **Muted** | Minimal chrome | Toolbars, inline with headings, icon-only actions. |
| **Danger** | Destructive actions | Always pair with a confirmation step (Modal or inline). |
| **Positive/Negative** | Financial transactions | Buy/sell contexts only. |

Avoid `disabled` — keep buttons enabled and use validation or loading states
instead. See [Button](../components/button.md) and
[Common Mistakes](../foundations/common-mistakes.md#using-disabled-on-iressbutton).

---

## Forms

Forms collect and validate user input. Consistency here directly reduces
data-entry errors:

- Always wrap inputs in `IressField` (standalone) or `IressFormField` (inside
  `IressForm`) for labels, hints, and error placement.
- Use the `short` pattern (≤ 8 fields, validate on submit) or `long` pattern
  (> 8 fields, validate on blur) — don't mix them in the same product.
- Size inputs to hint at expected length (`sizing` prop) — a postcode field
  shouldn't be the same width as an address field.
- Mark required fields with the `required` rule; IDS renders the asterisk
  automatically.

See [Form](../patterns/form.md) and [Field](../components/field.md).

---

## Navigation

- Use `IressSideNav` or `IressBreadcrumbs` for structural navigation — never
  raw `<nav>` with custom links.
- Provide `IressSkipLink` at the top of every page for keyboard users.
- Apply `aria-current="page"` via the component's built-in active state rather
  than styling it manually.

See [SideNav](../patterns/side-nav.md) and [Breadcrumbs](../patterns/breadcrumbs.md).

---

## Data Display

- Use `IressTable` with proper `<thead>` column headers for tabular data.
- Use consistent row hover (`colour.primary.surfaceHover`) and selected row
  (`colour.accent.surface`) tokens.
- Apply the [Loading pattern](../patterns/loading.md) with `pattern="component"` for
  table-level loading, not a full-page spinner.

See [Table](../components/table.md).

---

## Modals and Overlays

- **Modal** — blocks interaction; use for tasks that need full attention or
  confirmation.
- **Slideout** — doesn't fully block; use for supplementary tasks where the user
  may reference the underlying page.
- **Popover / Tooltip** — non-blocking, ephemeral; use for hints and secondary
  controls.

Never nest modals. If a flow requires two layers of overlay, consider whether
the first layer should be a page instead.

See [Modal](../components/modal.md), [Slideout](../components/slideout.md), and the
[Feedback pattern](../patterns/feedback.md) for a full decision guide.