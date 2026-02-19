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
import { useIdIfNeeded } from '@/hooks';
import type { ControlledValue } from '@/hooks/useControlledState';
import type { FormattedLabelValueMeta, LabelValueMeta } from '@/interfaces';
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
   * The label is a description of the dropdown menu's purpose. It is not displayed to the user but is used for accessibility purposes to describe the activator button. Ensure the label is descriptive of the options contained within the dropdown menu, e.g. "Filter by status" or "Select a category".
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
   * The current value of the dropdown menu.
   * It is required as there should always be an initial state for navigation and filtering.
   */
  selected: ControlledValue<FormattedLabelValueMeta, TMultiple>;

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
    align = 'bottom-start',
    container,
    className,
    'data-testid': dataTestId,
    debounceThreshold,
    footer,
    header,
    label,
    id: idProp,
    initialOptions,
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
    selected,
    selectedOptionsText = '{{numOptions}} selected',
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

  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);

  const [styleProps, nonStyleProps] = useMemo(
    () => splitCssProps(restProps),
    [restProps],
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

    if (!multiSelect) {
      setShow(false);
    }
  };

  const handleResetFilter = () => {
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
      return selectedOptionsText.replace(
        '{{numOptions}}',
        values.length.toString(),
      );
    }

    return values[0]?.formattedLabel ?? values[0]?.label ?? '';
  }, [selected, multiSelect, selectedOptionsText]);

  const descriptor = useMemo(() => {
    if (loading) return 'loading';
    if (show && !results.length) return searchNoResultsText;
    if (show && results.length) return `${results.length} results`;
    return label;
  }, [label, loading, results.length, searchNoResultsText, show]);

  return (
    <>
      <IressStyled id={screenreaderId} srOnly>
        {label}
      </IressStyled>
      <IressPopover
        matchActivatorWidth
        {...nonStyleProps}
        activator={
          <button
            aria-describedby={screenreaderId}
            data-testid={propagateTestid(
              dataTestId,
              'activator-button__button',
            )}
            onClick={() => setShow(true)}
            className={css(styles.activator, styleProps)}
          >
            {activatorLabel}
          </button>
        }
        align={align}
        className={cx(className, classes.root, GlobalCSSClass.Filter)}
        container={container}
        contentStyle={{ className: classes.popoverContent }}
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
                  className={classes.searchInput}
                  data-testid={propagateTestid(dataTestId, 'input')}
                  loading={loading}
                  onChange={handleQueryChange}
                  onClear={handleQueryClear}
                />
              )}
              {visibleResetButton && (
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
        {flags.showNoResults && (
          <div className={classes.noResults}>{searchNoResultsText}</div>
        )}
        {footer}
      </IressPopover>
      <IressStyled srOnly>{descriptor}</IressStyled>
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
