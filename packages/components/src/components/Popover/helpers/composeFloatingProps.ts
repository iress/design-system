import { getActiveElement } from '@helpers/dom/getActiveElement';
import type React from 'react';
import { type PopoverContextValue } from '../Popover.types';
import { type DisplayModes, type IressHTMLAttributes } from '@/main';
import { handlePopoverTabKey } from './handlePopoverTabKey';

/**
 * This adds additional props to the Floating UI floatingProps to better suit the requirements of IressPopover.
 * Some are slight tweaks to the UX to ensure it behaves according to IDS standards, as well as fix some issues found when using Floating UI.
 *
 * See: https://floating-ui.com/docs/useFloating#floatingstyles
 *
 * @param {PopoverContextValue} popover the popover context
 * @param {DisplayModes} displayMode how the content is to be displayed, whether inline (static, underneath activator) or overlay (floating, anchored to the activator)
 * @param {React.CSSProperties} style any custom styles for the popover, it will be appended to the Floating UI styles
 * @returns {IressHTMLAttributes} the props to be passed to the floating content
 */
export const composePopoverFloatingProps = (
  popover: PopoverContextValue,
  displayMode?: DisplayModes,
  style?: React.CSSProperties,
): IressHTMLAttributes => {
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
    const popoverIsVirtual = popover.getVirtualFocus !== undefined;

    if (e.key === 'Tab') {
      void handlePopoverTabKey(popover, e);
    }

    if (e.key === 'PageUp' && !popoverIsVirtual) {
      popover.list.current[0]?.focus();
    }

    if (e.key === 'PageDown' && !popoverIsVirtual) {
      const lastIndex = Math.max(popover?.list.current.length - 1, 0);
      popover.list.current[lastIndex]?.focus();
    }

    if (!popover.disabledAutoToggle) {
      handleArrowUpKey(popover, e);
    }
  };

  const floatingProps = popover.interactions.getFloatingProps({
    onFocus,
    onKeyDown,
  }) as IressHTMLAttributes;

  return {
    ...floatingProps,
    'aria-activedescendant': useAriaActiveDescendant
      ? floatingProps?.['aria-activedescendant']
      : undefined,
    'aria-orientation': useAriaOrientation
      ? floatingProps?.['aria-orientation']
      : undefined,
    role,
    style: {
      ...style,
      ...(isInline ? {} : popover?.api?.floatingStyles),
    },
  };
};

// This closes the popover when the first item in the listbox is focused and the up arrow key is pressed
const handleArrowUpKey = (
  popover: PopoverContextValue,
  e: React.KeyboardEvent,
) => {
  if (
    popover.type !== 'listbox' ||
    e.key !== 'ArrowUp' ||
    popover.activeIndex !== 0
  ) {
    return;
  }

  popover.setShowWithReason(false, e.nativeEvent, 'list-navigation');
};
