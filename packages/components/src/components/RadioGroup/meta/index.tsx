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
} satisfies ComponentMeta;
