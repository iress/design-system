import {
  type AutocompleteSearchHookReturn,
  type ComboboxInlineCompletionHookProps,
  type ComboboxInlineCompletionHookReturn,
} from '@/main';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { getQueryRangeExclusive } from '@helpers/label-value/getQueryRangeExclusive';
import { useCallback, useEffect, useRef } from 'react';

export const useComboboxInlineCompletion = ({
  autoSelect = true,
  debouncedQuery,
  debounceThreshold = 500,
  onChange,
  queryRef,
  results,
  setTypedQuery,
  setValue,
}: ComboboxInlineCompletionHookProps): ComboboxInlineCompletionHookReturn => {
  const lastKeyPressed = useRef<string | undefined>();
  const lastQuery = useRef<string>('');
  const lastResults = useRef<ComboboxInlineCompletionHookProps['results']>([]);

  /**
   * When the popover is navigated internally, we set the value from the active value in the popover if it exists.
   * It is done here so we can add the selection range after the popover has navigated.
   * If it does exist, it will change the selection in the query input.
   */
  const highlightQueryByActiveIndex = useCallback(
    (activeIndex: number | null) => {
      const found = getQueryRangeExclusiveByActiveIndex(
        debouncedQuery,
        activeIndex,
        results,
        autoSelect,
      );

      if (!found || lastKeyPressed.current === 'Backspace') {
        return;
      }

      setValue(found.result);
      onChange?.(getValueAsEvent(found.result), found.result);
      setTypedQuery(found.result.label);
      setTimeout(
        () => queryRef.current?.input?.setSelectionRange(...found.queryIndex),
        Math.max(debounceThreshold * 0.2, 10),
      );
    },
    [
      debouncedQuery,
      results,
      autoSelect,
      setTypedQuery,
      setValue,
      onChange,
      debounceThreshold,
      queryRef,
    ],
  );

  /**
   * Reset active value, so new value will not be adopted by the query input.
   */
  const setKeyPressed = useCallback((e: KeyboardEvent | undefined) => {
    lastKeyPressed.current = e?.key;
  }, []);

  /**
   * Once results have been updated, use the active index to update the query input.
   */
  useEffect(() => {
    if (
      lastQuery.current === debouncedQuery &&
      lastResults.current === results
    ) {
      return;
    }

    lastQuery.current = debouncedQuery;
    lastResults.current = results;

    if (debouncedQuery) {
      highlightQueryByActiveIndex(0);
    }
  }, [debouncedQuery, highlightQueryByActiveIndex, results]);

  return {
    highlightQueryByActiveIndex,
    setKeyPressed,
  };
};

/**
 * This searches for the non-overlapping range of the query in the result by active index.
 *
 * @param debouncedQuery the query string that does not overlap with the result's label
 * @param activeIndex current active index that the user is highlighting
 * @param results the results to check against
 * @param autoSelect whether auto select has been enabled
 * @param show whether the popover is currently showing
 * @returns the non-overlapping range of the query in the result, and the result itself, if found
 */
const getQueryRangeExclusiveByActiveIndex = (
  debouncedQuery: string,
  activeIndex?: number | null,
  results: AutocompleteSearchHookReturn['results'] = [],
  autoSelect?: boolean,
) => {
  if (typeof activeIndex !== 'number' || !autoSelect || !results[activeIndex])
    return undefined;
  const queryIndex = getQueryRangeExclusive(
    debouncedQuery,
    results[activeIndex].label,
  );
  return queryIndex
    ? {
        queryIndex,
        result: results[activeIndex],
      }
    : undefined;
};
