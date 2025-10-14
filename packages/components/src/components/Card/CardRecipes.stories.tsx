import { Args, Meta, StoryObj } from '@storybook/react';
import { IressCardProps } from './Card.types';
import { IressCard } from './Card';
import { CardUsingHook } from './mocks/CardUsingHook';
import CardUsingHookSource from './mocks/CardUsingHook.tsx?raw';
import {
  stringifyStorybookArgs,
  withTransformedSource,
} from '@iress-storybook/helpers';

type Story = StoryObj<IressCardProps>;

export default {
  title: 'Components/Card/Recipes',
  component: IressCard,
} as Meta<typeof IressCard>;

export const ComposeIDSCard: Story = {
  args: {
    prepend: 'Prepend',
    heading: 'Heading',
    topRight: 'TopRight',
    media: 'Media',
    children: 'Children (default slot)',
    footer: 'Footer',
    onClick: () => alert('You clicked me!'),
  },
  render: (args) => <CardUsingHook {...args} />,
  parameters: {
    ...withTransformedSource((_code, { args }) =>
      CardUsingHookSource.replace('args: IressCardProps', '').replace(
        /args/g,
        stringifyStorybookArgs(args as Args),
      ),
    ),
  },
};
