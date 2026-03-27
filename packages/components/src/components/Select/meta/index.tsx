import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'hidden-input', description: 'The hidden form input' },
  {
    suffix: 'select',
    description: 'The native select element (when native mode is enabled)',
  },
  { suffix: 'menu-group', description: 'A grouped options heading' },
  { suffix: 'menu-item', description: 'An individual menu option' },
  { suffix: 'tag', description: 'A selected value tag (multi-select)' },
];

export default {
  heading: 'Select',
  href: '/?path=/docs/components-select--docs',
  tags: ['form', 'data-entry', 'dropdown', 'rich-select'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
