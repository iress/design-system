import { type MouseEvent, type ReactNode } from 'react';
import { type IressMenuItemProps, type IressMenuProps } from '../../Menu';
import { type ButtonRef } from '@/components/Button';

export interface IressSelectCreateProps
  extends Omit<
      IressMenuProps,
      | 'changeOnBlur'
      | 'children'
      | 'defaultSelected'
      | 'multiSelect'
      | 'onChange'
      | 'role'
      | 'selected'
      | 'type'
    >,
    Pick<IressMenuItemProps, 'loading'> {
  /**
   * If set to true, menu will fill the width of its container.
   * @default true
   */
  fluid?: boolean;

  /**
   * Heading slot. Often used for a title or description.
   * If a string, will automatically provide an id for aria-labelledby.
   */
  heading?: ReactNode;

  /**
   * Label that will be displayed on the add button.
   * @default 'New option'
   */
  label?: ReactNode;

  /**
   * Emitted when the user clicks the add button.
   */
  onCreate?: (e: MouseEvent<ButtonRef>) => void;

  /**
   * Prepends an element to the add button.
   * @default <IressIcon name="plus" screenreaderText="Add" />
   */
  prepend?: ReactNode;
}
