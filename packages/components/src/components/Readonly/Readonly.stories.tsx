import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressReadonly, type IressReadonlyProps } from './Readonly';
import { IressInline } from '../Inline';
import { IressIcon } from '../Icon';
import { IressText } from '../Text';
import {
  disableArgTypes,
  reactNodeArgType,
  stylingProps,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';
import { ReadonlyEditToggle } from './mocks/ReadonlyEditToggle';
import ReadonlyEditToggleSource from './mocks/ReadonlyEditToggle.tsx?raw';
import componentMeta from './meta';

type Story = StoryObj<IressReadonlyProps>;

export default {
  title: 'Components/Readonly',
  component: IressReadonly,
  argTypes: {
    ...disableArgTypes(['children']),
    children: reactNodeArgType,
    ...stylingProps,
  },
  tags: ['updated'],
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressReadonly>;

export const Default: Story = {
  args: {
    append: '',
    prepend: '',
    value: 'AU',
  },
};

export const RichContent: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <IressInline verticalAlign="middle" gap="sm">
        <IressIcon name="flag" /> Australia
      </IressInline>
    ),
  },
};

export const InlineStyle: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <IressInline verticalAlign="middle" gap="sm">
        <IressIcon name="flag" /> Australia
      </IressInline>
    ),
    prepend: <IressText color="colour.neutral.70">Prepend</IressText>,
    append: <IressText color="colour.neutral.70">Append</IressText>,
    inline: true,
  },
};

export const Actions: Story = {
  ...Default,
  args: {
    ...Default.args,
    value: 'AU',
  },
  argTypes: {
    ...disableArgTypes(['actions']),
  },
  render: (args) => <ReadonlyEditToggle {...args} />,
  parameters: {
    ...withTransformedRawSource(
      ReadonlyEditToggleSource,
      'IressReadonlyProps',
      ['actions'],
    ),
  },
};

export const Locked: Story = {
  args: {
    value: 'AU',
    variant: 'locked',
  },
};
