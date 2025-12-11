import { setUpManager } from '@iress-oss/ids-storybook-config/manager';
import { version as componentsVersion } from '../packages/components/package.json';
import { version as tokensVersion } from '../packages/tokens/package.json';

setUpManager({
  version: (ref) => {
    if (ref === 'components') {
      return componentsVersion;
    }

    if (ref === 'tokens') {
      return tokensVersion;
    }

    return '';
  },
});
