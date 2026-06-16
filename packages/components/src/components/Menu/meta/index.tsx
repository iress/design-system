import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the menu',
    query: (
      <>
        <code>getByRole('list')</code> by default, or{' '}
        <code>getByRole('menu')</code> /{' '}
        <code>getByRole('listbox')</code> depending on role prop
      </>
    ),
    testId: 'menu',
  },
  {
    part: 'activator',
    description:
      'A menu group activator (propagated from IressMenuGroup data-testid)',
    query: <code>getByRole('button', {'{'} name: '...' {'}'})</code>,
    testId: '<menugroup-testid>__activator',
  },
  {
    part: 'subdraw',
    description:
      'A subdraw container (propagated from IressMenuGroup data-testid)',
    testId: '<menugroup-testid>__subdraw',
  },
  {
    part: 'subdraw trigger',
    description:
      'A subdraw trigger item (propagated from IressMenuGroup data-testid)',
    testId: '<menugroup-testid>__subdraw__trigger',
  },
  {
    part: 'checkbox mark',
    description:
      'Checkbox indicator on a selectable item (propagated from IressMenuItem data-testid)',
    testId: '<menuitem-testid>__checkbox-mark',
  },
  {
    part: 'checkbox',
    description:
      'Checkbox on a multi-select item (propagated from IressMenuItem data-testid)',
    testId: '<menuitem-testid>__checkbox',
  },
];

export default {
  heading: 'Menu',
  description: 'Displays a list of navigational or actionable items.',
  tags: ['navigation', 'dropdown', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressMenu } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Menu',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/menu.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Menu/Menu.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=menu&title=[Menu]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=menu,enhancement&title=[Menu]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/menu',
} satisfies ComponentMeta;
