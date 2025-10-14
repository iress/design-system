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
});
