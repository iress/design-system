import { type FloatingUIContainer } from '@/types';
import { createContext, useContext } from 'react';

export interface PopoverContainerContextValue {
  /**
   * The container element to render popovers into.
   * By default, popovers render where their parent is rendered.
   */
  container?: FloatingUIContainer;
}

/**
 * Context used by `IressPopoverProvider` to supply a shared container
 * to all nested `IressPopover` components.
 */
export const PopoverContainerContext = createContext<
  PopoverContainerContextValue | undefined
>(undefined);

/**
 * Returns the container supplied by the nearest `IressPopoverProvider`, if any.
 */
export const usePopoverContainer = (): PopoverContainerContextValue => {
  const context = useContext(PopoverContainerContext);
  return context ?? {};
};
