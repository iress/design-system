import { getPreview } from '@iress-oss/ids-storybook-config/preview';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.scss';

const basePreview = getPreview({});

const preview: Preview = {
  ...basePreview,
  parameters: {
    ...basePreview.parameters,
    options: {
      ...(basePreview.parameters?.options as Record<string, unknown>),
      selectedPanel: 'controls',
      storySort: {
        order: [
          'Introduction',
          'Get Started',
          'Foundations',
          'Patterns',
          'Components',
          'Resources',
        ],
      },
    },
  },
};

export default preview;
