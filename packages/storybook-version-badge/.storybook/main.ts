import { defineMain } from '@storybook/react-vite/node';
// @ts-expect-error This is only for dev purposes, and Storybook main cannot work with the ts for now
import { autoReloadManagerHead } from '../../../shared/storybook-addon-dev.cjs';

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
