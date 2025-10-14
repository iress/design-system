import { act, renderHook } from '@testing-library/react';
import { useEstimatedProgressValue } from './useEstimatedProgressValue';

interface HookProps {
  isLoaded: boolean;
}

describe('useEstimatedProgressValue', () => {
  it('updates the progress based on the estimatedFinishTime', async () => {
    vi.useFakeTimers();

    const hook = renderHook(
      (props: HookProps) => useEstimatedProgressValue(2000, props.isLoaded),
      { initialProps: { isLoaded: false } },
    );

    expect(hook.result.current).toBe(0);

    // After 500ms, the progress should be updated
    await act(() => vi.advanceTimersByTime(500));
    expect(hook.result.current).not.toBe(0);

    hook.rerender({
      isLoaded: true,
    });

    // Once loaded, the progress should be set to the estimated finish time
    expect(hook.result.current).toBe(2000);

    vi.useRealTimers();
  });

  it('uses the real progress if provided', () => {
    vi.useFakeTimers();

    const hook = renderHook(
      (props: HookProps) =>
        useEstimatedProgressValue(2000, props.isLoaded, 500),
      { initialProps: { isLoaded: false } },
    );

    expect(hook.result.current).toBe(500);

    hook.rerender({
      isLoaded: true,
    });

    // Once loaded, the progress should be set to the estimated finish time
    expect(hook.result.current).toBe(2000);

    vi.useRealTimers();
  });
});
