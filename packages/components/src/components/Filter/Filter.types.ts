import { type IressHTMLAttributes, type LabelValueMeta } from '@/interfaces';
import { type IressInputProps } from '../Input';
import { type IressPopoverProps } from '../Popover';
import { type IressSelectMenuProps } from '../RichSelect';
import {
  type AutocompleteSearchHookProps,
  type AutocompleteSearchHookReturn,
} from '@/main';
import { type ReactNode } from 'react';

export interface IressFilterProps
  extends Omit<IressHTMLAttributes, 'defaultValue' | 'onChange'>,
    Omit<AutocompleteSearchHookProps, 'query'>,
    Pick<IressSelectMenuProps, 'limitMobile' | 'limitDesktop'> {
  /**
   * Value of selected option for uncontrolled filter.
   */
  defaultValue?: LabelValueMeta | LabelValueMeta[];

  /**
   * Customise the searchable `IressInput` props for your needs.
   * @default { clearable: true, prepend: <IressIcon name="search" />, watermark: true }
   */
  inputProps?: Pick<
    IressInputProps,
    'append' | 'clearable' | 'placeholder' | 'prepend' | 'watermark'
  >;

  /**
   * Label to display in the activator button.
   */
  label: ReactNode;

  /**
   * Multi-select mode. When `true`, multiple options can be selected.
   */
  multiSelect?: boolean;

  /**
   * Emitted when the value changes.
   */
  onChange?: (selected?: LabelValueMeta | LabelValueMeta[]) => void;

  /**
   * Emitted when the value is reset.
   */
  onReset?: () => void;

  /**
   * Customise the IressPopover props for your needs.
   * @default { align: 'bottom-start' }
   */
  popoverProps?: FilterPopoverProps;

  /**
   * When `true` a search field is shown to search for specific filter option(s).
   */
  searchable?: boolean;

  /**
   * Text to be displayed when no results are found from search. Ignored when `searchable` is `false`
   */
  searchNoResultsText?: ReactNode;

  /**
   * Text displayed next to label when two or more options are selected.
   * @default {{numOptions}} selected
   */
  selectedOptionsText?: string;

  /**
   * Value of selected option for controlled filter.
   */
  value?: LabelValueMeta | LabelValueMeta[];

  /**
   * When `true`, a reset button will be shown above the options.
   * If provided a string, it will be used as the reset button label.
   */
  visibleResetButton?: boolean | string;
}

export interface FilterResultsDescriptorProps
  extends Pick<IressFilterProps, 'searchNoResultsText'>,
    Pick<AutocompleteSearchHookReturn, 'loading' | 'results'>,
    Omit<IressHTMLAttributes, 'children' | 'className' | 'results'> {}

export interface FilterRef {
  element?: HTMLDivElement;
  clearSearch: () => void;
  reset: () => void;
}

export interface FilterPopoverProps
  extends Pick<
    IressPopoverProps,
    'align' | 'className' | 'container' | 'displayMode'
  > {
  append?: ReactNode;
  prepend?: ReactNode;
}
