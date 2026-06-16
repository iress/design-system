import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Loading',
  description: 'Displays a loading state to indicate content is being fetched or processed.',
  tags: ['loading', 'skeleton', 'progress'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressLoading } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Loading',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/patterns/loading.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/patterns/Loading/Loading.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=loading&title=[Loading]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=loading,enhancement&title=[Loading]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs',
  guidelines:
    'https://iress.github.io/design-system/#/patterns/loading',
} satisfies ComponentMeta;
