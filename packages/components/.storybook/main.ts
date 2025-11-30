import { getMainConfig } from '@iress-oss/ids-storybook-config/main';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const config = getMainConfig({
  absolutePath: dirname(dirname(fileURLToPath(import.meta.url))),
  stories: ['../docs/**/*.@(stories.ts|stories.tsx|mdx)'],
  tsConfigWithAlias: 'tsconfig.base.json',
});

config.addons?.push('./local-preset.cjs');

export default config;
