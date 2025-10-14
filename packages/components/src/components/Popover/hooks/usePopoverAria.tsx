import { useCallback, useRef } from 'react';

export interface PopoverAriaHookReturn {
  getAriaControls: () => string[];
  toggleAriaControls: (id: string, addOrRemove?: boolean) => void;
}

/**
 * This is a hook that manages the aria controls for the popover, allowing the popover activator to control multiple items.
 * @returns getAriaControls and toggleAriaControls functions
 */
export function usePopoverAria(): PopoverAriaHookReturn {
  // Using a ref, so it doesn't trigger re-renders
  const ariaControls = useRef<string[]>([]);

  const toggleAriaControls = useCallback(
    (controlId: string, addOrRemove = true) => {
      if (addOrRemove && !ariaControls.current.includes(controlId)) {
        ariaControls.current = [...ariaControls.current, controlId];
      }

      if (!addOrRemove && ariaControls.current.includes(controlId)) {
        ariaControls.current = ariaControls.current.filter(
          (currentId) => controlId !== currentId,
        );
      }
    },
    [],
  );

  return {
    getAriaControls: () => ariaControls.current,
    toggleAriaControls,
  };
}
