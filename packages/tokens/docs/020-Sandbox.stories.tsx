import { CodeSandbox } from '@iress-oss/ids-storybook-config';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import SandboxHTML from './020-Sandbox.html?raw';
import SandboxTemplate from './020-Sandbox.template.tsx?raw';

type Story = StoryObj<typeof CodeSandbox>;

export default {
  title: 'Sandbox',
  component: CodeSandbox,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      disable: true,
    },
  },
} as Meta<typeof CodeSandbox>;

export const Sandbox: Story = {
  args: {
    files: {
      'index.html': {
        content: SandboxHTML as string,
        isBinary: false,
      },
      'index.tsx': {
        content: SandboxTemplate as string,
        isBinary: false,
      },
      'package.json': {
        content: JSON.stringify(
          {
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
              radash: 'latest',
              '@iress-oss/ids-tokens': 'alpha',
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
