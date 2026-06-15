/**
 * Shared component meta barrel.
 *
 * Re-exports data-only metadata from each component's `meta/` folder.
 * Used by Storybook, guidelines site, and AI docs.
 *
 * NOTE: This file intentionally does NOT re-export Thumbnail or testIds —
 * those are component-internal and not part of the shared meta contract.
 */

export type { ComponentMeta } from '@helpers/meta/types';

// Components
export { default as alertMeta } from '@/components/Alert/meta';
export { default as autocompleteMeta } from '@/components/Autocomplete/meta';
export { default as buttonMeta } from '@/components/Button/meta';
export { default as buttonGroupMeta } from '@/components/ButtonGroup/meta';
export { default as cardMeta } from '@/components/Card/meta';
export { default as checkboxMeta } from '@/components/Checkbox/meta';
export { default as checkboxGroupMeta } from '@/components/CheckboxGroup/meta';
export { default as colMeta } from '@/components/Col/meta';
export { default as containerMeta } from '@/components/Container/meta';
export { default as dividerMeta } from '@/components/Divider/meta';
export { default as expanderMeta } from '@/components/Expander/meta';
export { default as fieldMeta } from '@/components/Field/meta';
export { default as fieldGroupMeta } from '@/components/FieldGroup/meta';
export { default as hideMeta } from '@/components/Hide/meta';
export { default as iconMeta } from '@/components/Icon/meta';
export { default as imageMeta } from '@/components/Image/meta';
export { default as inlineMeta } from '@/components/Inline/meta';
export { default as inputMeta } from '@/components/Input/meta';
export { default as inputCurrencyMeta } from '@/components/InputCurrency/meta';
export { default as labelMeta } from '@/components/Label/meta';
export { default as linkMeta } from '@/components/Link/meta';
export { default as menuMeta } from '@/components/Menu/meta';
export { default as modalMeta } from '@/components/Modal/meta';
export { default as panelMeta } from '@/components/Panel/meta';
export { default as pillMeta } from '@/components/Pill/meta';
export { default as placeholderMeta } from '@/components/Placeholder/meta';
export { default as popoverMeta } from '@/components/Popover/meta';
export { default as progressMeta } from '@/components/Progress/meta';
export { default as radioMeta } from '@/components/Radio/meta';
export { default as radioGroupMeta } from '@/components/RadioGroup/meta';
export { default as readonlyMeta } from '@/components/Readonly/meta';
export { default as rowMeta } from '@/components/Row/meta';
export { default as selectMeta } from '@/components/Select/meta';
export { default as skeletonMeta } from '@/components/Skeleton/meta';
export { default as skipLinkMeta } from '@/components/SkipLink/meta';
export { default as slideoutMeta } from '@/components/Slideout/meta';
export { default as sliderMeta } from '@/components/Slider/meta';
export { default as spinnerMeta } from '@/components/Spinner/meta';
export { default as stackMeta } from '@/components/Stack/meta';
export { default as tableMeta } from '@/components/Table/meta';
export { default as tabSetMeta } from '@/components/TabSet/meta';
export { default as tagMeta } from '@/components/Tag/meta';
export { default as textMeta } from '@/components/Text/meta';
export { default as toasterMeta } from '@/components/Toaster/meta';
export { default as toggleMeta } from '@/components/Toggle/meta';
export { default as tooltipMeta } from '@/components/Tooltip/meta';
export { default as validationMessageMeta } from '@/components/ValidationMessage/meta';

// Patterns
export { default as breadcrumbsMeta } from '@/patterns/Breadcrumbs/meta';
export { default as contextualMenuMeta } from '@/patterns/ContextualMenu/meta';
export { default as dropdownMenuMeta } from '@/patterns/DropdownMenu/meta';
export { default as feedbackMeta } from '@/patterns/Feedback/meta';
export { default as formMeta } from '@/patterns/Form/meta';
export { default as loadingMeta } from '@/patterns/Loading/meta';
export { default as shadowMeta } from '@/patterns/Shadow/meta';
export { default as sideNavMeta } from '@/patterns/SideNav/meta';
