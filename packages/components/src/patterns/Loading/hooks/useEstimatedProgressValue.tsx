import { type IressProgressProps } from '@/components/Progress/Progress.types';
import { useEffect, useMemo, useState } from 'react';

/**
 * This hook is used to calculate the estimated progress of a loading component, allowing you to show an animated progress bar even when real progress is not available.
 *
 * @param estimatedFinishTime - The estimated time in milliseconds for the loading to finish.
 * @param isLoaded - A boolean value that determines if the component waiting to be loaded has finished loading.
 * @param progress - If provided, will use this as the progress value. If not provided, will use the `estimatedFinishTime` to calculate the progress.
 * @param latestMessageTimecode - The latest timecode of the message list. It helps us determine if still in progress, particularly when its higher than the estimated finish time.
 * @returns A number value that represents the current progress of the loading component.
 */
export const useEstimatedProgressValue = (
  estimatedFinishTime: number,
  isLoaded = false,
  progress?: IressProgressProps['value'],
  latestMessageTimecode = 0,
) => {
  const [progressValue, setProgressValue] = useState(progress ?? 0);

  const isTrackingProgress = useMemo(() => {
    return (
      !isLoaded &&
      !progress &&
      isProgressing(progressValue, estimatedFinishTime, latestMessageTimecode)
    );
  }, [
    estimatedFinishTime,
    latestMessageTimecode,
    isLoaded,
    progress,
    progressValue,
  ]);

  useEffect(() => {
    if (!isTrackingProgress && progressValue < estimatedFinishTime) {
      setProgressValue(estimatedFinishTime);
      return;
    }

    const startTime = performance.now();

    const animate = () => {
      const elapsed = Math.max(performance.now() - startTime, 0);
      const newProgress = progressValue + elapsed;

      setProgressValue(newProgress);

      if (
        isProgressing(newProgress, estimatedFinishTime, latestMessageTimecode)
      ) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [
    estimatedFinishTime,
    isTrackingProgress,
    latestMessageTimecode,
    progressValue,
  ]);

  if (progress !== undefined) {
    return isLoaded ? estimatedFinishTime : progress;
  }

  return progressValue;
};

/**
 * This function checks if the loading process is still in progress.
 * It compares the current progress value with the estimated finish time and the latest message timecode.
 * If the progress value is less than either of these values, it returns true, indicating that the loading is still in progress.
 * Otherwise, it returns false.
 */
const isProgressing = (
  progressValue: number,
  estimatedFinishTime: number,
  latestMessageTimecode: number,
) => {
  return (
    progressValue < estimatedFinishTime || progressValue < latestMessageTimecode
  );
};
