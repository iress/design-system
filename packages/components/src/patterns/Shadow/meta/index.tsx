import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Shadow',
  description:
    'Applies an elevated shadow effect to visually separate content layers.',
  tags: ['shadow', 'microfrontend'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressShadow } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Shadow',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/patterns/shadow.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/patterns/Shadow/Shadow.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=shadow&title=[Shadow]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=shadow,enhancement&title=[Shadow]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-shadow--docs',
  guidelines:
    'https://iress.github.io/design-system/#/patterns/shadow',
} satisfies ComponentMeta;
