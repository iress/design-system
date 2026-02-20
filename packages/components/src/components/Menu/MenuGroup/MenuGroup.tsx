import type { TextElements } from '@/components/Text';
import { IressMenuDivider } from '../MenuDivider/MenuDivider';
import {
  IressMenuHeading,
  type IressMenuTextProps,
} from '../MenuText/MenuText';
import type { ReactNode } from 'react';

export type IressMenuGroupProps<TLabel extends TextElements = 'h2'> = Omit<
  IressMenuTextProps<TLabel>,
  'children'
> & {
  /**
   * Label for the group, displayed as a non-selectable heading.
   */
  label: ReactNode;

  /**
   * Items within the group (typically menu items).
   */
  children?: ReactNode;

  /**
   * Adds a divider after the group.
   */
  divider?: boolean;
};

/**
 * MenuGroup component for grouping related menu items under a common heading.
 * The heading is non-focusable and non-selectable, serving as a label for the group.
 */
export const IressMenuGroup = <E extends TextElements = 'div'>({
  label,
  children,
  divider,
  ...restProps
}: IressMenuGroupProps<E>) => (
  <>
    <IressMenuHeading {...restProps}>{label}</IressMenuHeading>
    {children}
    {divider && <IressMenuDivider />}
  </>
);

IressMenuGroup.displayName = 'IressMenuGroup';
