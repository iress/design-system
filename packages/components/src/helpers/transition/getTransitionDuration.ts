import { timeStringToNumber } from '@helpers/transition/timeStringToNumber';

export const getTransitionDuration = (
  element?: HTMLElement | null,
  multiplier = 0.8,
  fallback = 240,
) => {
  if (!element) return fallback;

  return (
    timeStringToNumber(
      window
        .getComputedStyle(element, null)
        ?.getPropertyValue('transition-duration') || '.3s',
    ) * multiplier || fallback
  );
};
