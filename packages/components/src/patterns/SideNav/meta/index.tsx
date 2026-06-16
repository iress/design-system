import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Side Nav',
  description: 'Provides a vertical navigation menu typically used in application sidebars.',
  tags: ['navigation', 'sidebar', 'rail', 'menu'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressSideNav } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/patterns/SideNav',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/patterns/side-nav.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/patterns/SideNav/SideNav.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=side-nav&title=[Side Nav]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=side-nav,enhancement&title=[Side Nav]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-side-nav--docs',
  guidelines:
    'https://iress.github.io/design-system/#/patterns/side-nav',
} satisfies ComponentMeta;
