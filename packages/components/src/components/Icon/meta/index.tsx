import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the icon',
    query: (
      <>
        <code>getByRole('img', {'{'} name: '...' {'}'})</code> when a label is
        provided, otherwise{' '}
        <code>getByRole('img', {'{'} hidden: true {'}'})</code>
      </>
    ),
    testId: 'icon',
  },
];

export default {
  heading: 'Icon',
  description: 'Renders an SVG icon from the design system icon set.',
  tags: ['visual', 'symbol', 'graphic'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressIcon } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Icon',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/icon.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Icon/Icon.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=icon&title=[Icon]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=icon,enhancement&title=[Icon]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-icon--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/icon',
} satisfies ComponentMeta;
