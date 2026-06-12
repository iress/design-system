import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the modal',
    query: <code>findByRole('dialog', {'{'} name: '...' {'}'})</code>,
    testId: 'modal',
  },
  {
    part: 'heading',
    description: 'The modal heading',
    query: <code>getByRole('heading', {'{'} name: '...' {'}'})</code>,
    testId: 'modal__heading',
  },
  {
    part: 'backdrop',
    description: 'The overlay backdrop',
    testId: 'modal__backdrop',
  },
  {
    part: 'close button',
    description: 'The close button',
    query: <code>findByRole('button', {'{'} name: 'Close' {'}'})</code>,
    testId: 'modal__close-button__button',
  },
  {
    part: 'content',
    description: 'The modal content area',
    testId: 'modal__content',
  },
  {
    part: 'status header',
    description: 'The status icon header (when status is set)',
    testId: 'modal__status-header',
  },
  {
    part: 'status icon',
    description: 'The status icon (when status is set)',
    testId: 'modal__status-icon',
  },
  {
    part: 'footer',
    description: 'The modal footer',
    query: <code>getByText('...')</code>,
    testId: 'modal__footer',
  },
];

export default {
  heading: 'Modal',
  description: 'Displays content in a focused overlay dialog that requires user interaction.',
  tags: ['overlay', 'dialog', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
