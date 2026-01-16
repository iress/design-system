import React from 'react';
import ReactDOM from 'react-dom/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cssVars } from '@iress-oss/ids-tokens';

const App = () => {
  // Use data visualization bold colors for line series
  const lineColors = [
    cssVars.colour.data.bold['40'],
    cssVars.colour.data.bold['70'],
    cssVars.colour.data.bold['10'],
  ];

  const options: Highcharts.Options = {
    colors: lineColors,
    chart: {
      type: 'line',
      backgroundColor: cssVars.colour.neutral['10'],
    },
    title: {
      text: 'Stock Price Trends',
      style: {
        color: cssVars.colour.neutral['90'],
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    subtitle: {
      text: 'Monthly average closing prices',
      style: {
        color: cssVars.colour.neutral['70'],
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
          color: cssVars.colour.neutral['80'],
          fontSize: '12px',
        },
      },
      lineColor: cssVars.colour.neutral['40'],
    },
    yAxis: {
      title: {
        text: 'Price ($)',
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
        color: cssVars.colour.neutral['80'],
        fontSize: '12px',
      },
      itemHoverStyle: {
        color: cssVars.colour.primary.text,
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
