import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressButtonGroup, type IressButtonGroupProps } from '.';
import { IressButton } from '../Button/Button';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressTooltip } from '../Tooltip';
import { IressIcon } from '../Icon';
import { IressToasterProvider, useToaster } from '../Toaster';
import { IressText } from '../Text';
import { IressDivider } from '../Divider';

type Story = StoryObj<IressButtonGroupProps<string>>;
type MultipleStory = StoryObj<IressButtonGroupProps<string, true>>;

export default {
  title: 'Components/ButtonGroup',
  component: IressButtonGroup,
  argTypes: {
    ...disableArgTypes(['children']),
  },
  tags: ['updated'],
} as Meta<typeof IressButtonGroup>;

export const ButtonChildren: Story = {
  args: {
    children: [
      <IressButton key="1">Option 1</IressButton>,
      <IressButton key="2">Option 2</IressButton>,
      <IressButton key="3">Option 3</IressButton>,
      <IressButton key="4">Option 4</IressButton>,
    ],
    label: 'Button group',
  },
};

export const RichButtons: Story = {
  args: {
    children: [
      <IressTooltip key="left" tooltipText="Left">
        <IressButton value="left">
          <IressIcon name="align-left" />
          <span className="iress-sr-only">Left</span>
        </IressButton>
      </IressTooltip>,
      <IressTooltip key="center" tooltipText="Center">
        <IressButton value="center">
          <IressIcon name="align-center" />
          <span className="iress-sr-only">Center</span>
        </IressButton>
      </IressTooltip>,
      <IressTooltip key="right" tooltipText="Right">
        <IressButton value="right">
          <IressIcon name="align-right" />
          <span className="iress-sr-only">Right</span>
        </IressButton>
      </IressTooltip>,
      <IressDivider key="divider" vertical mx="xs" />,
      <IressTooltip key="justify" tooltipText="Justify">
        <IressButton value="justify">
          <IressIcon name="align-justify" />
          <span className="iress-sr-only">Justify</span>
        </IressButton>
      </IressTooltip>,
    ],
    label: 'Text alignment',
  },
};

export const MultiSelect: MultipleStory = {
  args: {
    ...(ButtonChildren as MultipleStory).args,
    multiple: true,
    label: 'Multiple options can be selected',
  },
};

export const SelectedSingle: Story = {
  args: {
    ...ButtonChildren.args,
    defaultSelected: 'Option 2',
    label: 'Selected option for single select',
  },
};

export const SelectedMultiple: MultipleStory = {
  args: {
    ...MultiSelect.args,
    defaultSelected: ['Option 2', 'Option 4'],
    label: 'Selected option for multi-select',
  },
};

export const OnChange: Story = {
  args: {
    ...ButtonChildren.args,
    label: 'Trigger toasts by selecting an option below',
  },
  render: (args) => {
    const { success } = useToaster();

    return (
      <IressButtonGroup
        {...args}
        onChange={(selected) => {
          success({
            content: `Selected: ${selected ? String(selected) : 'none'}`,
          });
        }}
      />
    );
  },
  decorators: [
    (Story) => (
      <IressToasterProvider>
        <Story />
      </IressToasterProvider>
    ),
  ],
};

export const HiddenLabel: Story = {
  args: {
    ...ButtonChildren.args,
    hiddenLabel: true,
  },
};

export const HeadingLabel: Story = {
  args: {
    ...ButtonChildren.args,
    label: <IressText element="h2">Heading as label</IressText>,
  },
};
