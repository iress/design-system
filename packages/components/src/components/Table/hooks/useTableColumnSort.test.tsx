import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { TableColumn } from '../helpers/composeTableColumnDefs';
import {
  TableColumnSortHookProps,
  useTableColumnSort,
} from './useTableColumnSort';
import {
  TableContext,
  TableContextValue,
  TableProviderProps,
} from '../TableProvider';

const columnApi = {
  getCanSort: () => true,
  toggleSorting: () => undefined,
};

const columns: TableColumn<object, unknown>[] = [
  {
    key: 'test',
    sort: true,
    sortableText: 'Sort',
  },
  {
    key: 'unsorted',
    sort: true,
    sortableText: 'Sort',
  },
  {
    key: 'sortFn',
    sortFn: 'datetime',
  },
];

function renderHookInTable(
  props: TableColumnSortHookProps,
  wrapperProps: Partial<TableProviderProps<object, unknown>> = {},
) {
  return renderHook(() => useTableColumnSort(props), {
    wrapper: ({ children }: PropsWithChildren) => (
      <TableContext.Provider
        value={
          {
            api: {
              getState: () => ({
                sorting: [{ id: 'test', desc: false }],
              }),
            },
            getColumnByKey: (key: string) =>
              (wrapperProps.columns ?? columns).find(
                (column) => column.key === key,
              ),
          } as TableContextValue<object, unknown>
        }
      >
        {children}
      </TableContext.Provider>
    ),
  });
}

describe('useTableColumnSort', () => {
  it('returns nothing if not in table', () => {
    const hook = renderHook(() => useTableColumnSort({ columnKey: 'test' }));
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns nothing if column key is not found in columns', () => {
    const hook = renderHookInTable({ columnKey: 'notFound' });
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns nothing if column key is no column api provided', () => {
    const hook = renderHookInTable({ columnKey: 'test' });
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns nothing if the column is provided, but cannot be sorted', () => {
    const hook = renderHookInTable({
      columnApi: {
        ...columnApi,
        getCanSort: () => false,
      },
      columnKey: 'test',
    });
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns aria-sort=none with an unsorted column', () => {
    const hook = renderHookInTable({
      columnApi: {
        ...columnApi,
        getCanSort: () => true,
      },
      columnKey: 'unsorted',
    });

    const columnProps = hook.result.current?.columnProps;
    expect(columnProps).toStrictEqual({
      'aria-sort': 'none',
    });
  });

  it('returns aria-sort=none with a column using a sorting function', () => {
    const hook = renderHookInTable({
      columnApi: {
        ...columnApi,
        getCanSort: () => true,
      },
      columnKey: 'sortFn',
    });

    const columnProps = hook.result.current?.columnProps;
    expect(columnProps).toStrictEqual({
      'aria-sort': 'none',
    });
  });
});
