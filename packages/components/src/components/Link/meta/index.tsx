import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the link',
    query: (
      <>
        <code>getByRole('link', {'{'} name: '...' {'}'})</code> when an href is
        provided, otherwise{' '}
        <code>getByRole('button', {'{'} name: '...' {'}'})</code>
      </>
    ),
    testId: 'link',
  },
];

export default {
  heading: 'Link',
  description: 'Renders a navigational anchor styled consistently with the design system.',
  tags: ['navigation', 'text', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressLink } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Link',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/link.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Link/Link.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=link&title=[Link]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=link,enhancement&title=[Link]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-link--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/link',
} satisfies ComponentMeta;
