import { useContext } from 'react';
import { MenuContext } from '../MenuProvider';

// TODO: Add warning if using this is being used outside of a menu (and possibly to TabSet as well) - similar to useToast, useModal etc.
export const useMenu = () => useContext(MenuContext);
