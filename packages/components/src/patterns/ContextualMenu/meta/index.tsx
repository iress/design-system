import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Contextual Menu',
  description: 'Displays a context-sensitive menu of actions triggered by user interaction.',
  tags: ['menu', 'actions', 'overflow'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressContextualMenu } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/patterns/ContextualMenu',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/patterns/contextual-menu.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/patterns/ContextualMenu/ContextualMenu.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=contextual-menu&title=[Contextual Menu]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=contextual-menu,enhancement&title=[Contextual Menu]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-contextual-menu--docs',
  guidelines:
    'https://iress.github.io/design-system/#/patterns/contextual-menu',
} satisfies ComponentMeta;
