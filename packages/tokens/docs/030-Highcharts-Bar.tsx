import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cssVars } from '@iress-oss/ids-tokens';

export const BarChartExample = () => {
  // Use IDS system colors for different data series
  const seriesColors = [
    cssVars.colour.primary.fill,
    cssVars.colour.system.success.fill,
    cssVars.colour.system.info.fill,
  ];

  const options: Highcharts.Options = {
    colors: seriesColors,
    chart: {
      type: 'column',
      backgroundColor: cssVars.colour.neutral['10'],
    },
    title: {
      text: 'Quarterly Revenue Comparison',
      style: {
        color: cssVars.colour.neutral['90'],
        font: cssVars.typography.heading['3'],
      },
    },
    subtitle: {
      text: 'Revenue in millions (USD)',
      style: {
        color: cssVars.colour.neutral['70'],
        font: cssVars.typography.body.md.regular,
      },
    },
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      labels: {
        style: {
          color: cssVars.colour.neutral['80'],
          font: cssVars.typography.body.sm.regular,
        },
      },
      lineColor: cssVars.colour.neutral['40'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Revenue ($M)',
        style: {
          color: cssVars.colour.neutral['80'],
          font: cssVars.typography.body.md.regular,
        },
      },
      labels: {
        style: {
          color: cssVars.colour.neutral['80'],
          font: cssVars.typography.body.sm.regular,
        },
      },
      gridLineColor: cssVars.colour.neutral['30'],
    },
    tooltip: {
      backgroundColor: cssVars.colour.neutral['10'],
      borderColor: cssVars.colour.neutral['40'],
      style: {
        color: cssVars.colour.neutral['90'],
        font: cssVars.typography.body.sm.regular,
      },
      shared: true,
      valueSuffix: 'M',
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        dataLabels: {
          enabled: false,
        },
      },
    },
    legend: {
      itemStyle: {
        color: cssVars.colour.neutral['80'],
        font: cssVars.typography.body.sm.regular,
      },
      itemHoverStyle: {
        color: cssVars.colour.primary.text,
      },
    },
    series: [
      {
        type: 'column',
        name: 'Product A',
        data: [45, 52, 48, 61],
      },
      {
        type: 'column',
        name: 'Product B',
        data: [38, 42, 51, 44],
      },
      {
        type: 'column',
        name: 'Product C',
        data: [29, 35, 39, 42],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: cssVars.colour.neutral['20'],
        minHeight: '400px',
      }}
    >
      <div
        style={{
          backgroundColor: cssVars.colour.neutral['10'],
          borderRadius: '8px',
          padding: '24px',
        }}
      >
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};
