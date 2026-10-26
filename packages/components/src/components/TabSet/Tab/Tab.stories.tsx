import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTab, type IressTabProps, IressTabSet } from '..';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressTabProps<undefined>>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the tab',
    query: <code>getByRole('tab')</code>,
    testId: 'tab',
  },
];

export default {
  title: 'Components/TabSet/Tab',
  component: IressTab,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<IressTabProps<undefined>>;

export const Default: Story = {
  args: {
    label: 'Tab',
  },
};

export const Inactive: Story = {
  args: {
    label: 'Tab',
  },
};

export const Active: Story = {
  args: {
    label: 'Tab',
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
