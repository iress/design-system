import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the select',
    query: (
      <>
        <code>getByRole('combobox')</code> for the activator, or{' '}
        <code>getByLabelText('...')</code> when inside a Field
      </>
    ),
    testId: 'select',
  },
  {
    part: 'hidden input',
    description: 'The hidden form input',
    testId: 'select__hidden-input',
  },
  {
    part: 'select',
    description: 'The native select element (when native mode is enabled)',
    testId: 'select__select',
  },
  {
    part: 'menu group',
    description: 'A grouped options heading',
    testId: 'select__menu-group',
  },
  {
    part: 'menu item',
    description: 'An individual menu option',
    testId: 'select__menu-item',
  },
  {
    part: 'tag',
    description: 'A selected value tag (multi-select)',
    testId: 'select__tag',
  },
];

export default {
  heading: 'Select',
  description: 'Renders a dropdown select input for choosing one option from a list.',
  tags: ['form', 'data-entry', 'dropdown', 'rich-select'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
