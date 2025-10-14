import { forwardRef, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Combobox.module.scss';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { IressInputPopover, type IressInputPopoverProps } from '../Popover';
import { DisplayMode, FormElementWidth } from '@/enums';
import {
  type ComboboxWithEnums,
  type IressComboboxProps,
} from './Combobox.types';
import { type IressSelectMenuProps, useRichSelectState } from '../RichSelect';
import { IressInput, type IressInputProps } from '../Input';
import { IressIcon } from '../Icon';
import { useAutocompleteSearch } from '../Autocomplete';
import { useIdIfNeeded } from '@/hooks';
import { type InputRef } from '../Input/InputBase/InputBase.types';
import { ComboboxResultsDescriptor } from './components/ComboboxResultsDescriptor';
import { useComboboxFlags } from './hooks/useComboboxFlags';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { useComboboxInlineCompletion } from './hooks/useComboboxInlineCompletion';
import { ComboboxResults } from './components/ComboboxResults';
import { ComboboxHiddenInput } from './components/ComboboxHiddenInput';
import { IressReadonly } from '../Readonly';
import { useNoDefaultValueInForms } from '../Form/hooks/useNoDefaultValueInForms';

/**
 * @deprecated IressCombobox is now deprecated and may be removed in a future version. It is highly recommended to use the new IressRichSelect component instead.
 * Although still in beta, IressRichSelect is likely the user experience we will be using going forward for advanced selects. Please use it in new development, and give feedback to the IDS team.
 */
export const IressCombobox = forwardRef(
  (
    {
      append = <IressIcon name="search" />,
      autoComplete = 'off',
      autoSelect = true,
      className,
      clearable = true,
      'data-testid': dataTestId,
      debounceThreshold,
      defaultValue,
      hiddenInputProps,
      id: idProp,
      initialOptions,
      limitDesktop = 12,
      limitMobile = 6,
      name,
      noResultsText,
      onBlur,
      onChange,
      onClear,
      onFocus,
      onKeyDown,
      options,
      popoverProps: {
        append: popoverAppend,
        prepend: popoverPrepend,
        ...popoverProps
      } = {},
      readOnly,
      required,
      value: valueProp,
      watermark = true,
      ...restProps
    }: IressComboboxProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    useNoDefaultValueInForms({
      component: 'IressCombobox',
      defaultValue,
    });

    const id = useIdIfNeeded({ id: idProp });
    const screenreaderId = `${id}-sr-text`;
    const queryRef = useRef<InputRef | null>(null);

    const [show, setShow] = useState(false);
    const { value, setValue, getLabelsString, getValuesString } =
      useRichSelectState({
        component: 'IressCombobox',
        defaultValue,
        value: valueProp,
      });

    // The query that is used for searching
    const [query, setQuery] = useState('');

    // The actual query that appears in the input. This is different from the query to allow for inline completion without triggering searching.
    const [typedQuery, setTypedQuery] = useState(getLabelsString());

    const {
      debouncedQuery,
      loading,
      results,
      stopSearch,
      shouldShowInstructions,
      shouldShowDebounceWaiting,
      shouldShowNoResults,
      displayResults,
    } = useAutocompleteSearch({
      debounceThreshold,
      initialOptions,
      options,
      query,
    });

    const flags = useComboboxFlags({
      debouncedQuery,
      loading,
      results,
      shouldShowInstructions,
      shouldShowDebounceWaiting,
      shouldShowNoResults,
      displayResults,
    });

    const inlineCompletion = useComboboxInlineCompletion({
      autoSelect,
      debouncedQuery,
      debounceThreshold,
      onChange,
      queryRef,
      results,
      setTypedQuery,
      setValue,
    });

    if (readOnly) {
      return (
        <IressReadonly value={getValuesString()}>
          {getLabelsString()}
        </IressReadonly>
      );
    }

    /**
     * Change both query and the visible query on change.
     */
    const handleQueryChange: IressInputProps['onChange'] = (e) => {
      const newQuery = e.target.value;

      setQuery(newQuery);
      setTypedQuery(newQuery);

      if (!newQuery) {
        setValue(undefined);
        onChange?.(getValueAsEvent(undefined), undefined);

        if (initialOptions) {
          setShow(true);
        }
      }
    };

    /**
     * Clear value and query on clear of input.
     */
    const handleQueryClear: IressInputProps['onClear'] = (e) => {
      onClear?.(e);
      setQuery('');
      setTypedQuery('');
      setValue(undefined);
      setShow(false);
    };

    /**
     * If no query is present, set the query to the typed query when popover is opened (which happens during focus).
     */
    const handleQueryFocus: IressInputProps['onFocus'] = (e) => {
      onFocus?.(e);

      if (!query) {
        setQuery(typedQuery);
      }
    };

    /**
     * When the query input is blurred, set the value from the active value in the popover if it exists.
     */
    const handleQueryBlur: IressInputProps['onBlur'] = (e) => {
      onBlur?.(e);
      setTypedQuery(value ? getLabelsString() : '');
    };

    /**
     * When the query input is blurred, set the value from the active value in the popover if it exists.
     */
    const handleQueryKeyDown: IressInputProps['onKeyDown'] = (e) => {
      onKeyDown?.(e);
      inlineCompletion.setKeyPressed(e.nativeEvent);
    };

    /**
     * When the menu is changed, set the value from the active value in the popover if it exists and close the popover.
     * We do not use the value in the menu, as it conflicts with the active popover value and may un-toggle it, which we do not want.
     */
    const handleMenuChange: IressSelectMenuProps['onChange'] = (e) => {
      const item = toArray(e)?.[0];
      setValue(item);
      onChange?.(getValueAsEvent(item), item);
      setTypedQuery(item?.label);
      setShow(false);
    };

    /**
     * When the popover is deactivated, close the popover and stop searching.
     */
    const handlePopoverDeactivated: IressInputPopoverProps['onDeactivated'] =
      () => {
        setShow(false);
        stopSearch();
      };

    /**
     * When the popover is navigated internally, we can start inline completion.
     */
    const handlePopoverNavigate: Required<IressInputPopoverProps>['onNavigate'] =
      (activeIndex) => {
        if (activeIndex !== null) {
          inlineCompletion.setKeyPressed(undefined);
          inlineCompletion.highlightQueryByActiveIndex(activeIndex);
        }
      };

    return (
      <div
        className={classNames(className, styles.combobox)}
        data-testid={dataTestId}
      >
        <IressInputPopover
          {...popoverProps}
          activator={
            <IressInput
              {...restProps}
              append={append}
              autoComplete={autoComplete}
              aria-describedby={screenreaderId}
              clearable={clearable}
              loading={loading}
              data-testid={propagateTestid(dataTestId, 'input')}
              id={id}
              onBlur={handleQueryBlur}
              onChange={handleQueryChange}
              onClear={handleQueryClear}
              onFocus={handleQueryFocus}
              onKeyDown={handleQueryKeyDown}
              ref={queryRef}
              value={typedQuery}
              watermark={watermark}
            />
          }
          className={classNames(className, styles.popover)}
          contentClassName={styles.popoverContent}
          minLength={initialOptions?.length ? 0 : restProps.minLength}
          onActivated={() => setShow(true)}
          onDeactivated={handlePopoverDeactivated}
          onNavigate={handlePopoverNavigate}
          show={show}
          type="listbox"
          data-testid={propagateTestid(dataTestId, 'popover')}
        >
          <ComboboxResults
            append={popoverAppend}
            dataTestId={dataTestId}
            limitDesktop={limitDesktop}
            limitMobile={limitMobile}
            noResultsText={noResultsText}
            onChange={handleMenuChange}
            prepend={popoverPrepend}
            items={results}
            selected={value}
            showNoResults={flags.showNoResults}
            showResults={flags.showResults}
          />
        </IressInputPopover>
        <ComboboxHiddenInput
          hiddenInputProps={hiddenInputProps}
          dataTestId={dataTestId}
          name={name}
          ref={ref}
          required={required}
          value={getValuesString()}
        />
        <ComboboxResultsDescriptor
          data-testid={propagateTestid(dataTestId, 'results-sr-text')}
          id={screenreaderId}
          loading={loading}
          noResultsText={noResultsText}
          results={results}
        />
      </div>
    );
  },
) as ComboboxWithEnums;

IressCombobox.displayName = 'IressCombobox';

/** @deprecated IressCombobox.DisplayMode enum is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressCombobox.DisplayMode = DisplayMode;

/** @deprecated IressCombobox.Width enum is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressCombobox.Width = FormElementWidth;
