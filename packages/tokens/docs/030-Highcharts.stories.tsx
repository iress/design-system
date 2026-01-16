import { CodeSandbox } from '@iress-oss/ids-storybook-config';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import PieChartTemplate from './030-Highcharts-Pie.template.tsx?raw';
import BarChartTemplate from './030-Highcharts-Bar.template.tsx?raw';
import LineChartTemplate from './030-Highcharts-Line.template.tsx?raw';
import AnimatedChartTemplate from './030-Highcharts-Animated.template.tsx?raw';
import SandboxHTML from './020-Sandbox.html?raw';

type Story = StoryObj<typeof CodeSandbox>;

export default {
  title: 'Highcharts Usage',
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

const basePackageJson = {
  dependencies: {
    react: 'latest',
    'react-dom': 'latest',
    radash: 'latest',
    '@iress-oss/ids-tokens': 'alpha',
    highcharts: 'latest',
    'highcharts-react-official': 'latest',
  },
};

export const PieChart: Story = {
  name: 'Pie Chart',
  args: {
    files: {
      'index.html': {
        content: SandboxHTML as string,
        isBinary: false,
      },
      'index.tsx': {
        content: PieChartTemplate as string,
        isBinary: false,
      },
      'package.json': {
        content: JSON.stringify(basePackageJson, null, 2),
        isBinary: false,
      },
    },
  },
};

export const BarChart: Story = {
  name: 'Bar Chart',
  args: {
    files: {
      'index.html': {
        content: SandboxHTML as string,
        isBinary: false,
      },
      'index.tsx': {
        content: BarChartTemplate as string,
        isBinary: false,
      },
      'package.json': {
        content: JSON.stringify(basePackageJson, null, 2),
        isBinary: false,
      },
    },
  },
};

export const LineChart: Story = {
  name: 'Line Chart',
  args: {
    files: {
      'index.html': {
        content: SandboxHTML as string,
        isBinary: false,
      },
      'index.tsx': {
        content: LineChartTemplate as string,
        isBinary: false,
      },
      'package.json': {
        content: JSON.stringify(basePackageJson, null, 2),
        isBinary: false,
      },
    },
  },
};

export const AnimatedChart: Story = {
  name: 'Animated Chart',
  args: {
    files: {
      'index.html': {
        content: SandboxHTML as string,
        isBinary: false,
      },
      'index.tsx': {
        content: AnimatedChartTemplate as string,
        isBinary: false,
      },
      'package.json': {
        content: JSON.stringify(basePackageJson, null, 2),
        isBinary: false,
      },
    },
  },
};
