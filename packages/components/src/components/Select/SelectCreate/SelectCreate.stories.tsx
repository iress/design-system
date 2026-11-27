import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelectCreate, type IressSelectCreateProps } from './SelectCreate';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  addToStorybookCategory,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSelectCreate>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the select create',
    query: <code>getByRole('menu')</code>,
    testId: 'select-create',
  },
];

export default {
  title: 'Components/Select/Subcomponents/Create',
  component: IressSelectCreate,
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
    ...addToStorybookCategory<IressSelectCreateProps>('Button props', [
      'loading',
      'prepend',
    ]),
    ...addToStorybookCategory<IressSelectCreateProps>('Menu props', [
      'fluid',
      'id',
      'layout',
      'noWrap',
    ]),
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressSelectCreate>;

export const Create: Story = {
  args: {
    heading: 'Add custom option',
    label: 'WX',
  },
};
