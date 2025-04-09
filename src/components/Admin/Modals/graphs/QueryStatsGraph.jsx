import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

export const QueryStatsGraph = ({ stats }) => {
  const eventData = {
    labels: ['Total', 'Recent', 'Category'],
    datasets: [{
      label: 'Query',
      data: [stats?.total || 0, stats?.recentQueries || 0,  "4"],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Queries Status</h3>
          <Doughnut data={eventData} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Queries Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Queries:</span>
              <span className="font-medium">{stats?.total || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Recent:</span>
              <span className="font-medium">{stats?.recentQueries?.count || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="font-medium">{ "4"}</span>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};