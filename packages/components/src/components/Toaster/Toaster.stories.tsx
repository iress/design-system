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
import { ToasterWithModal } from './mocks/ToasterWithModal';
import ToasterWithModalSource from './mocks/ToasterWithModal.tsx?raw';
import {
  disableArgTypes,
  removeArgTypes,
  withTransformedRawSource,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

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
} as Meta<typeof IressToasterProvider>;

export const Default: Story = {};

export const Provider: Story = {
  args: {
    container: document.body,
  },
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <SimpleToasterExample {...args} />,
  parameters: {
    ...withTransformedRawSource(
      SimpleToasterExampleSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const Close: Story = {
  args: {
    container: document.body,
  },
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <CloseToastViaProvider {...args} />,
  parameters: {
    ...withTransformedRawSource(
      CloseToastViaProviderSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const Position: Story = {
  args: {
    ...Provider.args,
  },
  argTypes: {
    ...disableArgTypes(['position']),
  },
  render: (args) => <ToasterPositionExamples {...args} />,
  parameters: {
    ...withTransformedRawSource(
      ToasterPositionExamplesSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const Statuses: Story = {
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <ToastStatuses {...args} />,
  parameters: {
    ...withTransformedRawSource(
      ToastStatusesSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const Timeout: Story = {
  args: {
    ...Provider.args,
  },
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <ToasterTimeout {...args} />,
  parameters: {
    ...withTransformedRawSource(
      ToasterTimeoutSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};

export const ModalContextIconVerification: Story = {
  name: 'Verification - Modal Context Icon',
  argTypes: {
    ...removeArgTypes(['toast']),
  },
  render: (args) => <ToasterWithModal {...args} />,
  parameters: {
    disableProvider: true,
    docs: {
      description: {
        story: `
**Problem summary:** Material icon in toaster could render as text while a modal is open.

**Expected behavior:** The toast icon renders as a Material Symbols glyph.

**How to test:**
1. Click **Show modal**.
2. Click **Trigger error toast** in the modal.
3. Verify the left toast icon renders as an icon glyph (not literal text like \`CANCEL\`).
`,
      },
    },
    ...withTransformedRawSource(
      ToasterWithModalSource,
      'IressToasterProviderProps',
      ['container'],
    ),
  },
};
