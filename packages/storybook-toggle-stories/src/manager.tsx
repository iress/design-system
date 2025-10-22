import { addons } from 'storybook/manager-api';
import { Addon_TypesEnum } from 'storybook/internal/types';
import { ADDON_ID, ADDON_TITLE, TOOLBAR_ID } from './constants';
import { type AddonConfig } from './types';
import { isSidebarItemVisible } from './helpers/isSidebarItemVisible';
import { ToggleStories } from './components/ToggleStories';

addons.register(ADDON_ID, (api) => {
  const addonConfig = addons.getConfig()[ADDON_ID] as AddonConfig;

  if (addonConfig?.disable?.()) {
    return;
  }

  addons.add(TOOLBAR_ID, {
    title: ADDON_TITLE,
    type: Addon_TypesEnum.TOOLEXTRA,
    render: ({ active }) => <ToggleStories active={active} api={api} />,
  });

  const addonsConfig = addons.getConfig();

  addons.setConfig({
    ...addonsConfig,
    sidebar: {
      ...addonsConfig.sidebar,
      filters: {
        ...addonsConfig.sidebar?.filters,
        [ADDON_ID]: (item): boolean => {
          if (addonConfig?.disable?.()) {
            return true;
          }

          const isVisible = Boolean(window.localStorage.getItem(ADDON_ID));
          return isSidebarItemVisible(item, isVisible);
        },
      },
    },
  });
});
