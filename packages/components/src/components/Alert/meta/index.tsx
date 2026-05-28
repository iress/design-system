import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'heading', description: 'The alert heading container' },
  { suffix: 'footer', description: 'The alert footer/actions container' },
];

export default {
  heading: 'Alert',
  description:
    'Communicates important information inline with page content, such as validation errors, warnings, or status messages.',
  tags: ['feedback', 'notification', 'status'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
