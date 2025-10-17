import { defineMain } from '@storybook/react-vite/node';
import { autoReloadManagerHead } from '../../../shared/storybook-addon-dev.cjs';

const config = defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: './local-preset.cjs',
      options: process.env.AUTH
        ? {
            IDS_OKTA: {
              issuer: 'https://iress.oktapreview.com/oauth2/default',
              clientId: '0oa1qwfgpgc1JdkWF0h8',
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
