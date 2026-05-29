import { setUpManager } from '../src/manager.tsx';
import { version } from '../package.json';

setUpManager({
  guidelines: {
    title: 'Guidelines',
    url: 'https://iress.github.io/design-system',
    description:
      'Visit the Iress Design System guidelines site for detailed information on using our components, design principles, and best practices.',
  },
  version,
});
