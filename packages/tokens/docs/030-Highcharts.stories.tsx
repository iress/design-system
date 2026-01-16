import { type Meta, type StoryObj } from '@storybook/react-vite';
import { PieChartExample } from './030-Highcharts-Pie';
import { BarChartExample } from './030-Highcharts-Bar';
import { LineChartExample } from './030-Highcharts-Line';
import { AnimatedChartExample } from './030-Highcharts-Animated';

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
};

export const BarChart: StoryObj = {
  name: 'Bar Chart',
  render: () => <BarChartExample />,
};

export const LineChart: StoryObj = {
  name: 'Line Chart',
  render: () => <LineChartExample />,
};

export const AnimatedChart: StoryObj = {
  name: 'Animated Chart',
  render: () => <AnimatedChartExample />,
};
