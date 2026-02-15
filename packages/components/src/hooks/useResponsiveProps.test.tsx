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
          { inheritPrevious: false },
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
          { inheritPrevious: false },
        ),
      );
      expect(hook.result.current.value).toBe(undefined);
    });
  });

  describe('disabled functionality', () => {
    it('returns value based on initial breakpoint when disabled', () => {
      const hook = renderHook(() =>
        useResponsiveProps(
          {
            [MATCHING_BREAKPOINT]: 'matches',
            xxl: 'should not match',
          },
          { disabled: true },
        ),
      );
      expect(hook.result.current.value).toBe('matches');
      expect(hook.result.current.breakpoint).toBe(MATCHING_BREAKPOINT);
    });

    it('does not add resize event listener when disabled', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      renderHook(() =>
        useResponsiveProps(
          {
            xs: 'value',
          },
          { disabled: true },
        ),
      );

      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        'resize',
        expect.any(Function),
      );

      addEventListenerSpy.mockRestore();
    });

    it('respects inheritPrevious when disabled', () => {
      const hook = renderHook(() =>
        useResponsiveProps(
          {
            xs: 'inherited value',
          },
          { disabled: true, inheritPrevious: true },
        ),
      );
      expect(hook.result.current.value).toBe('inherited value');
    });

    it('does not inherit previous when disabled and inheritPrevious is false', () => {
      const hook = renderHook(() =>
        useResponsiveProps(
          {
            xs: 'should not inherit',
          },
          { disabled: true, inheritPrevious: false },
        ),
      );
      expect(hook.result.current.value).toBe(undefined);
    });

    it('returns base value when disabled and no matching breakpoint', () => {
      const hook = renderHook(() =>
        useResponsiveProps(
          {
            base: 'base value',
            xxl: 'should not match',
          },
          { disabled: true, inheritPrevious: false },
        ),
      );
      expect(hook.result.current.value).toBe('base value');
    });

    it('returns undefined when disabled and no value provided', () => {
      const hook = renderHook(() =>
        useResponsiveProps(undefined, { disabled: true }),
      );
      expect(hook.result.current.value).toBe(undefined);
    });

    it('starts responding to breakpoint changes when disabled changes from true to false', () => {
      const hook = renderHook(
        ({ disabled }) =>
          useResponsiveProps(
            {
              [MATCHING_BREAKPOINT]: 'matches',
            },
            { disabled },
          ),
        {
          initialProps: { disabled: true },
        },
      );

      expect(hook.result.current.value).toBe('matches');

      // Re-enable the hook
      hook.rerender({ disabled: false });

      expect(hook.result.current.value).toBe('matches');
    });

    it('removes event listener on unmount when disabled', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const hook = renderHook(() =>
        useResponsiveProps(
          {
            xs: 'value',
          },
          { disabled: true },
        ),
      );
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

      const hook = renderHook(() =>
        useResponsiveProps(
          {
            xs: 'value',
          },
          { disabled: false },
        ),
      );
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
