import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'label', description: 'The toggle label element' },
  { suffix: 'button__button', description: 'The toggle switch button' },
];

export default {
  heading: 'Toggle',
  description: 'Renders a switch control for toggling between on and off states.',
  tags: ['form', 'switch', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
