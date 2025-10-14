import { useId } from 'react';
import { IressUnstyledProps } from '@/types';

export const useIdIfNeeded = <T extends IressUnstyledProps>(
  { id: propId }: T = {} as T,
  prefix = '',
) => {
  const autoId = useId();
  return propId ?? `${prefix}${autoId}`;
};
