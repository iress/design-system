import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the skip link',
    query: <code>getByRole('link', {'{'} name: 'Skip to content' {'}'})</code>,
    testId: 'skip-link',
  },
];

export default {
  heading: 'SkipLink',
  description: 'Provides a keyboard-accessible link to skip to the main content area.',
  tags: ['accessibility', 'navigation', 'link'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressSkipLink } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/SkipLink',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/skip-link.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/SkipLink/SkipLink.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=skip-link&title=[SkipLink]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=skip-link,enhancement&title=[SkipLink]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skip-link--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/skip-link',
} satisfies ComponentMeta;
