import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the placeholder',
    query: <code>getByText('...')</code>,
    testId: 'placeholder',
  },
];

export default {
  heading: 'Placeholder',
  description: 'Renders a visual placeholder to represent future or missing content.',
  tags: ['layout', 'empty-state', 'content'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressPlaceholder } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Placeholder',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/placeholder.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Placeholder/Placeholder.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=placeholder&title=[Placeholder]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=placeholder,enhancement&title=[Placeholder]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-placeholder--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/placeholder',
} satisfies ComponentMeta;
