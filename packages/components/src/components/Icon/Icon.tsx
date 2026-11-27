import { type IressStyledProps } from '@/types';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { css, cx } from '@/styled-system/css';
import { icon } from './Icon.styles';
import { GlobalCSSClass } from '@/enums';
import type { IconName } from '@fortawesome/fontawesome-common-types';
import type { MaterialSymbol } from 'material-symbols';
import { useContext, useEffect } from 'react';
import { IconContext, type IconType } from './IconProvider';
import { idsLogger } from '@/helpers/utility/idsLogger';
import {
  FA_TO_MATERIAL_MAP,
  type FontAwesomeIconWithMaterialEquivalent,
} from './helpers/iconMapping';

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

/**
 * Renders an SVG icon from the design system icon set.
 *
 * @example
 * ```tsx
 * import { IressIcon } from '@iress-oss/ids-components';
 *
 * <IressIcon name="check_circle" />
 * ```
 */
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

  // Compute Material Symbol icon name once (with auto-mapping from Font Awesome names)
  let materialIconName: MaterialSymbol | undefined;
  if (effectiveProvider === 'material') {
    materialIconName =
      FA_TO_MATERIAL_MAP[name as FontAwesomeIconWithMaterialEquivalent] ?? name;
  }

  // Register Material Symbol icons with provider context if available
  useEffect(() => {
    if (!iconContext || effectiveProvider !== 'material' || !materialIconName) {
      return;
    }
    iconContext.registerIcon(materialIconName);
  }, [effectiveProvider, iconContext, materialIconName]);

  // Render based on provider
  if (effectiveProvider === 'material' && materialIconName) {
    // Check if this specific icon is loaded
    const isLoaded = iconContext
      ? iconContext.isIconLoaded(materialIconName)
      : true;

    const styles = icon.raw({
      flip,
      rotate,
      spin,
      filled: restProps.filled,
      type: effectiveProvider,
      loading: !isLoaded,
    });
    const [styleProps, otherProps] = splitCssProps(restProps);

    return (
      <styled.span
        role="img"
        className={cx(css(styles, styleProps), GlobalCSSClass.Icon, className)}
        aria-hidden={!screenreaderText && 'true'}
        aria-label={screenreaderText}
        {...otherProps}
      >
        {materialIconName}
      </styled.span>
    );
  }

  // Font Awesome rendering (legacy)
  const prefix = 'fa-';
  const set = (restProps as IressIconProps<'fontawesome'>).set ?? 'fal';
  const fixedWidth =
    (restProps as IressIconProps<'fontawesome'>).fixedWidth ?? false;

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
      aria-hidden={!screenreaderText && 'true'}
      aria-label={screenreaderText}
      {...restProps}
    />
  );
};

IressIcon.displayName = 'IressIcon';
