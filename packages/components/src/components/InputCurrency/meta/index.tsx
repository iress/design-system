import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the input currency',
    query: (
      <>
        <code>getByRole('textbox')</code>, or{' '}
        <code>getByLabelText('...')</code> when inside a Field
      </>
    ),
    testId: 'input-currency',
  },
];

export default {
  heading: 'InputCurrency',
  description: 'Provides a text input formatted for entering monetary values.',
  tags: ['form', 'data-entry', 'currency'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressInputCurrency } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/InputCurrency',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/input-currency.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/InputCurrency/InputCurrency.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=input-currency&title=[InputCurrency]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=input-currency,enhancement&title=[InputCurrency]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input-currency--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/input-currency',
} satisfies ComponentMeta;
