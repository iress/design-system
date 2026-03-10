import {
  createColumnHelper,
  type FilterFn,
  type SortDirection,
  type SortingFnOption,
} from '@tanstack/react-table';
import {
  IressTableFormattedValue,
  type TableCellFormats,
} from '../TableFormattedValue/TableFormattedValue';
import { formatObjectKey } from '@helpers/formatting/formatObjectKey';
import { type IressCSSProps } from '@/interfaces';
import { type ReactNode } from 'react';

export interface TableColumn<TRow extends object, TVal = never> extends Pick<
  IressCSSProps,
  'bg' | 'color' | 'noGutter' | 'srOnly' | 'textAlign' | 'textStyle'
> {
  /**
   * The currency code to prefix to the value if `format` is set to currency.
   * @default $
   */
  currencyCode?: string;

  /**
   * When set to true, a divider will be rendered after the column.
   */
  divider?: boolean;

  /**
   * Pre-filters the column with these values on initial render.
   * Provide an array of string values to filter on, matching the raw cell values.
   * The user can still clear or change the filter interactively.
   */
  defaultFilter?: string[];

  /**
   * When set to true, the column will be filterable.
   * A filter icon will appear in the column header, and clicking it will open
   * a panel showing unique column values as checkboxes.
   */
  filter?: boolean;

  /**
   * Text to be read by a screen reader for the filter button.
   * @default filterable
   */
  filterableText?: string;

  /**
   * Formats the display of filter option values in the filter dropdown.
   * When not provided, falls back to the column's `format`.
   * To use the in-built formatters, set this to: string, number, date, currency, percent.
   * Use a custom renderer by passing a function that returns a ReactNode.
   */
  formatFilter?: TableCellFormats | ((value: string) => ReactNode);

  /**
   * Formats the cell content.
   * To use the in-built formatters, set this to: string, number, date, currency, percent.
   * Use a custom formatter by passing a function that returns a ReactNode.
   */
  format?: TableCellFormats | ((value: TVal, row?: TRow) => ReactNode);

  /**
   * The unique key for the column.
   */
  key: string;

  /**
   * The label for the column header.
   */
  label?: ReactNode;

  /**
   * Whether the column should wrap text or not. May need to be false if the column heading is long.
   * @default true
   */
  noWrap?: boolean;

  /**
   * When set to true, the column will be sortable.
   * Setting it to either `asc` or `desc` will set the initial sort order.
   */
  sort?: boolean | SortDirection;

  /**
   * The sorting function to use when sorting the column.
   * If not provided, the default sorting function will be used based on the original row data.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/sorting#sortingfn)
   + @link [Guide](https://tanstack.com/table/v8/docs/guide/sorting)
   */
  sortFn?: SortingFnOption<TRow>;

  /**
   * Text to be read by a screen reader when a column is sortable (but not currently sorted).
   * @default sortable
   */
  sortableText?: string;

  /**
   * The width of the column.
   */
  width?: string;
}

/**
 * Filter function that checks if the cell value is included in the array of selected filter values.
 */
export const tableInArrayFilterFn: FilterFn<object> = (
  row,
  columnId,
  filterValue: string[],
) => {
  if (!filterValue?.length) return true;
  return filterValue.includes(String(row.getValue(columnId) ?? ''));
};

export const composeTableColumnDefs = <TRow extends object, TVal = never>(
  rows: TRow[],
  columns?: TableColumn<TRow, TVal>[],
) => {
  const columnHelper = createColumnHelper<TRow>();

  if (!columns) {
    return Object.keys(rows[0] ?? {}).map((key) =>
      columnHelper.accessor((row: TRow) => row[key as keyof TRow], {
        id: key,
        cell: (info) => info.getValue(),
        header: () => formatObjectKey(key),
        enableSorting: false,
        enableColumnFilter: false,
      }),
    );
  }

  const columnEntries = columns.map<[string, TableColumn<TRow, TVal>]>(
    (column) => [column.key, column],
  );

  return columnEntries.map(([key, column]) => {
    const enableSorting = !!column?.sort || !!column?.sortFn;
    const enableColumnFilter = !!column?.filter;

    const columnOptions: Parameters<typeof columnHelper.accessor>['1'] = {
      id: key,
      cell: (info) => (
        <IressTableFormattedValue
          format={column?.format ?? getFormatFromValue(info.getValue())}
          value={info.getValue<TVal>()}
          row={info.row.original}
        />
      ),
      header: () => column?.label,
      enableSorting,
      enableColumnFilter,
    };

    if (column?.sortFn) {
      columnOptions.sortingFn = column.sortFn;
    }

    if (enableColumnFilter) {
      columnOptions.filterFn = tableInArrayFilterFn;
    }

    return columnHelper.accessor(
      (row: TRow) => row[key as keyof TRow],
      columnOptions as never, // The typing is weird, cannot get it to work without the never cast, its typed properly above anyway
    );
  });
};

const getFormatFromValue = (value: unknown): TableCellFormats | undefined => {
  if (typeof value === 'number') {
    return 'number';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (value instanceof Date) {
    return 'date';
  }

  return undefined;
};
