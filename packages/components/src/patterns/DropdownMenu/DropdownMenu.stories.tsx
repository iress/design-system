import { type Meta, type StoryObj } from '@storybook/react-vite';
import { TableWithFilters } from './mocks/TableWithFilters';
import TableWithFiltersSource from './mocks/TableWithFilters.tsx?raw';
import {
  withCustomSource,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';
import {
  IressAlert,
  IressDropdownMenu,
  IressMenuDivider,
  IressPill,
  IressSelectCreate,
  IressText,
  type IressDropdownMenuProps,
} from '@/main';
import { ControlledDropdownMenu } from './mocks/ControlledDropdownMenu';
import ControlledDropdownMenuSource from './mocks/ControlledDropdownMenu.tsx?raw';
import { ControlledDropdownMenuMultiselect } from './mocks/ControlledDropdownMenuMultiselect';
import ControlledDropdownMenuMultiselectSource from './mocks/ControlledDropdownMenuMultiselect.tsx?raw';
import { ControlledDropdownMenuAsync } from './mocks/ControlledDropdownMenuAsync';
import ControlledDropdownMenuAsyncSource from './mocks/ControlledDropdownMenuAsync.tsx?raw';

type Story = StoryObj<IressDropdownMenuProps<true>>;
type SingleStory = StoryObj<IressDropdownMenuProps<false>>;

export default {
  title: 'Patterns/DropdownMenu',
  component: IressDropdownMenu,
  tags: ['updated'],
  argTypes: {
    footer: reactNodeArgType,
    header: reactNodeArgType,
    searchNoResultsText: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof IressDropdownMenu>;

export const Default: SingleStory = {
  args: {
    label: 'Select an option',
  },
};

export const Controlled: SingleStory = {
  render: (args) => <ControlledDropdownMenu {...args} />,
  parameters: {
    ...withCustomSource(ControlledDropdownMenuSource),
  },
};

export const SearchTable: SingleStory = {
  render: (args) => <TableWithFilters {...args} />,
  parameters: {
    ...withTransformedRawSource(
      TableWithFiltersSource,
      'IressDropdownMenuProps',
    ),
  },
};

export const MultiSelect: Story = {
  render: (args) => <ControlledDropdownMenuMultiselect {...args} />,
  parameters: {
    ...withCustomSource(ControlledDropdownMenuMultiselectSource),
  },
};

export const Options: SingleStory = {
  args: {
    options: [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ],
    label: 'Options',
  },
};

export const AsyncOptions: SingleStory = {
  render: (args) => <ControlledDropdownMenuAsync {...args} />,
  parameters: {
    ...withCustomSource(ControlledDropdownMenuAsyncSource),
  },
};

export const InitialOptions: SingleStory = {
  args: {
    ...Options.args,
    label: 'Select an option',
    initialOptions: [...Array(3).keys()].map((number) => ({
      label: `Favourite option ${number + 1}`,
      value: `fav-${number + 1}`,
    })),
    searchable: true,
  },
};

export const ComplexOptions: SingleStory = {
  args: {
    label: 'Contact',
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
        append: <IressPill mode="70">Active</IressPill>,
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

export const InputProps: SingleStory = {
  args: {
    ...Options.args,
    inputProps: {
      placeholder: 'Search some stuff...',
    },
    searchable: true,
  },
};

export const Searchable: SingleStory = {
  args: {
    ...Options.args,
    searchable: true,
  },
};

export const ResetFilters: SingleStory = {
  args: {
    ...Options.args,
    visibleResetButton: true,
  },
};

export const NoResultsText: SingleStory = {
  args: {
    ...Options.args,
    inputProps: {
      placeholder: 'Type "no" to see the no results text',
    },
    searchable: true,
    searchNoResultsText: (
      <IressAlert variant="full-width" mb="none">
        No results found
      </IressAlert>
    ),
  },
};

export const PopoverProps: SingleStory = {
  args: {
    ...Options.args,
    footer: (
      <>
        <IressMenuDivider />
        <IressSelectCreate label="Add an option" />
      </>
    ),
  },
};

export const SelectedOptionsText: Story = {
  args: {
    ...(Options as Story).args,
    multiSelect: true,
    selectedOptionsText: ' - {{numOptions}}',
  },
};

export const StylingProps: SingleStory = {
  args: {
    ...Options.args,
    p: 'spacing.4',
  },
  render: (args) => <IressDropdownMenu {...args} p="spacing.4" />,
};
