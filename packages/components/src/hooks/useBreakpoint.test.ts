import { renderHook, act } from '@testing-library/react';
import { useBreakpoint } from './useBreakpoint';
import { Breakpoints } from '@/types';
import { BREAKPOINT_DETAILS } from '@/constants';

let changeListeners: Array<() => void> = [];
let currentBreakpoint: Breakpoints = 'xs';

const createMockMatchMedia = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === BREAKPOINT_DETAILS[currentBreakpoint].mediaQuery,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_event: string, cb: () => void) => {
        changeListeners.push(cb);
      }),
      removeEventListener: vi.fn((_event: string, cb: () => void) => {
        changeListeners = changeListeners.filter((l) => l !== cb);
      }),
      dispatchEvent: vi.fn(),
    })),
  });
};

const simulateBreakpointChange = (breakpoint: Breakpoints) => {
  currentBreakpoint = breakpoint;
  createMockMatchMedia();
  changeListeners.forEach((cb) => cb());
};

beforeEach(() => {
  changeListeners = [];
  currentBreakpoint = 'xs';
});

describe('useBreakpoint', () => {
  it('gets the current breakpoint and its detail', () => {
    currentBreakpoint = 'xl';
    createMockMatchMedia();
    const hook = renderHook(() => useBreakpoint());

    expect(hook.result.current).toStrictEqual({
      breakpoint: 'xl',
      detail: BREAKPOINT_DETAILS.xl,
    });

    act(() => simulateBreakpointChange('xxl'));

    expect(hook.result.current).toStrictEqual({
      breakpoint: 'xxl',
      detail: BREAKPOINT_DETAILS.xxl,
    });
  });

  describe('disabled functionality', () => {
    it('returns the initial breakpoint when disabled', () => {
      currentBreakpoint = 'lg';
      createMockMatchMedia();
      const hook = renderHook(() => useBreakpoint({ disabled: true }));

      expect(hook.result.current).toStrictEqual({
        breakpoint: 'lg',
        detail: BREAKPOINT_DETAILS.lg,
      });
    });

    it('does not respond to breakpoint changes when disabled', () => {
      currentBreakpoint = 'md';
      createMockMatchMedia();
      const hook = renderHook(() => useBreakpoint({ disabled: true }));

      expect(hook.result.current.breakpoint).toBe('md');

      act(() => simulateBreakpointChange('xl'));

      // Still returns md because getSnapshot is called but no subscription fires
      expect(hook.result.current.breakpoint).toBe('md');
    });

    it('does not subscribe to matchMedia change events when disabled', () => {
      currentBreakpoint = 'sm';
      createMockMatchMedia();

      renderHook(() => useBreakpoint({ disabled: true }));

      expect(changeListeners).toHaveLength(0);
    });

    it('starts listening when disabled changes from true to false', () => {
      currentBreakpoint = 'md';
      createMockMatchMedia();
      const hook = renderHook(({ disabled }) => useBreakpoint({ disabled }), {
        initialProps: { disabled: true },
      });

      expect(hook.result.current.breakpoint).toBe('md');

      hook.rerender({ disabled: false });

      act(() => simulateBreakpointChange('lg'));

      expect(hook.result.current.breakpoint).toBe('lg');
    });

    it('stops listening when disabled changes from false to true', () => {
      currentBreakpoint = 'md';
      createMockMatchMedia();
      const hook = renderHook(({ disabled }) => useBreakpoint({ disabled }), {
        initialProps: { disabled: false },
      });

      expect(hook.result.current.breakpoint).toBe('md');

      act(() => simulateBreakpointChange('lg'));
      expect(hook.result.current.breakpoint).toBe('lg');

      hook.rerender({ disabled: true });

      act(() => simulateBreakpointChange('xl'));
      expect(hook.result.current.breakpoint).toBe('lg');
    });

    it('cleans up listeners on unmount when disabled', () => {
      currentBreakpoint = 'sm';
      createMockMatchMedia();

      const hook = renderHook(() => useBreakpoint({ disabled: true }));
      hook.unmount();

      expect(changeListeners).toHaveLength(0);
    });

    it('cleans up listeners on unmount when enabled', () => {
      currentBreakpoint = 'sm';
      createMockMatchMedia();

      const hook = renderHook(() => useBreakpoint({ disabled: false }));
      expect(changeListeners.length).toBeGreaterThan(0);

      hook.unmount();

      expect(changeListeners).toHaveLength(0);
    });
  });
});
