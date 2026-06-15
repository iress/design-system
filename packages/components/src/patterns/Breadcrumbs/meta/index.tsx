import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Breadcrumbs',
  description: 'Shows the current location within a navigational hierarchy.',
  tags: ['navigation', 'breadcrumb', 'hierarchy'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressBreadcrumbs } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Breadcrumbs',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/patterns/breadcrumbs.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/patterns/Breadcrumbs/Breadcrumbs.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=breadcrumbs&title=[Breadcrumbs]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=breadcrumbs,enhancement&title=[Breadcrumbs]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-breadcrumbs--docs',
} satisfies ComponentMeta;
