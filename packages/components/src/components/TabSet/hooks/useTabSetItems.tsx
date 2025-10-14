import { useContext } from 'react';
import { TabSetItemsContext } from '../TabSetProvider';

export const useTabSetItems = () => useContext(TabSetItemsContext);
