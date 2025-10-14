import { Meta, StoryObj } from '@storybook/react';
import { IressValidationSummary } from '@/main';

type Story = StoryObj<typeof IressValidationSummary>;

export default {
  title: 'Components/ValidationMessage/ValidationSummary',
  component: IressValidationSummary,
} as Meta<typeof IressValidationSummary>;

export const ValidationSummary: Story = {
  args: {
    messages: [
      {
        message: 'Something you should know.',
        status: 'info',
      },
      {
        message: 'Something is wrong.',
        status: 'danger',
      },
      {
        message: 'Something could go wrong.',
        status: 'warning',
      },
      {
        message: 'Something went right.',
        status: 'success',
      },
    ],
  },
};
