export const hasShadowDom = (el: HTMLElement) => {
  return !!el && !!el.shadowRoot && !!el.attachShadow;
};
