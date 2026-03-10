import { type Column } from '@tanstack/react-table';
import { type ReactNode, useContext } from 'react';
import { TableContext } from '../TableProvider';
import { type TableCellFormats } from '../TableFormattedValue/TableFormattedValue';
import { normalizeColumnFilter } from '../helpers/composeTableColumnDefs';

export interface TableColumnFilterHookProps {
  columnApi?: Pick<
    Column<object, unknown>,
    | 'getCanFilter'
    | 'setFilterValue'
    | 'getFilterValue'
    | 'getFacetedUniqueValues'
  >;
  columnKey: string;
}

export interface TableColumnFilterHookReturn {
  filterValue: string[];
  filterableText: string;
  filterFormat?: TableCellFormats | ((value: string) => ReactNode);
  setFilter: (values: string[]) => void;
  uniqueValues: string[];
}

export const useTableColumnFilter = ({
  columnApi,
  columnKey,
}: TableColumnFilterHookProps): TableColumnFilterHookReturn | undefined => {
  const table = useContext(TableContext);
  const column = table?.getColumnByKey(columnKey);
  const filterConfig = normalizeColumnFilter(column?.filter);

  if (!column || !filterConfig || !columnApi?.getCanFilter()) return undefined;

  const facetedValues = columnApi.getFacetedUniqueValues();
  const uniqueValues = Array.from(facetedValues.keys())
    .map((v) => String(v ?? ''))
    .filter((v) => v !== '')
    .sort((a, b) => a.localeCompare(b));

  const filterValue =
    (columnApi.getFilterValue() as string[] | undefined) ?? [];

  return {
    filterValue,
    filterableText: filterConfig.filterableText ?? 'filterable',
    filterFormat: (filterConfig.format ?? column.format) as
      | TableCellFormats
      | ((value: string) => ReactNode)
      | undefined,
    setFilter: (values: string[]) => {
      columnApi.setFilterValue(values.length ? values : undefined);
    },
    uniqueValues,
  };
};
