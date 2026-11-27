import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenuText } from './MenuText';
import { IressMenu } from '../Menu';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import { stylingProps } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressMenuText>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the menu text',
    testId: 'menu-text',
  },
];

export default {
  title: 'Components/Menu/MenuText',
  component: IressMenuText,
  argTypes: stylingProps,
  parameters: {
    idsConfig: { testMeta },
  },
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
