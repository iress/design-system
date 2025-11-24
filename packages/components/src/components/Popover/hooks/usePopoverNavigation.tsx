import { useEffect, useMemo, useRef, useState } from 'react';
import {
  type FloatingContext,
  type UseListNavigationProps,
  type VirtualElement,
  useListNavigation,
} from '@floating-ui/react';
import { type IressPopoverProps } from '../Popover';

/**
 * This is a wrapper around the useListNavigation hook from Floating UI, which is used to manage the keyboard navigation of popover items.
 * It stores the active index of the popover items, and provides the necessary props to the popover context to manage the focus state of the popover items.
 *
 * See: https://floating-ui.com/docs/useListNavigation
 *
 * @param {FloatingContext<RT>} context the popover context
 * @param {IressPopoverProps['type']} type the type of popover, whether it is a menu, listbox, etc.
 * @param {Partial<UseListNavigationProps>} props props that are passed to the useListNavigation hook
 * @param {(activeIndex: number | null) => void} onNavigate called when the useListNavigation onNavigate is called
 * @param {number} startIndex Which index to start the focus on when the popover is opened. The index must exist in the list of items, otherwise it will not work.
 */
export const usePopoverNavigation = <
  RT extends VirtualElement = HTMLButtonElement,
>(
  context: FloatingContext<RT>,
  type?: IressPopoverProps['type'],
  props?: Partial<UseListNavigationProps>,
  onNavigate?: (activeIndex: number | null) => void,
  startIndex = 0,
) => {
  const usesArrowKeyNav = useMemo(
    () => !!(type && ['menu', 'listbox'].includes(type)),
    [type],
  );
  const focusOnInitialRender = useMemo(() => {
    if (usesArrowKeyNav) return props?.focusItemOnOpen;
    return false;
  }, [props?.focusItemOnOpen, usesArrowKeyNav]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (context.open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- This state is intentionally synced to context.open only on open/close.
      setActiveIndex(focusOnInitialRender ? startIndex : null);
    } else {
      setActiveIndex(null);
    }
  }, [context.open, focusOnInitialRender, startIndex]);

  const list = useRef<(HTMLElement | null)[]>([]);
  const virtualItem = useRef<HTMLElement | null>(null);

  const listNav = useListNavigation(context, {
    ...props,
    activeIndex,
    enabled: usesArrowKeyNav,
    focusItemOnHover: false,
    listRef: list,
    loop: type === 'menu',
    onNavigate: (newActiveIndex) => {
      setActiveIndex(newActiveIndex);
      onNavigate?.(newActiveIndex);
    },
    virtualItemRef: virtualItem,
  });

  return {
    activeIndex,
    list,
    listNav,
    setActiveIndex,
  };
};
