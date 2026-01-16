import React from 'react';
import ReactDOM from 'react-dom/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cssVars } from '@iress-oss/ids-tokens';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// Helper function to extract hex color from CSS variable
const extractColor = (cssVar: string): string => {
  // Extract the fallback color from the var() syntax
  const regex = /#[0-9A-Fa-f]{6}/;
  const match = regex.exec(cssVar);
  return match ? match[0] : cssVar;
};

const App = () => {
  // Use IDS system colors for different data series
  const seriesColors = [
    extractColor(cssVars.colour.primary.fill),
    extractColor(cssVars.colour.system.success.fill),
    extractColor(cssVars.colour.system.info.fill),
  ];

  const options: Highcharts.Options = {
    colors: seriesColors,
    chart: {
      type: 'column',
      backgroundColor: extractColor(cssVars.colour.neutral['10']),
    },
    title: {
      text: 'Quarterly Revenue Comparison',
      style: {
        color: extractColor(cssVars.colour.neutral['90']),
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    subtitle: {
      text: 'Revenue in millions (USD)',
      style: {
        color: extractColor(cssVars.colour.neutral['70']),
        fontSize: '14px',
      },
    },
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      labels: {
        style: {
          color: extractColor(cssVars.colour.neutral['80']),
          fontSize: '12px',
        },
      },
      lineColor: extractColor(cssVars.colour.neutral['40']),
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Revenue ($M)',
        style: {
          color: extractColor(cssVars.colour.neutral['80']),
        },
      },
      labels: {
        style: {
          color: extractColor(cssVars.colour.neutral['80']),
          fontSize: '12px',
        },
      },
      gridLineColor: extractColor(cssVars.colour.neutral['30']),
    },
    tooltip: {
      backgroundColor: extractColor(cssVars.colour.neutral['10']),
      borderColor: extractColor(cssVars.colour.neutral['40']),
      style: {
        color: extractColor(cssVars.colour.neutral['90']),
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
        color: extractColor(cssVars.colour.neutral['80']),
        fontSize: '12px',
      },
      itemHoverStyle: {
        color: extractColor(cssVars.colour.primary.text),
      },
    },
    series: [
      {
        type: 'column',
        name: '2023',
        data: [45, 52, 58, 61],
      },
      {
        type: 'column',
        name: '2024',
        data: [52, 58, 64, 68],
      },
      {
        type: 'column',
        name: '2025 (Projected)',
        data: [58, 64, 70, 75],
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
        backgroundColor: extractColor(cssVars.colour.neutral['20']),
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: extractColor(cssVars.colour.neutral['10']),
          borderRadius: '8px',
          padding: '24px',
        }}
      >
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
