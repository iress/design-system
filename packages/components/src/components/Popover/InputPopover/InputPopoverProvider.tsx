import { forwardRef, useCallback, useMemo, useRef } from 'react';
import {
  useFloating,
  offset,
  flip,
  size,
  useInteractions,
  useDismiss,
  useRole,
  autoUpdate,
} from '@floating-ui/react';
import {
  POPOVER_USE_MAX_HEIGHT,
  type PopoverContextValue,
  type PopoverProviderProps,
  type PopoverRef,
  type PopoverVirtualNode,
} from '../Popover.types';
import { usePopoverState } from '../hooks/usePopoverState';
import { usePopoverNavigation } from '../hooks/usePopoverNavigation';
import { usePopoverAria } from '../hooks/usePopoverAria';
import { PopoverContext } from '../PopoverProvider';
import { usePopoverImperativeHandle } from '../hooks/usePopoverImperativeHandle';
import { focusableElements } from '@/helpers/dom/focusableElements';

export const InputPopoverProvider = forwardRef<
  PopoverRef,
  PopoverProviderProps
>(
  (
    {
      align,
      autoHighlight,
      children,
      defaultShow,
      disabledAutoToggle,
      focusStartIndex,
      matchActivatorWidth = true,
      onActivated,
      onDeactivated,
      onNavigate,
      show: showProp,
      type,
    }: PopoverProviderProps,
    ref,
  ) => {
    const isAuto = align === 'auto';
    const virtualFocus = useRef<PopoverVirtualNode | null>(null);

    const state = usePopoverState({
      defaultShow,
      show: showProp,
    });

    const middleware = useMemo(() => {
      const floatingMiddleware = [offset(5), flip({ padding: 5 })];

      if (matchActivatorWidth) {
        floatingMiddleware.push(
          size({
            apply({ rects, availableHeight, elements }) {
              requestAnimationFrame(() => {
                // This must be wrapped in requestAnimationFrame to avoid ResizeObserver loop error; https://github.com/floating-ui/floating-ui/issues/1740
                // The error is difficult/impossible to reproduce in Storybook, but it appears in other apps when the component is used without a fixed width.
                Object.assign(elements.floating.style, {
                  width: `${rects.reference.width}px`,
                  maxHeight:
                    availableHeight > POPOVER_USE_MAX_HEIGHT
                      ? `${availableHeight}px`
                      : undefined,
                });
              });
            },
            padding: 5,
          }),
        );
      }

      return floatingMiddleware;
    }, [matchActivatorWidth]);

    const api = useFloating({
      open: state.show,
      onOpenChange: (open: boolean, e, reason) => {
        state.setShow(open);

        if (open) {
          onActivated?.(e, reason, activeIndex);
        } else {
          onDeactivated?.(e, reason, activeIndex);
        }
      },
      middleware,
      placement: isAuto ? undefined : align,
      whileElementsMounted: autoUpdate,
    });
    const dismiss = useDismiss(api.context, {
      enabled: !disabledAutoToggle,
      escapeKey: false,
    });
    const role = useRole(api.context, {
      role: type,
    });
    const { activeIndex, list, listNav, setActiveIndex } = usePopoverNavigation(
      api.context,
      type,
      {
        focusItemOnOpen: autoHighlight,
        virtual: true,
      },
      onNavigate,
      focusStartIndex,
    );
    const interactions = useInteractions([dismiss, role, listNav]);
    const aria = usePopoverAria();

    const resetActiveIndex = useCallback(() => {
      setActiveIndex(focusStartIndex ?? null);
    }, [focusStartIndex, setActiveIndex]);

    const context: PopoverContextValue = useMemo(
      () => ({
        ...aria,
        ...state,
        activeIndex,
        api,
        disabledAutoToggle,
        getFocusableActivator: () => {
          const reference = api.elements.reference as HTMLElement;
          return (
            reference?.querySelector<HTMLElement>('[role=combobox]') ??
            focusableElements(reference)[0]
          );
        },
        getVirtualFocus: () => virtualFocus.current,
        interactions,
        list,
        resetActiveIndex,
        setActiveIndex,
        setShowWithReason: (flag, e, reason) =>
          api.context.onOpenChange(flag, e, reason),
        setVirtualFocus: (node) => (virtualFocus.current = node),
        type,
      }),
      [
        activeIndex,
        api,
        aria,
        disabledAutoToggle,
        interactions,
        list,
        resetActiveIndex,
        setActiveIndex,
        state,
        type,
      ],
    );

    usePopoverImperativeHandle(ref, api, aria, state);

    return (
      <PopoverContext.Provider value={context}>
        {children}
      </PopoverContext.Provider>
    );
  },
);

InputPopoverProvider.displayName = 'InputPopoverProvider';
