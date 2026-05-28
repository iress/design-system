import * as componentMapping from '@/main';
import { getPreview } from '@iress-oss/ids-storybook-config/preview';
import type { Preview } from '@storybook/react-vite';
import '../src/styled-system/styles.css';
import componentVersions from './component-versions.json' with { type: 'json' };

const basePreview = getPreview({
  docsProps: {
    componentMapping,
    noStyles: true,
  },
  sandboxConfig: {
    dependencies: {
      '@iress-oss/ids-components': 'beta',
      'react-hook-form': 'latest',
    },
  },
  componentVersions,
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
