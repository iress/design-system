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

      describe('filter', () => {
        it('renders a filter input when filter is true on a column', () => {
          const screen = renderComponent({
            columns: [
              { key: 'key', label: 'Key', filter: true },
              { key: 'value', label: 'Value' },
            ],
          });

          expect(
            screen.getByRole('textbox', { name: 'Filter' }),
          ).toBeInTheDocument();
        });

        it('does not render a filter input when filter is not set', () => {
          const screen = renderComponent({
            columns: [
              { key: 'key', label: 'Key' },
              { key: 'value', label: 'Value' },
            ],
          });

          expect(
            screen.queryByRole('textbox', { name: 'Filter' }),
          ).not.toBeInTheDocument();
        });

        it('filters rows when text is typed into the filter input', async () => {
          const screen = renderComponent({
            columns: [
              { key: 'key', label: 'Key', filter: true },
              { key: 'value', label: 'Value' },
            ],
          });

          // Initially both rows are visible (+1 header row +1 filter row)
          expect(screen.getAllByRole('row')).toHaveLength(TEST_ROWS.length + 2);

          // Type in the filter
          const filterInput = screen.getByRole('textbox', { name: 'Filter' });
          await userEvent.type(filterInput, '1');

          // Only the matching row should be visible (1 header + 1 filter row + 1 data row)
          expect(screen.getAllByRole('row')).toHaveLength(3);
          expect(screen.getByText('one')).toBeInTheDocument();
          expect(screen.queryByText('two')).not.toBeInTheDocument();
        });

        it('renders a custom filter placeholder when filterPlaceholder is set', () => {
          const screen = renderComponent({
            columns: [
              {
                key: 'key',
                label: 'Key',
                filter: true,
                filterPlaceholder: 'Search...',
              },
            ],
          });

          const filterInput = screen.getByRole('textbox', { name: 'Filter' });
          expect(filterInput).toHaveAttribute('placeholder', 'Search...');
        });

        it('renders with default filter placeholder when filterPlaceholder is not set', () => {
          const screen = renderComponent({
            columns: [{ key: 'key', label: 'Key', filter: true }],
          });

          const filterInput = screen.getByRole('textbox', { name: 'Filter' });
          expect(filterInput).toHaveAttribute('placeholder', 'Filter...');
        });

        it('has filter input accessible via aria-describedby referencing the column header', () => {
          const screen = renderComponent({
            columns: [{ key: 'key', label: 'Key', filter: true }],
          });

          const columnHeader = screen.getByRole('columnheader', {
            name: 'Key',
          });
          const filterInput = screen.getByRole('textbox', { name: 'Filter' });

          expect(filterInput).toHaveAttribute(
            'aria-describedby',
            columnHeader.id,
          );
        });
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

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
