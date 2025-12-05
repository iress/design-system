import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressButton, type IressButtonProps } from './Button';
import {
  disableArgTypes,
  CurrentBreakpoint,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';
import { IressText } from '../Text';
import { IressIcon } from '../Icon';
import { IressBadge } from '../Badge';
import { IressInline } from '../Inline';
import { IressStack } from '../Stack';
import { RoutingButton } from './mocks/RoutingButton';
import RoutingButtonSource from './mocks/RoutingButton.tsx?raw';

type ButtonStory = StoryObj<IressButtonProps>;
type AnchorStory = StoryObj<IressButtonProps<undefined, string>>;

export default {
  title: 'Components/Button',
  component: IressButton,
  tags: ['updated'],
} as Meta<typeof IressButton>;

export const Default: ButtonStory = {
  args: {
    children: 'Button',
  },
};

export const Mode: ButtonStory = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: ({ children, ...args }) => (
    <IressInline gap="md">
      <IressButton mode="primary" {...args}>
        {children === '' ? 'Primary button' : children}
      </IressButton>
      <IressButton mode="secondary" {...args}>
        {children === '' ? 'Secondary button' : children}
      </IressButton>
      <IressButton mode="tertiary" {...args}>
        {children === '' ? 'Tertiary button' : children}
      </IressButton>
    </IressInline>
  ),
};

export const Status: ButtonStory = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['mode', 'status']),
  },
  render: ({ children, ...args }) => (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressButton mode="primary" status="success" {...args}>
          {children === '' ? 'Primary button' : children}
        </IressButton>
        <IressButton mode="secondary" status="success" {...args}>
          {children === '' ? 'Secondary button' : children}
        </IressButton>
        <IressButton mode="tertiary" status="success" {...args}>
          {children === '' ? 'Tertiary button' : children}
        </IressButton>
      </IressInline>
      <IressInline gap="md">
        <IressButton mode="primary" status="danger" {...args}>
          {children === '' ? 'Primary button' : children}
        </IressButton>
        <IressButton mode="secondary" status="danger" {...args}>
          {children === '' ? 'Secondary button' : children}
        </IressButton>
        <IressButton mode="tertiary" status="danger" {...args}>
          {children === '' ? 'Tertiary button' : children}
        </IressButton>
      </IressInline>
    </IressStack>
  ),
};

export const Types: ButtonStory = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['type']),
  },
  render: ({ children, ...args }) => (
    <IressInline gap="md">
      <IressButton type="button" {...args}>
        {children === '' ? 'button' : children}
      </IressButton>
      <IressButton type="submit" {...args}>
        {children === '' ? 'submit' : children}
      </IressButton>
      <IressButton type="reset" {...args}>
        {children === '' ? 'reset' : children}
      </IressButton>
    </IressInline>
  ),
};

export const Loading: ButtonStory = {
  args: {
    loading: true,
    children: 'Button text',
  },
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: ({ children, ...args }) => (
    <IressInline gap="md">
      <IressButton {...args} mode="primary">
        {children}
      </IressButton>
      <IressButton {...args} mode="secondary">
        {children}
      </IressButton>
      <IressButton {...args} mode="tertiary">
        {children}
      </IressButton>
    </IressInline>
  ),
};

export const ButtonsAsLinks: AnchorStory = {
  args: {
    children: 'This is a link (anchor tag)',
    href: 'https://www.iress.com/',
    rel: 'opener noreferrer',
    target: '_blank',
  },
  argTypes: {
    ...disableArgTypes(['target', 'rel']),
  },
};

export const DeleteConfirmation: ButtonStory = {
  args: {
    status: 'danger',
    children: 'Delete button with confirm',
    onClick: () => confirm('TODO: Change this to a modal'),
  },
};

export const Fluid: ButtonStory = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['fluid']),
  },
  render: ({ children, ...args }) => (
    <IressInline gap="md">
      <IressText element="p">
        Please resize your screen to see how the fluid value changes. Current
        breakpoint: <CurrentBreakpoint renderLabel="and-above" />.
      </IressText>
      <IressButton fluid {...args}>
        {children === '' ? 'Always fluid' : children}
      </IressButton>
      <IressButton fluid="md" {...args}>
        {children === '' ? 'Fluid on xs and sm' : children}
      </IressButton>
    </IressInline>
  ),
};

export const WrappingText: ButtonStory = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['children', 'noWrap']),
  },
  render: (args) => (
    <IressText style={{ width: 250 }}>
      <p>
        <IressButton {...args}>
          Button with lots of text content that will wrap (default behaviour)
        </IressButton>
      </p>

      <p>
        <IressButton style={{ minWidth: 300 }}>
          Button with lots of text content and a minimum width set via CSS
        </IressButton>
      </p>

      <p>
        <IressButton noWrap>
          Button with lots of text content with the noWrap prop set to true
        </IressButton>
      </p>
    </IressText>
  ),
};

export const Slots: ButtonStory = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['children', 'prepend']),
  },
  render: (args) => (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressButton {...args} prepend={<IressIcon name="home" />}>
          Prepend icon
        </IressButton>

        <IressButton
          {...args}
          prepend={<IressBadge mode="info">New</IressBadge>}
        >
          Prepend badge
        </IressButton>
      </IressInline>

      <IressInline gap="md">
        <IressButton {...args} append={<IressIcon name="home" />}>
          Append icon
        </IressButton>

        <IressButton
          {...args}
          append={<IressBadge mode="info">+999</IressBadge>}
        >
          Append badge
        </IressButton>
      </IressInline>

      <IressInline gap="md">
        <IressButton {...args}>
          <IressIcon name="home" />
        </IressButton>
      </IressInline>
    </IressStack>
  ),
};

export const Attrs: ButtonStory = {
  args: {
    children: 'Button text',
  },
  render: (args) => <IressButton {...args} data-analytics-id="test" />,
};

export const DownloadButton: AnchorStory = {
  args: {
    href: 'assets/iress-logo.png',
    children: 'Download logo',
  },
  render: (args) => (
    <IressButton {...args} download prepend={<IressIcon name="download" />} />
  ),
};

export const ExternalLink: AnchorStory = {
  args: {
    href: '//iress.com',
    children: 'Open in new window',
    target: '_blank',
  },
  render: (args) => (
    <IressButton {...args} append={<IressIcon name="external-link" />} />
  ),
};

export const Element: ButtonStory = {
  render: () => <RoutingButton />,
  parameters: {
    ...withCustomSource(RoutingButtonSource),
  },
};
