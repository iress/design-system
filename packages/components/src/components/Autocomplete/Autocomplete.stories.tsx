import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressAutocomplete } from '.';
import {
  withJsxTransformer,
  withSource,
  withBreakpointLabel,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import { AutocompleteUsingState } from './mocks/AutocompleteUsingState';
import AutocompleteUsingStateSource from './mocks/AutocompleteUsingState.tsx?raw';
import { AutocompleteUsingAsync } from './mocks/AutocompleteUsingAsync';
import AutocompleteUsingAsyncSource from './mocks/AutocompleteUsingAsync.tsx?raw';
import { IressButton } from '../Button';
import { IressPanel } from '../Panel';
import componentMeta from './meta';
import AutocompleteSearchTableSource from './mocks/AutocompleteSearchTable.tsx?raw';
import { AutocompleteSearchTable } from './mocks/AutocompleteSearchTable';
import { AutocompleteUsingAsyncMinSearch } from './mocks/AutocompleteUsingAsyncMinSearch';
import AutocompleteUsingAsyncMinSearchSource from './mocks/AutocompleteUsingAsyncMinSearch.tsx?raw';
import { AutocompleteInputProps } from './mocks/AutocompleteInputProps';
import AutocompleteInputPropsSource from './mocks/AutocompleteInputProps.tsx?raw';
import { IressDivider } from '../Divider';

type Story = StoryObj<typeof IressAutocomplete>;

export default {
  title: 'Components/Autocomplete',
  component: IressAutocomplete,
  args: {
    popoverProps: {
      container: document.body,
    },
  },
  argTypes: {
    append: reactNodeArgType,
    errorText: reactNodeArgType,
    noResultsText: reactNodeArgType,
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
  render: (args) => <AutocompleteUsingState {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AutocompleteUsingStateSource, {
      stripImports: true,
    }),
  },
};

export const Options: Story = {
  ...Default,
};

export const AsyncOptions: Story = {
  render: (args) => <AutocompleteUsingAsync {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AutocompleteUsingAsyncSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const AsyncOptionsMinSearchLength: Story = {
  render: (args) => <AutocompleteUsingAsyncMinSearch {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AutocompleteUsingAsyncMinSearchSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
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
  render: (args) => <AutocompleteInputProps {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AutocompleteInputPropsSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const NoResultsText: Story = {
  args: {
    ...Options.args,
    placeholder: 'Type "no" to see the no results text',
    noResultsText: <IressPanel noBorder>No results found</IressPanel>,
  },
};

export const PopoverProps: Story = {
  args: {
    ...Options.args,
    popoverProps: {
      append: (
        <>
          <IressDivider />
          <IressPanel noBorder>
            <IressButton>Add an option</IressButton>
          </IressPanel>
        </>
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
  decorators: [withBreakpointLabel()],
};

export const ReadOnly: Story = {
  ...Uncontrolled,
  args: {
    ...Uncontrolled.args,
    readOnly: true,
  },
};

export const SearchTable: Story = {
  tags: ['recipe'],
  render: (args) => <AutocompleteSearchTable {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AutocompleteSearchTableSource, {
      stripImports: true,
    }),
  },
};
