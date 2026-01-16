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
  // Create a color palette from IDS data visualization tokens
  const chartColors = [
    extractColor(cssVars.colour.data.bold['10']),
    extractColor(cssVars.colour.data.bold['30']),
    extractColor(cssVars.colour.data.bold['50']),
    extractColor(cssVars.colour.data.bold['70']),
    extractColor(cssVars.colour.data.bold['20']),
    extractColor(cssVars.colour.data.bold['40']),
  ];

  const options: Highcharts.Options = {
    colors: chartColors,
    chart: {
      type: 'pie',
      backgroundColor: extractColor(cssVars.colour.neutral['10']),
    },
    title: {
      text: 'Market Share by Product Category',
      style: {
        color: extractColor(cssVars.colour.neutral['90']),
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
      backgroundColor: extractColor(cssVars.colour.neutral['10']),
      borderColor: extractColor(cssVars.colour.neutral['40']),
      style: {
        color: extractColor(cssVars.colour.neutral['90']),
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
          style: {
            color: extractColor(cssVars.colour.neutral['80']),
            fontSize: '12px',
          },
        },
        showInLegend: true,
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
        type: 'pie',
        name: 'Market Share',
        data: [
          { name: 'Equities', y: 35.5 },
          { name: 'Fixed Income', y: 28.3 },
          { name: 'Commodities', y: 15.2 },
          { name: 'Forex', y: 12.1 },
          { name: 'Derivatives', y: 5.8 },
          { name: 'Other', y: 3.1 },
        ],
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
