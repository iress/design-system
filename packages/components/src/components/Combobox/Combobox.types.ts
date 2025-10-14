import { type DisplayMode, type FormElementWidth } from '@/enums';
import {
  type IressHTMLAttributes,
  type IressInputHTMLAttributes,
  type LabelValueMeta,
} from '@/interfaces';
import {
  type AutocompleteSearchHookReturn,
  type IressAutocompleteProps,
} from '../Autocomplete';
import { type IressPopoverProps, type IressSelectMenuProps } from '@/main';
import {
  type MutableRefObject,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import {
  type InputBaseElement,
  type InputRef,
} from '../Input/InputBase/InputBase.types';

export interface IressComboboxProps
  extends Omit<IressAutocompleteProps, 'defaultValue' | 'onChange' | 'value'> {
  /**
   * Value of selected option for uncontrolled combobox.
   */
  defaultValue?: LabelValueMeta;

  /**
   * Add additional props to the hidden input.
   */
  hiddenInputProps?: Omit<
    IressInputHTMLAttributes,
    'name' | 'required' | 'value'
  >;

  /**
   * Emitted when the value changes.
   */
  onChange?: (
    e?: SyntheticEvent<InputBaseElement>,
    value?: LabelValueMeta,
  ) => void;

  /**
   * Options data set, the available options that the user can select from.
   */
  options: LabelValueMeta[] | ((query: string) => Promise<LabelValueMeta[]>);

  /**
   * Value of selected option for controlled combobox.
   */
  value?: LabelValueMeta;
}

export interface ComboboxResultsProps
  extends IressSelectMenuProps,
    Pick<IressComboboxProps, 'noResultsText'> {
  append: ReactNode;
  prepend: ReactNode;
  dataTestId?: string;
  showNoResults: boolean;
  showResults: boolean;
}

export interface ComboboxHiddenInputProps
  extends IressInputHTMLAttributes,
    Pick<IressComboboxProps, 'hiddenInputProps'> {
  dataTestId?: string;
}

export interface ComboboxResultsDescriptorProps
  extends Pick<IressComboboxProps, 'noResultsText' | 'value'>,
    Partial<Pick<AutocompleteSearchHookReturn, 'loading' | 'results'>>,
    Pick<IressPopoverProps, 'show'>,
    Omit<IressHTMLAttributes, 'children' | 'className' | 'results'> {}

export interface ComboboxInlineCompletionHookProps
  extends Pick<AutocompleteSearchHookReturn, 'debouncedQuery' | 'results'>,
    Pick<IressComboboxProps, 'autoSelect' | 'debounceThreshold' | 'onChange'> {
  queryRef: MutableRefObject<InputRef | null>;
  setTypedQuery: (query: string) => void;
  setValue: (value: LabelValueMeta) => void;
}

export interface ComboboxInlineCompletionHookReturn {
  highlightQueryByActiveIndex: (activeIndex: number | null) => void;
  setKeyPressed: (e?: KeyboardEvent) => void;
}

export interface ComboboxWithEnums
  extends React.ForwardRefExoticComponent<
    IressComboboxProps & React.RefAttributes<HTMLInputElement>
  > {
  /** @deprecated IressCombobox.DisplayMode enum is now deprecated and will be removed in a future version. Please use the value directly instead. */
  DisplayMode: typeof DisplayMode;

  /** @deprecated IressCombobox.Width enum is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Width: typeof FormElementWidth;
}
