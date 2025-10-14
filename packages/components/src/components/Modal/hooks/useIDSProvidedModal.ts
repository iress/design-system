import { useContext } from 'react';
import { IressModalContext } from '../ModalProvider';

export function useIDSProvidedModal(id?: string) {
  const provider = useContext(IressModalContext);

  return {
    opened: id && provider?.opened.includes(id),
    container: provider?.container,
    show: (open?: boolean) => id && provider?.showModal(id, open),
  };
}
