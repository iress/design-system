import classNames from 'classnames';
import { type IressAutocompleteProps } from './Autocomplete.types';
import styles from './Autocomplete.module.scss';
import { IressInputPopover, type IressInputPopoverProps } from '../Popover';
import { IressInput, type IressInputProps } from '../Input';
import { useControlledState } from '@/hooks/useControlledState';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { useAutocompleteSearch } from './hooks/useAutocompleteSearch';
import { IressIcon } from '../Icon/Icon';
import { forwardRef, useEffect, useState } from 'react';
import { type InputRef } from '../Input/InputBase/InputBase.types';
import { AutocompleteNoResults } from './components/AutocompleteNoResults';
import { AutocompleteInstructions } from './components/AutocompleteInstructions';
import { IressSelectMenu, type IressSelectMenuProps } from '../RichSelect';
import { IressReadonly } from '../Readonly';
import { IressAlert } from '../Alert';

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
        <IressAlert status="danger">
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
      watermark = true,
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
            watermark={watermark}
            ref={ref}
          />
        }
        autoHighlight={autoHighlight}
        className={classNames(
          className,
          popoverProps.className,
          styles.autocomplete,
        )}
        contentClassName={classNames(
          popoverProps.contentClassName,
          styles.popoverContent,
        )}
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
              className={styles.optionList}
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
          <AutocompleteInstructions
            minSearchLength={minSearchLength ?? 1}
            styles={styles}
          />
        )}
        {shouldShowNoResults && !error && (
          <AutocompleteNoResults
            noResultsText={noResultsText}
            styles={styles}
          />
        )}
      </IressInputPopover>
    );
  },
);

IressAutocomplete.displayName = 'IressAutocomplete';
