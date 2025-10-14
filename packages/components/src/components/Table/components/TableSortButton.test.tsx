import { render } from '@testing-library/react';
import { TableSortButton } from './TableSortButton';
import styles from '../Table.module.scss';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

describe('TableSortButton', () => {
  it('renders a sort button with defaults', async () => {
    const toggleSorting = vi.fn();

    const screen = render(<TableSortButton toggleSorting={toggleSorting} />);

    const button = screen.getByRole('button', { name: 'sortable' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.sortButton, styles.sortButtonNoWrap);

    await userEvent.click(button);
    expect(toggleSorting).toHaveBeenCalled();

    const icon = screen.getByRole('img', { name: 'sortable' });
    expect(icon).toHaveClass('fa-sort');
  });

  describe('props', () => {
    describe('label', () => {
      it('changes the button label', () => {
        const screen = render(
          <TableSortButton label="test" toggleSorting={vi.fn()} />,
        );

        const button = screen.getByRole('button', { name: 'test' });
        expect(button).toBeInTheDocument();
      });
    });

    describe('noWrap', () => {
      it('removes the no wrap class to the button', () => {
        const screen = render(
          <TableSortButton
            label="test"
            noWrap={false}
            toggleSorting={vi.fn()}
          />,
        );

        const button = screen.getByRole('button', { name: 'test' });
        expect(button).not.toHaveClass(styles.sortButtonNoWrap);
      });
    });

    describe('sort', () => {
      it('changes the icon when sorting', () => {
        const screen = render(
          <TableSortButton
            toggleSorting={vi.fn()}
            sort={{ id: 'test', desc: false }}
          />,
        );

        const icon = screen.getByRole('img', { name: 'sortable' });
        expect(icon).toHaveClass('fa-sort-up');
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(<TableSortButton toggleSorting={vi.fn()} />);
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
