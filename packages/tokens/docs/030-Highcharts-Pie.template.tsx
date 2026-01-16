import React from 'react';
import ReactDOM from 'react-dom/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cssVars } from '@iress-oss/ids-tokens';

const App = () => {
  // Create a color palette from IDS data visualization tokens
  const chartColors = [
    cssVars.colour.data.bold['10'],
    cssVars.colour.data.bold['30'],
    cssVars.colour.data.bold['50'],
    cssVars.colour.data.bold['70'],
    cssVars.colour.data.bold['20'],
    cssVars.colour.data.bold['40'],
  ];

  const options: Highcharts.Options = {
    colors: chartColors,
    chart: {
      type: 'pie',
      backgroundColor: cssVars.colour.neutral['10'],
    },
    title: {
      text: 'Market Share by Product Category',
      style: {
        color: cssVars.colour.neutral['90'],
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
      backgroundColor: cssVars.colour.neutral['10'],
      borderColor: cssVars.colour.neutral['40'],
      style: {
        color: cssVars.colour.neutral['90'],
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
            color: cssVars.colour.neutral['80'],
            fontSize: '12px',
          },
        },
        showInLegend: true,
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
