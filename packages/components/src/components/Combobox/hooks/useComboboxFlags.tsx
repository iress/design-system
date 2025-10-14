import { type AutocompleteSearchHookReturn } from '@/main';
import { useMemo } from 'react';

export const useComboboxFlags = ({
  debouncedQuery,
  loading,
  results,
}: Omit<
  AutocompleteSearchHookReturn,
  'clearError' | 'error' | 'stopSearch'
>) => {
  const showResults = useMemo(() => {
    return !!results.length;
  }, [results]);

  const showNoResults = useMemo(() => {
    return Boolean(results.length === 0 && !loading && debouncedQuery);
  }, [debouncedQuery, loading, results.length]);

  return {
    showResults,
    showNoResults,
  };
};
