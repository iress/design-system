import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the image',
    query: (
      <>
        <code>getByRole('img')</code>, or{' '}
        <code>getByAltText('...')</code> to match by alt text
      </>
    ),
    testId: 'image',
  },
];

export default {
  heading: 'Image',
  description: 'Renders a responsive image with optional fallback and loading behaviour.',
  tags: ['media', 'visual', 'content'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressImage } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Image',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/image.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Image/Image.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=image&title=[Image]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=image,enhancement&title=[Image]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-image--docs',
} satisfies ComponentMeta;
