import { getMainConfig } from '../src/main.ts';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const config = getMainConfig({
  absolutePath: dirname(dirname(fileURLToPath(import.meta.url))),
  tsConfigWithAlias: 'tsconfig.base.json',
});

config.addons?.push('./local-preset.cjs');

export default config;
