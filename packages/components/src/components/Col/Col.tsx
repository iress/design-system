import classNames from 'classnames';
import {
  type IressColProps,
  ColCssClass,
  ColAlignSelf,
  ColOffset,
  ColSpan,
  type ColWithEnums,
} from './Col.types';
import { getResponsiveLayoutModifiers } from '@helpers/responsive/getResponsiveLayoutModifiers';

export const IressCol: ColWithEnums = ({
  alignSelf,
  children,
  className,
  offset,
  span = 'auto',
  ...restProps
}: IressColProps) => (
  <div
    className={classNames(
      className,
      ColCssClass.Base,
      getResponsiveLayoutModifiers(ColCssClass.Span, span, '12'),
      getResponsiveLayoutModifiers(ColCssClass.Offset, offset),
      {
        [`${ColCssClass.AlignSelf}--${alignSelf}`]: !!alignSelf,
      },
    )}
    {...restProps}
  >
    {children}
  </div>
);

/** @deprecated IressCol.AlignSelf is now deprecated and will be removed in a future version. Please use the ColAlignSelfs type instead. */
IressCol.AlignSelf = ColAlignSelf;

/** @deprecated IressCol.Offset is now deprecated and will be removed in a future version. Please use the ColOffsets type instead. */
IressCol.Offset = ColOffset;

/** @deprecated IressCol.Span is now deprecated and will be removed in a future version. Please use the ColSpans type instead. */
IressCol.Span = ColSpan;
