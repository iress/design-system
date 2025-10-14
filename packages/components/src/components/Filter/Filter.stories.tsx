import { Meta, StoryObj } from '@storybook/react-vite';
import { IressFilter, IressFilterProps } from '.';
import { FilterSearchTable } from './mocks/FilterSearchTable';
import FilterSearchTableSource from './mocks/FilterSearchTable.tsx?raw';
import {
  disableArgTypes,
  withTransformedRawSource,
} from '@iress-storybook/helpers';
import { FilterUsingState } from './mocks/FilterUsingState';
import FilterUsingStateSource from './mocks/FilterUsingState.tsx?raw';
import { FilterUsingAsync } from './mocks/FilterUsingAsync';
import FilterUsingAsyncSource from './mocks/FilterUsingAsync.tsx?raw';
import { IressText } from '../Text';
import { IressPanel } from '../Panel';
import { IressButton } from '../Button';
import { IressBadge } from '../Badge';

type Story = StoryObj<typeof IressFilter>;
type SingleFilterStory = StoryObj<IressFilterProps<false>>;

export default {
  title: 'Components/Filter',
  component: IressFilter,
  tags: ['updated'],
} as Meta<typeof IressFilter>;

export const Default: Story = {
  args: {
    label: 'Filter',
    options: [...Array(5).keys()].map((number) => ({
      label: `Option ${number + 1}`,
      value: number + 1,
    })),
    popoverProps: {
      container: document.body,
    },
  },
};

export const Label: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Custom label',
    multiSelect: true,
  },
};

export const SearchTable: SingleFilterStory = {
  args: {
    ...(Default as SingleFilterStory).args,
    visibleResetButton: true,
  },
  argTypes: {
    ...disableArgTypes(['label', 'options', 'value']),
  },
  render: (args) => <FilterSearchTable {...args} />,
  parameters: {
    ...withTransformedRawSource(FilterSearchTableSource, 'IressFilterProps'),
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
  render: (args) => <FilterUsingState {...args} />,
  parameters: {
    ...withTransformedRawSource(FilterUsingStateSource, 'IressFilterProps'),
  },
};

export const MultiSelect: Story = {
  ...Default,
  args: {
    ...Default.args,
    multiSelect: true,
  },
};

export const Options: Story = {
  ...Default,
};

export const AsyncOptions: Story = {
  args: {
    ...Default.args,
    label: 'Filter',
    searchable: true,
  },
  argTypes: {
    ...disableArgTypes(['options']),
  },
  render: (args) => <FilterUsingAsync {...args} />,
  parameters: {
    ...withTransformedRawSource(FilterUsingAsyncSource, 'IressFilterProps'),
  },
};

export const InitialOptions: Story = {
  args: {
    ...Options.args,
    initialOptions: [...Array(3).keys()].map((number) => ({
      label: `Favourite option ${number + 1}`,
      value: `fav-${number + 1}`,
    })),
    searchable: true,
  },
};

export const ComplexOptions: Story = {
  args: {
    ...Default.args,
    label: 'User',
    options: [
      {
        value: 'opt1',
        label: 'John Smith',
        meta: [
          <IressText key="opt1-type" color="colour.neutral.70" element="small">
            Individual
          </IressText>,
          <IressText key="opt1-email" color="colour.neutral.70" element="small">
            test@iress.com
          </IressText>,
        ],
      },
      {
        value: 'opt2',
        label: 'Tom Wilson',
        meta: [
          <IressText key="opt2-type" color="colour.neutral.70" element="small">
            Individual
          </IressText>,
        ],
      },
      {
        value: 'opt3',
        label: 'Alice Kay',
        meta: [
          <IressText key="opt3-type" color="colour.neutral.70" element="small">
            Individual
          </IressText>,
        ],
        append: <IressBadge mode="success">Active</IressBadge>,
      },
      {
        value: 'opt4',
        label: 'John Smith',
        meta: [
          <IressText key="opt4-type" color="colour.neutral.70" element="small">
            Business
          </IressText>,
          <IressText key="opt4-phone" color="colour.neutral.70" element="small">
            0432325675
          </IressText>,
        ],
      },
      {
        value: 'opt5',
        label: 'Eelin Team',
        meta: [
          <IressText
            key="opt5-contact"
            color="colour.neutral.70"
            element="small"
          >
            test2@iress.com, 0432325675
          </IressText>,
        ],
      },
      {
        value: 'opt6',
        label: 'Eelin Team',
        meta: [
          <IressText
            key="opt6-contact"
            color="colour.neutral.70"
            element="small"
          >
            test3@iress.com, 0439873244
          </IressText>,
        ],
      },
    ],
  },
};

export const InputProps: Story = {
  args: {
    ...Options.args,
    inputProps: {
      placeholder: 'Search...',
    },
    searchable: true,
  },
};

export const Searchable: Story = {
  args: {
    ...Options.args,
    searchable: true,
  },
};

export const ResetFilters: Story = {
  args: {
    ...Options.args,
    visibleResetButton: true,
  },
};

export const NoResultsText: Story = {
  args: {
    ...Options.args,
    inputProps: {
      placeholder: 'Type "no" to see the no results text',
    },
    searchable: true,
    searchNoResultsText: <IressPanel>No results found</IressPanel>,
  },
};

export const PopoverProps: Story = {
  args: {
    ...Options.args,
    popoverProps: {
      ...Options.args?.popoverProps,
      footer: (
        <IressPanel>
          <IressButton>Add an option</IressButton>
        </IressPanel>
      ),
    },
  },
};

export const SelectedOptionsText: Story = {
  args: {
    ...Options.args,
    multiSelect: true,
    selectedOptionsText: '{{numOptions}} activated',
  },
};
