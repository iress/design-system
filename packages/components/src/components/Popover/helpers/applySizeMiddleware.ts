/**
 * Applies the size middleware styles to the floating element.
 *
 * Sets the floating element's width to match the reference element's width,
 * and constrains the maxHeight to the available space. The maxHeight is always
 * applied to ensure the dropdown does not overflow its container when space is
 * limited — preventing the cut-off behaviour reported when RichSelect is used
 * inside a scrollable container.
 *
 * Previously, maxHeight was only applied when `availableHeight > 200px`
 * (POPOVER_USE_MAX_HEIGHT). When space was limited (≤ 200px), no maxHeight was
 * set, causing the dropdown to use its default CSS max-height (30rem) and
 * overflow the container without providing a scrollbar.
 */
export const applySizeMiddlewareStyles = (
  floatingStyle: CSSStyleDeclaration,
  referenceWidth: number,
  availableHeight: number,
): void => {
  Object.assign(floatingStyle, {
    width: `${referenceWidth}px`,
    // Always apply maxHeight so the dropdown is constrained to the available space.
    // This ensures the dropdown doesn't overflow its container and provides scroll
    // when space is limited.
    maxHeight: `${availableHeight}px`,
  });
};
