import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { TableFilterButton } from './TableFilterButton';

const defaultProps = {
  filterValue: [],
  setFilter: vi.fn(),
  uniqueValues: ['Value A', 'Value B', 'Value C'],
};

describe('TableFilterButton', () => {
  it('renders a filter button', () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'filterable' });
    expect(button).toBeInTheDocument();
  });

  it('does not show the filter panel by default', () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    const panel = screen.queryByRole('dialog');
    expect(panel).not.toBeInTheDocument();
  });

  it('opens the filter panel when the button is clicked', async () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'filterable' });
    await userEvent.click(button);

    const panel = screen.getByRole('dialog');
    expect(panel).toBeInTheDocument();
  });

  it('closes the filter panel when the button is clicked again', async () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'filterable' });
    await userEvent.click(button);
    await userEvent.click(button);

    const panel = screen.queryByRole('dialog');
    expect(panel).not.toBeInTheDocument();
  });

  it('closes the filter panel when Escape is pressed', async () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'filterable' });
    await userEvent.click(button);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders all unique values as checkboxes', async () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    await userEvent.click(screen.getByRole('button', { name: 'filterable' }));

    expect(
      screen.getByRole('checkbox', { name: 'Value A' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Value B' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Value C' }),
    ).toBeInTheDocument();
  });

  it('shows the aria-expanded attribute on the button', async () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'filterable' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  describe('props', () => {
    describe('filterableText', () => {
      it('changes the button aria-label', () => {
        const screen = render(
          <TableFilterButton
            {...defaultProps}
            filterableText="Investment filter"
          />,
        );

        const button = screen.getByRole('button', {
          name: 'Investment filter',
        });
        expect(button).toBeInTheDocument();
      });
    });

    describe('filterValue', () => {
      it('shows the active state when filters are selected', () => {
        const screen = render(
          <TableFilterButton {...defaultProps} filterValue={['Value A']} />,
        );

        const button = screen.getByRole('button', {
          name: 'filterable (active)',
        });
        expect(button).toBeInTheDocument();
      });

      it('checks the selected filter values', async () => {
        const screen = render(
          <TableFilterButton
            {...defaultProps}
            filterValue={['Value A', 'Value C']}
          />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable (active)' }),
        );

        expect(screen.getByRole('checkbox', { name: 'Value A' })).toBeChecked();
        expect(
          screen.getByRole('checkbox', { name: 'Value B' }),
        ).not.toBeChecked();
        expect(screen.getByRole('checkbox', { name: 'Value C' })).toBeChecked();
      });
    });

    describe('setFilter', () => {
      it('calls setFilter with new value when a checkbox is selected', async () => {
        const setFilter = vi.fn();
        const screen = render(
          <TableFilterButton {...defaultProps} setFilter={setFilter} />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable' }),
        );
        await userEvent.click(
          screen.getByRole('checkbox', { name: 'Value A' }),
        );

        expect(setFilter).toHaveBeenCalledWith(['Value A']);
      });

      it('calls setFilter without the value when a checkbox is deselected', async () => {
        const setFilter = vi.fn();
        const screen = render(
          <TableFilterButton
            {...defaultProps}
            filterValue={['Value A', 'Value B']}
            setFilter={setFilter}
          />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable (active)' }),
        );
        await userEvent.click(
          screen.getByRole('checkbox', { name: 'Value A' }),
        );

        expect(setFilter).toHaveBeenCalledWith(['Value B']);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues when closed', async () => {
      const screen = render(<TableFilterButton {...defaultProps} />);
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues when open', async () => {
      const screen = render(<TableFilterButton {...defaultProps} />);
      await userEvent.click(screen.getByRole('button', { name: 'filterable' }));

      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
