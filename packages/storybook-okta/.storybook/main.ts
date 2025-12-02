import { defineMain } from '@storybook/react-vite/node';
// @ts-expect-error This is only for dev purposes, and Storybook main cannot work with the ts for now
import { autoReloadManagerHead } from '../../../shared/storybook-addon-dev';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const config = defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: import.meta.resolve('./local-preset.ts'),
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
