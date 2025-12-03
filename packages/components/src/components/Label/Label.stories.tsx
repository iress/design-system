import { type StoryObj, type Meta } from '@storybook/react';

import { IressLabel } from './Label';
import { IressIcon } from '../Icon';
import { IressInline } from '../Inline';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressLabel>;

export default {
  title: 'Components/Label',
  component: IressLabel,
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

export const Optional: Story = {
  args: {
    children: 'This is a label for an optional input',
    optional: true,
  },
};

export const OptionalText: Story = {
  args: {
    ...Optional.args,
    optional: '(选修的)',
  },
};

export const HiddenLabel: Story = {
  args: {
    hiddenLabel: true,
    children: 'This text is visible to screen readers only',
  },
};

export const RichContent: Story = {
  args: {
    hiddenLabel: false,
    children: (
      <IressInline gutter="md" verticalAlign="middle">
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
