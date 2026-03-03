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
import { loadIconModule } from './iconLoader';

// Hardcoded fallback SVG (question mark) for when both the requested icon and help icon are missing
const FallbackIcon = () => (
  <svg
    viewBox="0 -960 960 960"
    width="100%"
    height="100%"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M424-320q0-81 29.5-124t77.5-97q36-43 58-78.5t22-81.5q0-51-33-83.5T492-816q-45 0-80 28t-46 76l-56-24q18-58 64.5-97T492-872q72 0 120 46.5T660-708q0 54-26.5 97T568-526q-40 38-60 66.5T484-396h-60Zm56 240q-17 0-28.5-11.5T440-120q0-17 11.5-28.5T480-160q17 0 28.5 11.5T520-120q0 17-11.5 28.5T480-80Z" />
  </svg>
);

// Module-level cache for lazy icon components to prevent re-creation on every render
const iconCache = new Map<string, LazyExoticComponent<ComponentType>>();

function getIconComponent(
  iconName: string,
  filled: boolean,
): LazyExoticComponent<ComponentType> {
  const cacheKey = `${iconName}${filled ? '-fill' : ''}`;

  const cached = iconCache.get(cacheKey);
  if (cached) return cached;

  const fileName = `${iconName}${filled ? '-fill' : ''}`;
  const component = lazy(() => {
    const result = loadIconModule(fileName);
    if (result) return result;

    idsLogger(
      `[IressIcon] Icon "${iconName}" not found, falling back to "help" icon`,
    );
    return loadIconModule('help') ?? Promise.resolve({ default: FallbackIcon });
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
  filled,
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
    const [styleProps, otherProps] = splitCssProps(restProps);

    const a11yProps = screenreaderText
      ? { 'aria-label': screenreaderText }
      : { 'aria-hidden': 'true' as const };

    const sharedProps = {
      role: 'img' as const,
      'data-icon': materialIconName,
      ...a11yProps,
      ...otherProps,
    };

    return (
      <Suspense
        fallback={
          <styled.span
            className={cx(
              css(styles, icon.raw({ loading: true }), styleProps),
              GlobalCSSClass.Icon,
              className,
            )}
            {...sharedProps}
          />
        }
      >
        <styled.span
          className={cx(
            css(styles, styleProps),
            GlobalCSSClass.Icon,
            className,
          )}
          {...sharedProps}
        >
          <IconSvgRenderer iconName={materialIconName} filled={!!filled} />
        </styled.span>
      </Suspense>
    );
  }

  // Font Awesome rendering (legacy)
  const prefix = 'fa-';

  // Extract Font Awesome-specific props to prevent them from being passed to DOM
  const {
    set: setFromProps,
    fixedWidth: fixedWidthFromProps,
    ...faOtherProps
  } = restProps as Omit<
    IressIconProps<'fontawesome'>,
    'rotate' | 'flip' | 'spin' | 'filled'
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
