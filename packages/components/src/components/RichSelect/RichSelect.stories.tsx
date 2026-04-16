import { type Meta, type StoryObj } from '@storybook/react';
import { IressRichSelect } from './RichSelect';
import {
  generateLabelValueMeta,
  MOCK_LABEL_VALUE_META,
} from '@/mocks/generateLabelValues';
import { SelectAsync } from './mocks/SelectAsync';
import SelectAsyncSource from './mocks/SelectAsync.tsx?raw';
import { SelectAsyncMinLength } from './mocks/SelectAsyncMinLength';
import SelectAsyncMinLengthSource from './mocks/SelectAsyncMinLength.tsx?raw';
import { SelectOptionLongText } from './mocks/SelectOptionLongText';
import SelectOptionLongTextSource from './mocks/SelectOptionLongText.tsx?raw';
import { SelectCustomLabel } from './mocks/SelectCustomLabel';
import SelectCustomLabelSource from './mocks/SelectCustomLabel.tsx?raw';
import { SelectCustomOptions } from './mocks/SelectCustomOptions';
import SelectCustomOptionsSource from './mocks/SelectCustomOptions.tsx?raw';
import { SelectInitialOptions } from './mocks/SelectInitialOptions';
import SelectInitialOptionsSource from './mocks/SelectInitialOptions.tsx?raw';
import { SelectManyInitialOptions } from './mocks/SelectManyInitialOptions';
import SelectManyInitialOptionsSource from './mocks/SelectManyInitialOptions.tsx?raw';
import { SelectNewOption } from './mocks/SelectNewOption';
import SelectNewOptionSource from './mocks/SelectNewOption.tsx?raw';
import { IressStack } from '../Stack';
import {
  FORM_ELEMENT_WIDTHS,
  type IressRichSelectProps,
  IressDivider,
  IressButton,
  IressText,
  IressInline,
  IressMenuText,
} from '@/main';
import { SelectOptionsFooter } from './mocks/SelectOptionsFooter';
import SelectOptionsFooterSource from './mocks/SelectOptionsFooter.tsx?raw';
import { SelectInScrollableExpander } from './mocks/SelectInScrollableExpander';
import SelectInScrollableExpanderSource from './mocks/SelectInScrollableExpander.tsx?raw';
import { SelectScrollableContainer } from './mocks/SelectScrollableContainer';
import SelectScrollableContainerSource from './mocks/SelectScrollableContainer.tsx?raw';
import {
  addToStorybookCategory,
  disableArgTypes,
  mergeStorybookConfig,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressRichSelect>;

export default {
  title: 'Components/RichSelect',
  component: IressRichSelect,
  args: {
    container: document.body,
    placeholder: '',
  },
  argTypes: {
    ...mergeStorybookConfig(
      disableArgTypes(['container']),
      addToStorybookCategory<IressRichSelectProps>('Popover props', [
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
  tags: ['beta:IressCombobox and IressMultiCombobox'],
} as Meta<typeof IressRichSelect>;

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

export const LongTextOptions: Story = {
  render: (args) => <SelectOptionLongText {...args} />,
  parameters: {
    ...withCustomSource(SelectOptionLongTextSource),
  },
};

export const InitialOptions: Story = {
  render: (args) => <SelectInitialOptions {...args} />,
  parameters: {
    ...withCustomSource(SelectInitialOptionsSource),
  },
};

export const ManyInitialOptions: Story = {
  render: (args) => <SelectManyInitialOptions {...args} />,
  parameters: {
    ...withCustomSource(SelectManyInitialOptionsSource),
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
    <IressStack gutter="md">
      {FORM_ELEMENT_WIDTHS.map((width) => (
        <div key={width}>
          <IressRichSelect {...args} placeholder={width} width={width} />
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
          <IressInline gutter="sm">
            <IressButton>Button 1</IressButton>
            <IressButton>Button 2</IressButton>
          </IressInline>
        </IressMenuText>
      </>
    ),
  },
};

export const OptionsFooter: Story = {
  render: (args) => <SelectOptionsFooter {...args} />,
  parameters: {
    ...withCustomSource(SelectOptionsFooterSource),
  },
};

export const InScrollableExpander: Story = {
  render: (args) => <SelectInScrollableExpander {...args} />,
  parameters: {
    ...withCustomSource(SelectInScrollableExpanderSource),
  },
};

export const Readonly: Story = {
  args: {
    ...MultiSelect.args,
    readonly: true,
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

export const BugDropdownCutOffInScrollContainer: Story = {
  name: 'Bug: Dropdown cut off in scroll container',
  parameters: {
    docs: {
      description: {
        story: `
**Problem Summary:** When RichSelect is positioned near the bottom of a scrollable container,
the dropdown is cut off without a scrollbar to view all options.

**Expected Behavior:** Option dropdown either shows scroll or repositions to above the RichSelect
if there isn't enough space below.

**Actual Behavior (before fix):** Options dropdown is cut off and doesn't have a scroll bar.

**How to Test:**
1. Open this story
2. Scroll to the bottom of the container below
3. Click the RichSelect combobox near the bottom of the scroll container
4. Verify the dropdown either shows scroll or positions above the trigger
        `,
      },
    },
  },
  render: (args) => (
    <div
      style={{
        height: '300px',
        overflow: 'auto',
        border: '1px solid #ccc',
        padding: '16px',
      }}
    >
      <div style={{ height: '250px', paddingBottom: '8px' }}>
        <p>
          Scroll down to see the RichSelect near the bottom of this container.
        </p>
      </div>
      <IressRichSelect
        {...args}
        options={MOCK_LABEL_VALUE_META}
        placeholder="Select an option"
        container={document.body}
      />
      <div style={{ height: '20px' }} />
    </div>
  ),
};

export const AsyncOptionsInScrollableContainer: Story = {
  render: (args) => <SelectScrollableContainer {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates async options with a `container` prop inside a scrollable container. Scroll down to the expander, open it, then click the RichSelect — the container should not auto-scroll.',
      },
    },
    ...withCustomSource(SelectScrollableContainerSource),
  },
};
