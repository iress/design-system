import { useEffect, useRef, useState } from 'react';

/**
 * This hook is used to smooth the loading experience by delaying the loading indicator being removed after the loading of an element finishes, as well as avoiding the indicator completely if the loading is too quick.
 *
 * @param isLoaded - A boolean value that determines if the component waiting to be loaded has finished loading.
 * @param delay - Once a component has loaded, how long should the loading indicator be displayed for. This is useful to allow the loading indicator to animate out.
 * @param startFrom - If a component is still loading after this time in milliseconds, you should show the loading message. Default is 500ms, meaning a user will not even see the loading indicator if the page loads before this time.
 * @param avoidDelayTimeout - If the component has a start up animation, this is the time in milliseconds that we will avoid the delay timeout for. This is useful to speed up the loading indicator removal if the component loaded before the first half of an animation finishes.
 * @returns A boolean value that determines whether the `IressLoading` component should be rendered.
 */
export const useShouldRenderLoading = (
  isLoaded: boolean,
  delay = 500,
  startFrom = 250,
  avoidDelayTimeout = 250,
) => {
  const [renderLoading, setRenderLoading] = useState<boolean>(startFrom === 0);
  const startShowing = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setRenderLoading(true);
        startShowing.current = performance.now();
      }
    }, startFrom);
    return () => clearTimeout(timeout);
  }, [startFrom, isLoaded]);

  useEffect(() => {
    if (isLoaded !== true) {
      return;
    }

    // Some loading patterns have a start up animation, so we can avoid the delay during that animation time.
    if (
      !startShowing.current ||
      performance.now() - startShowing.current < avoidDelayTimeout
    ) {
      setRenderLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      setRenderLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isLoaded, delay, avoidDelayTimeout]);

  return isLoaded !== true || renderLoading;
};
