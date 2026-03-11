import { composeTableColumnDefs } from './composeTableColumnDefs';
import { AccessorFnColumnDef, CellContext } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';

type AccessorFn = AccessorFnColumnDef<never, never>['accessorFn'];
type CellFn = AccessorFnColumnDef<never, never>['cell'];
type HeaderFn = AccessorFnColumnDef<never, never>['header'];

describe('composeTableColumnDefs', () => {
  it('generates the columns automatically from the rows', () => {
    const columnDefs = composeTableColumnDefs([{ test: 'test' }]);

    expect(columnDefs).toEqual([
      {
        accessorFn: expect.any(Function) as AccessorFn,
        cell: expect.any(Function) as CellFn,
        enableSorting: false,
        enableColumnFilter: false,
        header: expect.any(Function) as HeaderFn,
        id: 'test',
      },
    ]);
  });

  it('generates the columns from TableColumn[]', () => {
    const columnDefs = composeTableColumnDefs(
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
        enableColumnFilter: false,
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
    const columnDefs = composeTableColumnDefs(
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
        enableColumnFilter: false,
        header: expect.any(Function) as HeaderFn,
        id: 'test',
        sortingFn: sortFn,
      },
    ]);
  });

  it('creates a filterable column when filter is true', () => {
    const columnDefs = composeTableColumnDefs(
      [{ test: 'test' }],
      [
        {
          key: 'test',
          label: 'Test',
          filter: true,
        },
      ],
    );

    expect(columnDefs).toEqual([
      {
        accessorFn: expect.any(Function) as AccessorFn,
        cell: expect.any(Function) as CellFn,
        enableSorting: false,
        enableColumnFilter: true,
        filterFn: expect.any(Function) as () => boolean,
        header: expect.any(Function) as HeaderFn,
        id: 'test',
      },
    ]);
  });

  it('uses a custom filterFn when provided in filter object', () => {
    const customFilterFn = vi.fn(() => true);
    const columnDefs = composeTableColumnDefs(
      [{ test: 'test' }],
      [
        {
          key: 'test',
          label: 'Test',
          filter: { filterFn: customFilterFn },
        },
      ],
    );

    expect(columnDefs).toEqual([
      {
        accessorFn: expect.any(Function) as AccessorFn,
        cell: expect.any(Function) as CellFn,
        enableSorting: false,
        enableColumnFilter: true,
        filterFn: customFilterFn,
        header: expect.any(Function) as HeaderFn,
        id: 'test',
      },
    ]);
  });

  it('uses a built-in TanStack filterFn name when provided as a string', () => {
    const columnDefs = composeTableColumnDefs(
      [{ test: 'test' }],
      [
        {
          key: 'test',
          label: 'Test',
          filter: { filterFn: 'includesString' },
        },
      ],
    );

    expect(columnDefs).toEqual([
      {
        accessorFn: expect.any(Function) as AccessorFn,
        cell: expect.any(Function) as CellFn,
        enableSorting: false,
        enableColumnFilter: true,
        filterFn: 'includesString',
        header: expect.any(Function) as HeaderFn,
        id: 'test',
      },
    ]);
  });

  it('uses a no-op filterFn when filterFn is set to false', () => {
    const columnDefs = composeTableColumnDefs(
      [{ test: 'test' }],
      [
        {
          key: 'test',
          label: 'Test',
          filter: { filterFn: false },
        },
      ],
    );

    expect(columnDefs).toEqual([
      {
        accessorFn: expect.any(Function) as AccessorFn,
        cell: expect.any(Function) as CellFn,
        enableSorting: false,
        enableColumnFilter: true,
        filterFn: expect.any(Function) as () => boolean,
        header: expect.any(Function) as HeaderFn,
        id: 'test',
      },
    ]);

    // The no-op filterFn should always return true
    const filterFn = columnDefs[0].filterFn as () => boolean;
    expect(filterFn()).toBe(true);
  });

  it('sets the currency symbol by default', () => {
    const columnDefs = composeTableColumnDefs(
      [{ test: 'test' }],
      [
        {
          key: 'test',
          label: 'Test',
          format: 'currency',
          sort: 'desc',
        },
      ],
    );

    const cell = columnDefs?.[0]?.cell as (
      info: CellContext<object, object[keyof object]>,
    ) => ReactNode;

    const screen = render(
      cell?.({
        getValue: () => '0.00',
        row: { original: { test: '0.00' } },
      } as never),
    );

    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });
});
