import { cx } from '@/styled-system/css';
import { selectBody } from './SelectBody.styles';
import { GlobalCSSClass } from '@/enums';

import { type ReactNode } from 'react';
import { IressText, type IressTextProps } from '@/components/Text';

export interface IressSelectBodyProps extends Omit<IressTextProps, 'element'> {
  /**
   * Footer of the select, it will render as fixed (pinned).
   */
  footer?: ReactNode;

  /**
   * Header of the select, it will render as fixed (pinned).
   */
  header?: ReactNode;
}

export const IressSelectBody = ({
  children,
  className,
  footer,
  header,
  ...restProps
}: IressSelectBodyProps) => {
  const classes = selectBody();

  return (
    <IressText
      {...restProps}
      className={cx(
        className,
        classes.selectBody,
        GlobalCSSClass.RichSelectBody,
      )}
    >
      {header && <div>{header}</div>}
      <div className={classes.children}>{children}</div>
      {footer && <div>{footer}</div>}
    </IressText>
  );
};
