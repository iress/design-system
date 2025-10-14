import { renderHook } from '@testing-library/react';
import { useComboboxFlags } from './useComboboxFlags';

describe('useComboboxFlags', () => {
  it('shows nothing by default', () => {
    const hook = renderHook(() =>
      useComboboxFlags({
        debouncedQuery: '',
        results: [],
        loading: false,
        shouldShowInstructions: false,
        shouldShowDebounceWaiting: false,
        shouldShowNoResults: false,
        displayResults: [],
      }),
    );

    expect(hook.result.current.showResults).toBeFalsy();
    expect(hook.result.current.showNoResults).toBeFalsy();
  });

  it('shows results if there is at least 1 result', () => {
    const hook = renderHook(() =>
      useComboboxFlags({
        debouncedQuery: '',
        results: [{ label: 'Hello' }],
        loading: false,
        shouldShowInstructions: false,
        shouldShowDebounceWaiting: false,
        shouldShowNoResults: false,
        displayResults: [{ label: 'Hello' }],
      }),
    );

    expect(hook.result.current.showResults).toBeTruthy();
    expect(hook.result.current.showNoResults).toBeFalsy();
  });

  it('shows no results if there are no results', () => {
    const hook = renderHook(() =>
      useComboboxFlags({
        debouncedQuery: 'Test',
        results: [],
        loading: false,
        shouldShowInstructions: false,
        shouldShowDebounceWaiting: false,
        shouldShowNoResults: true,
        displayResults: [],
      }),
    );

    expect(hook.result.current.showResults).toBeFalsy();
    expect(hook.result.current.showNoResults).toBeTruthy();
  });

  it('does not show no results if still loading', () => {
    const hook = renderHook(() =>
      useComboboxFlags({
        debouncedQuery: 'Test',
        results: [],
        loading: true,
        shouldShowInstructions: false,
        shouldShowDebounceWaiting: false,
        shouldShowNoResults: false,
        displayResults: [],
      }),
    );

    expect(hook.result.current.showResults).toBeFalsy();
    expect(hook.result.current.showNoResults).toBeFalsy();
  });
});
