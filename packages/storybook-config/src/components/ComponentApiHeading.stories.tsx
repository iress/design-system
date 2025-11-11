import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentApiHeading } from './ComponentApiHeading';

type Story = StoryObj<typeof ComponentApiHeading>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ComponentApiHeading> = {
  title: 'Components/ApiHeading',
  component: ComponentApiHeading,
  tags: ['autodocs'],
};

export default meta;

export const ApiHeading: Story = {
  args: {
    children: 'Component API Heading',
    headingId: 'component-api-heading',
    headingLevel: 2,
  },
};
