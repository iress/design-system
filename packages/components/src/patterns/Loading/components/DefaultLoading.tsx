import { type ReactNode, useEffect, useState } from 'react';
import { IressSpinner } from '@/components/Spinner';
import { IressInline } from '@/components/Inline';
import { type IressHTMLAttributes } from '@/interfaces';
import { IressText } from '@/components/Text';
import classNames from 'classnames';
import styles from './DefaultLoading.module.scss';
import loadingStyles from '../Loading.module.scss';

export interface DefaultLoadingProps extends IressHTMLAttributes {
  /**
   * Message to display when the loading time is longer than expected.
   * @default 'This is taking longer than expected...'
   */
  children?: ReactNode;

  /**
   * Only screen readers will see this message, it is changed to the `children` message after the delay.
   * @default 'Loading...'
   */
  screenReaderText?: ReactNode;

  /**
   * Do not set the `pattern` prop when no other pattern can be applied. It will only show the loading message after a delay, and is intended for use when loading is not expected to take a long time.
   * Example use cases:
   * - Navigating between different routes
   * - Calling an API within the page that does not require a loading state
   */
  pattern?: 'default';

  /**
   * Delay in milliseconds before the message is displayed.
   * @default 3000
   */
  timeout?: number;
}

export const DefaultLoading = ({
  children = (
    <IressInline gutter="sm" verticalAlign="middle">
      <IressSpinner /> This is taking longer than expected...
    </IressInline>
  ),
  className,
  screenReaderText = 'Loading...',
  timeout = 3000,
  ...restProps
}: DefaultLoadingProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => setShow(true), timeout);

    return () => {
      clearTimeout(showTimeout);
    };
  }, [timeout]);

  return (
    <div
      {...restProps}
      className={classNames(
        styles.position,
        className,
        loadingStyles['fade-in'],
        {
          [loadingStyles['fade-in--active']]: show,
        },
      )}
    >
      <IressText
        className={classNames(styles.message, loadingStyles['slide-in'], {
          [loadingStyles['slide-in--active']]: show,
        })}
      >
        {show ? children : screenReaderText}
      </IressText>
    </div>
  );
};
