import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the container',
    testId: 'container',
  },
];

export default {
  heading: 'Container',
  description: 'Provides a max-width wrapper to constrain content within a page layout.',
  tags: ['layout', 'wrapper', 'responsive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressContainer } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Container',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/container.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Container/Container.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=container&title=[Container]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=container,enhancement&title=[Container]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-container--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/container',
} satisfies ComponentMeta;
