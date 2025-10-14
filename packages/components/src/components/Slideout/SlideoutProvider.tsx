import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { type FloatingUIContainer } from '@/types';
import { SlideoutContext } from './hooks/useSlideout';

export interface IressSlideoutProviderProps extends PropsWithChildren {
  /**
   * The container element to render the slideout into.
   * By default, the slideout will render at the end of the document body.
   */
  container?: FloatingUIContainer;
}

export const IressSlideoutProvider = ({
  children,
  container,
}: IressSlideoutProviderProps) => {
  const [opened, setOpened] = useState<string[]>([]);

  const open = useCallback((id: string) => {
    setOpened([id]);
  }, []);

  const close = useCallback((id: string) => {
    setOpened((prev) =>
      prev.includes(id) ? prev.filter((modalId) => modalId !== id) : [...prev],
    );
  }, []);

  const showSlideout = useCallback(
    (id: string, flag?: boolean) => {
      if (flag !== undefined) {
        if (flag) {
          return open(id);
        }
        close(id);
        return;
      }

      if (opened.includes(id)) {
        close(id);
      } else {
        open(id);
      }
    },
    [close, open, opened],
  );

  const updatedValue = useMemo(
    () => ({
      container,
      opened,
      showSlideout,
    }),
    [container, opened, showSlideout],
  );

  return (
    <SlideoutContext.Provider value={updatedValue}>
      {children}
    </SlideoutContext.Provider>
  );
};
