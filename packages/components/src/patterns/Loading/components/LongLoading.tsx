import { IressStack } from '@/components/Stack';
import { type IressProgressProps } from '@/components/Progress/Progress.types';
import { type ReactNode, useId, useMemo } from 'react';
import classNames from 'classnames';
import styles from './LongLoading.module.scss';
import loadingStyles from '../Loading.module.scss';
import { type IressHTMLAttributes } from '@/interfaces';
import { IressText } from '@/components/Text';
import { IressPanel } from '@/components/Panel';
import { IressProgress } from '@/components/Progress';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@/helpers/utility/propagateTestid';
import { useShowIndicator } from '../hooks/useShowIndicator';
import { useEstimatedProgressValue } from '../hooks/useEstimatedProgressValue';

export interface LongLoadingProps extends IressHTMLAttributes {
  /**
   * The children are displayed while loading. This will be displayed above the progress bar and checklist.
   */
  children?: ReactNode;

  /**
   * An error to display if the loading fails. This will override the `messageList` and show an error message instead.
   */
  error?: ReactNode;

  /**
   * Estimated time in milliseconds for the loading to finish.
   * @default 10000
   */
  estimatedFinishTime?: number;

  /**
   * If set to `true`, will start hiding the loading indicator. It is recommended to use this prop if you are using the `IressLoading.shouldRender` hook to achieve a smooth loading experience.
   */
  loaded?: boolean;

  /**
   * A checklist to display while loading. The key is the time when you want the item to be checked.
   */
  messageList: Record<number, ReactNode>;

  /**
   * The long loading pattern will display a checklist of items that are being loaded.
   *
   * Use `pattern="long"` for the following use cases:
   * - Calling multiple slow APIs to load data
   * - Loading results from AI
   * - Processing a large amount of data as a queue (eg. bulk uploading or large media file uploads)
   */
  pattern?: 'long';

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
   * Set the timeouts for showing the progress bar and message.
   */
  timeout?: {
    /**
     * The time in milliseconds before this component begins to fade out (if `loaded` is set to `true`).
     * @default 1300
     */
    loaded?: number;

    /**
     * The time in milliseconds before the checklist is displayed.
     * @default 500
     */
    message?: number;
  };
}

const Checked = () => {
  const titleId = useId();

  return (
    <svg
      className={styles.checked}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      aria-labelledby={titleId}
    >
      <title id={titleId}>Finished: </title>
      <circle
        className={styles.checked__circle}
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className={styles.checked__check}
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );
};

export const LongLoading = ({
  children,
  className,
  error,
  estimatedFinishTime = 10000,
  loaded,
  messageList = {},
  progress,
  renderProgress = (props) => <IressProgress {...props} />,
  timeout,
  ...restProps
}: LongLoadingProps) => {
  const showIndicator = useShowIndicator(
    loaded,
    timeout?.message,
    timeout?.loaded ?? 1300,
  );
  const latestMessageTimecode =
    Math.max(...Object.keys(messageList).map(Number)) + 500;
  const progressValue = useEstimatedProgressValue(
    estimatedFinishTime,
    loaded,
    progress,
    latestMessageTimecode,
  );

  const currentMessageTimecode = useMemo(() => {
    const timecodes = Object.keys(messageList);
    const firstUnfinished = timecodes.findIndex(
      (timecode) => Number(timecode) > progressValue,
    );
    return loaded
      ? ''
      : (timecodes[firstUnfinished] ?? timecodes[timecodes.length - 1]);
  }, [messageList, loaded, progressValue]);

  const checkListItems = useMemo(() => {
    return Object.entries(messageList).map(([timecode, message]) => ({
      timecode: Number(timecode),
      message,
      current: timecode === currentMessageTimecode,
      finished: progressValue >= Number(timecode),
    }));
  }, [messageList, currentMessageTimecode, progressValue]);

  return (
    <div
      className={classNames(styles.root, className, loadingStyles['fade-in'], {
        [loadingStyles['fade-in--active']]: showIndicator,
      })}
      {...restProps}
    >
      <IressPanel
        data-testid={propagateTestid(restProps['data-testid'], 'panel')}
        className={classNames(styles.panel, {
          [loadingStyles.error]: !!error,
        })}
      >
        {error ?? (
          <IressStack gutter="md">
            {children}
            {renderProgress({
              className: styles.progress,
              min: 0,
              max: estimatedFinishTime,
              value: Math.min(progressValue, estimatedFinishTime),
              sectionTitle: `${(Math.min(progressValue, estimatedFinishTime) / estimatedFinishTime) * 100}% loaded`,
            })}
            <IressText variant="lead" noGutter>
              <ul className={styles.checkList}>
                {checkListItems.map((checkListItem) => (
                  <li
                    key={checkListItem.timecode}
                    className={classNames(styles.checkListItem, {
                      [styles.checkListItem__done]: checkListItem.finished,
                    })}
                  >
                    {checkListItem.finished && <Checked />}
                    {checkListItem.message}
                    {checkListItem.current && (
                      <span className={styles.dots}>
                        <span className={GlobalCSSClass.SROnly}>...</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </IressText>
          </IressStack>
        )}
      </IressPanel>
    </div>
  );
};
