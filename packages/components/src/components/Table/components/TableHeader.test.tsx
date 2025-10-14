import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTableProvider } from '../TableProvider';
import { TableHeader } from './TableHeader';

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
      <IressTableProvider rows={[]}>
        <table>
          <TableHeader tableId="id" />
        </table>
      </IressTableProvider>,
    );

    const header = screen.queryByRole('rowgroup');
    expect(header).not.toBeInTheDocument();
  });

  it('renders if there are columns', () => {
    const screen = render(
      <IressTableProvider rows={[{ hello: 'world' }]}>
        <table>
          <thead>
            <TableHeader tableId="id" />
          </thead>
        </table>
      </IressTableProvider>,
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
        <IressTableProvider rows={[{ hello: 'world' }]}>
          <table>
            <thead>
              <TableHeader tableId="id" />
            </thead>
          </table>
        </IressTableProvider>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
