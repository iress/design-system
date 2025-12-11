import React from 'react';
import { addons } from 'storybook/manager-api';
import { Addon_TypesEnum } from 'storybook/internal/types';
import { ADDON_ID, ADDON_TITLE } from './constants';
import { VersionBadge } from './components/VersionBadge';
import { type AddonConfig } from './types';

addons.register(ADDON_ID, (api) => {
  const addonConfig = addons.getConfig()[ADDON_ID] as AddonConfig;

  if (!addonConfig) {
    return;
  }

  addons.add(ADDON_ID, {
    type: Addon_TypesEnum.TOOLEXTRA,
    title: ADDON_TITLE,
    render: () => <VersionBadge {...addonConfig} api={api} />,
  });
});
