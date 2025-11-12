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

    const handleOptions = (options: AddonConfig | string | undefined) => {
      const config =
        typeof options === 'string'
          ? (JSON.parse(options) as AddonConfig)
          : options;

      setAddonConfig(config);

      if (config) {
        registerOkta(config);
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
  const fromEnv = process.env.IDS_OKTA as unknown as
    | AddonConfig
    | string
    | undefined;

  return typeof fromEnv === 'string'
    ? (JSON.parse(fromEnv) as AddonConfig)
    : fromEnv;
};
