import { getActiveElement } from '@helpers/dom/getActiveElement';
import { KeyboardEvent, CSSProperties } from 'react';
import { handlePopoverTabKey } from './handlePopoverTabKey';
import { DisplayModes, IressUnstyledProps } from '@/types';
import { PopoverHookReturn } from '../hooks/usePopover';

/**
 * This adds additional props to the Floating UI floatingProps to better suit the requirements of IressPopover.
 * Some are slight tweaks to the UX to ensure it behaves according to IDS standards, as well as fix some issues found when using Floating UI.
 *
 * See: https://floating-ui.com/docs/useFloating#floatingstyles
 *
 * @param {PopoverHookReturn} popover the popover context
 * @param {DisplayModes} displayMode how the content is to be displayed, whether inline (static, underneath activator) or overlay (floating, anchored to the activator)
 * @param {CSSProperties} style any custom styles for the popover, it will be appended to the Floating UI styles
 * @param {string} customId optional custom ID to override the floating ID - used to prevent ID conflicts
 * @returns {IressUnstyledProps} the props to be passed to the floating content
 */
export const composePopoverFloatingProps = (
  popover: PopoverHookReturn,
  displayMode?: DisplayModes,
  style?: CSSProperties,
  customId?: string,
): IressUnstyledProps => {
  const role = popover?.hasInnerRole() ? undefined : popover?.type;
  const useAriaOrientation = role && ['listbox', 'menu', 'tree'].includes(role);
  const useAriaActiveDescendant =
    role && ['application', 'combobox', 'composite', 'group'].includes(role);

  const isInline = displayMode === 'inline';

  // This fixes an issue with Floating UI where the first item in the list is not focused when the popover is opened (intermittently)
  const onFocus = () => {
    setTimeout(() => {
      if (
        getActiveElement() === popover.api.elements.floating &&
        !popover.getVirtualFocus
      ) {
        popover.list.current?.[0]?.focus();
      }
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      void handlePopoverTabKey(popover, e);
    }

    if (e.key === 'PageUp' && !popover?.isVirtualFocus) {
      popover.list.current[0]?.focus();
    }

    if (e.key === 'PageDown' && !popover?.isVirtualFocus) {
      const lastIndex = Math.max(popover?.list.current.length - 1, 0);
      popover.list.current[lastIndex]?.focus();
    }

    handleArrowUpKey(popover, e);
  };

  const floatingProps = popover.interactions.getFloatingProps({
    onFocus,
    onKeyDown,
  }) as IressUnstyledProps;

  return {
    ...floatingProps,
    'aria-activedescendant': useAriaActiveDescendant
      ? floatingProps?.['aria-activedescendant']
      : undefined,
    'aria-orientation': useAriaOrientation
      ? floatingProps?.['aria-orientation']
      : undefined,
    id: customId ?? popover?.api?.context?.floatingId,
    role,
    style: {
      ...style,
      ...(isInline ? {} : popover?.api?.floatingStyles),
    },
  };
};

// This closes the popover when the first item in the listbox is focused and the up arrow key is pressed
const handleArrowUpKey = (popover: PopoverHookReturn, e: KeyboardEvent) => {
  if (
    popover.type !== 'listbox' ||
    e.key !== 'ArrowUp' ||
    popover.activeIndex !== 0
  ) {
    return;
  }

  popover.setShowWithReason(false, e.nativeEvent, 'list-navigation');
};
