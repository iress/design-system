import { Meta, StoryObj } from '@storybook/react-vite';
import { IressMenuText } from './MenuText';
import { IressMenu } from '../Menu';

type Story = StoryObj<typeof IressMenuText>;

export default {
  title: 'Components/Menu/MenuItem/Text',
  component: IressMenuText,
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
