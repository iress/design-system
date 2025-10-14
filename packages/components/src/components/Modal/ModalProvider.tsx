import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { type FloatingUIContainer } from '@/types';
import { ModalContext } from './hooks/useModal';

export interface IressModalProviderProps extends PropsWithChildren {
  /**
   * The container element to render the modal into.
   * By default, the modal will render at the end of the document body.
   */
  container?: FloatingUIContainer;
}

export const IressModalProvider = ({
  children,
  container,
}: IressModalProviderProps) => {
  const [opened, setOpened] = useState<string[]>([]);

  const open = useCallback((id: string) => {
    setOpened((prev) => (prev.includes(id) ? [...prev] : [...prev, id]));
  }, []);

  const close = useCallback((id: string) => {
    setOpened((prev) =>
      prev.includes(id) ? prev.filter((modalId) => modalId !== id) : [...prev],
    );
  }, []);

  const showModal = useCallback(
    (id: string, flag = true) => {
      if (flag) return open(id);
      close(id);
    },
    [close, open],
  );

  const updatedValue = useMemo(
    () => ({
      opened,
      container,
      showModal,
    }),
    [container, opened, showModal],
  );

  return (
    <ModalContext.Provider value={updatedValue}>
      {children}
    </ModalContext.Provider>
  );
};
