import { useContext, useMemo } from 'react';
import { IressSlideoutContext } from '../SlideoutProvider';

export const useSlideout = () => {
  const context = useContext(IressSlideoutContext);

  return useMemo(
    () => ({
      showSlideout: (id: string, flag = true) => {
        if (context === undefined) {
          throw new Error(
            'IressSlideout: showSlideout must be used within a IressSlideoutProvider',
          );
        }

        context.showSlideout(id, flag);
      },
    }),
    [context],
  );
};
