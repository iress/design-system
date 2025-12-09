import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import {
  type IressRichSelectProps,
  type SelectOptionsRenderProps,
} from '../RichSelect';
import {
  type UIEventHandler,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';
import { IressSelectSearch } from '../SelectSearch/SelectSearch';
import { toArray } from '@helpers/formatting/toArray';
import {
  IressSelectMenu,
  type IressSelectMenuProps,
} from '../SelectMenu/SelectMenu';
import { IressAlert } from '@/components/Alert';
import {
  type FormattedLabelValueMeta,
  type LabelValueMeta,
} from '@/interfaces';
import { type InputRef } from '@/components/Input';
import { IressSelectSearchInput } from '../SelectSearchInput/SelectSearchInput';
import { IressSelectHeading } from '../SelectHeading/SelectHeading';
import { IressMenuDivider } from '@/components/Menu';
import { type IressButtonProps } from '@/components/Button';
import { type ControlledValue } from '@/hooks';

interface SelectOptionsProps<TMultiple extends boolean = false>
  extends Pick<
      IressRichSelectProps<TMultiple>,
      | 'autoHighlight'
      | 'minSearchLength'
      | 'multiSelect'
      | 'onChange'
      | 'options'
      | 'renderOptions'
      | 'value'
      | 'initialOptions'
    >,
    Omit<
      SelectOptionsRenderProps<TMultiple>,
      'close' | 'handleClear' | 'handleMenuChange'
    > {
  setShow: (show: boolean) => void;
  shouldShowInstructions?: boolean;
  shouldShowNoResults?: boolean;
}

const SelectAsyncResults = <TMultiple extends boolean = false>({
  minSearchLength,
  multiSelect,
  onChange,
  query,
  results,
  shouldShowInstructions,
  shouldShowNoResults,
  value,
}: Pick<
  SelectOptionsProps<TMultiple>,
  | 'minSearchLength'
  | 'multiSelect'
  | 'query'
  | 'results'
  | 'value'
  | 'shouldShowInstructions'
  | 'shouldShowNoResults'
> &
  Pick<IressSelectMenuProps<TMultiple>, 'onChange'>) => {
  // Use proper state indicators from useAutocompleteSearch hook
  const getNoResultsMessage = () => {
    if (!query) {
      return undefined;
    }

    if (shouldShowInstructions) {
      return `Type at least ${minSearchLength} character${minSearchLength === 1 ? '' : 's'} to search`;
    }

    if (shouldShowNoResults) {
      return 'No results found';
    }

    return undefined;
  };

  return (
    <IressSelectMenu
      heading={multiSelect ? 'Search results' : undefined}
      items={results}
      multiSelect={multiSelect}
      noResults={getNoResultsMessage()}
      onChange={onChange}
      selected={value}
      hideSelectedItems={multiSelect}
    />
  );
};

const SelectAsyncError = ({ error }: Pick<SelectOptionsProps, 'error'>) => {
  if (!error) return null;

  return (
    <IressAlert className="iress-m--sm" status="danger">
      {typeof error === 'string' ? (
        error
      ) : (
        <>
          An unknown error occurred.
          <br /> Please contact support if the error persists.
        </>
      )}
    </IressAlert>
  );
};

const SelectAsyncOptions = <TMultiple extends boolean = false>({
  autoHighlight,
  error,
  loading,
  minSearchLength,
  multiSelect,
  onChange,
  onClear,
  query,
  results,
  setQuery,
  show,
  value,
  shouldShowInstructions,
  shouldShowNoResults,
}: Pick<
  SelectOptionsProps<TMultiple>,
  | 'autoHighlight'
  | 'error'
  | 'loading'
  | 'minSearchLength'
  | 'multiSelect'
  | 'query'
  | 'results'
  | 'setQuery'
  | 'show'
  | 'value'
  | 'shouldShowInstructions'
  | 'shouldShowNoResults'
> &
  Pick<IressSelectMenuProps<TMultiple>, 'onChange'> & {
    onClear?: UIEventHandler<HTMLButtonElement>;
  }) => {
  const selectedArray = toArray(value).map(
    (selectedItem: FormattedLabelValueMeta) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We only need the unformatted object keys when displaying the selected value
      const { formattedLabel, ...unformatted } = selectedItem;
      return unformatted;
    },
  );
  const hasResults = !error && (!!results?.length || (query && !loading));
  const hasSelected = !!selectedArray.length && multiSelect;
  const hasResultsAndSelected = hasResults && hasSelected;
  const inputRef = useRef<InputRef | null>(null);
  const headingId = useId();

  useEffect(() => {
    if (!show) {
      setQuery?.('');
    }
  }, [show, setQuery]);

  const focusIndexWhenSearching = hasSelected ? selectedArray.length + 1 : 0;
  const focusIndexWhenNotSearching = hasSelected ? 1 : 0;
  const calculatedFocusIndex =
    query && hasResults ? focusIndexWhenSearching : focusIndexWhenNotSearching;

  return (
    <IressSelectSearch
      activator={
        <IressSelectSearchInput
          aria-label="Search"
          loading={loading}
          onChange={(e) => setQuery?.(e.target.value)}
          ref={inputRef}
          placeholder="Search and select"
          value={query}
        />
      }
      autoHighlight={autoHighlight}
      focusStartIndex={autoHighlight ? calculatedFocusIndex : undefined}
    >
      {hasSelected && (
        <IressSelectMenu
          aria-labelledby={headingId}
          heading={
            <IressSelectHeading
              clearAll
              onClearAll={(e) => {
                onClear?.(e);
                inputRef.current?.focus();
              }}
            >
              <h2 id={headingId}>Selected ({selectedArray.length})</h2>
            </IressSelectHeading>
          }
          items={selectedArray}
          multiSelect={multiSelect}
          onChange={onChange}
          selected={value}
        />
      )}
      {hasResultsAndSelected && <IressMenuDivider />}
      {hasResults && (
        <SelectAsyncResults
          minSearchLength={minSearchLength}
          multiSelect={multiSelect}
          onChange={onChange}
          query={query}
          results={results}
          value={value}
          shouldShowInstructions={shouldShowInstructions}
          shouldShowNoResults={shouldShowNoResults}
        />
      )}
      <SelectAsyncError error={error} />
    </IressSelectSearch>
  );
};

export const SelectOptions = <TMultiple extends boolean = false>({
  autoHighlight,
  debouncedQuery,
  error,
  initialOptions: initialOptionsProp,
  loading,
  minSearchLength,
  multiSelect,
  onChange,
  options,
  query,
  renderOptions,
  results,
  setQuery,
  setShow,
  setValue,
  show,
  shouldShowInstructions,
  shouldShowNoResults,
  value,
}: SelectOptionsProps<TMultiple>) => {
  const isAsync = typeof options === 'function';
  const initialOptions = initialOptionsProp ?? (isAsync ? [] : options);
  const menuItems = results.length ? results : initialOptions;

  /**
   * When the menu is changed, set the value from the active value in the popover if it exists and close the popover.
   * We do not use the value in the menu, as it conflicts with the active popover value and may un-toggle it, which we do not want.
   */
  const handleMenuChange = useCallback<
    Exclude<IressSelectMenuProps<TMultiple>['onChange'], undefined>
  >(
    (item) => {
      setValue(item);
      onChange?.(getValueAsEvent(item), item);

      if (!multiSelect) {
        setShow(false);
      }
    },
    [setShow, setValue, onChange, multiSelect],
  );

  const handleClear = useCallback<
    Exclude<
      IressButtonProps['onClick'] & IressButtonProps['onKeyDown'],
      undefined
    >
  >(
    (e) => {
      e.stopPropagation();
      const newValue = [] as LabelValueMeta[] as ControlledValue<
        LabelValueMeta,
        TMultiple
      >;
      setValue(newValue);
      onChange?.(getValueAsEvent([]), newValue);
    },
    [setValue, onChange],
  );

  if (renderOptions) {
    return renderOptions({
      close: () => setShow(false),
      debouncedQuery,
      error,
      handleClear,
      handleMenuChange,
      loading,
      query,
      results: menuItems,
      setValue,
      setQuery,
      show,
      value,
    });
  }

  if (isAsync) {
    return (
      <SelectAsyncOptions
        autoHighlight={autoHighlight}
        error={error}
        loading={loading}
        minSearchLength={minSearchLength}
        multiSelect={multiSelect}
        onChange={handleMenuChange}
        onClear={handleClear}
        query={query}
        results={results}
        setQuery={setQuery}
        show={show}
        value={value}
        shouldShowInstructions={shouldShowInstructions}
        shouldShowNoResults={shouldShowNoResults}
      />
    );
  }

  return (
    <IressSelectMenu
      items={menuItems}
      multiSelect={multiSelect}
      onChange={handleMenuChange}
      selected={value}
    />
  );
};
