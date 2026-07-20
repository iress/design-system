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
import { css, cx } from '@/styled-system/css';
import { dropdownMenu } from './DropdownMenu.styles';
import { splitCssProps } from '@/styled-system/jsx';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { useControlledState, useIdIfNeeded } from '@/hooks';
import type { ControlledValue } from '@/hooks/useControlledState';
import type {
  FormattedLabelValueMeta,
  IressCustomiseSlot,
  LabelValueMeta,
} from '@/interfaces';
import { GlobalCSSClass } from '@/enums';
import {
  useAutocompleteSearch,
  type AutocompleteSearchHookProps,
} from '@/components/Autocomplete';
import {
  IressSelectMenu,
  type IressSelectMenuProps,
} from '@/components/Select/SelectMenu/SelectMenu';
import type { IressInputProps } from '@/components/Input';
import {
  IressPopover,
  type PopoverRef,
  type IressPopoverProps,
  usePopoverItem,
} from '@/components/Popover';
import { IressIcon } from '@/components/Icon';
import { IressDivider } from '@/components/Divider';
import { IressStyled } from '@/components/Styled';
import { IressSpinner } from '@/components/Spinner';
import { IressInline } from '@/components/Inline';
import { IressText } from '@/components/Text';
import { toArray } from '@/helpers/formatting/toArray';
import { IressButton, type IressButtonProps } from '@/components/Button';
import { useDropdownMenuFlags } from './hooks/useDropdownMenuFlags';
import { IressSelectSearchInput } from '@/components/Select';

const styles = dropdownMenu.raw();
const classes = dropdownMenu();

export interface IressDropdownMenuProps<TMultiple extends boolean = false>
  extends
    Omit<
      IressPopoverProps,
      | 'activator'
      | 'children'
      | 'contentClassName'
      | 'defaultShow'
      | 'defaultValue'
      | 'onChange'
      | 'show'
    >,
    Omit<AutocompleteSearchHookProps, 'query'>,
    Pick<IressSelectMenuProps, 'limitMobile' | 'limitDesktop'> {
  /**
   * Customisation options for the dropdown menu activator button.
   *
   * Accepts any styling properties available on `IressCSSProps`, as well as
   * `className`, `style`, and `data-testid`.
   *
   * @example
   * ```tsx
   * <IressDropdownMenu
   *   activatorStyle={{ 'data-testid': 'my-activator', p: 'spacing.2' }}
   * />
   * ```
   */
  activatorStyle?: IressCustomiseSlot;

  /**
   * The current value of the dropdown menu. Use this in uncontrolled mode when you want to set an initial value that can be changed internally by the component. For a controlled dropdown menu, use the `selected` prop instead.
   */
  defaultSelected?: ControlledValue<FormattedLabelValueMeta, TMultiple>;

  /**
   * Footer showed in option panel when expanded.
   */
  footer?: ReactNode;

  /**
   * Header showed in option panel when expanded.
   */
  header?: ReactNode;

  /**
   * Customise the searchable `IressInput` props for your needs.
   * @default { clearable: true, prepend: <IressIcon name="search" /> }
   */
  inputProps?: Pick<
    IressInputProps,
    'append' | 'clearable' | 'placeholder' | 'prepend'
  >;

  /**
   * The label is a description of the dropdown menu's purpose.
   */
  label: ReactNode;

  /**
   * Multi-select mode. When `true`, multiple options can be selected.
   */
  multiSelect?: TMultiple;

  /**
   * Emitted when the value changes.
   */
  onChange?: (selected: ControlledValue<LabelValueMeta, TMultiple>) => void;

  /**
   * Emitted when the value is reset.
   */
  onReset?: () => void;

  /**
   * When `true` a search field is shown to search for specific filter option(s).
   */
  searchable?: boolean;

  /**
   * Text to be displayed when no results are found from search. Ignored when `searchable` is `false`
   */
  searchNoResultsText?: ReactNode;

  /**
   * The current value of the dropdown menu. Use this in controlled mode when you want to manage the selected value from a parent component. For an uncontrolled dropdown menu, use the `defaultSelected` prop instead.
   */
  selected?: ControlledValue<FormattedLabelValueMeta, TMultiple>;

  /**
   * Text displayed next to label when two or more options are selected.
   * It supports `{{numOptions}}` as a placeholder for the number of options selected.
   * @default {{numOptions}} selected
   */
  selectedOptionsText?: string;

  /**
   * When `true`, a reset button will be shown above the options.
   * If provided a string, it will be used as the reset button label.
   */
  visibleResetButton?: boolean | string;
}

export interface DropdownMenuRef extends PopoverRef {
  /**
   * Clears the search input value. This is useful to reset the search state when the dropdown menu is closed or when a selection is made. It can be called imperatively by parent components that hold a ref to the dropdown menu.
   */
  clearSearch: () => void;
}

const ResetButton = forwardRef(
  (props: IressButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const elementRef = useRef<HTMLButtonElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isActiveInPopover, ...popoverItemProps } = usePopoverItem();

    useImperativeHandle(ref, () => elementRef.current!);

    return (
      <IressButton
        {...props}
        {...popoverItemProps}
        className={classes.reset}
        mode="quaternary"
        ref={(element) => {
          elementRef.current = element;
          popoverItemProps?.ref?.(elementRef.current);
        }}
      />
    );
  },
);

const DropdownMenu = <TMultiple extends boolean = false>(
  {
    activatorStyle = {},
    align = 'bottom-start',
    container,
    className,
    'data-testid': dataTestId,
    defaultSelected,
    debounceThreshold,
    footer,
    header,
    label,
    id: idProp,
    initialOptions,
    loadingDelay,
    inputProps: inputPropsProp = {
      clearable: true,
      prepend: <IressIcon name="search" />,
    },
    limitDesktop = 12,
    limitMobile = 6,
    multiSelect,
    onChange,
    onReset,
    options,
    searchable,
    searchNoResultsText,
    selected: selectedProp,
    selectedOptionsText = ' ({{numOptions}})',
    visibleResetButton,
    ...restProps
  }: IressDropdownMenuProps<TMultiple>,
  ref: ForwardedRef<DropdownMenuRef>,
) => {
  const id = useIdIfNeeded({ id: idProp });
  const screenreaderId = `${id}-sr-text`;
  const popoverRef = useRef<PopoverRef>(null);
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

  const { value: selected, setValue } = useControlledState({
    component: 'IressDropdownMenu',
    defaultValue: defaultSelected,
    value: selectedProp,
  });

  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);

  const [styleProps, nonStyleProps] = useMemo(
    () => splitCssProps(restProps),
    [restProps],
  );

  const [activatorCssProps, activatorNonStyleProps] = useMemo(
    () => splitCssProps(activatorStyle),
    [activatorStyle],
  );

  const handleQueryChange: IressInputProps['onChange'] = (e) => {
    setQuery(e.target.value);
  };

  const handleQueryClear = () => {
    setQuery('');
  };

  const handleMenuChange: IressSelectMenuProps<TMultiple>['onChange'] = (
    selected,
  ) => {
    if (!selected) return;

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
    ...popoverRef.current!,
    clearSearch: () => setQuery(''),
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
    loadingDelay,
    options,
    query,
  });

  const flags = useDropdownMenuFlags({
    debouncedQuery,
    loading,
    results,
    searchable: isSearchable,
    shouldShowInstructions,
    shouldShowDebounceWaiting,
    shouldShowNoResults,
    visibleResetButton,
  });

  const activatorLabel = useMemo(() => {
    const values = toArray(selected);

    if (multiSelect) {
      return (
        <>
          {label}
          {selectedOptionsText.replace(
            '{{numOptions}}',
            values.length.toString(),
          )}
        </>
      );
    }

    return values[0]?.label ?? label;
  }, [selected, multiSelect, label, selectedOptionsText]);

  const descriptor = useMemo(() => {
    if (loading) return 'loading';
    if (show && !results.length) return searchNoResultsText;
    if (show && results.length) return `${results.length} results`;
    return label;
  }, [label, loading, results.length, searchNoResultsText, show]);

  return (
    <>
      <IressPopover
        matchActivatorWidth
        {...nonStyleProps}
        activator={
          <button
            {...activatorNonStyleProps}
            aria-describedby={screenreaderId}
            data-testid={
              activatorStyle?.['data-testid'] ??
              propagateTestid(dataTestId, 'activator-button__button')
            }
            onClick={() => setShow(true)}
            className={cx(
              activatorStyle?.className,
              css(styles.activator, activatorCssProps),
            )}
          >
            {activatorLabel}
          </button>
        }
        align={align}
        className={cx(
          className,
          css(styleProps),
          classes.root,
          GlobalCSSClass.Filter,
        )}
        container={container}
        contentStyle={{ className: classes.popoverContent, p: 'none' }}
        data-testid={dataTestId}
        id={id}
        show={show}
        onActivated={() => setShow(true)}
        onDeactivated={() => setShow(false)}
        ref={popoverRef}
        type="listbox"
      >
        {header}
        {flags.showHeader && (
          <>
            <IressStyled className={classes.searchHeader}>
              {isSearchable && (
                <IressSelectSearchInput
                  {...inputProps}
                  role="searchbox"
                  className={classes.searchInput}
                  data-testid={propagateTestid(dataTestId, 'input')}
                  onChange={handleQueryChange}
                  onClear={handleQueryClear}
                />
              )}
              {visibleResetButton && selected && (
                <ResetButton
                  data-testid={propagateTestid(dataTestId, 'reset-button')}
                  onClick={handleResetFilter}
                >
                  {typeof visibleResetButton === 'string'
                    ? visibleResetButton
                    : 'Reset filter'}
                </ResetButton>
              )}
            </IressStyled>
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
            selected={selected}
          />
        )}
        {flags.showLoading && (
          <IressInline gap="sm" verticalAlign="middle" p="spacing.3">
            <IressSpinner color="colour.neutral.70" />
            <IressText color="colour.neutral.70">Loading results...</IressText>
          </IressInline>
        )}
        {flags.showNoResults && (
          <div className={classes.noResults}>{searchNoResultsText}</div>
        )}
        {footer}
      </IressPopover>
      <IressStyled srOnly id={screenreaderId}>
        {descriptor}
      </IressStyled>
    </>
  );
};

export const IressDropdownMenu = forwardRef(DropdownMenu) as (<
  TMultiple extends boolean = false,
>(
  props: IressDropdownMenuProps<TMultiple> & {
    ref?: ForwardedRef<DropdownMenuRef>;
  },
) => ReactElement) & {
  displayName: 'IressDropdownMenu';
};

IressDropdownMenu.displayName = 'IressDropdownMenu';
