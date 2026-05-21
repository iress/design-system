import { type Meta, type StoryObj } from '@storybook/react-vite';
import { stylingProps } from '@iress-oss/ids-storybook-config';
import { IressAvatar, IressAvatarGroup } from '@/main';

type Story = StoryObj<typeof IressAvatarGroup>;

export default {
  title: 'Components/Avatar/Avatar Group',
  component: IressAvatarGroup,
  argTypes: {
    ...stylingProps,
  },
} as Meta<typeof IressAvatarGroup>;

export const Default: Story = {
  render: () => (
    <IressAvatarGroup>
      <IressAvatar aria-label="MT" mode={30}>
        MT
      </IressAvatar>
      <IressAvatar aria-label="HM" mode={20}>
        HM
      </IressAvatar>
      <IressAvatar aria-label="TL" mode={50}>
        TL
      </IressAvatar>
    </IressAvatarGroup>
  ),
};

export const Compact: Story = {
  render: () => (
    <IressAvatarGroup compact>
      <IressAvatar aria-label="MT" mode={30}>
        MT
      </IressAvatar>
      <IressAvatar aria-label="HM" mode={20}>
        HM
      </IressAvatar>
      <IressAvatar aria-label="TL" mode={50}>
        TL
      </IressAvatar>
    </IressAvatarGroup>
  ),
};

export const MaxAvatars: Story = {
  render: () => (
    <IressAvatarGroup compact max={3}>
      <IressAvatar aria-label="MT" mode={30}>
        MT
      </IressAvatar>
      <IressAvatar aria-label="HM" mode={20}>
        HM
      </IressAvatar>
      <IressAvatar aria-label="TL" mode={50}>
        TL
      </IressAvatar>
      <IressAvatar aria-label="JD" mode={10}>
        JD
      </IressAvatar>
      <IressAvatar aria-label="AB" mode={40}>
        AB
      </IressAvatar>
    </IressAvatarGroup>
  ),
};

export const CustomOverflowLabel: Story = {
  render: () => (
    <IressAvatarGroup
      compact
      max={2}
      overflowLabel={(count) => `+${count} awesome users`}
    >
      <IressAvatar aria-label="MT" mode={30}>
        MT
      </IressAvatar>
      <IressAvatar aria-label="HM" mode={20}>
        HM
      </IressAvatar>
      <IressAvatar aria-label="TL" mode={50}>
        TL
      </IressAvatar>
      <IressAvatar aria-label="JD" mode={10}>
        JD
      </IressAvatar>
    </IressAvatarGroup>
  ),
};
