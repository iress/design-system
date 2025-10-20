import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleStories } from './ToggleStories';
import { ThemeProvider } from 'storybook/internal/theming';
import { fn } from 'storybook/test';

type Story = StoryObj<typeof ToggleStories>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ToggleStories> = {
  title: 'ToggleStories',
  component: ToggleStories,
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
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const Inactive: Story = {
  args: {
    active: false,
  },
};

export const Active: Story = {
  args: {
    active: true,
    api: {
      experimental_setFilter: fn(),
    } as never,
  },
};

export const Disabled: Story = {
  args: {
    active: true,
    api: {
      experimental_setFilter: fn(),
    } as never,
    disable: () => true,
  },
};
