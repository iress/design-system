import { type ReactNode } from 'react';
import { type ValidationBaseProps } from './ValidationBase/ValidationBase.types';
import { type IressHTMLAttributes, type SystemValidationStatus } from '@/main';

export interface IressValidationMessageProps
  extends Omit<ValidationBaseProps<'div', IressHTMLAttributes<'div'>>, 'as'> {
  /**
   * Validation content (what went wrong, what went right).
   */
  children?: ReactNode;
}

export interface ValidationMessageWithEnums
  extends React.FC<IressValidationMessageProps> {
  /** @deprecated IressValidationMessage.Status enum is now deprecated and will be removed in a future version. Please use the SystemValidationStatuses type instead. **/
  Status: typeof SystemValidationStatus;
}
