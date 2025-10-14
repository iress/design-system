import { type ReactNode, useEffect, useState } from 'react';
import { IressSpinner } from '@/components/Spinner';
import { IressInline } from '@/components/Inline';
import { IressText } from '@/components/Text';
import { loading } from '../Loading.styles';
import { type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { cx } from '@/styled-system/css';

export interface DefaultLoadingProps extends IressStyledProps {
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
    <IressInline gap="sm" verticalAlign="middle">
      <IressSpinner /> This is taking longer than expected...
    </IressInline>
  ),
  className,
  screenReaderText = 'Loading...',
  timeout = 3000,
  ...restProps
}: DefaultLoadingProps) => {
  const [show, setShow] = useState(false);

  const styles = loading({
    pattern: 'default',
    showIndicator: show,
  });

  useEffect(() => {
    const showTimeout = setTimeout(() => setShow(true), timeout);

    return () => {
      clearTimeout(showTimeout);
    };
  }, [timeout]);

  return (
    <styled.div {...restProps} className={cx(styles.root, className)}>
      <IressText className={styles.message}>
        {show ? children : screenReaderText}
      </IressText>
    </styled.div>
  );
};
