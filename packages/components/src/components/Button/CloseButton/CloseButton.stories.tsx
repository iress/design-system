import { Meta, StoryObj } from '@storybook/react';
import { IressCloseButton } from '..';

type Story = StoryObj<typeof IressCloseButton>;

export default {
  title: 'Components/Button/CloseButton',
  component: IressCloseButton,
} as Meta<typeof IressCloseButton>;

export const CloseButton: Story = {
  args: {
    append: '',
    prepend: '',
  },
};
