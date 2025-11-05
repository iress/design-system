import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read tsconfig paths manually to avoid JSON import issues
const tsConfigPath = resolve(__dirname, '../tsconfig.base.json');
const tsConfigContent = readFileSync(tsConfigPath, 'utf-8').replace(
  /\/\/[^\r\n]*/g,
  '',
);
//
const tsConfigBase = JSON.parse(tsConfigContent) as {
  compilerOptions?: { paths?: Record<string, string[]> };
};

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
    '@iress-oss/ids-storybook-toggle-stories',
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
  viteFinal(config) {
    if (tsConfigBase.compilerOptions?.paths) {
      config.resolve = config.resolve ?? {};
      config.resolve.alias = {
        ...config.resolve.alias,
        ...Object.fromEntries(
          Object.entries(tsConfigBase.compilerOptions.paths).map(
            ([key, value]) => {
              const pathKey = key.replace('/*', '');
              const pathValue = value[0].replace('/*', '');
              return [pathKey, resolve(__dirname, '../', pathValue)];
            },
          ),
        ),
      };
    }

    return config;
  },
};

export default config;
