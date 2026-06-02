import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressIcon } from '../Icon';
import {
  IressInput,
  IressStack,
  IressToasterProvider,
  useToaster,
  type IressInputProps,
} from '../../main';
import { IressField } from '../Field';
import {
  disableArgTypes,
  withJsxTransformer,
  withSource,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { InputTypes } from './mocks/InputTypes';
import InputTypesSource from './mocks/InputTypes.tsx?raw';
import { InputModes } from './mocks/InputModes';
import InputModesSource from './mocks/InputModes.tsx?raw';
import { InputSizing } from './mocks/InputSizing';
import InputSizingSource from './mocks/InputSizing.tsx?raw';
import { InputSlots } from './mocks/InputSlots';
import InputSlotsSource from './mocks/InputSlots.tsx?raw';
import { ReactHookFormsInput } from './mocks/ReactHookFormsInput';
import ReactHookFormsInputSource from './mocks/ReactHookFormsInput.tsx?raw';
import { InputPercentage } from './mocks/InputPercentage';
import InputPercentageSource from './mocks/InputPercentage.tsx?raw';

type Story = StoryObj<IressInputProps>;
type TextareaStory = StoryObj<IressInputProps<string, number>>;

export default {
  title: 'Components/Input',
  component: IressInput,
  tags: ['updated'],
  argTypes: {
    append: reactNodeArgType,
    prepend: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your name',
  },
};

export const Types: Story = {
  render: (args) => <InputTypes {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(InputTypesSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const InputModesStory: Story = {
  name: 'InputModes',
  render: (args) => <InputModes {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(InputModesSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const FileType: Story = {
  args: {
    type: 'file',
    required: true,
  },
  render: (args) => {
    const { success } = useToaster();
    return (
      <IressField label="File upload">
        <IressInput
          {...args}
          onChange={(e) =>
            success({
              content: `File uploaded: ${e.target.files?.[0].name}`,
            })
          }
        />
      </IressField>
    );
  },
  decorators: [
    (Story) => (
      <IressToasterProvider>
        <Story />
      </IressToasterProvider>
    ),
  ],
};

export const Clearable: Story = {
  args: {
    clearable: true,
    placeholder: 'Search',
    prepend: <IressIcon name="search" />,
  },
};

export const Sizing: Story = {
  render: (args) => <InputSizing {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(InputSizingSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const TextAreas: TextareaStory = {
  args: {
    rows: 5,
  },
};

export const Slots: Story = {
  render: (args) => <InputSlots {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(InputSlotsSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Actions: Story = {
  args: {
    actions: [
      {
        icon: 'content_copy',
        children: 'Copy to clipboard',
        onClick: () => {
          void navigator.clipboard.writeText('Copied text!');
        },
      },
    ],
    placeholder: 'Input with action button',
  },
};

export const ReadOnly: Story = {
  ...Default,
  args: {
    ...Default.args,
    readOnly: true,
    value: 'Value',
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
    value: 'Value',
  },
};

export const Formatter: Story = {
  ...Default,
  args: {
    ...Default.args,
    placeholder:
      'Enter a string and it will show in UPPERCASE when not focused, and show the raw value on focus',
    formatter: (value) => (value ? value.toString().toUpperCase() : ''),
  },
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};

export const CurrencyFormatter: Story = {
  ...Default,
  args: {
    ...Default.args,
    defaultValue: '0.00',
    placeholder:
      'Enter any number and it will show in currency format when the input is not focused',
    type: 'number',
    formatter: (value = '') => {
      const numberValue = Number(value);

      if (Number.isNaN(numberValue)) {
        return value;
      }

      return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
      }).format(numberValue);
    },
  },
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};

export const AutoGrow: TextareaStory = {
  args: {
    rows: 1,
    autoGrow: true,
    append: <IressIcon name="wand_shine" />,
  },
};

export const Variant: Story = {
  args: {
    variant: 'search',
    placeholder: 'Start your search...',
    prepend: <IressIcon name="search" />,
  },
};

export const ReactHookForms: Story = {
  tags: ['recipe'],
  render: (args) => <ReactHookFormsInput {...args} />,
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    IDS_Sandbox: { scopes: ['react-hook-form'] },
    ...withSource(ReactHookFormsInputSource, { stripImports: true }),
  },
};

export const Percentage: Story = {
  tags: ['recipe'],
  render: (args) => <InputPercentage {...args} />,
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    ...withSource(InputPercentageSource, { stripImports: true, stripExportFunction: true }),
  },
};
