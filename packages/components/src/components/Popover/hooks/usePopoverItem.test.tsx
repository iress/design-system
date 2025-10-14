import { renderHook } from '@testing-library/react';
import { MutableRefObject, PropsWithChildren } from 'react';
import { PopoverVirtualNode, usePopoverItem } from './usePopoverItem';
import { TestPopoverProvider } from '../mocks/TestPopoverProvider';
import { PopoverHookReturn } from './usePopover';

function renderHookInPopover(
  typeAheadLabel?: string,
  virtualNode: PopoverVirtualNode | null = null,
  context: Partial<PopoverHookReturn> = {},
) {
  return renderHook(() => usePopoverItem(typeAheadLabel, virtualNode), {
    wrapper: ({ children }: PropsWithChildren) => (
      <TestPopoverProvider {...context}>{children}</TestPopoverProvider>
    ),
  });
}

describe('usePopoverItem', () => {
  it('returns defaults if not in popover', () => {
    const hook = renderHook(() => usePopoverItem());
    const props = hook.result.current;

    expect(props).toEqual({
      id: expect.any(String) as string,
      isActiveInPopover: false,
      ref: expect.any(Function) as MutableRefObject<HTMLElement>,
      tabIndex: undefined,
    });
  });

  describe('inside popover', () => {
    it('returns defaults', () => {
      const hook = renderHookInPopover();
      const props = hook.result.current;

      expect(props).toEqual({
        id: expect.any(String) as string,
        isActiveInPopover: false,
        ref: expect.any(Function) as MutableRefObject<HTMLElement>,
        tabIndex: -1,
      });
    });

    it('sets active in popover to false when inside a popover that has virtual focus', () => {
      const hook = renderHookInPopover(undefined, null, {
        setVirtualFocus: vitest.fn(),
      });
      const props = hook.result.current;

      expect(props).toEqual({
        id: expect.any(String) as string,
        isActiveInPopover: false,
        ref: expect.any(Function) as MutableRefObject<HTMLElement>,
        tabIndex: -1,
      });
    });

    it('sets active in popover to true if item index matches, and makes it tabbable', () => {
      const virtualNode = {};
      const setVirtualFocus = vitest.fn();

      // If using the hook and dom is not rendered, index is always set to -1
      const hook = renderHookInPopover(undefined, virtualNode, {
        activeIndex: -1,
        setVirtualFocus,
      });
      const props = hook.result.current;

      expect(props).toEqual({
        id: expect.any(String) as string,
        isActiveInPopover: true,
        ref: expect.any(Function) as MutableRefObject<HTMLElement>,
        tabIndex: 0,
      });

      expect(setVirtualFocus).toHaveBeenCalledWith(virtualNode);
    });
  });
});
