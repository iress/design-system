import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'activator',
    description: 'The expand/collapse trigger button',
    query: <code>getByRole('button', {'{'} name: '...' {'}'})</code>,
    testId: 'expander__activator',
  },
  {
    part: 'content',
    description: 'The expandable content container',
    testId: 'expander__content',
  },
  {
    part: 'container',
    description: 'The collapsible content container',
    testId: 'expander__container',
  },
];

export default {
  heading: 'Expander',
  description: 'Reveals or hides a section of content with an expand/collapse toggle.',
  tags: ['layout', 'collapsible', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
