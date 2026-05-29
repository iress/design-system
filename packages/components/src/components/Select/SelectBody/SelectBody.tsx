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

/**
 * Container for the select dropdown content, with optional fixed header and footer slots.
 *
 * @example
 * ```tsx
 * import { IressSelectBody } from '@iress-oss/ids-components';
 *
 * <IressSelectBody header={<span>Header</span>} footer={<span>Footer</span>}>
 *   Content
 * </IressSelectBody>
 * ```
 */
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
      className={cx(className, classes.selectBody, GlobalCSSClass.SelectBody)}
    >
      {header && <div>{header}</div>}
      <div className={classes.children}>{children}</div>
      {footer && <div>{footer}</div>}
    </IressText>
  );
};

IressSelectBody.displayName = 'IressSelectBody';
