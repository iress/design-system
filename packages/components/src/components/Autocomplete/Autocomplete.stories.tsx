import { Meta, StoryObj } from '@storybook/react';
import { IressAutocomplete } from '.';
import {
  disableArgTypes,
  withJsxTransformer,
  withTransformedRawSource,
} from '@iress-storybook/helpers';
import { AutocompleteUsingState } from './mocks/AutocompleteUsingState';
import AutocompleteUsingStateSource from './mocks/AutocompleteUsingState.tsx?raw';
import { AutocompleteUsingAsync } from './mocks/AutocompleteUsingAsync';
import AutocompleteUsingAsyncSource from './mocks/AutocompleteUsingAsync.tsx?raw';
import { IressIcon } from '../Icon';
import { IressPopover } from '../Popover';
import { IressButton } from '../Button';
import { IressPanel } from '../Panel';
import { CurrentBreakpoint } from '@iress-oss/ids-storybook-config';
import { IressStack } from '../Stack';

type Story = StoryObj<typeof IressAutocomplete>;

export default {
  title: 'Components/Autocomplete',
  component: IressAutocomplete,
  args: {
    popoverProps: {
      container: document.body,
    },
  },
} as Meta<typeof IressAutocomplete>;

export const Default: Story = {
  args: {
    options: [...Array(5).keys()].map((number) => ({
      label: `Option ${number + 1}`,
    })),
  },
};

export const Uncontrolled: Story = {
  args: {
    ...Default.args,
    defaultValue: 'Option 1',
  },
};

export const Controlled: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['defaultValue', 'value']),
  },
  render: (args) => <AutocompleteUsingState {...args} />,
  parameters: {
    ...withTransformedRawSource(
      AutocompleteUsingStateSource,
      'IressAutocompleteProps',
    ),
  },
};

export const Options: Story = {
  ...Default,
};

export const AsyncOptions: Story = {
  argTypes: {
    ...disableArgTypes(['options']),
  },
  render: (args) => <AutocompleteUsingAsync {...args} />,
  parameters: {
    ...withTransformedRawSource(
      AutocompleteUsingAsyncSource,
      'IressAutocompleteProps',
    ),
  },
};

export const AsyncOptionsMinSearchLength: Story = {
  argTypes: {
    ...disableArgTypes(['options']),
  },
  args: {
    minSearchLength: 3,
  },
  render: (args) => <AutocompleteUsingAsync {...args} />,
  parameters: {
    ...withTransformedRawSource(
      AutocompleteUsingAsyncSource,
      'IressAutocompleteProps',
    ),
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
      <IressAutocomplete {...args} />
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
