import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the radio group',
    query: <code>getByRole('radiogroup')</code>,
    testId: 'radio-group',
  },
];

export default {
  heading: 'RadioGroup',
  description: 'Groups related radio buttons so users can select one option from a set.',
  tags: ['form', 'selection', 'group'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressRadioGroup } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/RadioGroup',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/radio-group.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/RadioGroup/RadioGroup.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=radio-group&title=[RadioGroup]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=radio-group,enhancement&title=[RadioGroup]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio-group--docs',
} satisfies ComponentMeta;
