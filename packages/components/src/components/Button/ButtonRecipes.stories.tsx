import { type Meta, type StoryObj } from '@storybook/react';
import { type IressButtonProps } from './Button.types';
import { IressButton } from './Button';

type Story = StoryObj<IressButtonProps>;

export default {
  title: 'Components/Button/Recipes',
  component: IressButton,
} as Meta<typeof IressButton>;

export const Default: Story = {};
