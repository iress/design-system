import { renderHook } from '@testing-library/react';
import { useResponsiveProps } from './useResponsiveProps';
import { Breakpoints } from '@/types';
import { BREAKPOINT_DETAILS } from '@/constants';

const MATCHING_BREAKPOINT: Breakpoints = 'xl';

describe('useResponsiveProps', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === BREAKPOINT_DETAILS[MATCHING_BREAKPOINT].mediaQuery,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  describe('breakpoint', () => {
    it('returns matching breakpoint', () => {
      const hook = renderHook(() => useResponsiveProps());
      expect(hook.result.current.breakpoint).toBe(MATCHING_BREAKPOINT);
    });
  });

  describe('value', () => {
    it('returns undefined if no value provided', () => {
      const hook = renderHook(() => useResponsiveProps());
      expect(hook.result.current.value).toBe(undefined);
    });

    it('returns the object if not a responsive object', () => {
      const value = {
        blah: 'yeah',
      };
      const hook = renderHook(() => useResponsiveProps(value));
      expect(hook.result.current.value).toBe(value);
    });

    it('returns undefined if not matching breakpoint', () => {
      const hook = renderHook(() =>
        useResponsiveProps({
          xxl: 'matches',
        }),
      );
      expect(hook.result.current.value).toBe(undefined);
    });

    it('returns the value if matching breakpoint', () => {
      const hook = renderHook(() =>
        useResponsiveProps({
          [MATCHING_BREAKPOINT]: 'matches',
        }),
      );
      expect(hook.result.current.value).toBe('matches');
    });

    it('returns the base value if not matching any of the breakpoints', () => {
      const hook = renderHook(() =>
        useResponsiveProps(
          {
            base: 'test',
            xs: 'matches',
          },
          false,
        ),
      );
      expect(hook.result.current.value).toBe('test');
    });
  });

  describe('inheritPrevious', () => {
    it('inherits previous breakpoints by default', () => {
      const hook = renderHook(() =>
        useResponsiveProps({
          xs: 'matches',
        }),
      );
      expect(hook.result.current.value).toBe('matches');
    });

    it('does not inherit previous breakpoints if set to false', () => {
      const hook = renderHook(() =>
        useResponsiveProps(
          {
            xs: 'matches',
          },
          false,
        ),
      );
      expect(hook.result.current.value).toBe(undefined);
    });
  });
});
