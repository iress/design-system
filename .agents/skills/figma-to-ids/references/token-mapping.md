# Figma Design Values → IDS Token Mapping

## Colours

Map Figma fill/stroke colours to IDS colour tokens:

| Figma Colour              | IDS Token                    | CSS Variable                         |
| ------------------------- | ---------------------------- | ------------------------------------ |
| Primary/Fill `#003271`    | `colour.primary.fill`        | `--iress-colour-primary-fill`        |
| Primary/Surface `#EBF3FF` | `colour.primary.surface`     | `--iress-colour-primary-surface`     |
| Neutral/10 `#FFFFFF`      | `colour.neutral.10`          | `--iress-colour-neutral-10`          |
| Neutral/20 `#F5F6F8`      | `colour.neutral.20`          | `--iress-colour-neutral-20`          |
| Neutral/30 `#E2E6EA`      | `colour.neutral.30`          | `--iress-colour-neutral-30`          |
| Neutral/80 `#384666`      | `colour.neutral.80`          | `--iress-colour-neutral-80`          |
| Neutral/90 `#141F4D`      | `colour.neutral.90`          | `--iress-colour-neutral-90`          |
| Success/Fill `#37C49C`    | `colour.system.success.fill` | `--iress-colour-system-success-fill` |
| Danger/Fill `#C21010`     | `colour.system.danger.fill`  | `--iress-colour-system-danger-fill`  |
| Warning/Fill `#F0AD03`    | `colour.system.warning.fill` | `--iress-colour-system-warning-fill` |
| Info/Fill `#669AFF`       | `colour.system.info.fill`    | `--iress-colour-system-info-fill`    |
| Accent/Fill `#C26EF4`     | `colour.accent.fill`         | `--iress-colour-accent-fill`         |

## Spacing (px → Token)

IDS base spacing unit = 4px (0.25rem). Map Figma pixel values:

| Figma px | IDS Token | Alias |
| -------- | --------- | ----- |
| 0px      | `0`       | none  |
| 4px      | `1`       | xs    |
| 8px      | `2`       | sm    |
| 12px     | `3`       | —     |
| 16px     | `4`       | md    |
| 20px     | `5`       | —     |
| 24px     | `6`       | lg    |
| 28px     | `7`       | —     |
| 32px     | `8`       | —     |
| 40px     | `10`      | xl    |

> For values not on the 4px grid, round to the nearest token value.

## Border Radius

| Figma px | IDS Token  | System Usage        |
| -------- | ---------- | ------------------- |
| 0px      | `radius.0` | Square corners      |
| 4px      | `radius.1` | Button, form, tag   |
| 8px      | `radius.2` | —                   |
| 12px     | `radius.3` | Layout, card, panel |
| 16px     | `radius.4` | Pill, badge         |

## Typography

Prefer semantic HTML elements via the `element` prop — they convey meaning to screen readers. Only fall back to `textStyle` when no semantic element matches the visual treatment.

| Figma Text Style                   | IDS Token                    | Component                                                                    |
| ---------------------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| Heading / H1 (Ubuntu 24px/500)     | `typography.heading.1`       | `<IressText element="h1">`                                                   |
| Heading / H2 (Ubuntu 20px/500)     | `typography.heading.2`       | `<IressText element="h2">`                                                   |
| Heading / H3 (Ubuntu 18px/500)     | `typography.heading.3`       | `<IressText element="h3">`                                                   |
| Heading / H4 (Ubuntu 16px/500)     | `typography.heading.4`       | `<IressText element="h4">`                                                   |
| Heading / H5 (Ubuntu 16px/400)     | `typography.heading.5`       | `<IressText element="h5">`                                                   |
| Body / MD Regular (Inter 14px/400) | `typography.body.md.regular` | `<IressText>` (default) or `<IressText element="p">` for paragraph semantics |
| Body / MD Strong (Inter 14px/600)  | `typography.body.md.strong`  | `<IressText element="strong">` — conveys emphasis to screen readers          |
| Body / SM Regular (Inter 12px/400) | `typography.body.sm`         | `<IressText element="small">` — conveys fine print / secondary text          |
| Body / SM Strong (Inter 12px/600)  | `typography.body.sm.strong`  | `<IressText element="small"><strong>...</strong></IressText>`                 |
| Code (Space 16px/400)              | `typography.code`            | `<IressText element="code">`                                                 |

> **When to use `textStyle`:** Only when you need to visually override the default styling of a semantic element — e.g. making an `h2` look like an `h4` for visual hierarchy while keeping the correct heading level for accessibility: `<IressText element="h2" textStyle="typography.heading.4">`.

> **Tip:** When translating Figma frames that contain mixed or unstructured text (e.g. CMS content, markdown, rich text blocks), wrap the content in `IressText` and nest native HTML elements (`<p>`, `<strong>`, `<a>`, `<ul>`, etc.) inside it. This is an allowed pattern that lets `IressText` apply consistent typography while preserving the original content structure.
