import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Field Group',
  description:
    'Groups related form fields together with a shared legend, description, and validation message.',
  tags: ['form', 'wrapper', 'group', 'fieldset'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressFieldGroup } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/FieldGroup',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/field-group.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/FieldGroup/FieldGroup.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=field-group&title=[FieldGroup]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=field-group,enhancement&title=[FieldGroup]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs',
} satisfies ComponentMeta;
