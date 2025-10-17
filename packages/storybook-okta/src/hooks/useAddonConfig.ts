import { useState } from 'react';
import { ADDON_OPTIONS } from 'src/constants';
import { registerOkta } from 'src/helpers/oktaRegister';
import type { AddonConfig } from 'src/types';
import { addons } from 'storybook/internal/manager-api';

export const useAddonConfigForManager = () => {
  const [addonConfig, setAddonConfig] = useState<AddonConfig | undefined>(
    getAddonConfigForPreview(),
  );

  addons.getChannel().on(ADDON_OPTIONS, (options) => {
    setAddonConfig(options);
    if (options) {
      registerOkta(options);
    }
  });

  return addonConfig;
};

export const getAddonConfigForPreview = () => {
  return process.env.IDS_OKTA as unknown as AddonConfig | undefined;
};
