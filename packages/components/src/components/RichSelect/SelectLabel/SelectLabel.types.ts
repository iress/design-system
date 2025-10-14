import { type IressHTMLAttributes } from '@/interfaces';
import { type IressSelectActivatorProps } from '../RichSelect.types';

export type IressSelectLabelProps = Omit<
  IressHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  IressSelectActivatorProps;
