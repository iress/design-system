import { toCSSLengthValue } from '@helpers/formatting/toCSSLengthValue';
import { type IressStyledProps } from '@/types';
import { type ReactNode } from 'react';
import { cx } from '@/styled-system/css';
import { placeholder } from './Placeholder.styles';
import { IressText } from '../Text';
import { GlobalCSSClass } from '@/enums';

export interface IressPlaceholderProps extends Omit<IressStyledProps, 'width'> {
  /**
   * Description of the placeholder's envisioned contents.
   */
  children?: ReactNode;

  /**
   * Sets the height of the placeholder.
   */
  height?: string | number;

  /**
   * Sets the placeholder to be full width if true.
   */
  stretch?: boolean;

  /**
   * Sets the width of the placeholder.
   */
  width?: string | number;
}

export const IressPlaceholder = ({
  children,
  className,
  height = 'auto',
  stretch,
  style,
  width = 'auto',
  ...restProps
}: IressPlaceholderProps) => {
  const autoHeight = stretch ? '100%' : height;
  const placeholderHeight =
    height === 'auto' ? autoHeight : toCSSLengthValue(height);
  const classes = placeholder();

  return (
    <IressText
      className={cx(className, classes.root, GlobalCSSClass.Placeholder)}
      {...restProps}
      style={{
        ...style,
        width: width ? toCSSLengthValue(width) : style?.width,
        height: placeholderHeight,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className={classes.svg}>
        <line x1="0" y1="0" x2="100%" y2="100%" className={classes.line}></line>
        <line x1="100%" y1="0" x2="0" y2="100%" className={classes.line}></line>
      </svg>
      {children}
    </IressText>
  );
};
