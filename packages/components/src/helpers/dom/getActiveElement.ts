import { hasShadowDom } from '@helpers/dom/hasShadowDom';

export const getActiveElement = () => {
  const activeEle = document.activeElement as HTMLElement;
  if (!hasShadowDom(activeEle)) return activeEle || undefined;
  return (activeEle?.shadowRoot?.activeElement as HTMLElement) || undefined;
};
