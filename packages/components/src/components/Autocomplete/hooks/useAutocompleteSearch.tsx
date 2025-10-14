import { useDebounce } from 'use-debounce';
import { useEffect, useRef, useState, useCallback } from 'react';
import { searchLabelValues } from '@helpers/label-value/searchLabelValues';
import { highlightQueryInLabelValue } from '@helpers/label-value/highlightQueryInLabelValue';
import { FormattedLabelValueMeta, LabelValueMeta } from '@/interfaces';

export interface AutocompleteSearchHookProps {
  /**
   * Time in milliseconds to wait for before performing result search. Only applies to searchable options (function).
   * @default 500
   */
  debounceThreshold?: number;

  /**
   * Initial options data set, shown when the input is empty.
   */
  initialOptions?: LabelValueMeta[];

  /**
   * Minimum number of characters required before triggering async search. Only applies to searchable options (function).
   * Below this threshold, no search will be triggered and no loading state will be shown.
   * @default 1
   */
  minSearchLength?: number;

  /**
   * Options data set, shown when the input is not empty.
   */
  options?: LabelValueMeta[] | ((query: string) => Promise<LabelValueMeta[]>);

  /**
   * The query value to filter items by and create search results.
   */
  query?: string;
}

export interface AutocompleteSearchHookReturn {
  /**
   * Clear the error state.
   */
  clearError: () => void;

  /**
   * The debounced query value.
   */
  debouncedQuery: string;

  /**
   * Whether an error occurred during the search.
   * If a string, it is the error reason provided in the promise rejection.
   */
  error: boolean | string;

  /**
   * Whether the search is loading.
   */
  loading: boolean;

  /**
   * The results of the search.
   */
  results: FormattedLabelValueMeta[];

  /**
   * Whether to show "Type at least X characters to search" instruction.
   * True when the query length is below the minimum search length.
   */
  shouldShowInstructions: boolean;

  /**
   * Whether to show nothing (clean, minimal) during debounce waiting period.
   * True when user has typed enough characters but search hasn't started yet.
   */
  shouldShowDebounceWaiting: boolean;

  /**
   * Whether to show "No results found" message.
   * True only after a legitimate search has been performed and returned empty results.
   */
  shouldShowNoResults: boolean;

  /**
   * Stop the search.
   */
  stopSearch: () => void;
}

const DEFAULT_DEBOUNCE_THRESHOLD = 500;
const DEFAULT_MIN_SEARCH_LENGTH = 1;

const translateReasonToError = (reason?: string | Error) => {
  if (reason instanceof Error && reason.message) {
    return reason.message;
  }

  return typeof reason === 'string' ? reason : true;
};

const useSearchState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const [results, setResults] = useState<FormattedLabelValueMeta[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const reset = useCallback(() => {
    setResults([]);
    setLoading(false);
    setError(false);
    setHasSearched(false);
  }, []);

  const updateWithResults = useCallback(
    (searchResults: LabelValueMeta[], query: string) => {
      setResults(
        searchResults.map((result) =>
          highlightQueryInLabelValue(result, query),
        ),
      );
      setError(false);
      setLoading(false);
    },
    [],
  );

  const updateWithError = useCallback((errorValue: string | boolean) => {
    setResults([]);
    setError(errorValue);
    setLoading(false);
  }, []);

  const clearError = useCallback(() => {
    setError(false);
  }, []);

  const setLoadingState = useCallback((isLoading: boolean) => {
    setLoading(isLoading);
  }, []);

  const setSearched = useCallback((searched: boolean) => {
    setHasSearched(searched);
  }, []);

  const clearErrorState = useCallback(() => {
    setError(false);
  }, []);

  return {
    loading,
    error,
    results,
    hasSearched,
    reset,
    updateWithResults,
    updateWithError,
    clearError,
    setLoadingState,
    setSearched,
    clearErrorState,
  };
};

const useSearchOperations = (
  searchState: ReturnType<typeof useSearchState>,
  requestIdCounter: React.MutableRefObject<number>,
) => {
  const lastQueryRun = useRef<string>('');

  const shouldSkipQuery = useCallback((query: string) => {
    return lastQueryRun.current === query;
  }, []);

  const updateQueryTracking = useCallback((query: string) => {
    lastQueryRun.current = query;
  }, []);

  const handleAsync = useCallback(
    async (
      searchFn: (query: string) => Promise<LabelValueMeta[]>,
      query: string,
      minSearchLength: number,
    ) => {
      if (shouldSkipQuery(query)) return;

      const requestId = ++requestIdCounter.current;
      updateQueryTracking(query);

      if (query.length >= minSearchLength) {
        searchState.setLoadingState(true);
        searchState.clearErrorState();

        try {
          const results = await searchFn(query);

          // Only update if this request is still current (race condition protection)
          if (requestId !== requestIdCounter.current) return;

          searchState.setSearched(true);
          searchState.updateWithResults(results, query);
        } catch (reason: unknown) {
          // Only update if this request is still current (race condition protection)
          if (requestId !== requestIdCounter.current) return;

          searchState.setSearched(true);
          searchState.updateWithError(
            translateReasonToError(reason as string | Error | undefined),
          );
        }
      } else {
        searchState.reset();
      }
    },
    [searchState, shouldSkipQuery, updateQueryTracking, requestIdCounter],
  );

  const handleSync = useCallback(
    (
      optionsArray: LabelValueMeta[],
      query: string,
      minSearchLength: number,
    ) => {
      if (shouldSkipQuery(query)) return;
      updateQueryTracking(query);

      if (query.length >= minSearchLength) {
        searchState.setSearched(true);
        const searchResults = searchLabelValues(query, optionsArray);
        searchState.updateWithResults(searchResults, query);
      } else {
        searchState.reset();
      }
    },
    [searchState, shouldSkipQuery, updateQueryTracking],
  );

  return {
    handleAsync,
    handleSync,
  };
};

/**
 * Advanced autocomplete search hook with debouncing and race condition protection
 * Supports both sync array search and async function search
 */
export const useAutocompleteSearch = ({
  debounceThreshold = DEFAULT_DEBOUNCE_THRESHOLD,
  initialOptions = [],
  minSearchLength = DEFAULT_MIN_SEARCH_LENGTH,
  options = [],
  query = '',
}: AutocompleteSearchHookProps): AutocompleteSearchHookReturn => {
  const searchState = useSearchState();
  const requestIdCounter = useRef<number>(0);
  const searchOperations = useSearchOperations(searchState, requestIdCounter);

  const [debouncedQuery] = useDebounce(query, debounceThreshold);

  useEffect(() => {
    if (typeof options === 'function') {
      void searchOperations.handleAsync(
        options,
        debouncedQuery,
        minSearchLength,
      );
      return;
    }

    searchOperations.handleSync(options, debouncedQuery, minSearchLength);
  }, [debouncedQuery, options, minSearchLength, searchOperations]);

  return {
    clearError: searchState.clearError,
    debouncedQuery,
    error: searchState.error,
    loading: searchState.loading,
    shouldShowInstructions: query.length < minSearchLength,
    shouldShowDebounceWaiting:
      query.length >= minSearchLength &&
      debouncedQuery.length < minSearchLength &&
      !searchState.loading &&
      !searchState.hasSearched,
    shouldShowNoResults:
      searchState.hasSearched &&
      !searchState.loading &&
      searchState.results.length === 0 &&
      debouncedQuery.length >= minSearchLength,
    results: debouncedQuery ? searchState.results : initialOptions ?? [],

    stopSearch: searchState.reset,
  };
};
