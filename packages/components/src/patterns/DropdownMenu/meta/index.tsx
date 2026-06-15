import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Filter',
  description: 'Presents a list of actions or options revealed by a trigger button.',
  tags: ['data-display', 'filtering', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressDropdownMenu } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/patterns/DropdownMenu',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/patterns/dropdown-menu.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/patterns/DropdownMenu/DropdownMenu.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=dropdown-menu&title=[Filter]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=dropdown-menu,enhancement&title=[Filter]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-dropdown-menu--docs',
} satisfies ComponentMeta;
