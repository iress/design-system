import { IressText } from '@/main';
import { type IressSelectBodyProps } from './SelectBody.types';
import styles from './SelectBody.module.scss';
import classNames from 'classnames';

export const IressSelectBody = ({
  children,
  className,
  footer,
  header,
  ...restProps
}: IressSelectBodyProps) => {
  return (
    <IressText
      {...restProps}
      className={classNames(className, styles.selectBody)}
    >
      {header && <div>{header}</div>}
      <div className={styles.children}>{children}</div>
      {footer && <div>{footer}</div>}
    </IressText>
  );
};
