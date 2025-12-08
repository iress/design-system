import { type Meta, type StoryObj } from '@storybook/react';
import { IressCard } from './Card';
import { type IressCardProps } from './Card.types';
import { CardAllSlots } from './mocks/CardAllSlots';
import CardAllSlotsSource from './mocks/CardAllSlots.tsx?raw';
import {
  SUPPORTED_CARD_SLOTS,
  supportedCardSlots,
} from './mocks/supportedCardSlots';
import supportedCardSlotsSource from './mocks/supportedCardSlots.tsx?raw';
import {
  disableArgTypes,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressCardProps>;

export default {
  title: 'Components/Card/Slots',
  component: IressCard,
  parameters: {
    actions: {
      disable: true,
    },
  },
} as Meta<typeof IressCard>;

export const Prepend: Story = {
  args: {
    children: "I'm a card using the prepend render prop",
    prepend: supportedCardSlots.prepend,
  },
};

export const TopRight: Story = {
  args: {
    children: "I'm a card using the topRight render prop",
    topRight: supportedCardSlots.topRight,
  },
};

export const Heading: Story = {
  args: {
    children: "I'm a card using the heading render prop",
    heading: supportedCardSlots.heading,
  },
};

export const Media: Story = {
  args: {
    children: "I'm a card using the media render prop",
    media: supportedCardSlots.media,
  },
};

export const Content: Story = {
  args: {
    children: supportedCardSlots.children,
  },
};

export const Footer: Story = {
  args: {
    children: "I'm a card using the footer render prop",
    footer: supportedCardSlots.footer,
  },
};

export const AllSlots: Story = {
  args: {
    ...supportedCardSlots,
  },
  argTypes: {
    ...disableArgTypes(SUPPORTED_CARD_SLOTS),
  },
  render: (args) => <CardAllSlots {...args} />,
  parameters: {
    ...withCustomSource(
      CardAllSlotsSource.replace('args: IressCardProps', '')
        .replace(
          `import { SUPPORTED_CARD_SLOTS, SupportedCardSlots } from './supportedCardSlots';`,
          supportedCardSlotsSource.replace(/export /g, ''),
        )
        .replace(`(args)`, '(supportedCardSlots)'),
    ),
  },
};
