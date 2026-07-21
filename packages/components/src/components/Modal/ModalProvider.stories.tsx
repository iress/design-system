import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  type IressModalProps,
  IressModalProvider,
  type IressModalProviderProps,
} from '.';
import { App as AppWithModalProvider } from './mocks/AppWithModalProvider';
import AppWithModalProviderSource from './mocks/AppWithModalProvider.tsx?raw';
import {
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

type CustomArgs = Partial<IressModalProviderProps> & {
  modal: Partial<IressModalProps>;
};
type Story = StoryObj<CustomArgs>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the modal provider',
    testId: 'modal-provider',
  },
];

export default {
  title: 'Components/Modal/ModalProvider',
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
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
    docs: {
      description: {
        component:
          'Provides a context-based API for opening and managing modals declaratively via the useModal hook.',
      },
    },
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
