import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPlaceholder } from '.';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressPlaceholder>;

export default {
  title: 'Components/Placeholder',
  component: IressPlaceholder,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof IressPlaceholder>;

export const Placeholder: Story = {
  args: {
    children: 'Placeholder',
    width: '300',
    height: '300',
  },
};
