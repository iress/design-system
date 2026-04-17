import { createContext, useCallback, useMemo, useState } from 'react';
import {
  type IressModalContextValue,
  type IressModalProviderProps,
} from './Modal.types';

export const IressModalContext = createContext<
  IressModalContextValue | undefined
>(undefined);

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
    <IressModalContext.Provider value={updatedValue}>
      {children}
    </IressModalContext.Provider>
  );
};
