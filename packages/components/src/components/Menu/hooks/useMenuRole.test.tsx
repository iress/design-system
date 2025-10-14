import { renderHook } from '@testing-library/react';
import { useMenuRole } from './useMenuRole';
import { MenuRoles } from '../Menu.types';
import { IressPopover, IressPopoverProps } from '@/main';
import { PropsWithChildren } from 'react';

function renderHookInPopover(
  multiSelect?: boolean,
  role?: MenuRoles,
  wrapperProps: Partial<IressPopoverProps> = {},
) {
  return renderHook(() => useMenuRole(multiSelect, role), {
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

describe('useMenuRole', () => {
  it('returns list by default', () => {
    const hook = renderHook(() => useMenuRole());
    const role = hook.result.current;
    expect(role).toBe('list');
  });

  it('returns listbox when set to multiSelect', () => {
    const hook = renderHook(() => useMenuRole(true, 'menu'));
    const role = hook.result.current;
    expect(role).toBe('listbox');
  });

  it('returns role directly if not multiSelect', () => {
    const hook = renderHook(() => useMenuRole(undefined, 'menu'));
    const role = hook.result.current;
    expect(role).toBe('menu');
  });

  it('returns list when role=nav', () => {
    const hook = renderHook(() => useMenuRole(undefined, 'nav'));
    const role = hook.result.current;
    expect(role).toBe('list');
  });

  describe('inside popover', () => {
    it('returns popover role', () => {
      const hook = renderHookInPopover(true, 'menu', {
        type: IressPopover.Type.Listbox,
      });
      const role = hook.result.current;
      expect(role).toBe('listbox');
    });
  });
});
