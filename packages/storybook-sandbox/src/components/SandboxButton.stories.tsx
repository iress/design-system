import type { Meta, StoryObj } from '@storybook/react-vite';
import { SandboxButton } from './SandboxButton';
import { ThemeProvider } from 'storybook/internal/theming';
import { fn } from 'storybook/test';
import { createSandboxIconFontPortal } from '../helpers';

type Story = StoryObj<typeof SandboxButton>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SandboxButton> = {
  title: 'Components/Button',
  component: SandboxButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider
        theme={{
          background: {
            hoverable: '#f0f0f0',
          } as never,
          barTextColor: '#6f6f6f',
          barHoverColor: '#000000',
          barSelectedColor: '#000000',
          color: {
            secondary: '#6f6f6f',
          } as never,
          input: {
            borderRadius: 3,
          } as never,
          typography: {
            size: {
              s1: 12,
            } as never,
            weight: {
              bold: 600,
            } as never,
          } as never,
        }}
      >
        <Story />
        {createSandboxIconFontPortal()}
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const Button: Story = {
  args: {
    label: 'Scopes',
    icon: 'apps',
    onClick: fn(),
  },
};
