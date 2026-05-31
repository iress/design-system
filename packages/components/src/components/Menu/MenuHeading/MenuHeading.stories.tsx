import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenuHeading } from './MenuHeading';
import { IressMenu } from '../Menu';

type Story = StoryObj<typeof IressMenuHeading>;

export default {
  title: 'Components/Menu/MenuHeading',
  component: IressMenuHeading,
} as Meta<typeof IressMenuHeading>;

export const Heading: Story = {
  args: {
    children: 'Menu text',
  },
  render: (args) => (
    <IressMenu>
      <IressMenuHeading {...args} />
    </IressMenu>
  ),
};
