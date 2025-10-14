import classNames from 'classnames';
import { type IressPlaceholderProps } from './Placeholder.types';
import styles from './Placeholder.module.scss';
import { toCSSLengthValue } from '@helpers/formatting/toCSSLengthValue';

export const IressPlaceholder = ({
  children,
  className,
  height = 'auto',
  stretch,
  style,
  transparent,
  width = 'auto',
  ...restProps
}: IressPlaceholderProps) => {
  const autoHeight = stretch ? '100%' : height;
  const placeholderHeight =
    height === 'auto' ? autoHeight : toCSSLengthValue(height);

  return (
    <div
      className={classNames(className, styles.placeholder, {
        [styles.transparent]: transparent,
      })}
      {...restProps}
      style={{
        ...style,
        width: width ? toCSSLengthValue(width) : style?.width,
        height: placeholderHeight,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="100%" y2="100%"></line>
        <line x1="100%" y1="0" x2="0" y2="100%"></line>
      </svg>
      {children}
    </div>
  );
};
