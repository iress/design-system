/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { Plugin } from 'vite';

// TODO: Monitor and fix "Sourcemap for "/virtual:/@storybook/builder-vite/setup-addons.js" points to missing source files"
// https://github.com/storybookjs/storybook/issues/28567

/**
 * TODO: For some reason Panda CSS @layer declarations are being stripped out during the build process.
 * This plugin preserves the initial @layer declaration by reading it from the source file
 * and prepending it to the built CSS files.
 */
function preservePandaLayerDeclaration() {
  let layerDeclaration = '';

  return {
    name: 'preserve-panda-layer',
    apply: 'build',
    buildStart() {
      // read the original CSS once
      const originalFile = path.resolve(
        __dirname,
        './src/styled-system/styles.css',
      );
      const content = fs.readFileSync(originalFile, 'utf-8');
      const match = /^@layer\s{1,10}[^;\n]{1,200};/m.exec(content);
      layerDeclaration = match ? match[0] : '';
    },
    writeBundle({ dir = './dist' }, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (fileName.endsWith('.css')) {
          const asset = bundle[fileName];
          if ('source' in asset) {
            asset.source = `${layerDeclaration} ${String(asset.source)}`;
            fs.writeFileSync(
              `${dir}/${fileName}`,
              String(asset.source),
              'utf-8',
            );
          }
        }
      }
    },
  } satisfies Plugin;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ['tsconfig.base.json'],
    }),
    react(),
    dts({
      include: 'src/**/*',
      exclude: [
        'docs/**/*',
        'node_modules/**/*',
        'src/**/*.test.*',
        'src/**/mocks/**/*',
        'src/**/*.stories.*',
        'src/**/*.docs.*',
        'src/styled-system/**/*',
        'src/sandbox/**/*',
      ],
      tsconfigPath: './tsconfig.base.json',
    }),
    // TODO: The styled-system types are declaration files, so they refuse to be copied via tsconfig.json
    // Instead we are using a plugin to copy them to the dist folder
    // In future, possibly do this instead: https://panda-css.com/docs/guides/component-library#use-panda-as-external-package
    viteStaticCopy({
      structured: true,
      targets: [
        {
          src: 'src/styled-system/**/*.d.ts',
          dest: '',
        },
      ],
    }),
    preservePandaLayerDeclaration(),
  ],
  build: {
    emptyOutDir: true,
    copyPublicDir: true,
    cssMinify: 'lightningcss',
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
      name: 'IDS',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react-hook-form',
      ],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync(['src/**/!(*.test|*.stories).{ts,tsx}'], {
            ignore: [
              'docs/**/*',
              'src/**/mock-data/**',
              'src/**/examples/**',
              'src/**/mocks/**',
              'src/**/meta/**',
              'src/vite-env.d.ts',
              'src/styled-system/**/*',
              'src/sandbox/**/*',
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
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        customMedia: true,
      },
      cssModules: false,
    },
  },
});
