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
      '@storybook/addon-docs',
      '@storybook/addon-a11y',
      '@vueless/storybook-dark-mode',
      '@chromatic-com/storybook',
      '@iress-oss/ids-storybook-sandbox',
      '@iress-oss/ids-storybook-toggle-stories',
      '@iress-oss/ids-storybook-version-badge',
      // 'storybook-addon-tag-badges', TODO: Does not work in Storybook 10, as it does not work in composition mode
      // '@storybook/addon-interactions', TODO: Enable when ready
      // 'storybook-addon-rtl', TODO: Create our own addon that works with Storybook 10
    ],

    core: {
      disableTelemetry: true,
      disableWhatsNewNotifications: true,
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
      `<style>
        .docblock-source {
          position: relative;
        }

        .docblock-source > div:last-child {
          position: fixed;
          bottom: 0;
          right: 0;
          z-index: 100;
        }
          
        .docblock-source > div:last-child button {
          padding: 6px 12px !important;
          font-size: 13px !important;
        }
      </style>`,
      `<script>
      // Clear persisted layout from session storage when embedded so that
      // the panel=0 URL param is respected on initial load.
      if (new URLSearchParams(window.location.search).has('embedded')) {
        try {
          Object.keys(sessionStorage).forEach(function(k) {
            if (k.includes('storybook') && k.includes('layout')) {
              sessionStorage.removeItem(k);
            }
          });
        } catch(e) {}
      }
</script>`,
      `<script>
  function broadcastHash() {
    const hash = window.location.hash;
    const frames = document.querySelectorAll('iframe');
    frames.forEach((f) => {
      try {
        f.contentWindow?.postMessage({ type: 'UPDATE_HASH', hash }, '*');
      } catch (err) {
        console.log('[Storybook Host] Skipped frame broadcast:', err);
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
            console.log('[Storybook Host] Skipped frame broadcast:', err);
          }
        });
      });
    </script>`,
      `<script>
      const _queryForClosedPanel = '[aria-label="Show addon panel"], [aria-label="Exit full screen"]';
      const _queryToOpenPanel = _queryForClosedPanel;
      var _queryToClosePanel = '[aria-label="Hide addon panel"]';
      const embedded = new URLSearchParams(window.location.search).has('embedded');

      if (embedded) {
        var _queryToClosePanel = '[aria-label="Hide addon panel"], [aria-label="Enter full screen"]';
      }

      window.addEventListener('message', function requestSize(event) {
        if (!event.data) return;
        var type = event.data.type;

        if (type !== 'REQUEST_SIZE') {
          return;
        }

        // Relay resize request down to preview iframe
        var frames = document.querySelectorAll('iframe');
        frames.forEach(function(f) {
          try { f.contentWindow.postMessage(event.data, '*'); } catch(e) {}
        });
      });
      </script>`,
      `<script>
      function _waitFor(sel, cb, t) {
        var el = document.querySelector(sel);
        if (el) return cb(el);
        var o = new MutationObserver(function() {
          el = document.querySelector(sel);
          if (el) { o.disconnect(); cb(el); }
        });
        o.observe(document.body, { childList: true, subtree: true });
        if (t) setTimeout(function() { o.disconnect(); }, t);
      }

      window.addEventListener('message', function embedStorybook(event) {
        if (!event.data) return;
        const { type, ...params } = event.data;

        if (type !== 'EMBED_STORYBOOK') {
          return;
        }

        window.postMessage({ type: 'REQUEST_SIZE' }, '*');
        window.postMessage({ type: 'REQUEST_PANEL' }, '*');

        if (params.panel) {
          // If panel is open, select the specified panel tab.
          _waitFor(_queryToClosePanel, function(hidePanel) { 
            console.log('[Storybook Host] Panel is open', hidePanel);

            _waitFor('[role="tab"][data-key="' + params.panel + '"]', function(panelEl) { 
              panelEl.click(); 
              console.log('[Storybook Host] Selected panel:', params.panel);

              if (params.showPanel === false) {
                hidePanel.click();
                console.log('[Storybook Host] Closed panel as per showPanel=false');
              }
            }, 5000);
          }, 5000);
          
          // Open panel and then select a specific addon panel tab
          _waitFor(_queryToOpenPanel, function(addonPanel) {
            if (params.showPanel !== false) {
              addonPanel.click();
              console.log('[Storybook Host] Opened addon panel');
            } 

            _waitFor('[role="tab"][data-key="' + params.panel + '"]', function(panelEl) { 
              panelEl.click(); 
              console.log('[Storybook Host] Selected panel:', params.panel);
            }, 5000);
          }, 5000);
        } else if (params.showPanel === true) {
          // Just open the addon panel without selecting a tab
          _waitFor(_queryToOpenPanel, function(addonPanel) { 
            addonPanel.click();
            console.log('[Storybook Host] Opened addon panel (showPanel)');
          }, 5000);
        } else if (params.showPanel === false) {
          // Just close the addon panel without selecting a tab
          _waitFor(_queryToClosePanel, function(toggle) { 
            toggle.click();
            console.log('[Storybook Host] Closed addon panel (showPanel)');
          }, 5000);
        }

        if (params.allowedPanels?.length > 0) {
          var allowedPanels = params.allowedPanels;
          var newOpenPanel = params.panel;

          _waitFor('[role="tablist"][aria-label="Available addons"]', function(tabList) { 
            tabList.querySelectorAll('[role="tab"]').forEach(function(tab) {
              var key = tab.getAttribute('data-key');

              if (allowedPanels.includes(key)) {
                console.log('[Storybook Host] Keeping panel:', key);
                if (!newOpenPanel) {
                  tab.click();
                  newOpenPanel = key;
                  console.log('[Storybook Host] Clicking panel:', key);
                }
              } else {
                tab.style.display = 'none';
                  console.log('[Storybook Host] Hiding panel:', key);
              }
            });
          }, 5000);
        }

        // Hide elements by CSS selector
        if (params.selectorsToHide) {
          params.selectorsToHide.forEach(function(sel) {
            _waitFor(sel, function() { 
              document.querySelectorAll(sel).forEach(function(el) {
                el.style.display = 'none';
                console.log('[Storybook Host] Hiding:', sel);
              });
            }, 5000);
          });
        }
      });
    </script>`,
      `<script>
      document.addEventListener('click', function(e) {
        const target = e.target;

        if (!target) return;

        // Send that panel is open when clicking the "Exit full screen" button in the addon panel
        if (target.matches(_queryToOpenPanel) || target.closest(_queryToOpenPanel)) {
          window.parent.postMessage({ 
            type: 'RELAY_PANEL', 
            flag: true, 
            height: document.getElementById('storybook-panel-root').offsetHeight,
          }, '*');
          console.log('[Storybook Host] Opening panel');
        }

        // Send that panel is closed when clicking the "Enter full screen" button in the addon panel
        if (target.matches(_queryToClosePanel) || target.closest(_queryToClosePanel)) {
          window.parent.postMessage({ 
            type: 'RELAY_PANEL', 
            flag: false, 
            height: document.getElementById('storybook-panel-root').offsetHeight,
          }, '*');
          console.log('[Storybook Host] Closing panel');
        }
      });

      window.addEventListener('load', function(event) {
        setTimeout(function() {
          window.parent.postMessage({ 
            type: 'RELAY_PANEL', 
            flag: document.querySelector(_queryForClosedPanel) === null, 
            height: document.getElementById('storybook-panel-root').offsetHeight,
          }, '*');
          console.log('[Storybook Host] Loading initial panel state');
        }, 500);
      });

      window.addEventListener('message', function(event) {
        if (!event.data) return;

        if (event.data.type !== 'REQUEST_PANEL') {
          return;
        }

        setTimeout(function() {
          window.parent.postMessage({ 
            type: 'RELAY_PANEL', 
            flag: document.querySelector(_queryForClosedPanel) === null,
            height: document.getElementById('storybook-panel-root').offsetHeight,
          }, '*');
        }, 500);
        console.log('[Storybook Host] Loading panel state by request');
      }); 
    </script>`,
      `<script>
      var _managedSizeInit = false;
      function _getManagerContentHeight(previewH = 300) {
        // The preview iframe inside the manager reports its content height via RELAY_SIZE.
        // We need to add the manager chrome (toolbar + panel) on top.
        var toolbar = document.querySelector('[role="toolbar"]');
        var panel = document.getElementById('storybook-panel-root');
        var panelClosed = document.querySelector(_queryForClosedPanel) !== null;
        
        var toolbarH = toolbar ? toolbar.offsetHeight : 0;
        var panelH = panel ? panel.offsetHeight : 0;
        
        console.log('[Storybook Host] Calculated content height', { toolbarH, panelH, previewH, panelClosed });

        return toolbarH + previewH + panelH;
      }

      window.addEventListener('message', function(event) {
        if (!event.data) return;

        if (event.data.type !== 'RELAY_SIZE' || window.parent === window) {
          return;
        }

        // Use the preview's reported height + manager chrome
        setTimeout(function () {
          var fullHeight = _getManagerContentHeight(event.data.height);
          window.parent.postMessage({ type: 'RELAY_SIZE', height: fullHeight }, '*');
          console.log('[Storybook Host] Relaying size to parent:', fullHeight);
          _managedSizeInit = true;
        }, _managedSizeInit ? 0 : 500);
      }); 
      </script>`,
      `<script>
      window.addEventListener('message', function(event) {
        if (!event.data) return;

        if (event.data.type !== 'OPEN_SANDBOX') {
          return;
        }

        document.querySelector('[title="Open in CodeSandbox"]')?.click();
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
