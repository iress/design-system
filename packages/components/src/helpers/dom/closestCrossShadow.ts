/**
 * Finds the closest ancestor element that matches the selector, traversing across shadow DOM boundaries.
 * Similar to native Element.closest() but works across shadow DOM.
 *
 * @param element - The starting element
 * @param selector - CSS selector to match against
 * @returns The closest ancestor element matching the selector, or null if not found
 */
export const closestCrossShadow = (
  element: Element | null,
  selector: string,
): Element | null => {
  if (!element) {
    return null;
  }

  // Try native closest first
  const nativeResult = element.closest?.(selector);
  if (nativeResult) {
    return nativeResult;
  }

  // Traverse up through shadow DOM
  let current: Element | null = element;

  while (current) {
    // Check if current element matches
    if (current.matches?.(selector)) {
      return current;
    }

    // Get parent element
    let parent: Element | null = current.parentElement;

    // If no parent, check if we're in a shadow root
    if (!parent) {
      const shadowRoot = current.getRootNode();
      if (shadowRoot instanceof ShadowRoot) {
        parent = shadowRoot.host;
      } else {
        break; // Reached top of DOM tree
      }
    }

    current = parent;
  }

  return null;
};
