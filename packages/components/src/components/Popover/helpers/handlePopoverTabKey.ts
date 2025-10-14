import { tabbable } from 'tabbable';
import { FOCUSABLE_QUERY_SELECTOR } from '@/constants';
import { focusableElements } from '@helpers/dom/focusableElements';
import { KeyboardEvent } from 'react';
import { PopoverHookReturn } from '../hooks/usePopover';
import { waitUntilTrue } from './waitUntilTrue';

/**
 * This helper function is used to handle the tab key press event when the popover is open, as Floating UI sometimes does not focus on the next element when the user tabs from the popover contents.
 * @param popover {PopoverHookReturn} The popover context value, usually retrieved from the usePopover hook.
 * @param e {KeyboardEvent} The keyboard event object that triggered the tab key press.
 */
export const handlePopoverTabKey = async (
  popover: PopoverHookReturn,
  e: KeyboardEvent,
) => {
  if (e.key !== 'Tab') {
    return;
  }

  const reference = popover.api.elements.reference as HTMLElement;

  if (!reference) {
    return;
  }

  let focusableReference = reference;

  if (!focusableReference.matches(FOCUSABLE_QUERY_SELECTOR)) {
    const internalFocusableElements = focusableElements(reference);
    focusableReference =
      internalFocusableElements[internalFocusableElements.length - 1];
  }

  if (e.shiftKey) {
    popover.setShow(false);
    focusableReference.focus();
  }

  if (!e.shiftKey) {
    popover.setShowWithReason(false);
    const elements = tabbable(document.documentElement).filter(
      (element) =>
        !popover.api.elements.floating?.contains(element) &&
        !element.hasAttribute('data-floating-ui-focus-guard'),
    );
    const currentIndex = elements.indexOf(focusableReference);
    const nextElement = elements[currentIndex + 1];

    if (currentIndex === -1 || !nextElement) return;

    // The next element will not be focused until data-floating-ui-inert has been removed
    await waitUntilTrue(
      () => !nextElement.hasAttribute('data-floating-ui-inert'),
    );

    nextElement.focus();
  }
};
