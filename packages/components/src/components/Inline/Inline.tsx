import classNames from 'classnames';
import {
  type IressInlineProps,
  InlineCssClass,
  type InlineWithEnums,
} from './Inline.types';
import { getResponsiveLayoutModifiers } from '@helpers/responsive/getResponsiveLayoutModifiers';
import { GutterSize, HorizontalAlign, VerticalAlign } from '@/main';

export const IressInline: InlineWithEnums = ({
  children,
  className,
  gutter = 'none',
  horizontalAlign = 'left',
  noWrap = false,
  verticalAlign = 'top',
  ...restProps
}: IressInlineProps) => {
  const classMap = {
    [`${InlineCssClass.HorizontalAlign}--${horizontalAlign}`]: true,
    [InlineCssClass.NoWrap]: noWrap,
    [`${InlineCssClass.VerticalAlign}--${verticalAlign}`]: true,
  };

  const cssClasses = classNames(
    className,
    InlineCssClass.Base,
    getResponsiveLayoutModifiers(InlineCssClass.Gutter, gutter, 'none'),
    classMap,
  );

  return (
    <div className={cssClasses} {...restProps}>
      {children}
    </div>
  );
};

/** @deprecated IressInline.Gutter is now deprecated and will be removed in a future version. Please use the GutterSizes type instead. */
IressInline.Gutter = GutterSize;

/** @deprecated IressInline.HorizontalAlign is now deprecated and will be removed in a future version. Please use the HorizontalAligns type instead. */
IressInline.HorizontalAlign = HorizontalAlign;

/** @deprecated IressInline.VerticalAlign is now deprecated and will be removed in a future version. Please use the VerticalAligns type instead. */
IressInline.VerticalAlign = VerticalAlign;
