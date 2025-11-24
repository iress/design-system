import { type StoryObj, type Meta } from '@storybook/react-vite';

import { IressToggle } from '.';
import { IressPanel } from '../Panel';
import { IressText } from '../Text';
import { IressStack } from '../Stack';
import {
  disableArgTypes,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';
import { ControlledToggle } from './mocks/ControlledToggle';
import ControlledToggleSource from './mocks/ControlledToggle.tsx?raw';

type Story = StoryObj<typeof IressToggle>;

export default {
  title: 'Components/Toggle',
  component: IressToggle,
  tags: ['updated'],
} as Meta<typeof IressToggle>;

export const Default: Story = {
  args: {
    children: 'Toggle',
    defaultChecked: false,
    hiddenLabel: false,
    layout: 'inline',
  },
};

export const HiddenLabel: Story = {
  args: {
    ...Default.args,
    hiddenLabel: true,
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
  argTypes: disableArgTypes(['checked', 'onChange']),
  render: (args) => <ControlledToggle {...args} />,
  parameters: {
    ...withTransformedRawSource(
      ControlledToggleSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const Layout: Story = {
  args: {
    layout: 'inline',
  },
  argTypes: disableArgTypes(['label', 'checked', 'hiddenLabel', 'layout']),
  render: (args) => (
    <IressStack gap="lg">
      <IressText>
        <h3>inline</h3>
        <IressPanel bg="alt">
          <IressToggle {...args} layout="inline">
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>inline-between</h3>
        <IressPanel bg="alt">
          <IressToggle {...args} layout="inline-between" checked>
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>inline-reverse</h3>
        <IressPanel bg="alt">
          <IressToggle {...args} layout="inline-reverse">
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>stack</h3>
        <IressPanel bg="alt">
          <IressToggle {...args} layout="stack" checked>
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
    </IressStack>
  ),
};
