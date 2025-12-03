import { type Meta, type StoryObj } from '@storybook/react';
import { IressHide } from '.';
import { IressStack } from '../Stack';
import { IressText } from '../Text';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressHide>;

export default {
  title: 'Components/Hide',
  component: IressHide,
} as Meta<typeof IressHide>;

export const Default: Story = {
  args: {
    children: 'Content to hide',
    hiddenOn: {
      xs: true,
      lg: false,
    },
  },
};

export const HiddenOn: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['children', 'hiddenOn']),
  },
  render: (args) => {
    const description = args.visuallyHidden ? 'visually ' : 'totally ';

    return (
      <IressStack>
        <IressHide {...args} hiddenOn={{ xs: true }}>
          <IressText>
            This text is {description} hidden on xs screens and above.
          </IressText>
        </IressHide>
        <IressHide {...args} hiddenOn={{ md: true }}>
          <IressText mode="success">
            This text is {description} hidden on md screens and above.
          </IressText>
        </IressHide>
        <IressHide {...args} hiddenOn={{ xs: true, lg: false }}>
          <IressText mode="danger">
            This text is {description} hidden on md screens and below.
          </IressText>
        </IressHide>
        <IressHide {...args} hiddenOn={{ xs: true, sm: false }}>
          <IressText mode="info">
            This text is {description} hidden on xs screens only.
          </IressText>
        </IressHide>
        <IressHide {...args} hiddenOn={{ xl: true, xxl: false }}>
          <IressText mode="muted">
            This text is {description} hidden on xl screens only.
          </IressText>
        </IressHide>
      </IressStack>
    );
  },
};

export const VisuallyHidden: Story = {
  ...HiddenOn,
  args: {
    ...HiddenOn.args,
    visuallyHidden: true,
  },
};
