import { type IressStyledProps } from '@/types';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { css, cx } from '@/styled-system/css';
import { icon } from './Icon.styles';
import { GlobalCSSClass } from '@/enums';
import type { IconName } from '@fortawesome/fontawesome-common-types';
import type { MaterialSymbol } from 'material-symbols';
import {
  type LazyExoticComponent,
  type ComponentType,
  lazy,
  Suspense,
  useContext,
} from 'react';
import { IconContext, type IconType } from './IconProvider';
import { idsLogger } from '@/helpers/utility/idsLogger';
import {
  FA_TO_MATERIAL_MAP,
  type FontAwesomeIconWithMaterialEquivalent,
} from './helpers/iconMapping';

// Module-level cache for lazy icon components to prevent re-creation on every render
const iconCache = new Map<string, LazyExoticComponent<ComponentType>>();

function getIconComponent(
  iconName: string,
  filled: boolean,
): LazyExoticComponent<React.ComponentType> {
  const cacheKey = `${iconName}${filled ? '-fill' : ''}`;

  const cached = iconCache.get(cacheKey);
  if (cached) return cached;

  const component = lazy(() => {
    const iconPath = `./generated/${iconName}${filled ? '-fill' : ''}`;
    return import(/* @vite-ignore */ iconPath).catch(() => {
      idsLogger(
        `[IressIcon] Icon "${iconName}" not found, falling back to "help" icon`,
      );
      return import('./generated/help');
    });
  });

  iconCache.set(cacheKey, component);
  return component;
}

/**
 * Static wrapper component for lazy-loaded SVG icons.
 * Declared at module scope so the parent component only renders a stable reference.
 * The eslint-disable is safe because getIconComponent uses a module-level Map cache,
 * guaranteeing the same LazyExoticComponent instance for a given name+filled pair.
 */
function IconSvgRenderer({
  iconName,
  filled,
}: Readonly<{
  iconName: string;
  filled: boolean;
}>) {
  const Component = getIconComponent(iconName, filled);
  // eslint-disable-next-line react-hooks/static-components -- cached lazy components are stable
  return <Component />;
}

export type IressIconProps<P extends IconType = 'material'> =
  IressStyledProps<'span'> & {
    /**
     * Filled variant for Material Symbols
     * When true, icon uses filled style (fill=1)
     * Useful for active/selected states
     * @default false
     */
    filled?: P extends 'material' ? boolean : never;

    /**
     * Adds fixed width class for Font Awesome icons - fa-fw
     * @deprecated Font Awesome specific. Material Symbols inherit text size automatically.
     */
    fixedWidth?: P extends 'fontawesome' ? boolean : never;

    /**
     * The name of the icon.
     * Note: Font Awesome is deprecated. Please migrate to Material Symbols.
     */
    name: P extends 'fontawesome'
      ? IconName
      : MaterialSymbol | FontAwesomeIconWithMaterialEquivalent;

    /**
     * Adds screen reader text if the icon needs to be visible to screen reader users
     */
    screenreaderText?: string;

    /**
     * Amount of degrees to rotate the icon.
     */
    rotate?: 90 | 180 | 270;

    /**
     * Flip the icon horizontally, vertically or both axes.
     */
    flip?: 'horizontal' | 'vertical' | 'both';

    /**
     * The icon set to be used (Font Awesome only):
     * - `fal`: Font Awesome Light
     * - `fab`: Font Awesome Brand
     * @default 'fal'
     * @deprecated Font Awesome is deprecated. Please migrate to Material Symbols.
     */
    set?: P extends 'fontawesome' ? 'fal' | 'fab' : never;

    /**
     * Accepts a numeric value for speed for one rotation.
     */
    spin?: 'half' | 1 | 2 | 3;

    /**
     * The icon provider to use
     * Note: Font Awesome is deprecated. Please migrate to Material Symbols.
     */
    type?: P;
  };

export const IressIcon = <P extends IconType = 'material'>({
  className,
  flip,
  name,
  rotate,
  screenreaderText,
  spin,
  type,
  ...restProps
}: IressIconProps<P>) => {
  const iconContext = useContext(IconContext);
  const effectiveProvider = (type ?? iconContext?.type ?? 'material') as P;

  // Development warning for Font Awesome deprecation
  if (type == 'fontawesome') {
    idsLogger(
      `[IressIcon] Font Awesome is deprecated and will be removed in a future version. Please migrate to Material Symbols. Icon name: "${name}"`,
    );
  }

  // Extract filled prop to prevent it from being passed to DOM
  const { filled, ...otherRestProps } = restProps as IressIconProps<P> & {
    filled?: boolean;
  };
  // Compute Material Symbol icon name once (with auto-mapping from Font Awesome names)
  let materialIconName: MaterialSymbol | undefined;
  if (effectiveProvider === 'material') {
    materialIconName = (FA_TO_MATERIAL_MAP[
      name as FontAwesomeIconWithMaterialEquivalent
    ] ?? name) as MaterialSymbol;
  }

  // Render based on provider
  if (effectiveProvider === 'material' && materialIconName) {
    const styles = icon.raw({
      flip,
      rotate,
      spin,
      type: effectiveProvider,
    });
    const [styleProps, otherProps] = splitCssProps(otherRestProps);

    const a11yProps = screenreaderText
      ? { 'aria-label': screenreaderText }
      : { 'aria-hidden': 'true' as const };

    return (
      <Suspense
        fallback={
          <styled.span
            className={cx(
              css(styles, icon.raw({ loading: true }), styleProps),
              GlobalCSSClass.Icon,
              className,
            )}
            role="img"
            {...a11yProps}
            {...otherProps}
          />
        }
      >
        <styled.span
          role="img"
          className={cx(
            css(styles, styleProps),
            GlobalCSSClass.Icon,
            className,
          )}
          {...a11yProps}
          {...otherProps}
        >
          <IconSvgRenderer iconName={materialIconName} filled={!!filled} />
        </styled.span>
      </Suspense>
    );
  }

  // Font Awesome rendering (legacy)
  const prefix = 'fa-';

  // Extract Font Awesome-specific props to prevent them from being passed to DOM
  // Note: rotate, flip, spin are already extracted at function level
  // but TypeScript needs explicit type exclusion to prevent conflicts with CSS properties
  const {
    set: setFromProps,
    fixedWidth: fixedWidthFromProps,
    ...faOtherProps
  } = otherRestProps as Omit<
    IressIconProps<'fontawesome'>,
    'rotate' | 'flip' | 'spin'
  > & {
    set?: 'fal' | 'fab';
    fixedWidth?: boolean;
  };

  const set = setFromProps ?? 'fal';
  const fixedWidth = fixedWidthFromProps ?? false;

  const classes = icon({
    flip,
    rotate,
    spin,
  });

  return (
    <styled.span
      role="img"
      className={cx(
        classes,
        GlobalCSSClass.Icon,
        set,
        `${prefix}${name}`,
        fixedWidth && 'fa-fw',
        className,
      )}
      {...(screenreaderText
        ? { 'aria-label': screenreaderText }
        : { 'aria-hidden': 'true' as const })}
      {...faOtherProps}
    />
  );
};

IressIcon.displayName = 'IressIcon';
