# Complete Token Reference

The following tables list every available token. Default values shown are for the standard Iress theme — themes may override any token.

## Colour Tokens

### Neutral (grey scale)

| Token               | CSS Variable                | Default   |
| ------------------- | --------------------------- | --------- |
| `colour.neutral.10` | `--iress-colour-neutral-10` | `#FFFFFF` |
| `colour.neutral.20` | `--iress-colour-neutral-20` | `#F5F6F8` |
| `colour.neutral.30` | `--iress-colour-neutral-30` | `#E2E6EA` |
| `colour.neutral.40` | `--iress-colour-neutral-40` | `#CFD5DA` |
| `colour.neutral.50` | `--iress-colour-neutral-50` | `#A8B2BB` |
| `colour.neutral.60` | `--iress-colour-neutral-60` | `#828F9D` |
| `colour.neutral.70` | `--iress-colour-neutral-70` | `#5D6C7E` |
| `colour.neutral.80` | `--iress-colour-neutral-80` | `#384666` |
| `colour.neutral.90` | `--iress-colour-neutral-90` | `#141F4D` |

### Primary

| Token                         | CSS Variable                           | Default   |
| ----------------------------- | -------------------------------------- | --------- |
| `colour.primary.fill`         | `--iress-colour-primary-fill`          | `#003271` |
| `colour.primary.fillHover`    | `--iress-colour-primary-fill-hover`    | `#002352` |
| `colour.primary.onFill`       | `--iress-colour-primary-on-fill`       | `#FFFFFF` |
| `colour.primary.surface`      | `--iress-colour-primary-surface`       | `#EBF3FF` |
| `colour.primary.surfaceHover` | `--iress-colour-primary-surface-hover` | `#DCEAFE` |
| `colour.primary.text`         | `--iress-colour-primary-text`          | `#003271` |

### Accent

| Token                        | CSS Variable                          | Default   |
| ---------------------------- | ------------------------------------- | --------- |
| `colour.accent.fill`         | `--iress-colour-accent-fill`          | `#C26EF4` |
| `colour.accent.fillHover`    | `--iress-colour-accent-fill-hover`    | `#A855D9` |
| `colour.accent.onFill`       | `--iress-colour-accent-on-fill`       | `#1F0032` |
| `colour.accent.surface`      | `--iress-colour-accent-surface`       | `#E0BDF5` |
| `colour.accent.surfaceHover` | `--iress-colour-accent-surface-hover` | `#D4A6F2` |
| `colour.accent.text`         | `--iress-colour-accent-text`          | `#1F0032` |

### System — Status Colours

Each status group (`success`, `danger`, `warning`, `info`) has the same structure:

| Token suffix    | CSS Variable suffix | Success   | Danger    | Warning   | Info      |
| --------------- | ------------------- | --------- | --------- | --------- | --------- |
| `.fill`         | `-fill`             | `#37C49C` | `#c21010` | `#F0AD03` | `#669AFF` |
| `.fillHover`    | `-fill-hover`       | `#2DAB88` | `#B32727` | `#DA9D00` | `#5685E1` |
| `.onFill`       | `-on-fill`          | `#0A2E25` | `#FFF4F3` | `#2B1F00` | `#121D33` |
| `.surface`      | `-surface`          | `#EBF9F5` | `#FFEDEC` | `#FFF8E6` | `#E5EEFF` |
| `.surfaceHover` | `-surface-hover`    | `#D7F3EB` | `#FFD9D6` | `#FFEAA0` | `#CCDEFF` |
| `.text`         | `-text`             | `#006b44` | `#c21010` | `#825400` | `#0047ab` |

Full path example: `colour.system.success.fill` → `--iress-colour-system-success-fill`

### Data Visualisation

Two palettes (`subtle` for backgrounds, `bold` for foregrounds), each with slots `10`–`90`:

| Token              | CSS Variable                 | Subtle Default | Bold Default |
| ------------------ | ---------------------------- | -------------- | ------------ | --------- |
| `colour.data.*.10` | `--iress-colour-data-{subtle | bold}-10`      | `#FFE6F2`    | `#AC2C6A` |
| `colour.data.*.20` | `--iress-colour-data-{subtle | bold}-20`      | `#FEEAFF`    | `#AA20AF` |
| `colour.data.*.30` | `--iress-colour-data-{subtle | bold}-30`      | `#F1E6FF`    | `#7E38D7` |
| `colour.data.*.40` | `--iress-colour-data-{subtle | bold}-40`      | `#E5F5FF`    | `#006EB8` |
| `colour.data.*.50` | `--iress-colour-data-{subtle | bold}-50`      | `#E6EEFF`    | `#0055FF` |
| `colour.data.*.60` | `--iress-colour-data-{subtle | bold}-60`      | `#C8D7FF`    | `#0032B2` |
| `colour.data.*.70` | `--iress-colour-data-{subtle | bold}-70`      | `#E4FFFD`    | `#1D7C73` |
| `colour.data.*.80` | `--iress-colour-data-{subtle | bold}-80`      | `#BADFD4`    | `#124E3D` |
| `colour.data.*.90` | `--iress-colour-data-{subtle | bold}-90`      | `#ECECEC`    | `#384666` |

### Global Interactions

| Token                                 | CSS Variable                                    | Default     |
| ------------------------------------- | ----------------------------------------------- | ----------- |
| `colour.globalInteractions.backdrop`  | `--iress-colour-global-interactions-backdrop`   | `#61656bcc` |
| `colour.globalInteractions.focusRing` | `--iress-colour-global-interactions-focus-ring` | `#005BFF`   |

## Spacing Tokens

Base unit: `0.25rem` (4px). All relative tokens are multiples of the base.

| Token        | Alias  | CSS Variable         | Default              | Computed |
| ------------ | ------ | -------------------- | -------------------- | -------- |
| `spacing.0`  | `none` | `--iress-spacing-0`  | `0rem`               | 0px      |
| `spacing.1`  | `xs`   | `--iress-spacing-1`  | `0.25rem`            | 4px      |
| `spacing.2`  | `sm`   | `--iress-spacing-2`  | `calc(2 * 0.25rem)`  | 8px      |
| `spacing.3`  | —      | `--iress-spacing-3`  | `calc(3 * 0.25rem)`  | 12px     |
| `spacing.4`  | `md`   | `--iress-spacing-4`  | `calc(4 * 0.25rem)`  | 16px     |
| `spacing.5`  | —      | `--iress-spacing-5`  | `calc(5 * 0.25rem)`  | 20px     |
| `spacing.6`  | `lg`   | `--iress-spacing-6`  | `calc(6 * 0.25rem)`  | 24px     |
| `spacing.7`  | —      | `--iress-spacing-7`  | `calc(7 * 0.25rem)`  | 28px     |
| `spacing.8`  | —      | `--iress-spacing-8`  | `calc(8 * 0.25rem)`  | 32px     |
| `spacing.10` | `xl`   | `--iress-spacing-10` | `calc(10 * 0.25rem)` | 40px     |

> **Note:** There is no `spacing.9`. Valid values are `0`–`8` and `10`.

## Radius Tokens

Base unit: `0.25rem` (4px). All relative tokens are multiples of the base.

| Token      | CSS Variable       | Default             | Computed | Semantic Use                     |
| ---------- | ------------------ | ------------------- | -------- | -------------------------------- |
| `radius.0` | `--iress-radius-0` | `0px`               | 0px      | Square/sharp corners             |
| `radius.1` | `--iress-radius-1` | `0.25rem`           | 4px      | Buttons, form inputs, tags       |
| `radius.2` | `--iress-radius-2` | `calc(2 * 0.25rem)` | 8px      | General purpose                  |
| `radius.3` | `--iress-radius-3` | `calc(3 * 0.25rem)` | 12px     | Cards, panels, layout containers |
| `radius.4` | `--iress-radius-4` | `calc(4 * 0.25rem)` | 16px     | Pills, badges                    |

### System Radius (composite per-corner tokens)

System radius tokens assign a default radius to component categories. Themes can customise these independently:

| Token                  | Applies To                    | Default                |
| ---------------------- | ----------------------------- | ---------------------- |
| `radius.system.button` | Buttons, interactive elements | `radius.1` each corner |
| `radius.system.form`   | Form inputs, alerts           | `radius.1` each corner |
| `radius.system.layout` | Panels, modals, slideouts     | `radius.3` each corner |
| `radius.system.pill`   | Pills                         | `radius.4` each corner |
| `radius.system.tag`    | Tags                          | `radius.1` each corner |

## Typography Tokens

### Base

| Token                         | CSS Variable                           | Default                         |
| ----------------------------- | -------------------------------------- | ------------------------------- |
| `typography.base.size`        | `--iress-typography-base-size`         | `0.875rem` (14px)               |
| `typography.base.headingFont` | `--iress-typography-base-heading-font` | `Ubuntu, Helvetica, sans-serif` |
| `typography.base.bodyFont`    | `--iress-typography-base-body-font`    | `Inter, Helvetica, sans-serif`  |

### Headings (shorthand composite tokens)

| Token                  | CSS Variable                   | Weight | Size            | Line Height |
| ---------------------- | ------------------------------ | ------ | --------------- | ----------- |
| `typography.heading.1` | `--iress-typography-heading-1` | 500    | 24px (1.5rem)   | 1.33        |
| `typography.heading.2` | `--iress-typography-heading-2` | 500    | 20px (1.25rem)  | 1.4         |
| `typography.heading.3` | `--iress-typography-heading-3` | 500    | 18px (1.125rem) | 1.5         |
| `typography.heading.4` | `--iress-typography-heading-4` | 500    | 16px (1rem)     | 1.42        |
| `typography.heading.5` | `--iress-typography-heading-5` | 400    | 16px (1rem)     | 1.42        |

Each heading also has decomposed tokens (e.g. `--iress-typography-heading--1-font-size`) for individual property overrides.

### Body Text

| Token                        | CSS Variable                         | Weight     | Size | Line Height |
| ---------------------------- | ------------------------------------ | ---------- | ---- | ----------- |
| `typography.body.md.regular` | `--iress-typography-body-md-regular` | 400        | 14px | 1.5         |
| `typography.body.md.medium`  | `--iress-typography-body-md-medium`  | 500        | 14px | 1.5         |
| `typography.body.md.strong`  | `--iress-typography-body-md-strong`  | 600        | 14px | 1.5         |
| `typography.body.md.em`      | `--iress-typography-body-md-em`      | 500 italic | 14px | 1.5         |
| `typography.body.sm.regular` | `--iress-typography-body-sm-regular` | 400        | 12px | 1.5         |
| `typography.body.sm.medium`  | `--iress-typography-body-sm-medium`  | 500        | 12px | 1.5         |
| `typography.body.sm.strong`  | `--iress-typography-body-sm-strong`  | 600        | 12px | 1.5         |
| `typography.body.sm.em`      | `--iress-typography-body-sm-em`      | 500 italic | 12px | 1.5         |

### Code

| Token             | CSS Variable              | Font             | Weight | Size | Line Height |
| ----------------- | ------------------------- | ---------------- | ------ | ---- | ----------- |
| `typography.code` | `--iress-typography-code` | Space, monospace | 400    | 16px | 1.6         |
