import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root wrapper element',
    testId: 'checkbox',
  },
  {
    part: 'input',
    description: 'The checkbox input element',
    query: <code>getByRole('checkbox', {'{'} name: '...' {'}'})</code>,
    testId: 'checkbox__input',
  },
  {
    part: 'checkboxMark',
    description: 'The visual checkbox indicator',
    testId: 'checkbox__checkboxMark',
  },
];

export default {
  heading: 'Checkbox',
  description: 'Renders a checkbox input for toggling a boolean value.',
  tags: ['form', 'selection', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressCheckbox } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Checkbox',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/checkbox.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Checkbox/Checkbox.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=checkbox&title=[Checkbox]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=checkbox,enhancement&title=[Checkbox]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs',
} satisfies ComponentMeta;
