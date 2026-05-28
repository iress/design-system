import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'input', description: 'The underlying input element' },
  { suffix: 'menu', description: 'The suggestions menu' },
];

export default {
  heading: 'Autocomplete',
  description: 'Provides a text input with suggestions that filter as the user types.',
  tags: ['form', 'data-entry', 'search'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
