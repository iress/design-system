import { type PropsWithChildren, useMemo, useRef } from 'react';
import { type PopoverContextValue } from '../Popover.types';
import { vitest } from 'vitest';
import { PopoverContext } from '../PopoverProvider';
import {
  type FloatingContext,
  FloatingList,
  type ReferenceType,
} from '@floating-ui/react';

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

export const MOCK_FLOATING_UI_INTERACTIONS: PopoverContextValue['interactions'] =
  {
    getReferenceProps: vitest.fn(),
    getFloatingProps: vitest.fn(() => ({
      'aria-orientation': 'vertical',
      role: 'option',
    })),
    getItemProps: vitest.fn(),
  };

export const getMockPopoverContext = (
  contextProps: Partial<PopoverContextValue> = {},
): PopoverContextValue => ({
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
  isControlled: contextProps.isControlled ?? false,
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
});

export const TestPopoverProvider = ({
  children,
  ...contextProps
}: Partial<PopoverContextValue> & PropsWithChildren) => {
  const list = useRef<(HTMLElement | null)[]>([]);

  const context = useMemo(
    () =>
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
