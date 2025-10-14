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

export const IressDivider = ({
  className,
  vertical,
  ...restProps
}: IressDividerProps) => {
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <hr
      className={cx(
        className,
        css({
          ...divider.raw({ vertical: !!vertical }),
          ...styleProps,
        }),
        GlobalCSSClass.Divider,
      )}
      {...nonStyleProps}
    />
  );
};
