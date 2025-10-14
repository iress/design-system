import { type ReactNode, type UIEvent } from 'react';
import { type IressMenuTextProps } from '../../Menu';
import { type ButtonRef } from '@/components/Button';

export interface IressSelectHeadingProps extends IressMenuTextProps {
  /**
   * The content to be rendered; can be a string or a ReactNode (e.g. IressIcon).
   */
  children: ReactNode;

  /**
   * Adds a clear all button to the heading.
   */
  clearAll?: string | boolean;

  /**
   * Emitted when the user clicks the clear button, or triggers it using a keyboard.
   */
  onClearAll?: (e: UIEvent<ButtonRef>) => void;
}
