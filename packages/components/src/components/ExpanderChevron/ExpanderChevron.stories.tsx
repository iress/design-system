import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressExpanderChevron } from './ExpanderChevron';
import { IressStack } from '../Stack';
import { IressText } from '../Text';

type Story = StoryObj<typeof IressExpanderChevron>;

export default {
  title: 'Components/ExpanderChevron',
  component: IressExpanderChevron,
  tags: ['updated'],
  parameters: {
    docs: {
      description: {
        component: `
The \`IressExpanderChevron\` component renders the SVG chevron icon used to indicate expandable content.
This is used internally by the \`IressExpander\` and \`IressTableBody\` components.

**Key Features:**
- Circular grey background with chevron icon
- \`open\` prop controls rotation (180° when open)
- Smooth transition animation
- Supports className for additional styling
        `,
      },
    },
  },
} as Meta<typeof IressExpanderChevron>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <IressStack gap="md">
      <IressText>
        <IressExpanderChevron {...args} /> Closed (default)
      </IressText>
    </IressStack>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of open and closed states side by side.',
      },
    },
  },
  render: () => (
    <IressStack gap="md">
      <IressText>
        <IressExpanderChevron open={false} /> Closed
      </IressText>
      <IressText>
        <IressExpanderChevron open={true} /> Open
      </IressText>
    </IressStack>
  ),
};
