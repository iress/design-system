import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTable, IressTableProps, table } from '.';
import userEvent from '@testing-library/user-event';
import { GlobalCSSClass } from '@/enums';

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
    expect(component).toHaveClass(
      'test-class',
      table().table,
      GlobalCSSClass.Table,
    );

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
    describe('alternate', () => {
      it('renders the table with alternate rows', () => {
        const screen = renderComponent({
          alternate: true,
        });

        const component = screen.getByRole('table', { name: TEST_CAPTION });
        expect(component).toHaveClass(table({ alternate: true }).table);
      });
    });

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
          name: 'Valuesortable',
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

        const component = screen.getByRole('table', { name: TEST_CAPTION });
        expect(component).toHaveClass(table({ compact: true }).table);
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
        expect(caption).toHaveClass(table({ hiddenCaption: true }).caption);

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

        expect(screen.getByRole('table')).toHaveClass(
          table({ hover: true }).table,
        );
      });
    });

    describe('removeRowBorders', () => {
      it('renders the table without row borders', () => {
        const screen = renderComponent({
          removeRowBorders: true,
        });

        const component = screen.getByRole('table', { name: TEST_CAPTION });
        expect(component).toHaveClass(table({ removeRowBorders: true }).table);
      });
    });
  });

  describe('filtering', () => {
    it('renders filter button when column has filter enabled', () => {
      const screen = renderComponent({
        columns: [{ key: 'key', label: 'Key', filter: true }],
      });

      expect(
        screen.getByRole('button', { name: 'filterable' }),
      ).toBeInTheDocument();
    });

    it('filters rows when a filter value is selected', async () => {
      const screen = renderComponent({
        columns: [{ key: 'key', label: 'Key', filter: true }],
      });

      expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 rows

      await userEvent.click(screen.getByRole('button', { name: 'filterable' }));
      await userEvent.click(screen.getByRole('option', { name: '1' }));

      expect(screen.getAllByRole('row')).toHaveLength(2); // header + 1 filtered row
    });

    it('pre-filters rows with defaultValue', () => {
      const screen = renderComponent({
        columns: [
          { key: 'key', label: 'Key', filter: { defaultValue: ['2'] } },
        ],
      });

      expect(screen.getAllByRole('row')).toHaveLength(2); // header + 1 filtered row
      expect(screen.getByRole('rowheader', { name: '2' })).toBeInTheDocument();
      expect(
        screen.queryByRole('rowheader', { name: '1' }),
      ).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('virtualise', () => {
    const LARGE_ROWS = Array.from({ length: 300 }, (_, i) => ({
      key: `${i}`,
      value: `row-${i}`,
    }));

    const virtualiseWithRect = {
      overscan: 5,
      estimateSize: 40,
      initialRect: { width: 800, height: 400 },
    };

    it('renders only a subset of rows when virtualise is enabled', () => {
      const screen = renderComponent({
        rows: LARGE_ROWS,
        virtualise: virtualiseWithRect,
      });

      const renderedRows = screen.queryAllByTestId(`${TEST_ID}__row`);
      expect(renderedRows.length).toBeGreaterThan(0);
      expect(renderedRows.length).toBeLessThan(LARGE_ROWS.length);
    });

    it('sets aria-rowcount on the table element', () => {
      const screen = renderComponent({
        rows: LARGE_ROWS,
        virtualise: virtualiseWithRect,
      });

      const tableEl = screen.getByTestId(`${TEST_ID}__table`);
      expect(tableEl).toHaveAttribute(
        'aria-rowcount',
        String(LARGE_ROWS.length),
      );
    });

    it('sets aria-rowindex on each visible row', () => {
      const screen = renderComponent({
        rows: LARGE_ROWS,
        virtualise: virtualiseWithRect,
      });

      const renderedRows = screen.queryAllByTestId(`${TEST_ID}__row`);
      expect(renderedRows.length).toBeGreaterThan(0);
      renderedRows.forEach((row) => {
        expect(row).toHaveAttribute('aria-rowindex');
      });
    });

    it('does not set aria-rowcount when virtualise is not enabled', () => {
      const screen = renderComponent({ rows: TEST_ROWS });

      const tableEl = screen.getByTestId(`${TEST_ID}__table`);
      expect(tableEl).not.toHaveAttribute('aria-rowcount');
    });

    it('renders all rows when virtualise is not enabled', () => {
      const screen = renderComponent({ rows: TEST_ROWS });

      const renderedRows = screen.getAllByTestId(`${TEST_ID}__row`);
      expect(renderedRows.length).toBe(TEST_ROWS.length);
    });

    it('accepts virtualise options with custom overscan', () => {
      const screen = renderComponent({
        rows: LARGE_ROWS,
        virtualise: { ...virtualiseWithRect, overscan: 10 },
      });

      const renderedRows = screen.queryAllByTestId(`${TEST_ID}__row`);
      expect(renderedRows.length).toBeGreaterThan(0);
      expect(renderedRows.length).toBeLessThan(LARGE_ROWS.length);
    });

    it('does not break when sorting with virtualise enabled', async () => {
      const screen = renderComponent({
        rows: LARGE_ROWS,
        columns: [
          { key: 'key', label: 'Key', sort: true },
          { key: 'value', label: 'Value' },
        ],
        virtualise: virtualiseWithRect,
      });

      const sortButton = screen.getByRole('button', { name: 'Keysortable' });
      await userEvent.click(sortButton);

      // Sorting should not throw or remove the table
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('does not break when filtering with virtualise enabled', async () => {
      const filterRows = Array.from({ length: 50 }, (_, i) => ({
        key: `${i}`,
        value: `row-${i}`,
      }));
      const screen = renderComponent({
        rows: filterRows,
        columns: [
          { key: 'key', label: 'Key', filter: true },
          { key: 'value', label: 'Value' },
        ],
        virtualise: virtualiseWithRect,
      });

      await userEvent.click(screen.getByRole('button', { name: 'filterable' }));
      await userEvent.click(screen.getByRole('option', { name: '0' }));

      // Filtering should not throw or remove the table
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });
});
