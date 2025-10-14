import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressProgress } from '.';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressStack } from '../Stack';

type Story = StoryObj<typeof IressProgress>;

export default {
  title: 'Components/Progress',
  component: IressProgress,
  tags: ['updated'],
} as Meta<typeof IressProgress>;

export const Default: Story = {
  args: {
    min: 10,
    max: 30,
    value: 20,
  },
};

export const ProgressExamples: Story = {
  argTypes: {
    ...disableArgTypes(['min', 'max', 'value', 'sectionTitle']),
  },
  render: (args) => (
    <IressStack gap="md">
      <IressProgress {...args} min={0} max={50} value={0} />
      <IressProgress {...args} min={10} max={30} value={20} />
      <IressProgress
        {...args}
        min={0}
        max={50}
        value={30}
        sectionTitle="Step {{current}} of {{max}}"
      />
    </IressStack>
  ),
};
