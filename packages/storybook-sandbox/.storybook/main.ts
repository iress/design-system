import { defineMain } from '@storybook/react-vite/node';
// @ts-expect-error This is only for dev purposes, and Storybook main cannot work with the ts for now
import { autoReloadManagerHead } from '../../../shared/storybook-addon-dev';

const config = defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    import.meta.resolve('./local-preset.ts'),
    '@vueless/storybook-dark-mode',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: '@storybook/react-vite',
  managerHead: autoReloadManagerHead(),
});

export default config;
