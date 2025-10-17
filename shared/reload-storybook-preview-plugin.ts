import type { PluginOption, ViteDevServer } from 'vite';

/**
 * Vite plugin to watch for changes in the dist/preview.js file and trigger a full reload of Storybook.
 * This is useful for Storybook addons that need to reload when their source files change.
 */
const plugin: PluginOption = {
  name: 'reload-storybook-preview',
  configureServer: (server: ViteDevServer) => {
    // Watch for changes in dist files and trigger a full reload
    console.log('📦 Plugin: reload-storybook-preview plugin initialised');

    const chokidar = server.watcher;
    chokidar.add('./dist/preview.js');
    chokidar.on('change', (path: string) => {
      if (path.includes('/src/') || path.includes('/.storybook/')) {
        console.log('📄 Addon dist file changed:', path);
        setTimeout(() => server.restart(), 1000);
      }
    });
  },
};

export default plugin;
