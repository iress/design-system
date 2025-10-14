import { createColumnHelper } from '@tanstack/react-table';
import { type IressTableProps, type TableColumn } from '../Table.types';
import { IressTableFormattedValue } from '../TableFormattedValue/TableFormattedValue';
import { formatObjectKey } from '@helpers/formatting/formatObjectKey';
import { getFormatFromValue } from './getFormatFromValue';

export const composeIDSTableColumnDefs = <TRow extends object, TVal = never>(
  rows: TRow[],
  columns?: IressTableProps<TRow, TVal>['columns'],
) => {
  const columnHelper = createColumnHelper<TRow>();

  if (!columns) {
    return Object.keys(rows[0] ?? {}).map((key) =>
      columnHelper.accessor((row: TRow) => row[key as keyof TRow], {
        id: key,
        cell: (info) => info.getValue(),
        header: () => formatObjectKey(key),
        enableSorting: false,
      }),
    );
  }

  const columnEntries = Array.isArray(columns)
    ? columns.map<[string, TableColumn<TRow, TVal>]>((column) => [
        column.key,
        column,
      ])
    : Object.entries(columns);

  return columnEntries.map(([key, column]) => {
    const enableSorting = !!column?.sort || !!column?.sortFn;

    const columnOptions: Parameters<typeof columnHelper.accessor>['1'] = {
      id: key,
      cell: (info) => (
        <IressTableFormattedValue
          currencyCode={column?.currencyCode}
          format={column?.format ?? getFormatFromValue(info.getValue())}
          value={info.getValue<TVal>()}
          row={info.row.original}
        />
      ),
      header: () => column?.label,
      enableSorting,
    };

    if (column?.sortFn) {
      columnOptions.sortingFn = column.sortFn;
    }

    return columnHelper.accessor(
      (row: TRow) => row[key as keyof TRow],
      columnOptions as never, // The typing is weird, cannot get it to work without the never cast, its typed properly above anyway
    );
  });
};
