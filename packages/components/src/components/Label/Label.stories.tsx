import { type StoryObj, type Meta } from '@storybook/react-vite';

import { IressLabel } from './Label';
import { IressIcon } from '../Icon';
import { IressInline } from '../Inline';
import {
  disableArgTypes,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressLabel>;

export default {
  title: 'Components/Label',
  component: IressLabel,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    append: reactNodeArgType,
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
} as Meta<typeof IressLabel>;

export const Default: Story = {
  args: {
    children: 'This is a label',
  },
};

export const Required: Story = {
  args: {
    children: 'This is a label for a required input',
    required: true,
  },
};

export const HiddenLabel: Story = {
  args: {
    hiddenLabel: true,
    children: 'This text is visible to screen readers only',
  },
};

export const LockedReadonly: Story = {
  args: {
    children: 'This label is locked',
    readOnly: 'locked',
  },
};

export const RichContent: Story = {
  args: {
    hiddenLabel: false,
    children: (
      <IressInline gap="md" verticalAlign="middle">
        <IressIcon name="home" />
        Home settings
        <IressIcon name="cog" />
      </IressInline>
    ),
  },
  argTypes: {
    ...disableArgTypes(['children']),
  },
};
