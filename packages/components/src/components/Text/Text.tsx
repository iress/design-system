import classNames from 'classnames';
import {
  TextElement,
  TextMode,
  TextVariant,
  TextAlign,
  GlobalCSSClass,
} from '@/enums';
import { type IressTextProps, type TextWithEnums } from './Text.types';

export const IressText: TextWithEnums = ({
  align,
  children,
  className,
  'data-testid': dataTestId,
  element: Tag = 'div',
  mode,
  noGutter,
  variant,
  ...restProps
}: IressTextProps) => (
  <Tag
    {...restProps}
    className={classNames(className, 'iress-u-text', {
      [`iress--${variant}`]: Boolean(variant),
      [`iress--${mode}`]: Boolean(mode),
      [`${GlobalCSSClass.TextAlignBase}--${align}`]: Boolean(align),
      'iress--no-gutter': noGutter,
    })}
    data-testid={dataTestId}
  >
    {children}
  </Tag>
);

/** @deprecated IressText.Mode is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressText.Mode = TextMode;

/** @deprecated IressText.Element is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressText.Element = TextElement;

/** @deprecated IressText.Align is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressText.Align = TextAlign;

/** @deprecated IressText.Variant is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressText.Variant = TextVariant;
