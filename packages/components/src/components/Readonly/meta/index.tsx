import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the readonly',
    query: <code>getByText('...')</code>,
    testId: 'readonly',
  },
  {
    part: 'input',
    description: 'The hidden input element',
    testId: 'readonly__input',
  },
];

export default {
  heading: 'Readonly',
  description: 'Displays a form value in a non-editable, read-only format.',
  tags: ['form', 'display', 'data'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressReadonly } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Readonly',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/readonly.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Readonly/Readonly.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=readonly&title=[Readonly]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=readonly,enhancement&title=[Readonly]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-readonly--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/readonly',
} satisfies ComponentMeta;
