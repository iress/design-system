import { defineMain } from '@storybook/react-vite/node';
// @ts-ignore -- this is only for development purposes
import { autoReloadManagerHead } from '../../../shared/storybook-addon-dev';

const config = defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [import.meta.resolve('./local-preset.ts')],
  core: {
    disableTelemetry: true,
  },
  framework: '@storybook/react-vite',
  managerHead: autoReloadManagerHead(
    7000,
    `<script>
      if (!window.process) window.process = {};
      if (!window.process.env) window.process.env = {};
      process.env.IDS_ToggleStories_DISABLE_ADDON = '${process.env.DISABLE_ADDON}';
    </script>`,
  ),
});

export default config;
