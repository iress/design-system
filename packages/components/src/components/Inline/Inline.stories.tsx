import { Meta, StoryObj } from '@storybook/react';

import { IressInline } from '.';
import { IressPlaceholder } from '../Placeholder';
import { IressPanel } from '../Panel';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressStack } from '../Stack';
import { CurrentBreakpoint } from '@iress-oss/ids-storybook-config';
import { IressText } from '../Text';
import { IressContainer } from '../Container';
import { GUTTER_SIZES, HORIZONTAL_ALIGNS, VERTICAL_ALIGNS } from '@/constants';

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
} as Meta<typeof IressInline>;

export const Default: Story = {
  args: {
    children: 'uneven',
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
          <IressInline {...args} gutter={gutter} />
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
      <IressInline {...args} />
    </IressStack>
  ),
};

export const HorizontalAlign: Story = {
  ...Default,
  args: {
    children: 'even',
    gutter: 'sm',
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['horizontalAlign']),
  },
  render: (args) => (
    <IressContainer>
      <IressStack gutter="xl">
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
    gutter: 'sm',
    horizontalAlign: 'center',
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['verticalAlign']),
  },
  render: (args) => (
    <IressContainer>
      <IressStack gutter="xl">
        {VERTICAL_ALIGNS.map((verticalAlign) => (
          <IressText key={verticalAlign} align="center">
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
    gutter: 'lg',
    noWrap: true,
  },
};
