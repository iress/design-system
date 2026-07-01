import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the button',
    query: <code>getByRole('button', {'{'} name: '...' {'}'})</code>,
    testId: 'button',
  },
];

export default {
  heading: 'Button',
  description: 'A clickable element used to perform an action.',
  tags: ['form', 'action', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressButton } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Button',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/button.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Button/Button.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=button&title=[Button]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=button,enhancement&title=[Button]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/button',
  figma: 'https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=6201-26',
} satisfies ComponentMeta;
