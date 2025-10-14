import { IressStack } from '@/components/Stack';
import { type IressProgressProps } from '@/components/Progress/Progress.types';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { IressProgress } from '@/components/Progress';
import classNames from 'classnames';
import styles from './StartUpLoading.module.scss';
import loadingStyles from '../Loading.module.scss';
import { IressText, type IressTextProps } from '@/components/Text';
import { type IressHTMLAttributes } from '@/interfaces';
import { propagateTestid } from '@/helpers/utility/propagateTestid';
import { useShowIndicator } from '../hooks/useShowIndicator';
import { useEstimatedProgressValue } from '../hooks/useEstimatedProgressValue';

export interface StartUpLoadingProps extends IressHTMLAttributes {
  /**
   * Message to display when the loading time is longer than expected.
   * @default 'One moment please...'
   */
  children?: ReactNode;

  /**
   * Estimated time in milliseconds for the loading to finish.
   * @default 3000
   */
  estimatedFinishTime?: number;

  /**
   * If set to `true`, will start hiding the loading indicator. It is recommended to use this prop if you are using the `IressLoading.shouldRender` hook to achieve a smooth loading experience.
   */
  loaded?: boolean;

  /**
   * A message list to display while loading. The key is the time when you want the message to change to this message.
   * If using a message list, the `children` will not be displayed.
   */
  messageList?: Record<number, ReactNode>;

  /**
   * Use `pattern="start-up"` for the following use cases:
   * - Loading an application for the first time
   * - Switching from a different application to a new application
   * - Switching from a client's website to an Iress application
   * - Switching themes
   */
  pattern?: 'start-up';

  /**
   * If provided, will use this to set the `value` of the progress bar. If not provided, will use the `estimatedFinishTime` to calculate the progress.
   */
  progress?: IressProgressProps['value'];

  /**
   * This is a render prop that allows you to override the default progress rendering.
   * This is useful if you want to use a different progress component or if you want to add additional props to the progress bar.
   */
  renderProgress?: (
    props: Pick<
      IressProgressProps,
      'className' | 'min' | 'max' | 'sectionTitle' | 'value'
    >,
  ) => ReactNode;

  /**
   * Only screen readers will see this message, it is changed to the `children` message after the delay.
   * @default 'Loading...'
   */
  screenReaderText?: ReactNode;

  /**
   * Set the timeouts for showing the progress bar and message.
   */
  timeout?: {
    /**
     * The time in milliseconds before this component begins to fade out (if `loaded` is set to `true`).
     * @default 200
     */
    loaded?: number;

    /**
     * The time in milliseconds before the message message is displayed.
     * @default 2500
     */
    message?: number;

    /**
     * The time in milliseconds before the progress bar is displayed.
     * @default 500
     */
    progress?: number;
  };
}

interface MessageProps
  extends Pick<
      StartUpLoadingProps,
      'children' | 'messageList' | 'screenReaderText'
    >,
    IressTextProps {
  progressValue: number;
  show: boolean;
}

const Message = ({
  children,
  messageList,
  progressValue,
  screenReaderText,
  show,
  ...restProps
}: MessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const messageTimecode = useMemo(() => {
    const matchingTimecodes = Object.keys(messageList ?? {}).filter(
      (timecode) => Number(timecode) <= progressValue,
    );
    return matchingTimecodes[matchingTimecodes.length - 1];
  }, [messageList, progressValue]);

  useEffect(() => {
    if (!messageRef.current) {
      return;
    }
    messageRef.current.classList.remove(loadingStyles['slide-next']);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Trigger reflow
    messageRef.current.offsetHeight;

    messageRef.current.classList.add(loadingStyles['slide-next']);
  }, [messageTimecode]);

  const staticMessage = show ? children : screenReaderText;

  return (
    <IressText
      align="center"
      className={classNames(styles.message, loadingStyles['fade-in'], {
        [loadingStyles['fade-in--active']]: show,
      })}
      {...restProps}
    >
      <div ref={messageRef}>
        {messageTimecode
          ? messageList?.[Number(messageTimecode)]
          : staticMessage}
      </div>
    </IressText>
  );
};

export const StartUpLoading = ({
  className,
  children = <IressText mode="muted">One moment please...</IressText>,
  'data-testid': dataTestId,
  estimatedFinishTime = 3000,
  loaded,
  messageList,
  progress,
  renderProgress = (props) => <IressProgress {...props} />,
  screenReaderText = 'Loading...',
  timeout,
  ...restProps
}: StartUpLoadingProps) => {
  const showIndicator = useShowIndicator(
    loaded,
    timeout?.progress,
    timeout?.loaded,
  );
  const [showMessage, setShowMessage] = useState(false);
  const latestMessageTimecode =
    Math.max(...Object.keys(messageList ?? {}).map(Number)) + 500;
  const progressValue = useEstimatedProgressValue(
    estimatedFinishTime,
    loaded,
    progress,
    latestMessageTimecode,
  );

  useEffect(() => {
    const showTimeout = setTimeout(
      () => setShowMessage(true),
      timeout?.message ?? 2500,
    );

    return () => {
      clearTimeout(showTimeout);
    };
  }, [timeout?.message]);

  return (
    <div
      data-testid={dataTestId}
      className={classNames(styles.root, className, loadingStyles['fade-in'], {
        [loadingStyles['fade-in--active']]: showIndicator,
      })}
      {...restProps}
    >
      <IressStack gutter="md" {...restProps}>
        {renderProgress({
          className: styles.progress,
          min: 0,
          max: estimatedFinishTime,
          value: Math.min(progressValue, estimatedFinishTime),
          sectionTitle: `${(Math.min(progressValue, estimatedFinishTime) / estimatedFinishTime) * 100}% loaded`,
        })}
        <Message
          data-testid={propagateTestid(dataTestId, 'message')}
          messageList={messageList}
          progressValue={progressValue}
          screenReaderText={screenReaderText}
          show={showMessage}
        >
          {children}
        </Message>
      </IressStack>
    </div>
  );
};
