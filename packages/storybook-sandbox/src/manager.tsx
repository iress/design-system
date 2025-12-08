import React from 'react';
import { addons } from 'storybook/manager-api';
import { Addon_TypesEnum } from 'storybook/internal/types';
import { ADDON_ID, ADDON_TITLE, TOOLBAR_ID } from './constants';
import { OpenInCodeSandbox } from './components/OpenInCodeSandbox';

addons.register(ADDON_ID, (api) => {
  addons.add(TOOLBAR_ID, {
    title: ADDON_TITLE,
    type: Addon_TypesEnum.TOOLEXTRA,
    render: ({ active }) => <OpenInCodeSandbox active={active} api={api} />,
  });
});
