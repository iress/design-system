import { renderHook } from '@testing-library/react';
import { usePopoverNavigation } from './usePopoverNavigation';
import { MOCK_FLOATING_UI_CONTEXT } from '../mocks/TestPopoverProvider';
import { useListNavigation } from '@floating-ui/react';
import { type PopoverNavigationHookReturn } from '../Popover.types';

vi.mock('@floating-ui/react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@floating-ui/react')>()),
  useListNavigation: vi.fn(() => ({})),
}));

describe('usePopoverNavigation', () => {
  it('returns defaults', () => {
    const hook = renderHook(() =>
      usePopoverNavigation(MOCK_FLOATING_UI_CONTEXT),
    );
    const props = hook.result.current;

    expect(props).toEqual({
      activeIndex: null,
      list: {
        current: [],
      },
      listNav: {},
      setActiveIndex: expect.any(
        Function,
      ) as PopoverNavigationHookReturn['setActiveIndex'],
    });

    expect(useListNavigation).toHaveBeenLastCalledWith(
      MOCK_FLOATING_UI_CONTEXT,
      expect.objectContaining({
        enabled: false,
        loop: false,
      }),
    );
  });

  describe('type=menu', () => {
    it('calls useListNavigation with enabled', () => {
      renderHook(() => usePopoverNavigation(MOCK_FLOATING_UI_CONTEXT, 'menu'));
      expect(useListNavigation).toHaveBeenLastCalledWith(
        MOCK_FLOATING_UI_CONTEXT,
        expect.objectContaining({
          enabled: true,
        }),
      );
    });

    it('calls useListNavigation with loop enabled', () => {
      renderHook(() => usePopoverNavigation(MOCK_FLOATING_UI_CONTEXT, 'menu'));
      expect(useListNavigation).toHaveBeenLastCalledWith(
        MOCK_FLOATING_UI_CONTEXT,
        expect.objectContaining({
          loop: true,
        }),
      );
    });

    it('sets activeIndex to 0 when focusItemOnOpen is enabled and popover is open', () => {
      const hook = renderHook(() =>
        usePopoverNavigation(
          {
            ...MOCK_FLOATING_UI_CONTEXT,
            open: true,
          },
          'menu',
          {
            focusItemOnOpen: true,
          },
        ),
      );
      const props = hook.result.current;
      expect(props).toHaveProperty('activeIndex', 0);
    });
  });

  describe('type=listbox', () => {
    it('calls useListNavigation with enabled', () => {
      renderHook(() =>
        usePopoverNavigation(MOCK_FLOATING_UI_CONTEXT, 'listbox'),
      );
      expect(useListNavigation).toHaveBeenLastCalledWith(
        MOCK_FLOATING_UI_CONTEXT,
        expect.objectContaining({
          enabled: true,
        }),
      );
    });

    it('calls useListNavigation with loop disabled', () => {
      renderHook(() =>
        usePopoverNavigation(MOCK_FLOATING_UI_CONTEXT, 'listbox'),
      );
      expect(useListNavigation).toHaveBeenLastCalledWith(
        MOCK_FLOATING_UI_CONTEXT,
        expect.objectContaining({
          loop: false,
        }),
      );
    });

    it('sets activeIndex to 0 when focusItemOnOpen is enabled and popover is open', () => {
      const hook = renderHook(() =>
        usePopoverNavigation(
          {
            ...MOCK_FLOATING_UI_CONTEXT,
            open: true,
          },
          'listbox',
          {
            focusItemOnOpen: true,
          },
        ),
      );
      const props = hook.result.current;
      expect(props).toHaveProperty('activeIndex', 0);
    });

    it('sets activeIndex to the start index when set', () => {
      const hook = renderHook(() =>
        usePopoverNavigation(
          {
            ...MOCK_FLOATING_UI_CONTEXT,
            open: true,
          },
          'listbox',
          {
            focusItemOnOpen: true,
          },
          undefined,
          1,
        ),
      );
      const props = hook.result.current;
      expect(props).toHaveProperty('activeIndex', 1);
    });
  });
});
