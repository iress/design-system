/* eslint-disable react-refresh/only-export-components */
import { type PropsWithChildren, useMemo, useRef } from 'react';
import { vitest } from 'vitest';
import {
  type FloatingContext,
  FloatingList,
  type ReferenceType,
} from '@floating-ui/react';
import { PopoverContext, type PopoverHookReturn } from '../hooks/usePopover';

export const MOCK_FLOATING_UI_CONTEXT: FloatingContext<ReferenceType> = {
  x: 0,
  y: 0,
  placement: 'bottom-start',
  open: false,
  onOpenChange: vitest.fn(),
  events: {
    emit: vitest.fn(),
    on: vitest.fn(),
    off: vitest.fn(),
  },
  dataRef: {
    current: {},
  },
  nodeId: 'MOCK_FLOATING_UI_CONTEXT',
  floatingId: 'MOCK_FLOATING_UI_CONTEXT',
  refs: {
    reference: {
      current: null,
    },
    floating: {
      current: null,
    },
    domReference: {
      current: null,
    },
    setReference: vitest.fn(),
    setFloating: vitest.fn(),
    setPositionReference: vitest.fn(),
  },
  elements: {
    reference: null,
    floating: null,
    domReference: null,
  },
  strategy: 'absolute',
  update: vitest.fn(),
  floatingStyles: {
    position: 'absolute',
  },
  isPositioned: true,
  middlewareData: {},
};

export const MOCK_FLOATING_UI_INTERACTIONS: PopoverHookReturn['interactions'] =
  {
    getReferenceProps: vitest.fn(),
    getFloatingProps: vitest.fn(() => ({
      'aria-orientation': 'vertical',
      role: 'option',
    })),
    getItemProps: vitest.fn(),
  };

export const getMockPopoverContext = (
  contextProps: Partial<PopoverHookReturn> = {},
) =>
  ({
    ...contextProps,
    activeIndex: contextProps.activeIndex ?? 0,
    api: contextProps.api ?? {
      ...MOCK_FLOATING_UI_CONTEXT,
      context: MOCK_FLOATING_UI_CONTEXT,
    },
    getAriaControls: contextProps.getAriaControls ?? (() => []),
    getFocusableActivator:
      contextProps.getFocusableActivator ?? (() => new HTMLElement()),
    hasInnerRole: contextProps.hasInnerRole ?? (() => false),
    isActiveActivator: contextProps.isActiveActivator ?? (() => false),
    isControlled: contextProps.isControlled ?? false,
    isVirtualFocus: contextProps.isVirtualFocus ?? false,
    interactions: contextProps.interactions ?? MOCK_FLOATING_UI_INTERACTIONS,
    list: contextProps.list ?? {
      current: [],
    },
    resetActiveIndex: contextProps.resetActiveIndex ?? vitest.fn(),
    setActiveIndex: contextProps.setActiveIndex ?? vitest.fn(),
    setHasInnerRole: contextProps.setHasInnerRole ?? vitest.fn(),
    setShowWithReason: contextProps.setShowWithReason ?? vitest.fn(),
    setShow: contextProps.setShow ?? vitest.fn(),
    show: contextProps.show ?? false,
    toggleAriaControls: contextProps.toggleAriaControls ?? vitest.fn(),
  }) satisfies PopoverHookReturn;

export const TestPopoverProvider = ({
  children,
  ...contextProps
}: Partial<PopoverHookReturn> & PropsWithChildren) => {
  const list = useRef<(HTMLElement | null)[]>([]);

  const context = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/refs -- we want to persist the same ref
      getMockPopoverContext({
        ...contextProps,
        list: contextProps.list ?? list,
      }),
    [contextProps],
  );

  return (
    <PopoverContext.Provider value={context}>
      <FloatingList elementsRef={list}>{children}</FloatingList>
    </PopoverContext.Provider>
  );
};
