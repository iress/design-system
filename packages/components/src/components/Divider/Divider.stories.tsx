import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressDivider } from '.';
import { IressInline } from '../Inline';
import { IressText } from '../Text';
import { disableArgTypes, stylingProps, withSource } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { DividerGutter } from './mocks/DividerGutter';
import DividerGutterSource from './mocks/DividerGutter.tsx?raw';

type Story = StoryObj<typeof IressDivider>;

export default {
  title: 'Components/Divider',
  component: IressDivider,
  tags: ['updated'],
  argTypes: {
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta: componentMeta.testMeta },
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressDivider>;

export const Default: Story = {};

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: (args) => (
    <IressInline gap="spacing.4" verticalAlign="middle">
      <IressText>Separate</IressText>
      <IressDivider {...args} />
      <IressText>this</IressText>
    </IressInline>
  ),
};

export const Gutter: Story = {
  argTypes: {
    ...disableArgTypes(['gap']),
  },
  render: (args) => <DividerGutter {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(DividerGutterSource, { stripImports: true, stripExportFunction: true }),
  },
};
