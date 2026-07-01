import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the alert',
    query: (
      <>
        <code>getByRole('status')</code> if the alert has a status of "info" or
        "neutral", otherwise <code>getByRole('alert')</code>
      </>
    ),
    testId: 'alert',
  },
  {
    part: 'heading',
    description: 'The alert heading container',
    query: <code>getByRole('heading')</code>,
    testId: 'alert__heading',
  },
  {
    part: 'footer',
    description: 'The alert footer/actions container',
    query: <code>getByText('...')</code>,
    testId: 'alert__footer',
  },
];

export default {
  heading: 'Alert',
  description:
    'Communicates important information inline with page content, such as validation errors, warnings, or status messages.',
  tags: ['feedback', 'notification', 'status'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressAlert } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Alert',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/alert.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Alert/Alert.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=alert&title=[Alert]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=alert,enhancement&title=[Alert]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-alert--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/alert',
  figma: 'https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-31616',
} satisfies ComponentMeta;
