/* eslint-disable sonarjs/pseudo-random */
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PatternFill from 'highcharts/modules/pattern-fill';
import { cssVars } from '@iress-oss/ids-tokens';

// Initialize the pattern-fill module
if (typeof Highcharts === 'object') {
  PatternFill(Highcharts);
}

export const BarWithPatternsExample = () => {
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

  // Pattern types to differentiate series beyond color
  const patterns = [
    {
      pattern: {
        path: {
          d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
          strokeWidth: 2,
        },
      },
    },
    {
      pattern: {
        path: {
          d: 'M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9',
          strokeWidth: 2,
        },
      },
    },
    { pattern: { path: { d: 'M 3 0 L 3 10 M 8 0 L 8 10', strokeWidth: 2 } } },
    { pattern: { path: { d: 'M 0 3 L 10 3 M 0 8 L 10 8', strokeWidth: 2 } } },
    { pattern: { path: { d: 'M 0 0 L 5 10 L 10 0', strokeWidth: 2 } } },
    { pattern: { path: { d: 'M 3 3 L 8 3 L 8 8 L 3 8 Z', strokeWidth: 2 } } },
    { pattern: { path: { d: 'M 5 0 L 5 5 L 0 5', strokeWidth: 2 } } },
    { pattern: { path: { d: 'M 10 5 L 5 5 L 5 10', strokeWidth: 2 } } },
    {
      pattern: {
        path: {
          d: 'M 2 2 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 8 8 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0',
          strokeWidth: 2,
        },
      },
    },
    {
      pattern: {
        path: {
          d: 'M 0 5 L 2.5 2.5 L 5 5 L 7.5 2.5 L 10 5 L 10 0 L 0 0 Z',
          strokeWidth: 2,
        },
      },
    },
  ];

  // Generate 20 series with cycling colors and different patterns
  const series: Highcharts.SeriesOptionsType[] = Array.from(
    { length: 20 },
    (_, i) => {
      const baseColor = dataColors[i % dataColors.length];
      const patternDef = patterns[i % patterns.length];

      return {
        type: 'column',
        name: `Category ${i + 1}`,
        data: [Math.floor(Math.random() * 80 + 20)],
        color: {
          ...patternDef,
          pattern: {
            ...patternDef.pattern,
            color: baseColor,
            backgroundColor: cssVars.colour.neutral['10'],
          },
        } as Highcharts.PatternObject,
      };
    },
  );

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: cssVars.colour.neutral['10'],
    },
    title: {
      text: '20 Series Bar Chart with Patterns',
      style: {
        color: cssVars.colour.neutral['90'],
        font: cssVars.typography.heading['3'],
      },
    },
    subtitle: {
      text: 'Using fill patterns to differentiate beyond color',
      style: {
        color: cssVars.colour.neutral['70'],
        font: cssVars.typography.body.md.regular,
      },
    },
    xAxis: {
      categories: ['Q1 2024'],
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
      pointFormat: '<b>{point.y}</b>',
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
      column: {
        borderRadius: 4,
        dataLabels: {
          enabled: false,
        },
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
