# Overview

### Explore

| Component | Description |
|-----------|-------------|
| [IressAlert](alert.md) | The root element of the alert |
| [IressAutocomplete](autocomplete.md) | The root wrapper element (no semantic role) |
| [IressBreadcrumbs](../patterns/breadcrumbs.md) | Shows the current location within a navigational hierarchy. |
| [IressButton](button.md) | The root element of the button |
| [IressButtonGroup](button-group.md) | The root element of the button group |
| [IressCard](card.md) | The root element of the card |
| [IressCheckbox](checkbox.md) | The root wrapper element |
| [IressCheckboxGroup](checkbox-group.md) | The root element of the checkbox group |
| [IressCol](col.md) | The root element of the col |
| [IressContainer](container.md) | The root element of the container |
| [IressContextual Menu](../patterns/contextual-menu.md) | Displays a context-sensitive menu of actions triggered by user interaction. |
| [IressDivider](divider.md) | The root element of the divider |
| [IressExpander](expander.md) | The root element of the expander |
| [IressFeedback](../patterns/feedback.md) | Displays transient feedback messages to communicate the result of an action. |
| [IressField](field.md) | The root wrapper element (a div with no role) |
| [IressField Group](field-group.md) | Groups related form fields together with a shared legend, description, and validation message. |
| [IressFilter](../patterns/dropdown-menu.md) | Presents a list of actions or options revealed by a trigger button. |
| [IressForm](../patterns/form.md) | Manages form state, validation, and submission for a group of input fields. |
| [IressHide](hide.md) | The root element of the hide |
| [IressIcon](icon.md) | The root element of the icon |
| [IressImage](image.md) | The root element of the image |
| [IressInline](inline.md) | The root element of the inline |
| [IressInput](input.md) | The root element of the input |
| [IressInputCurrency](input-currency.md) | The root element of the input currency |
| [IressLabel](label.md) | The root element of the label |
| [IressLink](link.md) | The root element of the link |
| [IressLoading](../patterns/loading.md) | Displays a loading state to indicate content is being fetched or processed. |
| [IressMenu](menu.md) | The root element of the menu |
| [IressModal](modal.md) | The overlay backdrop (outermost element) |
| [IressPanel](panel.md) | The root element of the panel |
| [IressPill](pill.md) | The root element of the pill |
| [IressPlaceholder](placeholder.md) | The root element of the placeholder |
| [IressPopover](popover.md) | The root element of the popover |
| [IressProgress](progress.md) | The root element of the progress |
| [IressProvider](provider.md) | Application-level wrapper that provides shared context for Modal, Slideout, Toaster, Tooltip, and Popover components. |
| [IressRadio](radio.md) | The root element of the radio |
| [IressRadioGroup](radio-group.md) | The root element of the radio group |
| [IressReadonly](readonly.md) | The root element of the readonly |
| [IressRow](row.md) | The root element of the row |
| [IressSearch & Selection](../patterns/search-selection.md) | Decision guide for choosing between Autocomplete, Select, DropdownMenu, InputPopover, and Popover. |
| [IressSelect](select.md) | The root element of the select |
| [IressShadow](../patterns/shadow.md) | Applies an elevated shadow effect to visually separate content layers. |
| [IressSide Nav](../patterns/side-nav.md) | Provides a vertical navigation menu typically used in application sidebars. |
| [IressSkeleton](skeleton.md) | The root element of the skeleton |
| [IressSkipLink](skip-link.md) | The root element of the skip link |
| [IressSlideout](slideout.md) | The root element of the slideout |
| [IressSlider](slider.md) | The root element of the slider |
| [IressSpinner](spinner.md) | The root element of the spinner. Default variant is decorative (aria-hidden); chatty variant has role= |
| [IressStack](stack.md) | The root element of the stack |
| [IressStyled](styled.md) | A polymorphic utility component that applies design tokens and styling props to any HTML element or custom component. |
| [IressTable](table.md) | The root element of the table |
| [IressTabSet](tab-set.md) | The root wrapper element (tablist is a nested child) |
| [IressTag](tag.md) | The root element of the tag |
| [IressTag Input](tag-input.md) | A form control that allows users to enter and manage a collection of tags via keyboard input. |
| [IressText](text.md) | The root element of the text |
| [IressToaster](toaster.md) | The visible toast list container (rendered inside the aria-live region) |
| [IressToggle](toggle.md) | The root element of the toggle |
| [IressTooltip](tooltip.md) | The root wrapper element (contains activator and tooltip) |
| [IressValidation Message](validation-message.md) | The root element of the validation message |

### What are components?

IDS components are pre-built React elements that implement the Iress Design
System. Each component encodes accessibility, theming, and consistent behaviour
so product teams can focus on business logic rather than UI plumbing.

## How components are structured

Every component page in this documentation follows the same format:

| Section | What it covers |
|---------|---------------|
| **Design** | When to use, when not to use, do's and don'ts, content guidelines, and related patterns. |
| **Develop** | Quick start code, prop highlights, usage examples with live Storybook embeds, and testing guidance. |
| **Specifications** | Behaviour states, WCAG compliance, keyboard interaction, and edge cases. |

## Component categories

| Category | Components | Purpose |
|----------|-----------|---------|
| **Layout** | Container, Row, Col, Stack, Inline, Hide | Structure and position content on the page. |
| **Typography** | Text, Label | Render text with correct tokens and semantic elements. |
| **Forms** | Input, InputCurrency, Select, Checkbox, Radio, Toggle, Slider, TagInput, Field, FieldGroup, ValidationMessage | Collect and validate user input. |
| **Actions** | Button, ButtonGroup, Link | Trigger actions or navigate. |
| **Feedback** | Alert, Toaster, Spinner, Progress, Skeleton, Placeholder | Communicate status, loading, and errors. |
| **Overlays** | Modal, Slideout, Popover, Tooltip | Surface content above the page. |
| **Navigation** | Menu, TabSet, SkipLink | Move between views or sections. |
| **Data display** | Table, Tag, Pill, Readonly, Icon, Image, Divider | Present and organise information. |
| **Utilities** | Provider, Styled, Panel, Expander | App-level setup, style escape hatches, and content grouping. |

## Choosing a component

- **Need user input?** → Start with [Input](../components/input.md), [Select](../components/select.md), or [Checkbox](../components/checkbox.md). Always wrap in [Field](../components/field.md).
- **Need to show status?** → See the [Feedback pattern](../patterns/feedback.md) to pick between Alert, Toaster, and Modal.
- **Need layout?** → Use [Stack](../components/stack.md) (vertical) or [Inline](../components/inline.md) (horizontal) before reaching for custom CSS.
- **Need an overlay?** → [Modal](../components/modal.md) for blocking tasks, [Slideout](../components/slideout.md) for supplementary, [Popover](../components/popover.md) for ephemeral.

## Naming convention

All IDS components are prefixed with `Iress` (e.g. `IressButton`,
`IressModal`). This avoids collisions with native HTML elements and third-party
libraries, and makes IDS usage instantly recognisable in code reviews.

## Next steps

Browse the component list in the sidebar, or jump to:

- [Button](../components/button.md) — the most common interactive element
- [Form pattern](../patterns/form.md) — end-to-end form guidance
- [Common Mistakes](../get-started/common-mistakes.md) — pitfalls to avoid