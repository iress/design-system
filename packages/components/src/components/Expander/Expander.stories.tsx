import { IressExpander } from '.';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { MultipleExpander } from './mocks/MultipleExpander';
import MultipleExpanderSource from './mocks/MultipleExpander.tsx?raw';
import { ExpanderMode } from './mocks/ExpanderMode';
import ExpanderModeSource from './mocks/ExpanderMode.tsx?raw';
import {
  disableArgTypes,
  withSource,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

export default {
  title: 'Components/Expander',
  component: IressExpander,
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
} as Meta<typeof IressExpander>;

export const Default: StoryObj<typeof IressExpander> = {
  args: {
    activator: 'Expander activator',
    children: 'Expander content will go here',
  },
};

export const Mode: StoryObj<typeof IressExpander> = {
  render: (args) => <ExpanderMode {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ExpanderModeSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Open: StoryObj<typeof IressExpander> = {
  args: {
    ...Default.args,
    open: true,
  },
};

export const Accordion: StoryObj<typeof IressExpander> = {
  argTypes: disableArgTypes([
    'open',
    'mode',
    'activator',
    'onChange',
    'children',
  ]),
  render: (args) => <MultipleExpander {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MultipleExpanderSource, { stripImports: true }),
  },
};
