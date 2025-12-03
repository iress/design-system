import { type Meta, type StoryObj } from '@storybook/react';
import {
  type IressSlideoutProps,
  IressSlideoutProvider,
  type IressSlideoutProviderProps,
} from '.';
import { App as AppWithSlideoutProvider } from './mocks/AppWithSlideoutProvider';
import AppWithSlideoutProviderSource from './mocks/AppWithSlideoutProvider.tsx?raw';
import {
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
} from '@iress-oss/ids-storybook-config';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

type CustomArgs = Partial<IressSlideoutProviderProps> & {
  slideout: Partial<IressSlideoutProps>;
};
type Story = StoryObj<CustomArgs>;

export default {
  title: 'Components/Slideout/Provider',
  component: IressSlideoutProvider,
  argTypes: {
    ...disableArgTypes(['children', 'container']),
    slideout: {
      control: 'object',
      description: 'Settings for slideout to be opened by provider',
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
    },
  },
  parameters: {
    actions: {
      disable: true,
    },
  },
} as Meta<typeof IressSlideoutProvider>;

export const Provider: Story = {
  args: {
    slideout: {
      children:
        'This slideout was opened via IressSlideoutProvider and the useSlideout hook.',
    },
  },
  render: (args) => <AppWithSlideoutProvider {...args.slideout} />,
  parameters: {
    ...withCustomSource(AppWithSlideoutProviderSource),
  },
};
