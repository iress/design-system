import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressAutocomplete } from '.';
import {
  componentStoryMeta,
  withJsxTransformer,
  withSource,
  withBreakpointLabel,
  reactNodeArgType,
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
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      append: reactNodeArgType,
      errorText: reactNodeArgType,
      noResultsText: reactNodeArgType,
      prepend: reactNodeArgType,
    },
  }),
} as Meta<typeof IressAutocomplete>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ],
  },
};

export const Uncontrolled: Story = {
  args: {
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ],
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
  args: {
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ],
  },
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
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ],
    initialOptions: [
      { label: 'Favourite option 1' },
      { label: 'Favourite option 2' },
      { label: 'Favourite option 3' },
    ],
  },
};

export const RemoveAutoSelect: Story = {
  args: {
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ],
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
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ],
    placeholder: 'Type "no" to see the no results text',
    noResultsText: <IressPanel noBorder>No results found</IressPanel>,
  },
};

export const PopoverProps: Story = {
  args: {
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ],
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
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ],
    debounceThreshold: 0,
    placeholder: 'Instant search!',
  },
};

export const ResultLimits: Story = {
  args: {
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
      { label: 'Option 6' },
      { label: 'Option 7' },
      { label: 'Option 8' },
      { label: 'Option 9' },
      { label: 'Option 10' },
      { label: 'Option 11' },
      { label: 'Option 12' },
      { label: 'Option 13' },
      { label: 'Option 14' },
      { label: 'Option 15' },
    ],
    limitDesktop: 6,
    limitMobile: 3,
  },
  decorators: [withBreakpointLabel()],
};

export const ReadOnly: Story = {
  args: {
    options: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ],
    defaultValue: 'Option 1',
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
