import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressDivider, type IressDividerProps } from '.';
import { IressInline } from '../Inline';
import { IressText } from '../Text';
import { IressStack } from '../Stack/Stack';
import { IressPanel } from '../Panel';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

const GUTTER_SIZES = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];

type Story = StoryObj<typeof IressDivider>;

const getChildren = (args: IressDividerProps) => [
  <IressText key="1">Separate</IressText>,
  <IressDivider key="2" {...args} />,
  <IressText key="3">this</IressText>,
];

export default {
  title: 'Components/Divider',
  component: IressDivider,
  tags: ['updated'],
} as Meta<typeof IressDivider>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: (args) => {
    if (args.vertical) {
      return (
        <IressInline gap="spacing.400" verticalAlign="middle">
          {getChildren(args)}
        </IressInline>
      );
    }

    return <IressStack gap="spacing.400">{getChildren(args)}</IressStack>;
  },
};

export const Gutter: Story = {
  argTypes: {
    ...disableArgTypes(['gap']),
  },
  render: (args) => {
    if (args.vertical) {
      return (
        <IressStack gap="spacing.100">
          {GUTTER_SIZES.map((mx) => (
            <IressPanel key={mx}>
              <IressText element="h2">
                <code>mx="{mx}"</code>
              </IressText>
              <IressInline verticalAlign="middle">
                {getChildren({
                  ...args,
                  mx,
                } as IressDividerProps)}
              </IressInline>
            </IressPanel>
          ))}
        </IressStack>
      );
    }

    return (
      <IressInline gap="spacing.400">
        {GUTTER_SIZES.map((my) => (
          <IressPanel key={my}>
            <IressText element="h2">
              <code>my="{my}"</code>
            </IressText>
            {getChildren({ ...args, my } as IressDividerProps)}
          </IressPanel>
        ))}
      </IressInline>
    );
  },
};
