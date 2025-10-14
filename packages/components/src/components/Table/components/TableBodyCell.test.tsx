import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTableProvider } from '../TableProvider';
import { TableBodyCell } from './TableBodyCell';
import { TableHeader } from './TableHeader';

const cellApi = {
  id: 'test',
  column: {
    id: 'column',
  } as never,
  row: {
    getVisibleCells: () => [{ id: 'test' }],
  } as never,
};

describe('TableBodyCell', () => {
  it('renders with defaults', () => {
    const screen = render(
      <table>
        <tbody>
          <tr>
            <TableBodyCell cellApi={cellApi} index={0} tableId="id">
              Hello
            </TableBodyCell>
            <TableBodyCell
              cellApi={{ ...cellApi, id: 'test2' }}
              index={1}
              tableId="id"
            >
              World
            </TableBodyCell>
          </tr>
        </tbody>
      </table>,
    );

    const col1 = screen.getByRole('rowheader', { name: 'Hello' });
    expect(col1).toHaveAttribute('id', 'id__test');
    expect(col1).toHaveAttribute('headers', 'id__column');

    const col2 = screen.getByRole('cell', { name: 'World' });
    expect(col2).toHaveAttribute('id', 'id__test2');
    expect(col2).toHaveAttribute('headers', 'id__column id__test');
  });

  it('renders both as cells if scope is col', () => {
    const screen = render(
      <table>
        <tbody>
          <tr>
            <TableBodyCell cellApi={cellApi} index={0} tableId="id" scope="col">
              Hello
            </TableBodyCell>
            <TableBodyCell
              cellApi={{ ...cellApi, id: 'test2' }}
              index={1}
              tableId="id"
              scope="col"
            >
              World
            </TableBodyCell>
          </tr>
        </tbody>
      </table>,
    );

    const col1 = screen.getByRole('cell', { name: 'Hello' });
    expect(col1).toHaveAttribute('id', 'id__test');
    expect(col1).toHaveAttribute('headers', 'id__column');

    const col2 = screen.getByRole('cell', { name: 'World' });
    expect(col2).toHaveAttribute('id', 'id__test2');
    expect(col2).toHaveAttribute('headers', 'id__column');
  });

  describe('props', () => {
    describe('hiddenHeader', () => {
      it('does not add the column id to the headers attribute', () => {
        const screen = render(
          <table>
            <tbody>
              <tr>
                <TableBodyCell
                  cellApi={cellApi}
                  index={0}
                  tableId="id"
                  hiddenHeader
                >
                  Hello
                </TableBodyCell>
                <TableBodyCell
                  cellApi={{ ...cellApi, id: 'test2' }}
                  index={1}
                  tableId="id"
                  hiddenHeader
                >
                  World
                </TableBodyCell>
              </tr>
            </tbody>
          </table>,
        );

        const col1 = screen.getByRole('rowheader', { name: 'Hello' });
        expect(col1).toHaveAttribute('id', 'id__test');
        expect(col1).not.toHaveAttribute('headers');

        const col2 = screen.getByRole('cell', { name: 'World' });
        expect(col2).toHaveAttribute('id', 'id__test2');
        expect(col2).toHaveAttribute('headers', 'id__test');
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <IressTableProvider columns={{ column: { label: 'Column' } }} rows={[]}>
          <table>
            <TableHeader tableId="id" />
            <tbody>
              <tr>
                <TableBodyCell cellApi={cellApi} index={0} tableId="id">
                  Hello
                </TableBodyCell>
                <TableBodyCell
                  cellApi={{ ...cellApi, id: 'test2' }}
                  index={1}
                  tableId="id"
                >
                  World
                </TableBodyCell>
              </tr>
            </tbody>
          </table>
        </IressTableProvider>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
