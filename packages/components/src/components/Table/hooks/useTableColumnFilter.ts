import { type Column } from '@tanstack/react-table';
import { type ReactNode, useContext, useMemo } from 'react';
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

export interface TableColumnFilterHookReturn<TValue = unknown> {
  filterValue: string[];
  filterableText: string;
  filterFormat?: TableCellFormats | ((value: TValue) => ReactNode);
  setFilter: (values: string[]) => void;
  uniqueValues: TValue[];
}

export const useTableColumnFilter = ({
  columnApi,
  columnKey,
}: TableColumnFilterHookProps): TableColumnFilterHookReturn | undefined => {
  const table = useContext(TableContext);
  const column = table?.getColumnByKey(columnKey);
  const filterConfig = normalizeColumnFilter(column?.filter);

  const facetedValues = columnApi?.getFacetedUniqueValues();
  const uniqueValues = useMemo(() => {
    const rawValues =
      filterConfig?.values ??
      (facetedValues ? Array.from(facetedValues.keys()) : []);
    const filtered = rawValues.filter((v) => v != null && v !== '');
    if (filtered.every((v) => typeof v === 'string')) {
      return filtered.sort((a, b) => a.localeCompare(b));
    }
    return filtered;
  }, [facetedValues, filterConfig?.values]);

  if (!column || !filterConfig || !columnApi?.getCanFilter()) return undefined;

  const filterValue =
    (columnApi.getFilterValue() as string[] | undefined) ?? [];

  return {
    filterValue,
    filterableText: filterConfig.filterableText ?? 'filterable',
    filterFormat: (filterConfig.format ?? column.format) as
      | TableCellFormats
      | ((value: unknown) => ReactNode)
      | undefined,
    setFilter: (values: string[]) => {
      columnApi.setFilterValue(values.length ? values : undefined);
    },
    uniqueValues,
  };
};
