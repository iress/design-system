import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cssVars } from '@iress-oss/ids-tokens';

export const LineChartExample = () => {
  // Use data visualization bold colors for line series
  const lineColors = [
    cssVars.colour.data.bold['40'],
    cssVars.colour.data.bold['70'],
    cssVars.colour.data.bold['10'],
  ];

  const options: Highcharts.Options = {
    colors: lineColors,
    chart: {
      type: 'line',
      backgroundColor: cssVars.colour.neutral['10'],
    },
    title: {
      text: 'Stock Price Trends',
      style: {
        color: cssVars.colour.neutral['90'],
        font: cssVars.typography.heading['3'],
      },
    },
    subtitle: {
      text: 'Monthly average closing prices',
      style: {
        color: cssVars.colour.neutral['70'],
        font: cssVars.typography.body.md.regular,
      },
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        style: {
          color: cssVars.colour.neutral['80'],
          font: cssVars.typography.body.sm.regular,
        },
      },
      lineColor: cssVars.colour.neutral['40'],
    },
    yAxis: {
      title: {
        text: 'Price ($)',
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
      crosshairs: true,
      valuePrefix: '$',
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          radius: 4,
        },
        lineWidth: 2,
      },
      series: {
        marker: {
          states: {
            hover: {
              enabled: true,
              radius: 6,
            },
          },
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
        type: 'line',
        name: 'Tech Co',
        data: [120, 125, 128, 135, 142, 138, 145, 150, 155, 160, 158, 165],
      },
      {
        type: 'line',
        name: 'Finance Inc',
        data: [95, 98, 102, 105, 108, 110, 115, 118, 122, 125, 128, 130],
      },
      {
        type: 'line',
        name: 'Retail Ltd',
        data: [80, 82, 85, 88, 90, 92, 95, 98, 100, 103, 105, 108],
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
