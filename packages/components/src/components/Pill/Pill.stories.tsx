import { type Meta, type StoryObj } from '@storybook/react-vite';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import {
  reactElementArgType,
  reactNodeArgType,
  stylingProps,
} from '@theme-preset/storybookHelpers';
import { IressPill, IressInline } from '@/main';

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
