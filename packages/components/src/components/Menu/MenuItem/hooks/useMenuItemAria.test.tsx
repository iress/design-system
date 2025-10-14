import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { MenuItemAriaHookProps } from '../MenuItem.types';
import { MenuProviderProps } from '../../Menu.types';
import { useMenuItemAria } from './useMenuItemAria';
import { MenuProvider } from '../../MenuProvider';
import { idsLogger } from '@helpers/utility/idsLogger';

function renderHookInMenu(
  props: MenuItemAriaHookProps = {},
  wrapperProps: Partial<MenuProviderProps> = {},
) {
  return renderHook(() => useMenuItemAria(props), {
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

describe('useMenuItemAria', () => {
  it("doesn't set any aria attributes if no menu is found", () => {
    const hook = renderHook(() => useMenuItemAria({}));

    const attributes = hook.result.current;
    expect(attributes['aria-current']).toBeUndefined();
    expect(attributes['aria-selected']).toBeUndefined();
  });

  it('does not set aria-selected when role=list', () => {
    const hook = renderHookInMenu(
      { selected: true },
      {
        role: 'list',
      },
    );

    const attributes = hook.result.current;
    expect(attributes['aria-current']).toBeUndefined();
    expect(attributes['aria-selected']).toBeUndefined();
  });

  it('does not set aria-selected when role=menu', () => {
    const hook = renderHookInMenu(
      { value: 'test' },
      {
        role: 'menu',
        selected: 'test',
      },
    );

    const attributes = hook.result.current;
    expect(attributes['aria-current']).toBeUndefined();
    expect(attributes['aria-selected']).toBeUndefined();
  });

  it('sets aria-selected when role=listbox', () => {
    const hook = renderHookInMenu(
      { value: 'test' },
      {
        role: 'listbox',
        selected: 'test',
      },
    );

    const attributes = hook.result.current;
    expect(attributes['aria-current']).toBeUndefined();
    expect(attributes['aria-selected']).toBe(true);
  });

  it('sets aria-current when role=nav', () => {
    const hook = renderHookInMenu(
      { selected: true },
      {
        role: 'nav',
      },
    );

    const attributes = hook.result.current;
    expect(attributes['aria-current']).toBe(true);
    expect(attributes['aria-selected']).toBeUndefined();
  });

  it('sets aria-current when nav=true', () => {
    const hook = renderHookInMenu(
      { selected: true },
      {
        nav: true,
      },
    );

    const attributes = hook.result.current;
    expect(attributes['aria-current']).toBe(true);
    expect(attributes['aria-selected']).toBeUndefined();
  });

  it('gives a warning if the selected prop is used inside a listbox menu', () => {
    const hook = renderHookInMenu(
      { selected: true },
      {
        role: 'listbox',
      },
    );

    const attributes = hook.result.current;
    expect(attributes['aria-current']).toBeUndefined();
    expect(attributes['aria-selected']).toBe(false);

    expect(idsLogger).toHaveBeenCalledTimes(1);
  });
});
