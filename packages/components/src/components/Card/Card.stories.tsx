import { type Meta, type StoryObj } from '@storybook/react';
import { IressCard } from './Card';
import { type IressCardProps } from './Card.types';

import { IressRow } from '../Row';
import { IressCol } from '../Col';
import { PADDING_SIZES } from '@/main';

type Story = StoryObj<IressCardProps>;

export default {
  title: 'Components/Card',
  component: IressCard,
  parameters: {
    actions: {
      disable: true,
    },
  },
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
    <div className="iress-u-stack iress--gutter--md">
      {PADDING_SIZES.map((padding) => (
        <IressCard {...args} padding={padding} key={padding}>
          I&rsquo;m a card with {padding} padding
        </IressCard>
      ))}
    </div>
  ),
};

export const Stretch: Story = {
  args: {
    ...Default.args,
  },
  render: ({ ...args }) => (
    <IressRow
      gutter={IressRow.Gutter.Md}
      verticalAlign={IressRow.VerticalAlign.Stretch}
    >
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
