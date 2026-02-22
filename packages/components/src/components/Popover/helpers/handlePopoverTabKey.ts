import { tabbable } from 'tabbable';
import { FOCUSABLE_QUERY_SELECTOR } from '@/constants';
import { focusableElements } from '@helpers/dom/focusableElements';
import { type KeyboardEvent } from 'react';
import { type FloatingPopoverHookReturn } from '../hooks/useFloatingPopover';
import { waitUntilTrue } from './waitUntilTrue';

const handleShiftTabWithInnerRole = (
  popover: FloatingPopoverHookReturn,
  focusableReference: HTMLElement,
) => {
  popover.setShow(false);
  focusableReference.focus();
};

const handleShiftTabWithoutInnerRole = (
  popover: FloatingPopoverHookReturn,
  focusableReference: HTMLElement,
) => {
  const innerElements = tabbable(document.documentElement).filter((element) =>
    popover.api.elements.floating?.contains(element),
  );
  const firstInnerElement = innerElements[0];

  if (document.activeElement !== firstInnerElement) return;

  popover.setShow(false);
  focusableReference.focus();
};

const handleTabWithInnerRole = async (
  popover: FloatingPopoverHookReturn,
  focusableReference: HTMLElement,
) => {
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

  setTimeout(() => nextElement.focus());
};

const handleTabWithoutInnerRole = (
  popover: FloatingPopoverHookReturn,
  e: KeyboardEvent,
) => {
  const innerElements = tabbable(document.documentElement).filter((element) =>
    popover.api.elements.floating?.contains(element),
  );
  const lastInnerElement = innerElements[innerElements.length - 1];

  if (document.activeElement !== lastInnerElement) return;

  popover.setShowWithReason(false, e as never, 'focus-out');
};

/**
 * This helper function is used to handle the tab key press event when the popover is open, as Floating UI sometimes does not focus on the next element when the user tabs from the popover contents.
 * @param popover {FloatingPopoverHookReturn} The popover context value, usually retrieved from the usePopover hook.
 * @param e {KeyboardEvent} The keyboard event object that triggered the tab key press.
 */
export const handlePopoverTabKey = async (
  popover: FloatingPopoverHookReturn,
  e: KeyboardEvent,
) => {
  if (e.key !== 'Tab') {
    return;
  }

  const reference = popover.api.elements.reference as HTMLElement;
  const hasInnerRole = popover.hasInnerRole();

  if (!reference) {
    return;
  }

  let focusableReference = reference;

  if (!focusableReference.matches(FOCUSABLE_QUERY_SELECTOR)) {
    const internalFocusableElements = focusableElements(reference);
    focusableReference =
      internalFocusableElements[internalFocusableElements.length - 1];
  }

  if (e.shiftKey && hasInnerRole) {
    handleShiftTabWithInnerRole(popover, focusableReference);
  }

  if (e.shiftKey && !hasInnerRole) {
    handleShiftTabWithoutInnerRole(popover, focusableReference);
  }

  if (!e.shiftKey && hasInnerRole) {
    await handleTabWithInnerRole(popover, focusableReference);
  }

  if (!e.shiftKey && !hasInnerRole) {
    handleTabWithoutInnerRole(popover, e);
  }
};
