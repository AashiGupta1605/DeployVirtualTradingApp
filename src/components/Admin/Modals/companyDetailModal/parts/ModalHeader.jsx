import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  X,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';

const MetricBadge = ({ label, value, type = 'neutral' }) => {
  const getTypeStyles = () => {
    const styles = {
      positive: 'bg-green-50 text-green-700 border-green-200',
      negative: 'bg-red-50 text-red-700 border-red-200',
      neutral: 'bg-gray-50 text-gray-700 border-gray-200',
      warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      info: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return styles[type] || styles.neutral;
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getTypeStyles()}`}>
      <span className="text-xs font-medium">{label}:</span>
      <span className="ml-1 text-xs font-bold">{value}</span>
    </div>
  );
};

const ModalHeader = ({ type, onClose, symbol, data, loading, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatValue = (value, type = 'number') => {
    if (value === undefined || value === null) return 'N/A';
    
    switch (type) {
      case 'currency':
        return `₹${Number(value).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        })}`;
      case 'percentage':
        return `${Number(value).toFixed(2)}%`;
      default:
        return value;
    }
  };

  const getMarketStatus = () => {
    if (!data) return { text: 'Unknown', type: 'neutral' };
    
    const currentTime = new Date();
    const marketOpen = currentTime.getHours() >= 9 && currentTime.getHours() < 16;
    const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6;

    if (isWeekend) return { text: 'Market Closed (Weekend)', type: 'warning' };
    if (!marketOpen) return { text: 'Market Closed', type: 'neutral' };
    return { text: 'Market Open', type: 'positive' };
  };

  const handleRefresh = async () => {
    if (isRefreshing || loading) return;

    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  };

  const marketStatus = getMarketStatus();
  const lastUpdateTime = data?.lastUpdateTime 
    ? new Date(data.lastUpdateTime).toLocaleTimeString()
    : 'N/A';

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-lightBlue-50 to-lightBlue-100">
        {/* Left Side - Title */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-chart-line text-white text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {type === 'etf' ? 'ETF Details' : 'Stock Details'}
            </h2>
            <p className="text-sm text-gray-600">
              View detailed {type === 'etf' ? 'ETF' : 'stock'} information and historical data
            </p>
          </div>
        </div>

        {/* Right Side - Symbol Info */}
        {!loading && data && (
          <div className="flex items-center space-x-6">
            {/* Symbol and Type */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lightBlue-500 to-lightBlue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-white">{symbol.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{symbol}</h3>
                <span className="text-sm text-gray-500">
                  {type === 'etf' ? 'ETF' : 'Stock'}
                </span>
              </div>
            </div>

            {/* Price and Change */}
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {formatValue(data.lastPrice, 'currency')}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`flex items-center text-sm font-medium ${
                  data.pChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.pChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {formatValue(data.pChange, 'percentage')}
                </span>
                <MetricBadge 
                  label="Status" 
                  value={marketStatus.text} 
                  type={marketStatus.type} 
                />
              </div>
            </div>

            {/* Last Updated Time */}
            <div className="text-sm text-gray-500">
              Last updated: {lastUpdateTime}
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={loading || isRefreshing}
              className={`p-2 rounded-lg transition-all duration-200 relative group ${
                loading || isRefreshing
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'hover:bg-gray-100 active:bg-gray-200'
              }`}
              title="Refresh data"
            >
              <RefreshCw 
                size={20} 
                className={`text-gray-600 transition-all duration-700 ${
                  isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
                }`}
              />
              <span className="sr-only">Refresh data</span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
                  {isRefreshing ? 'Refreshing...' : 'Refresh data'}
                </div>
                <div className="w-2 h-2 bg-gray-800 transform rotate-45 translate-x-1/2 translate-y-[-4px] 
                              absolute left-1/2 bottom-0"></div>
              </div>
            </button>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-200 group"
              aria-label="Close modal"
            >
              <X 
                className="text-gray-500 group-hover:text-gray-700 transition-colors" 
                size={24} 
              />
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center space-x-4">
            <div className="animate-pulse flex space-x-4">
              <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ModalHeader.propTypes = {
  type: PropTypes.oneOf(['nifty', 'etf']).isRequired,
  onClose: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.shape({
    lastPrice: PropTypes.number,
    pChange: PropTypes.number,
    lastUpdateTime: PropTypes.string
  }),
  onRefresh: PropTypes.func
};

ModalHeader.defaultProps = {
  type: 'nifty',
  loading: false,
  data: null,
  onRefresh: () => {}
};

export default ModalHeader;