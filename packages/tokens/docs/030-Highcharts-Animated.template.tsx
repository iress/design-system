import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { designTokens } from '@iress-oss/ids-tokens';

/* eslint-disable sonarjs/pseudo-random */

const App = () => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from(
      { length: 20 },
      () => Math.floor(Math.random() * 100) + 50,
    );
    setChartData(initialData);

    // Animate by adding new data points
    const interval = setInterval(() => {
      if (isAnimating) {
        setChartData((prevData) => {
          const newData = [...prevData];
          if (newData.length >= 50) {
            newData.shift(); // Remove oldest point
          }
          newData.push(Math.floor(Math.random() * 100) + 50);
          return newData;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const chartColors = [
    designTokens.colour.primary.fill.$value,
    designTokens.colour.system.success.fill.$value,
  ];

  const options: Highcharts.Options = {
    colors: chartColors,
    chart: {
      type: 'spline',
      backgroundColor: designTokens.colour.neutral['10'].$value,
      animation: {
        duration: 1000,
      },
    },
    title: {
      text: 'Real-time Trading Volume',
      style: {
        color: designTokens.colour.neutral['90'].$value,
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    subtitle: {
      text: isAnimating ? 'Live Updates Active' : 'Paused',
      style: {
        color: isAnimating
          ? designTokens.colour.system.success.text.$value
          : designTokens.colour.neutral['60'].$value,
        fontSize: '14px',
      },
    },
    xAxis: {
      type: 'category',
      labels: {
        enabled: false,
      },
      lineColor: designTokens.colour.neutral['40'].$value,
    },
    yAxis: {
      title: {
        text: 'Volume',
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
      min: 0,
      max: 200,
    },
    tooltip: {
      backgroundColor: designTokens.colour.neutral['10'].$value,
      borderColor: designTokens.colour.neutral['40'].$value,
      style: {
        color: designTokens.colour.neutral['90'].$value,
      },
      formatter: function () {
        return `<b>Volume:</b> ${this.y}`;
      },
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true,
          radius: 3,
        },
        lineWidth: 2,
        animation: {
          duration: 1000,
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'spline',
        name: 'Volume',
        data: chartData,
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
        <div
          style={{
            marginBottom: '16px',
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            style={{
              padding: '8px 16px',
              backgroundColor: isAnimating
                ? designTokens.colour.system.warning.fill.$value
                : designTokens.colour.system.success.fill.$value,
              color: designTokens.colour.neutral['10'].$value,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {isAnimating ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={() => setChartData([])}
            style={{
              padding: '8px 16px',
              backgroundColor: designTokens.colour.system.danger.fill.$value,
              color: designTokens.colour.neutral['10'].$value,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Clear
          </button>
        </div>
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
