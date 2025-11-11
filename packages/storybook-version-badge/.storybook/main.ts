import { defineMain } from '@storybook/react-vite/node';
import { autoReloadManagerHead } from '../../../shared/storybook-addon-dev';

const config = defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['./local-preset.cjs'],
  core: {
    disableTelemetry: true,
  },
  framework: '@storybook/react-vite',
  managerHead: autoReloadManagerHead(),
});

export default config;
