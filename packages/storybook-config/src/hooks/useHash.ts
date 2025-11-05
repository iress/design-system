import { useCallback, useEffect, useState } from 'react';

/**
 * Set and retrieve the current hash value from the URL
 * @returns {[string, (newHash: string) => void]} The current hash and a function to set the hash
 */
export const useHash = () => {
  const [hash, setHash] = useState(
    () => window.location.hash || window.parent.location.hash,
  );

  const onHashChange = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [onHashChange]);

  const _setHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash],
  );

  return [hash, _setHash] as const;
};
