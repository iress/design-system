import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TableEmpty } from './TableEmpty';
import { IressTableProvider } from '../TableProvider';
import styles from '../Table.module.scss';

describe('TableEmpty', () => {
  it('renders nothing if not used in table', () => {
    const screen = render(
      <table>
        <TableEmpty>Empty table</TableEmpty>
      </table>,
    );

    const empty = screen.queryByText('Empty table');
    expect(empty).not.toBeInTheDocument();
  });

  it('renders nothing if there are rows in table', () => {
    const screen = render(
      <IressTableProvider
        columns={[{ key: 'test', sort: true }]}
        rows={[{ hello: 'world' }]}
      >
        <table>
          <TableEmpty>Empty table</TableEmpty>
        </table>
        ,
      </IressTableProvider>,
    );

    const empty = screen.queryByText('Empty table');
    expect(empty).not.toBeInTheDocument();
  });

  it('renders nothing if there are no rows in table and columns are not set', () => {
    const screen = render(
      <IressTableProvider rows={[]}>
        <table>
          <TableEmpty>Empty table</TableEmpty>
        </table>
        ,
      </IressTableProvider>,
    );

    const empty = screen.queryByText('Empty table');
    expect(empty).not.toBeInTheDocument();
  });

  it('renders if there are no rows in table and columns are set', () => {
    const screen = render(
      <IressTableProvider
        columns={[{ key: 'test', sort: true }, { key: 'test2' }]}
        rows={[]}
      >
        <table>
          <TableEmpty>Empty table</TableEmpty>
        </table>
        ,
      </IressTableProvider>,
    );

    const empty = screen.getByText('Empty table');
    expect(empty).toHaveClass(styles.empty);
    expect(empty).toHaveAttribute('colspan', '2');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <table>
          <TableEmpty>Empty table</TableEmpty>
        </table>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
