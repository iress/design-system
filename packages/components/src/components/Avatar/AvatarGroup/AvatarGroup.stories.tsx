import { type Meta, type StoryObj } from '@storybook/react-vite';
import { stylingProps } from '@iress-oss/ids-storybook-config';
import { IressAvatar, IressAvatarGroup } from '@/main';

type Story = StoryObj<typeof IressAvatarGroup>;

export default {
  title: 'Components/Avatar/AvatarGroup',
  component: IressAvatarGroup,
  argTypes: {
    ...stylingProps,
  },
} as Meta<typeof IressAvatarGroup>;

export const Default: Story = {
  render: () => (
    <IressAvatarGroup>
      <IressAvatar mode={30}>MT</IressAvatar>
      <IressAvatar mode={20}>HM</IressAvatar>
      <IressAvatar mode={50}>TL</IressAvatar>
    </IressAvatarGroup>
  ),
};

export const Compact: Story = {
  render: () => (
    <IressAvatarGroup compact>
      <IressAvatar mode={30}>MT</IressAvatar>
      <IressAvatar mode={20}>HM</IressAvatar>
      <IressAvatar mode={50}>TL</IressAvatar>
    </IressAvatarGroup>
  ),
};

export const MaxAvatars: Story = {
  render: () => (
    <IressAvatarGroup compact max={3}>
      <IressAvatar mode={30}>MT</IressAvatar>
      <IressAvatar mode={20}>HM</IressAvatar>
      <IressAvatar mode={50}>TL</IressAvatar>
      <IressAvatar mode={10}>JD</IressAvatar>
      <IressAvatar mode={40}>AB</IressAvatar>
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
      <IressAvatar mode={30}>MT</IressAvatar>
      <IressAvatar mode={20}>HM</IressAvatar>
      <IressAvatar mode={50}>TL</IressAvatar>
      <IressAvatar mode={10}>JD</IressAvatar>
    </IressAvatarGroup>
  ),
};
