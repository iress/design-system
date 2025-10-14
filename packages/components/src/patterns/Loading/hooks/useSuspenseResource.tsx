import { useMemo } from 'react';

interface Suspender<T> {
  read(): T;
}

/**
 * This is the function that creates a suspender for a promise, allowing you to suspend a component until the resource (Promise) is resolved.
 * **Note:** For those using React 19, import the `use` hook from React instead of using this polyfill.
 * @param promise The promise to suspend on. Once it resolves, the component will re-render with the resolved value.
 * @returns {T | Error | Promise<void>} If the promise has not resolved, it will throw the promise, causing the component to suspend. If it has resolved successfully, it will return the result. If it has errored, it will throw the error.
 * @see https://react.dev/reference/react/use
 */
const createSuspender = <T,>(promise: Promise<T>) => {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: Error;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err: Error) => {
      status = 'error';
      error = err;
    },
  );

  return {
    read() {
      // eslint-disable-next-line @typescript-eslint/only-throw-error -- This triggers suspense by throwing the promise when its pending
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      return result;
    },
  };
};

/**
 * This is a cache for the suspender resources, allowing us to reuse the same suspender for the same fetcher function and avoiding unnecessary re-fetching.
 * **Note:** For those using React 19, import the `use` hook from React instead of using this polyfill.
 * @see https://react.dev/reference/react/use
 */
const cache = new WeakMap<() => Promise<unknown>, Suspender<unknown>>();

/**
 * This is a polyfill for the `use` hook in React 19, allowing you to suspend a component until the resource (Promise) is resolved.
 * **Note:** For those using React 19, import the `use` hook from React instead of using this polyfill.
 * @param promise The promise to suspend on. Once it resolves, the component will re-render with the resolved value.
 * @returns {T | Error | Promise<void>} If the promise has not resolved, it will throw the promise, causing the component to suspend. If it has resolved successfully, it will return the result. If it has errored, it will throw the error.
 * @see https://react.dev/reference/react/use
 */
export const useSuspenseResource = <T,>(fetcher: () => Promise<T>): T => {
  const resource = useMemo(() => {
    if (!cache.has(fetcher)) {
      cache.set(fetcher, createSuspender(fetcher()));
    }
    return cache.get(fetcher)! as Suspender<T>;
  }, [fetcher]);

  return resource.read();
};

/**
 * Our polyfill is not as smart as React's `use` hook, so we need to manually uncache the resource after a certain timeout.
 * You usually need this if you are calling parameters with your `useSuspenseResource` hook (eg. `useSuspenseResource(() => fetch('/api/data'))`).
 * **Note:** For those using React 19, import the `use` hook from React instead of using this polyfill.
 * @param fetcher The function that returns a promise to suspend on (usually an API call).
 * @param timeout The time in milliseconds after which the resource will be uncached. Default is 1000ms, usually enough to avoid flickering.
 * @see https://react.dev/reference/react/use
 */
export const uncacheSuspenseResource = (
  fetcher: () => Promise<unknown>,
  timeout = 1000,
) => {
  setTimeout(() => {
    cache.delete(fetcher);
  }, timeout);
};
