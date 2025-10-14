import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  type IressModalProps,
  IressModalProvider,
  type IressModalProviderProps,
} from '.';
import { App as AppWithModalProvider } from './mocks/AppWithModalProvider';
import AppWithModalProviderSource from './mocks/AppWithModalProvider.tsx?raw';
import { disableArgTypes } from '@iress-storybook/helpers';
import { STORYBOOK_ONLY_CATEGORY } from '@iress-storybook/constants';

type CustomArgs = Partial<IressModalProviderProps> & {
  modal: Partial<IressModalProps>;
};
type Story = StoryObj<CustomArgs>;

export default {
  title: 'Components/Modal/Provider',
  component: IressModalProvider,
  argTypes: {
    ...disableArgTypes(['children', 'container']),
    modal: {
      control: 'object',
      description: 'Settings for modal to be opened by provider',
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
  tags: ['updated'],
} as Meta<typeof IressModalProvider>;

export const Provider: Story = {
  args: {
    modal: {
      children:
        'This modal was opened via IressModalProvider and the useModal hook.',
    },
  },
  render: (args) => <AppWithModalProvider {...args.modal} />,
  parameters: {
    docs: {
      source: {
        code: AppWithModalProviderSource,
        language: 'tsx',
      },
    },
  },
};
