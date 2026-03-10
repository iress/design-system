import { type Column } from '@tanstack/react-table';
import { useContext } from 'react';
import { TableContext } from '../TableProvider';

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
  setFilter: (values: string[]) => void;
  uniqueValues: string[];
}

export const useTableColumnFilter = ({
  columnApi,
  columnKey,
}: TableColumnFilterHookProps): TableColumnFilterHookReturn | undefined => {
  const table = useContext(TableContext);
  const column = table?.getColumnByKey(columnKey);
  const canFilter = column?.filter;

  if (!column || !canFilter || !columnApi?.getCanFilter()) return undefined;

  const facetedValues = columnApi.getFacetedUniqueValues();
  const uniqueValues = Array.from(facetedValues.keys())
    .map((v) => String(v ?? ''))
    .filter((v) => v !== '')
    .sort((a, b) => a.localeCompare(b));

  const filterValue =
    (columnApi.getFilterValue() as string[] | undefined) ?? [];

  return {
    filterValue,
    filterableText: column.filterableText ?? 'filterable',
    setFilter: (values: string[]) => {
      columnApi.setFilterValue(values.length ? values : undefined);
    },
    uniqueValues,
  };
};
