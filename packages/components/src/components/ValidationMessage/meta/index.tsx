import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'error', description: 'An individual error message' },
];

export default {
  heading: 'ValidationMessage',
  href: '/?path=/docs/components-validationmessage--docs',
  tags: ['form', 'feedback', 'validation'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
