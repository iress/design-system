import { renderHook } from '@testing-library/react';
import { type MenuProviderProps, type MenuRoles } from '../Menu.types';
import { useMenuComposite } from './useMenuComposite';
import { type PropsWithChildren } from 'react';
import { MenuProvider } from '../MenuProvider';
import { IressPopover, type IressPopoverProps } from '@/main';

function renderInMenu(
  role?: MenuRoles,
  wrapperProps: Partial<MenuProviderProps> = {},
) {
  return renderHook(() => useMenuComposite(role), {
    wrapper: ({ children }: PropsWithChildren) => (
      <MenuProvider
        {...wrapperProps}
        id={wrapperProps.id ?? 'test'}
        layout={wrapperProps.layout ?? 'stack'}
        role={wrapperProps.role ?? 'list'}
      >
        {children}
      </MenuProvider>
    ),
  });
}

function renderHookInPopover(
  role?: MenuRoles,
  wrapperProps: Partial<IressPopoverProps> = {},
) {
  return renderHook(() => useMenuComposite(role), {
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

describe('useMenuComposite', () => {
  it('returns false by default', () => {
    const hook = renderHook(() => useMenuComposite());
    const isComposite = hook.result.current;
    expect(isComposite).toBeFalsy();
  });

  describe('role', () => {
    it('returns false if role is list', () => {
      const hook = renderHook(() => useMenuComposite('list'));
      const isComposite = hook.result.current;
      expect(isComposite).toBeFalsy();
    });

    it('returns false if role is nav', () => {
      const hook = renderHook(() => useMenuComposite('nav'));
      const isComposite = hook.result.current;
      expect(isComposite).toBeFalsy();
    });

    it('returns true if role is menu', () => {
      const hook = renderHook(() => useMenuComposite('menu'));
      const isComposite = hook.result.current;
      expect(isComposite).toBeTruthy();
    });

    it('returns true if role is listbox', () => {
      const hook = renderHook(() => useMenuComposite('listbox'));
      const isComposite = hook.result.current;
      expect(isComposite).toBeTruthy();
    });
  });

  describe('inside menu', () => {
    it('uses menu if no role provided', () => {
      const hook = renderInMenu(undefined, { role: 'menu' });
      const isComposite = hook.result.current;
      expect(isComposite).toBeTruthy();
    });
  });

  describe('inside popover', () => {
    it('returns false if role is menu', () => {
      const hook = renderHookInPopover(undefined, { role: 'menu' });
      const isComposite = hook.result.current;
      expect(isComposite).toBeFalsy();
    });

    it('returns true if role is listbox', () => {
      const hook = renderHookInPopover(undefined, { role: 'menu' });
      const isComposite = hook.result.current;
      expect(isComposite).toBeFalsy();
    });
  });
});
