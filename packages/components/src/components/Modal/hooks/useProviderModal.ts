import { useContext } from 'react';
import { ModalContext } from './useModal';

/**
 * This hook is used to control the modal state through the provider, used for uncontrolled modals.
 * @param id ID of the modal to control.
 */
export function useProviderModal(id?: string) {
  const provider = useContext(ModalContext);

  return {
    opened: id && provider?.opened.includes(id),
    container: provider?.container,
    show: (open?: boolean) => id && provider?.showModal(id, open),
  };
}
