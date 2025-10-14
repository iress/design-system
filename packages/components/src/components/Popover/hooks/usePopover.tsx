import { useContext } from 'react';
import { PopoverContext } from '../PopoverProvider';

export const usePopover = () => useContext(PopoverContext);
