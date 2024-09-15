import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AIUseCasesPieChart: React.FC = () => {
  const data = {
    labels: ['NLP', 'Computer Vision', 'Robotics', 'Predictive Analytics', 'Autonomous Vehicles'],
    datasets: [
      {
        data: [30, 25, 15, 20, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'AI Use Cases Distribution'
      }
    }
  };

  return <Pie data={data} options={options} />;
};

export default AIUseCasesPieChart;
