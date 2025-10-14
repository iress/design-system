import { act, renderHook } from '@testing-library/react';
import {
  uncacheSuspenseResource,
  useSuspenseResource,
} from './useSuspenseResource';

interface HookProps {
  isError?: boolean;
}

describe('useSuspenseResource', () => {
  it('handles the asynchronous resource correctly when its pending or fully resolved', async () => {
    vi.useFakeTimers();

    const resource = () =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('Resource Loaded');
        }, 1000);
      });

    // While the resource is pending, it should throw a promise so we can handle it with Suspense
    const hook = renderHook(() => {
      try {
        return useSuspenseResource(resource);
      } catch (suspendedResource) {
        expect(suspendedResource).toBeInstanceOf(Promise);
      }
    });

    // Wait for the promise to resolve
    vi.advanceTimersByTime(1500);

    // eslint-disable-next-line @typescript-eslint/require-await -- Act complains otherwise, and act is async
    await act(async () => hook.rerender());

    expect(hook.result.current).toBe('Resource Loaded');

    vi.useRealTimers();
    uncacheSuspenseResource(resource, 0);
  });

  it('handles the asynchronous resource correctly when its pending or errors', async () => {
    vi.useFakeTimers();

    const error = new Error('Resource Error');
    const resource = () =>
      new Promise<string>((_resolve, reject) => {
        setTimeout(() => {
          reject(error);
        }, 1000);
      });

    // While the resource is pending, it should throw a promise so we can handle it with Suspense
    const hook = renderHook(
      (props: HookProps) => {
        try {
          return useSuspenseResource(resource);
        } catch (suspendedResource) {
          if (props.isError) {
            expect(suspendedResource).toEqual(error);
          } else {
            expect(suspendedResource).toBeInstanceOf(Promise);
          }
        }
      },
      { initialProps: { isError: false } },
    );

    // Wait for the promise to error
    vi.advanceTimersByTime(1500);

    // eslint-disable-next-line @typescript-eslint/require-await -- Act complains otherwise, and act is async
    await act(async () => hook.rerender({ isError: true }));

    vi.useRealTimers();
    uncacheSuspenseResource(resource, 0);
  });
});
