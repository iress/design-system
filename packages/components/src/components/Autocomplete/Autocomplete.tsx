import { cx } from '@/styled-system/css';
import { autoComplete as autoCompleteStyles } from './Autocomplete.styles';
import { IressInputPopover, type IressInputPopoverProps } from '../Popover';
import {
  IressInput,
  type InputBaseElement,
  type IressInputProps,
} from '../Input';
import { useControlledState } from '@/hooks/useControlledState';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import {
  type AutocompleteSearchHookProps,
  useAutocompleteSearch,
} from './hooks/useAutocompleteSearch';
import { IressIcon } from '../Icon/Icon';
import {
  forwardRef,
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { type InputRef } from '../Input/InputBase/InputBase';
import { AutocompleteInstructions } from './components/AutocompleteInstructions';
import { IressSelectMenu, type IressSelectMenuProps } from '../RichSelect';
import { IressReadonly } from '../Readonly';
import { IressAlert } from '../Alert';
import { type LabelValueMeta } from '@/interfaces';
import { GlobalCSSClass } from '@/enums';
import { type FormControlValue } from '@/types';

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
}

export interface AutocompletePopoverProps
  extends Pick<
    IressInputPopoverProps,
    | 'autoHighlight'
    | 'align'
    | 'className'
    | 'container'
    | 'contentClassName'
    | 'contentStyle'
    | 'displayMode'
    | 'style'
  > {
  append?: ReactNode;
  prepend?: ReactNode;
}

export const IressAutocomplete = forwardRef<InputRef, IressAutocompleteProps>(
  (
    {
      alwaysShowOnFocus,
      append = <IressIcon name="search" />,
      autoComplete = 'off',
      autoSelect = true,
      className,
      clearable = true,
      'data-testid': dataTestId,
      debounceThreshold,
      defaultValue,
      errorText = (
        <IressAlert status="danger" mb="none">
          An unknown error occurred. Please contact support if the error
          persists.
        </IressAlert>
      ),
      initialOptions,
      limitDesktop = 12,
      limitMobile = 6,
      minSearchLength,
      noResultsText,
      onChange,
      onClear,
      onFocus,
      options,
      popoverProps: {
        autoHighlight = false,
        append: popoverAppend,
        prepend: popoverPrepend,
        ...popoverProps
      } = {},
      readOnly,
      value: valueProp,
      ...restProps
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);
    const { value, setValue } = useControlledState({
      component: 'IressAutocomplete',
      defaultValue,
      value: valueProp,
    });
    const [valueChanged, setValueChanged] = useState(false);

    const {
      clearError,
      debouncedQuery,
      error,
      loading,
      results,
      stopSearch,
      shouldShowInstructions,
      shouldShowNoResults,
    } = useAutocompleteSearch({
      debounceThreshold,
      initialOptions,
      minSearchLength,
      options,
      query: getFormControlValueAsStringIfDefined(value),
    });

    useEffect(() => {
      if (valueChanged && !show && results.length > 0) {
        setShow(true);
      }
    }, [results.length, show, valueChanged]);

    useEffect(() => {
      if (error) {
        setShow(true);
      }
    }, [error]);

    if (readOnly) {
      return <IressReadonly value={value} />;
    }

    const handleInputChange: IressAutocompleteProps['onChange'] = (
      e,
      newValue,
    ) => {
      onChange?.(e, newValue);
      setValue(newValue);
      setValueChanged(true);
    };

    const handleInputClear: IressInputProps['onClear'] = (e) => {
      onClear?.(e);
      setValue('');
    };

    const handleInputFocus: IressInputProps['onFocus'] = (e) => {
      onFocus?.(e);

      if (initialOptions?.length) {
        setShow(true);
      }
    };

    const handleMenuChange: IressSelectMenuProps['onChange'] = (selected) => {
      const selectedItem = toArray(selected)?.[0];
      onChange?.(
        getValueAsEvent(selectedItem?.label),
        selectedItem?.label,
        selectedItem,
      );
      setValue(selectedItem?.label);
      setShow(false);
      setValueChanged(false);
    };

    const handlePopoverDeactivated: IressInputPopoverProps['onDeactivated'] =
      () => {
        // Don't clear search results when alwaysShowOnFocus is true and there's a value
        // This preserves the results for when focus returns
        if (!alwaysShowOnFocus || !value) {
          stopSearch();
        }
        clearError();
        setShow(false);

        if (value) {
          setValueChanged(false);
        }
      };

    const classes = autoCompleteStyles({
      isEmpty: results.length === 0,
    });

    return (
      <IressInputPopover
        {...popoverProps}
        activator={
          <IressInput
            {...restProps}
            append={append}
            autoComplete={autoComplete}
            clearable={clearable}
            data-testid={propagateTestid(dataTestId, 'input')}
            loading={loading}
            onChange={handleInputChange}
            onClear={handleInputClear}
            onFocus={handleInputFocus}
            value={value}
            ref={ref}
          />
        }
        autoHighlight={autoHighlight}
        className={cx(
          className,
          popoverProps.className,
          classes.root,
          GlobalCSSClass.Autocomplete,
        )}
        contentClassName={cx(
          popoverProps.contentClassName,
          classes.popoverContent,
        )}
        contentStyle={popoverProps.contentStyle}
        data-testid={dataTestId}
        minLength={0}
        onActivated={() => (valueChanged || alwaysShowOnFocus) && setShow(true)}
        onDeactivated={handlePopoverDeactivated}
        show={show}
        type="listbox"
      >
        {results.length > 0 && (
          <>
            {popoverPrepend}
            <IressSelectMenu
              changeOnBlur={autoSelect}
              className={cx(classes.optionList)}
              data-testid={propagateTestid(dataTestId, 'menu')}
              items={results}
              limitDesktop={limitDesktop}
              limitMobile={limitMobile}
              onChange={handleMenuChange}
              selected={{ label: debouncedQuery }}
            />
            {popoverAppend}
          </>
        )}
        {error && errorText}
        {shouldShowInstructions && !error && (
          <AutocompleteInstructions minSearchLength={minSearchLength ?? 1} />
        )}
        {shouldShowNoResults && !error && noResultsText}
      </IressInputPopover>
    );
  },
);

IressAutocomplete.displayName = 'IressAutocomplete';
