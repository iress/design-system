# Prop Rename Cheat Sheet

## CRITICAL — verified against source code

These prop names have been verified against the actual IDS v6 source. Using the old prop names will silently fail.

| Component                       | Old prop         | New prop (v6)         | Values                                                      |
| ------------------------------- | ---------------- | --------------------- | ----------------------------------------------------------- |
| `IressButton`                   | `variant`        | `mode`                | `"primary"`, `"secondary"`, `"tertiary"`, `"quaternary"`, `"muted"` |
| `IressButton`                   | —                | `status` (new)        | `"danger"`, `"success"`                                         |
| `IressButton`                   | —                | `element` (new)       | `"a"` for link rendering                                    |
| `IressButton`                   | —                | `icon` (new)          | Icon-only button; `children` becomes tooltip                |
| `IressAlert`                    | `variant`        | `status`              | `"danger"`, `"info"`, `"success"`, `"warning"`, `"neutral"` |
| `IressAlert`                    | —                | `variant` (new)       | `"sidebar"`, `"full-width"` (layout variant, not color)         |
| `IressAlert`                    | `error` (value)  | `danger` (value)      | Use `status="danger"` not `status="error"`                  |
| `IressText`                     | `variant`        | `textStyle`           | —                                                           |
| `IressText`                     | `mode`           | `color`               | —                                                           |
| `IressText`                     | `align`          | `textAlign`           | —                                                           |
| `IressStack`                    | `gutter`         | `gap`                 | Accepts spacing tokens                                      |
| `IressInline`                   | `gutter`         | `gap`                 | Accepts spacing tokens                                      |
| `IressDivider`                  | `gutter`         | removed               | Use `my` / `mx` styling props                               |
| `IressModal`                    | `isOpen`         | `show`                | Boolean                                                     |
| `IressModal`                    | `onClose`        | `onShowChange`        | `(show: boolean) => void`                                   |
| `IressModal`                    | `title`          | `heading`             | String or ReactElement                                      |
| `IressModal`                    | `padding`        | `p` (styling prop)    | —                                                           |
| `IressPanel`                    | `background`     | `bg`                  | e.g. `bg="alt"` or `bg="colour.neutral.20"`                 |
| `IressPanel`                    | `padding`        | `p` (styling prop)    | —                                                           |
| `IressIcon`                     | `mode`           | `color`               | —                                                           |
| `IressIcon`                     | `size`           | removed               | Inherits font size from parent                              |
| `IressSkeleton`                 | `textVariant`    | `textStyle`           | —                                                           |
| `IressLabel`                    | `optional`       | `required` (inverted) | —                                                           |
| `IressField`                    | `optional`       | `required` (inverted) | —                                                           |
| `IressFormField`                | `optional`       | via `rules.required`  | Set `rules={{ required: 'msg' }}` instead of a direct prop  |
| `IressFieldGroup`               | `optional`       | `required` (inverted) | —                                                           |
| `IressFieldGroup`               | `legend`         | `label`               | String                                                      |
| `IressCheckbox`                 | `readonly`       | `readOnly`            | —                                                           |
| `IressRadioGroup`               | `readonly`       | `readOnly`            | —                                                           |
| `IressSlider`                   | `hiddenOn`       | `srOnly` (styling)    | General styling prop available on all components             |
| `IressExpander`                 | `mode="heading"` | `mode="section"`      | —                                                           |
| `IressSkipLink`                 | `targetId`       | `href`                | —                                                           |
| `IressTable` column             | `align`          | `textAlign`           | —                                                           |
