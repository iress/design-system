import { useContext, useMemo } from 'react';
import { IressModalContext } from '../ModalProvider';

export const useModal = () => {
  const context = useContext(IressModalContext);

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
