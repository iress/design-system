import { useContext } from 'react';
import { SlideoutContext } from '../SlideoutProvider';

/**
 * This hook is used to control the slideout state through the provider, used for uncontrolled slideouts.
 * @param id ID of the modal to control.
 */
export function useProviderSlideout(id?: string) {
  const provider = useContext(SlideoutContext);

  return {
    opened: id && provider?.opened.includes(id),
    container: provider?.container,
    show: (open?: boolean) => id && provider?.showSlideout(id, open),
  };
}
