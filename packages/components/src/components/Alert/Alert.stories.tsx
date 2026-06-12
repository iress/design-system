import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressAlert, type IressAlertProps } from '@/main';
import {
  componentStoryMeta,
  disableArgTypes,
  reactNodeArgType,
  withSource,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { AlertStatus } from './mocks/AlertStatus';
import AlertStatusSource from './mocks/AlertStatus.tsx?raw';
import { AlertFooter } from './mocks/AlertFooter';
import AlertFooterSource from './mocks/AlertFooter.tsx?raw';
import { AlertMultiLine } from './mocks/AlertMultiLine';
import AlertMultiLineSource from './mocks/AlertMultiLine.tsx?raw';
import { AlertVariant } from './mocks/AlertVariant';
import AlertVariantSource from './mocks/AlertVariant.tsx?raw';
import { AlertDismissable } from './mocks/AlertDismissable';
import AlertDismissableSource from './mocks/AlertDismissable.tsx?raw';

type Story = StoryObj<IressAlertProps>;

export default {
  title: 'Components/Alert',
  component: IressAlert,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
      footer: reactNodeArgType,
      heading: reactNodeArgType,
    },
  }),
} as Meta<typeof IressAlert>;

export const Default: Story = {
  args: {
    children: 'This is a simple info alert',
    status: 'info',
  },
};

export const Status: Story = {
  render: (args) => <AlertStatus {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AlertStatusSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const Heading: Story = {
  args: {
    ...Default.args,
    heading: 'Alert heading',
  },
};

export const Actions: Story = {
  render: (args) => <AlertFooter {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AlertFooterSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const MultiLine: Story = {
  render: (args) => <AlertMultiLine {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AlertMultiLineSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const Icon: Story = {
  args: {
    heading: 'Some information',
    multiLine: true,
    icon: false,
    children: 'This is an alert without an icon',
  },
};

export const Variant: Story = {
  render: (args) => <AlertVariant {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AlertVariantSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const Dismissable: Story = {
  args: {
    ...Default.args,
  },
  argTypes: {
    ...disableArgTypes(['status']),
  },
  render: (args) => <AlertDismissable {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AlertDismissableSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};
