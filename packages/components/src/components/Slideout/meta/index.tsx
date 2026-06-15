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
  import: "import { IressSlideout } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Slideout',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/slideout.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Slideout/Slideout.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=slideout&title=[Slideout]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=slideout,enhancement&title=[Slideout]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs',
} satisfies ComponentMeta;
