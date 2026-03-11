import {
  createColumnHelper,
  type FilterFn,
  type FilterFnOption,
  type SortDirection,
  type SortingFnOption,
} from '@tanstack/react-table';
import {
  IressTableFormattedValue,
  type TableCellFormats,
} from '../TableFormattedValue/TableFormattedValue';
import { formatObjectKey } from '@helpers/formatting/formatObjectKey';
import type { IressCSSProps } from '@/interfaces';
import type { ReactNode } from 'react';

export interface TableColumnFilter<TRow extends object> {
  /**
   * Pre-filters the column with these values on initial render.
   * Provide an array of values to filter on, matching the raw cell values.
   * The user can still clear or change the filter interactively.
   */
  defaultValue?: unknown[];

  /**
   * Text to be read by a screen reader for the filter button.
   * @default filterable
   */
  filterableText?: string;

  /**
   * The filter function to use for this column.
   * Can be a custom filter function, or the name of a built-in TanStack filter function:
   * `includesString`, `includesStringSensitive`, `equalsString`, `equalsStringSensitive`,
   * `arrIncludes`, `arrIncludesAll`, `arrIncludesSome`, `equals`, `weakEquals`, `inNumberRange`.
   * When not provided, defaults to the built-in "in array" matching.
   *
   * Set to `false` to disable client-side filtering for this column. The filter
   * UI will still be shown, but all rows will pass through unchanged. Combine
   * with `onChange` to implement server-side filtering.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#filterfn)
   */
  filterFn?: FilterFnOption<TRow> | false;

  /**   * Custom footer content rendered at the bottom of the filter popover.
   * Useful for adding actions like "Edit" buttons or additional controls.
   */
  footer?: ReactNode;

  /**   * Formats the display of filter option values in the filter dropdown.
   * When not provided, falls back to the column's `format`.
   * To use the in-built formatters, set this to: string, number, date, currency, percent.
   * Use a custom renderer by passing a function that returns a ReactNode.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: TableCellFormats | ((value: any) => ReactNode);

  /**
   * Called whenever the selected filter values change.
   * Receives the array of currently selected values (empty array when cleared).
   * Useful for server-side filtering: combine with a no-op `filterFn` that
   * always returns `true`, then fetch new data and update `rows`.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (values: any[]) => void;

  /**
   * Explicit list of values to show in the filter dropdown.
   * When provided, these values are used instead of deriving them from the column data.
   * Useful for stable filter options, server-side filtering, or showing all possible
   * values regardless of current data. Values are stringified for display.
   */
  values?: unknown[];
}

/**
 * Normalizes the `filter` column option into a `TableColumnFilter` object.
 * Returns `undefined` if filtering is not enabled.
 */
export const normalizeColumnFilter = <TRow extends object>(
  filter?: boolean | TableColumnFilter<TRow>,
): TableColumnFilter<TRow> | undefined => {
  if (!filter) return undefined;
  if (filter === true) return {};
  return filter;
};

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
   * Enables column filtering. Set to `true` to enable with defaults, or pass
   * a `TableColumnFilter` object to configure filtering options.
   *
   * When enabled, a filter icon will appear in the column header, and clicking
   * it will open a panel showing unique column values as checkboxes.
   */
  filter?: boolean | TableColumnFilter<TRow>;

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
export const tableInArrayFilterFn = <TRow extends object>(
  row: Parameters<FilterFn<TRow>>[0],
  columnId: string,
  filterValue: unknown[],
): boolean => {
  if (!filterValue?.length) return true;
  return filterValue.includes(row.getValue(columnId));
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
    const enableColumnFilter = !!normalizeColumnFilter(column?.filter);

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
      const filterConfig = normalizeColumnFilter(column?.filter);
      columnOptions.filterFn =
        filterConfig?.filterFn === false
          ? () => true
          : (filterConfig?.filterFn ?? tableInArrayFilterFn);
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
