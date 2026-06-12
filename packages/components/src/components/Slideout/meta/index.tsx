import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the slideout',
    query: (
      <>
        <code>findByRole('dialog')</code> by default, or{' '}
        <code>findByRole('complementary')</code> if role is set to
        "complementary"
      </>
    ),
    testId: 'slideout',
  },
  {
    part: 'heading',
    description: 'The slideout heading',
    query: <code>getByRole('heading', {'{'} name: '...' {'}'})</code>,
    testId: 'slideout__heading',
  },
  {
    part: 'close button',
    description: 'The close button',
    query: <code>findByRole('button', {'{'} name: 'Close' {'}'})</code>,
    testId: 'slideout__close-button__button',
  },
  {
    part: 'content',
    description: 'The slideout content area',
    testId: 'slideout__content',
  },
  {
    part: 'footer',
    description: 'The slideout footer',
    query: <code>getByText('...')</code>,
    testId: 'slideout__footer',
  },
];

export default {
  heading: 'Slideout',
  description: 'Displays supplementary content in a panel that slides in from the edge of the viewport.',
  tags: ['overlay', 'navigation', 'panel'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
