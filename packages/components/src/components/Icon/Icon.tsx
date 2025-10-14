import { type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { cx } from '@/styled-system/css';
import { icon } from './Icon.styles';
import { GlobalCSSClass } from '@/enums';
import { type IconName } from '@fortawesome/fontawesome-common-types';

export interface IressIconProps extends IressStyledProps<'span'> {
  /**
   * The name of the icon
   */
  name: IconName;

  /**
   * Adds screen reader text if the icon needs to be visible to screen reader users
   */
  screenreaderText?: string;

  /**
   * The icon set to be used:
   * - `fal`: Font Awesome Light
   * - `fab`: Font Awesome Brand
   * @default 'fal'
   */
  set?: 'fal' | 'fab';

  /**
   * Amount of degrees to rotate the icon.
   */
  rotate?: 90 | 180 | 270;

  /**
   * Adds fixed width class for Font Awesome icons - fa-fw
   */
  fixedWidth?: boolean;

  /**
   * Flip the icon horizontally, vertically or both axes.
   */
  flip?: 'horizontal' | 'vertical' | 'both';

  /**
   * Accepts a numeric value for speed for one rotation.
   */
  spin?: 'half' | 1 | 2 | 3;
}

export const IressIcon = ({
  className,
  fixedWidth,
  flip,
  name,
  rotate,
  screenreaderText,
  set = 'fal',
  spin,
  ...restProps
}: IressIconProps) => {
  const prefix = 'fa-';
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
