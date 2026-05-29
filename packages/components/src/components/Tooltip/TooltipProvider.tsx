import { type PropsWithChildren, useMemo } from 'react';
import { type FloatingUIContainer } from '@/types';
import { TooltipContainerContext } from './hooks/useTooltipContainer';

export interface IressTooltipProviderProps extends PropsWithChildren {
  /**
   * The container element to render nested tooltips into.
   * By default, tooltips render where their parent is rendered.
   *
   * Individual tooltips can override this by setting their own `container` prop.
   */
  container?: FloatingUIContainer;
}

/**
 * Provides a shared container context for nested tooltips to render into.
 *
 * @example
 * ```tsx
 * import { IressTooltipProvider } from '@iress-oss/ids-components';
 *
 * <IressTooltipProvider container={document.getElementById('tooltip-root')}>
 *   {children}
 * </IressTooltipProvider>
 * ```
 */
export const IressTooltipProvider = ({
  children,
  container,
}: IressTooltipProviderProps) => {
  const value = useMemo(() => ({ container }), [container]);

  return (
    <TooltipContainerContext.Provider value={value}>
      {children}
    </TooltipContainerContext.Provider>
  );
};

IressTooltipProvider.displayName = 'IressTooltipProvider';
