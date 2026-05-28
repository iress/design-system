import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  disableArgTypes,
  reactElementArgType,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import { IressPill, IressInline } from '@/main';
import { STATUSES } from '@/constants';
import componentMeta from './meta';

type Story = StoryObj<typeof IressPill>;
const BADGE_MODES = [10, 20, 30, 40, 50, 60, 70, 80, 90] as const;

export default {
  title: 'Components/Pill',
  component: IressPill,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    host: reactElementArgType,
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressPill>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const Mode: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gap="sm">
      {BADGE_MODES.map((mode) => (
        <IressPill {...args} key={mode} mode={mode}>
          {mode}
        </IressPill>
      ))}
    </IressInline>
  ),
};

export const Status: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gap="sm">
      {STATUSES.map((status) => (
        <IressPill {...args} mode={status} key={status}>
          {status}
        </IressPill>
      ))}
    </IressInline>
  ),
};
