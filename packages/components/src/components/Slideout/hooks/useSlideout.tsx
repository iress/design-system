import { type FloatingUIContainer } from '@/types';
import { createContext, useContext, useMemo } from 'react';

export interface SlideoutContextValue {
  container?: FloatingUIContainer;
  opened: string[];
  showSlideout: (id: string, flag?: boolean) => void;
}

export const SlideoutContext = createContext<SlideoutContextValue | undefined>(
  undefined,
);

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
