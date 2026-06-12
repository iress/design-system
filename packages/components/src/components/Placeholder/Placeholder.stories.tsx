import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPlaceholder } from '.';
import { componentStoryMeta, reactNodeArgType } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressPlaceholder>;

export default {
  title: 'Components/Placeholder',
  component: IressPlaceholder,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
    },
  }),
} as Meta<typeof IressPlaceholder>;

export const Default: Story = {
  args: {
    children: 'This should be a description of the expected content',
    heading: 'Placeholder',
    width: '300',
    height: '300',
  },
};
