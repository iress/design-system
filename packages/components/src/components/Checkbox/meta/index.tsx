import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'checkboxMark', description: 'The visual checkbox indicator' },
];

export default {
  heading: 'Checkbox',
  description: 'Renders a checkbox input for toggling a boolean value.',
  tags: ['form', 'selection', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
