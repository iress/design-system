import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressButton, type IressButtonProps } from './Button';
import {
  disableArgTypes,
  CurrentBreakpoint,
  reactNodeArgType,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import { IressText } from '../Text';
import { IressIcon } from '../Icon';
import { IressInline } from '../Inline';
import { IressPill } from '@/main';
import componentMeta from './meta';

import { ButtonMode } from './mocks/ButtonMode';
import ButtonModeSource from './mocks/ButtonMode.tsx?raw';
import { ButtonStatus } from './mocks/ButtonStatus';
import ButtonStatusSource from './mocks/ButtonStatus.tsx?raw';
import { ButtonLoading } from './mocks/ButtonLoading';
import ButtonLoadingSource from './mocks/ButtonLoading.tsx?raw';
import { ButtonSlots } from './mocks/ButtonSlots';
import ButtonSlotsSource from './mocks/ButtonSlots.tsx?raw';
import { ButtonActive } from './mocks/ButtonActive';
import ButtonActiveSource from './mocks/ButtonActive.tsx?raw';
import { RoutingButton } from './mocks/RoutingButton';
import RoutingButtonSource from './mocks/RoutingButton.tsx?raw';

type ButtonStory = StoryObj<IressButtonProps>;
type AnchorStory = StoryObj<IressButtonProps<undefined, string>>;

export default {
  title: 'Components/Button',
  component: IressButton,
  tags: ['updated'],
  argTypes: {
    append: reactNodeArgType,
    children: reactNodeArgType,
    prepend: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressButton>;

export const Default: ButtonStory = {
  args: {
    children: 'Button',
  },
};

export const Mode: ButtonStory = {
  render: (args) => <ButtonMode {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ButtonModeSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Status: ButtonStory = {
  render: (args) => <ButtonStatus {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ButtonStatusSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Types: ButtonStory = {
  args: {
    children: '',
  },
  argTypes: {
    ...disableArgTypes(['type']),
  },
  render: (args) => (
    <IressInline gap="md">
      <IressButton {...args} type="button">button</IressButton>
      <IressButton {...args} type="submit">submit</IressButton>
      <IressButton {...args} type="reset">reset</IressButton>
    </IressInline>
  ),
};

export const Loading: ButtonStory = {
  render: (args) => <ButtonLoading {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ButtonLoadingSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const ButtonsAsLinks: AnchorStory = {
  args: {
    children: 'This is a link (anchor tag)',
    href: 'https://www.iress.com/',
    rel: 'opener noreferrer',
    target: '_blank',
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
    children: 'Fluid button',
  },
  render: (args) => (
    <IressInline gap="md">
      <IressText element="p">
        Please resize your screen to see how the fluid value changes. Current
        breakpoint: <CurrentBreakpoint renderLabel="and-above" />.
      </IressText>
      <IressButton {...args} fluid>Always fluid</IressButton>
      <IressButton {...args} fluid="md">Fluid on xs and sm</IressButton>
    </IressInline>
  ),
};

export const WrappingText: ButtonStory = {
  render: (args) => (
    <IressText style={{ width: 250 }}>
      <p>
        <IressButton {...args}>
          Button with lots of text content that will wrap (default behaviour)
        </IressButton>
      </p>
      <p>
        <IressButton {...args} style={{ minWidth: 300 }}>
          Button with lots of text content and a minimum width set via CSS
        </IressButton>
      </p>
      <p>
        <IressButton {...args} noWrap>
          Button with lots of text content with the noWrap prop set to true
        </IressButton>
      </p>
    </IressText>
  ),
};

export const Slots: ButtonStory = {
  render: (args) => <ButtonSlots {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ButtonSlotsSource, { stripImports: true, stripExportFunction: true }),
  },
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
  render: (args) => <RoutingButton {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(RoutingButtonSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Active: ButtonStory = {
  render: (args) => <ButtonActive {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ButtonActiveSource, { stripImports: true, stripExportFunction: true }),
  },
};
