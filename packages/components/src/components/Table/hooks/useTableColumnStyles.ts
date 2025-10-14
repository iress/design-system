import { tableCell } from '../Table.styles';
import { type CSSProperties, useContext } from 'react';
import { type Column } from '@tanstack/react-table';
import { TableContext } from '../TableProvider';
import { css } from '@/styled-system/css';
import { splitCssProps } from '@/styled-system/jsx';

export interface TableColumnStylesHookProps {
  columnApi?: Pick<Column<object, unknown>, 'getCanSort' | 'toggleSorting'>;
  columnKey: string;
}

export interface TableColumnStylesHookReturn {
  className: string;
  style: CSSProperties;
}

export const useTableColumnStyles = ({
  columnKey,
}: TableColumnStylesHookProps): TableColumnStylesHookReturn | undefined => {
  const column = useContext(TableContext)?.getColumnByKey(columnKey);

  if (!column) return undefined;

  const formatVariant =
    column.format === 'number' || column.format === 'currency'
      ? column.format
      : 'default';
  const [styleProps] = splitCssProps(column);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, sonarjs/no-unused-vars -- extracting style width to avoid passing it to css function
  const { width: _width, ...restStyleProps } = styleProps;

  return {
    className: css(
      tableCell.raw({
        format: column.textAlign ? undefined : formatVariant,
        divider: column.divider,
      }),
      restStyleProps,
    ),
    style: {
      width: column?.width,
      minWidth: column?.width,
    },
  };
};
