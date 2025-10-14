import { renderHook } from '@testing-library/react';
import { usePopoverActivatorInteractions } from './usePopoverActivatorInteractions';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { getMockPopoverContext } from '../mocks/TestPopoverProvider';

describe('usePopoverActivatorInteractions', () => {
  it('calls onKeyDown and onBlur if provided by reference props', () => {
    const onBlur = vi.fn();
    const onKeyDown = vi.fn();

    const hook = renderHook(() =>
      usePopoverActivatorInteractions(undefined, { onBlur, onKeyDown }),
    );
    const attributes = hook.result.current;

    attributes.onBlur(getValueAsEvent(null));
    expect(onBlur).toHaveBeenCalledTimes(1);

    attributes.onKeyDown(getValueAsEvent(null));
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  describe('onKeyDown', () => {
    it('calls the onKeyDown of a virtual focused node if available', () => {
      const virtualNodeKeyDown = vi.fn();
      const hook = renderHook(() =>
        usePopoverActivatorInteractions(
          getMockPopoverContext({
            getVirtualFocus: () => ({
              onKeyDown: virtualNodeKeyDown,
            }),
            show: true,
          }),
        ),
      );

      hook.result.current.onKeyDown(getValueAsEvent(null));

      expect(virtualNodeKeyDown).toHaveBeenCalled();
    });

    it('calls the blur of a virtual focused node when user tabs on the activator, and closes popover', () => {
      const setShowWithReason = vi.fn();
      const virtualNodeBlur = vi.fn();
      const hook = renderHook(() =>
        usePopoverActivatorInteractions(
          getMockPopoverContext({
            getVirtualFocus: () => ({
              onBlur: virtualNodeBlur,
            }),
            setShowWithReason,
            show: true,
          }),
        ),
      );

      hook.result.current.onKeyDown({
        key: 'Tab',
      } as React.KeyboardEvent<HTMLDivElement>);

      expect(virtualNodeBlur).toHaveBeenCalled();
      expect(setShowWithReason).toHaveBeenCalledWith(false, undefined, 'focus');
    });

    it('closes the popover when the user clicks arrow up while the first item is focused', () => {
      const setShowWithReason = vi.fn();
      const hook = renderHook(() =>
        usePopoverActivatorInteractions(
          getMockPopoverContext({
            activeIndex: 0,
            setShowWithReason,
            show: true,
          }),
        ),
      );

      hook.result.current.onKeyDown({
        key: 'ArrowUp',
      } as React.KeyboardEvent<HTMLDivElement>);

      expect(setShowWithReason).toHaveBeenCalledWith(false, undefined, 'focus');
    });

    it('opens the popover when the user clicks arrow down while focused on the activator', () => {
      const setShowWithReason = vi.fn();
      const hook = renderHook(() =>
        usePopoverActivatorInteractions(
          getMockPopoverContext({
            setShowWithReason,
          }),
        ),
      );

      hook.result.current.onKeyDown({
        key: 'ArrowDown',
      } as React.KeyboardEvent<HTMLDivElement>);

      expect(setShowWithReason).toHaveBeenCalledWith(true, undefined, 'focus');
    });

    it('moves the cursor when the user types the right arrow key while the popover is open', () => {
      const hook = renderHook(() =>
        usePopoverActivatorInteractions(
          getMockPopoverContext({
            show: true,
          }),
        ),
      );

      const setSelectionRange = vi.fn();
      const input = document.createElement('input');
      input.value = 'test';
      input.selectionStart = 0;
      input.setSelectionRange = setSelectionRange;

      hook.result.current.onKeyDown({
        isDefaultPrevented: () => true,
        key: 'ArrowRight',
        target: input,
      } as unknown as React.KeyboardEvent<HTMLInputElement>);

      expect(setSelectionRange).toHaveBeenCalledWith(1, 1);
    });

    it('moves to the first item in the list when the popover is virtual while the popover is open', () => {
      const items = [
        document.createElement('div'),
        document.createElement('div'),
      ];
      const setActiveIndex = vi.fn();

      const hook = renderHook(() =>
        usePopoverActivatorInteractions(
          getMockPopoverContext({
            activeIndex: 1,
            getVirtualFocus: vi.fn(),
            list: { current: items },
            setActiveIndex,
            show: true,
          }),
        ),
      );

      hook.result.current.onKeyDown({
        key: 'PageUp',
      } as unknown as React.KeyboardEvent<HTMLInputElement>);

      expect(setActiveIndex).toHaveBeenCalledWith(0);
    });

    it('moves to the last item in the list when the popover is virtual while the popover is open', () => {
      const items = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
      ];
      const setActiveIndex = vi.fn();

      const hook = renderHook(() =>
        usePopoverActivatorInteractions(
          getMockPopoverContext({
            activeIndex: 0,
            getVirtualFocus: vi.fn(),
            list: { current: items },
            setActiveIndex,
            show: true,
          }),
        ),
      );

      hook.result.current.onKeyDown({
        key: 'PageDown',
      } as unknown as React.KeyboardEvent<HTMLInputElement>);

      expect(setActiveIndex).toHaveBeenCalledWith(items.length - 1);
    });
  });
});
