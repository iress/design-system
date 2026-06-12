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
} satisfies ComponentMeta;
