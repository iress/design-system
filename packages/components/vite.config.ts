/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// TODO: Monitor and fix "Sourcemap for "/virtual:/@storybook/builder-vite/setup-addons.js" points to missing source files"
// https://github.com/storybookjs/storybook/issues/28567

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      exclude: [
        'docs/**/*',
        'src/**/*.test.*',
        'src/**/mocks/**/*',
        'src/**/*.stories.*',
        'src/**/*.docs.*',
        'src/styled-system/**/*',
      ],
    }),
    // TODO: The styled-system types are declaration files, so they refuse to be copied via tsconfig.json
    // Instead we are using a plugin to copy them to the dist folder
    // In future, possibly do this instead: https://panda-css.com/docs/guides/component-library#use-panda-as-external-package
    viteStaticCopy({
      structured: true,
      silent: true,
      targets: [
        {
          src: 'src/styled-system/**/*.d.ts',
          dest: '',
        },
      ],
    }),
  ],
  build: {
    emptyOutDir: true,
    copyPublicDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
      name: 'IDS',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync(['src/**/!(*.test|*.stories).{ts,tsx}'], {
            ignore: [
              'src/**/mock-data/**',
              'src/**/examples/**',
              'src/**/mocks/**',
              'src/**/meta/**',
              'src/vite-env.d.ts',
              'src/styled-system/**/*',
              'theme-preset/**/*',
            ],
            cwd: __dirname,
          })
          .map((file) => [
            // 1. The name of the entry point
            // src/nested/foo.js becomes nested/foo
            relative('src', file.slice(0, file.length - extname(file).length)),
            // 2. The absolute path to the entry file
            // src/nested/foo.ts becomes /project/src/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: '[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
      { find: '@helpers', replacement: resolve(__dirname, 'src/helpers') },
      {
        find: '@theme-preset',
        replacement: resolve(__dirname, 'theme-preset'),
      },
    ],
  },
});
