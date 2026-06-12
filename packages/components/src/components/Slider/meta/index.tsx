import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the slider',
    testId: 'slider',
  },
  {
    part: 'slider',
    description: 'The range input element',
    query: <code>getByRole('slider')</code>,
    testId: 'slider__slider',
  },
  {
    part: 'datalist',
    description: 'The tick marks datalist',
    testId: 'slider__datalist',
  },
  {
    part: 'option',
    description: 'An individual tick mark option',
    testId: 'slider__datalist__option',
  },
];

export default {
  heading: 'Slider',
  description: 'Allows users to select a value from a range by dragging a handle.',
  tags: ['form', 'data-entry', 'range'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
