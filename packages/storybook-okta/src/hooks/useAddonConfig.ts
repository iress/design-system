import { useState, useEffect } from 'react';
import { ADDON_OPTIONS } from '../constants';
import { registerOkta } from '../helpers/oktaRegister';
import type { AddonConfig } from '../types';
import { validateOktaConfig } from '../validation';
import { addons } from 'storybook/internal/manager-api';

export const useAddonConfigForManager = () => {
  const [addonConfig, setAddonConfig] = useState<AddonConfig | undefined>(
    getAddonConfigForPreview(),
  );

  useEffect(() => {
    const channel = addons.getChannel();

    const handleOptions = (options: AddonConfig | string | undefined) => {
      try {
        const config =
          typeof options === 'string'
            ? (JSON.parse(options) as AddonConfig)
            : options;

        if (config) {
          const validatedConfig = validateOktaConfig(config);
          setAddonConfig(validatedConfig);
          registerOkta(validatedConfig);
        }
      } catch (error) {
        console.error('Invalid Okta configuration:', error);
      }
    };

    channel.on(ADDON_OPTIONS, handleOptions);

    return () => {
      channel.off(ADDON_OPTIONS, handleOptions);
    };
  }, []);

  return addonConfig;
};

export const getAddonConfigForPreview = () => {
  try {
    const fromEnv = process.env.IDS_OKTA as unknown as
      | AddonConfig
      | string
      | undefined;

    const config =
      typeof fromEnv === 'string'
        ? (JSON.parse(fromEnv) as AddonConfig)
        : fromEnv;

    return config ? validateOktaConfig(config) : undefined;
  } catch (error) {
    console.error('Invalid Okta configuration from environment:', error);
    return undefined;
  }
};
