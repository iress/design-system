import { createContext, forwardRef, useCallback, useMemo, useRef } from 'react';
import {
  useFloating,
  autoPlacement,
  offset,
  flip,
  shift,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  autoUpdate,
  size,
} from '@floating-ui/react';
import {
  POPOVER_USE_MAX_HEIGHT,
  type PopoverContextValue,
  type PopoverProviderProps,
  type PopoverRef,
  type PopoverVirtualNode,
} from './Popover.types';
import { usePopoverState } from './hooks/usePopoverState';
import { usePopoverNavigation } from './hooks/usePopoverNavigation';
import { usePopoverAria } from './hooks/usePopoverAria';
import { usePopoverImperativeHandle } from './hooks/usePopoverImperativeHandle';
import { focusableElements } from '@/helpers/dom/focusableElements';
import slideoutStyles from '../Slideout/Slideout.module.scss';
import { closestCrossShadow } from '@/helpers/dom/closestCrossShadow';

export const PopoverContext = createContext<PopoverContextValue | undefined>(
  undefined,
);

export const PopoverProvider = forwardRef<PopoverRef, PopoverProviderProps>(
  (
    {
      align,
      children,
      defaultShow,
      disabledAutoToggle,
      focusStartIndex,
      matchActivatorWidth,
      onActivated,
      onDeactivated,
      onNavigate,
      type,
      show: showProp,
      virtualFocus,
    }: PopoverProviderProps,
    ref,
  ) => {
    const isAuto = align === 'auto';
    const virtualNode = useRef<PopoverVirtualNode | null>(null);

    const state = usePopoverState({
      defaultShow,
      show: showProp,
    });

    const middleware = useMemo(() => {
      const floatingMiddleware = [
        offset(5),
        isAuto ? autoPlacement() : flip(),
        shift((state) => {
          // When inside a slideout, shift should not be enabled as it cannot detect the clipping path of the slideout and shifts wrongly
          const insideSlideout = closestCrossShadow(
            state.elements.reference as HTMLElement,
            `.${slideoutStyles.slideout}`,
          );
          return {
            mainAxis: !insideSlideout,
          };
        }),
      ];

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
    }, [isAuto, matchActivatorWidth]);

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
    const click = useClick(api.context, {
      enabled: !disabledAutoToggle,
    });
    const dismiss = useDismiss(api.context, {
      enabled: !disabledAutoToggle,
    });
    const role = useRole(api.context, {
      role: type,
    });
    const { activeIndex, list, listNav, setActiveIndex } = usePopoverNavigation(
      api.context,
      type,
      {
        focusItemOnOpen: true,
        virtual: virtualFocus,
      },
      onNavigate,
      focusStartIndex,
    );
    const aria = usePopoverAria();
    const interactions = useInteractions([click, dismiss, role, listNav]);

    const virtualContext: Pick<
      PopoverContextValue,
      'getVirtualFocus' | 'setVirtualFocus'
    > = useMemo(() => {
      return virtualFocus
        ? {
            getVirtualFocus: () => virtualNode.current,
            setVirtualFocus: (node) => {
              virtualNode.current = node;
            },
          }
        : {};
    }, [virtualFocus]);

    const resetActiveIndex = useCallback(() => {
      setActiveIndex(focusStartIndex ?? null);
    }, [focusStartIndex, setActiveIndex]);

    const context: PopoverContextValue = useMemo(
      () => ({
        ...aria,
        ...state,
        ...virtualContext,
        api,
        activeIndex,
        disabledAutoToggle,
        getFocusableActivator: () => {
          const reference = api.elements.reference as HTMLElement;
          return (
            reference?.querySelector<HTMLElement>('[role=combobox]') ??
            focusableElements(reference)[0]
          );
        },
        interactions,
        list,
        resetActiveIndex,
        setActiveIndex,
        setShowWithReason: (flag, e, reason) =>
          api.context.onOpenChange(flag, e, reason),
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
        virtualContext,
      ],
    );

    usePopoverImperativeHandle(ref, api, aria, state, context);

    return (
      <PopoverContext.Provider value={context}>
        {children}
      </PopoverContext.Provider>
    );
  },
);
PopoverProvider.displayName = 'PopoverProvider';
