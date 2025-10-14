import { Meta, StoryObj } from '@storybook/react';
import { IressCombobox } from '.';
import {
  disableArgTypes,
  withJsxTransformer,
  withTransformedRawSource,
} from '@iress-storybook/helpers';
import { ComboboxUsingState } from './mocks/ComboboxUsingState';
import ComboboxUsingStateSource from './mocks/ComboboxUsingState.tsx?raw';
import { ComboboxUsingAsync } from './mocks/ComboboxUsingAsync';
import ComboboxUsingAsyncSource from './mocks/ComboboxUsingAsync.tsx?raw';
import { IressStack } from '../Stack';
import { IressPanel } from '../Panel';
import { CurrentBreakpoint } from '@iress-storybook/components';
import { IressButton } from '../Button';
import { IressIcon } from '../Icon';
import { IressPopover } from '../Popover';

type Story = StoryObj<typeof IressCombobox>;

export default {
  title: 'Components/Combobox',
  component: IressCombobox,
  args: {
    popoverProps: {
      container: document.body,
    },
  },
  tags: ['caution:IressRichSelect'],
} as Meta<typeof IressCombobox>;

export const Default: Story = {
  args: {
    options: [...Array(5).keys()].map((number) => ({
      label: `Option ${number + 1}`,
      value: number + 1,
    })),
  },
};

export const Uncontrolled: Story = {
  args: {
    ...Default.args,
    defaultValue: {
      label: 'Option 1',
      value: 1,
    },
  },
};

export const Controlled: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['defaultValue', 'value']),
  },
  render: (args) => <ComboboxUsingState {...args} />,
  parameters: {
    ...withTransformedRawSource(ComboboxUsingStateSource, 'IressComboboxProps'),
  },
};

export const Options: Story = {
  ...Default,
};

export const AsyncOptions: Story = {
  argTypes: {
    ...disableArgTypes(['options']),
  },
  render: (args) => <ComboboxUsingAsync {...args} />,
  parameters: {
    docs: {
      source: {
        code: ComboboxUsingAsyncSource,
        language: 'tsx',
      },
    },
  },
};

export const InitialOptions: Story = {
  args: {
    ...Options.args,
    initialOptions: [...Array(3).keys()].map((number) => ({
      label: `Favourite option ${number + 1}`,
    })),
  },
};

export const RemoveAutoSelect: Story = {
  args: {
    ...Options.args,
    autoSelect: false,
    placeholder: 'Should no longer auto-select when an item is highlighted',
  },
  parameters: {
    ...withJsxTransformer({
      useBooleanShorthandSyntax: false,
    }),
  },
};

export const InputProps: Story = {
  args: {
    ...Options.args,
    append: (
      <IressPopover
        activator={
          <IressButton mode="tertiary">
            <IressIcon name="cog" />
          </IressButton>
        }
        align="bottom-end"
        container={document.body}
      >
        <IressPanel className="iress-u-text">Some settings in here</IressPanel>
      </IressPopover>
    ),
    prepend: <IressIcon name="search" />,
    width: '12',
  },
};

export const NoResultsText: Story = {
  args: {
    ...Options.args,
    placeholder: 'Type "no" to see the no results text',
    noResultsText: (
      <IressPanel className="iress-u-text">No results found</IressPanel>
    ),
  },
};

export const PopoverProps: Story = {
  args: {
    ...Options.args,
    popoverProps: {
      append: (
        <IressPanel>
          <IressButton>Add an option</IressButton>
        </IressPanel>
      ),
      container: document.body,
    },
  },
};

export const DebounceThreshold: Story = {
  args: {
    ...Options.args,
    debounceThreshold: 0,
    placeholder: 'Instant search!',
  },
};

export const ResultLimits: Story = {
  args: {
    options: [...Array(15).keys()].map((number) => ({
      label: `Option ${number + 1}`,
    })),
    limitDesktop: 6,
    limitMobile: 3,
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressPanel className="iress-u-text">
        <CurrentBreakpoint />
      </IressPanel>
      <IressCombobox {...args} />
    </IressStack>
  ),
};

export const Readonly: Story = {
  ...Uncontrolled,
  args: {
    ...Uncontrolled.args,
    readOnly: true,
  },
};
