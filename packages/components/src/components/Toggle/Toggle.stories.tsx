import { type StoryObj, type Meta } from '@storybook/react-vite';

import { IressToggle } from '.';
import {
  componentStoryMeta,
  disableArgTypes,
  withSource,
  reactNodeArgType,
} from '@iress-oss/ids-storybook-config';
import { ControlledToggle } from './mocks/ControlledToggle';
import ControlledToggleSource from './mocks/ControlledToggle.tsx?raw';
import { ToggleLayout } from './mocks/ToggleLayout';
import ToggleLayoutSource from './mocks/ToggleLayout.tsx?raw';
import componentMeta from './meta';

type Story = StoryObj<typeof IressToggle>;

export default {
  title: 'Components/Toggle',
  component: IressToggle,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
    },
  }),
} as Meta<typeof IressToggle>;

export const Default: Story = {
  args: {
    children: 'Toggle',
    layout: 'inline',
  },
};

export const HiddenLabel: Story = {
  args: {
    children: 'Toggle',
    hiddenLabel: true,
    layout: 'inline',
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
  argTypes: disableArgTypes(['checked', 'onChange']),
  render: (args) => <ControlledToggle {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ControlledToggleSource, { stripImports: true }),
  },
};

export const Layout: Story = {
  render: (args) => <ToggleLayout {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ToggleLayoutSource, { stripImports: true, stripExportFunction: true }),
  },
};
