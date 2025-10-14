import { type IressHTMLAttributes } from '@/interfaces';
import { type ButtonRef } from '../Button';

export interface IressTagProps extends IressHTMLAttributes {
  /**
   * Contents of the tag.
   */
  children?: React.ReactNode;

  /**
   * You can completely replace the delete button to provide your own functionality.
   * When this is provided, `deleteButtonText` will not be used and `onDelete` and `onDeleteButtonBlur` will not be called.
   */
  deleteButton?: React.ReactNode;

  /**
   * Screen reader text for delete button
   */
  deleteButtonText?: string;

  /**
   * Callback triggered when the tag is deleted
   */
  onDelete?: (children: string, e: React.SyntheticEvent<ButtonRef>) => void;

  /**
   * Callback triggered when the close button is blurred
   */
  onDeleteButtonBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
}
