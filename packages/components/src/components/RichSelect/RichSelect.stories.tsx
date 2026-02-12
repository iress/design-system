import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressRichSelect } from './RichSelect';
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
  type IressRichSelectProps,
  IressDivider,
  IressButton,
  IressText,
  IressInline,
  IressMenuText,
  IressSelectMenu,
} from '@/main';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';
import {
  addToStorybookCategory,
  disableArgTypes,
  mergeStorybookConfig,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';
import { useState } from 'react';

type Story = StoryObj<typeof IressRichSelect>;

export default {
  title: 'Components/RichSelect',
  component: IressRichSelect,
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
  tags: ['updated'],
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
          <IressRichSelect
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

/**
 * Bug Reproduction Story for Issue #123
 *
 * **Problem**: When using custom `renderOptions`, the parent `onChange` prop is not triggered
 * when selections are made. This happens because developers call `setValue` directly instead
 * of using the provided `handleMenuChange` callback.
 *
 * **Expected Behavior**: Selecting an option should trigger the `onChange` callback.
 * **Actual Behavior**: `onChange` is never called, console shows no output.
 *
 * **Test Steps**:
 * 1. Open this story
 * 2. Click the select to open the dropdown
 * 3. Click an option
 * 4. Check the browser console
 * 5. Notice: No "Selection changed" message appears (BUG!)
 * 6. The selection appears in the UI (via setValue), but onChange wasn't called
 */
export const BugReproduction: Story = {
  render: () => {
    const [value, setValue] = useState<
      (typeof MOCK_LABEL_VALUE_META)[number] | undefined
    >();

    const customRenderOptions: IressRichSelectProps['renderOptions'] = ({
      results,
      setValue: setValueFromProps,
      value: currentValue,
    }) => {
      return (
        <IressSelectMenu
          items={results}
          // BUG: This calls setValue directly, bypassing handleMenuChange
          // which means onChange is never triggered
          onChange={setValueFromProps}
          selected={currentValue}
        />
      );
    };

    return (
      <div>
        <IressText element="p" style={{ marginBottom: 'var(--spacing-md)' }}>
          <strong>Bug Test:</strong> Select an option and check the console.
          <br />
          You should see &quot;Selection changed:&quot; logged, but you won&apos;t (BUG!)
        </IressText>
        <IressRichSelect
          options={MOCK_LABEL_VALUE_META}
          renderOptions={customRenderOptions}
          value={value}
          onChange={(_e, newValue) => {
            // This SHOULD be called but isn't when using custom renderOptions
            console.log('Selection changed:', newValue);
            setValue(newValue);
          }}
          placeholder="Select an option"
        />
        <IressText element="p" style={{ marginTop: 'var(--spacing-md)' }}>
          Current selection: {value?.label ?? 'None'}
        </IressText>
      </div>
    );
  },
};
