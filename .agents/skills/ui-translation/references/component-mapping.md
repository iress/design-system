# IDS Component Mapping

## Actions

| Description                      | IDS Component                          | Example                                                            |
| -------------------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| Submit / primary action button   | `IressButton mode="primary"`           | `<IressButton mode="primary">Submit</IressButton>`                 |
| Cancel / secondary action button | `IressButton mode="secondary"`         | `<IressButton mode="secondary">Cancel</IressButton>`               |
| Less prominent action            | `IressButton mode="tertiary"`          | `<IressButton mode="tertiary">Details</IressButton>`               |
| Icon-only action                 | `IressButton icon="edit" mode="muted"` | `<IressButton mode="muted" icon="edit">Edit</IressButton>`         |
| Danger / delete action           | `IressButton status="danger"`          | `<IressButton mode="primary" status="danger">Delete</IressButton>` |
| Link in text                     | `IressLink`                            | `<IressLink href="/about">About</IressLink>`                       |
| Dropdown/context menu trigger    | `IressDropdownMenu`                    | See patterns docs                                                  |

## Form Inputs

| Description              | IDS Component                       | Example                                                                                                                        |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Labelled text input      | `IressField` + `IressInput`         | See Form example below                                                                                                         |
| Select dropdown (static or async) | `IressField` + `IressSelect` | `<IressField label="Country"><IressSelect>...</IressSelect></IressField>` — supports static options and async loading via an `options` function |
| Freetext input with suggestions  | `IressField` + `IressAutocomplete` | `<IressField label="Search"><IressAutocomplete /></IressField>` — allows any text input; suggestions are optional |
| Currency input           | `IressField` + `IressInputCurrency` | `<IressField label="Amount"><IressInputCurrency /></IressField>`                                                               |
| Checkbox                 | `IressCheckbox`                     | `<IressCheckbox value="agree">I agree</IressCheckbox>`                                                                         |
| Checkbox group           | `IressCheckboxGroup`                | `<IressField label="Options"><IressCheckboxGroup name="opts"><IressCheckbox value="a">A</IressCheckbox><IressCheckbox value="b">B</IressCheckbox></IressCheckboxGroup></IressField>` |
| Radio buttons            | `IressRadioGroup` + `IressRadio`    | `<IressField label="Choice"><IressRadioGroup><IressRadio value="yes">Yes</IressRadio><IressRadio value="no">No</IressRadio></IressRadioGroup></IressField>` |
| Toggle switch            | `IressToggle`                       | `<IressToggle>Enable</IressToggle>`                                                                                            |
| Slider / range           | `IressSlider`                       | `<IressSlider min={0} max={100} />`                                                                                            |
| Read-only display        | `IressReadonly`                     | `<IressReadonly label="Status" value="Active" />` — supports `actions` prop for inline action buttons (e.g. edit toggle). Use `variant="locked"` when the value is read-only due to permissions |

### Select vs Autocomplete Decision Guide

- **Need to restrict to valid options?** → `IressSelect` — supports static options and async loading via an `options` function. Use this for most selection use cases. Always read the component doc to understand filtering behaviour for your use case.
- **Need freetext with optional suggestions?** → `IressAutocomplete` — allows any text input; suggestions are offered but not enforced.

## Layout

| Description                                  | IDS Component           | Example                                                                                   |
| -------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| Vertical stack (items stacked top-to-bottom) | `IressStack`            | `<IressStack gap="md">...</IressStack>`                                                    |
| Horizontal row (items side-by-side)          | `IressInline`           | `<IressInline gap="sm">...</IressInline>`                                                  |
| Grid columns                                 | `IressRow` + `IressCol` | `<IressRow><IressCol span={{ xs: 12, md: 6 }}>...</IressCol><IressCol span={{ xs: 12, md: 6 }}>...</IressCol></IressRow>` |
| Container with max-width                     | `IressContainer`        | `<IressContainer>...</IressContainer>`                                                    |
| Divider / separator                          | `IressDivider`          | `<IressDivider />`                                                                        |
| Responsive visibility                        | `hideFrom`/`hideBelow` props or `useBreakpoint` hook | `<IressText hideBelow="md">Desktop only</IressText>`                                       |

## Content & Display

| Description          | IDS Component               | Example                                                                                                     |
| -------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Text / paragraph     | `IressText`                 | `<IressText>Body text</IressText>`                                                                          |
| Heading              | `IressText element="h2"`    | `<IressText element="h2">Heading</IressText>`                                                               |
| Card / panel         | `IressCard` or `IressPanel` | `<IressCard heading={<h3>Title</h3>}>Content</IressCard>`                                   |
| Alert / notification | `IressAlert`                | `<IressAlert status="success">Saved!</IressAlert>`                                                          |
| Loading spinner      | `IressSpinner`              | `<IressSpinner />`                                                                                          |
| Skeleton loader      | `IressSkeleton`             | `<IressSkeleton height="20px" width="200px" />`                                                             |
| Progress bar         | `IressProgress`             | `<IressProgress value={75} max={100} />`                                                                    |
| Image                | `IressImage`                | `<IressImage src="..." alt="..." />`                                                                        |
| Icon                 | `IressIcon`                 | `<IressIcon name="settings" />`                                                                             |
| Tag / badge          | `IressTag`                  | `<IressTag>New</IressTag>`; use `bordered` for visible-border style; use `element="button"` for clickable tag, `element="a"` for link tag; `onClick` alone also auto-renders as `<button>` |
| Pill                 | `IressPill`                 | `<IressPill>Category</IressPill>`                                                                           |
| Tooltip              | `IressTooltip`              | `<IressTooltip content="Help text"><IressButton>Hover me</IressButton></IressTooltip>`                      |

## Overlays & Navigation

| Description                           | IDS Component                 | Example                                                                   |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| Modal / dialog                        | `IressModal`                  | See Modal docs                                                            |
| Status modal (danger/success/warning) | `IressModal status="danger"`  | Use `actions` prop for buttons; size restricted to `sm`/`md`              |
| Slideout / drawer                     | `IressSlideout`               | See Slideout docs                                                         |
| Popover                               | `IressPopover`                | See Popover docs                                                          |
| Menu                                  | `IressMenu` + `IressMenuItem` | See Menu docs                                                             |
| Tab navigation                        | `IressTabSet` + `IressTab`    | `<IressTabSet><IressTab label="Tab 1">Content 1</IressTab></IressTabSet>` |
| Skip link (a11y)                      | `IressSkipLink`               | `<IressSkipLink href="#main">Skip to content</IressSkipLink>`             |
| Side navigation                       | `IressSideNav`                | See SideNav pattern docs                                                  |
| Breadcrumbs                           | `IressBreadcrumbs`            | See Breadcrumbs pattern docs                                              |

## Tables

| Description | IDS Component | Example                                                                                                 |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| Data table  | `IressTable`  | `<IressTable caption="Users" rows={users} columns={columns} />` — data-driven via `rows` and `columns` props |
