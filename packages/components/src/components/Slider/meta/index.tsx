import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'slider', description: 'The range input element' },
  { suffix: 'datalist', description: 'The tick marks datalist' },
  { suffix: 'option', description: 'An individual tick mark option' },
];

export default {
  heading: 'Slider',
  description: 'Allows users to select a value from a range by dragging a handle.',
  tags: ['form', 'data-entry', 'range'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
