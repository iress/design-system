import { IressDivider, type IressDividerProps } from '@/main';
import { useMenu } from '../hooks/useMenu';

export const IressMenuDivider = (props: IressDividerProps) => {
  const menu = useMenu();
  return (
    <IressDivider
      {...props}
      role={menu?.role === 'menu' ? undefined : 'presentation'}
    />
  );
};
