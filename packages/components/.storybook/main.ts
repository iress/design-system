import { getMainConfig } from '@iress-oss/ids-storybook-config/main';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const config = getMainConfig({
  absolutePath: dirname(dirname(fileURLToPath(import.meta.url))),
  tsConfigWithAlias: 'tsconfig.base.json',
});

config.typescript = {
  reactDocgen: 'react-docgen-typescript',
  reactDocgenTypescriptOptions: {
    tsconfigPath: 'tsconfig.lib.json',
    shouldExtractValuesFromUnion: true,
    savePropValueAsString: true,
    propFilter: (prop) => {
      // Filter out props from node_modules (except specific ones you want)
      return !prop.parent?.fileName.includes('node_modules');
    },
  },
};

export default config;
