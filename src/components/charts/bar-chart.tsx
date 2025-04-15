
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChartData } from '@/types';

// Register Chart.js components
Chart.register(...registerables);

interface BarChartProps {
  data: ChartData;
  height?: number;
  className?: string;
}

export function BarChart({ data, height = 300, className }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className={className} style={{ height }}>
      <canvas ref={chartRef} />
    </div>
  );
}
