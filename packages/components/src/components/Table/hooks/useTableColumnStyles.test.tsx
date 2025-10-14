import { renderHook } from '@testing-library/react';
import {
  TableColumnStylesHookProps,
  useTableColumnStyles,
} from './useTableColumnStyles';
import { PropsWithChildren } from 'react';
import { TableProvider, TableProviderProps } from '../TableProvider';
import { TableColumn } from '../helpers/composeTableColumnDefs';

const columns: TableColumn<object, unknown>[] = [
  {
    divider: true,
    key: 'test',
    label: 'Test',
    width: '300px',
    textAlign: 'left',
  },
];

function renderHookInTable(
  props: TableColumnStylesHookProps,
  wrapperProps: Partial<TableProviderProps<object, unknown>> = {},
) {
  return renderHook(() => useTableColumnStyles(props), {
    wrapper: ({ children }: PropsWithChildren) => (
      <TableProvider
        {...wrapperProps}
        columns={wrapperProps.columns ?? columns}
        rows={wrapperProps.rows ?? []}
      >
        {children}
      </TableProvider>
    ),
  });
}

describe('useIDSTableColumnStyles', () => {
  it('returns nothing if not in table', () => {
    const hook = renderHook(() => useTableColumnStyles({ columnKey: 'test' }));
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns nothing if column key is not found in columns', () => {
    const hook = renderHookInTable({ columnKey: 'notFound' });
    const response = hook.result.current;
    expect(response).toBeUndefined();
  });

  it('returns class name with column props styles', () => {
    const hook = renderHookInTable({ columnKey: 'test' });

    const className = hook.result.current?.className;
    expect(className).toContain('ta_left');
    expect(className).toContain('bd-e_table');

    const style = hook.result.current?.style;
    expect(style).toEqual({
      width: '300px',
      minWidth: '300px',
    });
  });

  describe('format', () => {
    it('adds number class if set to number', () => {
      const hook = renderHookInTable(
        { columnKey: 'test' },
        {
          columns: [
            {
              ...columns[0],
              format: 'number',
              textAlign: undefined,
            },
          ],
        },
      );

      const className = hook.result.current?.className;
      expect(className).toContain('ta_end');
    });

    it('adds currency class if set to currency', () => {
      const hook = renderHookInTable(
        { columnKey: 'test' },
        {
          columns: [
            {
              ...columns[0],
              format: 'currency',
              textAlign: undefined,
            },
          ],
        },
      );

      const className = hook.result.current?.className;
      expect(className).toContain('ta_end');
    });
  });
});
