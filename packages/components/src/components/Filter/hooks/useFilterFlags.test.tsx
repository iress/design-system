import { renderHook } from '@testing-library/react';
import { useFilterFlags } from './useFilterFlags';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';

const DEFAULT_PROPS: Parameters<typeof useFilterFlags>[0] = {
  debouncedQuery: '',
  results: [],
  loading: false,
  shouldShowInstructions: false,
  shouldShowDebounceWaiting: false,
  shouldShowNoResults: false,
  displayResults: [],
};

describe('useFilterFlags', () => {
  it('shows nothing by default', () => {
    const hook = renderHook(() =>
      useFilterFlags({
        ...DEFAULT_PROPS,
      }),
    );

    expect(hook.result.current.showHeader).toBeFalsy();
    expect(hook.result.current.showResults).toBeFalsy();
    expect(hook.result.current.showNoResults).toBeFalsy();
  });

  describe('showHeader', () => {
    it('shows header if searchable', () => {
      const hook = renderHook(() =>
        useFilterFlags({
          ...DEFAULT_PROPS,
          searchable: true,
        }),
      );

      expect(hook.result.current.showHeader).toBeTruthy();
    });

    it('shows header if has visible reset button', () => {
      const hook = renderHook(() =>
        useFilterFlags({
          ...DEFAULT_PROPS,
          visibleResetButton: true,
        }),
      );

      expect(hook.result.current.showHeader).toBeTruthy();
    });
  });

  describe('showResults', () => {
    it('always shows results if more than one', () => {
      const hook = renderHook(() =>
        useFilterFlags({
          ...DEFAULT_PROPS,
          results: MOCK_LABEL_VALUE_META,
        }),
      );

      expect(hook.result.current.showResults).toBeTruthy();
    });
  });

  describe('showNoResults', () => {
    it('shows no results if no results, has searched and no longer loading', () => {
      const hook = renderHook(() =>
        useFilterFlags({
          ...DEFAULT_PROPS,
          loading: false,
          results: [],
          debouncedQuery: 'Searched',
        }),
      );

      expect(hook.result.current.showNoResults).toBeTruthy();
    });
  });
});
