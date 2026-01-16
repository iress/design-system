import React from 'react';
import ReactDOM from 'react-dom/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { designTokens } from '@iress-oss/ids-tokens';

const App = () => {
  // Use IDS system colors for different data series
  const seriesColors = [
    designTokens.colour.primary.fill.$value,
    designTokens.colour.system.success.fill.$value,
    designTokens.colour.system.info.fill.$value,
  ];

  const options: Highcharts.Options = {
    colors: seriesColors,
    chart: {
      type: 'column',
      backgroundColor: designTokens.colour.neutral['10'].$value,
    },
    title: {
      text: 'Quarterly Revenue Comparison',
      style: {
        color: designTokens.colour.neutral['90'].$value,
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    subtitle: {
      text: 'Revenue in millions (USD)',
      style: {
        color: designTokens.colour.neutral['70'].$value,
        fontSize: '14px',
      },
    },
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      labels: {
        style: {
          color: designTokens.colour.neutral['80'].$value,
          fontSize: '12px',
        },
      },
      lineColor: designTokens.colour.neutral['40'].$value,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Revenue ($M)',
        style: {
          color: designTokens.colour.neutral['80'].$value,
        },
      },
      labels: {
        style: {
          color: designTokens.colour.neutral['80'].$value,
          fontSize: '12px',
        },
      },
      gridLineColor: designTokens.colour.neutral['30'].$value,
    },
    tooltip: {
      backgroundColor: designTokens.colour.neutral['10'].$value,
      borderColor: designTokens.colour.neutral['40'].$value,
      style: {
        color: designTokens.colour.neutral['90'].$value,
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
        color: designTokens.colour.neutral['80'].$value,
        fontSize: '12px',
      },
      itemHoverStyle: {
        color: designTokens.colour.primary.text.$value,
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
        backgroundColor: designTokens.colour.neutral['20'].$value,
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: designTokens.colour.neutral['10'].$value,
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
