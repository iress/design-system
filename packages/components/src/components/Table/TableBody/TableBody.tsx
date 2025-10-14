import { propagateTestid } from '@/helpers/utility/propagateTestid';
import { TableEmpty } from '../components/TableEmpty';
import { TableHeader } from '../components/TableHeader';
import { useIdIfNeeded } from '@/hooks';
import { useEffect, useState, ReactNode, useContext } from 'react';
import { TableRows } from '../components/TableRows';
import {
  AriaRelationshipProps,
  useAriaRelationship,
} from '@/hooks/useAriaRelationship';
import { table } from '../Table.styles';
import { IressTableProps } from '../Table';
import { TableContext, TableProvider } from '../TableProvider';
import { styled } from '@/styled-system/jsx';

export interface IressTableBodyProps<TRow extends object = never, TVal = never>
  extends Omit<
    IressTableProps<TRow, TVal, 'tbody'>,
    'alternate' | 'compact' | 'hover' | 'removeRowBorders'
  > {
  /**
   * Caption that describes the data in the inner table, required for accessibility.
   * Used to open/close the inner table.
   *
   * **Note:** Do not include interactive elements inside the caption.
   */
  caption: ReactNode;

  /**
   * When set to true, the table caption will be visually hidden.
   * If set, the inner table will always be open.
   */
  hiddenCaption?: boolean;

  /**
   * Is called when table is opened.
   */
  onOpened?: () => void;

  /**
   * Is called when table is closed.
   */
  onClosed?: () => void;

  /**
   * When true, all rows will be visible, otherwise they are hidden.
   */
  open?: boolean;
}

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
  const tableContext = useContext(TableContext);
  const numberOfColumns = tableContext?.api.getVisibleFlatColumns().length;

  if (!numberOfColumns) return null;

  const classes = table({ tableBodyOpen: open });

  return (
    <tr>
      <styled.th
        aria-expanded={hiddenCaption ? undefined : open}
        colSpan={numberOfColumns}
        className={classes.rowGroupHeader}
        id={`${tableId}--caption`}
        onClick={onChange}
        scope="rowgroup"
        srOnly={hiddenCaption}
        ref={setController}
      >
        <button className={classes.activator} type="button">
          {caption}
        </button>
      </styled.th>
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
  const table = useContext(TableContext);
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
  const showTable = children ?? (empty && columns?.length) ?? !!rows?.length;

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
    <TableProvider columns={columns} rows={rows}>
      <styled.tbody aria-labelledby={`${id}--caption`} {...restProps}>
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
      </styled.tbody>
    </TableProvider>
  );
};
