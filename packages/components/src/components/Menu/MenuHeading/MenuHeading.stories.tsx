import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenuHeading } from './MenuHeading';
import { IressMenu } from '../Menu';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressMenuHeading>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the menu heading',
    testId: 'menu-heading',
  },
];

export default {
  title: 'Components/Menu/MenuHeading',
  component: IressMenuHeading,
  parameters: {
    idsConfig: { testMeta },
  },
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
