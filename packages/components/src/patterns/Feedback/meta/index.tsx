import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Feedback',
  description: 'Displays transient feedback messages to communicate the result of an action.',
  tags: ['feedback', 'alert', 'toast', 'modal', 'notification'],
  Thumbnail: lazy(() => import('./Thumbnail')),
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
  guidelines:
    'https://iress.github.io/design-system/#/patterns/feedback',
} satisfies ComponentMeta;
