import { getMainConfig } from '@iress-oss/ids-storybook-config/main';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const config = getMainConfig({
  absolutePath: dirname(dirname(fileURLToPath(import.meta.url))),
});

config.addons?.push('./local-preset.cjs');

config.refs = {
  components: {
    title: 'React components',
    url: 'http://localhost:6006',
  },
  tokens: {
    title: 'Tokens',
    url: 'http://localhost:6007',
  },
};

export default config;
