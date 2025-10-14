import { useEffect, useState } from 'react';

/**
 * This hook is used to delay the indicator being shown and removed during the loading process.
 *
 * @param isLoaded - A boolean value that determines if the component waiting to be loaded has finished loading.
 * @param showDelay - Once a component has started loading, how long long we should wait before showing the loading indicator. This is useful to avoid flickering if the component loads quickly.
 * @param hideDelay - Once a component has loaded, how long we should wait before removing the loading indicator. This is useful to allow the loading indicator to animate out.
 * @returns A boolean value that determines whether the loading indicator should be shown.
 */
export const useShowIndicator = (
  isLoaded = false,
  showDelay = 500,
  hideDelay = 200,
) => {
  const [showIndicator, setShowIndicator] = useState(showDelay === 0);

  useEffect(() => {
    if (isLoaded !== true) {
      return;
    }

    const hideTimeout = setTimeout(() => setShowIndicator(false), hideDelay);

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [isLoaded, hideDelay]);

  useEffect(() => {
    const showTimeout = setTimeout(() => setShowIndicator(true), showDelay);

    return () => {
      clearTimeout(showTimeout);
    };
  }, [showDelay]);

  return showIndicator;
};
