import React from 'react';
import ReactDOM from 'react-dom/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { designTokens } from '@iress-oss/ids-tokens';

const App = () => {
  // Use data visualization bold colors for line series
  const lineColors = [
    designTokens.colour.data.bold['40'].$value,
    designTokens.colour.data.bold['70'].$value,
    designTokens.colour.data.bold['10'].$value,
  ];

  const options: Highcharts.Options = {
    colors: lineColors,
    chart: {
      type: 'line',
      backgroundColor: designTokens.colour.neutral['10'].$value,
    },
    title: {
      text: 'Stock Price Trends',
      style: {
        color: designTokens.colour.neutral['90'].$value,
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    subtitle: {
      text: 'Monthly average closing prices',
      style: {
        color: designTokens.colour.neutral['70'].$value,
        fontSize: '14px',
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
          color: designTokens.colour.neutral['80'].$value,
          fontSize: '12px',
        },
      },
      lineColor: designTokens.colour.neutral['40'].$value,
    },
    yAxis: {
      title: {
        text: 'Price ($)',
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
        color: designTokens.colour.neutral['80'].$value,
        fontSize: '12px',
      },
      itemHoverStyle: {
        color: designTokens.colour.primary.text.$value,
      },
    },
    series: [
      {
        type: 'line',
        name: 'Tech Corp',
        data: [125, 132, 128, 145, 152, 158, 162, 168, 175, 182, 188, 195],
      },
      {
        type: 'line',
        name: 'Finance Inc',
        data: [85, 88, 92, 95, 98, 102, 105, 108, 112, 115, 118, 122],
      },
      {
        type: 'line',
        name: 'Energy Ltd',
        data: [65, 68, 70, 72, 75, 78, 80, 82, 85, 87, 90, 92],
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
