import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'heading', description: 'The alert heading container' },
  { suffix: 'footer', description: 'The alert footer/actions container' },
];

export default {
  heading: 'Alert',
  href: '/?path=/docs/components-alert--docs',
  tags: ['feedback', 'notification', 'status'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
