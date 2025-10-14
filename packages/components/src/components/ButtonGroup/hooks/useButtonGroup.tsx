import { useContext } from 'react';
import { ButtonGroupContext } from '../ButtonGroupProvider';

export const useButtonGroup = () => useContext(ButtonGroupContext);
