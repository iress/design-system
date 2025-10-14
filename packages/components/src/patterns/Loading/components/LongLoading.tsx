import { IressStack } from '@/components/Stack';
import { type ReactNode, useId, useMemo } from 'react';
import { IressText } from '@/components/Text';
import { IressPanel } from '@/components/Panel';
import { IressProgress, type IressProgressProps } from '@/components/Progress';
import { propagateTestid } from '@/helpers/utility/propagateTestid';
import { useShowIndicator } from '../hooks/useShowIndicator';
import { useEstimatedProgressValue } from '../hooks/useEstimatedProgressValue';
import { type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { cx } from '@/styled-system/css';
import { loading, loadingList } from '../Loading.styles';

export interface LongLoadingProps extends IressStyledProps {
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
    props: Pick<IressProgressProps, 'max' | 'sectionTitle' | 'value'>,
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

interface ListItemProps {
  message: ReactNode;
  current: boolean;
  finished: boolean;
}

const ListItem = ({ message, current, finished }: ListItemProps) => {
  const titleId = useId();
  const styles = loadingList({ finished });

  return (
    <li className={styles.item}>
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
        aria-hidden="true"
      >
        <circle
          className={styles.marker}
          cx="26"
          cy="26"
          r="10"
          fill="currentColor"
          stroke="none"
        />
      </svg>
      {finished && (
        <svg
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          aria-labelledby={titleId}
        >
          <title id={titleId}>Finished: </title>
          <circle
            className={styles.circle}
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className={styles.tick}
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      )}
      {message}
      {current && (
        <span className={styles.dots}>
          <IressText srOnly>...</IressText>
        </span>
      )}
    </li>
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
  renderProgress = (props) => (
    <IressProgress {...props} color="colour.primary.fill" />
  ),
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
  const styles = loading({
    pattern: 'long',
    showIndicator,
    loaded,
    error: !!error,
  });
  const listStyles = loadingList();

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
    <styled.div {...restProps} className={cx(styles.root, className)}>
      <IressPanel
        data-testid={propagateTestid(restProps['data-testid'], 'panel')}
        bg="transparent"
      >
        {error ?? (
          <IressStack gap="md">
            {children}
            {renderProgress({
              max: estimatedFinishTime,
              value: Math.min(progressValue, estimatedFinishTime),
              sectionTitle: `${(Math.min(progressValue, estimatedFinishTime) / estimatedFinishTime) * 100}% loaded`,
            })}
            <IressText textStyle="typography.body.lg" noGutter>
              <ul className={listStyles.root}>
                {checkListItems.map(({ timecode, ...checkListItem }) => (
                  <ListItem key={timecode} {...checkListItem} />
                ))}
              </ul>
            </IressText>
          </IressStack>
        )}
      </IressPanel>
    </styled.div>
  );
};
