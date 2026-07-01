import { type FloatingUIContainer } from '@/types';
import { createContext, useContext } from 'react';

export interface TooltipContainerContextValue {
  /**
   * The container element to render tooltips into.
   * By default, tooltips render where their parent is rendered.
   */
  container?: FloatingUIContainer;
}

/**
 * Context used by `IressTooltipProvider` to supply a shared container
 * to all nested `IressTooltip` components.
 */
export const TooltipContainerContext = createContext<
  TooltipContainerContextValue | undefined
>(undefined);

/**
 * Returns the container supplied by the nearest `IressTooltipProvider`, if any.
 */
export const useTooltipContainer = (): TooltipContainerContextValue => {
  const context = useContext(TooltipContainerContext);
  return context ?? {};
};
