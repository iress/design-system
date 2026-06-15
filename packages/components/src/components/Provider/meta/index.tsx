import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Provider',
  description:
    'Application-level wrapper that provides shared context for Modal, Slideout, Toaster, Tooltip, and Popover components.',
  tags: ['context', 'provider', 'setup'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressProvider } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Provider',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/provider.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Provider/Provider.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=provider&title=[Provider]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=provider,enhancement&title=[Provider]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-provider--docs',
} satisfies ComponentMeta;
