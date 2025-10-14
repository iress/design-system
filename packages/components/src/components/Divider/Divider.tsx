import classNames from 'classnames';
import { type IressDividerProps, DividerCssClass } from './Divider.types';

export const IressDivider = ({
  className,
  gutter,
  vertical,
  ...restProps
}: IressDividerProps) => (
  <hr
    className={classNames(className, DividerCssClass.Base, {
      [`${DividerCssClass.Gutter}--${gutter}`]: gutter,
      [DividerCssClass.Vertical]: vertical,
    })}
    {...restProps}
  />
);
