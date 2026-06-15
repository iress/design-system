import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the inline',
    testId: 'inline',
  },
];

export default {
  heading: 'Inline',
  description: 'Lays out children horizontally with consistent spacing between items.',
  tags: ['layout', 'spacing', 'alignment'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressInline } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Inline',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/inline.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Inline/Inline.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=inline&title=[Inline]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=inline,enhancement&title=[Inline]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inline--docs',
} satisfies ComponentMeta;
