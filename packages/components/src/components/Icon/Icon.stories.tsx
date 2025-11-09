import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressIcon, type IressIconProps } from './Icon';
import { IressText } from '../Text';
import { IressInline } from '../Inline';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressIconProps>;

export default {
  title: 'Components/Icon',
  component: IressIcon,
  tags: ['updated'],
} as Meta<typeof IressIcon>;

export const Default: Story = {
  args: {
    name: 'home',
  },
};

export const ScreenReaderText: Story = {
  args: {
    ...Default.args,
    screenreaderText: 'Home',
  },
};

export const Flip: Story = {
  args: {
    ...Default.args,
    textStyle: 'typography.heading.1',
  },
  argTypes: {
    ...disableArgTypes(['flip']),
  },
  render: (args) => (
    <IressInline gap="md">
      <IressText textAlign="center">
        <IressIcon {...args} />
        <br />
        (default)
      </IressText>
      <IressText textAlign="center">
        <IressIcon {...args} flip="horizontal" />
        <br />
        horizontal
      </IressText>
      <IressText textAlign="center">
        <IressIcon {...args} flip="vertical" />
        <br />
        vertical
      </IressText>
      <IressText textAlign="center">
        <IressIcon {...args} flip="both" />
        <br />
        both
      </IressText>
    </IressInline>
  ),
};

export const Rotate: Story = {
  args: {
    ...Default.args,
    textStyle: 'typography.heading.1',
  },
  argTypes: {
    ...disableArgTypes(['rotate']),
  },
  render: (args) => (
    <IressInline gap="md">
      <IressText textAlign="center">
        <IressIcon {...args} />
        <br />
        (default)
      </IressText>
      <IressText textAlign="center">
        <IressIcon {...args} rotate={90} />
        <br />
        90
      </IressText>
      <IressText textAlign="center">
        <IressIcon {...args} rotate={180} />
        <br />
        180
      </IressText>
      <IressText textAlign="center">
        <IressIcon {...args} rotate={270} />
        <br />
        270
      </IressText>
    </IressInline>
  ),
};

export const Spin: Story = {
  args: {
    ...Default.args,
    name: 'spinner',
    screenreaderText: 'Loading...',
  },
  argTypes: {
    ...disableArgTypes(['spin']),
  },
  render: (args) => (
    <IressInline gap="md">
      <IressText>
        <IressIcon {...args} spin="half" /> half
      </IressText>
      <IressText>
        <IressIcon {...args} spin={1} /> 1
      </IressText>
      <IressText>
        <IressIcon {...args} spin={2} /> 2
      </IressText>
      <IressText>
        <IressIcon {...args} spin={3} /> 3
      </IressText>
    </IressInline>
  ),
};

export const FixedWidth: Story = {
  args: {
    ...Default.args,
    bg: 'colour.neutral.30',
    textStyle: 'typography.heading.1',
  },
  argTypes: {
    ...disableArgTypes(['name', 'fixedWidth']),
  },
  render: (args) => (
    <IressInline gap="md">
      <div>
        <IressText element="h2" textStyle="typography.heading.5">
          Default width
        </IressText>
        <IressIcon {...args} name="space-shuttle" />
        <br />
        <IressIcon {...args} name="wine-glass-alt" />
      </div>
      <div>
        <IressText element="h2" textStyle="typography.heading.5">
          Fixed width
        </IressText>
        <IressIcon {...args} name="space-shuttle" fixedWidth />
        <br />
        <IressIcon {...args} name="wine-glass-alt" fixedWidth />
      </div>
    </IressInline>
  ),
};

export const ExternalLink: Story = {
  args: {
    ...Default.args,
    name: 'external-link',
    pl: 'spacing.150',
  },
  render: (args) => (
    <IressText>
      <a href="https://www.iress.com/" target="_blank" rel="noreferrer">
        Go to this link
        <IressIcon {...args} />
      </a>
    </IressText>
  ),
};
