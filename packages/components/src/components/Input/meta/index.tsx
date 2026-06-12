import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the input',
    query: (
      <>
        <code>getByRole('textbox')</code>, or{' '}
        <code>getByLabelText('...')</code> when inside a Field
      </>
    ),
    testId: 'input',
  },
];

export default {
  heading: 'Input',
  description: 'Renders a single-line text input for capturing user data.',
  tags: ['form', 'data-entry', 'text'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
