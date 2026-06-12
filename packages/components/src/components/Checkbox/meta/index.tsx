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
} satisfies ComponentMeta;
