import { composeIDSTableColumnDefs } from './composeIDSTableColumnDefs';
import { AccessorFnColumnDef, CellContext } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';

type AccessorFn = AccessorFnColumnDef<never, never>['accessorFn'];
type CellFn = AccessorFnColumnDef<never, never>['cell'];
type HeaderFn = AccessorFnColumnDef<never, never>['header'];

describe('composeIDSTableColumnDefs', () => {
  it('generates the columns automatically from the rows', () => {
    const columnDefs = composeIDSTableColumnDefs([{ test: 'test' }]);

    expect(columnDefs).toEqual([
      {
        accessorFn: expect.any(Function) as AccessorFn,
        cell: expect.any(Function) as CellFn,
        enableSorting: false,
        header: expect.any(Function) as HeaderFn,
        id: 'test',
      },
    ]);
  });

  it('creates columns from a record of columns', () => {
    const columnDefs = composeIDSTableColumnDefs([{ test: 'test' }], {
      test: {
        label: 'Test',
        format: (value: string) => <button>{value}</button>,
        sort: 'desc',
      },
    });

    expect(columnDefs).toEqual([
      {
        accessorFn: expect.any(Function) as AccessorFn,
        cell: expect.any(Function) as CellFn,
        enableSorting: true,
        header: expect.any(Function) as HeaderFn,
        id: 'test',
      },
    ]);

    const header = columnDefs?.[0]?.header as () => string;
    expect(header?.()).toBe('Test');

    const cell = columnDefs?.[0]?.cell as (
      info: CellContext<object, object[keyof object]>,
    ) => ReactNode;
    const screen = render(
      cell?.({
        getValue: () => 'test',
        row: { original: { test: 'test' } },
      } as never),
    );
    expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();
  });

  it('works with an array of columns', () => {
    const columnDefs = composeIDSTableColumnDefs(
      [{ test: 'test' }],
      [
        {
          key: 'test',
          label: 'Test',
          format: (value: string) => <button>{value}</button>,
          sort: 'desc',
        },
      ],
    );

    expect(columnDefs).toEqual([
      {
        accessorFn: expect.any(Function) as AccessorFn,
        cell: expect.any(Function) as CellFn,
        enableSorting: true,
        header: expect.any(Function) as HeaderFn,
        id: 'test',
      },
    ]);

    const header = columnDefs?.[0]?.header as () => string;
    expect(header?.()).toBe('Test');

    const cell = columnDefs?.[0]?.cell as (
      info: CellContext<object, object[keyof object]>,
    ) => ReactNode;
    const screen = render(
      cell?.({
        getValue: () => 'test',
        row: { original: { test: 'test' } },
      } as never),
    );
    expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();
  });

  it('creates a sorting column based on a sort function', () => {
    const sortFn = () => 0;
    const columnDefs = composeIDSTableColumnDefs(
      [{ test: 'test' }],
      [
        {
          key: 'test',
          label: 'Test',
          format: (value: string) => <button>{value}</button>,
          sortFn,
        },
      ],
    );

    expect(columnDefs).toEqual([
      {
        accessorFn: expect.any(Function) as AccessorFn,
        cell: expect.any(Function) as CellFn,
        enableSorting: true,
        header: expect.any(Function) as HeaderFn,
        id: 'test',
        sortingFn: sortFn,
      },
    ]);
  });

  it('passes the currencyCode to the formatter when set', () => {
    const columnDefs = composeIDSTableColumnDefs([{ test: 'test' }], {
      test: {
        currencyCode: '',
        label: 'Test',
        format: 'currency',
        sort: 'desc',
      },
    });

    const cell = columnDefs?.[0]?.cell as (
      info: CellContext<object, object[keyof object]>,
    ) => ReactNode;

    const screen = render(
      cell?.({
        getValue: () => '0.00',
        row: { original: { test: '0.00' } },
      } as never),
    );
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });
});
