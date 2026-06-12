import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the card',
    query: <code>getByText('...')</code>,
    testId: 'card',
  },
  {
    part: 'prepend',
    description: 'The prepend slot container',
    testId: 'card__prepend',
  },
  {
    part: 'topRight',
    description: 'The top-right slot container',
    testId: 'card__topRight',
  },
  {
    part: 'media',
    description: 'The media slot container',
    testId: 'card__media',
  },
  {
    part: 'heading',
    description: 'The card heading container',
    query: <code>getByRole('heading')</code>,
    testId: 'card__heading',
  },
  {
    part: 'body',
    description: 'The card body container',
    testId: 'card__body',
  },
];

export default {
  heading: 'Card',
  description: 'Groups related content and actions into a contained, visually distinct surface.',
  tags: ['layout', 'container', 'content'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
