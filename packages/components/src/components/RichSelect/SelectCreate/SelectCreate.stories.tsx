import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelectCreate, type IressSelectCreateProps } from './SelectCreate';
import { addToStorybookCategory } from '@iress-oss/ids-storybook-config';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressSelectCreate>;

export default {
  title: 'Components/RichSelect/Subcomponents/Create',
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
} as Meta<typeof IressSelectCreate>;

export const Create: Story = {
  args: {
    heading: 'Add custom option',
    label: 'WX',
  },
};
