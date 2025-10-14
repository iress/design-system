import { Meta, StoryObj } from '@storybook/react-vite';
import { IressCloseButton } from '..';

type Story = StoryObj<typeof IressCloseButton>;

export default {
  title: 'Components/Button/CloseButton',
  component: IressCloseButton,
  tags: ['updated'],
} as Meta<typeof IressCloseButton>;

export const CloseButton: Story = {
  args: {
    append: '',
    prepend: '',
  },
};
