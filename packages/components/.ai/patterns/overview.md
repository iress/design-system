# Overview

<IressTabSet panelStyle={{ pt: 'spacing.4' }}>

<IressTab label="Explore">

<StoryEmbed id="patterns-introduction--docs" controls={false} />

</IressTab>

<IressTab label="What are patterns?">

Patterns are multi-component recipes that solve recurring UI problems. While
components are individual building blocks, patterns show how to assemble them
into cohesive experiences — forms, navigation, loading states, and feedback
flows.

## How patterns differ from components

| | Component | Pattern |
|---|-----------|---------|
| **Scope** | Single element (e.g. a button, an input) | Multiple components working together |
| **Focus** | Props, states, accessibility of one element | User flow, layout, decision logic |
| **Example** | `IressButton` | A delete confirmation using Button + Modal + Toaster |

## Available patterns

| Pattern | What it solves |
|---------|---------------|
| [Breadcrumbs](../patterns/breadcrumbs.md) | Show hierarchical location and provide upward navigation. |
| [Contextual Menu](../patterns/contextual-menu.md) | Surface row-level or card-level actions in a compact overflow menu. |
| [Dropdown Menu](../patterns/dropdown-menu.md) | Filter or select from a list of options via a trigger button. |
| [Feedback](../patterns/feedback.md) | Decide between Alert, Toast, and Modal for communicating status. |
| [Form](../patterns/form.md) | Collect, validate, and submit user input with consistent UX. |
| [Loading](../patterns/loading.md) | Indicate progress during data fetching or processing. |
| [Search & Selection](../patterns/search-selection.md) | Combine search with selectable results (autocomplete, multi-select). |
| [Shadow](../patterns/shadow.md) | Isolate CSS in microfrontend or embedded contexts. |
| [Side Nav](../patterns/side-nav.md) | Persistent hierarchical navigation for applications. |

## When to use a pattern vs building custom

Use an IDS pattern when:

- The UI task is covered by one of the patterns above.
- You want consistent behaviour with other Iress products.
- You need built-in accessibility (focus management, keyboard nav, ARIA).

Build custom when:

- The interaction is unique to your product and has no parallel in other Iress
  tools.
- You've confirmed with design that no existing pattern fits.

Even custom flows should compose IDS components internally — only the
orchestration is custom, not the building blocks.

## Next steps

- [Feedback](../patterns/feedback.md) — the decision guide for choosing Alert vs
  Toast vs Modal
- [Form](../patterns/form.md) — end-to-end form validation and layout
- [Loading](../patterns/loading.md) — timing, behaviour, and pattern selection

</IressTab>
</IressTabSet>