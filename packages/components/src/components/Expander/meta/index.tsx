import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the expander',
    testId: 'expander',
  },
  {
    part: 'activator',
    description: 'The expand/collapse trigger button',
    query: (
      <code>
        getByRole('button', {'{'} name: '...' {'}'})
      </code>
    ),
    testId: 'expander__activator',
  },
  {
    part: 'container',
    description: 'The collapsible content container (visible when expanded)',
    testId: 'expander__container',
  },
];

export default {
  heading: 'Expander',
  description:
    'Reveals or hides a section of content with an expand/collapse toggle.',
  tags: ['layout', 'collapsible', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressExpander } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Expander',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/expander.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Expander/Expander.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=expander&title=[Expander]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=expander,enhancement&title=[Expander]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-expander--docs',
} satisfies ComponentMeta;
