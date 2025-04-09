import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

export const EventStatsGraph = ({ stats }) => {
  const eventData = {
    labels: ['Upcoming', 'Ongoing', 'Completed'],
    datasets: [{
      label: 'Events',
      data: [stats?.upcoming || 0, stats?.ongoing || 0, stats?.completed || 0],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)'
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Event Status</h3>
          <Doughnut data={eventData} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Event Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Events:</span>
              <span className="font-medium">{stats?.total || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Upcoming:</span>
              <span className="font-medium">{stats?.upcoming || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Ongoing:</span>
              <span className="font-medium">{stats?.ongoing || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Completed:</span>
              <span className="font-medium">{stats?.completed || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};