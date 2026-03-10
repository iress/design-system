import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { TableColumn } from '../helpers/composeTableColumnDefs';
import {
  TableColumnFilterHookProps,
  useTableColumnFilter,
} from './useTableColumnFilter';
import {
  TableContext,
  TableContextValue,
  TableProviderProps,
} from '../TableProvider';

const columnApi = {
  getCanFilter: () => true,
  setFilterValue: vi.fn(),
  getFilterValue: () => undefined,
  getFacetedUniqueValues: () =>
    new Map([
      ['Value A', 2],
      ['Value B', 1],
    ]),
};

const columns: TableColumn<object, unknown>[] = [
  {
    key: 'test',
    filter: {
      filterableText: 'Filter',
    },
  },
  {
    key: 'unfiltered',
  },
  {
    key: 'customText',
    filter: true,
  },
];

function renderHookInTable(
  props: TableColumnFilterHookProps,
  wrapperProps: Partial<TableProviderProps<object, unknown>> = {},
) {
  return renderHook(() => useTableColumnFilter(props), {
    wrapper: ({ children }: PropsWithChildren) => (
      <TableContext.Provider
        value={
          {
            api: {
              getState: () => ({
                sorting: [],
                columnFilters: [],
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

describe('useTableColumnFilter', () => {
  it('returns nothing if not in table', () => {
    const hook = renderHook(() => useTableColumnFilter({ columnKey: 'test' }));
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns nothing if column key is not found in columns', () => {
    const hook = renderHookInTable({ columnKey: 'notFound' });
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns nothing if no column api provided', () => {
    const hook = renderHookInTable({ columnKey: 'test' });
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns nothing if the column does not have filter enabled', () => {
    const hook = renderHookInTable({
      columnApi,
      columnKey: 'unfiltered',
    });
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns nothing if the column api cannot filter', () => {
    const hook = renderHookInTable({
      columnApi: {
        ...columnApi,
        getCanFilter: () => false,
      },
      columnKey: 'test',
    });
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns unique values from the column', () => {
    const hook = renderHookInTable({
      columnApi,
      columnKey: 'test',
    });

    expect(hook.result.current?.uniqueValues).toEqual(['Value A', 'Value B']);
  });

  it('returns sorted unique values', () => {
    const hook = renderHookInTable({
      columnApi: {
        ...columnApi,
        getFacetedUniqueValues: () =>
          new Map([
            ['Zebra', 1],
            ['Apple', 2],
            ['Mango', 1],
          ]),
      },
      columnKey: 'test',
    });

    expect(hook.result.current?.uniqueValues).toEqual([
      'Apple',
      'Mango',
      'Zebra',
    ]);
  });

  it('returns the filterableText from the column definition', () => {
    const hook = renderHookInTable({
      columnApi,
      columnKey: 'test',
    });

    expect(hook.result.current?.filterableText).toBe('Filter');
  });

  it('returns the default filterableText when not specified', () => {
    const hook = renderHookInTable({
      columnApi,
      columnKey: 'customText',
    });

    expect(hook.result.current?.filterableText).toBe('filterable');
  });

  it('returns the current filterValue', () => {
    const hook = renderHookInTable({
      columnApi: {
        ...columnApi,
        getFilterValue: () => ['Value A'],
      },
      columnKey: 'test',
    });

    expect(hook.result.current?.filterValue).toEqual(['Value A']);
  });

  it('returns an empty array when no filter is active', () => {
    const hook = renderHookInTable({
      columnApi,
      columnKey: 'test',
    });

    expect(hook.result.current?.filterValue).toEqual([]);
  });

  it('calls setFilterValue with the values when setFilter is called with values', () => {
    const setFilterValue = vi.fn();
    const hook = renderHookInTable({
      columnApi: { ...columnApi, setFilterValue },
      columnKey: 'test',
    });

    hook.result.current?.setFilter(['Value A', 'Value B']);
    expect(setFilterValue).toHaveBeenCalledWith(['Value A', 'Value B']);
  });

  it('calls setFilterValue with undefined when setFilter is called with empty array', () => {
    const setFilterValue = vi.fn();
    const hook = renderHookInTable({
      columnApi: { ...columnApi, setFilterValue },
      columnKey: 'test',
    });

    hook.result.current?.setFilter([]);
    expect(setFilterValue).toHaveBeenCalledWith(undefined);
  });
});
