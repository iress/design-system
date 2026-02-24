import { type KeyboardEvent, type FocusEvent, useCallback } from 'react';
import type { IressUnstyledProps } from '@/types';
import type { FloatingPopoverHookReturn } from './useFloatingPopover';

/**
 * This adds additional props to the activator to handle keyboard interactions with a virtually focused item.
 *
 * @param {FloatingPopoverHookReturn} popover the popover context
 * @param {HTMLAttributes<HTMLElement>} referenceProps the props of the activator, allowing them to be drilled down to the virtual reference
 *
 * @returns {IressUnstyledProps} the props to be passed to the floating content
 */
export const usePopoverActivatorInteractions = <
  E extends keyof HTMLElementTagNameMap = 'div',
>(
  popover?: FloatingPopoverHookReturn,
  referenceProps?: Omit<IressUnstyledProps<E>, 'value'>,
) => {
  // This will call the onBlur method of the currently virtual focused node.
  const handleBlur = useCallback(
    (e: FocusEvent<never>) => {
      referenceProps?.onBlur?.(e);
    },
    [referenceProps],
  );

  // This will call appropriate methods of the currently virtual focused node.
  // It will also close the popover if the user presses the arrow key on the first item and open it if they press the arrow down key on the activator.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElementTagNameMap[E]>) => {
      if (popover?.show) {
        handleKeyDownWhenShown(e, popover);
      } else if (popover) {
        handleKeyDownWhenHidden(e, popover);
      }

      referenceProps?.onKeyDown?.(e as KeyboardEvent<never>);
    },
    [referenceProps, popover],
  );

  return {
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };
};

const handleKeyDownWhenShown = (
  e: KeyboardEvent<HTMLElement>,
  popover?: FloatingPopoverHookReturn,
) => {
  const popoverIsVirtual = popover?.getVirtualFocus !== undefined;
  popover?.getVirtualFocus?.()?.onKeyDown?.(e);

  if (e.key === 'Tab') {
    popover?.getVirtualFocus?.()?.onBlur?.(e);

    if (popover?.getVirtualFocus) {
      popover?.setShowWithReason(false, e.nativeEvent, 'focus');
    }
  }

  if (e.key === 'Escape') {
    popover?.setShowWithReason(false, e.nativeEvent, 'escape-key');
  }

  if (e.key === 'PageUp' && popoverIsVirtual) {
    popover.setActiveIndex(0);
  }

  if (e.key === 'PageDown' && popoverIsVirtual) {
    const lastIndex = Math.max(popover?.list.current.length - 1, 0);
    popover.setActiveIndex(lastIndex);
  }

  // TODO: This is a workaround for the issue where the caret does not move when pressing the right arrow key in an input field.
  // This should be removed once the issue is fixed in Floating UI, or we have reviewed our implementation of the popover.
  // @jira WAF-852
  if (
    e.key === 'ArrowRight' &&
    e.isDefaultPrevented() &&
    e.target instanceof HTMLInputElement &&
    e.target.value?.length
  ) {
    const input = e.target;
    const position = input.selectionStart ?? 0;
    if (position < input.value.length) {
      input.setSelectionRange(position + 1, position + 1);
    }
  }
};

const handleKeyDownWhenHidden = (
  e: KeyboardEvent<HTMLElement>,
  popover?: FloatingPopoverHookReturn,
) => {
  const openKey = popover?.nested ? 'ArrowRight' : 'ArrowDown';
  if (e.key === openKey) {
    popover?.setShowWithReason(true, e.nativeEvent, 'focus');
  }
};
