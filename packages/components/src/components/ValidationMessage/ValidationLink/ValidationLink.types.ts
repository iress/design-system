import { type ReactNode } from 'react';
import { type ValidationBaseProps } from '../ValidationBase/ValidationBase.types';

export interface IressValidationLinkProps
  extends Omit<ValidationBaseProps<'a'>, 'as'> {
  /**
   * Validation content (what went wrong, what went right).
   */
  children?: ReactNode;

  /**
   * ID of element the message is describing. If nothing is supplied a link will not render.
   */
  linkToTarget: string;
}
