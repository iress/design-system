import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the text',
    query: <code>getByText('...')</code>,
    testId: 'text',
  },
];

export default {
  heading: 'Text',
  description: 'Renders styled text with consistent typography from the design system.',
  tags: ['typography', 'content', 'display'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressText } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Text',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/text.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Text/Text.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=text&title=[Text]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=text,enhancement&title=[Text]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-text--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/text',
} satisfies ComponentMeta;
