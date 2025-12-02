import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VersionBadge } from './VersionBadge';
import { ThemeProvider } from 'storybook/theming';

type Story = StoryObj<typeof VersionBadge>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof VersionBadge> = {
  title: 'VersionBadge',
  component: VersionBadge,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider
        theme={{
          textMutedColor: '#6f6f6f',
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

export const Default: Story = {
  args: {
    environment: 'Production',
    version: '1.2.3',
  },
};

export const Fn: Story = {
  args: {
    environment: () => {
      if (window.location.host.includes('localhost')) {
        return 'Local';
      }

      if (window.location.host === 'staging') {
        return 'Staging';
      }

      if (window.location.origin.includes('dev')) {
        return 'Dev';
      }

      if (window.location.origin.includes('chromatic')) {
        return 'Chromatic';
      }

      return '';
    },
    version: '1.2.3',
  },
};

export const Async: Story = {
  args: {
    version: async () => {
      const packageJson = await import('../../package.json');
      return packageJson.version;
    },
  },
};
