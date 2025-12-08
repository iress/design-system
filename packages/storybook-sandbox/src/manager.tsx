import React from 'react';
import { addons } from 'storybook/manager-api';
import { Addon_TypesEnum } from 'storybook/internal/types';
import {
  ADDON_ID,
  ADDON_TITLE,
  SANDBOX_DOCS_RENDERED,
  TOOLBAR_ID,
} from './constants';
import { OpenInCodeSandbox } from './components/OpenInCodeSandbox';
import { DOCS_RENDERED } from 'storybook/internal/core-events';

addons.register(ADDON_ID, (api) => {
  addons.add(TOOLBAR_ID, {
    title: ADDON_TITLE,
    type: Addon_TypesEnum.TOOLEXTRA,
    match: ({ viewMode }) => {
      if (!viewMode) {
        return false;
      }

      return /^(story)$/.test(viewMode);
    },
    render: ({ active }) => <OpenInCodeSandbox active={active} api={api} />,
  });

  addons.getChannel().on(DOCS_RENDERED, () => {
    setTimeout(() => {
      addons
        .getChannel()
        .emit(SANDBOX_DOCS_RENDERED, api.getCurrentStoryData());
    }, 100);
  });
});
