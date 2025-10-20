import { addons } from 'storybook/manager-api';

addons.setConfig({
  IDS_ToggleStories: {
    disable: () => {
      const disabledFlag =
        process.env.DISABLE_ADDON ??
        window.process.env.IDS_ToggleStories_DISABLE_ADDON;
      return disabledFlag === 'true';
    },
  },
});
