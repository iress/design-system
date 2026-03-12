import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressProgress } from '.';
import { IressStack } from '../Stack';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { stylingProps } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressProgress>;

export default {
  title: 'Components/Progress',
  component: IressProgress,
  tags: ['updated'],
  argTypes: stylingProps,
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
      <IressProgress
        {...args}
        min={0}
        max={100}
        value={75}
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2858&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </IressStack>
  ),
};
