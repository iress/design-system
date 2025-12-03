import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import styles from './Menu.module.scss';
import {
  IressMenu,
  IressMenuItem,
  IressMenuDivider,
  IressMenuHeading,
  type IressMenuProps,
} from '.';

const TEST_ID = 'test-component';
const TEST_CHILDREN = [
  <IressMenuHeading key="1">Menu heading</IressMenuHeading>,
  <IressMenuItem key="2" value="2">
    Menu item (button)
  </IressMenuItem>,
  <IressMenuDivider key="3" />,
  <IressMenuItem key="4" href="https://iress.com">
    Menu item (link)
  </IressMenuItem>,
  <IressMenuItem selected key="5" value="5">
    Menu item (selected)
  </IressMenuItem>,
];

function renderComponent(
  props: IressMenuProps = {},
  renderFn: typeof render = render,
) {
  return renderFn(
    <IressMenu {...props} data-testid={TEST_ID}>
      {props?.children ?? TEST_CHILDREN}
    </IressMenu>,
  );
}

// TODO: We are currently adding menuitem to the menu headings to pass WCAG, but these are non-interactive.
// Probably need to test with a screen reader to see if the current implementation makes sense.
function getInteractiveItems(role = 'menuitem', length = 3) {
  const interactiveItems = screen
    .getAllByRole(role)
    .filter((item) => item.hasAttribute('tabindex'));
  expect(interactiveItems).toHaveLength(length);
  return interactiveItems;
}

describe('IressMenu', () => {
  it('renders the correct content, classes and role', () => {
    renderComponent({
      className: 'test-class',
    });

    const menu = screen.getByRole('list');
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveClass(styles.menu, styles.stack, 'test-class');
  });

  describe('interactions', () => {
    describe('role=menu', () => {
      const commonProps: IressMenuProps = {
        role: 'menu',
      };

      it('navigates the menu using up and down arrow keys in stack mode', async () => {
        renderComponent({ ...commonProps });
        const interactiveItems = getInteractiveItems();

        await userEvent.tab(); // tab to menu

        expect(interactiveItems[0]).toHaveFocus();

        await userEvent.keyboard('{ArrowDown}');

        await waitFor(() => expect(interactiveItems[1]).toHaveFocus());

        await userEvent.keyboard('{ArrowDown}');

        await waitFor(() => expect(interactiveItems[2]).toHaveFocus());

        await userEvent.keyboard('{ArrowUp}');

        await waitFor(() => expect(interactiveItems[1]).toHaveFocus());

        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{ArrowDown}');

        // Loops, goes back to first item
        await waitFor(() => expect(interactiveItems[0]).toHaveFocus());
      });

      it('navigates the menu using left and right arrow keys in inline mode', async () => {
        renderComponent({ ...commonProps, layout: 'inline' });
        const interactiveItems = getInteractiveItems();

        await userEvent.tab(); // tab to menu

        expect(interactiveItems[0]).toHaveFocus();

        await userEvent.keyboard('{ArrowRight}');

        await waitFor(() => expect(interactiveItems[1]).toHaveFocus());

        await userEvent.keyboard('{ArrowRight}');

        await waitFor(() => expect(interactiveItems[2]).toHaveFocus());

        await userEvent.keyboard('{ArrowLeft}');

        await waitFor(() => expect(interactiveItems[1]).toHaveFocus());

        await userEvent.keyboard('{ArrowRight}');
        await userEvent.keyboard('{ArrowRight}');

        // Loops, goes back to first item
        await waitFor(() => expect(interactiveItems[0]).toHaveFocus());
      });
    });

    describe('role=listbox', () => {
      const commonProps: IressMenuProps = {
        role: 'listbox',
      };

      it('navigates the listbox using up and down arrow keys in stack mode', async () => {
        renderComponent({ ...commonProps });
        const interactiveItems = getInteractiveItems('option');

        await userEvent.tab(); // tab to listbox

        expect(interactiveItems[0]).toHaveFocus();

        await userEvent.keyboard('{ArrowDown}');

        await waitFor(() => expect(interactiveItems[1]).toHaveFocus());

        await userEvent.keyboard('{ArrowDown}');

        await waitFor(() => expect(interactiveItems[2]).toHaveFocus());

        await userEvent.keyboard('{ArrowUp}');

        await waitFor(() => expect(interactiveItems[1]).toHaveFocus());

        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{ArrowDown}');

        // No looping, stays on last item
        await waitFor(() => expect(interactiveItems[2]).toHaveFocus());
      });

      it('navigates the menu using left and right arrow keys in inline mode', async () => {
        renderComponent({ ...commonProps, layout: 'inline' });
        const interactiveItems = getInteractiveItems('option');

        await userEvent.tab(); // tab to menu

        expect(interactiveItems[0]).toHaveFocus();

        await userEvent.keyboard('{ArrowRight}');

        await waitFor(() => expect(interactiveItems[1]).toHaveFocus());

        await userEvent.keyboard('{ArrowRight}');

        await waitFor(() => expect(interactiveItems[2]).toHaveFocus());

        await userEvent.keyboard('{ArrowLeft}');

        await waitFor(() => expect(interactiveItems[1]).toHaveFocus());

        await userEvent.keyboard('{ArrowRight}');
        await userEvent.keyboard('{ArrowRight}');

        // No looping, stays on last item
        await waitFor(() => expect(interactiveItems[2]).toHaveFocus());
      });

      it('selects the item in single select mode', async () => {
        const onChange = vi.fn();
        renderComponent({ ...commonProps, onChange });
        const interactiveItems = getInteractiveItems('option');

        await userEvent.tab(); // tab to menu

        expect(interactiveItems[0]).toHaveFocus();

        await userEvent.keyboard('{Enter}');

        expect(onChange).toHaveBeenCalledWith('2');

        await waitFor(() =>
          expect(interactiveItems[0]).toHaveAttribute('aria-selected', 'true'),
        );
      });

      it('selects the item in multi-select mode', async () => {
        const onChange = vi.fn();
        renderComponent({
          ...commonProps,
          onChange,
          multiSelect: true,
        });
        const interactiveItems = getInteractiveItems('option');

        await userEvent.tab(); // tab to menu

        expect(interactiveItems[0]).toHaveFocus();

        await userEvent.keyboard('{Enter}');

        expect(onChange).toHaveBeenCalledWith(['2']);

        await waitFor(() =>
          expect(interactiveItems[0]).toHaveAttribute('aria-selected', 'true'),
        );

        await userEvent.keyboard('{Enter}');

        expect(onChange).toHaveBeenCalledWith([]);

        await waitFor(() =>
          expect(interactiveItems[0]).toHaveAttribute('aria-selected', 'false'),
        );
      });

      it('updates the selected item when selected prop changes', () => {
        const { rerender } = renderComponent({ ...commonProps, selected: '2' });
        const interactiveItems = getInteractiveItems('option');

        expect(interactiveItems[0]).toHaveAttribute('aria-selected', 'true');
        expect(interactiveItems[2]).toHaveAttribute('aria-selected', 'false');

        renderComponent({ ...commonProps, selected: '5' }, rerender as never);

        expect(interactiveItems[0]).toHaveAttribute('aria-selected', 'false');
        expect(interactiveItems[2]).toHaveAttribute('aria-selected', 'true');
      });

      it('does not emit a change event when an item is blurred', async () => {
        const onChange = vi.fn();
        renderComponent({ ...commonProps, onChange });
        const interactiveItems = getInteractiveItems('option');

        await userEvent.tab(); // tab to menu

        expect(interactiveItems[0]).toHaveFocus();
        expect(interactiveItems[0]).toHaveAttribute('aria-selected', 'false');

        await userEvent.tab(); // tab away

        expect(onChange).not.toHaveBeenCalled();
        expect(interactiveItems[0]).toHaveAttribute('aria-selected', 'false');
      });

      it('does emit a change event when an item is blurred when changeOnBlur is true', async () => {
        const onChange = vi.fn();
        renderComponent({
          ...commonProps,
          onChange,
          changeOnBlur: true,
        });
        const interactiveItems = getInteractiveItems('option');

        await userEvent.tab(); // tab to menu

        expect(interactiveItems[0]).toHaveFocus();
        expect(interactiveItems[0]).toHaveAttribute('aria-selected', 'false');

        await userEvent.tab(); // tab away

        expect(onChange).toHaveBeenCalled();
        expect(interactiveItems[0]).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('accessibility', () => {
    it('menu should be accessible', async () => {
      const { container } = render(
        <>
          <IressMenu aria-label="Default example">{TEST_CHILDREN}</IressMenu>
          <IressMenu role="menu" aria-label="Menu example">
            {TEST_CHILDREN}
          </IressMenu>
          <IressMenu role="listbox" aria-label="Listbox example">
            {TEST_CHILDREN}
          </IressMenu>
          <IressMenu multiSelect aria-label="Multiselect example">
            {TEST_CHILDREN}
          </IressMenu>
          <nav>
            <IressMenu aria-label="Nav example" role="nav">
              {TEST_CHILDREN}
            </IressMenu>
          </nav>
        </>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
