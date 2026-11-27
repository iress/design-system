# IDS Foundations

> 9 docs

---

# Accessibility

Accessibility is everyone's responsibility. It ensures that all users, regardless of their abilities or disabilities, can access and interact with our components effectively. This document outlines the key practices for building accessible components we follow within IDS.

Please note: The default behaviour of our components is to be accessible, but it is the responsibility of the product to ensure that they are used correctly in accessible context, or any modifications made to them do not compromise accessibility.

## Interaction Patterns

### Keyboard Navigation

- Support standard keyboard shortcuts (Tab, Arrow keys, Enter, Space, Escape)
- Implement proper focus order and visual focus indicators
- Provide keyboard alternatives for mouse-only interactions
- Follow established ARIA patterns for complex widgets

### Touch Interactions

- Provide adequate touch target sizes
- Implement touch-friendly spacing between interactive elements
- Support gesture-based interactions where appropriate
- Ensure consistent behaviour across device types

### Loading and Feedback

- Use appropriate loading patterns based on context:
  - **Page**: Full page loading states
  - **Component**: Local loading within sections
  - **Button**: Inline loading for form submissions
  - **Validate**: Server-side validation feedback
- Provide clear success and error feedback
- Use progressive enhancement for better perceived performance

---

# Content & Iconography

Clear language and purposeful icons work together to guide users through
complex financial workflows. This page covers both written content (microcopy)
and visual symbols (icons).

---

## Microcopy

Microcopy is the short text that appears on buttons, labels, tooltips, error
messages, and empty states. In financial software, precise language reduces
errors and builds trust.

### Principles

- **Match user mental models** — use terms your users already know from their
  domain (e.g. "adviser", "portfolio", "settlement date") rather than internal
  system terminology.
- **Be concise** — every word in the UI should earn its place. If a label can
  be two words, don't make it five.
- **Be actionable** — error messages should explain what went wrong *and* what
  to do next (e.g. "Enter a valid email address" not "Invalid input").
- **Use sentence case** — for labels, headings, and button text. Title Case is
  reserved for proper nouns only.
- **Maintain consistent tone** — professional, clear, and helpful. Avoid jargon,
  humour, or overly casual language in transactional flows.

### Common patterns

| Element | Guidance | Example |
|---------|----------|---------|
| Button label | Start with a verb, keep to 1–3 words | "Save changes", "Delete record" |
| Error message | State the problem and the fix | "Email is required. Enter a valid email address." |
| Empty state | Explain what belongs here and how to add it | "No transactions yet. Import a CSV or add one manually." |
| Tooltip | One sentence max, no period | "Opens in a new tab" |
| Confirmation | Describe the consequence | "This will permanently delete 3 records." |

### Progressive disclosure

Reveal information as users need it rather than all at once. Use hints, expand
sections, and tooltips to layer detail without overwhelming the primary flow.

---

## Iconography

Icons are a key part of the Iress Design System, providing visual cues and
enhancing user experience.

- [Figma design](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=6200-9)

## Principles

1. **Clarity**: Icons should be easily recognizable and convey their intended meaning without ambiguity.
2. **Consistency**: Use a consistent style and size for icons across the application to maintain visual harmony.
3. **Simplicity**: Avoid overly complex icons; simplicity aids in quick recognition.
4. **Accessibility**: Ensure icons are accessible to all users, including those using screen readers. Provide appropriate alternative text.

## Usage Guidelines

- Use icons to complement text, not replace it. Always provide a text label alongside an icon when its meaning may not be immediately clear.
- Maintain adequate spacing around icons to prevent visual clutter.
- Use icons sparingly to avoid overwhelming users. Only include icons that add value to the user experience.
- Follow the established colour tokens for icons to ensure they align with the overall design aesthetic.
- Do not use utility icons for decorative purposes; they should always serve a functional role. For decorative icons, consider using an illustration instead.

## Icon Library

### Material Symbols

The chosen icon library for the Iress Design System is Material Symbols. This library offers a wide range of icons that are versatile and adaptable to various use cases.

The settings we use for Material Symbols are.

- Style: Rounded
- Weight: (see Storybook)
- Fill: 0 (1 for active icons)
- Grade: (see Storybook)
- Optical Size: (see Storybook)

If you need to explore the available icons, you can visit the Material Symbols library here:

- [Material Symbols](https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Symbols)

### Figma plugin

If you are using Figma, we recommend the [Material Symbols plugin](https://www.figma.com/community/plugin/1088610476491668236/material-symbols) with the below settings:

- Style: Rounded
- Weight: (see Storybook)
- Fill: Off (On for active icons)
- Grade: (see Storybook)
- Optical Size: (see Storybook)

### `IressIcon` Component

The `IressIcon` component is used to render icons from the Material Symbols library based on the guidelines outlined above.

```tsx
<IressIcon name="home" />;
```

### Migrating from Font Awesome

To help with migrating, we have mapped some common Font Awesome icons to their Material Symbols equivalents.

Please refer to the table below for guidance.

| Font Awesome | Material Symbol |
|-------------|-----------------|
| `times-circle` | `cancel` |
| `lock-alt` | `lock` |
| `chevron-down` | `keyboard_arrow_down` |
| `chevron-up` | `keyboard_arrow_up` |
| `chevron-left` | `keyboard_arrow_left` |
| `chevron-right` | `keyboard_arrow_right` |
| `chevron-double-down` | `keyboard_double_arrow_down` |
| `chevron-double-up` | `keyboard_double_arrow_up` |
| `chevron-circle-down` | `expand_circle_down` |
| `arrow-left` | `arrow_back` |
| `arrow-right` | `arrow_forward` |
| `arrow-up` | `arrow_upward` |
| `arrow-down` | `arrow_downward` |
| `user-circle` | `account_circle` |
| `power-off` | `power_settings_new` |
| `ellipsis-v` | `more_vert` |
| `ellipsis-h` | `more_horiz` |
| `file-image` | `image` |
| `file-pdf` | `picture_as_pdf` |
| `file-spreadsheet` | `table_chart` |
| `file-word` | `description` |
| `folder-open` | `folder_open` |
| `info-circle` | `info` |
| `question-circle` | `help` |
| `exclamation-triangle` | `warning` |
| `external-link` | `open_in_new` |
| `info-square` | `info` |
| `align-left` | `format_align_left` |
| `align-center` | `format_align_center` |
| `align-right` | `format_align_right` |
| `align-justify` | `format_align_justify` |
| `spinner-third` | `progress_activity` |
| `file-alt` | `draft` |
| `plus-circle` | `add_circle` |

---

# Overview

The Iress Design System (IDS) is a shared library of React components, design
tokens, and guidelines that Iress product teams use to build consistent,
accessible, and performant user interfaces.

## Why a design system?

Iress builds financial software used by advisers, traders, lenders, and their
clients. These users work in complex, data-rich environments where clarity and
reliability are non-negotiable. A design system helps us:

- **Ship faster** — teams reuse proven components instead of rebuilding common
  UI patterns from scratch.
- **Stay consistent** — shared tokens and components mean every product looks
  and behaves the same, reducing cognitive load for users who switch between
  Iress tools.
- **Meet accessibility standards** — components are built to WCAG 2.1 AA by
  default, so teams start compliant rather than retrofitting later.
- **Reduce maintenance** — bug fixes and improvements propagate to every product
  through a single dependency update.

## Who is it for?

| Audience | How they use IDS |
|----------|-----------------|
| **Designers** | Use the Figma library to create layouts that map directly to coded components. |
| **Developers** | Install `@iress-oss/ids-components` and compose UIs using React components and design tokens. |
| **Product managers** | Reference the guidelines to understand available patterns and make informed scope decisions. |
| **QA engineers** | Use the documented accessibility and keyboard specs to verify implementations. |
| **Business analysts** | Reference components and patterns to write accurate requirements and map user flows to existing UI capabilities. |

## How this documentation is organised

| Section | What you'll find |
|---------|-----------------|
| **Get Started** | Installation, Figma setup, and CSP configuration. |
| **Foundations** | The *why* — design principles, accessibility philosophy, UX heuristics, and visual standards. |
| **Tokens** | The design language — colour, typography, spacing, and radius values used across all components. |
| **Styling Props** | How to apply tokens via component props for layout, spacing, colour, and typography. |
| **Components** | Individual component documentation with design guidance, code examples, and accessibility specs. |
| **Patterns** | Multi-component recipes for common UI tasks like forms, loading states, and navigation. |
| **Resources** | Migration guides for upgrading between major versions. |

## Guiding principles

IDS is built on four pillars. Each is explored in detail in its own page:

1. [Consistency](../foundations/principles.md#consistency) — predictable patterns
   reduce user friction and speed up development.
2. [Accessibility First](../foundations/principles.md#accessibility-first) — every
   component meets WCAG 2.1 AA out of the box.
3. [Clarity and Usability](../foundations/principles.md#clarity-and-usability) — clear
   hierarchy and immediate feedback over visual novelty.
4. [Developer Experience](../foundations/principles.md#developer-experience) — clean
   APIs, comprehensive docs, and efficient testing.

## Next steps

- **Designers**: [Set up Figma](../get-started/design.md)
- **Developers**: [Install and start building](../get-started/develop.md)
- **Everyone**: [Core design principles](../foundations/principles.md)

---

# Core Design Principles

## Consistency

- Maintain brand consistency across all applications and experiences
- Use standardised component naming conventions (all components start with `Iress` prefix)
- Leverage shared design tokens for spacing, colours, typography, and interactive states
- Ensure consistent behaviour patterns across similar components

## Accessibility First

- Meet or exceed WCAG 2.1 Level AA Accessibility Guidelines
- Provide proper colour contrast ratios (minimum 4.5:1 for AA, 7:1 for AAA)
- Implement comprehensive keyboard navigation support
- Include screen reader compatibility with appropriate ARIA attributes
- Support focus management and skip navigation patterns
- Document accessibility considerations and requirements

## Clarity and Usability

- Prioritise clear visual hierarchy through typography scales and spacing systems
- Use progressive disclosure to manage complexity
- Provide immediate feedback for user actions (loading states, validation, etc.)
- Design for touch-friendly interfaces with adequate target sizes

## Developer Experience

- Maintain clean component APIs with predictable prop patterns
- Provide comprehensive documentation with usage examples
- Include common patterns and anti-patterns
- Support both controlled and uncontrolled component patterns
- Enable efficient testing strategies with semantic roles and accessible queries
- Maintain up-to-date prop documentation and type definitions

## Quality assurance

- Test components across supported browsers and devices
- Validate accessibility compliance with automated and manual testing
- Ensure proper keyboard navigation functionality
- Test with assistive technologies (screen readers, voice control)

### Code Standards

- Follow consistent naming conventions for CSS classes and component props
- Use semantic HTML elements where appropriate
- Implement proper TypeScript typing for better developer experience
- Maintain clean separation between presentation and logic

### Performance Considerations

- Optimise component rendering and re-rendering
- Implement appropriate code splitting strategies
- Use efficient animation and transition patterns
- Consider bundle size impact of component dependencies

---

# Responsive layout

The Iress Design System (IDS) is built with responsive design principles in mind. This means that our components are designed to adapt to different screen sizes and orientations, ensuring a consistent user experience across devices.

## Breakpoints

- Implement mobile-first responsive design
- Use consistent breakpoint values across all components
- Provide appropriate component variants for different screen sizes
- Consider content priority and progressive disclosure on smaller screens

| Breakpoint | Screen Widths |
|------------|---------------|
| `xs` | 0 - 575px |
| `sm` | 576px - 767px |
| `md` | 768px - 1023px |
| `lg` | 1024px - 1279px |
| `xl` | 1280px - 1599px |
| `xxl` | 1600px and above |

### Extra-small screens (`xs`)

| Property | Value |
|----------|-------|
| Screen widths | 0 - 575px |
| Min screen width | 0px |
| Max screen width | 575px |
| Container max width | 100% |
| Margin | `spacing.4` |

### Small screens (`sm`)

| Property | Value |
|----------|-------|
| Screen widths | 576px - 767px |
| Min screen width | 576px |
| Max screen width | 767px |
| Container max width | 100% |
| Margin | `spacing.4` |

### Medium screens (`md`)

| Property | Value |
|----------|-------|
| Screen widths | 768px - 1023px |
| Min screen width | 768px |
| Max screen width | 1023px |
| Container max width | 100% |
| Margin | `spacing.6` |

### Large screens (`lg`)

| Property | Value |
|----------|-------|
| Screen widths | 1024px - 1279px |
| Min screen width | 1024px |
| Max screen width | 1279px |
| Container max width | 100% |
| Margin | `spacing.6` |

### Extra-large screens (`xl`)

| Property | Value |
|----------|-------|
| Screen widths | 1280px - 1599px |
| Min screen width | 1280px |
| Max screen width | 1599px |
| Container max width | 1440px |
| Margin | `spacing.6` |

### Extremely large screens (`xxl`)

| Property | Value |
|----------|-------|
| Screen widths | 1600px and above |
| Min screen width | 1600px |
| Container max width | 1690px |
| Margin | `spacing.6` |

---

## For designers

- [Figma design](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=6200-11)

When designing for responsive layouts, consider how your designs will adapt to different screen sizes. Use the breakpoints defined in the design system to guide your layout decisions and ensure that your designs are flexible and adaptable.

### Tips

1. Use the example viewport sizes provided in the breakpoints table to show your designs at different screen widths.
2. Prioritise content based on screen size — identify the primary task on each page and ensure the mobile layout focuses on it.
3. Relocate secondary content (filters, sidebars, metadata panels) into a slideout or collapsible section on mobile rather than simply stacking everything vertically.
4. Reduce option counts on mobile devices where appropriate.
5. Implement responsive navigation patterns.
6. Adjust spacing and sizing for different contexts.
7. Maintain usability across all supported devices — all functionality should remain accessible on mobile, just reorganised into appropriate containers.

---

## For developers

If you are using the IDS components, the breakpoints have already been mapped out to their respective props. You can use props such as `gap` to change the visual properties of the component at certain breakpoints.

```jsx
import { IressStack } from '@iress-oss/ids-components';

<IressStack gap={{ xs: 'spacing.1', md: 'spacing.2' }} />;
```

### Hooks

#### `useBreakpoint`

We also provide a `useBreakpoint` hook that allows you to access the current breakpoint in your components. This can be useful for conditionally rendering components based on the current screen size.

**Note:** It is best to use media queries for responsive styling. Most props that require responsive values already support breakpoints which map to CSS values. Only use the `useBreakpoint` hook when there is no other way to achieve the desired responsive behavior.

```jsx
import { useBreakpoint } from '@iress-oss/ids-components';

const MyComponent = () => {
  const { breakpoint } = useBreakpoint();

  return (
    <div>
      {breakpoint === 'xs' && <p>This is extra small screen</p>}
      {breakpoint === 'md' && <p>This is medium screen</p>}
    </div>
  );
};
```

#### `useResponsiveProps`

Another hook is `useResponsiveProps`, which allows you to define responsive properties that change based on the current breakpoint. This is particularly useful for completely changing components at various screen sizes.

**Note:** It is best to use media queries for responsive styling. Most props that require responsive values already support breakpoints which map to CSS values. Only use the `useResponsiveProps` hook when there is no other way to achieve the desired responsive behavior.

```tsx
import { IressTable, useResponsiveProps } from '@iress-oss/ids-components';

export function ResponsiveTableColumns() {
  const { value: columns } = useResponsiveProps({
    base: [{ key: 'name', label: 'Name' }],
    lg: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
    ],
  });

  return (
    <IressTable
      caption="Responsive columns example"
      columns={columns}
      rows={[
        { name: 'Luke Skywalker', age: 19 },
        { name: 'Princess Leia', age: 19 },
        { name: 'Han Solo', age: 32 },
      ]}
    />
  );
}
```

### Constant

You can also use the breakpoints directly in your CSS or styled components. The breakpoints are defined in the `@iress-oss/ids-components` package.

```jsx
import { BREAKPOINT_DETAILS } from '@iress-oss/ids-components';

const css = `
  @media (${BREAKPOINT_DETAILS.md.mediaQuery}}) {
    .my-class {
      padding: 20px;
    }
  }
`;

<style>{css}</style>;
```

The base grid size is exported as `GRID_SIZE` from the `@iress-oss/ids-components` package, in case you need to reference it in your own code.

---

# User experience

We use heuristic guidelines to assess the usability and user-centred design quality of all Iress products.

## System Feedback

- Always show users where they are, what just happened, and what’s possible next.
- Provide immediate visual and textual feedback for all actions and states.
- Ensure feedback is clear, contextual, and proportionate to the importance of the action.

## Language and Mental Models

- Use user-centred language and avoid technical jargon.
- Follow cultural and industry conventions for colour, iconography, terminology, and layout.
- Align interaction patterns with real-world analogues wherever feasible.

## Control and Forgiveness

- Make actions reversible and provide undo where errors may occur.
- Let users easily backtrack, edit inputs, or abandon flows.
- Provide escape hatches from any process without penalty.

## Standards and Consistency

- Use consistent layout, labelling, iconography, and grammar.
- Reinforce expectations by placing similar elements in predictable positions.
- Apply colour, spacing, and visual patterns consistently across all screens.

## Error Prevention and Recovery

- Prevent errors by anticipating misuse and validating early.
- Phrase error messages with clarity, empathy, and constructive suggestions.
- Where errors occur, explain why and how they can be resolved.

## Recognition Over Recall

- Display necessary information at the point of decision.
- Use visual grouping, spacing, and affordance to reveal hierarchy.
- Prioritise visual clarity over novelty.

## Simplicity and Minimalism

- Remove unnecessary detail—every word, element, or feature should earn its place.
- Design for clarity of purpose with visually distinct, semantically meaningful UI components.
- Use whitespace, clean alignment, and simplified flows to reduce cognitive load.

---

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
[Common Mistakes](../get-started/common-mistakes.md#using-disabled-on-iressbutton).

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

---

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

---

# Z-index (stacking)

The z-index determines the stacking order of elements. Elements with a higher z-index always sit in front of elements with a lower z-index. Each index has been mapped to the appropriate elevation(s).

| Name | Usage | Value |
|------|-------|-------|
| `DEFAULT` | The default z-index used for most elements. Can be combined with raised and floating elevations. | 0 |
| `NAVBAR` | Used for navbars. Can be combined with overflow elevation. | 100 |
| `POPOVER` | Used for IressPopover. Can be combined with floating elevation. | 200 |
| `SLIDEOUT` | Used for IressSlideout. Can be combined with floating elevation. | 300 |
| `MODAL` | Used for IressModal. Can be combined with floating elevation. | 400 |
| `TOAST` | Used for IressToast. Can be combined with floating elevation. | 500 |
| `TOOLTIP` | Used for IressTooltip. Can be combined with floating elevation. | 600 |

---

## For developers

If you are using the IDS components, the z-indexes have already been mapped out to their respective components based on the usage above. They are hardcoded into the components, so you don't need to worry about them.

The mapping is exported as `Z_INDEX` from the `@iress-oss/ids-components` package, in case you need to reference it in your own code.