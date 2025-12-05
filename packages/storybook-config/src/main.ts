import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

import { dirname, resolve } from 'path';
import { loadEnv, mergeConfig, type Plugin, type UserConfig } from 'vite';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IS_DEV = process.env.NODE_ENV === 'development';

interface MainConfig extends Pick<Partial<StorybookConfig>, 'stories'> {
  /**
   * The path to the folder using Storybook.
   * This is usually the root of the project, and the folder above .storybook.
   * This would most commonly be passed as:
   * absolutePath: dirname(dirname(fileURLToPath(import.meta.url)));
   */
  absolutePath: string;

  /**
   * Proxy configuration for children, only works in development mode.
   * The key is the path to proxy under, and the value is the URL to proxy to.
   * For example, to proxy /components/ to http://localhost:6006, use:
   * {
   *   '/components/': 'http://localhost:6006'
   * }
   */
  proxyChildren?: Record<string, string>;

  /**
   * An array of plugin names to remove from the default configuration.
   *
   * We remove some plugins that are known to cause issues with Storybook
   * - tree-shakeable: Causes issues with Storybook's module resolution when built (the issue around .addMethod does not exist).
   *
   * @default ['tree-shakeable']
   */
  removeVitePluginNames?: string[];

  /**
   * The path to the tsconfig file to use for alias resolution.
   * If not provided, no alias resolution will be performed.
   */
  tsConfigWithAlias?: string;
}

/**
 * Function to get the main Storybook configuration.
 * Used to centralise the configuration for all Storybook instances in multiple repositories.
 */
export const getMainConfig = ({
  absolutePath,
  proxyChildren,
  removeVitePluginNames = ['tree-shakeable'],
  stories,
  tsConfigWithAlias,
}: MainConfig): StorybookConfig => {
  const config: StorybookConfig = {
    addons: [
      '@iress-oss/ids-storybook-okta',
      '@storybook/addon-links',
      '@storybook/addon-a11y',
      '@vueless/storybook-dark-mode',
      '@chromatic-com/storybook',
      '@iress-oss/ids-storybook-toggle-stories',
      '@iress-oss/ids-storybook-version-badge',
      // 'storybook-addon-tag-badges', TODO: Does not work in Storybook 10, as it does not work in composition mode
      // '@storybook/addon-interactions', TODO: Enable when ready
      // 'storybook-addon-rtl', TODO: Create our own addon that works with Storybook 10
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

    staticDirs: [resolve(__dirname, '../public')],

    stories: stories ?? [
      '../docs/**/*.@(stories.ts|stories.tsx|mdx)',
      '../src/**/*.@(stories.ts|stories.tsx|mdx)',
    ],

    viteFinal(config) {
      const modifiedConfig: UserConfig = {
        // This allows us to change the path of Storybook
        base: process.env.BASE_PATH ?? config.base,

        optimizeDeps: {
          exclude: ['./node_modules/.cache/storybook'],
        },
      };

      config.plugins = config.plugins?.filter((plugin) => {
        const pluginName = (plugin as Plugin).name;
        return !removeVitePluginNames.includes(pluginName);
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
          modifiedConfig.resolve = modifiedConfig.resolve ?? {};
          modifiedConfig.resolve.alias = {
            ...modifiedConfig.resolve.alias,
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

      // Check if regs contains localhosts with folder paths and add proxies for them
      // check if refs is not a promise

      if (proxyChildren && IS_DEV) {
        Object.entries(proxyChildren).forEach(([path, location]) => {
          modifiedConfig.server = modifiedConfig.server ?? {};
          modifiedConfig.server.proxy = {
            ...modifiedConfig.server.proxy,
            [path]: {
              target: location,
              changeOrigin: true,
              rewrite: (path) => path.replace(path, '/'),
            },
          };
        });
      }

      // Merge custom configuration into the default config
      return mergeConfig(config, modifiedConfig);
    },
  };

  config.managerHead = (head) => {
    const env = loadEnv('', process.cwd(), 'BASE_PATH');

    return [
      head,
      `<script>
  function broadcastHash() {
    const hash = window.location.hash;
    const frames = document.querySelectorAll('iframe');
    frames.forEach((f) => {
      try {
        f.contentWindow?.postMessage({ type: 'UPDATE_HASH', hash }, '*');
      } catch (err) {
        console.debug('[Storybook Host] Skipped frame broadcast:', err);
      }
    });
  }

  window.addEventListener('hashchange', broadcastHash);
  window.addEventListener('load', broadcastHash);
</script>`,
      env.BASE_PATH ? `<base href="${env.BASE_PATH}">` : false,
    ]
      .filter(Boolean)
      .join('\n');
  };

  config.previewHead = (head) => {
    const env = loadEnv('', process.cwd(), 'BASE_PATH');

    return [head, env.BASE_PATH ? `<base href="${env.BASE_PATH}">` : false]
      .filter(Boolean)
      .join('\n');
  };

  return config;
};
