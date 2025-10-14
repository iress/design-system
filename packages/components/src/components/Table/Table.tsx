import { useIdIfNeeded } from '../../hooks';
import { TableEmpty } from './components/TableEmpty';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { TableHeader } from './components/TableHeader';
import { TableProvider } from './TableProvider';
import { TableRows, TableRowsProps } from './components/TableRows';
import { ReactNode } from 'react';
import { table } from './Table.styles';
import { cx } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { TableColumn } from './helpers/composeTableColumnDefs';
import { IressStyledProps } from '@/types';
import { GlobalCSSClass } from '@/enums';

export type IressTableProps<
  TRow extends object = never,
  TVal = never,
  E extends 'table' | 'tbody' = 'table',
> = Omit<IressStyledProps<E>, 'border'> & {
  /**
   * If set to true, the table will have alternating row colors.
   * This is useful for improving readability in tables with many rows.
   */
  alternate?: boolean;

  /**
   * Caption that describes the data in the table, required for accessibility.
   */
  caption: ReactNode;

  /**
   * Multiple table elements can be passed as children.
   * Used to create a static table, or add a `<tfoot />` element to a `rows` based table.
   */
  children?: ReactNode;

  /**
   * A mapping of columns to be displayed in the table.
   * If not provided, it will be automatically regenerated from the row data.
   */
  columns?: TableColumn<TRow, TVal>[];

  /**
   * Compact view of the table, used for tables with a lot of data.
   */
  compact?: boolean;

  /**
   * Content to be show when there is no rowData (columns must also be provided).
   */
  empty?: ReactNode;

  /**
   * When set to true, the table caption will be visually hidden.
   */
  hiddenCaption?: boolean;

  /**
   * When set to true, the table header (`<thead></thead>`) will be not be rendered.
   * Only use with very simple tables.
   */
  hiddenHeader?: boolean;

  /**
   * When set to true, hovering over a row will trigger a UI change.
   */
  hover?: boolean;

  /**
   * If set to true, the table will not have borders between rows.
   * This is useful for simpler tables where the row borders are not needed.
   */
  removeRowBorders?: boolean;

  /**
   * Add additional props to the row element.
   * Can be a props map or a function that returns an props map. The function is called with the row data.
   */
  rowProps?: TableRowsProps<TRow>['rowProps'];

  /**
   * Each object in the array contains the data for a row.
   * @default []
   */
  rows?: TRow[];

  /**
   * Defaults to 'row' - the first cell in the row is a `<th>`, otherwise it's a `<td>`.
   * @default 'row'
   */
  scope?: 'row' | 'col';
};

export const IressTable = <TRow extends object = never, TVal = never>({
  alternate = false,
  caption,
  children,
  columns,
  compact = false,
  className,
  'data-testid': dataTestId,
  empty,
  hiddenCaption,
  hiddenHeader,
  hover,
  removeRowBorders = false,
  rowProps,
  rows = [],
  scope,
  ...restProps
}: IressTableProps<TRow, TVal>) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const captionId = `${id}--caption`;
  const hasContent = (empty && columns?.length) ?? !!rows?.length;
  const showTable = children ?? hasContent;

  const classes = table({
    alternate,
    compact,
    hover,
    hiddenCaption,
    removeRowBorders,
  });

  const theadTestId = propagateTestid(dataTestId, 'thead');
  const tbodyTestId = propagateTestid(dataTestId, 'tbody');

  if (!showTable) {
    return null;
  }

  return (
    <div className={classes.root} data-testid={dataTestId}>
      <TableProvider columns={columns} rows={rows}>
        <styled.table
          {...restProps}
          className={cx(className, classes.table, GlobalCSSClass.Table)}
          id={id}
          data-testid={propagateTestid(dataTestId, 'table')}
        >
          <caption
            id={captionId}
            className={cx(classes.caption)}
            data-testid={propagateTestid(dataTestId, 'caption')}
          >
            {caption}
          </caption>
          {!hiddenHeader && hasContent && (
            <thead data-testid={theadTestId}>
              <TableHeader tableId={id} testId={theadTestId} />
            </thead>
          )}
          {hasContent && (
            <tbody data-testid={tbodyTestId}>
              <TableRows
                testId={tbodyTestId}
                tableId={id}
                rowProps={rowProps}
                scope={scope}
                hiddenHeader={hiddenHeader}
              />
              <TableEmpty>{empty}</TableEmpty>
            </tbody>
          )}
          {children}
        </styled.table>
      </TableProvider>
    </div>
  );
};
