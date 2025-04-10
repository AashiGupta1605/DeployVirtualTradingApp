import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

export const FeedbackStatsGraph = ({ stats }) => {
  const ratingData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [{
      label: 'Rating Distribution',
    //   data: stats?.ratingDistribution || [0, 0, 0, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(54, 162, 235, 0.7)'
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Rating Distribution</h3>
          <Bar data={ratingData} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Feedback Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Feedback:</span>
              <span className="font-medium">{stats?.total || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Rating:</span>
              <span className="font-medium">{stats?.averageRating || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Recommendation Rate:</span>
              <span className="font-medium">{stats?.recommendationRate || 0}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};