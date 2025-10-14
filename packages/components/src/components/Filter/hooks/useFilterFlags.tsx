import { useMemo } from 'react';
import { IressFilterProps } from '../Filter';
import { AutocompleteSearchHookReturn } from '@/components/Autocomplete';

export const useFilterFlags = ({
  debouncedQuery,
  loading,
  results,
  searchable,
  visibleResetButton,
}: Omit<AutocompleteSearchHookReturn, 'clearError' | 'error' | 'stopSearch'> &
  Pick<IressFilterProps, 'searchable' | 'visibleResetButton'>) => {
  const showHeader = useMemo(
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    () => searchable || visibleResetButton,
    [searchable, visibleResetButton],
  );

  const showResults = useMemo(() => !!results.length, [results]);

  const showNoResults = useMemo(
    () => results.length === 0 && !loading && debouncedQuery,
    [debouncedQuery, loading, results.length],
  );

  return {
    showHeader,
    showNoResults,
    showResults,
  };
};
