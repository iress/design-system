import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressPlaceholder } from '../Placeholder';
import { IressPanel } from '../Panel';
import { IressStack } from '.';
import { IressText } from '../Text';
import { IressButton } from '../Button';
import { IressInline } from '../Inline';
import { SPACING_AND_ALIAS_TOKENS } from '@theme-preset/tokens/spacing';
import {
  componentStoryMeta,
  disableArgTypes,
  reactNodeArgType,
  withBreakpointLabel,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

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
  list: [
    <li key="1">List item 1</li>,
    <li key="2">List item 2</li>,
    <li key="3">List item 3</li>,
  ],
};

export default {
  title: 'Components/Stack',
  component: IressStack,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: {
        ...reactNodeArgType,
        control: {
          type: 'select',
        },
        options: Object.keys(childrenOptions),
        mapping: childrenOptions,
      },
    },
  }),
} as Meta<typeof IressStack>;

export const Default: Story = {
  args: {
    children: 'even',
    gap: 'spacing.1',
  },
  render: (args) => (
    <IressStack {...args}>
      <IressPlaceholder height="50" />
      <IressPlaceholder height="50" />
      <IressPlaceholder height="50" />
    </IressStack>
  ),
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
      <IressText element="h3">spacing.1</IressText>
      <IressStack {...args} gap="spacing.1">
        <IressPlaceholder height="50" />
        <IressPlaceholder height="50" />
        <IressPlaceholder height="50" />
      </IressStack>
      <IressText element="h3">spacing.4</IressText>
      <IressStack {...args} gap="spacing.4">
        <IressPlaceholder height="50" />
        <IressPlaceholder height="50" />
        <IressPlaceholder height="50" />
      </IressStack>
      <IressText element="h3">spacing.8</IressText>
      <IressStack {...args} gap="spacing.8">
        <IressPlaceholder height="50" />
        <IressPlaceholder height="50" />
        <IressPlaceholder height="50" />
      </IressStack>
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
    <IressStack {...args}>
      <IressPlaceholder height="50" />
      <IressPlaceholder height="50" />
      <IressPlaceholder height="50" />
    </IressStack>
  ),
  decorators: [withBreakpointLabel()],
};

export const InlineChildren: Story = {
  args: {
    children: 'inlineChildren',
    gap: 'spacing.4',
  },
  render: (args) => (
    <IressStack {...args}>
      <IressPanel bg="alt">Panel 1 (block)</IressPanel>
      <span>I am a block span with the same margin</span>
      <IressPanel bg="alt">Panel 2 (block)</IressPanel>
    </IressStack>
  ),
};

export const Lists: Story = {
  args: {
    children: 'list',
    gap: 'spacing.7',
    element: 'ul',
  },
  render: (args) => (
    <IressStack {...args}>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </IressStack>
  ),
};

export const VerticalAlign: Story = {
  args: {
    children: 'even',
    gap: 'spacing.4',
    verticalAlign: 'bottom',
  },
  render: (args) => (
    <IressPanel style={{ height: '300px' }}>
      <IressStack {...args} stretch>
        <IressPlaceholder height="50" />
        <IressPlaceholder height="50" />
        <IressPlaceholder height="50" />
      </IressStack>
    </IressPanel>
  ),
};
