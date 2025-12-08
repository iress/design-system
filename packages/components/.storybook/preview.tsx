import * as componentMapping from '@/main';
import { getPreview } from '@iress-oss/ids-storybook-config/preview';
import type { Preview } from '@storybook/react-vite';
import '../src/styled-system/styles.css';

const basePreview = getPreview({
  docsProps: {
    componentMapping: componentMapping as never,
    noStyles: true,
  },
  sandboxConfig: {
    dependencies: {
      '@iress-oss/ids-components': 'alpha',
    },
  },
});

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
          'Styling props',
          'Resources',
        ],
      },
    },
  },
};

export default preview;
