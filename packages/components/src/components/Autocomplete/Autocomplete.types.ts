import {
  type FormattedLabelValueMeta,
  type LabelValueMeta,
} from '@/interfaces';
import { type InputBaseElement, type IressInputProps } from '../Input';
import {
  type FormControlValue,
  type IressInputPopoverProps,
  type IressSelectMenuProps,
} from '@/main';
import { type ReactNode, type SyntheticEvent } from 'react';

export interface IressAutocompleteProps<T extends FormControlValue = string>
  extends Omit<IressInputProps<T>, 'children' | 'onChange'>,
    Omit<AutocompleteSearchHookProps, 'query'>,
    Pick<IressSelectMenuProps, 'limitMobile' | 'limitDesktop'> {
  /**
   * Always shown on focus, even if the user has not interacted with the input.
   */
  alwaysShowOnFocus?: boolean;

  /**
   * Append content.
   * @default <IressIcon name="search" />
   */
  append?: ReactNode;

  /**
   * If true, the selected option becomes the value of the input when the autocomplete loses focus.
   * @default true
   */
  autoSelect?: boolean;

  /**
   * If `true`, then user can clear the value of the input.
   * @default true
   */
  clearable?: boolean;

  /**
   * Text to be displayed when the options function errors out. It is not used when the options are provided as an array.
   * @default <IressAlert status="danger">An unknown error occurred. Please contact support if the error persists.</IressAlert>
   */
  errorText?: ReactNode;

  /**
   * Text to be displayed when no results are found.
   */
  noResultsText?: ReactNode;

  /**
   * Emitted when the user changes the input.
   * The second and third arguments are only available when the options were selected from the `options` prop.
   */
  onChange?: (
    e?: SyntheticEvent<InputBaseElement>,
    value?: T,
    option?: LabelValueMeta,
  ) => void;

  /**
   * Customise the IressInputPopover props for your needs.
   */
  popoverProps?: AutocompletePopoverProps;

  /**
   * When set to `true` add ons will render with a different style. Will be ignored if `prepend` or `append` slots are not being used.
   * @default true
   */
  watermark?: boolean;
}

export interface AutocompleteSearchHookProps {
  /**
   * Time in milliseconds to wait for before performing result search. Only applies to searchable options (function).
   * @default 500
   */
  debounceThreshold?: number;

  /**
   * Initial options data set, shown when the input is empty.
   */
  initialOptions?: LabelValueMeta[];

  /**
   * Minimum number of characters required before triggering async search. Only applies to searchable options (function).
   * Below this threshold, no search will be triggered and no loading state will be shown.
   * @default 1
   */
  minSearchLength?: number;

  /**
   * Options data set, shown when the input is not empty.
   */
  options?: LabelValueMeta[] | ((query: string) => Promise<LabelValueMeta[]>);

  /**
   * The query value to filter items by and create search results.
   */
  query?: string;
}

export interface AutocompleteSearchHookReturn {
  /**
   * Clear the error state.
   */
  clearError: () => void;

  /**
   * The debounced query value.
   */
  debouncedQuery: string;

  /**
   * Whether an error occurred during the search.
   * If a string, it is the error reason provided in the promise rejection.
   */
  error: boolean | string;

  /**
   * Whether the search is loading.
   */
  loading: boolean;

  /**
   * The results of the search.
   */
  results: FormattedLabelValueMeta[];

  /**
   * Stop the search.
   */
  stopSearch: () => void;

  /**
   * Whether to show "Type at least X characters to search" instruction.
   * True when the query length is below the minimum search length.
   */
  shouldShowInstructions: boolean;

  /**
   * Whether to show nothing (clean, minimal) during debounce waiting period.
   * True when user has typed enough characters but search hasn't started yet.
   */
  shouldShowDebounceWaiting: boolean;

  /**
   * Whether to show "No results found" message.
   * True only after a legitimate search has been performed and returned empty results.
   */
  shouldShowNoResults: boolean;

  /**
   * Smart result calculation that handles all display scenarios.
   * Returns the appropriate results based on current state.
   */
  displayResults: FormattedLabelValueMeta[];
}

export interface AutocompletePopoverProps
  extends Pick<
    IressInputPopoverProps,
    | 'autoHighlight'
    | 'align'
    | 'className'
    | 'container'
    | 'contentClassName'
    | 'displayMode'
    | 'style'
  > {
  append?: ReactNode;
  prepend?: ReactNode;
}

export interface AutocompleteNoResultsProps
  extends Pick<IressAutocompleteProps, 'noResultsText'> {
  /**
   * Pass a CSS module object to override styles.
   */
  styles: {
    noResults?: string;
  };
}

export interface AutocompleteInstructionsProps {
  /**
   * The minimum number of characters required to search.
   */
  minSearchLength: number;
  /**
   * Pass a CSS module object to override styles.
   */
  styles?: {
    instructions?: string;
  };
}
