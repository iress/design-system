import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeSandbox } from './CodeSandbox';
import ComponentUsingIDSSource from './mocks/ComponentUsingIDS.tsx?raw';
import ReactHTMLSource from './mocks/ReactHTML.html?raw';

type Story = StoryObj<typeof CodeSandbox>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CodeSandbox> = {
  title: 'Components/CodeSandbox',
  component: CodeSandbox,
};

export default meta;

export const IDS: Story = {
  args: {
    files: {
      'index.tsx': {
        content: ComponentUsingIDSSource,
        isBinary: false,
      },
      'index.html': {
        content: ReactHTMLSource,
        isBinary: false,
      },
      'package.json': {
        content: JSON.stringify(
          {
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
              '@iress-oss/ids-components': 'alpha',
            },
          },
          null,
          2,
        ),
        isBinary: false,
      },
    },
  },
};
