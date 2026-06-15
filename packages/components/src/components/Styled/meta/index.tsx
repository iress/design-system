import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Styled',
  description:
    'A polymorphic utility component that applies design tokens and styling props to any HTML element or custom component.',
  tags: ['utility', 'layout', 'styling', 'polymorphic'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressStyled } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Styled',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Styled/Styled.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=styled&title=[Styled]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=styled,enhancement&title=[Styled]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-styled--docs',
} satisfies ComponentMeta;
