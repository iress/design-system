import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressReadonly, type IressReadonlyProps } from './Readonly';
import { IressInline } from '../Inline';
import { IressIcon } from '../Icon';
import { IressText } from '../Text';
import {
  componentStoryMeta,
  disableArgTypes,
  reactNodeArgType,
  withSource,
} from '@iress-oss/ids-storybook-config';
import { ReadonlyEditToggle } from './mocks/ReadonlyEditToggle';
import ReadonlyEditToggleSource from './mocks/ReadonlyEditToggle.tsx?raw';
import componentMeta from './meta';

type Story = StoryObj<IressReadonlyProps>;

export default {
  title: 'Components/Readonly',
  component: IressReadonly,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      ...disableArgTypes(['children']),
      children: reactNodeArgType,
    },
  }),
} as Meta<typeof IressReadonly>;

export const Default: Story = {
  args: {
    value: 'AU',
  },
};

export const RichContent: Story = {
  args: {
    value: 'AU',
    children: (
      <IressInline verticalAlign="middle" gap="sm">
        <IressIcon name="flag" /> Australia
      </IressInline>
    ),
  },
};

export const InlineStyle: Story = {
  args: {
    value: 'AU',
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
    controls: { disable: true },
    ...withSource(ReadonlyEditToggleSource, { stripImports: true }),
  },
};

export const Locked: Story = {
  args: {
    value: 'AU',
    variant: 'locked',
  },
};
