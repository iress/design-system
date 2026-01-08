import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCloseButton } from '..';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressCloseButton>;

export default {
  title: 'Components/Button/CloseButton',
  component: IressCloseButton,
  tags: ['updated'],
  argTypes: {
    append: reactNodeArgType,
    children: reactNodeArgType,
    prepend: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof IressCloseButton>;

export const CloseButton: Story = {
  args: {
    append: '',
    prepend: '',
  },
};
