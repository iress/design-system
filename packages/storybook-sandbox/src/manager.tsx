import React from 'react';
import { Suspense } from 'react';
import { addons } from 'storybook/manager-api';
import { Addon_TypesEnum } from 'storybook/internal/types';
import {
  ADDON_ID,
  ADDON_TITLE,
  PANEL_ID,
  SANDBOX_DOCS_RENDERED,
  TOOLBAR_ID,
} from './constants';
import { SandboxEditor } from './components/SandboxEditor';
import { SandboxOpenEditor } from './components/SandboxOpenEditor';
import { isSandboxStory } from './helpers';
import { DOCS_RENDERED } from 'storybook/internal/core-events';

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: Addon_TypesEnum.PANEL,
    title: ADDON_TITLE,
    paramKey: PANEL_ID,
    match: () => isSandboxStory(api),
    render: ({ active }) => (
      <Suspense fallback="Loading editor...">
        <SandboxEditor active={active} api={api} />
      </Suspense>
    ),
  });

  addons.add(TOOLBAR_ID, {
    title: ADDON_TITLE,
    type: Addon_TypesEnum.TOOL,
    match: () => isSandboxStory(api),
    render: () => <SandboxOpenEditor api={api} />,
  });

  addons.getChannel().on(DOCS_RENDERED, () => {
    setTimeout(() => {
      addons
        .getChannel()
        .emit(SANDBOX_DOCS_RENDERED, api.getCurrentStoryData());
    }, 100);
  });
});
