import * as componentMapping from '@/main';
import { getPreview } from '@iress-oss/ids-storybook-config/preview';
import type { Preview } from '@storybook/react-vite';
import '../src/styled-system/styles.css';
import componentVersions from './component-versions.json' with { type: 'json' };

const basePreview = getPreview({
  autodocsTemplate: 'component',
  docsProps: {
    componentMapping,
    noStyles: true,
  },
  guidelinesUrl: (title) => {
    const slug = title.toLowerCase().replace(/\s*\/\s*/g, '/');
    return `https://iress.github.io/design-system/#/${slug}`;
  },
  sandboxConfig: {
    dependencies: {
      '@iress-oss/ids-components': 'alpha',
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
      selectedPanel: 'storybook/docs/panel',
      storySort: {
        order: [
          'Introduction',
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
