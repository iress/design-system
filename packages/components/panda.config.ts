import { defineConfig } from '@pandacss/dev';
import themePreset from '@iress-oss/ids-theme-preset';
import {
  codegenPrepareHook,
  cssgenDoneHook,
} from '@iress-oss/ids-theme-preset/hooks';

export default defineConfig({
  // Whether to use css reset, will probably be enabled in version 6
  preflight: true,

  dependencies: ['../themes/dist/**/*.css'],

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [
    './src/styled-system/**/*',
    './node_modules/**/*',
    './src/**/mocks/**/*',
    './src/**/*.test.{ts,tsx}',
    './src/**/*.stories.{ts,tsx}',
  ],

  presets: [themePreset],

  // The output directory for your css system
  outdir: './src/styled-system',

  // The JSX framework to use
  jsxFramework: 'react',

  // Minify generated CSS (reduces bundle size for consumers using IressShadow)
  minify: true,

  // Ensure token strictness so we catch changes in the design token schema
  strictTokens: true,
  strictPropertyValues: true,

  hooks: {
    'codegen:prepare': ({ artifacts }) => codegenPrepareHook(artifacts),
    'cssgen:done': ({ artifact, content }) => cssgenDoneHook(artifact, content),
  },
});
