import {
  type FormattedLabelValueMeta,
  type InputRef,
  IressMenuDivider,
  IressRichSelect,
  type IressRichSelectProps,
  IressSelectBody,
  IressSelectCreate,
  IressSelectHeading,
  IressSelectMenu,
  IressSelectSearch,
  IressSelectSearchInput,
} from '@/main';
import { toArray } from '@helpers/formatting/toArray';
import { useId, useRef } from 'react';

const FREQUENTLY_SELECTED = [
  { label: 'Frequently selected 1', value: 'freq-1' },
  { label: 'Frequently selected 2', value: 'freq-2' },
];

const OPTIONS = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
  { label: 'Option 5', value: 'option-5' },
];

const WithNewOption: IressRichSelectProps<true>['renderOptions'] = ({
  loading,
  debouncedQuery,
  query,
  results,
  setQuery,
  setValue,
  value,
}) => {
  const selectedArray = toArray(value);
  const simpleSelected = selectedArray.map(
    (selectedItem: FormattedLabelValueMeta) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We only need the unformatted object keys when displaying the selected value
      const { formattedLabel, ...unformatted } = selectedItem;
      return unformatted;
    },
  );
  const hasResults =
    (!!results.length && results !== OPTIONS) || (debouncedQuery && !loading);
  const hasSelected = !!selectedArray.length;
  const hasResultsAndSelected = hasResults && hasSelected;
  const showFrequentlySelected =
    !hasResults &&
    !FREQUENTLY_SELECTED.every((frequent) =>
      selectedArray.some((selected) => selected.value === frequent.value),
    );
  const canCreate =
    debouncedQuery &&
    !results.some((result) => result.label === debouncedQuery) &&
    !selectedArray.some((selected) => selected.label === debouncedQuery);
  const hasFrequentlyAndOther =
    showFrequentlySelected && (hasResults || hasSelected);
  const headingId = useId();
  const inputRef = useRef<InputRef | null>(null);

  return (
    <IressSelectSearch
      activator={
        <IressSelectSearchInput
          onChange={(e) => setQuery(e.currentTarget.value)}
          value={query}
          loading={loading}
          placeholder="Search for items"
          ref={inputRef}
        />
      }
    >
      <IressSelectBody
        header={
          canCreate && (
            <IressSelectCreate
              heading="Add custom option"
              label={debouncedQuery}
              loading={loading}
              onCreate={() => {
                setValue([...selectedArray, { label: query, value: query }]);
                setQuery('');
                close();
              }}
            />
          )
        }
      >
        {hasSelected && (
          <IressSelectMenu
            aria-labelledby={headingId}
            heading={
              <IressSelectHeading
                clearAll
                onClearAll={() => {
                  setValue([]);
                  inputRef.current?.focus();
                }}
              >
                <h2 id={headingId}>Selected ({selectedArray.length})</h2>
              </IressSelectHeading>
            }
            items={simpleSelected}
            multiSelect
            onChange={setValue}
            selected={value}
          />
        )}
        {hasResultsAndSelected && <IressMenuDivider my="xs" />}
        {hasResults && (
          <IressSelectMenu
            heading="Search results"
            items={results}
            multiSelect
            noResults={debouncedQuery ? 'No results found' : undefined}
            onChange={setValue}
            selected={value}
            hideSelectedItems
          />
        )}
        {hasFrequentlyAndOther && <IressMenuDivider my="xs" />}
        {showFrequentlySelected && (
          <IressSelectMenu
            heading="Frequently selected"
            items={FREQUENTLY_SELECTED}
            multiSelect
            onChange={setValue}
            selected={value}
            hideSelectedItems
          />
        )}
      </IressSelectBody>
    </IressSelectSearch>
  );
};

export const SelectNewOption = () => (
  <IressRichSelect
    container={document.body}
    multiSelect
    options={OPTIONS}
    placeholder="Select an item"
    renderOptions={WithNewOption}
    virtualFocus={false}
  />
);
