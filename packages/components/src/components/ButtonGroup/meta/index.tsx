import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the button group',
    query: <code>getByRole('group', {'{'} name: '...' {'}'})</code>,
    testId: 'buttongroup',
  },
  {
    part: 'label',
    description: 'The group label element',
    query: <code>getByText('...')</code>,
    testId: 'buttongroup__label',
  },
];

export default {
  heading: 'ButtonGroup',
  description: 'Groups related buttons together with consistent spacing and alignment.',
  tags: ['form', 'action', 'group'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
