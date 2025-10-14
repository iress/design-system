import { useEffect } from 'react';
import { type MenuAriaHookProps, type MenuAriaHookReturn } from '..';
import { usePopover } from '@/components/Popover/hooks/usePopover';

/**
 * Calculate aria attributes based on the props of the IressMenu
 * Inside a popover, it will also change the aria-controls of the popover's activator.
 *
 * TODO: Change to a helper and pass popover as an argument
 *
 * @param {MenuAriaHookProps} props A subset of `IressMenuProps` that describe the expected interaction and state of the menu.
 * @returns aria-* attributes to help screen readers understand how to interact with the menu and its current state.
 */
export const useMenuAria = ({
  id,
  layout = 'stack',
  multiSelect,
  role,
}: MenuAriaHookProps): MenuAriaHookReturn => {
  const popover = usePopover();
  const orientation = layout === 'stack' ? 'vertical' : 'horizontal';

  useEffect(() => {
    if (popover?.toggleAriaControls && id) {
      popover.toggleAriaControls(id, true);
    }

    return () => {
      if (popover?.toggleAriaControls && id) {
        popover.toggleAriaControls(id, false);
      }
    };
  }, [id, popover]);

  return {
    'aria-multiselectable':
      role === 'listbox' && multiSelect === true ? true : undefined,
    'aria-orientation': role === 'menu' ? orientation : undefined,
  };
};
