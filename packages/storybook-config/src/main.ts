import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

import { resolve } from 'path';
import { mergeConfig } from 'vite';
import { readFileSync } from 'fs';

interface MainConfig extends Pick<Partial<StorybookConfig>, 'stories'> {
  /**
   * The path to the folder using Storybook.
   * This is usually the root of the project, and the folder above .storybook.
   * This would most commonly be passed as:
   * absolutePath: dirname(dirname(fileURLToPath(import.meta.url)));
   */
  absolutePath: string;

  /**
   * The path to the tsconfig file to use for alias resolution.
   * If not provided, no alias resolution will be performed.
   */
  tsConfigWithAlias?: string;
}

export const getMainConfig = ({
  absolutePath,
  stories,
  tsConfigWithAlias,
}: MainConfig): StorybookConfig => ({
  addons: [
    '@iress-oss/ids-storybook-okta',
    '@storybook/addon-links',
    '@iress-oss/ids-storybook-sandbox',
    '@storybook/addon-a11y',
    '@vueless/storybook-dark-mode',
    '@chromatic-com/storybook',
    '@iress-oss/ids-storybook-toggle-stories',
    '@iress-oss/ids-storybook-version-badge',
    'storybook-addon-tag-badges',
    // '@storybook/addon-interactions', TODO: Enable when ready
    // 'storybook-addon-rtl', TODO: Create our own addon that works with Storybook 9
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
  ],

  core: {
    disableTelemetry: true,
  },

  framework: '@storybook/react-vite',

  staticDirs: ['../public'],

  stories: stories ?? [
    '../docs/**/*.@(stories.ts|stories.tsx|mdx)',
    '../src/**/*.@(stories.ts|stories.tsx|mdx)',
  ],

  viteFinal(config) {
    // Merge custom configuration into the default config
    const mergedConfig = mergeConfig(config, {
      // This allows us to change the path of Storybook
      base: process.env.BASE_PATH ?? config.base,

      optimizeDeps: {
        include: ['react-live'],
        exclude: ['./node_modules/.cache/storybook'],
      },
    });

    if (tsConfigWithAlias) {
      const tsConfigContent = readFileSync(
        resolve(absolutePath, tsConfigWithAlias),
        'utf-8',
      ).replace(/\/\/[^\r\n]*/g, '');
      const tsConfigBase = JSON.parse(tsConfigContent) as {
        compilerOptions?: { paths?: Record<string, string[]> };
      };

      if (tsConfigBase.compilerOptions?.paths) {
        config.resolve = config.resolve ?? {};
        config.resolve.alias = {
          ...config.resolve.alias,
          ...Object.fromEntries(
            Object.entries(tsConfigBase.compilerOptions.paths).map(
              ([key, value]) => {
                const pathKey = key.replace('/*', '');
                const pathValue = value[0].replace('/*', '');
                return [pathKey, resolve(absolutePath, pathValue)];
              },
            ),
          ),
        };
      }
    }

    return mergedConfig;
  },
});
