import classNames from 'classnames';
import {
  type IressRowProps,
  RowCssClass,
  type RowWithEnums,
} from './Row.types';
import { getResponsiveLayoutModifiers } from '@helpers/responsive/getResponsiveLayoutModifiers';
import { GutterSize, HorizontalAlign, VerticalAlign } from '@/main';

export const IressRow: RowWithEnums = ({
  children,
  className,
  gutter,
  horizontalAlign = 'left',
  useColGap,
  verticalAlign = 'top',
  ...restProps
}: IressRowProps) => {
  return (
    <div
      className={classNames(
        className,
        getResponsiveLayoutModifiers(
          RowCssClass.Gutter,
          gutter,
          GutterSize.None,
        ),
        {
          [RowCssClass.Base]: true,
          [`${RowCssClass.HorizontalAlign}--${horizontalAlign}`]:
            !!horizontalAlign,
          [`${RowCssClass.VerticalAlign}--${verticalAlign}`]: !!verticalAlign,
          [RowCssClass.UseColGap]: !!useColGap,
        },
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

/** @deprecated IressRow.Gutter enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressRow.Gutter = GutterSize;

/** @deprecated IressRow.HorizontalAlign enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressRow.HorizontalAlign = HorizontalAlign;

/** @deprecated IressRow.VerticalAlign enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressRow.VerticalAlign = VerticalAlign;
