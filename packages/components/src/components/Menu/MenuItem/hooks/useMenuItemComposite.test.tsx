import { render, renderHook } from '@testing-library/react';
import { MenuProvider } from '../../MenuProvider';
import { MenuProviderProps } from '../../Menu.types';
import { PropsWithChildren, ReactElement } from 'react';
import { useMenuItemComposite } from './useMenuItemComposite';
import styles from '../MenuItem.module.scss';
import { CompositeItem } from '@floating-ui/react';
import { IressPopover, IressPopoverProps } from '@/components/Popover';

function renderHookInMenu(
  node?: ReactElement,
  role?: string,
  wrapperProps: Partial<MenuProviderProps> = {},
) {
  return renderHook(() => useMenuItemComposite(node, role), {
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
  node?: ReactElement,
  role?: string,
  wrapperProps: Partial<IressPopoverProps> = {},
) {
  return renderHook(() => useMenuItemComposite(node, role), {
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

describe('useMenuItemComposite', () => {
  it('returns nothing if no node', () => {
    const hook = renderHook(() => useMenuItemComposite());
    const node = hook.result.current;
    expect(node).toBeNull();
  });

  it('returns node as-is if role is not listitem', () => {
    const button = <button>test</button>;
    const hook = renderHook(() => useMenuItemComposite(button));
    const node = hook.result.current;
    expect(node).toBe(button);
  });

  it('wraps node if role=listitem', () => {
    const button = <button>test</button>;
    const hook = renderHook(() => useMenuItemComposite(button, 'listitem'));

    const node = hook.result.current;
    expect(node).not.toBe(button);

    const screen = render(node);
    expect(screen.getByRole('button').parentElement).toHaveClass(
      styles.listItem,
    );
  });

  describe('inside menu', () => {
    it('returns node directly if menu has no role', () => {
      const button = <button>test</button>;
      const hook = renderHookInMenu(button, 'option');
      const node = hook.result.current;
      expect(node).toBe(button);
    });

    it('returns composite if menu role=menu', () => {
      const button = <button>test</button>;
      const hook = renderHookInMenu(button, 'option', { role: 'menu' });
      const node = hook.result.current;
      expect(node?.type).toBe(CompositeItem);
    });

    it('returns composite if menu role=listbox', () => {
      const button = <button>test</button>;
      const hook = renderHookInMenu(button, 'option', { role: 'listbox' });
      const node = hook.result.current;
      expect(node?.type).toBe(CompositeItem);
    });
  });

  describe('inside popover', () => {
    it('returns node directly if popover role=menu', () => {
      const button = <button>test</button>;
      const hook = renderHookInPopover(button, 'option', { role: 'menu' });
      const node = hook.result.current;
      expect(node).toBe(button);
    });

    it('returns node directly if popover role=listbox', () => {
      const button = <button>test</button>;
      const hook = renderHookInPopover(button, 'option', { role: 'listbox' });
      const node = hook.result.current;
      expect(node).toBe(button);
    });
  });
});
