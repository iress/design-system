import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { useMenuItemRole } from './useMenuItemRole';
import { MenuProviderProps } from '../../Menu.types';
import { MenuProvider } from '../../MenuProvider';
import { IressPopover, IressPopoverProps } from '@/main';

function renderHookInMenu(wrapperProps: Partial<MenuProviderProps> = {}) {
  return renderHook(() => useMenuItemRole(), {
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

function renderHookInPopover(wrapperProps: Partial<IressPopoverProps> = {}) {
  return renderHook(() => useMenuItemRole(), {
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

describe('useMenuItemRole', () => {
  it('returns nothing if not in menu', () => {
    const hook = renderHook(() => useMenuItemRole());
    const role = hook.result.current;
    expect(role).toBeUndefined();
  });

  describe('inside menu', () => {
    it('returns option if menu role=listbox', () => {
      const hook = renderHookInMenu({ role: 'listbox' });
      const role = hook.result.current;
      expect(role).toBe('option');
    });

    it('returns menuitem if menu role=menu', () => {
      const hook = renderHookInMenu({ role: 'menu' });
      const role = hook.result.current;
      expect(role).toBe('menuitem');
    });

    it('returns listitem if menu role=list', () => {
      const hook = renderHookInMenu({ role: 'list' });
      const role = hook.result.current;
      expect(role).toBe('listitem');
    });
  });

  describe('inside popover', () => {
    it('returns option if popover type=listbox', () => {
      const hook = renderHookInPopover({ type: IressPopover.Type.Listbox });
      const role = hook.result.current;
      expect(role).toBe('option');
    });

    it('returns menuitem if popover type=menu', () => {
      const hook = renderHookInPopover({ type: IressPopover.Type.Menu });
      const role = hook.result.current;
      expect(role).toBe('menuitem');
    });
  });
});
