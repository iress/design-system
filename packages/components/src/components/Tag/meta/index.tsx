import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the tag',
    query: (
      <>
        <code>getByRole('button', {'{'} name: '...' {'}'})</code> when
        interactive, or <code>getByRole('link', {'{'} name: '...' {'}'})</code>{' '}
        when rendered as a link
      </>
    ),
    testId: 'tag',
  },
  {
    part: 'delete button',
    description: 'The tag delete button',
    query: <code>getByRole('button', {'{'} name: 'Remove item' {'}'})</code>,
    testId: 'tag__delete-button__button',
  },
];

export default {
  heading: 'Tag',
  description: 'Displays a compact label for categorisation, filtering, or metadata.',
  tags: ['data-display', 'label', 'categorization'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressTag } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Tag',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/tag.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Tag/Tag.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tag&title=[Tag]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tag,enhancement&title=[Tag]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tag--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/tag',
  figma: 'https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-29810',
} satisfies ComponentMeta;
