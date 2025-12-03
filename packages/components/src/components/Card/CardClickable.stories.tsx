import { type Meta, type StoryObj } from '@storybook/react';
import { IressCard } from './Card';
import {
  type IressButtonCardProps,
  type IressCardProps,
  type IressLinkCardProps,
} from './Card.types';
import { IressButtonCard } from './components/ButtonCard';
import { IressLinkCard } from './components/LinkCard';
import { withJsxTransformer } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressCardProps>;
type ButtonStory = StoryObj<IressButtonCardProps>;
type LinkStory = StoryObj<IressLinkCardProps>;

export default {
  title: 'Components/Card/Clickable',
  component: IressCard,
  parameters: {
    actions: {
      disable: true,
    },
  },
} as Meta<typeof IressCard>;

export const HeadingOnly: Story = {
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

export const WholeCard: Story = {
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
