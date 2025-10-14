import { useContext } from 'react';
import { getTableContext } from '../TableContext';

export const useTable = <TRow extends object, TVal = unknown>() =>
  useContext(getTableContext<TRow, TVal>());
