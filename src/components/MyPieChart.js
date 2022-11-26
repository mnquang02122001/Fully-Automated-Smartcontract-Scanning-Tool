import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MyPieChart({ vulOverview }) {
  const chartData = vulOverview
    ? [
        vulOverview.critical,
        vulOverview.high,
        vulOverview.medium,
        vulOverview.low,
        vulOverview.information,
      ]
    : [];
  const data = {
    labels: ['Critical', 'High', 'Medium', 'Low', 'Info'],
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          '#550808',
          '#ec672c',
          '#add832',
          '#68c88e',
          '#b9c9dc',
        ],
        borderColor: ['rgba(255, 255 , 255, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return <Pie data={data} options={options} />;
}
