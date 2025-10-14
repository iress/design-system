import { type Meta, type StoryObj } from '@storybook/react-vite';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressProvider } from './Provider';
import { AppWithProvider } from './mocks/AppWithProvider';
import AppWithProviderSource from './mocks/AppWithProvider.tsx?raw';

type Story = StoryObj<typeof IressProvider>;

export default {
  title: 'Components/Provider',
  component: IressProvider,
  argTypes: {
    ...disableArgTypes(['children']),
  },
} as Meta<typeof IressProvider>;

export const Provider: Story = {
  render: () => <AppWithProvider />,
  parameters: {
    docs: {
      source: {
        code: AppWithProviderSource,
        language: 'tsx',
      },
    },
  },
};
