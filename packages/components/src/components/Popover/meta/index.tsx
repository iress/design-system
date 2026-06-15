import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the popover',
    testId: 'popover',
  },
  {
    part: 'activator',
    description: 'The popover trigger element',
    query: <code>getByRole('button')</code>,
    testId: 'popover__activator',
  },
  {
    part: 'content',
    description: 'The popover content panel',
    testId: 'popover__content',
  },
];

export default {
  heading: 'Popover',
  description: 'Displays floating content anchored to a trigger element.',
  tags: ['overlay', 'interactive', 'content'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressPopover } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Popover',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/popover.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Popover/Popover.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=popover&title=[Popover]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=popover,enhancement&title=[Popover]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs',
} satisfies ComponentMeta;
