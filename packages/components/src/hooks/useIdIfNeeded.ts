import { useId } from 'react';
import { type IressHTMLAttributes } from '../interfaces';

export const useIdIfNeeded = <
  T extends React.HTMLAttributes<HTMLElement> = IressHTMLAttributes,
>(
  { id: propId }: T = {} as T,
  prefix = '',
) => {
  const autoId = useId();
  return propId ?? `${prefix}${autoId}`;
};
