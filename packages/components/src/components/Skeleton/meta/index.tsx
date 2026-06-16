import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the skeleton',
    testId: 'skeleton',
  },
];

export default {
  heading: 'Skeleton',
  description: 'Renders placeholder shapes to indicate content is loading.',
  tags: ['loading', 'placeholder', 'feedback'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressSkeleton } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Skeleton',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/skeleton.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Skeleton/Skeleton.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=skeleton&title=[Skeleton]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=skeleton,enhancement&title=[Skeleton]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skeleton--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/skeleton',
} satisfies ComponentMeta;
