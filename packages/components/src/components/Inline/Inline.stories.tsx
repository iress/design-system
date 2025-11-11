import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressInline } from '.';
import { IressPlaceholder } from '../Placeholder';
import { IressPanel } from '../Panel';
import { IressStack } from '../Stack';
import { IressText } from '../Text';
import { IressContainer } from '../Container';
import { HORIZONTAL_ALIGNS, VERTICAL_ALIGNS } from '@/constants';
import { SPACING_TOKENS } from '@theme-preset/tokens/spacing';
import {
  CurrentBreakpoint,
  disableArgTypes,
} from '@iress-oss/ids-storybook-config';

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
} as Meta<typeof IressInline>;

export const Default: Story = {
  args: {
    children: 'uneven',
    gap: 'spacing.400',
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
    <IressStack gap="spacing.1200">
      {SPACING_TOKENS.map((spacing) => (
        <IressText key={spacing}>
          <h2>{spacing}</h2>
          <IressInline {...args} gap={spacing} />
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
      xs: 'spacing.100',
      sm: 'spacing.200',
      md: 'spacing.400',
    },
  },
  render: (args) => (
    <IressStack gap="spacing.400">
      <IressPanel>
        <p>
          Current breakpoint: <CurrentBreakpoint />.
        </p>
        <p>
          <code>gap=&#123;{JSON.stringify(args.gap)}&#125;</code>
        </p>
      </IressPanel>
      <IressInline {...args} />
    </IressStack>
  ),
};

export const HorizontalAlign: Story = {
  ...Default,
  args: {
    children: 'even',
    gap: 'spacing.200',
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['horizontalAlign']),
  },
  render: (args) => (
    <IressContainer>
      <IressStack gap="spacing.1200">
        {HORIZONTAL_ALIGNS.map((horizontalAlign) => (
          <IressText key={horizontalAlign}>
            <h2>{horizontalAlign}</h2>
            <IressInline {...args} horizontalAlign={horizontalAlign} />
          </IressText>
        ))}
      </IressStack>
    </IressContainer>
  ),
};

export const VerticalAlign: Story = {
  ...Default,
  args: {
    children: 'uneven',
    gap: 'spacing.200',
    horizontalAlign: 'center',
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['verticalAlign']),
  },
  render: (args) => (
    <IressContainer>
      <IressStack gap="spacing.1200">
        {VERTICAL_ALIGNS.map((verticalAlign) => (
          <IressText key={verticalAlign} textAlign="center">
            <h2>{verticalAlign}</h2>
            <IressInline {...args} verticalAlign={verticalAlign} />
          </IressText>
        ))}
      </IressStack>
    </IressContainer>
  ),
};

export const NoWrap: Story = {
  ...Default,
  args: {
    children: 'story',
    gap: 'spacing.1200',
    noWrap: true,
  },
};
