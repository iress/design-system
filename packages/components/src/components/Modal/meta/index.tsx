import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'backdrop',
    description: 'The overlay backdrop (outermost element)',
    testId: 'modal__backdrop',
  },
  {
    part: 'main',
    description: 'The dialog element (nested inside backdrop)',
    query: <code>findByRole('dialog', {'{'} name: '...' {'}'})</code>,
    testId: 'modal',
  },
  {
    part: 'heading',
    description: 'The modal heading',
    query: <code>getByRole('heading', {'{'} name: '...' {'}'})</code>,
    testId: 'modal__heading',
  },
  {
    part: 'close button',
    description: 'The close button',
    query: <code>findByRole('button', {'{'} name: 'Close' {'}'})</code>,
    testId: 'modal__close-button__button',
  },
  {
    part: 'content',
    description: 'The modal content area',
    testId: 'modal__content',
  },
  {
    part: 'status header',
    description: 'The status icon header (when status is set)',
    testId: 'modal__status-header',
  },
  {
    part: 'status icon',
    description: 'The status icon (when status is set)',
    testId: 'modal__status-icon',
  },
  {
    part: 'footer',
    description: 'The modal footer',
    query: <code>getByText('...')</code>,
    testId: 'modal__footer',
  },
];

export default {
  heading: 'Modal',
  description: 'Displays content in a focused overlay dialog that requires user interaction.',
  tags: ['overlay', 'dialog', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressModal } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Modal',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/modal.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Modal/Modal.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=modal&title=[Modal]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=modal,enhancement&title=[Modal]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs',
} satisfies ComponentMeta;
