import { defineMain } from '@storybook/react-vite/node';
// @ts-ignore -- this is only for development purposes
import { autoReloadManagerHead } from '../../../shared/storybook-addon-dev';

const config = defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [import.meta.resolve('./local-preset.ts'), '@storybook/addon-docs'],
  core: {
    disableTelemetry: true,
  },
  framework: '@storybook/react-vite',
  managerHead: autoReloadManagerHead(),
});

export default config;
