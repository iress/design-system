import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import treeShakeable from 'rollup-plugin-tree-shakeable';
import react from '@vitejs/plugin-react';
import { peerDependencies } from './package.json';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const externalDeps = Object.keys(peerDependencies || {});

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: [
        'docs/**/*',
        'src/**/*.test.*',
        'src/**/mocks/**/*',
        'src/**/*.stories.*',
        'src/**/*.docs.*',
        'plugins/**/*',
        '*.ts',
        '**/*.template.tsx',
      ],
      tsconfigPath: './tsconfig.base.json',
      entryRoot: resolve(__dirname, 'src'),
    }),
    treeShakeable(),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        main: resolve(__dirname, 'src/main.ts'),
        preview: resolve(__dirname, 'src/preview.tsx'),
        manager: resolve(__dirname, 'src/manager.ts'),
      },
    },
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
        },
      ],
      external: (id) => {
        // Allow CSS imports from peer dependencies to be bundled
        if (id.endsWith('.css')) return false;
        if (externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`)))
          return true;
        return [
          'path',
          'fs',
          'url',
          '@storybook/react',
          '@storybook/react-vite',
          '@storybook/react-vite/node',
          '@storybook/addon-docs/blocks',
          'storybook/internal/components',
          'storybook/components',
          'storybook/preview-api',
          'storybook/internal/preview-api',
          'storybook/internal/core-events',
          'storybook/core-events',
          'storybook/internal/manager-api',
          'storybook/manager-api',
          'storybook/theming',
          '@mdx-js/react',
          'react-jsx-runtime',
          'react-element-to-jsx-string',
        ].some((dep) => id === dep || id.startsWith(`${dep}/`));
      },
    },
  },
});
