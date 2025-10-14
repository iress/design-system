import { Meta, StoryObj } from '@storybook/react';

import { IressPlaceholder } from '../Placeholder';
import { IressPanel } from '../Panel';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressStack } from '.';
import { CurrentBreakpoint } from '@iress-storybook/components';
import { IressText } from '../Text';
import { IressButton } from '../Button';
import { GUTTER_SIZES } from '@/constants';

type Story = StoryObj<typeof IressStack>;

const childrenOptions = {
  even: [
    <IressPlaceholder key="1-even" height="50" />,
    <IressPlaceholder key="2-even" height="50" />,
    <IressPlaceholder key="3-even" height="50" />,
    <IressPlaceholder key="4-even" height="50" />,
    <IressPlaceholder key="5-even" height="50" />,
  ],
  inlineChildren: [
    <IressPanel key="inline-1" background="alt">
      Panel 1 (block)
    </IressPanel>,
    <span key="inline-2">I am a (inline) span so will get no margin</span>,
    <IressPanel key="inline-3" background="alt">
      Panel 2 (block)
    </IressPanel>,
    <IressButton key="inline-4">Button 1</IressButton>,
    <IressButton key="inline-5">Button 2</IressButton>,
    <IressButton key="inline-6">Button 3</IressButton>,
    <IressPanel key="inline-7" background="alt">
      Panel 3 (block)
    </IressPanel>,
  ],
  list: (
    <ul className="iress-u-text">
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ul>
  ),
  wrappedList: (
    <IressText>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    </IressText>
  ),
};

export default {
  title: 'Components/Stack',
  component: IressStack,
  argTypes: {
    children: {
      control: {
        type: 'select',
      },
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
    },
  },
} as Meta<typeof IressStack>;

export const Default: Story = {
  args: {
    children: 'even',
    gutter: 'md',
  },
};

export const Gutter: Story = {
  ...Default,
  args: {
    children: 'even',
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['gutter']),
  },
  render: (args) => (
    <IressStack gutter="xl">
      {GUTTER_SIZES.map((gutter) => (
        <IressText key={gutter}>
          <h2>{gutter}</h2>
          <IressStack {...args} gutter={gutter} />
        </IressText>
      ))}
    </IressStack>
  ),
};

export const ResponsiveGutter: Story = {
  ...Default,
  args: {
    children: 'even',
    gutter: {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
    },
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressPanel>
        <p>
          Current breakpoint: <CurrentBreakpoint />.
        </p>
        <p>
          <code>gutter=&#123;{JSON.stringify(args.gutter)}&#125;</code>
        </p>
      </IressPanel>
      <IressStack {...args} />
    </IressStack>
  ),
};

export const InlineChildren: Story = {
  args: {
    children: 'inlineChildren',
    gutter: 'md',
  },
};

export const Lists: Story = {
  args: {
    children: 'list',
    gutter: 'md',
  },
};

export const WrappedList: Story = {
  args: {
    children: 'wrappedList',
    gutter: 'md',
  },
};
