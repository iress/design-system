import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { IressSkeleton } from '@/components/Skeleton';
import { IressSpinner } from '@/components/Spinner';
import { IressHide } from '@/components/Hide';
import styles from './ComponentLoading.module.scss';
import loadingStyles from '../Loading.module.scss';
import classNames from 'classnames';
import { type IressHTMLAttributes } from '@/interfaces';
import { IressText } from '@/components/Text';

const templates = {
  chart: <IressSkeleton mode="rect" height="250px" />,
};

export interface ComponentLoadingProps extends IressHTMLAttributes {
  /**
   * The chart that is being loaded for the first time or being refreshed/updated.
   */
  children: ReactNode;

  /**
   * If set to `true`, will hide the skeleton and display the chart.
   */
  loaded?: boolean;

  /**
   * Use `pattern="component"` for the following use cases:
   * - Component that is expected to be slow to load, such as a chart, table or large graphic.
   * - Component that can be refreshed/updated with new data.
   */
  pattern?: 'component';

  /**
   * Only screen readers will see this message, it is changed to the `message` after the delay.
   * @default 'Loading...'
   */
  screenReaderText?: ReactNode;

  /**
   * Which template to use as the skeleton, or you can use a ReactNode to customise the skeleton completely.
   * @default 'chart'
   */
  template?:
    | keyof typeof templates
    | Exclude<ReactNode, string | number | boolean | null>;

  /**
   * Set the timeouts for showing the skeleton and update messages.
   */
  timeout?: {
    /**
     * The time in milliseconds before the skeleton is displayed.
     * @default 0
     */
    skeleton?: number;

    /**
     * The time in milliseconds before the update message is displayed.
     * @default 1000
     */
    update?: number;
  };

  /**
   * Set the chart to be updated. If a `ReactNode` is provided, it will be displayed as the message.
   * If set to `true`, will display the default message `Updating...`.
   */
  update?: ReactNode;
}

export const ComponentLoading = ({
  children,
  className,
  loaded,
  screenReaderText = 'Loading...',
  template = 'chart',
  timeout,
  update,
  ...restProps
}: ComponentLoadingProps) => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const skeleton = useMemo(() => {
    if (typeof template === 'string' && template in templates) {
      return templates[template as keyof typeof templates];
    }

    return template;
  }, [template]);

  useEffect(() => {
    if (loaded === true) {
      setShowSkeleton(false);
    }
  }, [loaded]);

  useEffect(() => {
    const showTimeout = setTimeout(
      () => setShowSkeleton(true),
      timeout?.skeleton ?? 0,
    );

    return () => {
      clearTimeout(showTimeout);
    };
  }, [timeout?.skeleton]);

  useEffect(() => {
    if (!update) {
      return;
    }

    setShowUpdate(false);

    const showTimeout = setTimeout(
      () => setShowUpdate(true),
      timeout?.update ?? 1000,
    );

    return () => {
      clearTimeout(showTimeout);
    };
  }, [timeout?.update, update]);

  useEffect(() => {
    if (!update && showUpdate) {
      setShowUpdate(false);
    }
  }, [update, showUpdate]);

  if (loaded !== true) {
    return (
      <div
        className={classNames(
          styles.root,
          className,
          loadingStyles['fade-in'],
          {
            [loadingStyles['fade-in--active']]: showSkeleton,
          },
        )}
        {...restProps}
      >
        {skeleton}
        <IressHide hiddenOn={{ xs: true }} visuallyHidden>
          {screenReaderText}
        </IressHide>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.root, styles.loaded, className)}
      {...restProps}
    >
      {children}
      {update && (
        <div
          className={classNames(styles.overlay, {
            [styles.overlayStrong]: showUpdate,
          })}
        />
      )}
      {update && (
        <IressText
          className={classNames(styles.message, loadingStyles['fade-in'], {
            [loadingStyles['fade-in--active']]: showUpdate,
          })}
        >
          <IressSpinner className={styles.spinner} />{' '}
          {typeof update === 'boolean' ? 'Updating...' : update}
        </IressText>
      )}
    </div>
  );
};
