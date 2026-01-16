import React from 'react';
import ReactDOM from 'react-dom/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cssVars } from '@iress-oss/ids-tokens';

const App = () => {
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
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    subtitle: {
      text: 'Revenue in millions (USD)',
      style: {
        color: cssVars.colour.neutral['70'],
        fontSize: '14px',
      },
    },
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      labels: {
        style: {
          color: cssVars.colour.neutral['80'],
          fontSize: '12px',
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
        },
      },
      labels: {
        style: {
          color: cssVars.colour.neutral['80'],
          fontSize: '12px',
        },
      },
      gridLineColor: cssVars.colour.neutral['30'],
    },
    tooltip: {
      backgroundColor: cssVars.colour.neutral['10'],
      borderColor: cssVars.colour.neutral['40'],
      style: {
        color: cssVars.colour.neutral['90'],
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
        fontSize: '12px',
      },
      itemHoverStyle: {
        color: cssVars.colour.primary.text,
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
        backgroundColor: cssVars.colour.neutral['20'],
        minHeight: '100vh',
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
