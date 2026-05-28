import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'activator', description: 'The expand/collapse trigger button' },
  { suffix: 'container', description: 'The collapsible content container' },
];

export default {
  heading: 'Expander',
  description: 'Reveals or hides a section of content with an expand/collapse toggle.',
  tags: ['layout', 'collapsible', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
