import { defineMain } from '@storybook/react-vite/node';
import { autoReloadManagerHead } from '../../../shared/storybook-addon-dev.cjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const config = defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: './local-preset.cjs',
      options: process.env.AUTH
        ? {
            IDS_OKTA: {
              issuer: process.env.OKTA_ISSUER,
              clientId: process.env.OKTA_CLIENT_ID,
            },
          }
        : undefined,
    },
  ],
  core: {
    disableTelemetry: true,
  },
  framework: '@storybook/react-vite',
  managerHead: autoReloadManagerHead(),
});

export default config;
