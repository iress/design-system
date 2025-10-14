import { getActiveElement } from '@helpers/dom/getActiveElement';

export const hasFocus = (el: HTMLElement): boolean => {
  const activeElement = getActiveElement();
  return el && activeElement ? el.contains(activeElement) : false;
};
