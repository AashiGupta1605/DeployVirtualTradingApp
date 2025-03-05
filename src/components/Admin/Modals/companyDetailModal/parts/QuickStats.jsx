// components/Common/Modals/CompanyDetail/QuickStats.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Percent,
  Volume2
} from 'lucide-react';

const StatCard = ({ title, value, subValue, icon: Icon, color, trend }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      green: 'bg-green-50 text-green-600 border-green-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className={`p-2 rounded-lg ${getColorClasses(color)}`}>
          <Icon size={20} />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center">
          {trend && (
            <span className="mr-2">
              {trend === 'up' ? (
                <ArrowUpCircle className="text-green-500" size={24} />
              ) : (
                <ArrowDownCircle className="text-red-500" size={24} />
              )}
            </span>
          )}
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        {subValue && (
          <p className={`text-sm ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 
            'text-gray-500'
          }`}>
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
};

const QuickStats = ({ data }) => {
  if (!data) return null;

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(2)}L`;
    }
    return num.toLocaleString();
  };

  // Format percentage
  const formatPercentage = (value) => {
    if (!value) return '0%';
    const formattedValue = Number(value).toFixed(2);
    return `${formattedValue}%`;
  };

  const stats = [
    {
      title: 'Current Price',
      value: `₹${Number(data.lastPrice).toFixed(2)}`,
      subValue: `${formatPercentage(data.pChange)} ${data.pChange >= 0 ? 'Increase' : 'Decrease'}`,
      icon: DollarSign,
      color: 'blue',
      trend: data.pChange >= 0 ? 'up' : 'down'
    },
    {
      title: 'Trading Volume',
      value: formatNumber(data.totalTradedVolume),
      subValue: 'Total Shares Traded Today',
      icon: Volume2,
      color: 'purple'
    },
    {
      title: '52 Week Range',
      value: `₹${Number(data.yearHigh).toFixed(2)}`,
      subValue: `Low: ₹${Number(data.yearLow).toFixed(2)}`,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Market Cap',
      value: `₹${formatNumber(data.marketCap || 0)}`,
      subValue: 'Total Market Value',
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Today\'s Range',
      value: `₹${Number(data.dayHigh).toFixed(2)}`,
      subValue: `Low: ₹${Number(data.dayLow).toFixed(2)}`,
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Price Change',
      value: `₹${Math.abs(Number(data.change)).toFixed(2)}`,
      subValue: `${data.change >= 0 ? 'Increase' : 'Decrease'} Today`,
      icon: Percent,
      color: data.change >= 0 ? 'green' : 'red',
      trend: data.change >= 0 ? 'up' : 'down'
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Quick Statistics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subValue={stat.subValue}
            icon={stat.icon}
            color={stat.color}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Additional Market Insights */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h4 className="text-md font-semibold text-gray-800 mb-4">Market Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Previous Close</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{Number(data.previousClose).toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Opening Price</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{Number(data.open).toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Total Traded Value</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{formatNumber(data.totalTradedValue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  subValue: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.oneOf(['green', 'red', 'blue', 'purple']),
  trend: PropTypes.oneOf(['up', 'down', null])
};

QuickStats.propTypes = {
  data: PropTypes.shape({
    lastPrice: PropTypes.number,
    pChange: PropTypes.number,
    change: PropTypes.number,
    totalTradedVolume: PropTypes.number,
    yearHigh: PropTypes.number,
    yearLow: PropTypes.number,
    marketCap: PropTypes.number,
    dayHigh: PropTypes.number,
    dayLow: PropTypes.number,
    previousClose: PropTypes.number,
    open: PropTypes.number,
    totalTradedValue: PropTypes.number
  })
};

export default QuickStats;