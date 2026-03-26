import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'slider', description: 'The range input element' },
  { suffix: 'datalist', description: 'The tick marks datalist' },
  { suffix: 'option', description: 'An individual tick mark option' },
];

export default {
  heading: 'Slider',
  href: '/?path=/docs/components-slider--docs',
  tags: ['form', 'data-entry', 'range'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
