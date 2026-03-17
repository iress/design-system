import {
  createContext,
  type RefObject,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  type ControlledStateProps,
  useControlledState,
} from '@/hooks/useControlledState';
import {
  autoPlacement,
  autoUpdate,
  flip,
  type Middleware,
  offset,
  type OffsetOptions,
  type OpenChangeReason,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  type UseFloatingReturn,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { usePopoverNavigation } from './usePopoverNavigation';
import { type FloatingUIAligns } from '@/types';
import { type PopoverVirtualNode } from './usePopoverItem';
import { focusableElements } from '@/helpers/dom/focusableElements';
import { type PopoverAriaHookReturn, usePopoverAria } from './usePopoverAria';
import { closestCrossShadow } from '@/helpers/dom/closestCrossShadow';
import { GlobalCSSClass } from '@/enums';

const POPOVER_USE_MAX_HEIGHT = 200;

export interface FloatingPopoverHookProps {
  /**
   * The alignment of the popover relative to the activator element. It determines the placement of the popover and how it will flip when there is not enough space in the viewport.
   * @default auto
   */
  align?: FloatingUIAligns;

  /**
   * Whether the first item in the popover should be automatically highlighted (ie. focused or virtually focused) when the popover is opened.
   * @default true
   */
  autoHighlight?: boolean;

  /**
   * The component name used in the useControlledState hook to manage the controlled state of the popover. It is used to determine whether the popover is controlled by the parent component or not.
   * @default IressPopover
   */
  component?: ControlledStateProps['component'];

  /**
   * Whether the popover is triggered by an input element, which requires different middleware to prevent the popover from closing when interacting with the input.
   */
  defaultShow?: boolean;

  /**
   * The index of the item that should be focused or virtually focused when the popover is opened. It is used by the usePopoverNavigation hook to set the initial active index of the popover items.
   * @default 0
   */
  focusStartIndex?: number;

  /**
   * Whether the popover is triggered by an input element, which requires different middleware to prevent the popover from closing when interacting with the input.
   */
  hasInputActivator?: boolean;

  /**
   * Whether the popover should match the width of the activator element. It is used to determine whether to apply the size middleware to the popover or not.
   * @default false
   */
  matchActivatorWidth?: boolean;

  /**
   * The offset of the popover relative to the activator element. It is used to determine the distance between the popover and the activator element, and can be used to fine-tune the position of the popover.
   * @default 5
   */
  offset?: OffsetOptions;

  /**
   * This function is called when the popover is opened, either by click or keyboard interaction. It is used to trigger any side effects that should happen when the popover is opened, such as setting the active index of the popover items or managing focus.
   * @param e - The event that triggered the popover to open, either a click event or a keyboard event.
   * @param reason - The reason why the popover was opened, either 'click', 'keyboard', or 'focus'.
   * @param activeIndex - The index of the currently active item in the popover, which is either focused or virtually focused. It can be used to determine which item is active when the popover is opened.
   */
  onActivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;

  /**
   * This function is called when the popover is closed, either by click, keyboard interaction, or clicking outside the popover. It is used to trigger any side effects that should happen when the popover is closed, such as resetting the active index of the popover items or managing focus.
   * @param e - The event that triggered the popover to close, either a click event, a keyboard event, or a dismiss event.
   * @param reason - The reason why the popover was closed, either 'click', 'keyboard', 'dismiss', or 'focus'.
   * @param activeIndex - The index of the currently active item in the popover, which is either focused or virtually focused. It can be used to determine which item was active when the popover was closed.
   */
  onDeactivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;

  /**
   * This function is called when the active index of the popover items is changed by keyboard navigation. It is used to trigger any side effects that should happen when navigating through the popover items, such as updating the virtual focus or managing aria attributes.
   * @param activeIndex - The index of the currently active item in the popover, which is either focused or virtually focused. It can be used to determine which item is active when navigating through the popover items.
   */
  onNavigate?: (activeIndex: number | null) => void;

  /**
   * When set to `true` the popover will be visible. Use for controlled popovers. If not provided, the popover will manage its own state internally.
   */
  show?: boolean;

  /**
   * Describes the type of content contained in the popover, which is used to determine the role of the popover and how it should be navigated by screen readers and assistive technologies.
   * It is used by components such as `IressMenu` to manage the aria attributes and keyboard navigation of the items in the popover.
   */
  type?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

  /**
   * Whether the popover should use virtual focus to manage the focus state of the items in the popover. When true, the popover will keep the focus on the reference element and use aria-activedescendant to indicate which item is active, allowing for more flexible keyboard navigation patterns.
   */
  virtualFocus?: boolean;

  /**
   * Whether this popover is nested inside another popover (e.g. a subdraw menu).
   * When true, the activator opens with ArrowRight instead of ArrowDown,
   * and ArrowLeft closes the submenu from within.
   */
  nested?: boolean;
}

export interface FloatingPopoverHookReturn extends PopoverAriaHookReturn {
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
   * It is used by components such as `IressSelect` to manage the state of the popover using other methods.
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
  list: RefObject<(HTMLElement | null)[]>;

  /**
   * Whether this popover is nested inside another popover (e.g. a subdraw menu).
   * When true, the activator uses ArrowRight to open and ArrowLeft closes from within.
   */
  nested: boolean;

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
   * It is used by components such as `IressSelect` with searchable options to manage the focus state of the items in the popover.
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
  type?: FloatingPopoverHookProps['type'];
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
export const useFloatingPopover = ({
  align = 'auto',
  autoHighlight = true,
  component = 'IressPopover',
  defaultShow,
  focusStartIndex,
  hasInputActivator,
  matchActivatorWidth,
  nested,
  offset: offsetValue = 5,
  onActivated,
  onDeactivated,
  onNavigate,
  show: showProp,
  type,
  virtualFocus,
}: FloatingPopoverHookProps): FloatingPopoverHookReturn => {
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
      ? [offset(offsetValue), flip({ padding: 5 })]
      : [
          offset(offsetValue),
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
  }, [hasInputActivator, offsetValue, align, matchActivatorWidth]);

  const api = useFloating({
    open: show,
    onOpenChange: (open: boolean, e, reason) => {
      // Don't close if focus moved to another floating element (e.g. a nested
      // popover portaled to document.body). This prevents the parent popover
      // from closing when a child popover steals focus.
      if (
        !open &&
        reason === 'focus-out' &&
        document.activeElement instanceof Element &&
        document.activeElement.closest('[data-floating-ui-focusable]') != null
      ) {
        return;
      }

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
      nested: !!nested,
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
      nested,
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
export const FloatingPopoverContext = createContext<
  FloatingPopoverHookReturn | undefined
>(undefined);
