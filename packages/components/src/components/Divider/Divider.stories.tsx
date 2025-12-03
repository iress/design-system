import { type Meta, type StoryObj } from '@storybook/react';
import { IressDivider, type IressDividerProps } from '.';
import { IressInline } from '../Inline';
import { IressText } from '../Text';
import { IressStack } from '../Stack/Stack';
import { GUTTER_SIZES } from '@/constants';
import { IressPanel } from '../Panel';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressDivider>;

const getChildren = (args: IressDividerProps) => [
  <IressText key="1">Separate</IressText>,
  <IressDivider key="2" {...args} />,
  <IressText key="3">this</IressText>,
];

export default {
  title: 'Components/Divider',
  component: IressDivider,
} as Meta<typeof IressDivider>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: (args) => {
    if (args.vertical) {
      return (
        <IressInline gutter="md" verticalAlign="middle">
          {getChildren(args)}
        </IressInline>
      );
    }

    return <IressStack gutter="md">{getChildren(args)}</IressStack>;
  },
};

export const Gutter: Story = {
  argTypes: {
    ...disableArgTypes(['gutter']),
  },
  render: (args) => {
    if (args.vertical) {
      return (
        <IressStack gutter="md">
          {GUTTER_SIZES.map((gutter) => (
            <IressPanel key={gutter}>
              <IressText element="h2">{gutter}</IressText>
              <IressInline verticalAlign="middle">
                {getChildren({ ...args, gutter })}
              </IressInline>
            </IressPanel>
          ))}
        </IressStack>
      );
    }

    return (
      <IressInline gutter="md">
        {GUTTER_SIZES.map((gutter) => (
          <IressPanel key={gutter}>
            <IressText element="h2">{gutter}</IressText>
            {getChildren({ ...args, gutter })}
          </IressPanel>
        ))}
      </IressInline>
    );
  },
};
