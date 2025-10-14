import { useContext, useEffect, useMemo } from 'react';
import { type NewToast } from '../Toast/Toast.types';
import { ToasterContext } from '../ToasterProvider';
import { type ToasterPositions } from '../Toaster.types';

export const useToaster = (position?: ToasterPositions) => {
  const context = useContext(ToasterContext);

  if (context === undefined) {
    throw new Error('useToaster must be used within a IressToasterProvider');
  }

  const { show, setOptions, options: globalOptions, animateOut } = context;

  useEffect(() => {
    if (position) {
      setOptions({
        ...globalOptions,
        position: position ?? globalOptions.position,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only need to update it if it's a option.
  }, [position]);

  return useMemo(
    () => ({
      success: (toast: NewToast) => show({ ...toast, status: 'success' }),
      error: (toast: NewToast) => show({ ...toast, status: 'error' }),
      info: (toast: NewToast) => show({ ...toast, status: 'info' }),
      close: animateOut,
      options: globalOptions,
    }),
    [animateOut, globalOptions, show],
  );
};
