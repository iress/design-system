/**
 * Safely calls the closest method on an element, handling cases where the element
 * might not have the closest method (e.g., in jsdom environments)
 */
export const safeClosest = (
  element: Element | null,
  selector: string,
): Element | null => {
  if (
    !element ||
    !('closest' in element) ||
    typeof element.closest !== 'function'
  ) {
    return null;
  }

  try {
    return element.closest(selector);
  } catch {
    return null;
  }
};
