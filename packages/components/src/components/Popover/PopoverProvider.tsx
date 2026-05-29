import { type PropsWithChildren, useMemo } from 'react';
import { type FloatingUIContainer } from '@/types';
import { PopoverContainerContext } from './hooks/usePopoverContainer';

export interface IressPopoverProviderProps extends PropsWithChildren {
  /**
   * The container element to render nested popovers into.
   * By default, popovers render where their parent is rendered.
   *
   * Individual popovers can override this by setting their own `container` prop.
   */
  container?: FloatingUIContainer;
}

/**
 * Provides a shared container context for nested popovers to render into.
 *
 * @example
 * ```tsx
 * import { IressPopoverProvider } from '@iress-oss/ids-components';
 *
 * <IressPopoverProvider container={document.getElementById('popover-root')}>
 *   {children}
 * </IressPopoverProvider>
 * ```
 */
export const IressPopoverProvider = ({
  children,
  container,
}: IressPopoverProviderProps) => {
  const value = useMemo(() => ({ container }), [container]);

  return (
    <PopoverContainerContext.Provider value={value}>
      {children}
    </PopoverContainerContext.Provider>
  );
};

IressPopoverProvider.displayName = 'IressPopoverProvider';
