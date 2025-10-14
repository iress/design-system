import { useContext, useMemo } from 'react';
import { SlideoutContext } from '../SlideoutProvider';

export const useSlideout = () => {
  const context = useContext(SlideoutContext);

  if (!context) {
    throw new Error(
      'IressSlideout: showSlideout must be used within a IressSlideoutProvider',
    );
  }

  return useMemo(
    () => ({
      showSlideout: (id: string, flag = true) => {
        context.showSlideout(id, flag);
      },
    }),
    [context],
  );
};
