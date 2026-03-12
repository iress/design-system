import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPlaceholder } from '.';
import { reactNodeArgType, stylingProps } from '@iress-oss/ids-storybook-config';

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

export const Default: Story = {
  args: {
    children: 'This should be a description of the expected content',
    heading: 'Placeholder',
    width: '300',
    height: '300',
  },
};
