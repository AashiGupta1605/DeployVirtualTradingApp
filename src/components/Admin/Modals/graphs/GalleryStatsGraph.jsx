import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

export const GalleryStatsGraph = ({ stats }) => {
  const eventData = {
    labels: ['Total', 'Categories', 'Photos'],
    datasets: [{
      label: 'Gallery',
      data: [stats?.total || 0, stats?.totalCategories || 0, stats?.totalPhotos || 0],
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
          <h3 className="text-lg font-medium mb-4">Gallery Status</h3>
          <Doughnut data={eventData} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Gallery Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Post:</span>
              <span className="font-medium">{stats?.total || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Categories:</span>
              <span className="font-medium">{stats?.totalCategories || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Photos:</span>
              <span className="font-medium">{stats?.totalPhotos || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};