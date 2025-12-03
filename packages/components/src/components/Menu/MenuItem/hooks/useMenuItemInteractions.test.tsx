import { render, renderHook } from '@testing-library/react';
import { MenuProvider } from '../../MenuProvider';
import { type MenuProviderProps } from '../../Menu.types';
import { type PropsWithChildren } from 'react';
import { useMenuItemInteractions } from './useMenuItemInteractions';
import userEvent from '@testing-library/user-event';
import {
  type MenuItemInteractionsHookProps,
  type MenuItemInteractionsHookReturn,
} from '../MenuItem.types';
import classNames from 'classnames';
import { IressPopover, type IressPopoverProps } from '@/main';

function renderHookSolo(props: Partial<MenuItemInteractionsHookProps> = {}) {
  return renderHook(() => useMenuItemInteractions(props));
}

function renderHookInMenu(
  props: Partial<MenuItemInteractionsHookProps> = {},
  wrapperProps: Partial<MenuProviderProps> = {},
) {
  return renderHook(() => useMenuItemInteractions(props), {
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
  props: Partial<MenuItemInteractionsHookProps> = {},
  wrapperProps: Partial<MenuProviderProps> = {},
  popoverProps: Partial<IressPopoverProps> = {},
) {
  return renderHook(() => useMenuItemInteractions(props), {
    wrapper: ({ children }: PropsWithChildren) => (
      <IressPopover
        {...popoverProps}
        activator={popoverProps.activator ?? <button>Activator</button>}
      >
        <MenuProvider
          {...wrapperProps}
          id={wrapperProps.id ?? 'test'}
          layout={wrapperProps.layout ?? 'stack'}
          role={wrapperProps.role ?? 'list'}
        >
          {children}
        </MenuProvider>
      </IressPopover>
    ),
  });
}

function renderButtonUsingHook(
  interactions: MenuItemInteractionsHookReturn<HTMLButtonElement>,
) {
  const { isActiveInPopover, ...props } = interactions;
  return render(
    <button className={classNames({ active: isActiveInPopover })} {...props}>
      test
    </button>,
  );
}

describe('useMenuItemInteractions', () => {
  it('uses defaults if nothing provided', () => {
    const hook = renderHookSolo();
    const props = hook.result.current;
    expect(props.onClick).toBeInstanceOf(Function);
    expect(props.onKeyDown).toBeInstanceOf(Function);
  });

  describe('props', () => {
    describe('onClick', () => {
      it('calls onClick listener on click of item', async () => {
        const onClick = vi.fn();
        const hook = renderHookSolo({ onClick });
        const screen = renderButtonUsingHook(hook.result.current);

        await userEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('onKeyDown', () => {
      it('calls onKeyDown listener on click of item', async () => {
        const onKeyDown = vi.fn();
        const hook = renderHookSolo({ onKeyDown });
        renderButtonUsingHook(hook.result.current);

        await userEvent.tab(); // focus on button
        await userEvent.keyboard('{Enter}'); // activate

        expect(onKeyDown).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('inside menu', () => {
    it('does nothing if menu is not a selectable menu', async () => {
      const onChange = vi.fn();
      const hook = renderHookInMenu(
        { selected: false, value: 'test' },
        { onChange },
      );
      const screen = renderButtonUsingHook(hook.result.current);

      await userEvent.click(screen.getByRole('button'));

      expect(onChange).not.toHaveBeenCalledWith('test', true);
    });

    it('changes selection in menu if its a selectable menu', async () => {
      const onChange = vi.fn();
      const hook = renderHookInMenu(
        { selected: false, value: 'test' },
        { onChange, role: 'listbox' },
      );
      const screen = renderButtonUsingHook(hook.result.current);

      await userEvent.click(screen.getByRole('button'));

      expect(onChange).toHaveBeenCalledWith('test');
    });

    it('does not unselect in menu if its a selectable menu', async () => {
      const onChange = vi.fn();
      const hook = renderHookInMenu(
        { selected: false, value: 'test' },
        { onChange, role: 'listbox', selected: 'test' },
      );
      const screen = renderButtonUsingHook(hook.result.current);

      await userEvent.click(screen.getByRole('button'));

      expect(onChange).toHaveBeenCalledWith('test');
    });

    it('changes selection in menu if its a selectable menu (multiselect)', async () => {
      const onChange = vi.fn();
      const hook = renderHookInMenu(
        { value: 'test' },
        { onChange, role: 'listbox', multiSelect: true, selected: ['other'] },
      );
      const screen = renderButtonUsingHook(hook.result.current);

      await userEvent.click(screen.getByRole('button'));

      expect(onChange).toHaveBeenCalledWith(['other', 'test']);
    });

    it('unselects in menu if its a selectable menu (multiselect)', async () => {
      const onChange = vi.fn();
      const hook = renderHookInMenu(
        { value: 'test' },
        {
          onChange,
          role: 'listbox',
          multiSelect: true,
          selected: ['other', 'test'],
        },
      );
      const screen = renderButtonUsingHook(hook.result.current);

      await userEvent.click(screen.getByRole('button'));

      expect(onChange).toHaveBeenCalledWith(['other']);
    });
  });

  describe('inside popover', () => {
    it('closes the popover when an item is clicked', async () => {
      const onDeactivated = vi.fn();
      const hook = renderHookInPopover(
        { value: 'test' },
        {
          role: 'listbox',
        },
        {
          onDeactivated,
        },
      );
      const screen = renderButtonUsingHook(hook.result.current);
      const activator = screen.getByRole('button', { name: 'Activator' });

      // open popover
      await userEvent.click(activator);

      // click button with hook
      await userEvent.click(screen.getByRole('button', { name: 'test' }));

      // popover should be closed
      expect(onDeactivated).toHaveBeenCalled();

      // activator should be in focus
      // TODO: Flakey, sometimes fails
      // await waitFor(() => expect(activator).toHaveFocus());
    });
  });
});
