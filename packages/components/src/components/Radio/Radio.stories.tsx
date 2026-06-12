import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressRadio } from '.';
import {
  reactNodeArgType,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { RadioVariants } from './mocks/RadioVariants';
import RadioVariantsSource from './mocks/RadioVariants.tsx?raw';
import { RadioReadOnly } from './mocks/RadioReadOnly';
import RadioReadOnlySource from './mocks/RadioReadOnly.tsx?raw';

type Story = StoryObj<typeof IressRadio>;

export default {
  title: 'Components/Radio',
  component: IressRadio,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: {
      testMeta: componentMeta.testMeta,
    },
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressRadio>;

export const Default: Story = {
  args: {
    children: 'Radio button',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: 'Checked radio button',
  },
};

export const ReadOnly: Story = {
  render: (args) => <RadioReadOnly {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(RadioReadOnlySource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Variants: Story = {
  render: (args) => <RadioVariants {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(RadioVariantsSource, { stripImports: true, stripExportFunction: true }),
  },
};
