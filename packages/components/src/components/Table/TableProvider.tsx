import { Context, createContext, PropsWithChildren, useMemo } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { composeTableInitialSorting } from './helpers/composeTableInitialSorting';
import {
  composeTableColumnDefs,
  TableColumn,
} from './helpers/composeTableColumnDefs';

export interface TableProviderProps<TRow extends object, TVal = unknown>
  extends PropsWithChildren {
  columns?: TableColumn<TRow, TVal>[];
  rows: TRow[];
}

export interface TableContextValue<TRow extends object, TVal = unknown> {
  api: Table<TRow>;
  getColumnByKey: (key: string) => TableColumn<TRow, TVal> | undefined;
}

function createTableContext<TRow extends object, TVal = unknown>() {
  return createContext<TableContextValue<TRow, TVal> | undefined>(undefined);
}

// TODO: Is there a way to do this without casting?
export function getTableContext<TRow extends object, TVal = unknown>() {
  return TableContext as unknown as Context<TableContextValue<TRow, TVal>>;
}

export const TableContext = createTableContext();

export const TableProvider = <TRow extends object, TVal = unknown>({
  children,
  columns,
  rows,
}: TableProviderProps<TRow, TVal>) => {
  const columnDefinitions = useMemo(() => {
    return composeTableColumnDefs(rows, columns);
  }, [columns, rows]);

  const api = useReactTable({
    columns: columnDefinitions,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    [rows, columns, api.getState().sorting],
  );

  const { Provider } = getTableContext<TRow, TVal>();
  return <Provider value={context}>{children}</Provider>;
};
