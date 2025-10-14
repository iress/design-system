import { renderHook } from '@testing-library/react';
import { useIDSTableColumnStyles } from './useIDSTableColumnStyles';
import {
  IressTableProviderProps,
  TableColumn,
  TableColumnHookProps,
} from '../Table.types';
import { PropsWithChildren } from 'react';
import { IressTableProvider } from '../TableProvider';
import styles from '../Table.module.scss';

const columns: TableColumn<object, unknown>[] = [
  {
    align: 'left',
    divider: true,
    key: 'test',
    label: 'Test',
    width: '300px',
  },
];

function renderHookInTable(
  props: TableColumnHookProps,
  wrapperProps: Partial<IressTableProviderProps<object, unknown>> = {},
) {
  return renderHook(() => useIDSTableColumnStyles(props), {
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

describe('useIDSTableColumnStyles', () => {
  it('returns nothing if not in table', () => {
    const hook = renderHook(() =>
      useIDSTableColumnStyles({ columnKey: 'test' }),
    );
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
    expect(className).toContain(styles['cell--left']);
    expect(className).toContain(styles.divider);

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
            },
          ],
        },
      );

      const className = hook.result.current?.className;
      expect(className).toContain(styles['cell--number']);
    });

    it('adds currency class if set to currency', () => {
      const hook = renderHookInTable(
        { columnKey: 'test' },
        {
          columns: [
            {
              ...columns[0],
              format: 'currency',
            },
          ],
        },
      );

      const className = hook.result.current?.className;
      expect(className).toContain(styles['cell--currency']);
    });
  });
});
