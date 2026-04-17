import { useContext } from 'react';
import { IressSlideoutContext } from '../SlideoutProvider';

export function useIDSProvidedSlideout(id?: string) {
  const provider = useContext(IressSlideoutContext);

  return {
    container: provider?.container,
    opened: id && provider?.opened.some((s) => s === id),
    show: (open?: boolean) => id && provider?.showSlideout(id, open),
  };
}
