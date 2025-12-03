import { type Meta, type StoryObj } from '@storybook/react';
import { IressTab, IressTabSet } from '..';

type Story = StoryObj<typeof IressTab>;

export default {
  title: 'Components/TabSet/Tab',
  component: IressTab,
} as Meta<typeof IressTab>;

export const Inactive: Story = {
  args: {
    label: 'Tab',
  },
};

export const Active: Story = {
  args: {
    ...Inactive.args,
    active: true,
  },
};

export const Value: Story = {
  args: {
    ...Inactive.args,
    label: 'Tab with value',
    value: 'some-tab-name',
  },
  render: (args) => (
    <IressTabSet>
      <IressTab {...args} />
    </IressTabSet>
  ),
};

export const Panel: Story = {
  args: {
    ...Inactive.args,
    children: 'Some content for this tab',
  },
  render: (args) => (
    <IressTabSet>
      <IressTab {...args} />
    </IressTabSet>
  ),
};
