import { setUpManager } from '@iress-oss/ids-storybook-config/manager';
import { version } from '../package.json';

setUpManager({
  version,
  guidelines: {
    url: 'https://iress.github.io/design-system/',
    title: 'Guidelines',
    description:
      'Visit the Iress Design System guidelines site for detailed information on using our components, design principles, and best practices.',
  },
});
