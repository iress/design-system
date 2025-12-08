import { defineConfig } from '@pandacss/dev';
import themePreset from './theme-preset';

export default defineConfig({
  // Whether to use css reset, will probably be enabled in version 6
  preflight: true,

  dependencies: ['../themes/dist/**/*.css', './theme-preset/**/*'],

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [
    './src/styled-system/**/*',
    './node_modules/**/*',
    './src/**/mocks/**/*',
  ],

  presets: [themePreset],

  // The output directory for your css system
  outdir: './src/styled-system',

  // The JSX framework to use
  jsxFramework: 'react',

  // Ensure token strictness so we catch changes in the design token schema
  strictTokens: true,
  strictPropertyValues: true,
});
