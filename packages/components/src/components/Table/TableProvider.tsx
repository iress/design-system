import {
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type Ref,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  type IressTableProviderProps,
  type TableContextValue,
  type TableRef,
} from './Table.types';
import { composeIDSTableColumnDefs } from './helpers/composeIDSTableColumnDefs';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { composeIDSTableInitialSorting } from './helpers/composeIDSTableInitialSorting';
import { getTableContext } from './TableContext';
import { findColumnByKey } from './helpers/findColumnByKey';

const TableProvider = <TRow extends object, TVal = unknown>(
  { children, columns, rows }: IressTableProviderProps<TRow, TVal>,
  ref: ForwardedRef<TableRef<TRow>>,
) => {
  const columnDefinitions = useMemo(() => {
    return composeIDSTableColumnDefs(rows, columns);
  }, [columns, rows]);

  const api = useReactTable({
    columns: columnDefinitions,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: composeIDSTableInitialSorting(columns),
    },
  });

  const context: TableContextValue<TRow, TVal> = useMemo(
    () => ({
      api,
      getColumnByKey: (key) => findColumnByKey(key, columns),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only update when columns and rows change
    [rows, columns, api.getState().sorting],
  );

  useImperativeHandle(
    ref,
    () => ({
      api,
    }),
    [api],
  );

  const { Provider } = getTableContext<TRow, TVal>();
  return <Provider value={context}>{children}</Provider>;
};

export const IressTableProvider = forwardRef(TableProvider) as <
  TRow extends object = never,
  TVal = never,
>(
  props: IressTableProviderProps<TRow, TVal> & { ref?: Ref<TableRef<TRow>> },
) => ReactElement;
