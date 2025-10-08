import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import treeShakeable from 'rollup-plugin-tree-shakeable';
import { peerDependencies } from './package.json';

export default defineConfig({
  plugins: [
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
        'src/*.tsx',
        '*.ts',
      ],
      tsconfigPath: './tsconfig.base.json',
    }),
    treeShakeable(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: 'IressTokens',
    },
    rollupOptions: {
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync('src/**/!(*.test|*.stories).{ts,tsx}', {
            ignore: [
              'src/**/mock-data/**',
              'src/**/examples/**',
              'src/**/mocks/**',
              'src/*.tsx',
              'src/vite-env.d.ts',
            ],
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
      external: Object.keys(peerDependencies),
    },
  },
});
