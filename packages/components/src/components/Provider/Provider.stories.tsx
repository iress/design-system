import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressProvider } from './Provider';
import { AppWithProvider } from './mocks/AppWithProvider';
import AppWithProviderSource from './mocks/AppWithProvider.tsx?raw';
import {
  disableArgTypes,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressProvider>;

export default {
  title: 'Components/Provider',
  component: IressProvider,
  argTypes: {
    ...disableArgTypes(['children']),
    children: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof IressProvider>;

export const Default: Story = {};

export const Provider: Story = {
  render: (_args) => <AppWithProvider />,
  parameters: {
    docs: {
      source: {
        code: AppWithProviderSource,
        language: 'tsx',
      },
    },
  },
};
