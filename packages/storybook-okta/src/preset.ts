import type { Options } from 'storybook/internal/types';
import type { UserConfig } from 'vite';
import { ADDON_ID } from './constants';
import type { AddonConfig } from './types';

export const viteFinal = async (
  config: UserConfig,
  options: Options & { [ADDON_ID]: AddonConfig },
) => {
  const addonConfig = options[ADDON_ID];

  return {
    ...config,
    define: {
      ...config.define,
      [`process.env.${ADDON_ID}`]: JSON.stringify(addonConfig),
    },
  };
};
