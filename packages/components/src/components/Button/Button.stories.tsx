import { type Meta, type StoryObj } from '@storybook/react';
import { IressButton } from './Button';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';
import { IressText } from '../Text';
import {
  CurrentBreakpoint,
  disableArgTypes,
} from '@iress-oss/ids-storybook-config';
import { IressIcon } from '../Icon';
import { IressBadge } from '../Badge';
import { BUTTON_MODES, BUTTON_TYPES } from './Button.types';
import { BREAKPOINTS } from '@/constants';

type Story = StoryObj<typeof IressButton>;

export default {
  title: 'Components/Button',
  component: IressButton,
} as Meta<typeof IressButton>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Mode: Story = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: ({ children, ...args }) => (
    <div
      className="iress-u-inline iress--gutter--md"
      style={{ rowGap: 'var(--iress-g-spacing-md' }}
    >
      {BUTTON_MODES.map((mode) => (
        <IressButton mode={mode} {...args} key={mode}>
          {children === '' ? `${capitalizeFirstLetter(mode)} button` : children}
        </IressButton>
      ))}
    </div>
  ),
};

export const Types: Story = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['type']),
  },
  render: ({ children, ...args }) => (
    <div className="iress-u-inline iress--gutter--md">
      {BUTTON_TYPES.map((type) => (
        <IressButton type={type} {...args} key={type}>
          {children === '' ? `${capitalizeFirstLetter(type)} button` : children}
        </IressButton>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Button text',
  },
  render: ({ children, ...args }) => (
    <div className="iress-u-inline iress--gutter--md">
      <IressButton {...args}>{children}</IressButton>
      <IressButton {...args} />
    </div>
  ),
};

export const ButtonsAsLinks: Story = {
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

export const DeleteConfirmation: Story = {
  args: {
    mode: 'danger',
    children: 'Delete button with confirm',
    onClick: () => confirm('TODO: Change this to a modal'),
  },
};

const fluids = [true, ...BREAKPOINTS];
export const Fluid: Story = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['fluid']),
  },
  render: ({ children, ...args }) => (
    <div
      className="iress-u-inline iress--gutter--md"
      style={{ rowGap: 'var(--iress-g-spacing-md' }}
    >
      <IressText element="p">
        Please resize your screen to see how the fluid value changes. Current
        breakpoint: <CurrentBreakpoint renderLabel="and-above" />.
      </IressText>
      {fluids.map((fluid) => (
        <IressButton fluid={fluid} {...args} key={String(fluid)}>
          {children === '' ? `Fluid: ${String(fluid)}` : children}
        </IressButton>
      ))}
    </div>
  ),
};

export const WrappingText: Story = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['children', 'noWrap']),
  },
  render: (args) => (
    <div style={{ width: 250 }}>
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
    </div>
  ),
};

export const Slots: Story = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['children', 'prepend']),
  },
  render: (args) => (
    <>
      <p className="iress-u-inline iress--gutter--md">
        <IressButton {...args} prepend={<IressIcon name="home" />}>
          Prepend icon
        </IressButton>

        <IressButton
          {...args}
          prepend={<IressBadge mode="info">New</IressBadge>}
        >
          Prepend badge
        </IressButton>
      </p>

      <p className="iress-u-inline iress--gutter--md">
        <IressButton {...args} append={<IressIcon name="home" />}>
          Append icon
        </IressButton>

        <IressButton
          {...args}
          append={<IressBadge mode="info">+999</IressBadge>}
        >
          Append badge
        </IressButton>
      </p>

      <p className="iress-u-inline iress--gutter--md">
        <IressButton {...args}>
          <IressIcon name="home" />
        </IressButton>
      </p>
    </>
  ),
};

export const Attrs: Story = {
  args: {
    children: 'Button text',
  },
  render: (args) => <IressButton {...args} data-analytics-id="test" />,
};

export const DownloadButton: Story = {
  args: {
    href: 'assets/iress-logo.png',
    children: 'Download logo',
  },
  render: (args) => (
    <IressButton {...args} download prepend={<IressIcon name="download" />} />
  ),
};

export const ExternalLink: Story = {
  args: {
    href: '//iress.com',
    children: 'Open in new window',
    target: '_blank',
    mode: 'link',
  },
  render: (args) => (
    <IressButton {...args} append={<IressIcon name="external-link" />} />
  ),
};
