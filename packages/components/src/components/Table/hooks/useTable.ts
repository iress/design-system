import { useContext } from 'react';
import { getTableContext } from '../TableProvider';

/**
 * Allows you to access the table context from within a child component.
 * @returns The table context.
 */
export const useTable = <TRow extends object, TVal = unknown>() =>
  useContext(getTableContext<TRow, TVal>());
