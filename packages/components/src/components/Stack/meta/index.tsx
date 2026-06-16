import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the stack',
    testId: 'stack',
  },
];

export default {
  heading: 'Stack',
  description: 'Lays out children vertically with consistent spacing between items.',
  tags: ['layout', 'spacing', 'container'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressStack } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Stack',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/stack.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Stack/Stack.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=stack&title=[Stack]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=stack,enhancement&title=[Stack]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-stack--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/stack',
} satisfies ComponentMeta;
