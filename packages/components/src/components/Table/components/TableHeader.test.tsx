import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TableHeader } from './TableHeader';
import { TableProvider } from '../TableProvider';

describe('TableHeader', () => {
  it('renders nothing if not in an iress table', () => {
    const screen = render(
      <table>
        <TableHeader tableId="id" />
      </table>,
    );

    const header = screen.queryByRole('rowgroup');
    expect(header).not.toBeInTheDocument();
  });

  it('renders nothing if no columns found', () => {
    const screen = render(
      <TableProvider rows={[]}>
        <table>
          <TableHeader tableId="id" />
        </table>
      </TableProvider>,
    );

    const header = screen.queryByRole('rowgroup');
    expect(header).not.toBeInTheDocument();
  });

  it('renders if there are columns', () => {
    const screen = render(
      <TableProvider rows={[{ hello: 'world' }]}>
        <table>
          <thead>
            <TableHeader tableId="id" />
          </thead>
        </table>
      </TableProvider>,
    );

    const header = screen.getByRole('rowgroup');
    expect(header).toBeInTheDocument();
    expect(header.children).toHaveLength(1);

    const row = screen.getByRole('columnheader', { name: 'Hello' });
    expect(row).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <TableProvider rows={[{ hello: 'world' }]}>
          <table>
            <thead>
              <TableHeader tableId="id" />
            </thead>
          </table>
        </TableProvider>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
