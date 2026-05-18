import { flexRender, type Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TableBodyCell } from './TableBodyCell';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import type { IressStyledProps } from '@/types';
import type { AriaRelationshipProps } from '@/hooks/useAriaRelationship';
import { type RefObject, useContext } from 'react';
import { getTableContext } from '../TableProvider';
import { styled } from '@/styled-system/jsx';
import type { TableVirtualiseOptions } from '../Table';

export interface TableRowsProps<TRow extends object = never> extends Partial<
  Pick<AriaRelationshipProps, 'setControlViaRef'>
> {
  additionalHeaders?: string;
  hiddenHeader?: boolean;
  scope?: 'row' | 'col';
  rowProps?:
    | IressStyledProps<'tr'>
    | ((row: Row<TRow>) => IressStyledProps<'tr'>);
  tableId: string;
  testId?: string;
  virtualise?: boolean | TableVirtualiseOptions;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

const VirtualTableRows = <TRow extends object = never>({
  additionalHeaders,
  hiddenHeader,
  rowProps = {},
  setControlViaRef,
  scope = 'row',
  tableId,
  testId,
  virtualise,
  scrollContainerRef,
  rows,
}: TableRowsProps<TRow> & { rows: Row<TRow>[] }) => {
  const virtualiseOptions =
    typeof virtualise === 'object' ? virtualise : undefined;

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Virtual's API is intentionally non-memoizable
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef?.current ?? null,
    estimateSize: () => virtualiseOptions?.estimateSize ?? 40,
    overscan: virtualiseOptions?.overscan ?? 5,
    getItemKey: (index) => rows[index]?.id ?? index,
    ...(virtualiseOptions?.initialRect && {
      initialRect: virtualiseOptions.initialRect,
    }),
  });

  const virtualItems = virtualizer.getVirtualItems();

  if (!virtualItems.length) return null;

  const paddingTop = virtualItems[0].start;
  const paddingBottom =
    virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end;
  const colSpan = rows[0].getVisibleCells().length;

  return (
    <>
      {paddingTop > 0 && (
        <tr aria-hidden="true">
          <td colSpan={colSpan} style={{ height: paddingTop }} />
        </tr>
      )}
      {virtualItems.map((virtualRow) => {
        const row = rows[virtualRow.index];
        return (
          <styled.tr
            key={row.id}
            data-testid={testId?.replace('tbody', 'row')}
            id={`${tableId}--rows--${row.id}`}
            aria-rowindex={virtualRow.index + 2}
            onFocus={() => {
              virtualizer.scrollToIndex(virtualRow.index, {
                align: 'auto',
              });
            }}
            ref={(element) => {
              const rowId = `${tableId}--rows--${row.id}`;
              setControlViaRef?.(rowId)(element);
            }}
            {...(typeof rowProps === 'function' ? rowProps(row) : rowProps)}
          >
            {row.getVisibleCells().map((cell, index) => (
              <TableBodyCell
                additionalHeaders={additionalHeaders}
                data-testid={propagateTestid(
                  testId?.replace('tbody', 'cell'),
                  `row_${row.id}__col_${cell.column.id}`,
                )}
                key={cell.id}
                cellApi={cell}
                hiddenHeader={hiddenHeader}
                index={index}
                scope={scope}
                tableId={tableId}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableBodyCell>
            ))}
          </styled.tr>
        );
      })}
      {paddingBottom > 0 && (
        <tr aria-hidden="true">
          <td colSpan={colSpan} style={{ height: paddingBottom }} />
        </tr>
      )}
    </>
  );
};

export const TableRows = <TRow extends object = never>({
  additionalHeaders,
  hiddenHeader,
  rowProps = {},
  setControlViaRef,
  scope = 'row',
  tableId,
  testId,
  virtualise,
  scrollContainerRef,
}: TableRowsProps<TRow>) => {
  const table = useContext(getTableContext<TRow>());
  const rows = table?.api.getSortedRowModel().rows;

  if (!rows?.length) return null;

  if (virtualise) {
    return (
      <VirtualTableRows
        additionalHeaders={additionalHeaders}
        hiddenHeader={hiddenHeader}
        rowProps={rowProps}
        setControlViaRef={setControlViaRef}
        scope={scope}
        tableId={tableId}
        testId={testId}
        virtualise={virtualise}
        scrollContainerRef={scrollContainerRef}
        rows={rows}
      />
    );
  }

  return rows.map((row) => (
    <styled.tr
      key={row.id}
      data-testid={testId?.replace('tbody', 'row')}
      id={`${tableId}--rows--${row.id}`}
      ref={(element) => {
        const rowId = `${tableId}--rows--${row.id}`;
        setControlViaRef?.(rowId)(element);
      }}
      {...(typeof rowProps === 'function' ? rowProps(row) : rowProps)}
    >
      {row.getVisibleCells().map((cell, index) => (
        <TableBodyCell
          additionalHeaders={additionalHeaders}
          data-testid={propagateTestid(
            testId?.replace('tbody', 'cell'),
            `row_${row.id}__col_${cell.column.id}`,
          )}
          key={cell.id}
          cellApi={cell}
          hiddenHeader={hiddenHeader}
          index={index}
          scope={scope}
          tableId={tableId}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableBodyCell>
      ))}
    </styled.tr>
  ));
};

TableRows.displayName = 'TableRows';
