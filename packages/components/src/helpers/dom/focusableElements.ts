import { FOCUSABLE_QUERY_SELECTOR } from '@/constants';

export const focusableElements = (el: HTMLElement): HTMLElement[] => {
  const focusableContent = el?.querySelectorAll<HTMLElement>(
    FOCUSABLE_QUERY_SELECTOR,
  );
  return Array.from(focusableContent);
};
