import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  type IressButtonCardProps,
  IressCard,
  type IressLinkCardProps,
  type IressCardProps,
  IressButtonCard,
  IressLinkCard,
} from './Card';
import { IressRow } from '../Row';
import { IressCol } from '../Col';
import { IressStack } from '../Stack';
import { IressIcon } from '../Icon';
import { IressInline } from '../Inline';
import { IressTag } from '../Tag';
import { IressPill } from '../Pill';
import { IressPanel } from '../Panel';
import { IressContextualMenu } from '@/main';
import {
  componentStoryMeta,
  reactNodeArgType,
  withJsxTransformer,
  withSource,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';
import { CardAllSlots } from './mocks/CardAllSlots';
import CardAllSlotsSource from './mocks/CardAllSlots.tsx?raw';

type Story = StoryObj<IressCardProps>;
type ButtonStory = StoryObj<IressButtonCardProps>;
type LinkStory = StoryObj<IressLinkCardProps>;

export default {
  title: 'Components/Card',
  component: IressCard,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
      footer: reactNodeArgType,
      heading: reactNodeArgType,
      media: reactNodeArgType,
      prepend: reactNodeArgType,
      topRight: reactNodeArgType,
    },
    idsConfig: {
      tabDescriptions: {
        slots:
          'Cards have several slots for rendering different types of content. Use these slots to build more complex card layouts and designs.',
      },
    },
    parameters: {
      actions: { disable: true },
    },
  }),
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

export const NoBorder: Story = {
  args: {
    ...Default.args,
    noBorder: true,
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
        I&rsquo;m a card with md padding
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

export const ClickableHeading: Story = {
  args: {
    children:
      "I'm a card with a clickable heading. NEVER use me when the whole card is clickable.",
    heading: (
      <h2>
        <a href="https://iress.com">Clickable heading</a>
      </h2>
    ),
  },
};

export const ClickableCard: Story = {
  args: {
    role: 'button',
    onClick: () => alert('Card clicked'),
    onKeyDown: () => alert('Key down on card (for keyboard users)'),
    children:
      'I am a card with an onClick handler. Click me to see what happens.',
    tabIndex: 0,
  },
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};

export const ButtonCard: ButtonStory = {
  args: {
    type: 'button',
    onClick: () => alert('Card clicked'),
  },
  render: ({ ...args }) => (
    <IressButtonCard {...args}>
      I am a card with a button element
    </IressButtonCard>
  ),
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};

export const LinkCard: LinkStory = {
  args: {
    href: 'https://iress.com',
    target: '_blank',
  },
  render: ({ ...args }) => (
    <IressLinkCard {...args}>I am a card with an anchor element</IressLinkCard>
  ),
};

// Slot stories (merged from CardSlots.stories.tsx)

export const Prepend: Story = {
  tags: ['tab:slots'],
  args: {
    children: "I'm a card using the prepend render prop",
    prepend: <IressIcon name="star" />,
  },
};

export const TopRight: Story = {
  tags: ['tab:slots'],
  args: {
    children: "I'm a card using the topRight render prop",
    topRight: (
      <IressContextualMenu>
        <IressPanel>More actions in here</IressPanel>
      </IressContextualMenu>
    ),
  },
};

export const Heading: Story = {
  tags: ['tab:slots'],
  args: {
    children: "I'm a card using the heading render prop",
    heading: <h2>Welcome to Iress!</h2>,
  },
};

export const Media: Story = {
  tags: ['tab:slots'],
  args: {
    children: "I'm a card using the media render prop",
    media: (
      <img
        src="https://www.iress.com/media/images/media-contact.width-600.png"
        width="250"
        alt="A man in an Iress branded t-shirt smiles at the camera"
      />
    ),
  },
};

export const Footer: Story = {
  tags: ['tab:slots'],
  args: {
    children: "I'm a card using the footer render prop",
    footer: (
      <IressInline gap="sm" horizontalAlign="between" verticalAlign="middle">
        <IressInline gap="sm">
          <IressTag mode="30">#new-starter</IressTag>
          <IressTag mode="60">#first-day</IressTag>
        </IressInline>
        <IressPill mode="70">NEW</IressPill>
      </IressInline>
    ),
  },
};

export const AllSlots: Story = {
  tags: ['tab:slots'],
  render: (args) => <CardAllSlots {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(CardAllSlotsSource, {
      stripImports: true,
    }),
  },
};
