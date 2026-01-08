import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenuText } from './MenuText';
import { IressMenu } from '../Menu';
import { stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressMenuText>;

export default {
  title: 'Components/Menu/MenuItem/Text',
  component: IressMenuText,
  argTypes: stylingProps,
} as Meta<typeof IressMenuText>;

export const Text: Story = {
  args: {
    children: 'Menu text',
  },
  render: (args) => (
    <IressMenu>
      <IressMenuText {...args} />
    </IressMenu>
  ),
};
