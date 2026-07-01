# Colour Tokens

Colour tokens are a set of predefined colour values that can be used throughout the design system to ensure consistency and accessibility. They are categorized based on their usage and purpose, such as neutral, primary, accent, system status colours, data colours, and global interaction colours.

## Design

- [Figma design](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=6200-13)

These are all the colour tokens available in the design system, grouped by their respective categories. For each token, we provide the hex value, CSS variable, and AA-compliant pairings to ensure accessibility.

### Neutral

Neutral colours apply to most backgrounds, text, and shapes in our experiences. They do not typically have a meaning associated with them, though they can imply things like disabled states. **Note:** There are some colour contrasts that are AA Large and are used for placeholders. If WCAG compliance is necessary for your application, please avoid using placeholders to meet this requirement.

| Token | CSS Variable | Value | Description | Aliases | AA-Compliant Pairings |
| --- | --- | --- | --- | --- | --- |
| `colour.neutral.10` | `--iress-colour-neutral-10` | `#FFFFFF` | Used as the default background colour for most components. For tooltips, it is used as the foreground colour for the tooltip content. | `page` | neutral.70, neutral.80, neutral.90 |
| `colour.neutral.20` | `--iress-colour-neutral-20` | `#F5F6F8` | Used as the alternating background colour for components such as tables. Used as the background colour behind panels and cards for highly interactive screens. | `alt` | neutral.70, neutral.80, neutral.90 |
| `colour.neutral.30` | `--iress-colour-neutral-30` | `#E2E6EA` | Used as the border colour for dividers, and the default divider colour for components with in-built headers and footers such as cards. | — | neutral.80, neutral.90 |
| `colour.neutral.40` | `--iress-colour-neutral-40` | `#CFD5DA` | Used for borders in subtle interactive components, such as checkboxes and radios with hidden controls and the progress bar. | — | neutral.80, neutral.90 |
| `colour.neutral.50` | `--iress-colour-neutral-50` | `#A8B2BB` | Used as the background colour for interactive components such as the slider. | — | neutral.90 |
| `colour.neutral.60` | `--iress-colour-neutral-60` | `#828F9D` | Used for placeholder text in form controls and disabled states. | — | neutral.90 |
| `colour.neutral.70` | `--iress-colour-neutral-70` | `#5D6C7E` | Used for muted text such as hints and descriptions to allow for content hierarchy. | `muted` | neutral.10, neutral.20 |
| `colour.neutral.80` | `--iress-colour-neutral-80` | `#384666` | Used as the default text colour for most components. For tooltips, it is used as the background colour. | `text` | neutral.10, neutral.20, neutral.30, neutral.40 |
| `colour.neutral.90` | `--iress-colour-neutral-90` | `#141F4D` | Used for very dark text or UI elements requiring maximum contrast. | — | neutral.10, neutral.20, neutral.30, neutral.40 |

### Primary

The primary colour is your "brand" colour, and is used across all interactive elements such as buttons, links, inputs, etc. This colour can define the overall feel and can elicit emotion.

| Token | CSS Variable | Value | Description | AA-Compliant Pairings |
| --- | --- | --- | --- | --- |
| `colour.primary.fill` | `--iress-colour-primary-fill` | `#003271` | Used for primary buttons and the active state of form controls such as checkboxes and radio buttons. Also used for the border of tags when they have a custom button. | primary.onFill |
| `colour.primary.fillHover` | `--iress-colour-primary-fill-hover` | `#002352` | Used for the hover state of primary buttons as well as hovering over active form controls. | primary.onFill |
| `colour.primary.onFill` | `--iress-colour-primary-on-fill` | `#FFFFFF` | Used as the foreground colour on primary buttons and active form controls. | primary.fill |
| `colour.primary.surface` | `--iress-colour-primary-surface` | `#EBF3FF` | Used as the background colour for secondary buttons and the focused state of menu and tab items. Also used as the background colour of active buttons. | primary.text, neutral.80 |
| `colour.primary.surfaceHover` | `--iress-colour-primary-surface-hover` | `#DCEAFE` | Used for the hover state of secondary buttons, form controls and hovering over focused menu and tab items. Also used when hovering over table rows. | primary.text, neutral.80 |
| `colour.primary.text` | `--iress-colour-primary-text` | `#003271` | Used for text on primary buttons, active form controls and focused tab and menu items. Also used for the link text colour and tertiary buttons. | primary.surface |

### Accent

The accent colour is a colour used to emphasise key parts of the UI. These act as "secondary" or "supporting" colours to your primary colour. The brand accent is useful for grabbing attention or to support your primary/brand colour.

| Token | CSS Variable | Value | Description | AA-Compliant Pairings |
| --- | --- | --- | --- | --- |
| `colour.accent.fill` | `--iress-colour-accent-fill` | `#C26EF4` | Used in illustrations to support the primary colour and to add visual interest to the UI. | accent.onFill |
| `colour.accent.fillHover` | `--iress-colour-accent-fill-hover` | `#A855D9` | Used in illustrations to support the primary colour and to add visual interest to the UI when hovered. | accent.onFill |
| `colour.accent.onFill` | `--iress-colour-accent-on-fill` | `#1F0032` | Used in illustrations to support the primary colour and to add visual interest to the UI when used as a foreground colour. | accent.fill |
| `colour.accent.surface` | `--iress-colour-accent-surface` | `#E0BDF5` | Used to highlight a selected row in a table. | accent.text, neutral.80 |
| `colour.accent.surfaceHover` | `--iress-colour-accent-surface-hover` | `#D4A6F2` | Used for the hover state of a highlighted row in a table to provide additional emphasis on hover. | accent.text, neutral.80 |
| `colour.accent.text` | `--iress-colour-accent-text` | `#1F0032` | Used for text on top of accent surfaces (such as highlighted table rows). | accent.surface |

### System — Success

Communicates that an action has been successful and inform a user that the action is a positive action.

| Token | CSS Variable | Value | Description | AA-Compliant Pairings |
| --- | --- | --- | --- | --- |
| `colour.system.success.fill` | `--iress-colour-system-success-fill` | `#37C49C` | Used for the background colour of primary success buttons, as well as the border of alerts and badges. It is also used for the foreground colour of icons inside toasts and alerts. | system.success.onFill |
| `colour.system.success.fillHover` | `--iress-colour-system-success-fill-hover` | `#2DAB88` | Used for the hover state of primary success buttons. | system.success.onFill |
| `colour.system.success.onFill` | `--iress-colour-system-success-on-fill` | `#0A2E25` | Used for the foreground colour of primary success buttons and badges. | system.success.fill |
| `colour.system.success.surface` | `--iress-colour-system-success-surface` | `#EBF9F5` | Used for the background colour of success alerts and toasts, and the background of secondary success buttons. | system.success.text, neutral.90 |
| `colour.system.success.surfaceHover` | `--iress-colour-system-success-surface-hover` | `#D7F3EB` | Used for the hover state of secondary success buttons. | system.success.text, neutral.90 |
| `colour.system.success.text` | `--iress-colour-system-success-text` | `#006b44` | Used for the text colour of success alerts and toasts, and success tertiary buttons. | system.success.surface |

### System — Danger

Communicates something went wrong or prevents the user from moving forward with their task, as well as inform a potential action is destructive/negative.

| Token | CSS Variable | Value | Description | AA-Compliant Pairings |
| --- | --- | --- | --- | --- |
| `colour.system.danger.fill` | `--iress-colour-system-danger-fill` | `#c21010` | Used for the background colour of primary danger buttons, as well as the border of alerts and badges. It is also used for the foreground colour of icons inside toasts and alerts. | system.danger.onFill |
| `colour.system.danger.fillHover` | `--iress-colour-system-danger-fill-hover` | `#B32727` | Used for the hover state of primary danger buttons. | system.danger.onFill |
| `colour.system.danger.onFill` | `--iress-colour-system-danger-on-fill` | `#FFF4F3` | Used for the foreground colour of primary danger buttons and badges. | system.danger.fill |
| `colour.system.danger.surface` | `--iress-colour-system-danger-surface` | `#FFEDEC` | Used for the background colour of danger alerts and toasts, and the background of secondary danger buttons. | system.danger.text, neutral.90 |
| `colour.system.danger.surfaceHover` | `--iress-colour-system-danger-surface-hover` | `#FFD9D6` | Used for the hover state of secondary danger buttons. | system.danger.text, neutral.90 |
| `colour.system.danger.text` | `--iress-colour-system-danger-text` | `#c21010` | Used for the text colour of danger alerts and toasts, and danger tertiary buttons. | system.danger.surface |

### System — Warning

Communicates attention required but does not prevent the user from moving forward with their task.

| Token | CSS Variable | Value | Description | AA-Compliant Pairings |
| --- | --- | --- | --- | --- |
| `colour.system.warning.fill` | `--iress-colour-system-warning-fill` | `#F0AD03` | Used for the border of warning alerts and the background of warning badges. | system.warning.onFill |
| `colour.system.warning.fillHover` | `--iress-colour-system-warning-fill-hover` | `#DA9D00` | Used for the hover state of primary warning buttons. | system.warning.onFill |
| `colour.system.warning.onFill` | `--iress-colour-system-warning-on-fill` | `#2B1F00` | Used for the foreground colour of warning badges. | system.warning.fill |
| `colour.system.warning.surface` | `--iress-colour-system-warning-surface` | `#FFF8E6` | Used for the background colour of warning alerts. | system.warning.text, neutral.90 |
| `colour.system.warning.surfaceHover` | `--iress-colour-system-warning-surface-hover` | `#FFEAA0` | Used for the hover state of secondary warning buttons. | system.warning.text, neutral.90 |
| `colour.system.warning.text` | `--iress-colour-system-warning-text` | `#825400` | Used for the text colour of warning alerts. | system.warning.surface |

### System — Info

Provides additional helpful context.

| Token | CSS Variable | Value | Description | AA-Compliant Pairings |
| --- | --- | --- | --- | --- |
| `colour.system.info.fill` | `--iress-colour-system-info-fill` | `#669AFF` | Used for the border of info alerts and toasts and the background of info badges. | system.info.onFill |
| `colour.system.info.fillHover` | `--iress-colour-system-info-fill-hover` | `#5685E1` | Used for the hover state of primary info buttons. | system.info.onFill |
| `colour.system.info.onFill` | `--iress-colour-system-info-on-fill` | `#121D33` | Used for the foreground colour of info badges. | system.info.fill |
| `colour.system.info.surface` | `--iress-colour-system-info-surface` | `#E5EEFF` | Used for the background colour of info alerts and toasts. | system.info.text, neutral.90 |
| `colour.system.info.surfaceHover` | `--iress-colour-system-info-surface-hover` | `#CCDEFF` | Used for the hover state of secondary info buttons. | system.info.text, neutral.90 |
| `colour.system.info.text` | `--iress-colour-system-info-text` | `#0047ab` | Used for the text colour of info alerts and toasts. | system.info.surface |

### Data — Subtle

Subtle data colours provide softer contrast for backgrounds and less prominent data visualisations.

| Token | CSS Variable | Value | Description | AA-Compliant Pairings |
| --- | --- | --- | --- | --- |
| `colour.data.subtle.10` | `--iress-colour-data-subtle-10` | `#FFE6F2` | First data visualisation colour in the subtle palette. | data.bold.10, neutral.90 |
| `colour.data.subtle.20` | `--iress-colour-data-subtle-20` | `#FEEAFF` | Second data visualisation colour in the subtle palette. | data.bold.20, neutral.90 |
| `colour.data.subtle.30` | `--iress-colour-data-subtle-30` | `#F1E6FF` | Third data visualisation colour in the subtle palette. | data.bold.30, neutral.90 |
| `colour.data.subtle.40` | `--iress-colour-data-subtle-40` | `#E5F5FF` | Fourth data visualisation colour in the subtle palette. | data.bold.40, neutral.90 |
| `colour.data.subtle.50` | `--iress-colour-data-subtle-50` | `#E6EEFF` | Fifth data visualisation colour in the subtle palette. | data.bold.50, neutral.90 |
| `colour.data.subtle.60` | `--iress-colour-data-subtle-60` | `#C8D7FF` | Sixth data visualisation colour in the subtle palette. | data.bold.60, neutral.90 |
| `colour.data.subtle.70` | `--iress-colour-data-subtle-70` | `#E4FFFD` | Seventh data visualisation colour in the subtle palette. | data.bold.70, neutral.90 |
| `colour.data.subtle.80` | `--iress-colour-data-subtle-80` | `#BADFD4` | Eighth data visualisation colour in the subtle palette. | data.bold.80, neutral.90 |
| `colour.data.subtle.90` | `--iress-colour-data-subtle-90` | `#ECECEC` | Ninth data visualisation colour in the subtle palette. | data.bold.90, neutral.90 |

### Data — Bold

Bold data colours provide strong contrast for foregrounds and prominent data visualisations.

| Token | CSS Variable | Value | Description | AA-Compliant Pairings |
| --- | --- | --- | --- | --- |
| `colour.data.bold.10` | `--iress-colour-data-bold-10` | `#AC2C6A` | First data visualisation colour in the bold palette. | data.subtle.10, neutral.10 |
| `colour.data.bold.20` | `--iress-colour-data-bold-20` | `#AA20AF` | Second data visualisation colour in the bold palette. | data.subtle.20, neutral.10 |
| `colour.data.bold.30` | `--iress-colour-data-bold-30` | `#7E38D7` | Third data visualisation colour in the bold palette. | data.subtle.30, neutral.10 |
| `colour.data.bold.40` | `--iress-colour-data-bold-40` | `#006EB8` | Fourth data visualisation colour in the bold palette. | data.subtle.40, neutral.10 |
| `colour.data.bold.50` | `--iress-colour-data-bold-50` | `#0055FF` | Fifth data visualisation colour in the bold palette. | data.subtle.50, neutral.10 |
| `colour.data.bold.60` | `--iress-colour-data-bold-60` | `#0032B2` | Sixth data visualisation colour in the bold palette. | data.subtle.60, neutral.10 |
| `colour.data.bold.70` | `--iress-colour-data-bold-70` | `#1D7C73` | Seventh data visualisation colour in the bold palette. | data.subtle.70, neutral.10 |
| `colour.data.bold.80` | `--iress-colour-data-bold-80` | `#124E3D` | Eighth data visualisation colour in the bold palette. | data.subtle.80, neutral.10 |
| `colour.data.bold.90` | `--iress-colour-data-bold-90` | `#384666` | Ninth data visualisation colour in the bold palette. | data.subtle.90, neutral.10 |

### Global interactions

These tokens govern the interface's behavior during user engagement, ensuring clear visual hierarchy and accessible navigation across all components.

| Token | CSS Variable | Value | Description | AA-Compliant Pairings |
| --- | --- | --- | --- | --- |
| `colour.globalInteractions.backdrop` | `--iress-colour-global-interactions-backdrop` | `#61656bcc` | By dimming the underlying interface, the Backdrop reduces cognitive load and establishes a clear depth of field, signalling that the user's attention is required exclusively on the foreground element. | neutral.10 |
| `colour.globalInteractions.focusRing` | `--iress-colour-global-interactions-focus-ring` | `#005BFF` | A high-contrast "halo" used to identify the currently active element during keyboard navigation. Applied with a 2px width and 2px offset to ensure the indicator remains distinct from the component border, satisfying WCAG 2.4.7 for visibility. | neutral.10 |

## Develop

You can use these tokens in your applications in three ways: via component props, CSS variables, or CSS-in-JS using the `cssVars` export from the `@iress-oss/ids-tokens` package.

### Via component props

```tsx
import { IressStack } from '@iress-oss/ids-components';

<IressStack bg="colour.neutral.20" color="colour.neutral.80">
  Content with themed background and text
</IressStack>;
```

### Via CSS variables

```css
.custom-card {
  background: var(--colour-neutral-20);
  color: var(--colour-neutral-80);
}
```

### Via cssVars (CSS-in-JS)

```tsx
import { cssVars } from '@iress-oss/ids-tokens';

<div style={{ background: cssVars.colour.neutral[20] }}>Themed</div>;
```