import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTable, IressTableProps } from '.';
import styles from './Table.module.scss';
import { GlobalCSSClass } from '@/enums';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { TableRef } from './Table.types';

const TEST_ID = 'test-component';
const TEST_CAPTION = 'caption';
const TEST_ROWS = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
];

function renderComponent<TRow extends object, TData = never>(
  props: Partial<IressTableProps<TRow, TData>> = {},
  renderFn: typeof render = render,
) {
  return renderFn(
    <IressTable<TRow, TData>
      {...props}
      data-testid={TEST_ID}
      caption={props?.caption ?? TEST_CAPTION}
      rows={(props?.rows as unknown as TRow[]) ?? TEST_ROWS}
    />,
  );
}

describe('IressTable', () => {
  it('should render the component with the correct text and classes', () => {
    const screen = renderComponent({
      className: 'test-class',
    });

    const component = screen.getByRole('table', { name: TEST_CAPTION });
    expect(component).toHaveClass('test-class', styles.table);

    // should have tbody and thead
    expect(screen.getAllByRole('rowgroup')).toHaveLength(2);

    // should have 2 column headers and 2 row headers
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('rowheader')).toHaveLength(TEST_ROWS.length);

    // should have 2 rows, plus 1 header row
    expect(screen.getAllByRole('row')).toHaveLength(TEST_ROWS.length + 1);

    // should have 2 normal cells
    expect(screen.getAllByRole('cell')).toHaveLength(TEST_ROWS.length);
  });

  it('should render and propagate data-testid if provided', () => {
    const screen = renderComponent();

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__table`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__caption`)).toBeInTheDocument();

    expect(screen.getByTestId(`${TEST_ID}__thead`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__thead-row`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__header__key`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__header__value`)).toBeInTheDocument();

    expect(screen.getByTestId(`${TEST_ID}__tbody`)).toBeInTheDocument();
    expect(screen.getAllByTestId(`${TEST_ID}__row`)).toHaveLength(
      TEST_ROWS.length,
    );

    expect(
      screen.getByTestId(`${TEST_ID}__cell__row_0__col_key`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${TEST_ID}__cell__row_0__col_value`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${TEST_ID}__cell__row_1__col_key`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${TEST_ID}__cell__row_1__col_value`),
    ).toBeInTheDocument();
  });

  describe('props', () => {
    describe('children', () => {
      it('can display a static table', () => {
        const screen = renderComponent({
          children: [
            <thead key="thead">
              <tr>
                <th>key</th>
                <th>value</th>
              </tr>
            </thead>,
            <tbody key="tbody">
              <tr>
                <td>1</td>
                <td>one</td>
              </tr>
              <tr>
                <td>2</td>
                <td>two</td>
              </tr>
            </tbody>,
          ],
        });

        expect(
          screen.getByRole('columnheader', { name: 'key' }),
        ).toBeInTheDocument();
      });
    });

    describe('columns', () => {
      it('changes the columns of the rows by key', () => {
        const screen = renderComponent({
          columns: [{ key: 'key', label: 'A new column' }],
        });

        const columnHeader = screen.getByRole('columnheader', {
          name: 'A new column',
        });
        expect(columnHeader).toBeInTheDocument();

        const rowHeader = screen.getByRole('rowheader', { name: '1' });
        expect(rowHeader).toHaveAttribute('headers', columnHeader.id);
      });

      it('sorts columns using a custom sorting function', async () => {
        const sortFn = vi.fn().mockImplementation(() => -1);
        const screen = renderComponent<{ value: number }>({
          rows: [{ value: 1 }, { value: 1000 }],
          columns: [
            {
              key: 'value',
              label: 'Value',
              sortFn,
            },
          ],
        });

        // Press the sort button
        const valueSort = screen.getByRole('button', {
          name: 'Value sortable',
        });
        await userEvent.click(valueSort);

        // Should have called the sort function
        expect(sortFn).toHaveBeenCalledTimes(1);
      });
    });

    describe('compact', () => {
      it('renders the table in compact view', () => {
        const screen = renderComponent({
          compact: true,
        });

        const wrapper = screen.getByTestId(TEST_ID);
        expect(wrapper).toHaveClass(styles.compact);
      });
    });

    describe('empty', () => {
      it('renders an empty state when provided', () => {
        const screen = renderComponent({
          columns: [{ key: 'key', label: 'Column 1' }],
          empty: 'No data',
          rows: [],
        });

        const empty = screen.getByText('No data');
        expect(empty).toBeInTheDocument();
      });
    });

    describe('hiddenCaption', () => {
      it('visually hides the caption', () => {
        const screen = renderComponent({
          hiddenCaption: true,
        });

        const caption = screen.getByText(TEST_CAPTION);
        expect(caption).toHaveClass(GlobalCSSClass.SROnly);

        const component = screen.getByRole('table', { name: TEST_CAPTION });
        expect(component).toBeInTheDocument();
      });
    });

    describe('hiddenHeader', () => {
      it('does not render header', () => {
        const screen = renderComponent({
          hiddenHeader: true,
        });

        // should have tbody only
        expect(screen.getAllByRole('rowgroup')).toHaveLength(1);

        // should have no column headers
        expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
      });
    });

    describe('hover', () => {
      it('enables hover on row for the table', () => {
        const screen = renderComponent({
          hover: true,
        });

        expect(screen.getByRole('table')).toHaveClass(styles.hover);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('useTable hook', () => {
    it('should expose useTable hook as a static property', () => {
      expect(IressTable.useTable).toBeDefined();
      expect(typeof IressTable.useTable).toBe('function');
    });

    it('should provide table context via useTable hook', () => {
      let tableContext: ReturnType<typeof IressTable.useTable> | null = null;

      function TableConsumer() {
        tableContext = IressTable.useTable();
        return null;
      }

      renderComponent({
        children: <TableConsumer />,
      });

      expect(tableContext).toBeDefined();
      expect(tableContext!.api).toBeDefined();
      expect(tableContext!.getColumnByKey).toBeDefined();
      expect(typeof tableContext!.getColumnByKey).toBe('function');
    });

    it('should provide access to table API through useTable hook', () => {
      let tableApi: ReturnType<typeof IressTable.useTable>['api'] | null = null;

      function TableConsumer() {
        const { api } = IressTable.useTable();
        tableApi = api;
        return null;
      }

      renderComponent({
        children: <TableConsumer />,
      });

      expect(tableApi).toBeDefined();
      expect(tableApi!.getRowModel).toBeDefined();
      expect(tableApi!.getHeaderGroups).toBeDefined();
      expect(typeof tableApi!.getRowModel).toBe('function');
      expect(typeof tableApi!.getHeaderGroups).toBe('function');
    });

    it('should allow getting column by key through context', () => {
      let foundColumn: unknown = null;

      function TableConsumer() {
        const context = IressTable.useTable<{ key: string; value: string }>();
        foundColumn = context.getColumnByKey('key');
        return null;
      }

      renderComponent({
        columns: [
          { key: 'key', label: 'Key Column' },
          { key: 'value', label: 'Value Column' },
        ],
        children: <TableConsumer />,
      });

      expect(foundColumn).toBeDefined();
      expect(foundColumn).toMatchObject({ label: 'Key Column' });
    });

    it('should return undefined for nonexistent column keys', () => {
      let foundColumn: unknown = null;

      function TableConsumer() {
        const context = IressTable.useTable();
        foundColumn = context.getColumnByKey('nonexistent');
        return null;
      }

      renderComponent({
        children: <TableConsumer />,
      });

      expect(foundColumn).toBeUndefined();
    });
  });

  describe('ref forwarding', () => {
    it('should forward ref to expose table API', () => {
      const tableRef = createRef<TableRef<{ key: string; value: string }>>();

      const TestComponent = () => (
        <IressTable
          ref={tableRef}
          caption={TEST_CAPTION}
          rows={TEST_ROWS}
          data-testid={TEST_ID}
        />
      );

      render(<TestComponent />);

      expect(tableRef.current).toBeDefined();
      expect(tableRef.current?.api).toBeDefined();
      expect(typeof tableRef.current?.api.getRowModel).toBe('function');
      expect(typeof tableRef.current?.api.getHeaderGroups).toBe('function');
    });

    it('should provide same API instance through ref and context', () => {
      let contextApi: ReturnType<typeof IressTable.useTable>['api'] | null =
        null;
      const tableRef = createRef<TableRef<{ key: string; value: string }>>();

      function TableConsumer() {
        const { api } = IressTable.useTable();
        contextApi = api;
        return null;
      }

      const TestComponent = () => (
        <IressTable
          ref={tableRef}
          caption={TEST_CAPTION}
          rows={TEST_ROWS}
          data-testid={TEST_ID}
        >
          <TableConsumer />
        </IressTable>
      );

      render(<TestComponent />);

      expect(tableRef.current?.api).toBe(contextApi);
    });
  });
});
