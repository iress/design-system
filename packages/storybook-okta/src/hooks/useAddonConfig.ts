import { useState, useEffect } from 'react';
import { ADDON_OPTIONS } from '../constants';
import { registerOkta } from '../helpers/oktaRegister';
import type { AddonConfig } from '../types';
import { addons } from 'storybook/internal/manager-api';

export const useAddonConfigForManager = () => {
  const [addonConfig, setAddonConfig] = useState<AddonConfig | undefined>(
    getAddonConfigForPreview(),
  );

  useEffect(() => {
    const channel = addons.getChannel();

    const handleOptions = (options: AddonConfig | undefined) => {
      setAddonConfig(options);
      if (options) {
        registerOkta(options);
      }
    };

    channel.on(ADDON_OPTIONS, handleOptions);

    // Cleanup function to remove listener on unmount
    return () => {
      channel.off(ADDON_OPTIONS, handleOptions);
    };
  }, []); // Empty dependency array - only set up once

  return addonConfig;
};

export const getAddonConfigForPreview = () => {
  return process.env.IDS_OKTA as unknown as AddonConfig | undefined;
};
