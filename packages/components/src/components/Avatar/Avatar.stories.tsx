import { type Meta, type StoryObj } from '@storybook/react-vite';
import { stylingProps } from '@iress-oss/ids-storybook-config';
import { IressAvatar, IressInline } from '@/main';

type Story = StoryObj<typeof IressAvatar>;

export default {
  title: 'Components/Avatar',
  component: IressAvatar,
  argTypes: {
    ...stylingProps,
  },
} as Meta<typeof IressAvatar>;

export const Default: Story = {
  args: {
    children: 'BC',
    'aria-label': 'Baron-Cohen, Sacha',
  },
};

export const WithBadge: Story = {
  args: {
    children: 'BC',
    'aria-label': 'Baron-Cohen, Sacha',
    badge: { icon: 'star', ariaLabel: 'Featured' },
  },
};

export const WithBadgeColor: Story = {
  args: {
    children: 'BC',
    'aria-label': 'Baron-Cohen, Sacha',
    badge: {
      ariaLabel: 'Featured',
      mode: 'success',
    },
  },
};

export const WithType: Story = {
  args: {
    children: 'J&C',
    'aria-label': 'Julia and Chris',
    type: {
      icon: 'group',
      ariaLabel: 'Group',
    },
  },
};

export const Mode: Story = {
  render: (args) => (
    <IressInline gap="xs">
      <IressAvatar {...args} mode={10}>
        10
      </IressAvatar>
      <IressAvatar {...args} mode={20}>
        20
      </IressAvatar>
      <IressAvatar {...args} mode={30}>
        30
      </IressAvatar>
      <IressAvatar {...args} mode={40}>
        40
      </IressAvatar>
      <IressAvatar {...args} mode={50}>
        50
      </IressAvatar>
    </IressInline>
  ),
};

export const Compact: Story = {
  args: {
    children: 'MT',
    'aria-label': 'M. Thompson',
    compact: true,
  },
};
