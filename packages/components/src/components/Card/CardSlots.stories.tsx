import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCard, type IressCardProps } from './Card';
import { CardAllSlots } from './mocks/CardAllSlots';
import CardAllSlotsSource from './mocks/CardAllSlots.tsx?raw';
import {
  SUPPORTED_CARD_SLOTS,
  supportedCardSlots,
} from './mocks/supportedCardSlots';
import supportedCardSlotsSource from './mocks/supportedCardSlots.tsx?raw';
import { disableArgTypes, withSource } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressCardProps>;

export default {
  title: 'Components/Card/Slots',
  component: IressCard,
  parameters: {
    actions: {
      disable: true,
    },
    docs: {
      description: {
        component:
          'The Card component provides several render props for different sections of the card. These stories demonstrate how to use these render props to customize the content and layout of the card.',
      },
    },
    idsConfig: {
      autodocsTemplate: 'default',
    },
  },
  tags: ['updated'],
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
    stretch: true,
  },
  argTypes: {
    ...disableArgTypes(SUPPORTED_CARD_SLOTS),
  },
  render: (args) => <CardAllSlots {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(
      CardAllSlotsSource.replace('args: IressCardProps', '')
        .replace(
          `import { SUPPORTED_CARD_SLOTS, SupportedCardSlots } from './supportedCardSlots';`,
          supportedCardSlotsSource.replace(/export /g, ''),
        )
        .replace(`(args)`, '(supportedCardSlots)'),
      { stripImports: true, stripExportFunction: true },
    ),
  },
};
