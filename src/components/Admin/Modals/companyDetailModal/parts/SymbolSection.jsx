// components/Common/Modals/CompanyDetail/SymbolSection.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { 
  DollarSign,
  BarChart2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
  Percent,
  TrendingDown,
  Activity
} from 'lucide-react';

const MetricCard = ({ 
  title, 
  mainValue, 
  secondaryValue,
  tertiaryValue,
  icon: Icon, 
  trend,
  loading 
}) => {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon size={16} className="text-gray-500" />
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span className="ml-1">{secondaryValue}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold text-gray-900">{mainValue}</span>
          {tertiaryValue && (
            <span className="text-sm text-gray-500">{tertiaryValue}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const SymbolSection = ({ data, loading }) => {
  const formatValue = (value, type = 'number') => {
    if (value === undefined || value === null) return 'N/A';
    
    switch (type) {
      case 'currency':
        return `₹${Number(value).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        })}`;
      case 'percentage':
        return `${Number(value).toFixed(2)}%`;
      case 'volume':
        const num = Number(value);
        if (num >= 10000000) return `${(num / 10000000).toFixed(2)}Cr`;
        if (num >= 100000) return `${(num / 100000).toFixed(2)}L`;
        return num.toLocaleString('en-IN');
      case 'shortCurrency':
        const val = Number(value);
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
        return `₹${val.toLocaleString('en-IN')}`;
      default:
        return value;
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Price Information */}
      <MetricCard
        title="Current Price"
        mainValue={formatValue(data?.lastPrice, 'currency')}
        secondaryValue={formatValue(data?.pChange, 'percentage')}
        tertiaryValue={getTimeAgo(data?.lastUpdateTime)}
        icon={DollarSign}
        trend={data?.pChange >= 0 ? 'up' : 'down'}
        loading={loading}
      />

      {/* Volume Information */}
      <MetricCard
        title="Trading Volume"
        mainValue={formatValue(data?.totalTradedVolume, 'volume')}
        tertiaryValue={`Value: ${formatValue(data?.totalTradedValue, 'shortCurrency')}`}
        icon={BarChart2}
        loading={loading}
      />

      {/* Day's Trading Range */}
      <MetricCard
        title="Day's Range"
        mainValue={`${formatValue(data?.dayLow, 'currency')} - ${formatValue(data?.dayHigh, 'currency')}`}
        tertiaryValue={`Open: ${formatValue(data?.open, 'currency')}`}
        icon={Activity}
        loading={loading}
      />

      {/* Previous Close */}
      <MetricCard
        title="Previous Close"
        mainValue={formatValue(data?.previousClose, 'currency')}
        secondaryValue={formatValue(data?.change, 'currency')}
        icon={Clock}
        trend={data?.change >= 0 ? 'up' : 'down'}
        loading={loading}
      />

      {/* 52 Week High */}
      <MetricCard
        title="52 Week High"
        mainValue={formatValue(data?.yearHigh, 'currency')}
        tertiaryValue={`Current: ${formatValue(((data?.lastPrice / data?.yearHigh) * 100 - 100), 'percentage')} from high`}
        icon={TrendingUp}
        loading={loading}
      />

      {/* 52 Week Low */}
      <MetricCard
        title="52 Week Low"
        mainValue={formatValue(data?.yearLow, 'currency')}
        tertiaryValue={`Current: ${formatValue(((data?.lastPrice / data?.yearLow) * 100 - 100), 'percentage')} from low`}
        icon={TrendingDown}
        loading={loading}
      />

      {/* 1 Month Return */}
      <MetricCard
        title="1 Month Return"
        mainValue={formatValue(data?.perChange30d, 'percentage')}
        tertiaryValue="30 Days Change"
        icon={Calendar}
        trend={data?.perChange30d >= 0 ? 'up' : 'down'}
        loading={loading}
      />

      {/* 1 Year Return */}
      <MetricCard
        title="1 Year Return"
        mainValue={formatValue(data?.perChange365d, 'percentage')}
        tertiaryValue="365 Days Change"
        icon={Percent}
        trend={data?.perChange365d >= 0 ? 'up' : 'down'}
        loading={loading}
      />
    </div>
  );
};

SymbolSection.propTypes = {
  data: PropTypes.shape({
    lastPrice: PropTypes.number,
    pChange: PropTypes.number,
    change: PropTypes.number,
    totalTradedVolume: PropTypes.number,
    totalTradedValue: PropTypes.number,
    dayHigh: PropTypes.number,
    dayLow: PropTypes.number,
    open: PropTypes.number,
    previousClose: PropTypes.number,
    yearHigh: PropTypes.number,
    yearLow: PropTypes.number,
    perChange30d: PropTypes.number,
    perChange365d: PropTypes.number,
    lastUpdateTime: PropTypes.string
  }),
  loading: PropTypes.bool
};

SymbolSection.defaultProps = {
  loading: false,
  data: null
};

export default SymbolSection;