import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'heading', description: 'The modal heading' },
  { suffix: 'backdrop', description: 'The overlay backdrop' },
  {
    suffix: 'close-button__button',
    description: 'The close button',
  },
  { suffix: 'content', description: 'The modal content area' },
  {
    suffix: 'status-header',
    description: 'The status icon header (when status is set)',
  },
  {
    suffix: 'status-icon',
    description: 'The status icon (when status is set)',
  },
  { suffix: 'footer', description: 'The modal footer' },
];

export default {
  heading: 'Modal',
  description: 'Displays content in a focused overlay dialog that requires user interaction.',
  tags: ['overlay', 'dialog', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
