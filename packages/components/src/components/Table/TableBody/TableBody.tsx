import { propagateTestid } from '@/helpers/utility/propagateTestid';
import classNames from 'classnames';
import { TableEmpty } from '../components/TableEmpty';
import { TableHeader } from '../components/TableHeader';
import { IressTableProvider } from '../TableProvider';
import styles from '../Table.module.scss';
import { useIdIfNeeded } from '@/hooks';
import { hasColumns } from '../helpers/hasColumns';
import { useTable } from '../hooks/useTable';
import { useEffect, useState } from 'react';
import { type IressTableBodyProps } from './TableBody.types';
import { TableRows } from '../components/TableRows';
import {
  type AriaRelationshipProps,
  useAriaRelationship,
} from '@/hooks/useAriaRelationship';
import { GlobalCSSClass } from '@/enums';

interface TableBodyHeaderProps
  extends Pick<IressTableBodyProps, 'caption' | 'hiddenCaption'>,
    Pick<AriaRelationshipProps<HTMLTableCellElement>, 'setController'> {
  onChange?: () => void;
  open?: boolean;
  tableId: string;
}

const TableBodyHeader = ({
  caption,
  hiddenCaption,
  onChange,
  open,
  setController,
  tableId,
}: TableBodyHeaderProps) => {
  const table = useTable();
  const numberOfColumns = table?.api.getVisibleFlatColumns().length;

  if (!numberOfColumns) return null;

  return (
    <tr>
      <th
        aria-expanded={hiddenCaption ? undefined : open}
        colSpan={numberOfColumns}
        className={classNames(styles.rowGroupHeader, {
          [GlobalCSSClass.SROnly]: hiddenCaption,
        })}
        id={`${tableId}--caption`}
        onClick={onChange}
        scope="rowgroup"
        ref={setController}
      >
        <button className={styles.activator} type="button">
          {caption}
        </button>
      </th>
    </tr>
  );
};

const TableBodyChildren = ({
  children,
  setControlViaRef,
  tableId,
}: Pick<IressTableBodyProps, 'children'> &
  Pick<AriaRelationshipProps, 'setControlViaRef'> & {
    tableId: string;
  }) => {
  const table = useTable();
  const numberOfColumns = table?.api.getVisibleFlatColumns().length;

  if (!children) return null;

  const id = `${tableId}--children`;

  return (
    <tr id={id} ref={(element) => setControlViaRef(id)(element)}>
      <td colSpan={numberOfColumns}>{children}</td>
    </tr>
  );
};

export const IressTableBody = <TRow extends object = never, TVal = never>({
  caption,
  children,
  columns,
  className,
  'data-testid': dataTestId,
  empty,
  hiddenCaption,
  hiddenHeader,
  onOpened,
  onClosed,
  open = false,
  rowProps,
  rows = [],
  scope,
  ...restProps
}: IressTableBodyProps<TRow, TVal>) => {
  const [isOpen, setIsOpen] = useState(open);
  const { setController, setControlViaRef } =
    useAriaRelationship<HTMLTableCellElement>('aria-controls');
  const id = useIdIfNeeded({ id: restProps.id });
  const showTable =
    children ?? (empty && hasColumns(columns)) ?? !!rows?.length;

  useEffect((): void => {
    setIsOpen(open);
  }, [open]);

  if (!showTable) {
    return null;
  }

  const handleActivatorClick = (): void => {
    setIsOpen(!isOpen);

    if (isOpen) {
      onClosed?.();
    } else {
      onOpened?.();
    }
  };

  const showRows = isOpen || hiddenCaption;

  return (
    <IressTableProvider columns={columns} rows={rows}>
      <tbody
        aria-labelledby={`${id}--caption`}
        {...restProps}
        className={classNames(className, {
          [styles.hiddenHeader]: hiddenHeader,
        })}
      >
        <TableBodyHeader
          setController={setController}
          caption={caption}
          hiddenCaption={hiddenCaption}
          onChange={handleActivatorClick}
          open={isOpen}
          tableId={id}
        />
        {showRows && (
          <>
            {!hiddenHeader && (
              <TableHeader
                additionalHeaders={`${id}--caption`}
                className={styles.rowGroupColumnHeaders}
                setControlViaRef={setControlViaRef}
                tableId={id}
                testId={propagateTestid(dataTestId, 'thead')}
              />
            )}
            <TableRows
              additionalHeaders={`${id}--caption`}
              tableId={id}
              rowProps={rowProps}
              setControlViaRef={setControlViaRef}
              scope={scope}
              hiddenHeader={hiddenHeader}
              testId={propagateTestid(dataTestId, 'tbody')}
            />
            <TableEmpty>{empty}</TableEmpty>
            <TableBodyChildren setControlViaRef={setControlViaRef} tableId={id}>
              {children}
            </TableBodyChildren>
          </>
        )}
      </tbody>
    </IressTableProvider>
  );
};
