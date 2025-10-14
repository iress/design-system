import { type Column } from '@tanstack/react-table';
import { type TableSortButtonProps } from '../components/TableSortButton';
import { useContext } from 'react';
import { TableContext } from '../TableProvider';

export interface TableColumnSortHookProps {
  columnApi?: Pick<Column<object, unknown>, 'getCanSort' | 'toggleSorting'>;
  columnKey: string;
}

export interface TableColumnSortHookReturn {
  buttonProps: TableSortButtonProps;
  columnProps: {
    'aria-sort'?: 'none' | 'ascending' | 'descending';
  };
}

export const useTableColumnSort = ({
  columnApi,
  columnKey,
}: TableColumnSortHookProps): TableColumnSortHookReturn | undefined => {
  const table = useContext(TableContext);
  const column = table?.getColumnByKey(columnKey);
  const canSort = column?.sort ?? column?.sortFn;

  if (!column || !canSort || !columnApi?.getCanSort()) return undefined;

  const currentSort = table?.api
    .getState()
    .sorting.find((sort) => sort.id === columnKey);
  const ariaSort = currentSort?.desc ? 'descending' : 'ascending';

  return {
    buttonProps: {
      label: column.sortableText,
      sort: currentSort,
      toggleSorting: () => {
        columnApi.toggleSorting();
      },
    },
    columnProps: {
      'aria-sort': currentSort ? ariaSort : 'none',
    },
  };
};
