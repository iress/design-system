# Component Rename Map

Components that changed names between versions. All other IDS components keep the same name (with the `Iress` prefix in v6).

## IDS v4/v5 → v6 Renames

| Old name          | New name (v6)       | Notes                                                                                   |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------- |
| `IressBadge`      | `IressPill`         | Renamed in v6                                                                           |
| `IressFilter`     | `IressDropdownMenu` | Renamed to pattern component                                                            |
| `IressRichSelect` | `IressSelect`       | Renamed; old `IressSelect` replaced by `native` prop                                    |
| `IressField`      | `IressFormField`    | New form-integrated wrapper; `IressField` still exists as a standalone layout component |

## OUI → v6 Renames

| OUI Component    | v6 Component                                         | Notes                                                 |
| ---------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `Badge`          | `IressPill`                                          | —                                                     |
| `Button`         | `IressButton`                                        | OUI uses `label` prop → v6 uses `children`            |
| `Modal`          | `IressModal`                                         | `onHide` → `onShowChange`; `show` prop unchanged      |
| `Alert`          | `IressAlert`                                         | `context` → `status`; `contextLabel` removed          |
| `DropdownButton` | `IressDropdownMenu` / `IressSelect` / `IressPopover` | Depends on use case                                   |
| `ProgressBar`    | `IressProgress`                                      | Props mostly unchanged                                |
| `Scrollable`     | `scrollable` styling prop                            | Available on any component                            |
| `Input`          | `IressInput`                                         | Can be standalone or wrapped in `IressFormField`      |
| `TextArea`       | `IressInput` with `rows` prop                        | Use `rows={4}` for textarea behavior                  |
| `Label`          | `IressLabel` or `IressFormField` `label` prop        | OUI uses `label` prop → v6 uses `children`            |
| `FormGroup`      | `IressField` or `IressFormField`                     | Built into Field components                           |
| `Fieldset`       | `IressFieldGroup`                                    | `legend` → `label`                                    |
| `RadioGroup`     | `IressRadioGroup`                                    | `legend` removed; use `IressFormField` for label      |
| `Checkbox`       | `IressCheckbox`                                      | Can be standalone or wrapped in `IressFormField`      |
| `CheckboxGroup`  | `IressCheckboxGroup`                                 | —                                                     |
| `Slideout`       | `IressSlideout`                                      | `show` prop unchanged                                 |
| `Toggle`         | `IressToggle`                                        | `legend` → `children`; `toggled` → `checked`          |
| `Tabs`           | `IressTabSet`                                        | `activeTabIndex` → `selected`/`defaultSelected`       |
| `Tab`            | `IressTab`                                           | —                                                     |
| `Slider`         | `IressSlider`                                        | `label` removed; use `aria-label` or `IressFormField` |
| `Tooltip`        | `IressTooltip`                                       | —                                                     |
| `Popover`        | `IressPopover`                                       | —                                                     |
| `Card`           | `IressCard`                                          | —                                                     |
| `Table`          | `IressTable`                                         | —                                                     |
| `Link`           | `IressLink`                                          | —                                                     |
| `Nav`            | Removed                                              | Build custom navigation with IDS components           |
| `NavBar`         | Removed                                              | Build custom navigation with IDS components           |
| `NavItem`        | Removed                                              | Use `IressSideNav` or custom implementation           |
| `SingleSelect`   | `IressSelect`                                        | —                                                     |
| `AutoComplete`   | `IressAutocomplete`                                  | —                                                     |
| `DatePicker`     | `IressInput` with `type="date"`                      | Native browser date picker                            |
| `TimePicker`     | `IressInput` with `type="time"`                      | Native browser time picker                            |

## Removed Components

| Component                | Replacement                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `IressNavbar`            | Removed — build with IDS components per-application                                              |
| `IressToast` (direct)    | Use `IressToasterProvider` + `useToaster`                                                        |
| `IressToaster` (direct)  | Use `IressToasterProvider` + `useToaster`                                                        |
| `IressSelectOption`      | Use `options` prop on `IressSelect`                                                              |
| `IressHide` (deprecated) | Use `srOnly`, `hideFrom`, or `hideBelow` styling props (component still exported but deprecated) |
| OUI `Nav`                | Build custom with `IressSideNav` or IDS primitives                                               |
| OUI `NavBar`             | Build custom with IDS primitives                                                                 |
| OUI `NavItem`            | Use `IressSideNav` items or custom implementation                                                |
| OUI `NavDropdown`        | Use `IressDropdownMenu` or `IressPopover`                                                        |
| OUI `DatePicker`         | `IressInput` with `type="date"`                                                                  |
| OUI `TimePicker`         | `IressInput` with `type="time"`                                                                  |
| OUI `TreeView`           | Not available in v6                                                                              |
| OUI `Onboarding`         | Not available in v6                                                                              |
| OUI `Process`            | Not available in v6                                                                              |

## New Components in v6

| Component                    | Purpose                                                                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `IressBreadcrumbs`           | Navigation hierarchy breadcrumbs                                                                                                                |
| `IressContextualMenu`        | Context / "more actions" menu                                                                                                                   |
| `IressDropdownMenu`          | Filter/navigation dropdown (replaces `IressFilter`)                                                                                             |
| `IressLink`                  | Anchor links in text paragraphs                                                                                                                 |
| `IressPill`                  | Status indicators, counters (replaces `IressBadge`)                                                                                             |
| `IressTag`                   | Interactive tags                                                                                                                                |
| `IressImage`                 | Responsive images                                                                                                                               |
| `IressMenuGroup`             | Menu item grouping                                                                                                                              |
| `IressShadow`                | CSS isolation wrapper for micro-frontends (creates shadow root on a `<div>` — NOT a custom element; all children are standard React components) |
| `IressSideNav`               | Side navigation (combines `rail` + `side` menu variants)                                                                                        |
| `IressButtonCard`            | Card rendered as a button                                                                                                                       |
| `IressLinkCard`              | Card rendered as a link                                                                                                                         |
| `IressFormValidationSummary` | Form validation summary alert                                                                                                                   |
| `IressReadonly`              | Read-only display of form values (supports `actions` prop for inline action buttons)                                                            |
| `IressSpinner`               | Loading spinner                                                                                                                                 |
