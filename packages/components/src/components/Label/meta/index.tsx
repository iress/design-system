import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the label',
    query: <code>getByText('...')</code>,
    testId: 'label',
  },
  {
    part: 'text',
    description: 'The label text content',
    testId: 'label__text',
  },
];

export default {
  heading: 'Label',
  description: 'Provides an accessible text label for a form control.',
  tags: ['form', 'text', 'accessibility'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressLabel } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Label',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/label.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Label/Label.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=label&title=[Label]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=label,enhancement&title=[Label]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-label--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/label',
} satisfies ComponentMeta;
