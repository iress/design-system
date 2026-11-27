import { IressExpander } from '.';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressText } from '../Text';
import { IressCheckbox } from '../Checkbox';
import { IressInline } from '../Inline';
import { MultipleExpander } from './mocks/MultipleExpander';
import MultipleExpanderSource from './mocks/MultipleExpander.tsx?raw';
import { ExpanderMode } from './mocks/ExpanderMode';
import ExpanderModeSource from './mocks/ExpanderMode.tsx?raw';
import {
  componentStoryMeta,
  disableArgTypes,
  withSource,
  reactNodeArgType,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

export default {
  title: 'Components/Expander',
  component: IressExpander,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
    },
  }),
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
    ...withSource(ExpanderModeSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const Open: StoryObj<typeof IressExpander> = {
  args: {
    activator: 'Expander activator',
    children: 'Expander content will go here',
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

export const InlineActivator: StoryObj<typeof IressExpander> = {
  args: {
    activator: (
      <IressInline
        horizontalAlign="between"
        verticalAlign="middle"
        alignSelf="center"
      >
        <IressCheckbox>Income</IressCheckbox>
        <IressText color="colour.neutral.70">3 selected</IressText>
      </IressInline>
    ),
    children: 'Expander content will go here',
  },
};
