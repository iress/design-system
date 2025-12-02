import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import treeShakeable from 'rollup-plugin-tree-shakeable';
import react from '@vitejs/plugin-react';
import { peerDependencies } from './package.json';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
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
      ],
      tsconfigPath: './tsconfig.base.json',
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
      external: [
        ...Object.keys(peerDependencies || {}),
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
      ],
    },
  },
});
