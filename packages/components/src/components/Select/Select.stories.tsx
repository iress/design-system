import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelect } from './Select';
import {
  generateLabelValueMeta,
  MOCK_LABEL_VALUE_META,
} from '@/mocks/generateLabelValues';
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
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';
import {
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

export const MultiSelect: Story = {
  args: {
    ...SingleSelect.args,
    multiSelect: true,
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
    value: MOCK_LABEL_VALUE_META,
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
  },
};

export const Disabled: Story = {
  args: {
    ...SingleSelect.args,
    defaultValue: MOCK_LABEL_VALUE_META[0],
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

export const BugReproductionHeightInconsistency: Story = {
  name: 'Bug: Height Inconsistency with Collapsed Tags',
  render: () => {
    const manyOptions = generateLabelValueMeta(15);

    return (
      <IressStack gap="md">
        <IressText>
          The two selects below should have the same height, but the one with
          collapsed tags (12 selected) appears shorter than the one with visible
          tags.
        </IressText>
        <IressStack gap="md">
          <div>
            <IressText weight="semibold">
              Priority is (3 visible tags)
            </IressText>
            <IressSelect
              multiSelect
              options={manyOptions}
              selected={[
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' },
              ]}
              placeholder="Select priorities"
            />
          </div>
          <div>
            <IressText weight="semibold">
              Type is (12 collapsed to "12 selected")
            </IressText>
            <IressSelect
              multiSelect
              options={manyOptions}
              selected={manyOptions.slice(0, 12)}
              placeholder="Select types"
            />
          </div>
        </IressStack>
      </IressStack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Problem Summary:** When tags are collapsed after reaching the limit (showing "X selected"), the height of the input changes and no longer matches inputs with visible tags.

**Expected Behavior:** The height should remain consistent regardless of whether tags are displayed individually or collapsed.

**Actual Behavior:** The input with collapsed tags appears shorter than the input with visible tags.

**How to Test:**
1. Compare the two selects in this story
2. Notice the height difference between "3 visible tags" and "12 selected"
3. The heights should be identical but they are not
        `,
      },
    },
  },
};
