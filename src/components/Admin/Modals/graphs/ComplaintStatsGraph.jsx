import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

export const ComplaintStatsGraph = ({ stats }) => {
  const eventData = {
    labels: ['Total', 'Pending', 'Resolved', 'Recent'],
    datasets: [{
      label: 'Complaints',
      data: [stats?.total || 0, stats?.pendingComplaint || 0, stats?.resolvedComplaint || 0, stats?.recentComplaint],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(72, 145, 183, 0.5)',
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Compaints Status</h3>
          <Doughnut data={eventData} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Complaint Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Complaints:</span>
              <span className="font-medium">{stats?.total || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending:</span>
              <span className="font-medium">{stats?.pendingComplaint || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Resolved:</span>
              <span className="font-medium">{stats?.resolvedComplaint || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Recent:</span>
              <span className="font-medium">{stats?.recentComplaint || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};