# Component Rename Map

Components that changed names between versions. All other IDS components keep the same name (with the `Iress` prefix in v6).

| Old name             | New name (v6)                                        | Notes                                                |
| -------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `IressBadge`         | `IressPill`                                          | Renamed in v6                                        |
| `IressFilter`        | `IressDropdownMenu`                                  | Renamed to pattern component                         |
| `IressRichSelect`    | `IressSelect`                                        | Renamed; old `IressSelect` replaced by `native` prop |
| `IressField`         | `IressFormField`                                     | New form-integrated wrapper; `IressField` still exists as a standalone layout component |
| OUI `Badge`          | `IressPill`                                          | —                                                    |
| OUI `Button`         | `IressButton`                                        | `variant` → `mode`                                   |
| OUI `Modal`          | `IressModal`                                         | See prop renames                                     |
| OUI `DropdownButton` | `IressDropdownMenu` / `IressSelect` / `IressPopover` | Depends on use case                                  |
| OUI `ProgressBar`    | `IressProgress`                                      | Props unchanged                                      |
| OUI `Scrollable`     | `scrollable` styling prop                            | Available on any component                           |
| OUI `Input`          | `IressFormField` + `IressInput`                      | Requires form context                                |
| OUI `TextArea`       | `IressFormField` + `IressInput`                      | Use `rows` prop                                      |
| OUI `Label`          | `IressFormField` `label` prop                        | No separate component                                |
| OUI `FormGroup`      | `IressFormField`                                     | Built into FormField                                 |
| OUI `Fieldset`       | `IressFieldGroup`                                    | Use `label` prop                                     |
| OUI `RadioGroup`     | `IressFormField` + `IressRadioGroup`                 | Requires form context                                |
| OUI `Checkbox`       | `IressFormField` + `IressCheckbox`                   | —                                                    |

## Removed Components

| Component                | Replacement                                         |
| ------------------------ | --------------------------------------------------- |
| `IressNavbar`            | Removed — build with IDS components per-application |
| `IressToast` (direct)    | Use `IressToasterProvider` + `useToaster`           |
| `IressToaster` (direct)  | Use `IressToasterProvider` + `useToaster`           |
| `IressSelectOption`      | Use `options` prop on `IressSelect`                 |
| `IressHide` (deprecated) | Use `srOnly`, `hideFrom`, or `hideBelow` styling props (component still exported but deprecated) |

## New Components in v6

| Component                    | Purpose                                                  |
| ---------------------------- | -------------------------------------------------------- |
| `IressBreadcrumbs`           | Navigation hierarchy breadcrumbs                         |
| `IressContextualMenu`        | Context / "more actions" menu                            |
| `IressDropdownMenu`          | Filter/navigation dropdown (replaces `IressFilter`)      |
| `IressLink`                  | Anchor links in text paragraphs                          |
| `IressPill`                  | Status indicators, counters (replaces `IressBadge`)      |
| `IressTag`                   | Interactive tags                                         |
| `IressImage`                 | Responsive images                                        |
| `IressMenuGroup`             | Menu item grouping                                       |
| `IressShadow`                | Shadow DOM wrapper for micro-frontends                   |
| `IressSideNav`               | Side navigation (combines `rail` + `side` menu variants) |
| `IressButtonCard`            | Card rendered as a button                                |
| `IressLinkCard`              | Card rendered as a link                                  |
| `IressFormValidationSummary` | Form validation summary alert                            |
