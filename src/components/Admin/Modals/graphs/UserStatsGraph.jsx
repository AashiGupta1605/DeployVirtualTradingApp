// components/graphs/UserStatsGraph.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export const UserStatsGraph = ({ stats }) => {
  const barData = {
    labels: ['Total Users', 'Active Users', 'Deactive Users'],
    datasets: [
      {
        label: 'Count',
        data: [stats?.total || 0, stats?.active || 0, stats?.deactive || 0],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [stats?.male || 0, stats?.female || 0, stats?.other || 0],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h4 className="text-lg font-semibold mb-2">User Counts</h4>
        <Bar data={barData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h4 className="text-lg font-semibold mb-2">Gender Distribution</h4>
        <Pie data={pieData} />
      </div>
      <div className="md:col-span-2 bg-white p-4 rounded shadow">
        <h4 className="text-lg font-semibold mb-2">Details</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50 rounded">
            <p className="text-sm text-gray-600">Average Age</p>
            <p className="text-xl font-bold">{stats?.averageAge || 0}</p>
          </div>
          {/* Add more detail cards as needed */}
        </div>
      </div>
    </div>
  );
};