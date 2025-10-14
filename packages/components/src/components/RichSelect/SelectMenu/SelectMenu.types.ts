import { type ReactNode } from 'react';
import { type IressMenuItemProps, type IressMenuProps } from '../../Menu';
import {
  type FormattedLabelValueMeta,
  type LabelValueMeta,
} from '@/interfaces';

export interface IressSelectMenuProps
  extends Omit<
    IressMenuProps,
    'children' | 'onChange' | 'role' | 'selected' | 'type'
  > {
  /**
   * Heading slot. Often used for a title or description.
   * If a string, will automatically provide an id for aria-labelledby.
   */
  heading?: ReactNode;

  /**
   * Hide selected items from menu.
   * Useful for autocomplete scenarios.
   */
  hideSelectedItems?: boolean;

  /**
   * Items to be displayed in the menu, array of FormattedLabelValueMeta.
   */
  items?: FormattedLabelValueMeta[];

  /**
   * Maximum number of results displayed on mobile screen sizes (< 768).
   */
  limitMobile?: number;

  /**
   * Maximum number of results displayed on larger screen sizes (>= 768).
   */
  limitDesktop?: number;

  /**
   * No results text to display when no items are found.
   */
  noResults?: ReactNode;

  /**
   * Emitted when the value changes when item is selected from the menu
   */
  onChange?: (selected?: LabelValueMeta | LabelValueMeta[]) => void;

  /**
   * Selected items.
   */
  selected?: LabelValueMeta | LabelValueMeta[];

  /**
   * Set whether to display selected items first in the menu.
   */
  selectedFirst?: boolean;
}

export interface IressSelectMenuItemProps
  extends Omit<IressMenuItemProps, 'value'>,
    FormattedLabelValueMeta {
  /**
   * Set whether this item is hidden on mobile
   */
  hiddenOnMobile?: boolean;
}
