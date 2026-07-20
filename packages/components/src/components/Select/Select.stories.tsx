import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelect } from './Select';
import {
  generateLabelValueMeta,
  MOCK_LABEL_VALUE_META,
} from '@/mocks/generateLabelValues';
import { SelectAsync } from './mocks/SelectAsync';
import SelectAsyncSource from './mocks/SelectAsync.tsx?raw';
import { SelectAsyncErrorText } from './mocks/SelectAsyncErrorText';
import SelectAsyncErrorTextSource from './mocks/SelectAsyncErrorText.tsx?raw';
import { SelectAsyncMinLength } from './mocks/SelectAsyncMinLength';
import SelectAsyncMinLengthSource from './mocks/SelectAsyncMinLength.tsx?raw';
import { SelectCustomLabel } from './mocks/SelectCustomLabel';
import SelectCustomLabelSource from './mocks/SelectCustomLabel.tsx?raw';
import { SelectCustomOptions } from './mocks/SelectCustomOptions';
import SelectCustomOptionsSource from './mocks/SelectCustomOptions.tsx?raw';
import { SelectInitialOptions } from './mocks/SelectInitialOptions';
import SelectInitialOptionsSource from './mocks/SelectInitialOptions.tsx?raw';
import { SelectNewOption } from './mocks/SelectNewOption';
import SelectNewOptionSource from './mocks/SelectNewOption.tsx?raw';
import { OptionsLongText } from './mocks/SelectOptionLongText';
import SelectOptionLongTextSource from './mocks/SelectOptionLongText.tsx?raw';
import { IressStack } from '../Stack';
import { FORM_ELEMENT_WIDTHS } from '@/constants';
import {
  type IressSelectProps,
  IressDivider,
  IressButton,
  IressText,
  IressInline,
  IressMenuText,
} from '@/main';
import {
  reactNodeArgType,
  stylingProps,
  addToStorybookCategory,
  disableArgTypes,
  mergeStorybookConfig,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSelect>;

export default {
  title: 'Components/Select',
  component: IressSelect,
  args: {
    container: document.body,
    placeholder: '',
  },
  argTypes: {
    errorText: reactNodeArgType,
    footer: reactNodeArgType,
    header: reactNodeArgType,
    placeholder: reactNodeArgType,
    ...stylingProps,
    ...mergeStorybookConfig(
      disableArgTypes(['container']),
      addToStorybookCategory<IressSelectProps>('Popover props', [
        'align',
        'container',
        'displayMode',
        'focusStartIndex',
        'onActivated',
        'onDeactivated',
        'onNavigate',
        'type',
        'virtualFocus',
      ]),
    ),
  },
  tags: ['updated'],
} as Meta<typeof IressSelect>;

export const SingleSelect: Story = {
  args: {
    options: MOCK_LABEL_VALUE_META,
  },
};

export const PreSelectedValue: Story = {
  args: {
    options: MOCK_LABEL_VALUE_META,
    defaultValue: '2',
  },
  parameters: {
    docs: {
      description: {
        story: `Pass a \`FormControlValue\` (string, number, etc.) directly as \`defaultValue\` — IressSelect will find and display the matching option automatically.
This means you can work directly with the raw values your API returns, without constructing a full \`LabelValueMeta\` object.

\`\`\`tsx
// Previously required constructing the full object
<IressSelect options={options} defaultValue={{ label: 'Option 2', value: '2' }} />

// Now a raw value string resolves to the matching option
<IressSelect options={options} defaultValue="2" />
\`\`\``,
      },
    },
  },
};

export const PreSelectedMultiValue: Story = {
  args: {
    options: MOCK_LABEL_VALUE_META,
    multiSelect: true,
    defaultValue: ['1', '3', '5'],
  },
  parameters: {
    docs: {
      description: {
        story: `In multi-select mode, pass an array of \`FormControlValue\` items as \`defaultValue\` and IressSelect will resolve each one to its matching option.`,
      },
    },
  },
};

export const MultiSelect: Story = {
  args: {
    ...SingleSelect.args,
    multiSelect: true,
  },
};

export const MultiSelectLimit: Story = {
  args: {
    options: MOCK_LABEL_VALUE_META,
    multiSelect: true,
    multiSelectLimit: 2,
    defaultValue: ['1', '2', '3', '4', '5'],
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Select an option',
    options: MOCK_LABEL_VALUE_META,
  },
};

export const AsyncOptions: Story = {
  render: (args) => <SelectAsync {...args} />,
  parameters: {
    ...withCustomSource(SelectAsyncSource),
  },
};

export const AsyncOptionsMinSearchLength: Story = {
  render: (args) => <SelectAsyncMinLength {...args} />,
  parameters: {
    ...withCustomSource(SelectAsyncMinLengthSource),
  },
};

export const ErrorText: Story = {
  render: (args) => <SelectAsyncErrorText {...args} />,
  parameters: {
    ...withCustomSource(SelectAsyncErrorTextSource),
    docs: {
      description: {
        story: `Use the \`errorText\` prop to customise the error message shown when async
options fail. It accepts a \`ReactNode\` or a render function
\`(error: boolean | string) => ReactNode\` that receives the error value.
Type "error" to trigger the error state.`,
      },
    },
  },
};

export const InitialOptions: Story = {
  render: (args) => <SelectInitialOptions {...args} />,
  parameters: {
    ...withCustomSource(SelectInitialOptionsSource),
  },
};

export const Sizing: Story = {
  args: {
    ...SingleSelect.args,
  },
  argTypes: {
    ...disableArgTypes(['placeholder', 'width']),
  },
  render: (args) => (
    <IressStack gap="md">
      {FORM_ELEMENT_WIDTHS.map((width) => (
        <div key={width}>
          <IressSelect
            {...args}
            placeholder={width}
            width={width}
            aria-label={`Select option (width: ${width})`}
          />
        </div>
      ))}
    </IressStack>
  ),
};

export const CustomLabel: Story = {
  render: (args) => <SelectCustomLabel {...args} />,
  parameters: {
    ...withCustomSource(SelectCustomLabelSource),
  },
};

export const CustomOptions: Story = {
  render: (args) => <SelectCustomOptions {...args} />,
  parameters: {
    ...withCustomSource(SelectCustomOptionsSource),
  },
};

export const CreateNewOption: Story = {
  render: (args) => <SelectNewOption {...args} />,
  parameters: {
    ...withCustomSource(SelectNewOptionSource),
  },
};

export const HeaderFooter: Story = {
  args: {
    options: MOCK_LABEL_VALUE_META,
    header: (
      <>
        <IressMenuText>
          <IressText element="h3" style={{ margin: 0 }}>
            Header
          </IressText>
        </IressMenuText>
        <IressDivider style={{ marginTop: 0 }} />
      </>
    ),
    footer: (
      <>
        <IressDivider style={{ marginBottom: 0 }} />
        <IressMenuText>
          <IressInline gap="sm">
            <IressButton>Button 1</IressButton>
            <IressButton>Button 2</IressButton>
          </IressInline>
        </IressMenuText>
      </>
    ),
  },
};

export const Readonly: Story = {
  args: {
    ...MultiSelect.args,
    readOnly: true,
    value: ['1', '2', '3'],
  },
};

export const LotsOfOptions: Story = {
  args: {
    ...SingleSelect.args,
    options: async () => Promise.resolve(generateLabelValueMeta(200)),
    autoHighlight: false,
  },
};

export const LongTextOptions: Story = {
  render: (args) => <OptionsLongText {...args} />,
  parameters: {
    ...withCustomSource(SelectOptionLongTextSource),
  },
};

export const Native: Story = {
  args: {
    ...SingleSelect.args,
    native: 'md',
    defaultValue: '2',
  },
};

export const Disabled: Story = {
  args: {
    ...SingleSelect.args,
    defaultValue: '1',
    disabled: true,
  },
};

export const GroupedOptions: Story = {
  args: {
    placeholder: 'Select a food',
    options: [
      {
        label: 'Fruits',
        children: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
          { label: 'Strawberry', value: 'strawberry' },
        ],
      },
      {
        label: 'Vegetables',
        children: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
          { label: 'Spinach', value: 'spinach' },
        ],
      },
      {
        label: 'Grains',
        children: [
          { label: 'Rice', value: 'rice' },
          { label: 'Wheat', value: 'wheat' },
          { label: 'Oats', value: 'oats' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `Use the \`children\` property in \`LabelValueMeta\` to create grouped options. 
        Groups provide visual organization for related options. The group label is non-selectable, 
        and only the child items can be selected.`,
      },
    },
  },
};

export const GroupedMultiSelect: Story = {
  args: {
    ...GroupedOptions.args,
    multiSelect: true,
    placeholder: 'Select multiple foods',
  },
};

export const GroupedWithSearch: Story = {
  args: {
    ...GroupedOptions.args,
    options: async (query: string) => {
      // Simulate async search with grouped results
      const allOptions = [
        {
          label: 'Fruits',
          children: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
            { label: 'Strawberry', value: 'strawberry' },
          ],
        },
        {
          label: 'Vegetables',
          children: [
            { label: 'Carrot', value: 'carrot' },
            { label: 'Broccoli', value: 'broccoli' },
            { label: 'Spinach', value: 'spinach' },
          ],
        },
      ];

      if (!query) return Promise.resolve(allOptions);

      // Filter groups and their children based on query
      return Promise.resolve(
        allOptions
          .map((group) => ({
            ...group,
            children: group.children.filter((item) =>
              item.label.toLowerCase().includes(query.toLowerCase()),
            ),
          }))
          .filter((group) => group.children.length > 0),
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story: `When using async options with groups, filter the children based on the search query 
        and return only groups that have matching children.`,
      },
    },
  },
};
