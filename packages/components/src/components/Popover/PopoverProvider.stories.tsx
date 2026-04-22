import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPopoverProvider, type IressPopoverProviderProps } from '.';
import { App as AppWithPopoverProvider } from './mocks/AppWithPopoverProvider';
import AppWithPopoverProviderSource from './mocks/AppWithPopoverProvider.tsx?raw';
import {
  disableArgTypes,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressPopoverProviderProps>;

export default {
  title: 'Components/Popover/Provider',
  component: IressPopoverProvider,
  argTypes: {
    ...disableArgTypes(['children', 'container']),
  },
  parameters: {
    actions: {
      disable: true,
    },
  },
  tags: ['beta'],
} as Meta<typeof IressPopoverProvider>;

export const Provider: Story = {
  render: () => <AppWithPopoverProvider />,
  parameters: {
    ...withCustomSource(AppWithPopoverProviderSource),
  },
};
