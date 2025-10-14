import { type FloatingUIContainer } from '@/types';
import { useContext, useMemo, createContext } from 'react';

export interface ModalContextValue {
  /**
   * An array of modal IDs that are currently open.
   */
  opened: string[];

  /**
   * The container element to render the modal into.
   * By default, the modal will render at the end of the document body.
   */
  container?: FloatingUIContainer;

  /**
   * Show or hide a modal by ID.
   */
  showModal: (id: string, flag?: boolean) => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined,
);

export const useModal = () => {
  const context = useContext(ModalContext);

  return useMemo(
    () => ({
      showModal: (id: string, flag = true) => {
        if (context === undefined) {
          throw new Error(
            'IressModal: useModal must be used within a IressModalProvider',
          );
        }

        context.showModal(id, flag);
      },
    }),
    [context],
  );
};
