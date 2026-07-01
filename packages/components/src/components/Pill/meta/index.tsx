import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the pill',
    query: <code>getByText('...')</code>,
    testId: 'pill',
  },
];

export default {
  heading: 'Pill',
  description: 'Displays a small, rounded badge for categorisation or status indication.',
  tags: ['data-display', 'status', 'indicator', 'badge'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressPill } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Pill',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/pill.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Pill/Pill.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=pill&title=[Pill]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=pill,enhancement&title=[Pill]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/pill',
  figma: 'https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-29810',
} satisfies ComponentMeta;
