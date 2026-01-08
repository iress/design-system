import { act, renderHook } from '@testing-library/react';
import { useShouldRenderLoading } from './useShouldRenderLoading';

interface HookProps {
  isLoaded: boolean;
}

describe('useShouldRenderLoading', () => {
  it('does not return true if the isLoaded prop is true before the startFrom timeout', async () => {
    vi.useFakeTimers();

    const hook = renderHook(
      (props: HookProps) => useShouldRenderLoading(props.isLoaded),
      { initialProps: { isLoaded: false } },
    );

    expect(hook.result.current).toBe(true);

    // Set the isLoaded prop to true after 200ms
    await act(() => vi.advanceTimersByTime(200));
    hook.rerender({
      isLoaded: true,
    });

    // Should be false straight away as its less than the startFrom timeout of 500ms
    expect(hook.result.current).toBe(false);

    vi.useRealTimers();
  });

  it('delays returning false if the isLoaded prop is true after the startFrom timeout', async () => {
    vi.useFakeTimers();

    const hook = renderHook(
      (props: HookProps) => useShouldRenderLoading(props.isLoaded),
      { initialProps: { isLoaded: false } },
    );

    expect(hook.result.current).toBe(true);

    // Set the isLoaded prop to true after 600ms
    await act(() => vi.advanceTimersByTime(600));
    hook.rerender({
      isLoaded: true,
    });

    // Should not be false straight away as we are over the startFrom timeout of 500ms
    expect(hook.result.current).not.toBe(false);

    // After the delay timeout of 500ms, it should be false
    await act(() => vi.advanceTimersByTime(500));
    expect(hook.result.current).toBe(false);

    vi.useRealTimers();
  });

  it('avoids the delay if isLoaded is true within the time limit from when startFrom started', async () => {
    vi.useFakeTimers();

    const hook = renderHook(
      (props: HookProps) => useShouldRenderLoading(props.isLoaded),
      { initialProps: { isLoaded: false } },
    );

    expect(hook.result.current).toBe(true);

    // Set the isLoaded prop to true after 300ms
    await act(() => vi.advanceTimersByTime(300));
    hook.rerender({
      isLoaded: true,
    });

    // Should be false straight away since we are within the avoidDelayTimeout of 250ms
    await act(() => vi.advanceTimersByTime(1));
    expect(hook.result.current).toBe(false);

    vi.useRealTimers();
  });

  it('does not flicker when startFrom is 0 and content loads immediately', async () => {
    vi.useFakeTimers();

    const hook = renderHook(
      (props: HookProps) => useShouldRenderLoading(props.isLoaded, 500, 0, 250),
      { initialProps: { isLoaded: true } },
    );

    // Should be false immediately when already loaded, no flicker
    expect(hook.result.current).toBe(false);

    // Even after microtask execution
    await act(() => vi.advanceTimersByTime(0));
    expect(hook.result.current).toBe(false);

    vi.useRealTimers();
  });

  it('shows loading immediately when startFrom is 0 and content is not loaded', async () => {
    vi.useFakeTimers();

    const hook = renderHook(
      (props: HookProps) => useShouldRenderLoading(props.isLoaded, 500, 0, 250),
      { initialProps: { isLoaded: false } },
    );

    // Should be true initially (waiting to load)
    expect(hook.result.current).toBe(true);

    // After microtask, should still be true showing loading
    await act(() => vi.advanceTimersByTime(0));
    expect(hook.result.current).toBe(true);

    // When content loads
    hook.rerender({ isLoaded: true });
    await act(() => vi.advanceTimersByTime(1));
    expect(hook.result.current).toBe(false);

    vi.useRealTimers();
  });
});
