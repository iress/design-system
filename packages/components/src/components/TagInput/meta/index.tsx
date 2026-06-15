import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Tag Input',
  description:
    'A form control that allows users to enter and manage a collection of tags via keyboard input.',
  tags: ['form', 'input', 'tag', 'multi-select', 'token'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressTagInput } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/TagInput',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/tag-input.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/TagInput/TagInput.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tag-input&title=[TagInput]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tag-input,enhancement&title=[TagInput]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-taginput--docs',
} satisfies ComponentMeta;
