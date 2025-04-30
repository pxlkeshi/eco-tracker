import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ tasksByCategory }) => {
  // Define colors for different categories
  const categoryColors = {
    'energy': '#FFC107',
    'water': '#2196F3',
    'waste': '#4CAF50',
    'transportation': '#9C27B0',
    'food': '#FF5722',
    'nature': '#8BC34A',
    'other': '#607D8B'
  };
  
  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(tasksByCategory).map(cat => 
      cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    datasets: [
      {
        data: Object.values(tasksByCategory),
        backgroundColor: Object.keys(tasksByCategory).map(cat => 
          categoryColors[cat.toLowerCase()] || '#607D8B'
        ),
        borderWidth: 1,
      },
    ],
  };
  
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          boxWidth: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} tasks (${percentage}%)`;
          }
        }
      }
    }
  };
  
  return (
    <div className="progress-chart">
      {Object.keys(tasksByCategory).length > 0 ? (
        <div style={{ height: '300px', position: 'relative' }}>
          <Pie data={chartData} options={options} />
        </div>
      ) : (
        <div className="no-data-message">
          <p>No task data available yet. Start logging tasks to see your progress!</p>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;