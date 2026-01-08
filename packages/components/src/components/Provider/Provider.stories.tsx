import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressProvider } from './Provider';
import { AppWithProvider } from './mocks/AppWithProvider';
import AppWithProviderSource from './mocks/AppWithProvider.tsx?raw';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

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
