import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the toggle',
    query: <code>getByRole('switch')</code>,
    testId: 'toggle',
  },
  {
    part: 'label',
    description: 'The toggle label element',
    testId: 'toggle__label',
  },
  {
    part: 'button',
    description: 'The toggle switch button',
    testId: 'toggle__button__button',
  },
];

export default {
  heading: 'Toggle',
  description: 'Renders a switch control for toggling between on and off states.',
  tags: ['form', 'switch', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
