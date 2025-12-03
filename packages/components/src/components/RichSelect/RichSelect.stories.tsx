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
import {
  addToStorybookCategory,
  disableArgTypes,
  mergeStorybookConfig,
} from '@iress-oss/ids-storybook-config';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

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
