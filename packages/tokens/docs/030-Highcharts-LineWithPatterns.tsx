/* eslint-disable sonarjs/pseudo-random */
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cssVars } from '@iress-oss/ids-tokens';

export const LineWithPatternsExample = () => {
  // Use data visualization colors, cycling through them for 20 series
  const dataColors = [
    cssVars.colour.data.bold['10'],
    cssVars.colour.data.bold['20'],
    cssVars.colour.data.bold['30'],
    cssVars.colour.data.bold['40'],
    cssVars.colour.data.bold['50'],
    cssVars.colour.data.bold['60'],
    cssVars.colour.data.bold['70'],
    cssVars.colour.data.bold['80'],
    cssVars.colour.data.bold['90'],
  ];

  // Line styles to differentiate series beyond color
  const lineStyles = [
    'Solid',
    'ShortDash',
    'ShortDot',
    'ShortDashDot',
    'Dot',
    'Dash',
    'LongDash',
    'DashDot',
    'LongDashDot',
    'LongDashDotDot',
  ];

  // Generate 20 series with cycling colors and different line styles
  const series: Highcharts.SeriesOptionsType[] = Array.from(
    { length: 20 },
    (_, i) => ({
      type: 'line',
      name: `Series ${i + 1}`,
      color: dataColors[i % dataColors.length],
      dashStyle: lineStyles[i % lineStyles.length] as Highcharts.DashStyleValue,
      data: Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 50 + 20 + i * 5),
      ),
      marker: {
        enabled: false,
      },
    }),
  );

  const options: Highcharts.Options = {
    colors: dataColors,
    chart: {
      type: 'line',
      backgroundColor: cssVars.colour.neutral['10'],
    },
    title: {
      text: '20 Series Line Chart with Patterns',
      style: {
        color: cssVars.colour.neutral['90'],
        font: cssVars.typography.heading['3'],
      },
    },
    subtitle: {
      text: 'Using line styles (solid, dashed, dotted) to differentiate beyond color',
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
        text: 'Value',
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
    plotOptions: {
      line: {
        lineWidth: 2,
      },
    },
    series,
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
