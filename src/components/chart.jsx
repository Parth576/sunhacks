import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DonutChart = ({ data }) => {
  const chartRef = useRef(null);
  let chartInstance = null; // Track the chart instance

  useEffect(() => {
    if (data && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the existing chart instance
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: data.colors,
            },
          ],
        },
      });
    }

    // Clean up when unmounting
    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the chart instance on unmount
      }
    };
  }, [data]);

  return <canvas ref={chartRef} width={200} height={200} />;
};

export default DonutChart;
