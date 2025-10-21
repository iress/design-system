import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@iress-oss/ids-storybook-version-badge',
    './local-preset.cjs',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: '@storybook/react-vite',
  stories: [
    '../docs/**/*.@(stories.ts|stories.tsx|mdx)',
    '../src/**/*.@(stories.ts|stories.tsx|mdx)',
  ],
};

export default config;
