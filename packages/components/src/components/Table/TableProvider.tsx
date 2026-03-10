import {
  type Context,
  createContext,
  type PropsWithChildren,
  useMemo,
  useState,
} from 'react';
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  type Table,
  useReactTable,
} from '@tanstack/react-table';
import { composeTableInitialSorting } from './helpers/composeTableInitialSorting';
import { composeTableInitialColumnFilters } from './helpers/composeTableInitialColumnFilters';
import {
  composeTableColumnDefs,
  tableInArrayFilterFn,
  type TableColumn,
} from './helpers/composeTableColumnDefs';

/**
 * Represents an active column filter, with a user-friendly key rather than
 * TanStack's internal `id` field.
 */
export interface TableActiveFilter {
  /** The `key` of the `TableColumn` the filter applies to. */
  columnKey: string;
  /** The selected filter values. An empty array means no filter is active. */
  values: string[];
}

export interface TableProviderProps<
  TRow extends object,
  TVal = unknown,
> extends PropsWithChildren {
  columns?: TableColumn<TRow, TVal>[];
  /**
   * When true, disables client-side row filtering so TanStack passes all rows
   * through unchanged. Use with `onColumnFiltersChange` to implement
   * server-side filtering where you update `rows` externally.
   * @default false
   */
  manualFiltering?: boolean;
  /**
   * Called whenever the column filter selection changes.
   * Receives the full list of active filters. Use this to fetch filtered data
   * from a server and update the `rows` prop accordingly.
   */
  onColumnFiltersChange?: (filters: TableActiveFilter[]) => void;
  rows: TRow[];
}

export interface TableContextValue<TRow extends object, TVal = unknown> {
  api: Table<TRow>;
  getColumnByKey: (key: string) => TableColumn<TRow, TVal> | undefined;
}

function createTableContext<TRow extends object, TVal = unknown>() {
  return createContext<TableContextValue<TRow, TVal> | undefined>(undefined);
}

// eslint-disable-next-line react-refresh/only-export-components -- Its easier to keep this function here for context
export function getTableContext<TRow extends object, TVal = unknown>() {
  return TableContext as unknown as Context<TableContextValue<TRow, TVal>>;
}

// eslint-disable-next-line react-refresh/only-export-components -- Context export for use throughout the component tree
export const TableContext = createTableContext();

export const TableProvider = <TRow extends object, TVal = unknown>({
  children,
  columns,
  manualFiltering = false,
  onColumnFiltersChange,
  rows,
}: TableProviderProps<TRow, TVal>) => {
  const columnDefinitions = useMemo(() => {
    return composeTableColumnDefs(rows, columns);
  }, [columns, rows]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
    composeTableInitialColumnFilters(columns),
  );

  const api = useReactTable({
    columns: columnDefinitions,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    filterFns: {
      inArray: tableInArrayFilterFn,
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: (updater) => {
      setColumnFilters((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        onColumnFiltersChange?.(
          next.map((f) => ({
            columnKey: f.id,
            values: (f.value as string[] | undefined) ?? [],
          })),
        );
        return next;
      });
    },
    manualFiltering,
    initialState: {
      sorting: composeTableInitialSorting(columns),
    },
  });

  const context: TableContextValue<TRow, TVal> = useMemo(
    () => ({
      api,
      getColumnByKey: (key) => columns?.find((column) => column.key === key),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only update when columns and rows change
    [rows, columns, api.getState().sorting, columnFilters],
  );

  const { Provider } = getTableContext<TRow, TVal>();
  return <Provider value={context}>{children}</Provider>;
};

TableProvider.displayName = 'TableProvider';
