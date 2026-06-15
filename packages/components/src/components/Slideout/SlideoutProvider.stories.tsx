import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSlideoutProvider, type IressSlideoutProviderProps } from '.';
import { AppWithSlideoutProvider } from './mocks/AppWithSlideoutProvider';
import AppWithSlideoutProviderSource from './mocks/AppWithSlideoutProvider.tsx?raw';
import { disableArgTypes, withSource } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressSlideoutProviderProps>;

export default {
  title: 'Components/Slideout/Provider',
  component: IressSlideoutProvider,
  argTypes: {
    ...disableArgTypes(['children', 'container']),
  },
  parameters: {
    actions: {
      disable: true,
    },
  },
  tags: ['updated'],
} as Meta<typeof IressSlideoutProvider>;

export const Provider: Story = {
  render: (_args) => <AppWithSlideoutProvider />,
  parameters: {
    controls: { disable: true },
    ...withSource(AppWithSlideoutProviderSource, { stripImports: true }),
  },
};
