import { render } from '@testing-library/react';
import { IressMenuProps } from '../Menu.types';
import { axe } from 'jest-axe';
import { IressMenuItem } from './MenuItem';
import { IressMenuItemProps } from './MenuItem.types';
import { IressMenu } from '../Menu';

const TEST_ID = 'test-component';
const MENU_TEST_ID = 'test-menu';

function renderComponent(props?: IressMenuItemProps) {
  return render(<IressMenuItem {...props} data-testid={TEST_ID} />);
}

function renderInsideMenu(
  props?: IressMenuProps,
  itemProps?: IressMenuItemProps,
  wrapperTag = 'div',
) {
  const Wrapper = wrapperTag as keyof JSX.IntrinsicElements;

  return render(
    <Wrapper>
      <IressMenu {...props} data-testid={MENU_TEST_ID}>
        <IressMenuItem {...itemProps} data-testid={TEST_ID} />
      </IressMenu>
    </Wrapper>,
  );
}

describe('IressMenuButton', () => {
  it('renders as button', () => {
    const screen = renderComponent({
      children: 'Test',
    });
    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toBeInTheDocument();
  });

  describe('inside menu', () => {
    it('renders inside a listitem element inside default menu', () => {
      const screen = renderInsideMenu({}, { children: 'Test' });
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button).toBeInTheDocument();
      expect(button.parentElement).toHaveAttribute('role', 'listitem');
    });

    it('renders as a menuitem inside a menu with role=menu', () => {
      const screen = renderInsideMenu({ role: 'menu' }, { children: 'Test' });
      const button = screen.getByRole('menuitem', { name: 'Test' });
      expect(button).toBeInTheDocument();
    });

    it('renders as a option inside a menu with role=listbox', () => {
      const screen = renderInsideMenu(
        { role: 'listbox' },
        { children: 'Test' },
      );
      const button = screen.getByRole('option', { name: 'Test' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent({ children: 'Test' });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=list', async () => {
      const screen = renderInsideMenu({ role: 'list' }, { children: 'Test' });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=menu', async () => {
      const screen = renderInsideMenu({ role: 'menu' }, { children: 'Test' });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=listbox', async () => {
      const screen = renderInsideMenu(
        { 'aria-label': 'Test', role: 'listbox' },
        { children: 'Test' },
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=listbox and selected', async () => {
      const screen = renderInsideMenu(
        { 'aria-label': 'Test', role: 'listbox', selected: 'test' },
        { children: 'Test', value: 'test' },
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
