import React from 'react';
import ReactDOM from 'react-dom/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { designTokens } from '@iress-oss/ids-tokens';

const App = () => {
  // Create a color palette from IDS data visualization tokens
  const chartColors = [
    designTokens.colour.data.bold['10'].$value,
    designTokens.colour.data.bold['30'].$value,
    designTokens.colour.data.bold['50'].$value,
    designTokens.colour.data.bold['70'].$value,
    designTokens.colour.data.bold['20'].$value,
    designTokens.colour.data.bold['40'].$value,
  ];

  const options: Highcharts.Options = {
    colors: chartColors,
    chart: {
      type: 'pie',
      backgroundColor: designTokens.colour.neutral['10'].$value,
    },
    title: {
      text: 'Market Share by Product Category',
      style: {
        color: designTokens.colour.neutral['90'].$value,
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
      backgroundColor: designTokens.colour.neutral['10'].$value,
      borderColor: designTokens.colour.neutral['40'].$value,
      style: {
        color: designTokens.colour.neutral['90'].$value,
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
            color: designTokens.colour.neutral['80'].$value,
            fontSize: '12px',
          },
        },
        showInLegend: true,
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
