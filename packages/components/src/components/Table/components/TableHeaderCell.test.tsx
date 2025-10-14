import { render } from '@testing-library/react';
import { TableHeaderCell } from './TableHeaderCell';
import { axe } from 'jest-axe';
import { TableProvider } from '../TableProvider';

const columnApi = {
  id: 'test',
  getCanSort: () => false,
  toggleSorting: () => undefined,
};

const columnApiWithSorting = {
  ...columnApi,
  getCanSort: () => true,
};

describe('TableHeaderCell', () => {
  it('renders with defaults', () => {
    const screen = render(
      <table>
        <tbody>
          <tr>
            <TableHeaderCell columnApi={columnApi} tableId="id">
              Heading
            </TableHeaderCell>
          </tr>
        </tbody>
      </table>,
    );

    const heading = screen.getByRole('columnheader', { name: 'Heading' });
    expect(heading).toHaveAttribute('id', 'id__test');

    const sortButton = screen.queryByRole('button', { name: 'sortable' });
    expect(sortButton).not.toBeInTheDocument();
  });

  it('renders a sort button if column supports it', () => {
    const screen = render(
      <TableProvider columns={[{ key: 'test', sort: true }]} rows={[]}>
        <table>
          <thead>
            <tr>
              <TableHeaderCell columnApi={columnApiWithSorting} tableId="id">
                Heading
              </TableHeaderCell>
            </tr>
          </thead>
        </table>
      </TableProvider>,
    );

    const heading = screen.getByRole('columnheader', {
      name: 'Heading sortable',
    });
    expect(heading).toHaveAttribute('id', 'id__test');

    const sortButton = screen.getByRole('button', { name: 'Heading sortable' });
    expect(sortButton).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <table>
          <thead>
            <tr>
              <TableHeaderCell columnApi={columnApiWithSorting} tableId="id">
                Heading
              </TableHeaderCell>
            </tr>
          </thead>
        </table>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
