/* eslint-disable sonarjs/pseudo-random */
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/modules/pattern-fill';
import { cssVars } from '@iress-oss/ids-tokens';

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

  const dataSubtleColors = [
    cssVars.colour.data.subtle['10'],
    cssVars.colour.data.subtle['20'],
    cssVars.colour.data.subtle['30'],
    cssVars.colour.data.subtle['40'],
    cssVars.colour.data.subtle['50'],
    cssVars.colour.data.subtle['60'],
    cssVars.colour.data.subtle['70'],
    cssVars.colour.data.subtle['80'],
    cssVars.colour.data.subtle['90'],
  ];

  // Generate 20 series with cycling colors and different patterns
  const series: Highcharts.SeriesOptionsType[] = Array.from(
    { length: 20 },
    (_, i) => {
      const baseColor = dataColors[i % dataColors.length];
      const subtleColor = dataSubtleColors[i % dataSubtleColors.length];

      // Determine pattern index based on series number
      const getPatternIndex = () => {
        if (i > 18) return 2;
        if (i > 9) return 3;
        return undefined;
      };

      const patternIndex = getPatternIndex();

      return {
        type: 'column',
        name: `Category ${i + 1}`,
        data: [Math.floor(Math.random() * 80 + 20)],
        color:
          patternIndex !== undefined
            ? {
                pattern: {
                  ...Highcharts.patterns[patternIndex],
                  color: baseColor,
                  backgroundColor: subtleColor,
                },
              }
            : baseColor,
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
