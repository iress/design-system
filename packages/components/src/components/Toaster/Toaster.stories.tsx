import { type Meta, type StoryObj } from '@storybook/react';
import { IressToasterProvider } from './ToasterProvider';
import { type IressToasterProviderProps } from './Toaster.types';
import { IressStack } from '../Stack';
import { IressAlert } from '../Alert';
import { ToastStatuses } from './mocks/ToasterStatuses';
import ToastStatusesSource from './mocks/ToasterStatuses.tsx?raw';
import { ToasterPositionExamples } from './mocks/ToasterPositions';
import ToasterPositionExamplesSource from './mocks/ToasterPositions.tsx?raw';
import { SimpleToasterExample } from './mocks/SimpleToasterExample';
import SimpleToasterExampleSource from './mocks/SimpleToasterExample.tsx?raw';
import { ToasterTimeout } from './mocks/ToasterTimeout';
import ToasterTimeoutSource from './mocks/ToasterTimeout.tsx?raw';
import { CloseToastViaProvider } from './mocks/CloseToastViaProvider';
import CloseToastViaProviderSource from './mocks/CloseToastViaProvider.tsx?raw';
import {
  disableArgTypes,
  removeArgTypes,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressToasterProviderProps>;

export default {
  title: 'Components/Toaster',
  component: IressToasterProvider,
  args: {
    container: document.body,
  },
  argTypes: {
    ...disableArgTypes(['container']),
  },
} as Meta<typeof IressToasterProvider>;

export const Provider: Story = {
  args: {
    container: document.body,
  },
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressAlert status="info">
        <code>IressToasterProvider</code> does not change the position on each
        render, it can only be done on the initial render.
      </IressAlert>
      <SimpleToasterExample {...args} />
    </IressStack>
  ),
  parameters: {
    ...withTransformedRawSource(
      SimpleToasterExampleSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const Close: Story = {
  args: {
    container: document.body,
  },
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <CloseToastViaProvider {...args} />,
  parameters: {
    ...withTransformedRawSource(
      CloseToastViaProviderSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const Position: Story = {
  args: {
    ...Provider.args,
  },
  argTypes: {
    ...disableArgTypes(['position']),
  },
  render: (args) => <ToasterPositionExamples {...args} />,
  parameters: {
    ...withTransformedRawSource(
      ToasterPositionExamplesSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const Statuses: Story = {
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <ToastStatuses {...args} />,
  parameters: {
    ...withTransformedRawSource(
      ToastStatusesSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const Timeout: Story = {
  args: {
    ...Provider.args,
  },
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <ToasterTimeout {...args} />,
  parameters: {
    ...withTransformedRawSource(
      ToasterTimeoutSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};
