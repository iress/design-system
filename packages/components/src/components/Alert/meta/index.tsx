import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the alert',
    query: (
      <>
        <code>getByRole('status')</code> if the alert has a status of "info" or
        "neutral", otherwise <code>getByRole('alert')</code>
      </>
    ),
    testId: 'alert',
  },
  {
    part: 'heading',
    description: 'The alert heading container',
    query: <code>getByRole('heading')</code>,
    testId: 'alert__heading',
  },
  {
    part: 'footer',
    description: 'The alert footer/actions container',
    query: <code>getByText('...')</code>,
    testId: 'alert__footer',
  },
];

export default {
  heading: 'Alert',
  description:
    'Communicates important information inline with page content, such as validation errors, warnings, or status messages.',
  tags: ['feedback', 'notification', 'status'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
