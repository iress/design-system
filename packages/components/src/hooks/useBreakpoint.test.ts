import { renderHook, act } from '@testing-library/react';
import { useBreakpoint } from './useBreakpoint';
import { Breakpoints } from '@/types';
import { BREAKPOINT_DETAILS } from '@/constants';

const mockWindowResize = (breakpoint: Breakpoints) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === BREAKPOINT_DETAILS[breakpoint].mediaQuery,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  window.dispatchEvent(new Event('resize'));
};

describe('useBreakpoint', () => {
  it('gets the current breakpoint and its detail', () => {
    mockWindowResize('xl');
    const hook = renderHook(() => useBreakpoint());

    expect(hook.result.current).toStrictEqual({
      breakpoint: 'xl',
      detail: BREAKPOINT_DETAILS.xl,
    });

    // Simulate window resize
    act(() => mockWindowResize('xxl'));

    expect(hook.result.current).toStrictEqual({
      breakpoint: 'xxl',
      detail: BREAKPOINT_DETAILS.xxl,
    });
  });

  describe('disabled functionality', () => {
    it('returns the initial breakpoint when disabled', () => {
      mockWindowResize('lg');
      const hook = renderHook(() => useBreakpoint({ disabled: true }));

      expect(hook.result.current).toStrictEqual({
        breakpoint: 'lg',
        detail: BREAKPOINT_DETAILS.lg,
      });
    });

    it('does not respond to resize events when disabled', () => {
      mockWindowResize('md');
      const hook = renderHook(() => useBreakpoint({ disabled: true }));

      expect(hook.result.current.breakpoint).toBe('md');

      // Simulate resize - should not update
      act(() => mockWindowResize('xl'));

      expect(hook.result.current.breakpoint).toBe('md');
    });

    it('does not add resize event listener when disabled', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      mockWindowResize('sm');

      renderHook(() => useBreakpoint({ disabled: true }));

      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        'resize',
        expect.any(Function),
      );

      addEventListenerSpy.mockRestore();
    });

    it('starts listening to resize when disabled changes from true to false', () => {
      mockWindowResize('md');
      const hook = renderHook(({ disabled }) => useBreakpoint({ disabled }), {
        initialProps: { disabled: true },
      });

      expect(hook.result.current.breakpoint).toBe('md');

      // Re-enable the hook
      hook.rerender({ disabled: false });

      // Now it should respond to resize
      act(() => mockWindowResize('lg'));

      expect(hook.result.current.breakpoint).toBe('lg');
    });

    it('stops listening to resize when disabled changes from false to true', () => {
      mockWindowResize('md');
      const hook = renderHook(({ disabled }) => useBreakpoint({ disabled }), {
        initialProps: { disabled: false },
      });

      expect(hook.result.current.breakpoint).toBe('md');

      // Verify it responds to resize when enabled
      act(() => mockWindowResize('lg'));
      expect(hook.result.current.breakpoint).toBe('lg');

      // Disable the hook
      hook.rerender({ disabled: true });

      // Should not respond to resize anymore
      act(() => mockWindowResize('xl'));
      expect(hook.result.current.breakpoint).toBe('lg');
    });

    it('removes event listener on unmount when disabled', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      mockWindowResize('sm');

      const hook = renderHook(() => useBreakpoint({ disabled: true }));
      hook.unmount();

      // Should not try to remove listener if it was never added
      expect(removeEventListenerSpy).not.toHaveBeenCalledWith(
        'resize',
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });

    it('removes event listener on unmount when enabled', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      mockWindowResize('sm');

      const hook = renderHook(() => useBreakpoint({ disabled: false }));
      hook.unmount();

      // Should remove listener when it was added
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'resize',
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
