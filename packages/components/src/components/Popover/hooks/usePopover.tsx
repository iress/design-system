import {
  createContext,
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  ControlledStateProps,
  useControlledState,
} from '@/hooks/useControlledState';
import {
  autoPlacement,
  autoUpdate,
  flip,
  Middleware,
  offset,
  OpenChangeReason,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  UseFloatingReturn,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { usePopoverNavigation } from './usePopoverNavigation';
import { FloatingUIAligns } from '@/types';
import { PopoverVirtualNode } from './usePopoverItem';
import { focusableElements } from '@/helpers/dom/focusableElements';
import { PopoverAriaHookReturn, usePopoverAria } from './usePopoverAria';
import { closestCrossShadow } from '@/helpers/dom/closestCrossShadow';
import { GlobalCSSClass } from '@/enums';

const POPOVER_USE_MAX_HEIGHT = 200;

export interface PopoverHookProps {
  align?: FloatingUIAligns;
  autoHighlight?: boolean;
  component?: ControlledStateProps['component'];
  defaultShow?: boolean;
  focusStartIndex?: number;
  hasInputActivator?: boolean;
  matchActivatorWidth?: boolean;
  onActivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;
  onDeactivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;
  onNavigate?: (activeIndex: number | null) => void;
  show?: boolean;
  type?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  virtualFocus?: boolean;
}

export interface PopoverHookReturn extends PopoverAriaHookReturn {
  /**
   * The index of the currently active item in the popover (ie. which item is currently focused or virtually focused).
   */
  activeIndex: number | null;

  /**
   * The API returned by the useFloating hook.
   */
  api: UseFloatingReturn;

  /**
   * A function that returns the truly focusable activator element.
   * It is normally used to set the focus on the activator when the popover is closed and ensure a relationship between the activator and the popover.
   */
  getFocusableActivator: () => HTMLElement | undefined;

  /**
   * A function that returns the virtually focused item in the popover.
   * It is normally used to trigger onClick and onKeyDown events on the item as if it was focused.
   */
  getVirtualFocus?: () => PopoverVirtualNode | null;

  /**
   * A function that checks whether there is a nested element assuming the role of the popover.
   * It is used by `IressMenu` to force the popover to a certain role so that the screen reader can navigate it correctly.
   */
  hasInnerRole: () => boolean;

  /**
   * The interactions returned by the useInteractions hook.
   * It is used to manage the interactions of the popover activator and content, such as click and dismiss.
   */
  interactions: ReturnType<typeof useInteractions>;

  /**
   * This function checks whether an element is the same as the activator element.
   * It is used by components such as `IressButton` to style the activator when the popover is open.
   */
  isActiveActivator: (element: HTMLElement | null) => boolean;

  /**
   * If controlled, this will return true, meaning the popover is controlled by the parent component and will not change its state on its own.
   * It is used by components such as `IressRichSelect` to manage the state of the popover using other methods.
   */
  isControlled: boolean;

  /**
   * If virtually focused, this will return true, meaning the popover is using virtual focus to manage the focus state of the items in the popover.
   * It is used by components such as `useMenuItem` to check whether it should set the tab index of an item or not.
   */
  isVirtualFocus: boolean;

  /**
   * The list of items in the popover.
   * It is used by other components to manage the aria attributes and keyboard navigation of the items.
   */
  list: MutableRefObject<(HTMLElement | null)[]>;

  /**
   * Resets the active index of the popover items, either to the `focusStartIndex` or null
   */
  resetActiveIndex: () => void;

  /**
   * Set the current active index of the popover items.
   */
  setActiveIndex: (newActiveIndex: number | null) => void;

  /**
   * This function is used to set the state of the popover without triggering the Floating UI handlers such as focus handling as well as onActivated and onDeactivated.
   * It is used by `useMenuItem` to close the popover when an item is selected.
   *
   * For most cases, you should use the `setShowWithReason` function instead.
   */
  setShow: (flag?: boolean) => void;

  /**
   * This function is used to set the state of the popover and trigger the Floating UI handlers such as focus handling.
   * Depending on the reason, it will change the way focus is handled.
   */
  setShowWithReason: (
    flag: boolean,
    e?: Event,
    reason?: OpenChangeReason,
  ) => void;

  /**
   * This function is used to set the state of the popover to have an inner role.
   * It is used by components such as `IressMenu` to force the popover to a certain role so that the screen reader can navigate it correctly.
   */
  setHasInnerRole: (flag: boolean) => void;

  /**
   * This function is used to set the virtual focus of the popover.
   * It is used by components such as `IressRichSelect` with searchable options to manage the focus state of the items in the popover.
   */
  setVirtualFocus?: (node: PopoverVirtualNode | null) => void;

  /**
   * The state of the popover, whether it is open or closed.
   */
  show: boolean;

  /**
   * The type of the popover, which is used to determine the role of the popover.
   * It is used by components such as `IressMenu` to manage the aria attributes and keyboard navigation of the items.
   */
  type?: PopoverHookProps['type'];
}

/**
 * This is a wrapper around the useFloating hook from Floating UI specifically for popover components.
 * - It manages the state of the popover, including whether it is open or closed, and provides a controlled state for the popover.
 * - It also manages the middleware for the popover, including the size middleware to match the activator width.
 * - It uses the usePopoverNavigation hook to manage the keyboard navigation of popover items.
 * - It provides a way to set the active index of the popover items, and to manage the focus state of the popover items.
 * - It provides a way to set the virtual focus of the popover items, and to manage the focus state of the popover items.
 * - It provides a way to set the hasInnerRole state, which is used to determine whether the popover has an inner role or not.
 */
export const usePopover = ({
  align = 'auto',
  autoHighlight = true,
  component = 'IressPopover',
  defaultShow,
  focusStartIndex,
  hasInputActivator,
  matchActivatorWidth,
  onActivated,
  onDeactivated,
  onNavigate,
  show: showProp,
  type,
  virtualFocus,
}: PopoverHookProps): PopoverHookReturn => {
  const hasInnerRole = useRef<boolean>(false);
  const virtualNode = useRef<PopoverVirtualNode | null>(null);

  const {
    isControlled,
    setValue: setShow,
    value: show,
  } = useControlledState({
    component,
    defaultValue: defaultShow,
    propName: 'show',
    value: showProp,
  });

  const combinedMiddleware = useMemo(() => {
    const middleware: Middleware[] = hasInputActivator
      ? [offset(5), flip({ padding: 5 })]
      : [
          offset(5),
          align === 'auto' ? autoPlacement() : flip(),
          shift((state) => {
            const insideSlideout = closestCrossShadow(
              state.elements.reference as HTMLElement,
              `.${GlobalCSSClass.Slideout}`,
            );
            return {
              mainAxis: !insideSlideout,
            };
          }),
        ];

    if (matchActivatorWidth) {
      return [
        ...middleware,
        size({
          apply({ rects, availableHeight, elements }) {
            requestAnimationFrame(() => {
              // This must be wrapped in requestAnimationFrame to avoid ResizeObserver loop error; https://github.com/floating-ui/floating-ui/issues/1740
              // The error is difficult/impossible to reproduce in Storybook, but it appears in other apps when the component is used without a fixed width.
              Object.assign(elements.floating.style, {
                minWidth: `${rects.reference.width}px`,
                maxHeight:
                  availableHeight > POPOVER_USE_MAX_HEIGHT
                    ? `${availableHeight}px`
                    : undefined,
              });
            });
          },
          padding: 5,
        }),
      ];
    }

    return middleware;
  }, [matchActivatorWidth, hasInputActivator, align]);

  const api = useFloating({
    open: show,
    onOpenChange: (open: boolean, e, reason) => {
      setShow(open);

      if (open) {
        onActivated?.(e, reason, activeIndex);
      } else {
        onDeactivated?.(e, reason, activeIndex);
      }
    },
    middleware: combinedMiddleware,
    placement: align === 'auto' ? undefined : align,
    whileElementsMounted: autoUpdate,
  });

  const { activeIndex, list, listNav, setActiveIndex } = usePopoverNavigation(
    api.context,
    type,
    {
      focusItemOnOpen: autoHighlight,
      virtual: virtualFocus,
    },
    onNavigate,
    focusStartIndex,
  );

  const click = useClick(api.context, {
    enabled: !hasInputActivator,
  });
  const dismiss = useDismiss(api.context, {
    enabled: true,
    escapeKey: !hasInputActivator,
  });
  const role = useRole(api.context, {
    role: type,
  });
  const aria = usePopoverAria();
  const interactions = useInteractions([click, dismiss, role, listNav]);

  const virtualContext = useMemo(() => {
    return virtualFocus
      ? {
          getVirtualFocus: () => virtualNode.current,
          setVirtualFocus: (node: PopoverVirtualNode | null) => {
            virtualNode.current = node;
          },
        }
      : {};
  }, [virtualFocus]);

  const getFocusableActivator = useCallback(() => {
    const reference = api.elements.reference as HTMLElement;

    return (
      reference?.querySelector<HTMLElement>('[role=combobox]') ??
      focusableElements(reference)[0]
    );
  }, [api.elements.reference]);

  const isActiveActivator = useCallback(
    (element: HTMLElement | null) => {
      if (!element || !show) return false;
      return element === getFocusableActivator();
    },
    [getFocusableActivator, show],
  );

  const resetActiveIndex = useCallback(() => {
    setActiveIndex(focusStartIndex ?? null);
  }, [focusStartIndex, setActiveIndex]);

  return useMemo(
    () => ({
      activeIndex,
      ...aria,
      api,
      getFocusableActivator,
      hasInnerRole: () => hasInnerRole.current,
      interactions,
      isActiveActivator,
      isControlled,
      isVirtualFocus: !!virtualFocus,
      list,
      resetActiveIndex,
      setActiveIndex,
      setShow,
      setShowWithReason: api.context.onOpenChange,
      setHasInnerRole: (flag: boolean) => {
        hasInnerRole.current = flag;
      },
      show: !!show,
      type,
      ...virtualContext,
    }),
    [
      activeIndex,
      api,
      aria,
      getFocusableActivator,
      interactions,
      isActiveActivator,
      isControlled,
      list,
      resetActiveIndex,
      setActiveIndex,
      setShow,
      show,
      type,
      virtualContext,
      virtualFocus,
    ],
  );
};

/**
 * This context is used to provide the popover state and API to allow items to be navigatable by keyboard and screen readers.
 */
export const PopoverContext = createContext<PopoverHookReturn | undefined>(
  undefined,
);
