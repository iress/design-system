import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the checkbox group',
    query: <code>getByRole('group')</code>,
    testId: 'checkbox-group',
  },
];

export default {
  heading: 'CheckboxGroup',
  description: 'Groups related checkboxes so users can select multiple options from a set.',
  tags: ['form', 'selection', 'group'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressCheckboxGroup } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/CheckboxGroup',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/checkbox-group.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/CheckboxGroup/CheckboxGroup.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=checkbox-group&title=[CheckboxGroup]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=checkbox-group,enhancement&title=[CheckboxGroup]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox-group--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/checkbox-group',
  figma: 'https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-28220',
} satisfies ComponentMeta;
