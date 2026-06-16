import { useMemo } from 'react';
import type { AutocompleteSearchHookReturn } from '@/components/Autocomplete';
import type { IressDropdownMenuProps } from '../DropdownMenu';

export const useDropdownMenuFlags = ({
  debouncedQuery,
  loading,
  results,
  searchable,
  visibleResetButton,
}: Omit<
  AutocompleteSearchHookReturn,
  'clearError' | 'error' | 'startSearch' | 'stopSearch'
> &
  Pick<IressDropdownMenuProps, 'searchable' | 'visibleResetButton'>) => {
  const showHeader = useMemo(
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    () => searchable || visibleResetButton,
    [searchable, visibleResetButton],
  );

  const showResults = useMemo(() => !!results.length, [results]);

  const showLoading = useMemo(
    () => loading && !results.length,
    [loading, results.length],
  );

  const showNoResults = useMemo(
    () => results.length === 0 && !loading && debouncedQuery,
    [debouncedQuery, loading, results.length],
  );

  return {
    showHeader,
    showLoading,
    showNoResults,
    showResults,
  };
};
