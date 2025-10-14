import { useIdIfNeeded } from '@/hooks';

import { MouseEvent, ReactNode } from 'react';
import {
  IressMenu,
  IressMenuHeading,
  IressMenuItem,
  IressMenuItemProps,
  IressMenuProps,
} from '../../Menu';
import { IressIcon } from '@/components/Icon';

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
  onCreate?: (e: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Prepends an element to the add button.
   * @default <IressIcon name="plus" screenreaderText="Add" />
   */
  prepend?: ReactNode;
}

export const IressSelectCreate = ({
  fluid = true,
  heading,
  label = 'New option',
  loading,
  onCreate,
  prepend = <IressIcon name="plus" screenreaderText="Add" />,
  ...restProps
}: IressSelectCreateProps) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const labelId = `${id}--label`;
  const hasStringHeading = typeof heading === 'string';

  return (
    <IressMenu
      {...restProps}
      aria-labelledby={
        hasStringHeading ? labelId : restProps['aria-labelledby']
      }
      role="menu"
      fluid={fluid}
    >
      {hasStringHeading ? (
        <IressMenuHeading id={labelId}>{heading}</IressMenuHeading>
      ) : (
        heading
      )}
      <IressMenuItem prepend={prepend} onClick={onCreate} loading={loading}>
        {label}
      </IressMenuItem>
    </IressMenu>
  );
};
