import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Form',
  description: 'Manages form state, validation, and submission for a group of input fields.',
  tags: ['form', 'crud'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressForm } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Form',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/patterns/form.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/patterns/Form/Form.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=form&title=[Form]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=form,enhancement&title=[Form]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs',
  guidelines:
    'https://iress.github.io/design-system/#/patterns/form',
} satisfies ComponentMeta;
