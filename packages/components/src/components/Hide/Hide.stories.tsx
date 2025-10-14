import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressHide } from '.';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressStack } from '../Stack';
import { IressText } from '../Text';
import { CurrentBreakpoint } from '@iress-storybook/components';
import { IressPanel } from '../Panel';
import { IressDivider } from '../Divider';

type Story = StoryObj<typeof IressHide>;

export default {
  title: 'Components/Hide',
  component: IressHide,
  tags: ['caution:srOnly and hide props'],
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
      <IressStack gap="spacing.100">
        <IressPanel>
          <CurrentBreakpoint />
        </IressPanel>
        <IressDivider />
        <IressHide {...args} hiddenOn={{ xs: true }}>
          <IressText>
            This text is {description} hidden on xs screens and above.
          </IressText>
        </IressHide>
        <IressHide {...args} hiddenOn={{ md: true }}>
          <IressText color="colour.system.success.text">
            This text is {description} hidden on md screens and above.
          </IressText>
        </IressHide>
        <IressHide {...args} hiddenOn={{ xs: true, lg: false }}>
          <IressText color="colour.system.danger.text">
            This text is {description} hidden on md screens and below.
          </IressText>
        </IressHide>
        <IressHide {...args} hiddenOn={{ xs: true, sm: false }}>
          <IressText color="colour.system.info.text">
            This text is {description} hidden on xs screens only.
          </IressText>
        </IressHide>
        <IressHide {...args} hiddenOn={{ xl: true, xxl: false }}>
          <IressText color="colour.neutral.70">
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
