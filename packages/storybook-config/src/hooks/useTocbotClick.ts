import { useCallback, useEffect, useState } from 'react';

/**
 * This hook listens for click events on the table of contents, as sometimes they do not update the hash value (if the value is the same).
 * @returns {number} The timestamp of the last click event, in order to initiate a re-render
 */
export const useTocbotClick = () => {
  const [clicked, setClicked] = useState(new Date().getTime());

  const onTocbotClick = useCallback(() => {
    setClicked(new Date().getTime());
  }, []);

  useEffect(() => {
    window.addEventListener('tocbot:click', onTocbotClick);
    return () => {
      window.removeEventListener('tocbot:click', onTocbotClick);
    };
  }, [onTocbotClick]);

  return clicked;
};
