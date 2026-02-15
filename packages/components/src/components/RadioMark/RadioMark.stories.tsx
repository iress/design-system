import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressRadioMark } from './RadioMark';
import { IressStack } from '../Stack';
import { IressText } from '../Text';
import { stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressRadioMark>;

export default {
  title: 'Components/RadioMark',
  component: IressRadioMark,
  tags: ['updated'],
  argTypes: {
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: `
The \`IressRadioMark\` component renders the SVG circle used to indicate a selected radio button.
This is typically used internally by the \`IressRadio\` component, but can be used standalone for custom implementations.

**Key Features:**
- Circular SVG indicator for radio button state
- \`checked\` prop controls visibility of the inner circle
- Inherits color from parent for theming
- Supports all standard CSS styling props
        `,
      },
    },
  },
} as Meta<typeof IressRadioMark>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <IressStack gap="md">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <IressRadioMark {...args} />
        <IressText>Unchecked (default)</IressText>
      </div>
    </IressStack>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of checked and unchecked states side by side.',
      },
    },
  },
  render: () => (
    <IressStack gap="md">
      <IressText>
        <IressRadioMark checked={false} />
        Unchecked
      </IressText>
      <IressText>
        <IressRadioMark checked={true} />
        Checked
      </IressText>
    </IressStack>
  ),
};

export const CustomSizing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The RadioMark inherits the font size from its parent, making it easy to scale. Uses `em` units for width and height.',
      },
    },
  },
  render: () => (
    <IressStack gap="lg">
      <IressText element="span" textStyle="typography.body.sm">
        <IressRadioMark checked={true} />
        Small
      </IressText>
      <IressText element="span" textStyle="typography.body.md">
        <IressRadioMark checked={true} />
        Medium
      </IressText>
    </IressStack>
  ),
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The RadioMark uses `currentColor` for the inner circle, so it inherits the text color from its parent.',
      },
    },
  },
  render: () => (
    <IressStack gap="md">
      <IressText>
        <IressRadioMark checked={true} />
        By default, inherits text colour
      </IressText>
      <IressText>
        <IressRadioMark color="colour.system.danger.fill" />
        <IressRadioMark checked={true} color="colour.system.danger.fill" />
        Can be set to any color using the color prop, but will not change on
        hover or focus when used outside of a radio button context
      </IressText>
    </IressStack>
  ),
};
