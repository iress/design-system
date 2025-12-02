import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SandboxLabel } from './SandboxLabel';

type Story = StoryObj<typeof SandboxLabel>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SandboxLabel> = {
  title: 'Components/Label',
  component: SandboxLabel,
  tags: ['autodocs'],
};

export default meta;

export const Label: Story = {};
