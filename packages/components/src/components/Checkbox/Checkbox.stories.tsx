import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressCheckbox } from '.';
import { IressCheckboxMark } from '../CheckboxMark';
import {
  reactNodeArgType,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { CheckboxVariants } from './mocks/CheckboxVariants';
import CheckboxVariantsSource from './mocks/CheckboxVariants.tsx?raw';
import { CheckboxReadOnly } from './mocks/CheckboxReadOnly';
import CheckboxReadOnlySource from './mocks/CheckboxReadOnly.tsx?raw';
import { CheckboxWithTable } from './mocks/CheckboxWithTable';
import CheckboxWithTableSource from './mocks/CheckboxWithTable.tsx?raw';

type Story = StoryObj<typeof IressCheckbox>;

export default {
  title: 'Components/Checkbox',
  component: IressCheckbox,
  subcomponents: { IressCheckboxMark },
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressCheckbox>;

export const Default: Story = {
  args: {
    children: 'A checkbox',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: 'A checkbox which is checked and in controlled mode',
  },
};

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
    children: 'A checkbox which is initially checked',
  },
};

export const HiddenLabel: Story = {
  args: {
    hiddenLabel: true,
    children:
      "A checkbox with a hidden label (if you're reading this, you're pretty clever)",
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    children: 'A checkbox which is initially in an indeterminate state',
  },
};

export const Variants: Story = {
  render: (args) => <CheckboxVariants {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(CheckboxVariantsSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const WithTableData: Story = {
  render: (args) => <CheckboxWithTable {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(CheckboxWithTableSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const ReadOnly: Story = {
  render: (args) => <CheckboxReadOnly {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(CheckboxReadOnlySource, { stripImports: true, stripExportFunction: true }),
  },
};
