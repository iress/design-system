import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the radio',
    testId: 'radio',
  },
  {
    part: 'input',
    description: 'The underlying radio input element',
    query: <code>getByRole('radio', {'{'} name: '...' {'}'})</code>,
    testId: 'radio__input',
  },
  {
    part: 'radioMark',
    description: 'The visual radio indicator',
    testId: 'radio__radioMark',
  },
];

export default {
  heading: 'Radio',
  description: 'Renders a single radio button for use within a group of mutually exclusive options.',
  tags: ['form', 'selection', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressRadio } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Radio',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/radio.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Radio/Radio.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=radio&title=[Radio]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=radio,enhancement&title=[Radio]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/radio',
} satisfies ComponentMeta;
