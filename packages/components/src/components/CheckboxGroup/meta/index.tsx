import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the checkbox group',
    query: <code>getByRole('group')</code>,
    testId: 'checkbox-group',
  },
];

export default {
  heading: 'CheckboxGroup',
  description: 'Groups related checkboxes so users can select multiple options from a set.',
  tags: ['form', 'selection', 'group'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
