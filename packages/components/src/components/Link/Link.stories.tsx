import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressIcon } from '../Icon';
import { IressInline } from '../Inline';
import { IressLink } from './Link';
import { IressPanel } from '../Panel';
import { RoutingLink } from './mocks/RoutingLink';
import RoutingLinkSource from './mocks/RoutingLink.tsx?raw';
import {
  disableArgTypes,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressLink>;

export default {
  title: 'Components/Link',
  component: IressLink,
  tags: ['updated'],
} as Meta<typeof IressLink>;

export const Default: Story = {
  args: {
    children: 'IressLink',
    href: '//iress.com',
  },
  render: (args) => (
    <IressPanel>
      Hello, I am a paragraph with an <IressLink {...args} /> inside.
    </IressPanel>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Link text',
  },
};

export const Slots: Story = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['children', 'prepend', 'append']),
  },
  render: (args) => (
    <IressInline gap="md">
      <IressLink {...args} prepend={<IressIcon name="home" />}>
        Prepend icon
      </IressLink>

      <IressLink {...args} append={<IressIcon name="home" />}>
        Append icon
      </IressLink>
    </IressInline>
  ),
};

export const ExternalLink: Story = {
  args: {
    href: '//iress.com',
    children: 'Open in new window',
    target: '_blank',
  },
  render: (args) => (
    <IressLink {...args} append={<IressIcon name="external-link" />} />
  ),
};

export const Element: Story = {
  render: () => <RoutingLink />,
  parameters: {
    ...withCustomSource(RoutingLinkSource),
  },
};
