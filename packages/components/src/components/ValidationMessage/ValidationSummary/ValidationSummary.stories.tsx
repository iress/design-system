import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressValidationSummary } from '@/main';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressValidationSummary>;

export default {
  title: 'Components/ValidationMessage/ValidationSummary',
  component: IressValidationSummary,
  argTypes: {
    prefix: reactNodeArgType,
    ...stylingProps,
  },
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
