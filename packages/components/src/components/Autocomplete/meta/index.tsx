import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'input', description: 'The underlying input element' },
  { suffix: 'menu', description: 'The suggestions menu' },
];

export default {
  heading: 'Autocomplete',
  href: '/?path=/docs/components-autocomplete--docs',
  tags: ['form', 'data-entry', 'search'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
