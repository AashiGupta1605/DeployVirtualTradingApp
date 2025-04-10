import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

export const StockStatsGraph = ({ stats }) => {
  const eventData = {
    labels: ['Total', 'nifty50', 'nifty500', "etf"],
    datasets: [{
      label: 'Stocks',
      data: [stats?.all || 0, stats?.nifty50 || 0, stats?.nifty500 || 0, stats?.etf || 0],
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
          <h3 className="text-lg font-medium mb-4">Stock Status</h3>
          <Doughnut data={eventData} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Stock Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Stocks:</span>
              <span className="font-medium">{stats?.all || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Nifty50:</span>
              <span className="font-medium">{stats?.nifty50 || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Nifty500:</span>
              <span className="font-medium">{stats?.nifty500 || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>ETF:</span>
              <span className="font-medium">{stats?.etf || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};