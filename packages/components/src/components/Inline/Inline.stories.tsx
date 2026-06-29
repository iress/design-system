import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressInline } from '.';
import { IressPlaceholder } from '../Placeholder';
import { IressPanel } from '../Panel';
import { IressStack } from '../Stack';
import { IressText } from '../Text';
import { IressContainer } from '../Container';
import { HORIZONTAL_ALIGNS, VERTICAL_ALIGNS } from '@/constants';
import { SPACING_AND_ALIAS_TOKENS } from '@theme-preset/tokens/spacing';
import {
  componentStoryMeta,
  disableArgTypes,
  withBreakpointLabel,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressInline>;

const childrenOptions = {
  even: [
    <IressPlaceholder key="1-even" width="50" style={{ minHeight: '50px' }} />,
    <IressPlaceholder key="2-even" width="50" style={{ minHeight: '50px' }} />,
    <IressPlaceholder key="3-even" width="50" style={{ minHeight: '50px' }} />,
    <IressPlaceholder key="4-even" width="50" style={{ minHeight: '50px' }} />,
    <IressPlaceholder key="5-even" width="50" style={{ minHeight: '50px' }} />,
  ],
  uneven: [
    <IressPlaceholder
      key="1-uneven"
      width="50"
      style={{ minHeight: '30px' }}
    />,
    <IressPlaceholder
      key="2-uneven"
      width="50"
      style={{ minHeight: '50px' }}
    />,
    <IressPlaceholder
      key="3-uneven"
      width="50"
      style={{ minHeight: '80px' }}
    />,
    <IressPlaceholder
      key="4-uneven"
      width="50"
      style={{ minHeight: '60px' }}
    />,
    <IressPlaceholder
      key="5-uneven"
      width="50"
      style={{ minHeight: '10px' }}
    />,
  ],
  story: [
    <IressPlaceholder
      key="hero"
      width="100px"
      height="100px"
      style={{ minWidth: '100px' }}
    ></IressPlaceholder>,
    <IressText key="text">
      His head is gone, it is like it is been erased... Erased from existence.
      That was the day I invented time travel. I remember it vividly. I was
      standing on the edge of my toilet hanging a clock, the porces was wet, I
      slipped, hit my head on the edge of the sink. And when I came to I had a
      revelation, a picture, a picture in my head, a picture of this. This is
      what makes time travel possible. The flux capacitor.
    </IressText>,
  ],
};

export default {
  title: 'Components/Inline',
  component: IressInline,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: {
        control: {
          type: 'select',
        },
        options: Object.keys(childrenOptions),
        mapping: childrenOptions,
      },
    },
  }),
} as Meta<typeof IressInline>;

export const Default: Story = {
  args: {
    children: 'uneven',
    gap: 'spacing.4',
  },
  render: (args) => (
    <IressInline {...args}>
      <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
    </IressInline>
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
    <IressStack gap="spacing.10">
      <IressText element="h3">spacing.1</IressText>
      <IressInline {...args} gap="spacing.1">
        <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      </IressInline>
      <IressText element="h3">spacing.4</IressText>
      <IressInline {...args} gap="spacing.4">
        <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      </IressInline>
      <IressText element="h3">spacing.8</IressText>
      <IressInline {...args} gap="spacing.8">
        <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      </IressInline>
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
    <IressInline {...args}>
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
  ),
  decorators: [withBreakpointLabel()],
};

export const HorizontalAlign: Story = {
  ...Default,
  args: {
    children: 'even',
    gap: 'spacing.2',
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['horizontalAlign']),
  },
  render: (args) => (
    <IressContainer>
      <IressStack gap="spacing.10">
        <IressText element="h3">left</IressText>
        <IressInline {...args} horizontalAlign="left">
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        </IressInline>
        <IressText element="h3">center</IressText>
        <IressInline {...args} horizontalAlign="center">
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        </IressInline>
        <IressText element="h3">right</IressText>
        <IressInline {...args} horizontalAlign="right">
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        </IressInline>
        <IressText element="h3">between</IressText>
        <IressInline {...args} horizontalAlign="between">
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
        </IressInline>
      </IressStack>
    </IressContainer>
  ),
};

export const VerticalAlign: Story = {
  ...Default,
  args: {
    children: 'uneven',
    gap: 'spacing.2',
    horizontalAlign: 'center',
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['verticalAlign']),
  },
  render: (args) => (
    <IressContainer>
      <IressStack gap="spacing.10">
        <IressText element="h3">top</IressText>
        <IressInline {...args} verticalAlign="top">
          <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
        </IressInline>
        <IressText element="h3">middle</IressText>
        <IressInline {...args} verticalAlign="middle">
          <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
        </IressInline>
        <IressText element="h3">bottom</IressText>
        <IressInline {...args} verticalAlign="bottom">
          <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
        </IressInline>
        <IressText element="h3">stretch</IressText>
        <IressInline {...args} verticalAlign="stretch">
          <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
          <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
        </IressInline>
      </IressStack>
    </IressContainer>
  ),
};

export const NoWrap: Story = {
  ...Default,
  args: {
    children: 'even',
    gap: 'spacing.4',
    noWrap: true,
  },
  render: (args) => (
    <IressInline {...args}>
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
  ),
};
