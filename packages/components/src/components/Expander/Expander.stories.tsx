import { IressExpander } from '.';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressText } from '../Text';
import { IressCheckbox } from '../Checkbox';
import { IressInline } from '../Inline';
import { MultipleExpander } from './mocks/MultipleExpander';
import MultipleExpanderSource from './mocks/MultipleExpander.tsx?raw';
import { IressStack } from '../Stack';
import {
  disableArgTypes,
  withCustomSource,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

export default {
  title: 'Components/Expander',
  component: IressExpander,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof IressExpander>;

export const Default: StoryObj<typeof IressExpander> = {
  args: {
    activator: 'Expander activator',
    children: 'Expander content will go here',
  },
};

export const BugReproduction: StoryObj<typeof IressExpander> = {
  name: 'Bug: Inline activator alignment',
  args: {
    activator: (
      <IressInline
        horizontalAlign="between"
        verticalAlign="middle"
        alignSelf="center"
        pr="spacing.3"
      >
        <IressCheckbox>Income</IressCheckbox>
        <IressText color="colour.neutral.70">3 selected</IressText>
      </IressInline>
    ),
    children: 'Expander content will go here',
  },
  parameters: {
    docs: {
      description: {
        story: `
**Problem Summary:** Inline content with \`horizontalAlign="between"\` inside the Expander activator does not use the available width.

**Expected Behavior:** The checkbox is aligned to the left and the selected count to the right.

**How to Test:** View the activator and confirm the two items are spaced across its width.
        `,
      },
    },
  },
};

export const Mode: StoryObj<typeof IressExpander> = {
  args: {
    ...Default.args,
  },
  argTypes: {
    ...disableArgTypes(['mode', 'activator', 'children']),
  },
  render: (args) => (
    <IressStack gap="lg">
      <IressStack gap="xs">
        <IressText element="h2">Section (default)</IressText>
        <IressExpander {...args} mode="section" />
      </IressStack>
      <IressStack gap="xs">
        <IressText element="h2">Link</IressText>
        <IressExpander {...args} mode="link" />
      </IressStack>
    </IressStack>
  ),
};

export const Open: StoryObj<typeof IressExpander> = {
  args: {
    ...Default.args,
    open: true,
  },
};

export const Multiple: StoryObj<typeof IressExpander> = {
  argTypes: disableArgTypes([
    'open',
    'mode',
    'activator',
    'onChange',
    'children',
  ]),
  render: () => <MultipleExpander />,
  parameters: {
    ...withCustomSource(MultipleExpanderSource),
  },
};
