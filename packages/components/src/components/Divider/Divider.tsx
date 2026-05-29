import { cx, css } from '@/styled-system/css';
import { divider } from './Divider.styles';
import { type IressStyledProps } from '@/types';
import { splitCssProps } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';

export interface IressDividerProps extends IressStyledProps<'hr'> {
  /**
   * Change to a vertical divider.
   */
  vertical?: boolean;
}

/**
 * Renders a horizontal or vertical line to visually separate content.
 *
 * @example
 * ```tsx
 * import { IressDivider } from '@iress-oss/ids-components';
 *
 * <IressDivider />
 * ```
 */
export const IressDivider = ({
  className,
  stretch,
  vertical,
  ...restProps
}: IressDividerProps) => {
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <hr
      className={cx(
        className,
        css({
          ...divider.raw({
            vertical: !!vertical,
            verticalStretch: !!stretch && vertical,
          }),
          ...styleProps,
        }),
        GlobalCSSClass.Divider,
      )}
      {...nonStyleProps}
    />
  );
};

IressDivider.displayName = 'IressDivider';
