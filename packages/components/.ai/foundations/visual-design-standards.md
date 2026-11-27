# Visual Design Standards

Visual consistency builds user trust. When every Iress product uses the same
type scale, colour semantics, spacing rhythm, and interaction patterns, users
learn the interface once and can transfer that knowledge across tools. These
standards are encoded in our [design tokens](../tokens/colour.md) so teams don't need
to memorise values — just use the tokens and the consistency follows.

## Typography

IDS uses a deliberate type hierarchy to create scannable, data-rich screens:

- **Heading font (Ubuntu)** — friendly and distinctive; establishes brand
  presence without competing with data.
- **Body font (Inter)** — optimised for screen legibility at small sizes, which
  matters in tables and forms.
- **Systematic scale (H1–H5, body.md, body.sm)** — each step is mathematically
  derived from a 14px base, so relationships between headings and body text are
  predictable.
- **Weight as meaning** — `regular` for content, `medium` for interactive
  elements (links, buttons), `strong` for emphasis within a paragraph.

See [Typography Tokens](../tokens/typography.md) for exact values.

## Colour System

Colour carries meaning in financial interfaces. IDS enforces semantic colour so
that users can scan a screen and instantly distinguish positive from negative,
primary actions from secondary ones:

| Role | Purpose | Example tokens |
|------|---------|---------------|
| **Neutral** | Backgrounds, text, borders — no inherent meaning | `colour.neutral.10`–`90` |
| **Primary** | Brand identity, interactive controls, focus | `colour.primary.fill`, `.text` |
| **Success** | Positive outcomes, confirmations | `colour.system.success.*` |
| **Danger** | Errors, destructive actions | `colour.system.danger.*` |
| **Warning** | Caution, non-blocking alerts | `colour.system.warning.*` |
| **Positive/Negative** | Financial context (buy/sell) | `colour.system.positive.*`, `.negative.*` |

Every colour pairing in the system meets WCAG 2.1 AA contrast (4.5:1 minimum).
See [Colour Tokens](../tokens/colour.md) for the full palette with compliant
pairings.

## Spacing and Layout

Consistent spacing creates rhythm and helps users parse dense screens:

- **4px base unit** — all spacing values are multiples of 4px (`spacing.1` =
  4px, `spacing.4` = 16px). This prevents arbitrary gaps and ensures alignment
  across components.
- **Responsive spacing** — components accept responsive objects so padding and
  gaps adapt to screen size without custom media queries.
- **Layout primitives** — use `IressStack`, `IressInline`, `IressRow`/`IressCol`
  instead of writing custom flexbox. They enforce the spacing scale
  automatically.

See [Spacing Tokens](../tokens/spacing.md) for the full scale.

## Interactive States

Every interactive element must communicate its state clearly:

| State | Visual treatment |
|-------|-----------------|
| **Default** | Resting appearance with adequate contrast |
| **Hover** | Subtle background or border colour shift (never colour alone) |
| **Focus** | Visible focus ring — never remove or hide the outline |
| **Active/Pressed** | Momentary feedback (darker shade or depression) |
| **Disabled** | Reduced opacity; avoid where possible — prefer validation on click |
| **Loading** | Spinner replaces content; prevents duplicate actions |

Transitions use a consistent 150ms ease-out timing to feel responsive without
being distracting.

## Applying these standards

You don't need to memorise values. The standards are baked into:

1. **Design tokens** — use `colour.primary.fill` not `#003271`
2. **Component props** — `<IressButton mode="primary">` applies correct fill,
   hover, focus, and loading states automatically
3. **Styling props** — `<IressStack gap="spacing.4" p="spacing.6">` enforces
   the spacing scale

When building custom elements outside the component library, reference the
tokens via CSS variables (e.g. `var(--iress-spacing-4)`) to stay aligned.