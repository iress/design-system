# Change Log

## Changelog has moved

The changelog has moved to Github releases.

[View the changelog](https://github.com/oneiress/design-system/releases).

## 5.7.1

### Patch Changes

- fix: themes dependency causing issues on install

## 5.7.0

### Minor Changes

- [WAF-609] Container v6 by @richardpan-iress in https://github.com/oneiress/design-system/pull/3933
- chore: update typography font sizes and add white label theme to the theme types by @mellm0 in https://github.com/oneiress/design-system/pull/3947
- docs(storybook): add storybook-addon-tag-badges by @mellm0 in https://github.com/oneiress/design-system/pull/3949
- chore: replace v5 container instead (WAF-628) by @mellm0 in https://github.com/oneiress/design-system/pull/3953
- chore: existing theme tokens (WAF-641) by @mellm0 in https://github.com/oneiress/design-system/pull/3958
- docs(Popover): add documentation for using the container prop with parent element (WAF-650) by @mellm0 in https://github.com/oneiress/design-system/pull/3959
- chore: v6 plopfile generator and decision log (WAF-624) by @mellm0 in https://github.com/oneiress/design-system/pull/3960
- docs: design tokens documentation by @mellm0 in https://github.com/oneiress/design-system/pull/3966
- docs(CheckboxGroup): recipes for checkbox group usage (WAF-576) by @mellm0 in https://github.com/oneiress/design-system/pull/3967

### Patch Changes

- Updated dependencies
  - @iress/ids-themes@5.2.0

## 5.6.3

### Patch Changes

- fix: table columns should not wrap when they are sortable (WAF-626) by @mellm0 in https://github.com/oneiress/design-system/pull/3911

**Full Changelog**: https://github.com/oneiress/design-system/compare/v5.6.2...v.5.6.3

## 5.6.2

### Patch Changes

- fix: deleting a tag should focus on previous tag, or if not available the activator (WAF-613) by @mellm0 in https://github.com/oneiress/design-system/pull/3872
- fix: [WAF-611] Text not align right in InputCurrency readonly by @richardpan-iress in https://github.com/oneiress/design-system/pull/3867
- docs: [WAF-612] Readonly currency recipe in table format by @richardpan-iress in https://github.com/oneiress/design-system/pull/3871
- chore: migrate the themes package from styler and rename to ids-themes (WAF-604) by @mellm0 in https://github.com/oneiress/design-system/pull/3859
- chore: add schema to the themes package (WAF-604) by @mellm0 in https://github.com/oneiress/design-system/pull/3860
- chore: combine ag-grid-theme with the themes package (WAF-604) by @mellm0 in https://github.com/oneiress/design-system/pull/3861
- chore: font size tokens (WAF-591) by @mellm0 in https://github.com/oneiress/design-system/pull/3862
- chore: update spacing tokens (WAF-592) by @mellm0 in https://github.com/oneiress/design-system/pull/3863
- chore: add helpers for sub-themes (WAF-593) by @mellm0 in https://github.com/oneiress/design-system/pull/3869
- chore: small update to include font css in theme component (WAF-593) by @mellm0 in https://github.com/oneiress/design-system/pull/3875
- chore: re-structure themes JSON (WAF-593) by @mellm0 in https://github.com/oneiress/design-system/pull/3876
- chore: IressThemeImport (WAF-593) by @mellm0 in https://github.com/oneiress/design-system/pull/3878
- chore: add sub-themes (WAF-593) by @mellm0 in https://github.com/oneiress/design-system/pull/3883

**Full Changelog**: https://github.com/oneiress/design-system/compare/v5.6.1...v5.6.2

## 5.6.1

### Patch Changes

- [WAF-610]: RichSelect - Content not overflowing on small screens by @richardpan-iress in https://github.com/oneiress/design-system/pull/3853
- [WAF-603] Fix weird console log in IressInputCurrency by @richardpan-iress in https://github.com/oneiress/design-system/pull/3852
- [WAF-602] Trigger onBlur when delete tag in RichSelect by @richardpan-iress in https://github.com/oneiress/design-system/pull/3851

## 5.6.0

### Minor Changes

- docs: foundation by @mellm0 in https://github.com/oneiress/design-system/pull/3836
- [WAF-579] Fix: onBlur in RichSelect multiSelect mode by @richardpan-iress in https://github.com/oneiress/design-system/pull/3837
- feat: useAutocompleteSearch error handling (WAF-580) by @mellm0 in https://github.com/oneiress/design-system/pull/3842
- fix: ValidationMessage - prefix should now hide even when right-aligned (WAF-600) by @mellm0 in https://github.com/oneiress/design-system/pull/3844
- [WAF-597] chore: downgrade react-hook-form to v7.53.1 by @richardpan-iress in https://github.com/oneiress/design-system/pull/3846

## 5.5.9

### Patch Changes

- docs: update SWAPI api to python for everybody
- fix: IressAutocomplete - initialOptions no longer causes the popover to always display results

## 5.5.8

### Patch Changes

- fix: IressRichSelect - onBlur only triggers on complete blur of the select

## 5.5.7

### Patch Changes

- fix: IressAutocomplete - resize observer loop issue

## 5.5.6

### Patch Changes

- 6bb5d52: fix: className, contentClassName and style on popoverProps are applied to the popover
- 6bb5d52: IressAutocomplete - popover is opening even if the input has not been interacted with
- 6bb5d52: fix: IressAutocomplete - should not call async function when query is empty

## 5.5.5

### Patch Changes

- chore: IressTooltip - add wcag warning for non-interactive activator
- chore: expose useIdIfNeeded

## 5.5.4

### Patch Changes

- chore: IressInputCurrency - allow type override (WAF-539) by @mellm0 in https://github.com/oneiress/design-system/pull/3730
- fix: IressRichSelect - focus should be consistent with native select (WAF-531) by @mellm0 in https://github.com/oneiress/design-system/pull/3726
- fix: IressForm - min, max, minLength, maxLength can be string (WAF-543) by @mellm0 in https://github.com/oneiress/design-system/pull/3729
- chore: migrate initialOptions from IressCombobox (WAF-544) by @mellm0 in https://github.com/oneiress/design-system/pull/3737
- docs: percentage input recipe (WAF-541) by @mellm0 in https://github.com/oneiress/design-system/pull/3736
- chore: add IressSelectHeading to simplify create new option recipe (WAF-547) by @mellm0 in https://github.com/oneiress/design-system/pull/3738
- fix: IressSelectTags - tags should wrap on new line (WAF-549) by @mellm0 in https://github.com/oneiress/design-system/pull/3743

## 5.5.3

### Patch Changes

- Bug fix for Form, FormField, InputCurrency
- Add touch prop to Radio, Checkbox

## 5.5.2

### Patch Changes

- Add recipe page for IressForm and IressInputCurrency

## 5.5.1

### Patch Changes

- Updated dependencies

## 5.5.0

### Minor Changes

- fix: rich select inside field group by @mellm0 in https://github.com/oneiress/design-system/pull/3658
- feat: Reopen InputCurrency [WAF-407] by @richardpan-iress in https://github.com/oneiress/design-system/pull/3653
- feat: IressTable - add rowProps by @mellm0 in https://github.com/oneiress/design-system/pull/3660
- fix: remove underline from icons inside buttons when in link mode by @mellm0 in https://github.com/oneiress/design-system/pull/3659
- chore: Fix type issue caused by react-hook-form upgrade by @richardpan-iress in https://github.com/oneiress/design-system/pull/3657
- feat: add inline prop to iressreadonly by @richardpan-iress in https://github.com/oneiress/design-system/pull/3667

Special thanks to @hiroyoho, @IRESS-Chris-Hill and Andy.

**Full Changelog**: https://github.com/oneiress/design-system/compare/v5.4.8...v5.5.0

## 5.4.8

### Patch Changes

- fix: IressTable - currencyCode not being overridden by @mellm0 in https://github.com/oneiress/design-system/pull/3645
- chore: remove parser from input, and just use formatter (WAF-407) by @mellm0 in https://github.com/oneiress/design-system/pull/3644
- fix: IressCheckbox and IressRadio should inherit the alias form border radius token by @mellm0 in https://github.com/oneiress/design-system/pull/3646

## 5.4.7

### Patch Changes

- fix: autocomplete should use label to update box

## 5.4.6

### Patch Changes

- chore: omit inputMode from IressFormField and IressFormFieldset

## 5.4.5

### Patch Changes

- fix: rich select input and popover styles

## 5.4.4

### Patch Changes

- fix: form not allowing name prop

## 5.4.3

### Patch Changes

- fix: scoped css should apply to the shadow root

## 5.4.2

### Patch Changes

- fix: IressFormField - nested inputs should have the correct ID

## 5.4.1

### Patch Changes

- feat: add a shortDate format to IressTable

## 5.4.0

### Minor Changes

- feat: sortFn for table columns
- chore: table columns as array
- fix: blur should not be called when the focus moves from the activator to inside the popover
- fix: rich select clear button not virtually focusable
- docs: add usePopoverItem recipe
- docs: add routing library examples for button
- chore: cleaned up styles

## 5.3.0

### Minor Changes

- feat: IressHookForm
- docs: IressForm updates to include key concepts, alternative validation and nested form recipes
- fix: IressPopover - add popover item id to ensure the popover is accessible
- fix: tabbing on select search when it is nested should now close the parent popover, if it exists
- docs: add changelog

## 5.2.2

### Patch Changes

- chore: throw error if defaultValue is set on components inside an IressFormField

## 5.2.1

### Patch Changes

- fix: IressTabSet: Tabs in a tab set should no longer submit forms

## 5.2.0

### Minor Changes

- feat: IressFormField - new component for use inside IressForm
- chore! Removed controlled elements, please use IressFormField instead
- feat: IressLabel - changes to a strong tag if no `htmlFor` is provided
- feat: IressReadonly - new component to display readonly data
- chore: IressSelectOption - alternative to `<option />` for non-string values
- fix: IressCheckbox - now triggers its own `onChange` when inside a `IressCheckboxGroup`
- feat: Changed the `readOnly` prop on multiple components to render IressReadonly for consistency
- docs: Added recipes for displaying readonly data in forms
- docs: Update contact us
- docs: Update frequently asked questions
- docs: Current version always visible in Storybook

## 5.1.1

### Patch Changes

- fix: remove sandbox files from component build
- fix: types not pointing to the correct file in package.json

## 5.1.0

### Minor Changes

- feat: add new component, rich select
- fix: add autocomplete="off" to autocomplete, combobox and multi-combobox
- fix: arrow key navigation in popovers no longer messed up when order of elements change
- chore: pass event as second parameter to tag.onDelete
- feat: allow virtual focus on normal popovers
- fix: inline popovers do not need match activator width css
- fix: activeIndex on popover should refresh when closed
- feat: allow nested popovers
- chore: deprecate combobox and multi-combobox
- docs: storybook 8
- fix: virtual focused menu item triggers onClick prop when using keyboard to activate
- fix: col not working consistently when passing span as a number
- fix: tabs children not inheriting state from parent components

## 5.0.4

### Patch Changes

- Bug fixes, including:
  - IressForm: `onChange` and `onBlur` events are triggered on all controlled elements.
  - IressToaster: toasts will render into the `container` prop if specified.

Other changes include:

- IressText: `body` has been deprecated from `mode`, and changed to a `variant`.

## 5.0.3

### Patch Changes

- IressInput: moved calendar picker style to a theme token
- IressInput: changed clear button to type="button", should no longer submit forms
- IressInput: clicking the clear button should focus the input field consistently

## 5.0.2

### Patch Changes

- More minor bug fixes, including:
  - Apply a className passed to a controlled form element to the outermost element (the IressField)
  - IressPopover: display in the right place when the activator has a tooltip
  - IressTooltip: shift tooltip placement to avoid overlap with the edge of the viewport
  - IressForm: fix generic typing of the component

## 5.0.1

### Patch Changes

- Bug fixes, including:
  - IressInline: Uses the same gutter for row and column (regression fix)
  - Remove unused dependencies

## 5.0.0

### Major Changes

- Complete overhaul - all components migrated from WC to React. [Migration guide available in Storybook](https://design.wm.iress.com/?path=/docs/resources-migration-guides-from-v4-to-v5--docs).

### Minor Changes

- df3aab3: Migrate to changesets and release v5 beta

### Patch Changes

- 60d624f: release minor tweaks and type exports

## 5.0.0-beta.31

### Patch Changes

- release minor tweaks and type exports

## 5.0.0-beta.30

### Minor Changes

- Migrate to changesets and release v5 beta

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.19.4](https://github.com/oneiress/design-system/compare/v4.19.3...v4.19.4) (2023-10-27)

**Note:** Version bump only for package @iress-oss/ids-components

## [4.19.3](https://github.com/oneiress/design-system/compare/v4.19.2...v4.19.3) (2023-10-19)

**Note:** Version bump only for package @iress-oss/ids-components

## [4.19.2](https://github.com/oneiress/design-system/compare/v4.19.1...v4.19.2) (2023-10-17)

**Note:** Version bump only for package @iress-oss/ids-components

## [4.19.1](https://github.com/oneiress/design-system/compare/v4.19.0...v4.19.1) (2023-10-17)

**Note:** Version bump only for package @iress-oss/ids-components

# [4.19.0](https://github.com/oneiress/design-system/compare/v4.18.0...v4.19.0) (2023-10-05)

**Note:** Version bump only for package @iress-oss/ids-components

# [4.18.0](https://github.com/oneiress/design-system/compare/v4.17.1...v4.18.0) (2023-09-25)

**Note:** Version bump only for package @iress-oss/ids-components

## [4.17.1](https://github.com/oneiress/design-system/compare/v4.17.0...v4.17.1) (2023-09-13)

**Note:** Version bump only for package @iress-oss/ids-components
