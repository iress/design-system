import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCard, type IressCardProps } from './Card';
import { IressRow } from '../Row';
import { IressCol } from '../Col';
import { IressStack } from '../Stack';

type Story = StoryObj<IressCardProps>;

export default {
  title: 'Components/Card',
  component: IressCard,
  parameters: {
    actions: {
      disable: true,
    },
  },
  tags: ['updated'],
} as Meta<typeof IressCard>;

export const Default: Story = {
  args: {
    children: "I'm a card",
  },
};

export const Simple: Story = {
  args: {
    ...Default.args,
    children: "I'm a simple card",
  },
};

export const Padding: Story = {
  args: {
    ...Default.args,
  },
  render: ({ ...args }) => (
    <IressStack gap="md">
      <IressCard {...args} p="none">
        I&rsquo;m a card with no padding
      </IressCard>
      <IressCard {...args} p="xs">
        I&rsquo;m a card with xs padding
      </IressCard>
      <IressCard {...args} p="sm">
        I&rsquo;m a card with sm padding
      </IressCard>
      <IressCard {...args} p="md">
        I&rsquo;m a card with sm padding
      </IressCard>
    </IressStack>
  ),
};

export const Stretch: Story = {
  args: {
    ...Default.args,
  },
  render: ({ ...args }) => (
    <IressRow gutter="md" verticalAlign="stretch">
      <IressCol>
        <IressCard {...args} stretch>
          I&rsquo;m a stretched card
        </IressCard>
      </IressCol>
      <IressCol>
        <IressCard {...args}>
          I&rsquo;m a card with lots of content. Blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah.
        </IressCard>
      </IressCol>
    </IressRow>
  ),
};

export const Selected: Story = {
  args: {
    ...Default.args,
    children: "I'm a selected card",
    selected: true,
  },
};
