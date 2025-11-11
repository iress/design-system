import { useCallback, useEffect, useState } from 'react';

/**
 * Set and retrieve the current hash value from the URL
 * @returns {[string, (newHash: string) => void]} The current hash and a function to set the hash
 */
export const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);

  const onHashChange = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  const onParentHashChange = useCallback(
    (event: MessageEvent<{ type: string; hash: string }>) => {
      if (event.data?.type === 'UPDATE_HASH') {
        const newHash = event.data.hash;
        if (newHash && window.location.hash !== newHash) {
          setHash(newHash);
        }
      }
    },
    [],
  );

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [onHashChange]);

  useEffect(() => {
    window.addEventListener('message', onParentHashChange);
    return () => window.removeEventListener('message', onParentHashChange);
  }, [onParentHashChange]);

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
