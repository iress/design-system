import { type Meta, type StoryObj } from '@storybook/react-vite';
import { disableArgTypes } from '@iress-storybook/helpers';
import { SYSTEM_VALIDATION_STATUSES } from '@/constants';
import { IressBadge, IressButton, IressInline, IressTab } from '@/main';

type Story = StoryObj<typeof IressBadge>;
const BADGE_MODES = [
  'primary',
  ...SYSTEM_VALIDATION_STATUSES,
  'neutral',
] as const;

export default {
  title: 'Components/Badge',
  component: IressBadge,
  tags: ['updated'],
} as Meta<typeof IressBadge>;

export const Default: Story = {
  args: {
    children: 'badge',
    mode: 'neutral',
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
    children: '99+',
    mode: 'primary',
    pill: true,
  },
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
    <IressInline gap="lg">
      <IressBadge {...args} host={<IressButton>Host button</IressButton>}>
        3
      </IressBadge>
      <IressBadge {...args} host={<IressTab label="Host tab" active />}>
        99+
      </IressBadge>
    </IressInline>
  ),
};
