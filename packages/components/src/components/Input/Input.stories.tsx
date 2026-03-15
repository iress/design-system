import { type Meta, type StoryObj } from '@storybook/react-vite';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';
import { IressIcon } from '../Icon';
import {
  IressInput,
  IressStack,
  IressToasterProvider,
  useToaster,
  type IressInputProps,
} from '../../main';
import { IressField } from '../Field';
import { FORM_ELEMENT_WIDTHS } from '@/constants';
import {
  disableArgTypes,
  withJsxTransformer,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

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
} as Meta<typeof IressInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your name',
    prepend: '',
    append: '',
  },
};

export const Types: Story = {
  argTypes: {
    ...disableArgTypes(['type']),
  },
  render: ({ placeholder, ...args }) => (
    <IressStack gap="md">
      {/* Copied from: HTMLInputTypeAttribute */}
      {[
        'text',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'time',
        'url',
        'week',
      ].map((type) => (
        <IressInput
          {...args}
          placeholder={placeholder ?? `${capitalizeFirstLetter(type)} input`}
          type={type}
          key={type}
        />
      ))}
    </IressStack>
  ),
};

const inputModes: Exclude<IressInputProps['inputMode'], undefined>[] = [
  'text',
  'tel',
  'url',
  'email',
  'numeric',
  'decimal',
  'search',
];
export const InputModes: Story = {
  argTypes: {
    ...disableArgTypes(['inputMode']),
  },
  render: ({ placeholder, ...args }) => (
    <IressStack gap="md">
      {inputModes.map((inputMode) => (
        <IressInput
          {...args}
          placeholder={
            placeholder ??
            `${capitalizeFirstLetter(
              inputMode,
            )} mode, usually best used when type="${inputMode}" `
          }
          inputMode={inputMode}
          key={inputMode}
        />
      ))}
    </IressStack>
  ),
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
              content: `File uploaded: ${
                (e.target as HTMLInputElement).files?.[0].name
              }`,
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
  argTypes: {
    ...disableArgTypes(['width']),
  },
  render: ({ placeholder, ...args }) => (
    <IressStack gap="md">
      {FORM_ELEMENT_WIDTHS.map((width) => (
        <IressInput
          {...args}
          placeholder={placeholder ?? width}
          width={width}
          key={width}
        />
      ))}
    </IressStack>
  ),
};

export const TextAreas: TextareaStory = {
  args: {
    rows: 5,
  },
};

export const Slots: Story = {
  argTypes: {},
  render: ({ placeholder, prepend, append, ...args }) => (
    <IressStack gap="md">
      <IressInput
        {...args}
        prepend={prepend ?? <IressIcon name="search" />}
        placeholder={placeholder ?? 'Prepend slot'}
      />

      <IressInput
        {...args}
        append={append ?? <IressIcon name="search" />}
        placeholder={placeholder ?? 'Append slot'}
      />

      <IressInput
        {...args}
        prepend={prepend ?? <IressIcon name="search" />}
        placeholder={placeholder ?? 'Prepend slot'}
      />

      <IressInput
        {...args}
        append={append ?? <IressIcon name="search" />}
        placeholder={placeholder ?? 'Append slot'}
      />
    </IressStack>
  ),
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
  argTypes: {},
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
