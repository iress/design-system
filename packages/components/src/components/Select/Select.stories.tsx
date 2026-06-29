import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelect } from './Select';
import { SelectAsync } from './mocks/SelectAsync';
import SelectAsyncSource from './mocks/SelectAsync.tsx?raw';
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
import { SelectSizing } from './mocks/SelectSizing';
import SelectSizingSource from './mocks/SelectSizing.tsx?raw';
import { SelectLotsOfOptions } from './mocks/SelectLotsOfOptions';
import SelectLotsOfOptionsSource from './mocks/SelectLotsOfOptions.tsx?raw';
import {
  type IressSelectProps,
  IressDivider,
  IressButton,
  IressText,
  IressInline,
  IressMenuText,
} from '@/main';
import {
  componentStoryMeta,
  reactNodeArgType,
  addToStorybookCategory,
  disableArgTypes,
  mergeStorybookConfig,
  withSource,
  withBreakpointLabel,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressSelect>;

export default {
  title: 'Components/Select',
  component: IressSelect,
  args: {
    container: document.body,
    placeholder: '',
  },
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      footer: reactNodeArgType,
      header: reactNodeArgType,
      placeholder: reactNodeArgType,
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
  }),
} as Meta<typeof IressSelect>;

export const SingleSelect: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
  },
};

export const PreSelectedValue: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
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
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
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
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
    multiSelect: true,
  },
};

export const MultiSelectLimit: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
    multiSelect: true,
    multiSelectLimit: 2,
    defaultValue: ['1', '2', '3', '4', '5'],
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Select an option',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
  },
};

export const AsyncOptions: Story = {
  render: (args) => <SelectAsync {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SelectAsyncSource, { stripImports: true }),
  },
};

export const AsyncOptionsMinSearchLength: Story = {
  render: (args) => <SelectAsyncMinLength {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SelectAsyncMinLengthSource, { stripImports: true }),
  },
};

export const InitialOptions: Story = {
  render: (args) => <SelectInitialOptions {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SelectInitialOptionsSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Sizing: Story = {
  render: (args) => <SelectSizing {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SelectSizingSource, { stripImports: true }),
  },
};

export const CustomLabel: Story = {
  render: (args) => <SelectCustomLabel {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SelectCustomLabelSource, { stripImports: true }),
  },
  tags: ['recipe'],
};

export const CustomOptions: Story = {
  render: (args) => <SelectCustomOptions {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SelectCustomOptionsSource, { stripImports: true }),
  },
  tags: ['recipe'],
};

export const CreateNewOption: Story = {
  render: (args) => <SelectNewOption {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SelectNewOptionSource, { stripImports: true }),
  },
  tags: ['recipe'],
};

export const HeaderFooter: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
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
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
    multiSelect: true,
    readOnly: true,
    value: ['1', '2', '3'],
  },
};

export const LotsOfOptions: Story = {
  render: (args) => <SelectLotsOfOptions {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SelectLotsOfOptionsSource, { stripImports: true }),
  },
};

export const LongTextOptions: Story = {
  render: (args) => <OptionsLongText {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SelectOptionLongTextSource, { stripImports: true }),
  },
};

export const Native: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
    native: 'md',
    defaultValue: '2',
  },
  parameters: {
    docs: {
      description: {
        story: 'This shows how to set the native prop to use the native select element instead of the custom dropdown. This is useful for mobile devices or when you want to leverage the native select behavior and styling.',
      }
    },
  },
  decorators: [withBreakpointLabel()],
};

export const Disabled: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
    ],
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
};

export const GroupedMultiSelect: Story = {
  args: {
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
    multiSelect: true,
    placeholder: 'Select multiple foods',
  },
};

export const GroupedWithSearch: Story = {
  args: {
    placeholder: 'Select a food',
    options: async (query: string) => {
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
};
