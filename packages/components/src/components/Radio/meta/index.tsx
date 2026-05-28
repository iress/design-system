import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'input', description: 'The underlying radio input element' },
  { suffix: 'radioMark', description: 'The visual radio indicator' },
];

export default {
  heading: 'Radio',
  description: 'Renders a single radio button for use within a group of mutually exclusive options.',
  tags: ['form', 'selection', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
