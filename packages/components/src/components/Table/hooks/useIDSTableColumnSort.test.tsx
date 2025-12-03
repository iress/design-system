import { renderHook } from '@testing-library/react';
import {
  type IressTableProviderProps,
  type TableColumn,
  type TableColumnHookProps,
} from '../Table.types';
import { type PropsWithChildren } from 'react';
import { IressTableProvider } from '../TableProvider';
import { useIDSTableColumnSort } from './useIDSTableColumnSort';

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

vi.mock('../hooks/useTable', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./useTable')>()),
  useTable: () => ({
    api: {
      getState: () => ({
        sorting: [{ id: 'test', desc: false }],
      }),
    },
    getColumnByKey: (key: string) =>
      columns.find((column) => column.key === key),
  }),
}));

function renderHookInTable(
  props: TableColumnHookProps,
  wrapperProps: Partial<IressTableProviderProps<object, unknown>> = {},
) {
  return renderHook(() => useIDSTableColumnSort(props), {
    wrapper: ({ children }: PropsWithChildren) => (
      <IressTableProvider
        {...wrapperProps}
        columns={wrapperProps.columns ?? columns}
        rows={wrapperProps.rows ?? []}
      >
        {children}
      </IressTableProvider>
    ),
  });
}

describe('useIDSTableColumnSort', () => {
  it('returns nothing if not in table', () => {
    const hook = renderHook(() => useIDSTableColumnSort({ columnKey: 'test' }));
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
