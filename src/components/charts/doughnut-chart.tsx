
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChartData } from '@/types';

// Register Chart.js components
Chart.register(...registerables);

interface DoughnutChartProps {
  data: ChartData;
  height?: number;
  className?: string;
}

export function DoughnutChart({ data, height = 300, className }: DoughnutChartProps) {
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
        type: 'doughnut',
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
          cutout: '70%',
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
