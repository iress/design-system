import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the input currency',
    query: <code>getByRole('textbox')</code>,
    testId: 'input-currency',
  },
];

export default {
  heading: 'InputCurrency',
  description: 'Provides a text input formatted for entering monetary values.',
  tags: ['form', 'data-entry', 'currency'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
