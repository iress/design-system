import { act, renderHook } from '@testing-library/react';
import { useShowIndicator } from './useShowIndicator';

interface HookProps {
  isLoaded: boolean;
}

describe('useShowIndicator', () => {
  it('delays the indicator being set to true, and then delays it being set to false once loaded', async () => {
    vi.useFakeTimers();

    const hook = renderHook(
      (props: HookProps) => useShowIndicator(props.isLoaded),
      { initialProps: { isLoaded: false } },
    );

    expect(hook.result.current).toBe(false);

    // After 500ms, the loading indicator should be shown
    await act(() => vi.advanceTimersByTime(500));
    expect(hook.result.current).toBe(true);

    hook.rerender({
      isLoaded: true,
    });

    expect(hook.result.current).toBe(true);

    // After 200ms, the loading indicator should be hidden
    await act(() => vi.advanceTimersByTime(200));
    expect(hook.result.current).toBe(false);

    vi.useRealTimers();
  });
});
