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

<StoryEmbed id="components-icon--default"/>

### Migrating from Font Awesome

To help with migrating, we have mapped some common Font Awesome icons to their Material Symbols equivalents.

Please refer to the table below for guidance.

<StoryEmbed id="components-icon--font-awesome-to-material-migration" controls={false} />