import { act, render, renderHook, waitFor } from '@testing-library/react';
import {
  useAutocompleteSearch,
  type AutocompleteSearchHookProps,
} from './useAutocompleteSearch';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';
import { LabelValueMeta } from '@/interfaces';

const DEFAULT_PROPS = {
  debounceThreshold: 0,
  options: MOCK_LABEL_VALUE_META,
};

const renderAutocompleteSearchHook = (
  defaultProps: AutocompleteSearchHookProps = DEFAULT_PROPS,
) =>
  renderHook((props: AutocompleteSearchHookProps) =>
    useAutocompleteSearch({
      ...defaultProps,
      ...props,
    }),
  );

// Test helper functions to reduce nesting depth
const createControllablePromise = () => {
  let resolve: (value: LabelValueMeta[]) => void;
  const promise = new Promise<LabelValueMeta[]>((res) => {
    resolve = res;
  });
  return { promise, resolve: resolve! };
};

const createSlowMockSearch = (delay = 100) => {
  const mockFn = vi.fn();
  mockFn.mockImplementation(async (query: string) => {
    await waitDelay(delay);
    return [{ label: `Result for ${query}`, value: query }];
  });
  return mockFn;
};

const waitDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

describe('useAutocompleteSearch', () => {
  it('returns results instantly when debounceThreshold is 0', async () => {
    const hook = renderAutocompleteSearchHook();

    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.results).toHaveLength(0);

    hook.rerender({ ...DEFAULT_PROPS, query: 'o' });

    // With trailing edge debouncing, loading should be false immediately after query change
    expect(hook.result.current.loading).toBe(false);

    await waitFor(
      () => {
        expect(hook.result.current.loading).toBe(false);
        expect(hook.result.current.results).toHaveLength(
          MOCK_LABEL_VALUE_META.length,
        );
      },
      {
        timeout: 100, // Add a little bit of time, since making it exactly 0 does not work
      },
    );
  });

  it('returns initialOptions when there is no query', async () => {
    const initialOptions = MOCK_LABEL_VALUE_META.slice(3);
    const hook = renderAutocompleteSearchHook({
      initialOptions,
    });

    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.results).toHaveLength(initialOptions.length);

    hook.rerender({ ...DEFAULT_PROPS, query: 'o', debounceThreshold: 100 });

    // With trailing edge debouncing, loading should be false immediately after query change
    expect(hook.result.current.loading).toBe(false);

    // Wait for the search to complete and check that we get search results for 'o'
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    // The search for 'o' should return options that contain 'o' in their labels
    // Check that we have some results (the exact number depends on how many MOCK options contain 'o')
    expect(hook.result.current.results.length).toBeGreaterThan(0);
  });

  it('searches options by label', async () => {
    const options = [
      { label: 'Custom 1', value: '1' },
      { label: 'Custom 2', value: '2' },
      { label: 'Custom 3', value: '3' },
    ];

    const hook = renderAutocompleteSearchHook({
      options,
      debounceThreshold: 100, // Increase debounce for more reliable testing
    });

    hook.rerender({
      ...DEFAULT_PROPS,
      options,
      query: 'cus',
      debounceThreshold: 100,
    });

    // With trailing edge debouncing, loading should be false immediately after query change
    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.debouncedQuery).toBe('');

    // Wait for debounced query to update first, then check loading is false
    await waitFor(
      () => expect(hook.result.current.debouncedQuery).toBe('cus'),
      { timeout: 200 },
    );
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    expect(hook.result.current.debouncedQuery).toBe('cus');
    expect(hook.result.current.results).toHaveLength(options.length);

    // The search results are sorted by relevance, so check the first result matches expected pattern
    const label = render(hook.result.current.results[0].formattedLabel);
    expect(label.container.innerHTML).toMatch(/<b>Cus<\/b>tom \d/);

    hook.rerender({
      ...DEFAULT_PROPS,
      options,
      query: 'xyz', // Use a query that definitely won't match any "Custom" labels
      debounceThreshold: 100,
    });

    await waitFor(
      () => expect(hook.result.current.debouncedQuery).toBe('xyz'),
      { timeout: 200 },
    );
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    expect(hook.result.current.debouncedQuery).toBe('xyz');
    expect(hook.result.current.results).toHaveLength(0);
  });

  it('searches asynchronous options by label', async () => {
    const options = [
      { label: 'Custom 1', value: '1' },
      { label: 'Custom 2', value: '2' },
      { label: 'Custom 3', value: '3' },
    ];

    // Create a proper async search function that filters based on query
    const asyncSearchFn = async (query: string) => {
      // Simulate async delay
      await new Promise((resolve) => setTimeout(resolve, 50));
      // Filter options by query (like a real API would)
      return options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      );
    };

    const hook = renderAutocompleteSearchHook({
      options: asyncSearchFn,
      debounceThreshold: 100, // Increase debounce for more reliable testing
    });

    hook.rerender({
      ...DEFAULT_PROPS,
      options: asyncSearchFn,
      query: 'cus',
      debounceThreshold: 100,
    });

    // With trailing edge debouncing, loading should be false immediately after query change
    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.debouncedQuery).toBe('');

    await waitFor(
      () => expect(hook.result.current.debouncedQuery).toBe('cus'),
      { timeout: 200 },
    );
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    expect(hook.result.current.debouncedQuery).toBe('cus');
    expect(hook.result.current.results).toHaveLength(options.length);

    // The search results are sorted by relevance, so check the first result matches expected pattern
    const label = render(hook.result.current.results[0].formattedLabel);
    expect(label.container.innerHTML).toMatch(/<b>Cus<\/b>tom \d/);

    hook.rerender({
      ...DEFAULT_PROPS,
      options: asyncSearchFn,
      query: 'xyz', // Use a query that definitely won't match any "Custom" labels
      debounceThreshold: 100,
    });

    await waitFor(
      () => expect(hook.result.current.debouncedQuery).toBe('xyz'),
      { timeout: 200 },
    );
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    expect(hook.result.current.debouncedQuery).toBe('xyz');
    expect(hook.result.current.results).toHaveLength(0);
  });

  it('does not call search function when the query is empty', async () => {
    const options = vi
      .fn()
      .mockResolvedValue([{ label: 'Custom 1', value: '1' }]);

    const hook = renderAutocompleteSearchHook({
      options,
    });

    hook.rerender({ ...DEFAULT_PROPS, options, query: 'cus' });

    // Wait for the search to complete - with trailing edge debouncing
    await waitFor(() => expect(options).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    // Quickly change the query to empty
    hook.rerender({ ...DEFAULT_PROPS, options, query: '' });

    // Wait for the search to finish
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    // The search function should not have been called again
    expect(options).toHaveBeenCalledTimes(1);
  });

  it('shows an error if the options function returns an error', async () => {
    const options = vi.fn().mockRejectedValue('Error');

    const hook = renderAutocompleteSearchHook({
      options,
    });

    hook.rerender({ ...DEFAULT_PROPS, options, query: 'cus' });

    // Wait for the search to complete - with trailing edge debouncing
    await waitFor(() => expect(options).toHaveBeenCalledTimes(1));

    // Wait for the search to finish
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    expect(hook.result.current.error).toBe('Error');
  });

  describe('race condition and async state management', () => {
    it('clears results when new search starts (trailing edge debouncing)', async () => {
      const mockOptions = vi.fn();

      mockOptions
        .mockResolvedValueOnce([
          { label: 'Apple iPhone', value: 'apple-1' },
          { label: 'Apple MacBook', value: 'apple-2' },
        ])
        .mockResolvedValueOnce([
          { label: 'Samsung Galaxy', value: 'samsung-1' },
          { label: 'Samsung Note', value: 'samsung-2' },
        ]);

      const hook = renderAutocompleteSearchHook({
        options: mockOptions,
        debounceThreshold: 100, // Add debounce to test trailing edge
      });

      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockOptions,
        query: 'apple',
        debounceThreshold: 100,
      });

      // Wait for results to have length 2 (search for "apple" to return)
      await waitFor(() => expect(hook.result.current.results).toHaveLength(2));
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results[0].label).toBe('Apple iPhone');

      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockOptions,
        query: 'samsung',
        debounceThreshold: 100,
      });

      // With trailing edge debouncing, results persist until new search actually starts
      // This prevents visual flashing during fast typing
      expect(hook.result.current.results).toHaveLength(2); // Still showing apple results
      expect(hook.result.current.loading).toBe(false); // Not loading immediately

      // Wait for samsung search to complete and override apple results
      await waitFor(
        () =>
          expect(hook.result.current.results[0]?.label).toBe('Samsung Galaxy'),
        { timeout: 500 },
      );
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toHaveLength(2);
      expect(hook.result.current.results[0].label).toBe('Samsung Galaxy');
    });

    it('prevents stale request updates', async () => {
      const applePromise = createControllablePromise();
      const samsungPromise = createControllablePromise();

      const mockOptions = vi.fn();

      const hook = renderAutocompleteSearchHook({
        options: mockOptions,
        debounceThreshold: 0,
      });

      mockOptions.mockImplementationOnce(() => applePromise.promise);

      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockOptions,
        query: 'apple',
        debounceThreshold: 0,
      });

      await waitFor(() => expect(hook.result.current.loading).toBe(true));

      mockOptions.mockImplementationOnce(() => samsungPromise.promise);

      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockOptions,
        query: 'samsung',
        debounceThreshold: 0,
      });

      await waitFor(() => expect(hook.result.current.loading).toBe(true));
      expect(hook.result.current.results).toHaveLength(0);

      samsungPromise.resolve([{ label: 'Samsung Galaxy', value: 'samsung-1' }]);

      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toHaveLength(1);
      expect(hook.result.current.results[0].label).toBe('Samsung Galaxy');

      applePromise.resolve([{ label: 'Apple iPhone', value: 'apple-1' }]);

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(hook.result.current.loading).toBe(false);
      expect(hook.result.current.results).toHaveLength(1);
      expect(hook.result.current.results[0].label).toBe('Samsung Galaxy');
    });

    it('maintains loading states correctly', async () => {
      const searchPromise = createControllablePromise();
      const mockOptions = vi.fn();

      mockOptions.mockImplementationOnce(() => searchPromise.promise);

      const hook = renderAutocompleteSearchHook({
        options: mockOptions,
        debounceThreshold: 0,
      });

      expect(hook.result.current.loading).toBe(false);
      expect(hook.result.current.results).toHaveLength(0);

      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockOptions,
        query: 'test',
        debounceThreshold: 0,
      });

      await waitFor(() => expect(hook.result.current.loading).toBe(true));
      expect(hook.result.current.results).toHaveLength(0);

      searchPromise.resolve([{ label: 'Test Result', value: 'test-1' }]);

      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toHaveLength(1);
      expect(hook.result.current.results[0].label).toBe('Test Result');
    });
  });

  describe('trailing edge debouncing behavior', () => {
    it('prevents visual flashing during rapid typing by not showing immediate loading states', async () => {
      const mockSearch = createSlowMockSearch(100);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 200, // Longer debounce to simulate real typing
      });

      // Simulate rapid typing: "apple" one character at a time
      const queries = ['a', 'ap', 'app', 'appl', 'apple'];

      for (const query of queries) {
        hook.rerender({
          ...DEFAULT_PROPS,
          options: mockSearch,
          query,
          debounceThreshold: 200,
        });

        // Should NEVER show loading immediately during typing
        expect(hook.result.current.loading).toBe(false);

        // debouncedQuery should not update immediately
        expect(hook.result.current.debouncedQuery).toBe('');

        // Add small delay to simulate typing speed
        await waitDelay(50);
      }

      // Only after debounce period should the search actually trigger
      await waitFor(
        () => expect(hook.result.current.debouncedQuery).toBe('apple'),
        { timeout: 300 },
      );

      // Now loading should appear and API should be called
      await waitFor(() => expect(hook.result.current.loading).toBe(true));
      expect(mockSearch).toHaveBeenCalledTimes(1);
      expect(mockSearch).toHaveBeenCalledWith('apple');

      // Wait for search to complete
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toHaveLength(1);
      expect(hook.result.current.results[0].label).toBe('Result for apple');
    });

    it('cancels previous debounced search when new query is typed before debounce completes', async () => {
      const mockSearch = vi.fn().mockResolvedValue([]);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 300,
      });

      // Start typing "test"
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'test',
        debounceThreshold: 300,
      });

      // Wait partway through debounce period
      await waitDelay(150);

      // Should not have searched yet
      expect(mockSearch).not.toHaveBeenCalled();
      expect(hook.result.current.debouncedQuery).toBe('');

      // Change query before debounce completes (simulating user continuing to type)
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'testing',
        debounceThreshold: 300,
      });

      // Wait for new debounce to complete
      await waitFor(
        () => expect(hook.result.current.debouncedQuery).toBe('testing'),
        { timeout: 400 },
      );

      // Should only have searched for final query
      expect(mockSearch).toHaveBeenCalledTimes(1);
      expect(mockSearch).toHaveBeenCalledWith('testing');
      expect(mockSearch).not.toHaveBeenCalledWith('test');
    });

    it('maintains previous results while new search is pending (no result flashing)', async () => {
      const mockSearch = vi.fn();

      // First search returns apple results
      mockSearch.mockResolvedValueOnce([
        { label: 'Apple iPhone', value: 'apple-1' },
        { label: 'Apple MacBook', value: 'apple-2' },
      ]);

      // Second search returns orange results
      mockSearch.mockResolvedValueOnce([
        { label: 'Orange Fruit', value: 'orange-1' },
      ]);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 100,
      });

      // First search: "apple"
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'apple',
        debounceThreshold: 100,
      });

      await waitFor(() => expect(hook.result.current.results).toHaveLength(2));
      expect(hook.result.current.results[0].label).toBe('Apple iPhone');

      // Second search: "orange" - should keep showing apple results until orange loads
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'orange',
        debounceThreshold: 100,
      });

      // During debounce period: should still show apple results (no flashing)
      expect(hook.result.current.results).toHaveLength(2);
      expect(hook.result.current.results[0].label).toBe('Apple iPhone');
      expect(hook.result.current.loading).toBe(false);

      // Wait for orange search to complete
      await waitFor(
        () =>
          expect(hook.result.current.results[0]?.label).toBe('Orange Fruit'),
        { timeout: 300 },
      );

      expect(hook.result.current.results).toHaveLength(1);
      expect(mockSearch).toHaveBeenCalledTimes(2);
    });
  });

  describe('loading spinner behavior - API fetching scenarios', () => {
    it('shows loading spinner only when API call starts (not during debounce)', async () => {
      const searchPromise = createControllablePromise();
      const mockSearch = vi.fn().mockReturnValue(searchPromise.promise);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 200, // Longer debounce to test behavior
      });

      // Initial state: no loading
      expect(hook.result.current.loading).toBe(false);

      // Start typing - should NOT show loading during debounce period
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'test',
        debounceThreshold: 200,
      });

      // Should still not be loading (debounce hasn't completed)
      expect(hook.result.current.loading).toBe(false);
      expect(mockSearch).not.toHaveBeenCalled();

      // Wait for debounce to complete and API call to start
      await waitFor(() => expect(mockSearch).toHaveBeenCalledWith('test'));

      // NOW it should be loading (API call started)
      await waitFor(() => expect(hook.result.current.loading).toBe(true));

      // Resolve the API call
      searchPromise.resolve([{ label: 'Test Result', value: 'test-1' }]);

      // Loading should stop after API completes
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toHaveLength(1);
    });

    it('never shows loading spinner for synchronous array options', async () => {
      const options = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
      ];

      const hook = renderAutocompleteSearchHook({
        options,
        debounceThreshold: 100,
      });

      // Initial state
      expect(hook.result.current.loading).toBe(false);

      // Search with array options - should NEVER show loading
      hook.rerender({
        ...DEFAULT_PROPS,
        options,
        query: 'app',
        debounceThreshold: 100,
      });

      // Should remain false throughout
      expect(hook.result.current.loading).toBe(false);

      // Wait for debounce and search to complete
      await waitFor(() =>
        expect(hook.result.current.results.length).toBeGreaterThan(0),
      );

      // Should still be false after search completes
      expect(hook.result.current.loading).toBe(false);
    });

    it('shows loading spinner during concurrent API requests correctly', async () => {
      const firstPromise = createControllablePromise();
      const secondPromise = createControllablePromise();
      const mockSearch = vi
        .fn()
        .mockReturnValueOnce(firstPromise.promise)
        .mockReturnValueOnce(secondPromise.promise);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 0,
      });

      // Start first search
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'first',
        debounceThreshold: 0,
      });

      await waitFor(() => expect(hook.result.current.loading).toBe(true));

      // Start second search before first completes
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'second',
        debounceThreshold: 0,
      });

      await waitFor(() => expect(hook.result.current.loading).toBe(true));

      // Resolve second request first (newer request)
      secondPromise.resolve([{ label: 'Second Result', value: 'second-1' }]);

      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results[0].label).toBe('Second Result');

      // Resolve first request (should be ignored due to race condition protection)
      firstPromise.resolve([{ label: 'First Result', value: 'first-1' }]);

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Should still show second result and remain not loading
      expect(hook.result.current.loading).toBe(false);
      expect(hook.result.current.results[0].label).toBe('Second Result');
    });

    it('stops showing loading spinner when API request fails', async () => {
      const mockSearch = vi.fn().mockRejectedValue(new Error('API Error'));

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 0,
      });

      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'test',
        debounceThreshold: 0,
      });

      // Wait for the API call to be made and for error to occur
      await waitFor(() => expect(mockSearch).toHaveBeenCalledWith('test'));

      // Should stop loading and show error after API fails
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.error).toBe('API Error');
      expect(hook.result.current.results).toHaveLength(0);
    });
  });

  describe('loading spinner behavior - minSearchLength scenarios', () => {
    it('never shows loading when query is below minSearchLength threshold', async () => {
      const searchPromise = createControllablePromise();
      const mockSearch = vi.fn().mockReturnValue(searchPromise.promise);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 0,
        minSearchLength: 3,
      });

      // Query below threshold - should NEVER show loading
      act(() => {
        hook.rerender({
          ...DEFAULT_PROPS,
          options: mockSearch,
          query: 'ab', // 2 characters, below threshold of 3
          debounceThreshold: 0,
          minSearchLength: 3,
        });
      });

      // Should never become loading
      expect(hook.result.current.loading).toBe(false);

      // Wait a bit to ensure no loading state appears
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      expect(hook.result.current.loading).toBe(false);
      expect(mockSearch).not.toHaveBeenCalled();

      // Now use query that meets threshold
      act(() => {
        hook.rerender({
          ...DEFAULT_PROPS,
          options: mockSearch,
          query: 'abc', // 3 characters, meets threshold
          debounceThreshold: 0,
          minSearchLength: 3,
        });
      });

      // NOW it should show loading
      await waitFor(() => expect(hook.result.current.loading).toBe(true));
      expect(mockSearch).toHaveBeenCalledWith('abc');

      // Complete the search
      searchPromise.resolve([{ label: 'ABC Result', value: 'abc-1' }]);
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
    });

    it('transitions loading state correctly when crossing minSearchLength threshold', async () => {
      const firstPromise = createControllablePromise();
      const secondPromise = createControllablePromise();
      const mockSearch = vi
        .fn()
        .mockReturnValueOnce(firstPromise.promise)
        .mockReturnValueOnce(secondPromise.promise);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 0,
        minSearchLength: 2,
      });

      // Start with query that meets threshold
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'ab', // 2 characters, meets threshold
        debounceThreshold: 0,
        minSearchLength: 2,
      });

      await waitFor(() => expect(hook.result.current.loading).toBe(true));

      // Complete first search
      firstPromise.resolve([{ label: 'AB Result', value: 'ab-1' }]);
      await waitFor(() => expect(hook.result.current.loading).toBe(false));

      // Change to query below threshold
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'a', // 1 character, below threshold
        debounceThreshold: 0,
        minSearchLength: 2,
      });

      // Should immediately be not loading and clear results
      expect(hook.result.current.loading).toBe(false);
      await waitFor(() => expect(hook.result.current.results).toHaveLength(0));

      // Should not have called search again
      expect(mockSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('loading spinner behavior - debounce edge cases', () => {
    it('does not show loading during rapid query changes (trailing edge)', async () => {
      const mockSearch = vi
        .fn()
        .mockResolvedValue([{ label: 'Result', value: '1' }]);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 300, // Long debounce
      });

      const queries = ['a', 'ap', 'app', 'appl', 'apple'];

      // Rapidly change queries
      for (const query of queries) {
        hook.rerender({
          ...DEFAULT_PROPS,
          options: mockSearch,
          query,
          debounceThreshold: 300,
        });

        // Should NEVER show loading during rapid typing
        expect(hook.result.current.loading).toBe(false);

        // Small delay to simulate typing
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      // Wait for debounce to complete and API to be called
      await waitFor(() => expect(mockSearch).toHaveBeenCalledWith('apple'), {
        timeout: 500,
      });

      // API should only be called once with final query
      expect(mockSearch).toHaveBeenCalledTimes(1);
      expect(mockSearch).toHaveBeenCalledWith('apple');

      // Wait for completion
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toHaveLength(1);
    });
  });

  describe('minSearchLength', () => {
    it('does not trigger async search when query is below minimum length', async () => {
      const mockSearch = vi
        .fn()
        .mockResolvedValue([{ label: 'Test Result', value: 'test-1' }]);

      const hook = renderAutocompleteSearchHook({
        debounceThreshold: 0,
        minSearchLength: 3,
        options: mockSearch,
      });

      // Query with 1 character (below threshold)
      hook.rerender({
        debounceThreshold: 0,
        minSearchLength: 3,
        options: mockSearch,
        query: 'a',
      });

      await waitFor(() => {
        expect(hook.result.current.loading).toBe(false);
        expect(mockSearch).not.toHaveBeenCalled();
        expect(hook.result.current.results).toHaveLength(0);
      });

      // Query with 2 characters (still below threshold)
      hook.rerender({
        debounceThreshold: 0,
        minSearchLength: 3,
        options: mockSearch,
        query: 'ab',
      });

      await waitFor(() => {
        expect(hook.result.current.loading).toBe(false);
        expect(mockSearch).not.toHaveBeenCalled();
        expect(hook.result.current.results).toHaveLength(0);
      });

      // Query with 3 characters (meets threshold)
      hook.rerender({
        debounceThreshold: 0,
        minSearchLength: 3,
        options: mockSearch,
        query: 'abc',
      });

      await waitFor(() => {
        expect(hook.result.current.loading).toBe(false);
        expect(mockSearch).toHaveBeenCalledWith('abc');
        expect(hook.result.current.results).toHaveLength(1);
      });
    });

    it('does not show loading state when query is below threshold', async () => {
      const mockSearch = vi.fn().mockResolvedValue([]);

      const hook = renderAutocompleteSearchHook({
        debounceThreshold: 0,
        minSearchLength: 2,
        options: mockSearch,
      });

      // Start with empty query
      expect(hook.result.current.loading).toBe(false);

      // Query with 1 character (below threshold) - should NOT show loading at all
      hook.rerender({
        debounceThreshold: 0,
        minSearchLength: 2,
        options: mockSearch,
        query: 'a',
      });

      // Should NOT become loading (below threshold)
      expect(hook.result.current.loading).toBe(false);

      // Should not call search
      await waitFor(() => {
        expect(hook.result.current.loading).toBe(false);
        expect(mockSearch).not.toHaveBeenCalled();
      });
    });

    it('defaults to minSearchLength of 1', async () => {
      const mockSearch = vi
        .fn()
        .mockResolvedValue([{ label: 'Test Result', value: 'test-1' }]);

      const hook = renderAutocompleteSearchHook({
        debounceThreshold: 0,
        options: mockSearch,
      });

      // Query with 1 character (should trigger with default minSearchLength of 1)
      hook.rerender({
        debounceThreshold: 0,
        options: mockSearch,
        query: 'a',
      });

      await waitFor(() => {
        expect(hook.result.current.loading).toBe(false);
        expect(mockSearch).toHaveBeenCalledWith('a');
        expect(hook.result.current.results).toHaveLength(1);
      });
    });
  });

  describe('User Experience - UI State Messages', () => {
    it('shows "Type at least X characters" when user has not typed enough', async () => {
      const hook = renderAutocompleteSearchHook({
        minSearchLength: 2,
      });

      // User opens autocomplete - should show instructions
      expect(hook.result.current.shouldShowInstructions).toBe(true);
      expect(hook.result.current.shouldShowNoResults).toBe(false);

      // User types 1 character (still not enough) - should still show instructions
      hook.rerender({ ...DEFAULT_PROPS, query: 'a', minSearchLength: 2 });
      expect(hook.result.current.shouldShowInstructions).toBe(true);
      expect(hook.result.current.shouldShowNoResults).toBe(false);

      // User types 2 characters (enough to search) - should not show instructions
      hook.rerender({ ...DEFAULT_PROPS, query: 'ab', minSearchLength: 2 });

      // Wait for debounced query to update
      await waitFor(() => {
        expect(hook.result.current.shouldShowInstructions).toBe(false);
      });
    });

    it("shows debounce waiting state when user has typed enough but search hasn't started", async () => {
      const mockSearch = vi
        .fn()
        .mockResolvedValue([{ label: 'Test', value: 'test' }]);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        debounceThreshold: 300, // Long debounce to capture waiting state
        minSearchLength: 2,
      });

      // User types sufficient characters
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'te',
        debounceThreshold: 300,
        minSearchLength: 2,
      });

      // During debounce period: should show debounce waiting state
      expect(hook.result.current.shouldShowDebounceWaiting).toBe(true);
      expect(hook.result.current.shouldShowInstructions).toBe(false);
      expect(hook.result.current.shouldShowNoResults).toBe(false);
      expect(hook.result.current.loading).toBe(false);
      expect(hook.result.current.debouncedQuery).toBe(''); // Not updated yet

      // API should not be called yet during debounce
      expect(mockSearch).not.toHaveBeenCalled();

      // Wait for debounce to complete and search to start
      await waitFor(() =>
        expect(hook.result.current.debouncedQuery).toBe('te'),
      );

      // Once search starts, shouldShowDebounceWaiting should be false
      await waitFor(() =>
        expect(hook.result.current.shouldShowDebounceWaiting).toBe(false),
      );

      // Should transition to loading or results
      await waitFor(() => expect(mockSearch).toHaveBeenCalledWith('te'));
    });

    it('shows "No results found" only after user searches and gets empty results', async () => {
      const hook = renderAutocompleteSearchHook({
        options: [],
        minSearchLength: 1,
      });

      // User opens autocomplete - should not show "no results" message yet
      expect(hook.result.current.shouldShowNoResults).toBe(false);

      // User types search query that returns no results - should show "no results" message
      hook.rerender({ ...DEFAULT_PROPS, query: 'xyz', options: [] });

      await waitFor(() => {
        expect(hook.result.current.shouldShowNoResults).toBe(true);
      });
    });

    it('shows initial options when user has not typed enough characters', () => {
      const initialOptions = [{ label: 'Initial 1', value: 'init1' }];
      const hook = renderAutocompleteSearchHook({
        initialOptions,
        minSearchLength: 2,
      });

      // User opens autocomplete - should see initial options
      expect(hook.result.current.results).toEqual(initialOptions);

      // User types 1 character (not enough to search) - should still see initial options
      hook.rerender({
        ...DEFAULT_PROPS,
        query: 'a',
        minSearchLength: 2,
        initialOptions,
      });
      expect(hook.result.current.results).toEqual(initialOptions);
    });
  });

  describe('Complete User Journey - UI State Transitions', () => {
    it('Initial autocomplete load displays initial options without any messages', () => {
      const initialOptions = [{ label: 'Initial Option', value: 'init' }];
      const hook = renderAutocompleteSearchHook({
        initialOptions,
        minSearchLength: 2,
      });

      // When autocomplete opens with initial options, should NOT show instructions message
      expect(hook.result.current.results).toEqual(initialOptions);
      expect(hook.result.current.shouldShowInstructions).toBe(false); // Fixed: No instructions when initialOptions exist
      expect(hook.result.current.shouldShowNoResults).toBe(false); // No search performed yet
      expect(hook.result.current.loading).toBe(false);
    });

    it('Typing insufficient characters shows "Type at least X characters" message', () => {
      const hook = renderAutocompleteSearchHook({
        minSearchLength: 3,
      });

      // User types 1 character (insufficient)
      hook.rerender({ ...DEFAULT_PROPS, query: 'a', minSearchLength: 3 });

      // Should show "Type at least X characters" message when input is insufficient
      expect(hook.result.current.shouldShowInstructions).toBe(true);
      expect(hook.result.current.shouldShowNoResults).toBe(false);
      expect(hook.result.current.loading).toBe(false);
      expect(hook.result.current.results).toEqual([]);

      // User types 2 characters (still insufficient)
      hook.rerender({ ...DEFAULT_PROPS, query: 'ab', minSearchLength: 3 });

      expect(hook.result.current.shouldShowInstructions).toBe(true);
      expect(hook.result.current.shouldShowNoResults).toBe(false);
    });

    it('Typing sufficient characters triggers search and displays loading then results', async () => {
      const mockResults = [{ label: 'Test Result', value: 'test' }];
      const searchPromise = createControllablePromise();
      const mockSearch = vi.fn().mockReturnValue(searchPromise.promise);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        minSearchLength: 2,
      });

      // User types sufficient characters
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'te',
        minSearchLength: 2,
      });

      // Wait for debounced query to update first
      await waitFor(() =>
        expect(hook.result.current.debouncedQuery).toBe('te'),
      );

      // Should show loading spinner while API call is in progress
      await waitFor(() => expect(hook.result.current.loading).toBe(true));
      expect(hook.result.current.shouldShowInstructions).toBe(false);
      expect(hook.result.current.shouldShowNoResults).toBe(false);

      // Resolve the promise to complete the search
      searchPromise.resolve(mockResults);

      // Should display search results after loading completes
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ label: 'Test Result' }),
        ]),
      );
      expect(hook.result.current.shouldShowNoResults).toBe(false);
    });

    it('Searching with no matching results shows loading then "No results found" message', async () => {
      const searchPromise = createControllablePromise();
      const mockSearch = vi.fn().mockReturnValue(searchPromise.promise);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        minSearchLength: 2,
      });

      // User types query that will return no results
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'xyz',
        minSearchLength: 2,
      });

      // Wait for debounced query to update first
      await waitFor(() =>
        expect(hook.result.current.debouncedQuery).toBe('xyz'),
      );

      // Should show loading spinner while searching for results
      await waitFor(() => expect(hook.result.current.loading).toBe(true));
      expect(hook.result.current.shouldShowInstructions).toBe(false);
      expect(hook.result.current.shouldShowNoResults).toBe(false);

      // Resolve with empty results
      searchPromise.resolve([]);

      // Should show "No results found" message only after search completes with empty results
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.shouldShowNoResults).toBe(true);
      expect(hook.result.current.shouldShowInstructions).toBe(false);
      expect(hook.result.current.results).toEqual([]);
    });

    it('Deleting search text and typing new query transitions smoothly without flashing', async () => {
      const firstResults = [{ label: 'Apple', value: 'apple' }];
      const secondResults = [{ label: 'Banana', value: 'banana' }];

      const firstPromise = createControllablePromise();
      const secondPromise = createControllablePromise();
      const mockSearch = vi
        .fn()
        .mockReturnValueOnce(firstPromise.promise)
        .mockReturnValueOnce(secondPromise.promise);

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        minSearchLength: 2,
      });

      // First search: user types "ap" and gets Apple results
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'ap',
        minSearchLength: 2,
      });

      // Wait for debounced query and loading to start
      await waitFor(() =>
        expect(hook.result.current.debouncedQuery).toBe('ap'),
      );
      await waitFor(() => expect(hook.result.current.loading).toBe(true));

      // Resolve first search
      firstPromise.resolve(firstResults);

      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toEqual(
        expect.arrayContaining([expect.objectContaining({ label: 'Apple' })]),
      );

      // User deletes text to below minimum length - should show instructions, clear results
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'b', // 1 char, below minSearchLength of 2
        minSearchLength: 2,
      });

      // Wait for debounced query to update
      await waitFor(() => expect(hook.result.current.debouncedQuery).toBe('b'));

      expect(hook.result.current.shouldShowInstructions).toBe(true);
      expect(hook.result.current.shouldShowNoResults).toBe(false);
      expect(hook.result.current.loading).toBe(false);
      expect(hook.result.current.results).toEqual([]); // Cleared to show instructions

      // User types new search query "ba" - should transition smoothly to loading then new results
      hook.rerender({
        ...DEFAULT_PROPS,
        options: mockSearch,
        query: 'ba',
        minSearchLength: 2,
      });

      // Wait for debounced query and loading to start
      await waitFor(() =>
        expect(hook.result.current.debouncedQuery).toBe('ba'),
      );
      await waitFor(() => expect(hook.result.current.loading).toBe(true));
      expect(hook.result.current.shouldShowInstructions).toBe(false);

      // Resolve second search
      secondPromise.resolve(secondResults);

      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toEqual(
        expect.arrayContaining([expect.objectContaining({ label: 'Banana' })]),
      );
      expect(hook.result.current.shouldShowNoResults).toBe(false);
    });

    it('Rapid typing and deletion maintains proper UI states without visual flashing', async () => {
      const mockSearch = vi.fn().mockImplementation(async (query: string) => {
        await waitDelay(50); // Simulate API delay
        return [{ label: `Result for ${query}`, value: query }];
      });

      const hook = renderAutocompleteSearchHook({
        options: mockSearch,
        minSearchLength: 2,
        debounceThreshold: 100, // Use debounce to test rapid changes
      });

      // Simulate user rapidly typing "test" one character at a time
      const rapidQueries = ['t', 'te', 'tes', 'test'];

      for (const query of rapidQueries) {
        hook.rerender({
          ...DEFAULT_PROPS,
          options: mockSearch,
          query,
          minSearchLength: 2,
          debounceThreshold: 100,
        });

        // During rapid typing, should never show unexpected loading states
        // Only 'te', 'tes', 'test' meet minSearchLength, but debounce prevents immediate API calls
        expect(hook.result.current.loading).toBe(false);

        await waitDelay(25); // Simulate typing speed
      }

      // After user stops typing, should search for final query only (debounced)
      await waitFor(() => expect(mockSearch).toHaveBeenCalledWith('test'), {
        timeout: 300,
      });

      // Should only call API once with final query (not intermediate queries)
      expect(mockSearch).toHaveBeenCalledTimes(1);
      expect(mockSearch).toHaveBeenCalledWith('test');

      // Should display final results without any visual flashing
      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ label: 'Result for test' }),
        ]),
      );
    });

    it('Using initial options with search functionality works correctly', async () => {
      const initialOptions = [{ label: 'Initial 1', value: 'init1' }];
      const searchResults = [{ label: 'Search Result', value: 'search1' }];
      const searchPromise = createControllablePromise();
      const mockSearch = vi.fn().mockReturnValue(searchPromise.promise);

      const hook = renderAutocompleteSearchHook({
        initialOptions,
        options: mockSearch,
        minSearchLength: 2,
      });

      // Initially displays initial options and does NOT show instructions (bug fix)
      expect(hook.result.current.results).toEqual(initialOptions);
      expect(hook.result.current.shouldShowInstructions).toBe(false);

      // User types insufficient characters - should continue showing initial options
      hook.rerender({
        ...DEFAULT_PROPS,
        initialOptions,
        options: mockSearch,
        query: 'a',
        minSearchLength: 2,
      });

      expect(hook.result.current.results).toEqual(initialOptions);
      expect(hook.result.current.shouldShowInstructions).toBe(false);

      // User types sufficient characters - should search and display search results instead
      hook.rerender({
        ...DEFAULT_PROPS,
        initialOptions,
        options: mockSearch,
        query: 'se',
        minSearchLength: 2,
      });

      // Wait for debounced query and loading to start
      await waitFor(() =>
        expect(hook.result.current.debouncedQuery).toBe('se'),
      );
      await waitFor(() => expect(hook.result.current.loading).toBe(true));

      // Resolve search
      searchPromise.resolve(searchResults);

      await waitFor(() => expect(hook.result.current.loading).toBe(false));
      expect(hook.result.current.results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ label: 'Search Result' }),
        ]),
      );
      expect(hook.result.current.shouldShowInstructions).toBe(false);
      expect(hook.result.current.shouldShowNoResults).toBe(false);
    });
  });

  describe('Bug Fix: shouldShowInstructions with initialOptions', () => {
    it('should NOT show instructions when initialOptions are available', () => {
      const initialOptions = [
        { label: 'Initial 1', value: '1' },
        { label: 'Initial 2', value: '2' },
      ];
      const hook = renderAutocompleteSearchHook({
        initialOptions,
        minSearchLength: 3,
        query: '',
      });

      // With initialOptions present, should NOT show "Type X characters" message
      expect(hook.result.current.shouldShowInstructions).toBe(false);
      expect(hook.result.current.results).toEqual(initialOptions);
    });

    it('should show instructions when no initialOptions and query is insufficient', () => {
      const hook = renderAutocompleteSearchHook({
        minSearchLength: 3,
        query: 'ab',
      });

      // With no initialOptions and insufficient query, SHOULD show instructions
      expect(hook.result.current.shouldShowInstructions).toBe(true);
      expect(hook.result.current.results).toEqual([]);
    });

    it('should NOT show instructions when initialOptions exist even with insufficient query', () => {
      const initialOptions = [{ label: 'Initial', value: '1' }];
      const hook = renderAutocompleteSearchHook({
        initialOptions,
        minSearchLength: 3,
        query: 'a', // Insufficient
      });

      // With initialOptions, should NOT show instructions regardless of query length
      expect(hook.result.current.shouldShowInstructions).toBe(false);
      expect(hook.result.current.results).toEqual([]);
    });
  });

  describe('Regression: initialOptions shown instead of "No results found" for async search', () => {
    it('should show empty results (not initialOptions) when async search returns no results', async () => {
      const initialOptions = [
        { label: 'Frequently selected 1', value: 'freq-1' },
        { label: 'Frequently selected 2', value: 'freq-2' },
      ];

      const mockAsyncOptions = vi
        .fn()
        .mockImplementation(async (query: string) => {
          if (query === 'nothing') {
            return [];
          }
          return [
            { label: 'Option 1', value: 'option-1' },
            { label: 'Option 2', value: 'option-2' },
          ];
        });

      const hook = renderAutocompleteSearchHook({
        initialOptions,
        options: mockAsyncOptions,
        debounceThreshold: 0,
        query: '',
      });

      // Initially should show initialOptions
      expect(hook.result.current.results).toEqual(initialOptions);
      expect(hook.result.current.shouldShowNoResults).toBe(false);

      // Search for something that returns no results
      hook.rerender({
        initialOptions,
        options: mockAsyncOptions,
        debounceThreshold: 0,
        query: 'nothing',
      });

      await waitFor(() => {
        expect(hook.result.current.loading).toBe(false);
      });

      // Should show empty results array (which triggers "No results found" message)
      // NOT initialOptions
      // TODO: Why does this need a waitFor?
      await waitFor(() => {
        expect(hook.result.current.results).toEqual([]);
      });
      expect(hook.result.current.shouldShowNoResults).toBe(true);
      expect(mockAsyncOptions).toHaveBeenCalledWith('nothing');
    });

    it('should show initialOptions only when query is empty', async () => {
      const initialOptions = [
        { label: 'Initial 1', value: '1' },
        { label: 'Initial 2', value: '2' },
      ];

      const mockAsyncOptions = vi
        .fn()
        .mockResolvedValue([{ label: 'Search Result', value: '3' }]);

      const hook = renderAutocompleteSearchHook({
        initialOptions,
        options: mockAsyncOptions,
        debounceThreshold: 0,
        query: '',
      });

      // Query is empty - should show initialOptions
      expect(hook.result.current.results).toEqual(initialOptions);

      // Now search for something
      hook.rerender({
        initialOptions,
        options: mockAsyncOptions,
        debounceThreshold: 0,
        query: 'test',
      });

      await waitFor(() => {
        expect(hook.result.current.loading).toBe(false);
      });

      // Should show search results, not initialOptions
      expect(hook.result.current.results.length).toBeGreaterThan(0);

      // TODO: Why does this need a wait for?
      await waitFor(() =>
        expect(hook.result.current.results).not.toEqual(initialOptions),
      );
    });

    it('should return to initialOptions when query is cleared', async () => {
      const initialOptions = [{ label: 'Initial', value: '1' }];
      const mockAsyncOptions = vi.fn().mockResolvedValue([]);

      const hook = renderAutocompleteSearchHook({
        initialOptions,
        options: mockAsyncOptions,
        debounceThreshold: 0,
        query: 'test',
      });

      await waitFor(() => {
        expect(hook.result.current.loading).toBe(false);
      });

      // Should show empty results
      expect(hook.result.current.results).toEqual([]);

      // Clear the query
      hook.rerender({
        initialOptions,
        options: mockAsyncOptions,
        debounceThreshold: 0,
        query: '',
      });

      // Should return to showing initialOptions
      await waitFor(() =>
        expect(hook.result.current.results).toEqual(initialOptions),
      );
      expect(hook.result.current.shouldShowNoResults).toBe(false);
    });
  });

  describe('startSearch with force parameter', () => {
    describe('synchronous options', () => {
      it('forces search to run even with empty query', async () => {
        const options = [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ];

        const hook = renderAutocompleteSearchHook({
          options,
          query: '', // Empty query
        });

        // Initially should have no results for empty query
        expect(hook.result.current.results).toHaveLength(0);

        // Force search with empty query
        act(() => {
          hook.result.current.startSearch(true);
        });

        await waitFor(() => {
          expect(hook.result.current.results).toHaveLength(options.length);
        });
      });

      it('forces search to run even below minSearchLength', async () => {
        const options = [
          { label: 'Test 1', value: '1' },
          { label: 'Test 2', value: '2' },
        ];

        const hook = renderAutocompleteSearchHook({
          options,
          query: 'te', // Below minSearchLength
          minSearchLength: 3,
        });

        // Should show instructions initially
        expect(hook.result.current.shouldShowInstructions).toBe(true);
        expect(hook.result.current.results).toHaveLength(0);

        // Force search despite being below minSearchLength
        act(() => {
          hook.result.current.startSearch(true);
        });

        await waitFor(() => {
          expect(hook.result.current.results).toHaveLength(options.length);
          expect(hook.result.current.shouldShowInstructions).toBe(false);
        });
      });

      it('bypasses duplicate query check when forced', async () => {
        const options = [
          { label: 'Same Query', value: '1' },
          { label: 'Same Result', value: '2' },
        ];

        const hook = renderAutocompleteSearchHook({
          options,
          query: 'same',
        });

        // Wait for initial search
        await waitFor(() => {
          expect(hook.result.current.results).toHaveLength(options.length);
        });

        const initialResults = hook.result.current.results;

        // Force search again with same query (should bypass shouldSkipQuery check)
        act(() => {
          hook.result.current.startSearch(true);
        });

        await waitFor(() => {
          // Results should be refreshed (new highlighting instances)
          expect(hook.result.current.results).toHaveLength(options.length);
        });

        // Should still have results even though query didn't change
        expect(hook.result.current.results).not.toBe(initialResults);
      });

      it('does not force search when force=false with insufficient query', async () => {
        const options = [{ label: 'Test', value: '1' }];

        const hook = renderAutocompleteSearchHook({
          options,
          query: 'te',
          minSearchLength: 3,
        });

        expect(hook.result.current.results).toHaveLength(0);

        // Call startSearch without force (or force=false)
        act(() => {
          hook.result.current.startSearch(false);
        });

        // Should still have no results
        await waitFor(() => {
          expect(hook.result.current.results).toHaveLength(0);
        });
      });
    });

    describe('asynchronous options', () => {
      it('forces async search to run even with empty query', async () => {
        const mockResults = [
          { label: 'Async 1', value: '1' },
          { label: 'Async 2', value: '2' },
        ];

        const asyncSearchFn = vi.fn().mockResolvedValue(mockResults);

        const hook = renderAutocompleteSearchHook({
          options: asyncSearchFn,
          query: '', // Empty query
        });

        // Initially should have no results and no search call
        expect(hook.result.current.results).toHaveLength(0);
        expect(asyncSearchFn).not.toHaveBeenCalled();

        // Force search with empty query
        act(() => {
          hook.result.current.startSearch(true);
        });

        // Should trigger async search
        await waitFor(() => {
          expect(asyncSearchFn).toHaveBeenCalledWith('');
          expect(hook.result.current.loading).toBe(false);
        });

        expect(hook.result.current.results).toHaveLength(mockResults.length);
      });

      it('forces async search to run even below minSearchLength', async () => {
        const mockResults = [{ label: 'Result', value: '1' }];
        const asyncSearchFn = vi.fn().mockResolvedValue(mockResults);

        const hook = renderAutocompleteSearchHook({
          options: asyncSearchFn,
          query: 'ab', // Below minSearchLength
          minSearchLength: 3,
        });

        // Should show instructions initially
        expect(hook.result.current.shouldShowInstructions).toBe(true);
        expect(asyncSearchFn).not.toHaveBeenCalled();

        // Force search despite being below minSearchLength
        act(() => {
          hook.result.current.startSearch(true);
        });

        await waitFor(() => {
          expect(asyncSearchFn).toHaveBeenCalledWith('ab');
          expect(hook.result.current.loading).toBe(false);
        });

        expect(hook.result.current.results).toHaveLength(mockResults.length);
      });

      it('bypasses duplicate query check for async search when forced', async () => {
        const mockResults = [{ label: 'Same', value: '1' }];
        const asyncSearchFn = vi.fn().mockResolvedValue(mockResults);

        const hook = renderAutocompleteSearchHook({
          options: asyncSearchFn,
          query: 'same',
        });

        // Wait for initial search
        await waitFor(() => {
          expect(asyncSearchFn).toHaveBeenCalledTimes(1);
          expect(hook.result.current.loading).toBe(false);
        });

        // Force search again with same query
        act(() => {
          hook.result.current.startSearch(true);
        });

        await waitFor(() => {
          expect(asyncSearchFn).toHaveBeenCalledTimes(2);
          expect(hook.result.current.loading).toBe(false);
        });

        expect(hook.result.current.results).toHaveLength(mockResults.length);
      });

      it('handles errors correctly when forced async search fails', async () => {
        const errorMessage = 'Forced search failed';
        const asyncSearchFn = vi
          .fn()
          .mockRejectedValue(new Error(errorMessage));

        const hook = renderAutocompleteSearchHook({
          options: asyncSearchFn,
          query: '',
        });

        // Force search with empty query
        act(() => {
          hook.result.current.startSearch(true);
        });

        await waitFor(() => {
          expect(asyncSearchFn).toHaveBeenCalledWith('');
          expect(hook.result.current.loading).toBe(false);
        });

        expect(hook.result.current.error).toBe(errorMessage);
        expect(hook.result.current.results).toHaveLength(0);
      });

      it('respects race condition protection with forced searches', async () => {
        let resolveFirst: (value: LabelValueMeta[]) => void;
        let resolveSecond: (value: LabelValueMeta[]) => void;

        const firstPromise = new Promise<LabelValueMeta[]>((resolve) => {
          resolveFirst = resolve;
        });
        const secondPromise = new Promise<LabelValueMeta[]>((resolve) => {
          resolveSecond = resolve;
        });

        const asyncSearchFn = vi
          .fn()
          .mockReturnValueOnce(firstPromise)
          .mockReturnValueOnce(secondPromise);

        const hook = renderAutocompleteSearchHook({
          options: asyncSearchFn,
          query: 'first',
        });

        // Wait for first search to be triggered
        await waitFor(() => expect(asyncSearchFn).toHaveBeenCalledTimes(1));

        // Force a second search before first completes
        act(() => {
          hook.result.current.startSearch(true);
        });

        await waitFor(() => expect(asyncSearchFn).toHaveBeenCalledTimes(2));

        // Resolve second search first (out of order)
        act(() => {
          resolveSecond!([{ label: 'Second Result', value: '2' }]);
        });

        await waitFor(() => expect(hook.result.current.loading).toBe(false));
        expect(hook.result.current.results[0]?.label).toBe('Second Result');

        // Resolve first search (should be ignored due to race condition protection)
        act(() => {
          resolveFirst!([{ label: 'First Result', value: '1' }]);
        });

        // Results should still be from second search
        await waitFor(() => {
          expect(hook.result.current.results[0]?.label).toBe('Second Result');
        });
      });
    });

    describe('integration with normal search flow', () => {
      it('normal search after forced search works correctly', async () => {
        const options = [
          { label: 'Apple', value: '1' },
          { label: 'Banana', value: '2' },
          { label: 'Cherry', value: '3' },
        ];

        const hook = renderAutocompleteSearchHook({
          options,
          query: '',
        });

        // Force search with empty query
        act(() => {
          hook.result.current.startSearch(true);
        });

        await waitFor(() => {
          expect(hook.result.current.results).toHaveLength(3);
        });

        // Normal search with query
        hook.rerender({
          ...DEFAULT_PROPS,
          options,
          query: 'app',
        });

        await waitFor(() => {
          expect(hook.result.current.results).toHaveLength(1);
          expect(hook.result.current.results[0].label).toBe('Apple');
        });
      });

      it('forced search after normal search works correctly', async () => {
        const options = [
          { label: 'Test 1', value: '1' },
          { label: 'Test 2', value: '2' },
        ];

        const hook = renderAutocompleteSearchHook({
          options,
          query: 'test',
        });

        // Wait for normal search
        await waitFor(() => {
          expect(hook.result.current.results).toHaveLength(2);
        });

        // Clear query
        hook.rerender({
          ...DEFAULT_PROPS,
          options,
          query: '',
        });

        await waitFor(() => {
          expect(hook.result.current.results).toHaveLength(0);
        });

        // Force search with empty query
        act(() => {
          hook.result.current.startSearch(true);
        });

        await waitFor(() => {
          expect(hook.result.current.results).toHaveLength(2);
        });
      });
    });
  });

  describe('stopSearch functionality', () => {
    it('resets search state when stopSearch is called', async () => {
      const options = [
        { label: 'Test 1', value: '1' },
        { label: 'Test 2', value: '2' },
      ];

      const hook = renderAutocompleteSearchHook({
        options,
        query: 'test',
      });

      // Wait for search results
      await waitFor(() => {
        expect(hook.result.current.results).toHaveLength(2);
      });

      // Stop search
      act(() => {
        hook.result.current.stopSearch();
      });

      await waitFor(() => {
        expect(hook.result.current.results).toHaveLength(0);
        expect(hook.result.current.loading).toBe(false);
        expect(hook.result.current.error).toBe(false);
      });
    });

    it('clears error state when stopSearch is called', async () => {
      const asyncSearchFn = vi
        .fn()
        .mockRejectedValue(new Error('Search failed'));

      const hook = renderAutocompleteSearchHook({
        options: asyncSearchFn,
        query: 'test',
      });

      // Wait for error
      await waitFor(() => {
        expect(hook.result.current.error).toBeTruthy();
      });

      // Stop search should clear error
      act(() => {
        hook.result.current.stopSearch();
      });

      await waitFor(() => {
        expect(hook.result.current.error).toBe(false);
        expect(hook.result.current.results).toHaveLength(0);
      });
    });
  });
});
