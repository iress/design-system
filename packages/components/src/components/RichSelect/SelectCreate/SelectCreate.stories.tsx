import { type Meta, type StoryObj } from '@storybook/react';
import { IressSelectCreate } from './SelectCreate';
import { type IressSelectCreateProps } from './SelectCreate.types';
import { addToStorybookCategory } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSelectCreate>;

export default {
  title: 'Components/RichSelect/Subcomponents/Create',
  component: IressSelectCreate,
  argTypes: {
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
} as Meta<typeof IressSelectCreate>;

export const Create: Story = {
  args: {
    heading: 'Add custom option',
    label: 'WX',
  },
};
