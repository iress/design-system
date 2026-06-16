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
  import: "import { IressCard } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Card',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/card.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Card/Card.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=card&title=[Card]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=card,enhancement&title=[Card]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-card--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/card',
} satisfies ComponentMeta;
