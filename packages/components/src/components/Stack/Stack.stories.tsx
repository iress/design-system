import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressPlaceholder } from '../Placeholder';
import { IressPanel } from '../Panel';
import { IressStack } from '.';
import { IressText } from '../Text';
import { IressButton } from '../Button';
import { IressInline } from '../Inline';
import { SPACING_TOKENS } from '@theme-preset/tokens/spacing';
import {
  CurrentBreakpoint,
  disableArgTypes,
} from '@iress-oss/ids-storybook-config';

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
    <IressPanel key="block-1" bg="alt">
      Panel 1 (block)
    </IressPanel>,
    <span key="block-2">I am a block span with the same margin</span>,
    <IressPanel key="block-3" bg="alt">
      Panel 2 (block)
    </IressPanel>,
    <IressInline key="block-4">
      <IressButton key="inline-1">Button 1</IressButton>
      <IressButton key="inline-2">Button 2</IressButton>
      <IressButton key="inline-3">Button 3</IressButton>
    </IressInline>,
    <IressPanel key="block-5" bg="alt">
      Panel 3 (block)
    </IressPanel>,
  ],
  list: [<li>List item 1</li>, <li>List item 2</li>, <li>List item 3</li>],
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
  tags: ['updated'],
} as Meta<typeof IressStack>;

export const Default: Story = {
  args: {
    children: 'even',
    gap: 'spacing.1',
  },
};

export const Gap: Story = {
  ...Default,
  args: {
    children: 'even',
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['gap']),
  },
  render: (args) => (
    <IressStack gap="spacing.4">
      {SPACING_TOKENS.map((spacing) => (
        <IressText key={spacing}>
          <h2>{spacing}</h2>
          <IressStack {...args} gap={spacing as never} />
        </IressText>
      ))}
    </IressStack>
  ),
};

export const ResponsiveGap: Story = {
  ...Default,
  args: {
    children: 'even',
    gap: {
      xs: 'spacing.1',
      sm: 'spacing.2',
      md: 'spacing.4',
    },
  },
  render: (args) => (
    <IressStack gap="spacing.4">
      <IressPanel>
        <p>
          Current breakpoint: <CurrentBreakpoint />.
        </p>
        <p>
          <code>gap=&#123;{JSON.stringify(args.gap)}&#125;</code>
        </p>
      </IressPanel>
      <IressStack {...args} />
    </IressStack>
  ),
};

export const InlineChildren: Story = {
  args: {
    children: 'inlineChildren',
    gap: 'spacing.4',
  },
};

export const Lists: Story = {
  args: {
    children: 'list',
    gap: 'spacing.7',
    element: 'ul',
  },
};
