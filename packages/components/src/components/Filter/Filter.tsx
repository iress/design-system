import {
  forwardRef,
  type ReactElement,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type ForwardedRef,
} from 'react';
import { cx } from '@/styled-system/css';
import { filter } from './Filter.styles';

import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressPopover, type IressPopoverProps } from '../Popover';
import { IressButton } from '../Button';
import {
  IressSelectMenu,
  type IressSelectMenuProps,
  useRichSelectState,
} from '../RichSelect';
import {
  useAutocompleteSearch,
  type AutocompleteSearchHookProps,
  type AutocompleteSearchHookReturn,
} from '../Autocomplete';
import { type IressInputProps } from '../Input';
import { IressPanel } from '../Panel';
import { useFilterFlags } from './hooks/useFilterFlags';
import { useIdIfNeeded } from '@/hooks';
import { FilterSearch } from './components/FilterSearch';
import { IressDivider } from '../Divider';
import { FilterResetButton } from './components/FilterResetButton';
import { FilterLabel } from './components/FilterLabel';
import { IressIcon } from '../Icon';
import { type ControlledValue } from '@/hooks/useControlledState';
import { type IressHTMLAttributes, type LabelValueMeta } from '@/interfaces';
import { GlobalCSSClass } from '@/enums';
import { FilterResultsDescriptor } from './components/FilterResultsDescriptor';

export interface IressFilterProps<TMultiple extends boolean = false>
  extends Omit<IressHTMLAttributes, 'defaultValue' | 'onChange'>,
    Omit<AutocompleteSearchHookProps, 'query'>,
    Pick<IressSelectMenuProps, 'limitMobile' | 'limitDesktop'> {
  /**
   * Value of selected option for uncontrolled filter.
   */
  defaultValue?: ControlledValue<LabelValueMeta, TMultiple>;

  /**
   * Customise the searchable `IressInput` props for your needs.
   * @default { clearable: true, prepend: <IressIcon name="search" /> }
   */
  inputProps?: Pick<
    IressInputProps,
    'append' | 'clearable' | 'placeholder' | 'prepend'
  >;

  /**
   * Label to display in the activator button.
   */
  label: ReactNode;

  /**
   * Multi-select mode. When `true`, multiple options can be selected.
   */
  multiSelect?: TMultiple;

  /**
   * Emitted when the value changes.
   */
  onChange?: (selected?: ControlledValue<LabelValueMeta, TMultiple>) => void;

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
  value?: ControlledValue<LabelValueMeta, TMultiple>;

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
  footer?: ReactNode;
  header?: ReactNode;
}

const DEFAULT_POPOVER_PROPS: FilterPopoverProps = {
  align: 'bottom-start',
};

const Filter = <TMultiple extends boolean = false>(
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
    },
    limitDesktop = 12,
    limitMobile = 6,
    label: labelProp,
    multiSelect,
    onChange,
    onReset,
    options,
    popoverProps: {
      footer: popoverAppend,
      header: popoverPrepend,
      ...popoverPropsProp
    } = DEFAULT_POPOVER_PROPS,
    searchable,
    searchNoResultsText,
    selectedOptionsText,
    value: valueProp,
    visibleResetButton,
    ...restProps
  }: IressFilterProps<TMultiple>,
  ref: ForwardedRef<FilterRef>,
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

  const handleMenuChange: IressSelectMenuProps<TMultiple>['onChange'] = (
    selected,
  ) => {
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
    searchable: isSearchable,
    shouldShowInstructions,
    shouldShowDebounceWaiting,
    shouldShowNoResults,
    visibleResetButton,
  });

  const classes = filter();

  return (
    <div
      {...restProps}
      className={cx(className, classes.root, GlobalCSSClass.Filter)}
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
            <span className={classes.chevron} />
          </IressButton>
        }
        contentStyle={{ className: classes.popoverContent }}
        data-testid={propagateTestid(dataTestId, 'popover')}
        show={show}
        matchActivatorWidth
        onActivated={() => setShow(true)}
        onDeactivated={() => setShow(false)}
        type="listbox"
      >
        {popoverPrepend}
        {flags.showHeader && (
          <>
            <IressPanel bg="transparent" p="spacing.2">
              {isSearchable && (
                <FilterSearch
                  {...inputProps}
                  className={classes.searchInput}
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
            {flags.showResults && <IressDivider />}
          </>
        )}
        {flags.showResults && (
          <IressSelectMenu
            className={classes.optionList}
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
          <div className={classes.noResults}>{searchNoResultsText}</div>
        )}
        {popoverAppend}
      </IressPopover>
      {children}
      <FilterResultsDescriptor
        data-testid={propagateTestid(dataTestId, 'results-sr-text')}
        id={screenreaderId}
        loading={loading}
        noResultsText={searchNoResultsText}
        results={results}
      />
    </div>
  );
};

export const IressFilter = forwardRef(Filter) as <
  TMultiple extends boolean = false,
>(
  props: IressFilterProps<TMultiple> & {
    ref?: ForwardedRef<FilterRef>;
  },
) => ReactElement;
