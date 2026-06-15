import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the button group',
    query: <code>getByRole('group', {'{'} name: '...' {'}'})</code>,
    testId: 'buttongroup',
  },
  {
    part: 'label',
    description: 'The group label element',
    query: <code>getByText('...')</code>,
    testId: 'buttongroup__label',
  },
];

export default {
  heading: 'ButtonGroup',
  description: 'Groups related buttons together with consistent spacing and alignment.',
  tags: ['form', 'action', 'group'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressButtonGroup } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/ButtonGroup',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/button-group.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/ButtonGroup/ButtonGroup.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=button-group&title=[ButtonGroup]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=button-group,enhancement&title=[ButtonGroup]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button-group--docs',
} satisfies ComponentMeta;
