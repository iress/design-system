import { type Meta, type StoryObj } from '@storybook/react-vite';
import { withCustomSource } from '@iress-oss/ids-storybook-config';
import { PieChartExample } from './030-Highcharts-Pie';
import PieChartSource from './030-Highcharts-Pie.tsx?raw';
import { BarChartExample } from './030-Highcharts-Bar';
import BarChartSource from './030-Highcharts-Bar.tsx?raw';
import { LineChartExample } from './030-Highcharts-Line';
import LineChartSource from './030-Highcharts-Line.tsx?raw';
import { AnimatedChartExample } from './030-Highcharts-Animated';
import AnimatedChartSource from './030-Highcharts-Animated.tsx?raw';
import { LineWithPatternsExample } from './030-Highcharts-LineWithPatterns';
import LineWithPatternsSource from './030-Highcharts-LineWithPatterns.tsx?raw';
import { BarWithPatternsExample } from './030-Highcharts-BarWithPatterns';
import BarWithPatternsSource from './030-Highcharts-BarWithPatterns.tsx?raw';

export default {
  title: 'Highcharts Usage',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

export const PieChart: StoryObj = {
  name: 'Pie Chart',
  render: () => <PieChartExample />,
  parameters: {
    ...withCustomSource(PieChartSource as string),
  },
};

export const BarChart: StoryObj = {
  name: 'Bar Chart',
  render: () => <BarChartExample />,
  parameters: {
    ...withCustomSource(BarChartSource as string),
  },
};

export const LineChart: StoryObj = {
  name: 'Line Chart',
  render: () => <LineChartExample />,
  parameters: {
    ...withCustomSource(LineChartSource as string),
  },
};

export const AnimatedChart: StoryObj = {
  name: 'Animated Chart',
  render: () => <AnimatedChartExample />,
  parameters: {
    ...withCustomSource(AnimatedChartSource as string),
  },
};

export const LineWith20Series: StoryObj = {
  name: 'Line Chart - 20 Series with Patterns',
  render: () => <LineWithPatternsExample />,
  parameters: {
    ...withCustomSource(LineWithPatternsSource as string),
  },
};

export const BarWith20Series: StoryObj = {
  name: 'Bar Chart - 20 Series with Patterns',
  render: () => <BarWithPatternsExample />,
  parameters: {
    ...withCustomSource(BarWithPatternsSource as string),
  },
};
