import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTooltipProvider, type IressTooltipProviderProps } from '.';
import { App as AppWithTooltipProvider } from './mocks/AppWithTooltipProvider';
import AppWithTooltipProviderSource from './mocks/AppWithTooltipProvider.tsx?raw';
import {
  disableArgTypes,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressTooltipProviderProps>;

export default {
  title: 'Components/Tooltip/Provider',
  component: IressTooltipProvider,
  argTypes: {
    ...disableArgTypes(['children', 'container']),
  },
  parameters: {
    actions: {
      disable: true,
    },
  },
  tags: ['beta'],
} as Meta<typeof IressTooltipProvider>;

export const Provider: Story = {
  render: () => <AppWithTooltipProvider />,
  parameters: {
    ...withCustomSource(AppWithTooltipProviderSource),
  },
};
