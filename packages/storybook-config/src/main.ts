import type { StorybookConfig } from '@storybook/react-vite';

import { dirname, resolve } from 'path';
import { loadEnv, mergeConfig, type Plugin, type UserConfig } from 'vite';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import type { Indexer, IndexerOptions } from 'storybook/internal/types';

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

  /**
   * Optional function to further modify the Vite configuration.
   * @param config - The current Vite configuration.
   * @returns The modified Vite configuration.
   */
  viteFinal?: (config: UserConfig) => UserConfig;
}

/** Wraps an indexer's createIndex to inject 'autodocs' tag into all entries. */
function addAutoDocsTag(indexer: Indexer) {
  return async (fileName: string, options: IndexerOptions) => {
    const entries = await indexer.createIndex(fileName, options);
    return entries.map((entry) => ({
      ...entry,
      tags: [...(entry.tags ?? []), 'autodocs'],
    }));
  };
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
  viteFinal,
}: MainConfig): StorybookConfig => {
  const config: StorybookConfig = {
    addons: [
      '@iress-oss/ids-storybook-okta',
      '@storybook/addon-links',
      '@storybook/addon-a11y',
      '@vueless/storybook-dark-mode',
      '@chromatic-com/storybook',
      '@iress-oss/ids-storybook-sandbox',
      '@iress-oss/ids-storybook-toggle-stories',
      '@iress-oss/ids-storybook-version-badge',
      '@storybook/addon-docs',
      // 'storybook-addon-tag-badges', TODO: Does not work in Storybook 10, as it does not work in composition mode
      // '@storybook/addon-interactions', TODO: Enable when ready
      // 'storybook-addon-rtl', TODO: Create our own addon that works with Storybook 10
    ],

    core: {
      disableTelemetry: true,
    },

    docs: {
      defaultName: 'API / Examples',
    },

    framework: '@storybook/react-vite',

    staticDirs: [resolve(__dirname, '../public')],

    stories: stories ?? ['../src/**/*.stories.@(ts|tsx)'],

    // Inject 'autodocs' tag into all stories at index time so docs pages are generated
    experimental_indexers: async (existingIndexers) => {
      return Promise.resolve(
        existingIndexers?.map((indexer) => ({
          ...indexer,
          createIndex: addAutoDocsTag(indexer),
        })),
      );
    },

    viteFinal(config) {
      let modifiedConfig: UserConfig = {
        // This allows us to change the path of Storybook
        base: process.env.BASE_PATH ?? config.base,

        optimizeDeps: {
          exclude: ['./node_modules/.cache/storybook'],
        },

        // Enable CORS for Storybook composition mode
        server: {
          cors: true,
        },
      };

      config.plugins = config.plugins?.filter((plugin) => {
        const pluginName = (plugin as Plugin).name;
        return !removeVitePluginNames.includes(pluginName);
      });

      // Fix: Storybook's external-globals-plugin transforms bare side-effect imports
      // (e.g. `import "storybook/internal/core-events"`) into const declarations
      // without an initializer (`const __STORYBOOK_MODULE_CORE_EVENTS__;`). This
      // is valid JavaScript for esbuild (Vite 7) but rolldown (Vite 8) rejects it
      // with a PARSE_ERROR. We add a post-transform plugin to add a `= undefined`
      // initializer so the declaration is valid while preserving the semantics
      // (the variable is unused since no named symbols were imported from the module).
      config.plugins = [
        ...(config.plugins ?? []),
        {
          name: 'fix-storybook-uninitialised-globals',
          enforce: 'post',
          transform(code) {
            if (!code.includes('__STORYBOOK_MODULE_')) return null;
            const fixed = code.replace(
              /\bconst (__STORYBOOK_MODULE_[A-Z0-9_]+__);\n?/g,
              'const $1 = undefined;\n',
            );
            return fixed !== code ? { code: fixed, map: null } : null;
          },
        } satisfies Plugin,
      ];

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
        modifiedConfig.server = modifiedConfig.server ?? {};
        modifiedConfig.server.proxy = modifiedConfig.server.proxy ?? {};

        Object.entries(proxyChildren).forEach(([path, location]) => {
          modifiedConfig.server!.proxy![path] = {
            target: location,
            changeOrigin: true,
            rewrite: (path) => path.replace(path, '/'),
          };
        });
      }

      if (viteFinal) {
        modifiedConfig = viteFinal(modifiedConfig);
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
      `<script>
      window.addEventListener('message', function passTheme(event) {
        if (!event.data) {
          return;
        }

        const { type, ...data } = event.data;

        if (type !== 'PASS_THEME') {
          return;
        }

        const frames = document.querySelectorAll('iframe');
        frames.forEach((f) => {
          try {
            f.contentWindow?.postMessage({ type: 'LOAD_THEME', ...data }, '*');
          } catch (err) {
            console.debug('[Storybook Host] Skipped frame broadcast:', err);
          }
        });
      });
    </script>`,
      env.BASE_PATH ? `<base href="${env.BASE_PATH}">` : false,
    ]
      .filter(Boolean)
      .join('\n');
  };

  config.previewHead = (head) => {
    const env = loadEnv('', process.cwd(), 'BASE_PATH');

    return [
      head,
      `<script>
      window.addEventListener('message', function loadTheme(event) {
        if (!event.data || event.data.type !== 'LOAD_THEME') {
          return;
        }

        const { name, href, css, fonts = [] } = event.data;

        let existingHref = document.getElementById('storybook-config-theme-href');
        let existingCss = document.getElementById('storybook-config-theme-css');
        const existingTheme = document.documentElement.getAttribute('data-theme');

        if (existingTheme) {
          document.documentElement.classList.remove(existingTheme);
        }

        if (!name) {
          existingHref?.remove();
          existingCss?.remove();
          return;
        }

        if (href) {
          if (!existingHref) {
            existingHref = document.createElement('link');
            existingHref.rel = 'stylesheet';
            existingHref.id = 'storybook-config-theme-href';
            document.head.appendChild(existingHref);
          }

          existingHref.href = href;
        }

        if (css) {
          if (!existingCss) {
            existingCss = document.createElement('style');
            existingCss.id = 'storybook-config-theme-css';
            document.head.appendChild(existingCss);
          }

          existingCss.innerHTML = css;
        }

        fonts?.forEach((font) => {
          const existingFont = document.querySelector(\`link[href="\${font}"]\`);

          if (existingFont) {
            return;
          }
            
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = font;
          document.head.appendChild(link);
        });

        document.documentElement.setAttribute('data-theme', name);
        document.documentElement.classList.add(name);
      });
    </script>`,
      env.BASE_PATH ? `<base href="${env.BASE_PATH}">` : false,
    ]
      .filter(Boolean)
      .join('\n');
  };

  return config;
};
