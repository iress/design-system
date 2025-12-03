import {
  type FormattedLabelValueMeta,
  IressMenuDivider,
  IressRichSelect,
  type IressRichSelectProps,
  IressSelectMenu,
  IressSelectSearch,
  IressSelectSearchInput,
  type LabelValueMeta,
} from '@/main';

const CustomOptions: IressRichSelectProps['renderOptions'] = ({
  loading,
  query,
  results,
  setQuery,
  setValue,
  value,
}) => {
  const valueArray = Array.isArray(value) ? value : [value];
  const selected = value ? (valueArray as LabelValueMeta[]) : [];
  const simpleSelected = selected.map(
    (selectedItem: FormattedLabelValueMeta) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We only need the unformatted object keys when displaying the selected value
      const { formattedLabel, ...unformatted } = selectedItem;
      return unformatted;
    },
  );
  const hasResults = !!results.length || (query && !loading);
  const hasSelected = !!selected.length;
  const hasResultsAndSelected = hasResults && hasSelected;

  return (
    <IressSelectSearch
      activator={
        <IressSelectSearchInput
          onChange={(e) => setQuery(e.currentTarget.value)}
          value={query}
          loading={loading}
          placeholder="Search and select"
        />
      }
      style={{
        maxHeight: '210px',
      }}
    >
      {hasSelected && (
        <IressSelectMenu
          heading={`Selected (${selected.length})`}
          items={simpleSelected}
          multiSelect
          onChange={setValue}
          selected={value}
        />
      )}
      {hasResultsAndSelected && <IressMenuDivider gutter="xs" />}
      {hasResults && (
        <IressSelectMenu
          heading={query ? 'Search results' : 'All options'}
          items={results}
          multiSelect
          noResults={query ? 'No results found' : undefined}
          onChange={setValue}
          selected={value}
          hideSelectedItems
        />
      )}
    </IressSelectSearch>
  );
};

export const SelectCustomOptions = () => (
  <IressRichSelect
    container={document.body}
    multiSelect
    options={[
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Option 4', value: 'option-4' },
      { label: 'Option 5', value: 'option-5' },
    ]}
    renderOptions={CustomOptions}
    virtualFocus={false}
  />
);
