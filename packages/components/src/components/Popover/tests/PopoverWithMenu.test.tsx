import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IressButton } from '../../Button';
import {
  IressMenuProps,
  IressMenu,
  IressMenuItem,
  IressMenuDivider,
} from '../../Menu';
import { IressPopover } from '../Popover';
import { PopoverTypes } from '../Popover.types';

const TEST_ID = 'test-component';
const ACTIVATOR_TEST_ID = 'test-component__button';

function renderComponent(
  type: PopoverTypes,
  {
    children = [
      <IressMenuItem key="1" value="1" data-testid={`${TEST_ID}_option1`}>
        Option 1
      </IressMenuItem>,
      <IressMenuItem key="2" value="2" data-testid={`${TEST_ID}_option2`}>
        Option 2
      </IressMenuItem>,
      <IressMenuDivider key="divider" />,
      <IressMenuItem key="3" value="3" data-testid={`${TEST_ID}_option3`}>
        Option 3
      </IressMenuItem>,
    ],
    ...restProps
  }: IressMenuProps = {},
  renderFn: typeof render = render,
) {
  return renderFn(
    <IressPopover
      type={type}
      activator={
        <IressButton data-testid={ACTIVATOR_TEST_ID}>Menu</IressButton>
      }
    >
      <IressMenu {...restProps} data-testid={TEST_ID}>
        {children}
      </IressMenu>
    </IressPopover>,
  );
}

describe('IressPopover with IressMenu (integration test)', () => {
  describe('inside popover with type of menu', () => {
    it('renders the correct role (role passes from popover to menu)', async () => {
      renderComponent('menu', {
        role: 'list',
      });

      await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('closes after first selection', async () => {
      renderComponent('menu');

      await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

      const menuItem = screen.getByRole('menuitem', { name: 'Option 1' });

      await userEvent.click(menuItem);

      expect(menuItem).not.toBeVisible();
    });

    it('closes after pressing tab', async () => {
      renderComponent('menu');

      await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

      const menuItem = screen.queryByRole('menuitem', { name: 'Option 1' });

      await waitFor(() => expect(menuItem).toHaveFocus());

      await userEvent.tab();

      expect(menuItem).not.toBeVisible();
    });
  });

  describe('inside popover with type of listbox', () => {
    it('renders the correct role', async () => {
      renderComponent('listbox');

      await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('closes after first selection', async () => {
      renderComponent('listbox');

      await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

      const option = screen.getByRole('option', { name: 'Option 1' });

      await userEvent.click(option);

      expect(option).not.toBeVisible();
    });

    it('closes after pressing tab', async () => {
      renderComponent('listbox');

      await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

      const option = screen.queryByRole('option', { name: 'Option 1' });

      await waitFor(() => expect(option).toHaveFocus());

      await userEvent.tab();

      expect(option).not.toBeVisible();
    });

    it('closes after pressing up key on first element', async () => {
      renderComponent('listbox');

      await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

      const option = screen.queryByRole('option', { name: 'Option 1' });

      await waitFor(() => expect(option).toHaveFocus());

      await userEvent.keyboard('{ArrowUp}');

      expect(option).not.toBeVisible();
    });

    it('maintains the selected state when a popover is opened', async () => {
      renderComponent('listbox', {
        children: (
          <>
            <IressMenuItem value="1">Option 1</IressMenuItem>
            <IressMenuItem value="2">Option 2</IressMenuItem>
          </>
        ),
        selected: '1',
      });

      await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

      expect(
        screen.getByRole('option', { name: 'Option 1', selected: true }),
      ).toBeInTheDocument();
    });

    it('multiselect => does not close after first selection', async () => {
      renderComponent('listbox', {
        multiSelect: true,
        children: (
          <>
            <IressMenuItem value="1">Option 1</IressMenuItem>
            <IressMenuItem value="2">Option 2</IressMenuItem>
          </>
        ),
      });

      await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

      const option = screen.getByRole('option', { name: 'Option 1' });

      await userEvent.click(option);

      expect(option).toBeVisible();
    });

    it('multiselect => maintains the selected state when a popover is opened', async () => {
      const { getByRole } = renderComponent('listbox', {
        multiSelect: true,
        selected: ['1', '2'],
      });

      await userEvent.click(getByRole('button', { name: 'Menu' }));

      expect(
        getByRole('option', { name: 'Option 1', selected: true }),
      ).toBeInTheDocument();
      expect(
        getByRole('option', { name: 'Option 2', selected: true }),
      ).toBeInTheDocument();
    });
  });
});
