import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the popover',
    testId: 'popover',
  },
  {
    part: 'activator',
    description: 'The popover trigger element',
    query: <code>getByRole('button')</code>,
    testId: 'popover__activator',
  },
  {
    part: 'content',
    description: 'The popover content panel',
    testId: 'popover__content',
  },
];

export default {
  heading: 'Popover',
  description: 'Displays floating content anchored to a trigger element.',
  tags: ['overlay', 'interactive', 'content'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
