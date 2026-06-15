import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the toggle',
    query: (
      <code>
        getByRole('switch', {'{'} name: '...' {'}'})
      </code>
    ),
    testId: 'toggle',
  },
  {
    part: 'label',
    description: 'The toggle label element',
    query: <code>getByText('...')</code>,
    testId: 'toggle__label',
  },
  {
    part: 'button',
    description: 'The toggle switch button',
    testId: 'toggle__button__button',
  },
];

export default {
  heading: 'Toggle',
  description:
    'Renders a switch control for toggling between on and off states.',
  tags: ['form', 'switch', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressToggle } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Toggle',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/toggle.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Toggle/Toggle.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=toggle&title=[Toggle]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=toggle,enhancement&title=[Toggle]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toggle--docs',
} satisfies ComponentMeta;
