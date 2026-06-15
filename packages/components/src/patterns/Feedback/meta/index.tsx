import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Feedback',
  description: 'Displays transient feedback messages to communicate the result of an action.',
  tags: ['feedback', 'alert', 'toast', 'modal', 'notification'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressFeedback } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Feedback',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/patterns/feedback.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/patterns/Feedback/Feedback.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=feedback&title=[Feedback]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=feedback,enhancement&title=[Feedback]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-feedback--docs',
} satisfies ComponentMeta;
