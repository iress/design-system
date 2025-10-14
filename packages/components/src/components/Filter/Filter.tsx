import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  type IressFilterProps,
  type FilterRef,
  type FilterPopoverProps,
} from './Filter.types';
import styles from './Filter.module.scss';

import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressPopover } from '../Popover';
import { IressButton } from '../Button';
import {
  IressSelectMenu,
  type IressSelectMenuProps,
  useRichSelectState,
} from '../RichSelect';
import { useAutocompleteSearch } from '../Autocomplete';
import { type IressInputProps } from '../Input';
import { IressPanel } from '../Panel';
import { useFilterFlags } from './hooks/useFilterFlags';
import { useIdIfNeeded } from '@/hooks';
import { FilterSearch } from './components/FilterSearch';
import { IressDivider } from '../Divider';
import { FilterResetButton } from './components/FilterResetButton';
import { AutocompleteNoResults } from '../Autocomplete/components/AutocompleteNoResults';
import { FilterLabel } from './components/FilterLabel';
import { ComboboxResultsDescriptor } from '../Combobox/components/ComboboxResultsDescriptor';
import { IressIcon } from '@/main';

const DEFAULT_POPOVER_PROPS: FilterPopoverProps = {
  align: 'bottom-start',
};

export const IressFilter = forwardRef(
  (
    {
      children,
      className,
      'data-testid': dataTestId,
      debounceThreshold,
      defaultValue,
      id: idProp,
      initialOptions,
      inputProps: inputPropsProp = {
        clearable: true,
        prepend: <IressIcon name="search" />,
        watermark: true,
      },
      limitDesktop = 12,
      limitMobile = 6,
      label: labelProp,
      multiSelect,
      onChange,
      onReset,
      options,
      popoverProps: {
        append: popoverAppend,
        prepend: popoverPrepend,
        ...popoverPropsProp
      } = DEFAULT_POPOVER_PROPS,
      searchable,
      searchNoResultsText,
      selectedOptionsText,
      value: valueProp,
      visibleResetButton,
      ...restProps
    }: IressFilterProps,
    ref: React.ForwardedRef<FilterRef>,
  ) => {
    const id = useIdIfNeeded({ id: idProp });
    const screenreaderId = `${id}-sr-text`;
    const elementRef = useRef<HTMLDivElement>(null);
    const isSearchable = useMemo(
      () => searchable ?? typeof options === 'function',
      [options, searchable],
    );
    const inputProps = {
      ...{
        clearable: true,
        prepend: <IressIcon name="search" />,
        watermark: true,
      },
      ...inputPropsProp,
    };
    const popoverProps = { ...DEFAULT_POPOVER_PROPS, ...popoverPropsProp };

    const { value, setValue } = useRichSelectState({
      component: 'IressFilter',
      defaultValue,
      multiple: multiSelect,
      value: valueProp,
    });
    const [query, setQuery] = useState('');
    const [show, setShow] = useState(false);

    const handleQueryChange: IressInputProps['onChange'] = (e) => {
      setQuery(e.target.value);
    };

    const handleQueryClear = () => {
      setQuery('');
    };

    const handleMenuChange: IressSelectMenuProps['onChange'] = (selected) => {
      onChange?.(selected);
      setValue(selected);

      if (!multiSelect) {
        setShow(false);
      }
    };

    const handleResetFilter = () => {
      setValue(undefined);
      onReset?.();
      if (!multiSelect) {
        setShow(false);
      }
    };

    useImperativeHandle(ref, () => ({
      element: elementRef.current ?? undefined,
      clearSearch: () => setQuery(''),
      reset: () => setValue(defaultValue),
    }));

    const {
      debouncedQuery,
      loading,
      results,
      shouldShowInstructions,
      shouldShowDebounceWaiting,
      shouldShowNoResults,
      displayResults,
    } = useAutocompleteSearch({
      debounceThreshold,
      initialOptions:
        initialOptions ?? (typeof options === 'function' ? undefined : options),
      options,
      query,
    });

    const flags = useFilterFlags({
      debouncedQuery,
      loading,
      results,
      shouldShowInstructions,
      shouldShowDebounceWaiting,
      shouldShowNoResults,
      displayResults,
      searchable: isSearchable,
      visibleResetButton,
    });

    return (
      <div
        {...restProps}
        className={classNames(className, styles.filter, {
          [styles.multiSelect]: multiSelect,
          [styles.searchable]: searchable,
        })}
        data-testid={dataTestId}
        id={id}
        ref={elementRef}
      >
        <IressPopover
          {...popoverProps}
          activator={
            <IressButton
              aria-describedby={screenreaderId}
              data-testid={propagateTestid(
                dataTestId,
                'activator-button__button',
              )}
              onClick={() => setShow(true)}
            >
              <FilterLabel
                label={labelProp}
                selectedOptionsText={selectedOptionsText}
                value={value}
              />
              <span className={styles.chevron} />
            </IressButton>
          }
          data-testid={propagateTestid(dataTestId, 'popover')}
          show={show}
          onActivated={() => setShow(true)}
          onDeactivated={() => setShow(false)}
          type="listbox"
        >
          {popoverPrepend}
          {flags.showHeader && (
            <>
              <IressPanel background="transparent">
                {isSearchable && (
                  <FilterSearch
                    {...inputProps}
                    className={styles.searchInput}
                    data-testid={propagateTestid(dataTestId, 'input')}
                    loading={loading}
                    onChange={handleQueryChange}
                    onClear={handleQueryClear}
                  />
                )}
                {visibleResetButton && (
                  <FilterResetButton
                    data-testid={propagateTestid(dataTestId, 'reset-button')}
                    onClick={handleResetFilter}
                  >
                    {typeof visibleResetButton === 'string'
                      ? visibleResetButton
                      : 'Reset filter'}
                  </FilterResetButton>
                )}
              </IressPanel>
              <IressDivider gutter="none" />
            </>
          )}
          {flags.showResults && (
            <IressSelectMenu
              className={styles.optionList}
              data-testid={propagateTestid(dataTestId, 'menu')}
              items={results}
              limitDesktop={limitDesktop}
              limitMobile={limitMobile}
              multiSelect={multiSelect}
              onChange={handleMenuChange}
              selected={value}
              selectedFirst={multiSelect}
            />
          )}
          {flags.showNoResults && (
            <AutocompleteNoResults
              noResultsText={searchNoResultsText}
              styles={styles}
            />
          )}
          {popoverAppend}
        </IressPopover>
        {children}
        <ComboboxResultsDescriptor
          data-testid={propagateTestid(dataTestId, 'results-sr-text')}
          id={screenreaderId}
          loading={loading}
          noResultsText={searchNoResultsText}
          results={results}
        />
      </div>
    );
  },
);

IressFilter.displayName = 'IressFilter';
