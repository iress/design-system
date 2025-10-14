import classNames from 'classnames';
import {
  type IressTableProps,
  type TableEnums,
  type TableExports,
  type TableRef,
  TableScope,
} from './Table.types';
import styles from './Table.module.scss';
import { useIdIfNeeded } from '../../hooks';
import { TableEmpty } from './components/TableEmpty';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { idsLogger } from '@helpers/utility/idsLogger';
import { TableHeader } from './components/TableHeader';
import { IressTableProvider } from './TableProvider';
import { hasColumns } from './helpers/hasColumns';
import { TableRows } from './components/TableRows';
import {
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type Ref,
} from 'react';
import { useTable } from './hooks/useTable';

const Table = <TRow extends object = never, TVal = never>(
  {
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
    rowProps,
    rows = [],
    scope,
    ...restProps
  }: IressTableProps<TRow, TVal>,
  ref: ForwardedRef<TableRef<TRow>>,
) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const captionId = `${id}--caption`;
  const hasContent = (empty && hasColumns(columns)) ?? !!rows?.length;
  const showTable = children ?? hasContent;

  if (columns && !Array.isArray(columns)) {
    idsLogger(
      'IressTable: Passing columns as an object is deprecated and will be removed in a future version. Please use an array instead.',
      'warn',
    );
  }

  const theadTestId = propagateTestid(dataTestId, 'thead');
  const tbodyTestId = propagateTestid(dataTestId, 'tbody');

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.compact]: compact,
      })}
      data-testid={dataTestId}
    >
      {showTable && (
        <IressTableProvider columns={columns} rows={rows} ref={ref}>
          <table
            {...restProps}
            className={classNames(className, styles.table, {
              [styles.hover]: hover,
              [styles.hiddenHeader]: hiddenHeader,
            })}
            id={id}
            data-testid={propagateTestid(dataTestId, 'table')}
          >
            <caption
              id={captionId}
              className={classNames(styles.caption, {
                [GlobalCSSClass.SROnly]: hiddenCaption,
              })}
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
          </table>
        </IressTableProvider>
      )}
    </div>
  );
};

const ForwardedTable = forwardRef(Table) as <
  TRow extends object = never,
  TVal = never,
>(
  props: IressTableProps<TRow, TVal> & { ref?: Ref<TableRef<TRow>> },
) => ReactElement;

export const IressTable = ForwardedTable as typeof ForwardedTable &
  TableEnums &
  TableExports;

/** @deprecated IressTable.Scope enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressTable.Scope = TableScope;

IressTable.useTable = useTable;
