import {
  IressInput,
  IressStack,
  IressTable,
  useAutocompleteSearch,
} from '@/main';
import { useMemo, useState } from 'react';

const ALL_ROWS = [...Array(5).keys()].map((number) => ({
  label: `Person ${number + 1}`,
  gender: number % 2 ? 'Female' : 'Male',
}));

export const AutocompleteSearchTable = () => {
  const [query, setQuery] = useState('');

  const { debouncedQuery, loading, results } = useAutocompleteSearch({
    initialOptions: ALL_ROWS,
    options: ALL_ROWS,
    query,
  });

  const caption = useMemo(() => {
    if (debouncedQuery && !loading) {
      return `Results matching ${debouncedQuery}`;
    }

    return loading ? 'Searching...' : '';
  }, [debouncedQuery, loading]);

  const columns = useMemo(() => {
    const labelKey = debouncedQuery ? 'formattedLabel' : 'label';
    return [
      { key: labelKey, label: 'Name' },
      { key: 'gender', label: 'Gender' },
    ];
  }, [debouncedQuery]);

  return (
    <IressStack gap="md">
      <IressInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name"
      />
      <IressTable
        caption={caption}
        columns={columns}
        rows={loading ? [] : results}
        empty={loading ? 'Loading...' : 'No results found'}
        scope="col"
      />
    </IressStack>
  );
};
