import { renderHook, screen } from '@testing-library/react';
import { type MenuAriaHookProps } from '../Menu.types';
import { useMenuAria } from './useMenuAria';
import { IressPopover, type IressPopoverProps } from '@/main';
import { type PropsWithChildren } from 'react';
import userEvent from '@testing-library/user-event';

function renderHookInPopover(
  props: MenuAriaHookProps,
  wrapperProps: Partial<IressPopoverProps> = {},
) {
  return renderHook(() => useMenuAria(props), {
    wrapper: ({ children }: PropsWithChildren) => (
      <IressPopover
        {...wrapperProps}
        activator={wrapperProps.activator ?? <button>Activator</button>}
      >
        {children}
      </IressPopover>
    ),
  });
}

describe('useMenuAria', () => {
  describe('role=list', () => {
    const commonProps: MenuAriaHookProps = { id: 'test', role: 'list' };

    it('renders no aria attributes', () => {
      const hook = renderHook(() => useMenuAria({ ...commonProps }));

      const attributes = hook.result.current;
      expect(attributes['aria-multiselectable']).toBeUndefined();
      expect(attributes['aria-orientation']).toBeUndefined();
    });
  });

  describe('role=menu', () => {
    const commonProps: MenuAriaHookProps = { id: 'test', role: 'menu' };

    it('renders vertical orientation by default', () => {
      const hook = renderHook(() => useMenuAria({ ...commonProps }));

      const attributes = hook.result.current;
      expect(attributes['aria-orientation']).toBe('vertical');
    });

    it('renders horizontal orientation when layout is inline', () => {
      const hook = renderHook(() =>
        useMenuAria({ ...commonProps, layout: 'inline' }),
      );

      const attributes = hook.result.current;
      expect(attributes['aria-orientation']).toBe('horizontal');
    });
  });

  describe('role=listbox', () => {
    const commonProps: MenuAriaHookProps = { id: 'test', role: 'listbox' };

    it('renders no aria-attributes by default', () => {
      const hook = renderHook(() => useMenuAria({ ...commonProps }));

      const attributes = hook.result.current;
      expect(attributes['aria-multiselectable']).toBeUndefined();
      expect(attributes['aria-orientation']).toBeUndefined();
    });

    it('renders aria-multiselectable if multiSelect', () => {
      const hook = renderHook(() =>
        useMenuAria({ ...commonProps, multiSelect: true }),
      );

      const attributes = hook.result.current;
      expect(attributes['aria-multiselectable']).toBe(true);
    });
  });

  describe('inside popover', () => {
    it('adds aria-controls on popover activator', async () => {
      renderHookInPopover(
        { id: 'test', role: 'menu' },
        { children: 'Popover content' },
      );

      const activator = screen.getByRole('button');

      await userEvent.click(activator);

      expect(activator.getAttribute('aria-controls')).toContain('test');
    });
  });
});
