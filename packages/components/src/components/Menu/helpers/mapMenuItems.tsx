import React from 'react';
import { type MenuItem } from '../MenuItem/MenuItem.types';
import { idsLogger } from '@helpers/utility/idsLogger';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressMenuHeading } from '../MenuHeading/MenuHeading';
import { IressMenuItem } from '../MenuItem/MenuItem';

/**
 *  @deprecated This function has been deprecated and will be removed in a future version of IDS, please map and render the items array directly in your application instead
 */
export const mapMenuItems = (items: MenuItem[]): React.JSX.Element[] | null => {
  idsLogger(
    'IressMenu: mapMenuItems has been deprecated and will be removed in a future version of IDS, please map and render the items array directly in your application instead',
    'warn',
  );

  if (!items?.length) return null;

  return items.map(
    (
      {
        label,
        href,
        onClick,
        divider,
        testId,
        headingLevel,
        selected,
        value,
        key: keyProp,
      }: MenuItem,
      index,
    ) => {
      const key = keyProp ?? String(value ?? index);

      if (headingLevel) {
        return (
          <IressMenuHeading
            key={key}
            level={headingLevel}
            divider={divider}
            data-testid={propagateTestid(testId, 'iress-text')}
          >
            {label}
          </IressMenuHeading>
        );
      }

      return (
        <IressMenuItem
          key={key}
          onClick={onClick}
          divider={divider}
          selected={selected}
          data-testid={propagateTestid(testId, 'iress-button')}
          value={value}
          href={href}
        >
          {label}
        </IressMenuItem>
      );
    },
  );
};
