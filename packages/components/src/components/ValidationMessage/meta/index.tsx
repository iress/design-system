import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the validation message',
    testId: 'validationmessage',
  },
  {
    part: 'error',
    description: 'An individual error message',
    testId: 'validationmessage__error',
  },
];

export default {
  heading: 'ValidationMessage',
  description: 'Displays a validation error or helper message associated with a form field.',
  tags: ['form', 'feedback', 'validation'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
