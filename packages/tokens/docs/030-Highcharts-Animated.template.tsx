import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cssVars } from '@iress-oss/ids-tokens';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, sonarjs/pseudo-random */

// Helper function to extract hex color from CSS variable
const extractColor = (cssVar: string): string => {
  // Extract the fallback color from the var() syntax
  const regex = /#[0-9A-Fa-f]{6}/;
  const match = regex.exec(cssVar);
  return match ? match[0] : cssVar;
};

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
    extractColor(cssVars.colour.primary.fill),
    extractColor(cssVars.colour.system.success.fill),
  ];

  const options: Highcharts.Options = {
    colors: chartColors,
    chart: {
      type: 'spline',
      backgroundColor: extractColor(cssVars.colour.neutral['10']),
      animation: {
        duration: 1000,
      },
    },
    title: {
      text: 'Real-time Trading Volume',
      style: {
        color: extractColor(cssVars.colour.neutral['90']),
        fontSize: '18px',
        fontWeight: '600',
      },
    },
    subtitle: {
      text: isAnimating ? 'Live Updates Active' : 'Paused',
      style: {
        color: isAnimating
          ? extractColor(cssVars.colour.system.success.text)
          : extractColor(cssVars.colour.neutral['60']),
        fontSize: '14px',
      },
    },
    xAxis: {
      type: 'category',
      labels: {
        enabled: false,
      },
      lineColor: extractColor(cssVars.colour.neutral['40']),
    },
    yAxis: {
      title: {
        text: 'Volume',
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
      min: 0,
      max: 200,
    },
    tooltip: {
      backgroundColor: extractColor(cssVars.colour.neutral['10']),
      borderColor: extractColor(cssVars.colour.neutral['40']),
      style: {
        color: extractColor(cssVars.colour.neutral['90']),
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
                ? extractColor(cssVars.colour.system.warning.fill)
                : extractColor(cssVars.colour.system.success.fill),
              color: extractColor(cssVars.colour.neutral['10']),
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
              backgroundColor: extractColor(cssVars.colour.system.danger.fill),
              color: extractColor(cssVars.colour.neutral['10']),
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
