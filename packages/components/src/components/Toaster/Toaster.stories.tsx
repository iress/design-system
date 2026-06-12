import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressToasterProvider,
  type IressToasterProviderProps,
} from './ToasterProvider';
import { ToastStatuses } from './mocks/ToasterStatuses';
import ToastStatusesSource from './mocks/ToasterStatuses.tsx?raw';
import { ToasterPositionExamples } from './mocks/ToasterPositions';
import ToasterPositionExamplesSource from './mocks/ToasterPositions.tsx?raw';
import { SimpleToasterExample } from './mocks/SimpleToasterExample';
import SimpleToasterExampleSource from './mocks/SimpleToasterExample.tsx?raw';
import { ToasterTimeout } from './mocks/ToasterTimeout';
import ToasterTimeoutSource from './mocks/ToasterTimeout.tsx?raw';
import { CloseToastViaProvider } from './mocks/CloseToastViaProvider';
import CloseToastViaProviderSource from './mocks/CloseToastViaProvider.tsx?raw';
import {
  disableArgTypes,
  removeArgTypes,
  withSource,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<IressToasterProviderProps>;

export default {
  title: 'Components/Toaster',
  component: IressToasterProvider,
  args: {
    container: document.body,
  },
  argTypes: {
    ...disableArgTypes(['container']),
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta: componentMeta.testMeta },
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressToasterProvider>;

export const Default: Story = {};

export const Provider: Story = {
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <SimpleToasterExample {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SimpleToasterExampleSource, { stripImports: true }),
  },
};

export const Close: Story = {
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <CloseToastViaProvider {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(CloseToastViaProviderSource, { stripImports: true }),
  },
};

export const Position: Story = {
  argTypes: {
    ...disableArgTypes(['position']),
  },
  render: (args) => <ToasterPositionExamples {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ToasterPositionExamplesSource, { stripImports: true }),
  },
};

export const Statuses: Story = {
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <ToastStatuses {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ToastStatusesSource, { stripImports: true }),
  },
};

export const Timeout: Story = {
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <ToasterTimeout {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ToasterTimeoutSource, { stripImports: true }),
  },
};
