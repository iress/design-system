import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the validation message',
    query: <code>getByText('...')</code>,
    testId: 'validationmessage',
  },
  {
    part: 'error',
    description: 'An individual error message',
    query: <code>getByRole('link')</code>,
    testId: 'validationmessage__error',
  },
];

export default {
  heading: 'Validation Message',
  description: 'Displays a validation error or helper message associated with a form field.',
  tags: ['form', 'feedback', 'validation'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressValidationMessage } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/ValidationMessage',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/validation-message.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/ValidationMessage/ValidationMessage.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=validation-message&title=[ValidationMessage]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=validation-message,enhancement&title=[ValidationMessage]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validation-message--docs',
} satisfies ComponentMeta;
