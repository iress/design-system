import { useContext, useMemo } from 'react';
import { ModalContext } from '../ModalProvider';

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
