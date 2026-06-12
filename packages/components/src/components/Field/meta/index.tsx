import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the field',
    testId: 'field',
  },
  {
    part: 'label',
    description: 'The field label element',
    testId: 'field__label',
  },
  {
    part: 'hint',
    description: 'The hint text below the label',
    testId: 'field__hint',
  },
  {
    part: 'error',
    description: 'The error message container',
    testId: 'field__error',
  },
];

export default {
  heading: 'Field',
  description: 'Wraps a form control with its label, description, and validation message.',
  tags: ['form', 'wrapper', 'validation'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
