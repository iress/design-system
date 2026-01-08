import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressShadow } from '.';
import { IressPanel } from '@/main';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressShadow>;

export default {
  title: 'Patterns/Shadow',
  component: IressShadow,
  tags: ['beta: '],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof IressShadow>;

export const Shadow: Story = {
  args: {
    children: <IressPanel>Content inside shadow DOM</IressPanel>,
  },
};
