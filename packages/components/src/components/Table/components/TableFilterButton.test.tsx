import { act, render, waitFor } from '@testing-library/react';
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

  it('does not show the filter menu by default', () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    expect(
      screen.getAllByRole('option', { hidden: true })[0],
    ).not.toBeVisible();
  });

  it('opens the filter menu when the button is clicked', async () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    await userEvent.click(screen.getByRole('button', { name: 'filterable' }));

    expect(screen.getByRole('option', { name: 'Value A' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Value B' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Value C' })).toBeVisible();
  });

  it('closes the filter menu when the button is clicked again', async () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'filterable' });
    await userEvent.click(button);
    await userEvent.click(button);

    expect(
      screen.getAllByRole('option', { hidden: true })[0],
    ).not.toBeVisible();
  });

  it('closes the filter menu when Escape is pressed', async () => {
    const screen = render(<TableFilterButton {...defaultProps} />);

    await userEvent.click(screen.getByRole('button', { name: 'filterable' }));
    expect(screen.getByRole('option', { name: 'Value A' })).toBeVisible();

    await userEvent.keyboard('{Escape}');
    expect(
      screen.getAllByRole('option', { hidden: true })[0],
    ).not.toBeVisible();
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

        expect(
          screen.getByRole('button', { name: 'Investment filter' }),
        ).toBeInTheDocument();
      });
    });

    describe('filterValue', () => {
      it('shows the active state when filters are selected', () => {
        const screen = render(
          <TableFilterButton {...defaultProps} filterValue={['Value A']} />,
        );

        expect(
          screen.getByRole('button', { name: 'filterable(1 active)' }),
        ).toBeInTheDocument();
      });

      it('shows a indicator when filters are active', () => {
        const screen = render(
          <TableFilterButton
            {...defaultProps}
            filterValue={['Value A', 'Value B']}
          />,
        );

        const indicator = screen.getByLabelText('(2 active)');
        expect(indicator).toBeInTheDocument();
      });

      it('does not show a indicator when no filters are active', () => {
        const screen = render(
          <TableFilterButton {...defaultProps} filterValue={[]} />,
        );

        expect(screen.queryByText('0')).not.toBeInTheDocument();
      });

      it('shows selected options as aria-selected when the menu is open', async () => {
        const screen = render(
          <TableFilterButton
            {...defaultProps}
            filterValue={['Value A', 'Value C']}
          />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable(2 active)' }),
        );

        await waitFor(() =>
          expect(
            screen.getByRole('option', { name: 'Value A' }),
          ).toHaveAttribute('aria-selected', 'true'),
        );
        expect(screen.getByRole('option', { name: 'Value B' })).toHaveAttribute(
          'aria-selected',
          'false',
        );
        expect(screen.getByRole('option', { name: 'Value C' })).toHaveAttribute(
          'aria-selected',
          'true',
        );
      });
    });

    describe('filterFormat', () => {
      it('renders formatted content for each filter option when a function is provided', async () => {
        const screen = render(
          <TableFilterButton
            {...defaultProps}
            filterFormat={(value: string) => (
              <span data-testid={`badge-${value}`}>
                {String(value).toUpperCase()}
              </span>
            )}
          />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable' }),
        );

        expect(screen.getByTestId('badge-Value A')).toBeInTheDocument();
        expect(screen.getByTestId('badge-Value B')).toBeInTheDocument();
        expect(screen.getByTestId('badge-Value C')).toBeInTheDocument();
      });
    });

    describe('setFilter', () => {
      it('calls setFilter with new value when an option is selected', async () => {
        const setFilter = vi.fn();
        const screen = render(
          <TableFilterButton {...defaultProps} setFilter={setFilter} />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable' }),
        );
        await userEvent.click(screen.getByRole('option', { name: 'Value A' }));

        expect(setFilter).toHaveBeenCalledWith(['Value A']);
      });

      it('calls setFilter without the value when an option is deselected', async () => {
        const setFilter = vi.fn();
        const screen = render(
          <TableFilterButton
            {...defaultProps}
            filterValue={['Value A', 'Value B']}
            setFilter={setFilter}
          />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable(2 active)' }),
        );
        await userEvent.click(screen.getByRole('option', { name: 'Value A' }));

        expect(setFilter).toHaveBeenCalledWith(['Value B']);
      });
    });

    describe('clear filter', () => {
      it('does not show a clear filter button when no filters are active', () => {
        const screen = render(<TableFilterButton {...defaultProps} />);

        expect(
          screen.queryByRole('button', { name: 'Clear filter' }),
        ).not.toBeInTheDocument();
      });

      it('shows a clear filter button when filters are active', async () => {
        const screen = render(
          <TableFilterButton {...defaultProps} filterValue={['Value A']} />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable(1 active)' }),
        );

        expect(
          screen.getByRole('option', { name: 'Clear filter' }),
        ).toBeInTheDocument();
      });

      it('calls setFilter with an empty array when the clear filter button is clicked', async () => {
        const setFilter = vi.fn();
        const screen = render(
          <TableFilterButton
            {...defaultProps}
            filterValue={['Value A', 'Value B']}
            setFilter={setFilter}
          />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable(2 active)' }),
        );
        await userEvent.click(
          screen.getByRole('option', { name: 'Clear filter' }),
        );

        expect(setFilter).toHaveBeenCalledWith([]);
      });
    });

    describe('footer', () => {
      it('renders custom footer content in the popover', async () => {
        const screen = render(
          <TableFilterButton
            {...defaultProps}
            footer={<button data-testid="custom-footer">Edit</button>}
          />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable' }),
        );

        expect(screen.getByTestId('custom-footer')).toBeVisible();
      });

      it('does not render a footer divider when footer is not provided', async () => {
        const screen = render(<TableFilterButton {...defaultProps} />);

        await userEvent.click(
          screen.getByRole('button', { name: 'filterable' }),
        );

        const separators = screen.queryAllByRole('separator');
        expect(separators).toHaveLength(0);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues when closed', async () => {
      const screen = render(<TableFilterButton {...defaultProps} />);

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues when open', async () => {
      const screen = render(<TableFilterButton {...defaultProps} />);
      await userEvent.click(screen.getByRole('button', { name: 'filterable' }));

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
