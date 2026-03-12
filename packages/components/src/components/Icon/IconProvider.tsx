import {
  createContext,
  useState,
  useCallback,
  type PropsWithChildren,
} from 'react';
import type { MaterialSymbol } from 'material-symbols';
import { FontLoader } from './components/FontLoader';
import { useDynamicFontSubsetting } from './hooks/useDynamicFontSubsetting';
import type { ShadowContainer } from '@/types';
import { MATERIAL_SYMBOLS } from './Icon.constants';
import type { IressTestProps } from '@/interfaces';

export type IconType = 'fontawesome' | 'material';

export interface IconContextValue<P extends IconType = IconType> {
  /**
   * Check if an icon is already loaded (for Material Symbols only)
   * @param name - The name of the Material Symbol icon
   * @returns True if the icon is loaded, false otherwise
   */
  isIconLoaded: (name: MaterialSymbol) => boolean;

  /**
   * Register an icon as used (for Material Symbols only)
   * @param name - The name of the Material Symbol icon
   * @returns void
   */
  registerIcon: (name: MaterialSymbol) => void;

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
   * Optional container to inject the font styles into.
   * Can be a ShadowRoot, HTMLElement, or a ref to either.
   * Note: Font is always injected into document head as well.
   */
  container?: ShadowContainer;

  /**
   * Disable automatic font subsetting via Google Fonts CDN
   * When false, only icons actually used in the component tree are loaded
   * When true, the full Material Symbols font is loaded
   * @default false
   */
  noSubsetting?: P extends 'material' ? boolean : never;

  /**
   * The icon provider to use for all child icons
   * @default 'material'
   */
  type?: P;
}

/**
 * This provider tracks Material Symbols usage across your app and dynamically
 * loads only the icons you use via Google Fonts CDN, dramatically reducing
 * font payload size.
 *
 * Loads Material Symbols Rounded with fixed parameters:
 * - Weight: 300
 * - FILL: 0 (default state) to 1 (active state)
 * - Grade: 24
 * - Optical Size: 24dp
 *
 * @example
 * ```tsx
 * import { IconProvider } from '@iress-oss/ids-components';
 *
 * function App() {
 *   return (
 *     <IconProvider>
 *       <YourApp />
 *     </IconProvider>
 *   );
 * }
 * ```
 *
 * **Bundle Size Optimization:**
 * - Full font: ~1.4MB
 * - 18 icons (typical usage): ~15-20KB (85% savings)
 * - Auto-optimizes based on actual usage
 *
 * **Trade-offs:**
 * - ✅ Automatic optimization (no consumer config needed)
 * - ✅ Works for any number of icons (1 to 1000+)
 * - ✅ Google CDN handles caching
 * - ⚠️ Requires internet connection
 * - ⚠️ Brief icon loading delay
 *
 * **When to Use:**
 * - You want automatic bundle size optimization
 * - Network connectivity is expected
 * - Icon loading delay is acceptable (typically <500ms on fast connections)
 *
 * **When NOT to Use:**
 * - Using more than ~50 icons (consider full font instead)
 * - Offline apps (use full bundled font instead)
 * - SSR with critical icons (icons may flash during hydration)
 * - Need deterministic font versions (Google controls CDN updates)
 *
 * ---
 *
 * It also provides Font Awesome fonts when using that icon set.
 */
export const IressIconProvider = <P extends IconType = 'material'>({
  children,
  container,
  'data-testid': dataTestId,
  type = 'material' as P,
  noSubsetting = false as IressIconProviderProps<P>['noSubsetting'],
}: IressIconProviderProps<P>) => {
  const [usedIcons, setUsedIcons] = useState<Set<MaterialSymbol>>(new Set());

  const registerIcon = useCallback(
    (name: MaterialSymbol) => {
      if (noSubsetting) {
        return;
      }

      setUsedIcons((prev) => {
        if (!prev.has(name)) {
          const newSet = new Set(prev);
          newSet.add(name);
          return newSet;
        }

        return prev;
      });
    },
    [noSubsetting],
  );

  // Use dynamic font subsetting for Material Symbols
  const { isIconLoaded } = useDynamicFontSubsetting({
    icons: usedIcons,
    buildUrl: (icons) => {
      const iconNamesParam = noSubsetting
        ? '&display=block'
        : `&icon_names=${encodeURIComponent(icons.join(','))}`;
      const fontFamily = MATERIAL_SYMBOLS.family.replace(/ /g, '+');
      return `https://fonts.googleapis.com/css2?family=${fontFamily}:opsz,wght,FILL,GRAD@${MATERIAL_SYMBOLS.opticalSize},${MATERIAL_SYMBOLS.weight},0..1,${MATERIAL_SYMBOLS.grade}${iconNamesParam}`;
    },
    dataAttribute: 'material-icons-subset',
    fontFamily: MATERIAL_SYMBOLS.family,
    disabled: type !== 'material',
    noSubsetting,
  });

  const contextValue: IconContextValue<P> = {
    type,
    registerIcon,
    isIconLoaded: (name: MaterialSymbol) =>
      type !== 'material' ? true : isIconLoaded(name),
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
