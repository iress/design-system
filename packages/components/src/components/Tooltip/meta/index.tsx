import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root wrapper element (contains activator and tooltip)',
    testId: 'tooltip',
  },
  {
    part: 'activator',
    description: 'The tooltip trigger element',
    testId: 'tooltip__activator',
  },
  {
    part: 'tooltip text',
    description: 'The floating tooltip content (visible on hover/focus)',
    query: <code>getByRole('tooltip')</code>,
    testId: 'tooltip__tooltip-text',
  },
];

export default {
  heading: 'Tooltip',
  description:
    'Shows additional contextual information on hover or focus of a trigger element.',
  tags: ['overlay', 'feedback', 'help'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressTooltip } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Tooltip',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/tooltip.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Tooltip/Tooltip.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tooltip&title=[Tooltip]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tooltip,enhancement&title=[Tooltip]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tooltip--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/tooltip',
} satisfies ComponentMeta;
