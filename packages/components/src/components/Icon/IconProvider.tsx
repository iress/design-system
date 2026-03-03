import { createContext, type PropsWithChildren } from 'react';
import { FontLoader } from './components/FontLoader';
import type { ShadowContainer } from '@/types';
import type { IressTestProps } from '@/interfaces';

export type IconType = 'fontawesome' | 'material';

export interface IconContextValue<P extends IconType = IconType> {
  /**
   * The icon provider type being used
   * @default 'material'
   */
  type: P;
}

// eslint-disable-next-line react-refresh/only-export-components
export const IconContext = createContext<IconContextValue | null>(null);

export interface IressIconProviderProps<P extends IconType = 'material'>
  extends PropsWithChildren, IressTestProps {
  /**
   * Optional container to inject Font Awesome font styles into.
   * Can be a ShadowRoot, HTMLElement, or a ref to either.
   * Note: Only applicable when using Font Awesome (type="fontawesome")
   * Material Symbols render as inline SVG and don't need font loading
   */
  container?: P extends 'fontawesome' ? ShadowContainer : never;

  /**
   * The icon provider to use for all child icons
   * @default 'material'
   */
  type?: P;
}

/**
 * Icon Provider for IressIcon components.
 *
 * **Material Symbols (default):**
 * Material Symbols are now rendered as inline SVG components and no longer
 * require font loading. The provider is **optional** for Material Symbols -
 * icons will work without it.
 *
 * All 3,798 Material Symbol icons are available by name, lazy-loaded on first use:
 * - No registration needed
 * - No font loading delays
 * - CSP compliant (no external requests)
 * - Tree-shakable (unused icons don't add bundle size)
 *
 * **Font Awesome (legacy):**
 * Font Awesome is deprecated and will be removed in a future version.
 * The provider is only needed if you're still using Font Awesome icons.
 *
 * @example
 * ```tsx
 * // Material Symbols - provider optional
 * <IressIcon name="search" />
 * <IressIcon name="home" />
 *
 * // Font Awesome (deprecated) - provider required
 * <IressIconProvider type="fontawesome">
 *   <IressIcon name="home" type="fontawesome" />
 * </IressIconProvider>
 * ```
 *
 * **Migration from v5:**
 * - `noSubsetting` prop removed (Material Symbols are now SVG, no font subsetting)
 * - `container` prop only works with Font Awesome
 * - Material Symbols no longer need provider for basic usage
 */
export const IressIconProvider = <P extends IconType = 'material'>({
  children,
  container,
  'data-testid': dataTestId,
  type = 'material' as P,
}: IressIconProviderProps<P>) => {
  const contextValue: IconContextValue<P> = {
    type,
  };

  return (
    <IconContext.Provider value={contextValue}>
      {children}
      {type === 'fontawesome' && (
        <FontLoader
          url="https://cdn.iress.com/icons/5.15.4/css/combined.min.css"
          container={container}
          keyPrefix="font-awesome-fonts"
          data-testid={dataTestId}
        />
      )}
    </IconContext.Provider>
  );
};

IressIconProvider.displayName = 'IressIconProvider';
