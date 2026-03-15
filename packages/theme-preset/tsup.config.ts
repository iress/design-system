import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    config: 'src/createMinimalConfig.ts',
    constants: 'src/constants.ts',
    'hooks/index': 'src/hooks/index.ts',
    vite: 'src/vite.ts',
  },
  format: ['esm'],
  dts: true,
  tsconfig: 'tsconfig.lib.json',
  clean: true,
  outDir: 'dist',
  external: ['@pandacss/dev', '@pandacss/types', 'vite'],
});
