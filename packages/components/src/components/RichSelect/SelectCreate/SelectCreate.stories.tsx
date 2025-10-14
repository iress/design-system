import { Meta, StoryObj } from '@storybook/react';
import { IressSelectCreate } from './SelectCreate';
import { addToStorybookCategory } from '@iress-storybook/helpers';
import { IressSelectCreateProps } from './SelectCreate.types';

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
