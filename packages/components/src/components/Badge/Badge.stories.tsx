import { Meta, StoryObj } from '@storybook/react';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressBadge } from './Badge';
import { IressInline } from '../Inline';
import { BADGE_MODES } from './Badge.types';
import { IressButton } from '../Button';
import { IressTab } from '../TabSet';

type Story = StoryObj<typeof IressBadge>;

export default {
  title: 'Components/Badge',
  component: IressBadge,
} as Meta<typeof IressBadge>;

export const Default: Story = {
  args: {
    children: 'badge',
    mode: 'background-default',
  },
};

export const Mode: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gutter="sm">
      {BADGE_MODES.map((mode) => (
        <IressBadge {...args} key={mode} mode={mode}>
          {mode}
        </IressBadge>
      ))}
    </IressInline>
  ),
};

export const Pill: Story = {
  ...Default,
  args: {
    ...Default.args,
    pill: true,
  },
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gutter="sm">
      {BADGE_MODES.map((mode) => (
        <IressBadge {...args} key={mode} mode={mode}>
          {mode}
        </IressBadge>
      ))}
    </IressInline>
  ),
};

export const Host: Story = {
  ...Default,
  args: {
    ...Default.args,
    pill: true,
    mode: 'success',
  },
  argTypes: {
    ...disableArgTypes(['host']),
  },
  render: (args) => (
    <IressInline gutter="lg">
      <IressBadge {...args} host={<IressButton>Host button</IressButton>}>
        3
      </IressBadge>

      <IressBadge {...args} host={<IressTab label="Host tab" active />}>
        99+
      </IressBadge>
    </IressInline>
  ),
};
