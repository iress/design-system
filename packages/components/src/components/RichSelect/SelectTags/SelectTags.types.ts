import {
  type ButtonRef,
  type IressHTMLAttributes,
  type LabelValueMeta,
} from '@/main';
import { type IressSelectActivatorProps } from '../RichSelect.types';
import { type ReactNode } from 'react';

export interface IressSelectTagsProps
  extends IressSelectActivatorProps,
    Omit<IressHTMLAttributes, 'children'> {
  /**
   * Append content.
   * @default <IressButton mode="tertiary" role="combobox" aria-label="Select"><IressIcon name="chevron-down" /></IressButton>
   */
  append?: ReactNode;

  /**
   * Emitted when a tag is deleted.
   */
  onDelete?: (
    item?: LabelValueMeta,
    e?: React.SyntheticEvent<ButtonRef>,
  ) => void;

  /**
   * Emitted when the combined tag delete button is clicked.
   */
  onDeleteAll?: (e: React.SyntheticEvent<ButtonRef>) => void;

  /**
   * Emitted when actions are toggled.
   */
  onToggleActions?: (open?: boolean) => void;

  /**
   * Limit of tags to display before shortening to `selectedOptionsText`
   * @default 5
   */
  limit?: number;
}
