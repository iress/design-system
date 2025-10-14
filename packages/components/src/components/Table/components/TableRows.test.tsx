import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTableProvider } from '../TableProvider';
import { TableRows } from './TableRows';
import { TableHeader } from './TableHeader';
import { Row } from '@tanstack/react-table';

describe('TableRows', () => {
  it('renders nothing if not in an iress table', () => {
    const screen = render(
      <table>
        <TableRows tableId="id" />
      </table>,
    );

    const body = screen.queryByRole('rowgroup');
    expect(body).not.toBeInTheDocument();
  });

  it('renders nothing if no rows', () => {
    const screen = render(
      <IressTableProvider columns={[{ key: 'test', sort: true }]} rows={[]}>
        <table>
          <TableRows tableId="id" />
        </table>
      </IressTableProvider>,
    );

    const body = screen.queryByRole('rowgroup');
    expect(body).not.toBeInTheDocument();
  });

  it('renders if there are rows', () => {
    const screen = render(
      <IressTableProvider rows={[{ hello: 'world' }]}>
        <table>
          <tbody>
            <TableRows tableId="id" />
          </tbody>
        </table>
      </IressTableProvider>,
    );

    const body = screen.getByRole('rowgroup');
    expect(body).toBeInTheDocument();
    expect(body.children).toHaveLength(1);

    const row = screen.getByRole('row', { name: 'world' });
    expect(row).toBeInTheDocument();

    const cell = screen.getByRole('rowheader', { name: 'world' });
    expect(cell).toBeInTheDocument();
  });

  it('renders if there are rows and the col is scope', () => {
    const screen = render(
      <IressTableProvider rows={[{ hello: 'world' }]}>
        <table>
          <tbody>
            <TableRows tableId="id" scope="col" />
          </tbody>
        </table>
      </IressTableProvider>,
    );

    const body = screen.getByRole('rowgroup');
    expect(body).toBeInTheDocument();
    expect(body.children).toHaveLength(1);

    const row = screen.getByRole('row', { name: 'world' });
    expect(row).toBeInTheDocument();

    const cell = screen.getByRole('cell', { name: 'world' });
    expect(cell).toBeInTheDocument();
  });

  it('renders with rowProps if set to an object map', () => {
    const screen = render(
      <IressTableProvider rows={[{ hello: 'world' }]}>
        <table>
          <tbody>
            <TableRows
              tableId="id"
              rowProps={{
                className: 'hello',
              }}
            />
          </tbody>
        </table>
      </IressTableProvider>,
    );

    const row = screen.getByRole('row', { name: 'world' });
    expect(row).toHaveClass('hello');
  });

  it('renders with rowProps if set to a function', () => {
    const screen = render(
      <IressTableProvider rows={[{ hello: 'world' }, { hello: 'otherWorld' }]}>
        <table>
          <tbody>
            <TableRows
              tableId="id"
              rowProps={(row: Row<{ hello?: string }>) => {
                return {
                  className:
                    row.original.hello === 'world' ? 'hello' : 'otherHello',
                };
              }}
            />
          </tbody>
        </table>
      </IressTableProvider>,
    );

    const row = screen.getByRole('row', { name: 'world' });
    expect(row).toHaveClass('hello');

    const otherRow = screen.getByRole('row', { name: 'otherWorld' });
    expect(otherRow).toHaveClass('otherHello');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <IressTableProvider rows={[{ hello: 'world' }]}>
          <table>
            <thead>
              <TableHeader tableId="id" />
            </thead>
            <tbody>
              <TableRows tableId="id" />
            </tbody>
          </table>
        </IressTableProvider>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
