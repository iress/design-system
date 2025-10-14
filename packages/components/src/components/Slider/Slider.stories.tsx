import { Meta, StoryObj } from '@storybook/react-vite';
import { IressSlider } from '.';
import { IressStack } from '../Stack';
import { CurrentBreakpoint } from '@iress-storybook/components';
import { IressPanel } from '../Panel';
import { IressText } from '../Text';

type Story = StoryObj<typeof IressSlider>;

export default {
  title: 'Components/Slider',
  component: IressSlider,
  tags: ['updated'],
} as Meta<typeof IressSlider>;

export const Default: Story = {};

export const DefaultValue: Story = {
  args: {
    defaultValue: 3,
  },
};

export const MinMaxAndStep: Story = {
  args: {
    min: 10,
    max: 100,
    step: 10,
  },
};

export const TicksAndLabels: Story = {
  args: {
    min: 0,
    max: 200,
    step: 20,
    tickLabels: [
      { value: 0, label: 'Zero' },
      { value: 20 },
      { value: 40 },
      { value: 60 },
      { value: 80 },
      { value: 100 },
      { value: 120 },
      { value: 140 },
      { value: 160 },
      { value: 180 },
      { value: 200, label: 'All' },
    ],
  },
};

export const FlexibleTicksAndLabels: Story = {
  args: {
    min: -10,
    max: 50,
    formatValue: (value) => `${value}°C`,
    tickLabels: [
      {
        value: 0,
        label: (
          <>
            0°C <br />
            Hypothermia
          </>
        ),
      },
      {
        value: 37,
        label: (
          <>
            37°C <br />
            Normal
          </>
        ),
      },
      {
        value: 45,
        label: (
          <>
            45°C <br />
            Wicked witch
            <br />
            of the west
          </>
        ),
      },
    ],
  },
};
FlexibleTicksAndLabels.parameters = {
  docs: {
    source: {
      code: `
<IressSlider
  min={-10}
  max={50}
  formatValue={(value) => \`\${value}°C\`}
  tickLabels={[
    { value: 0, label: <>0°C <br />Hypothermia</> },
    { value: 37, label: <>37°C <br />Normal</> },
    { value: 45, label: <>45°C <br />Wicked witch<br />of the west</> },
  ]}
/>
        `,
      language: 'jsx',
      type: 'auto',
    },
  },
};

export const HiddenLabels: Story = {
  args: {
    min: 0,
    max: 200,
    step: 20,
    tickLabels: [
      { value: 0, label: 'Zero' },
      { value: 20, srOnly: { base: true, xl: false } },
      { value: 40, srOnly: { base: true, xl: false } },
      { value: 60, srOnly: { base: true, xl: false } },
      { value: 80, srOnly: { base: true, xl: false } },
      { value: 100 },
      { value: 120, srOnly: { base: true, xl: false } },
      { value: 140, srOnly: { base: true, xl: false } },
      { value: 160, srOnly: { base: true, xl: false } },
      { value: 180, srOnly: { base: true, xl: false } },
      { value: 200, label: 'All' },
    ],
  },
  render: (args) => (
    <IressStack gap="md">
      <IressPanel bg="alt">
        <IressText>
          <CurrentBreakpoint />
        </IressText>
      </IressPanel>
      <IressSlider {...args} />
    </IressStack>
  ),
};

export const ReadOnly: Story = {
  args: {
    min: 0,
    max: 200,
    step: 20,
    value: 0,
    readOnly: true,
    tickLabels: [
      { value: 0, label: 'Zero' },
      { value: 200, label: 'All' },
    ],
  },
};
