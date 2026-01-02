import { useContext } from 'react';
import { FloatingPopoverContext } from './useFloatingPopover';

/**
 * Allows you to access the popover context from within a child component.
 * @returns The popover context.
 */
export const usePopover = () => useContext(FloatingPopoverContext);
