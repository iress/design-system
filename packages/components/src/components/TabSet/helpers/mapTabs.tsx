import React from 'react';
import { type Tab } from '../TabSet.types';
import { idsLogger } from '@helpers/utility/idsLogger';
import { LoggerLevels } from '@/enums';
import { IressTab } from '..';

export const mapTabs = (tabs: Tab[]): React.JSX.Element[] | null => {
  idsLogger(
    'IressTabs: mapTabs has been deprecated and will be removed in a future version of IDS, please map and render the items array directly in your application instead.',
    LoggerLevels.Warn,
  );

  if (!tabs?.length) return null;

  return tabs.map(
    (
      {
        tabName,
        active,
        tabButtonText,
        tabButtonTestId,
        tabButtonOnClick,
        tabPanelContent,
        tabPanelTestId,
      },
      key: number,
    ) => (
      <IressTab
        value={tabName}
        active={active}
        key={tabName || key}
        data-testid={tabButtonTestId}
        onClick={tabButtonOnClick}
        label={tabButtonText}
      >
        {tabPanelTestId ? (
          <div data-testid={tabPanelTestId}>{tabPanelContent}</div>
        ) : (
          tabPanelContent
        )}
      </IressTab>
    ),
  );
};
